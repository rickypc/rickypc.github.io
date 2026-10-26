/*!
 * Copyright © 2015 Richard Huang <rickypc@users.noreply.github.com>
 * All rights reserved.
 */

import { execFile, spawn } from 'node:child_process';
import {
  type Browser,
  type BrowserContext,
  expect,
  type Locator,
  type Page,
  type PageScreenshotOptions,
  type PlaywrightTestArgs,
  type PlaywrightTestOptions,
  type Route,
  type TestInfo,
  test,
} from '@playwright/test';
import { pdfToPng } from 'pdf-to-png-converter';

export type BandCallback<T, U = T> = (_value: T, _index?: number, _array?: T[]) => U | Promise<U>;

type ErrorAttachment = { body: Buffer | string; contentType: string; name: string };

type Locators = {
  desktop: Locator;
  mobile: Locator;
};

export type Options = Partial<PlaywrightTestArgs> &
  Partial<PlaywrightTestOptions> & {
    browser?: Browser;
    browserName?: string;
    expected?: string[];
    faqId?: string;
    file?: string;
    name?: string;
    page?: Page;
    pages?: number;
    selector?: string;
    testInfo?: TestInfo;
    theme?: string;
    timeout?: number;
    url?: string;
  };

export const afterAll = async (context: BrowserContext) => context?.close();

// Measurement endpoints never settle in some environments and skew real analytics; block the
// pure-tracking hosts plus any `/collect` beacon path so `networkidle` resolves deterministically
// while real links (e.g. `www.google.com`) stay untouched.
const COLLECT =
  /\/[gjr]\/collect|googletagmanager\.com|google-analytics\.com|analytics\.ahrefs\.com/;

const attachOnError = async (
  options: Options,
  run: () => unknown,
  build: () => Promise<ErrorAttachment>,
): Promise<void> => {
  try {
    await run();
  } catch (error) {
    try {
      const { name, ...attachment } = await build();
      await (options.testInfo as TestInfo).attach(name, attachment);
    } catch {
      // Attachment is best-effort once the assertion has already failed.
    }
    throw error;
  }
};

const audioMetadata = (path: string) =>
  new Promise((resolve, reject) => {
    execFile(
      'ffprobe',
      [
        '-print_format',
        'json',
        '-show_entries',
        'stream=channels,codec_name,codec_type,height,index,pix_fmt,time_base,width',
        '-show_format',
        '-v',
        'quiet',
        path,
      ],
      (ex, stdout) => {
        if (ex) {
          reject(ex);
        } else {
          const json = JSON.parse(stdout);
          const { format } = json;

          delete json.programs;
          delete json.stream_groups;

          json.format = {
            filename: format.filename,
            format_name: format.format_name,
            tags: {
              album: format.tags?.album,
              album_artist: format.tags?.album_artist,
              artist: format.tags?.artist,
              composer: format.tags?.composer,
              description: format.tags?.description,
              genre: format.tags?.genre,
              title: format.tags?.title,
              track: format.tags?.track,
            },
          };

          resolve(json);
        }
      },
    );
  });

const audioSpectrogram = (path: string): Promise<Buffer> =>
  new Promise((resolve, reject) => {
    const chunks: Buffer[] = [];
    const ffmpeg = spawn('ffmpeg', [
      '-hide_banner',
      '-i',
      path,
      '-loglevel',
      'quiet',
      '-filter_complex',
      // biome-ignore lint/security/noSecrets: -
      'asetnsamples=n=4096:p=0,highpass=f=80,lowpass=f=300,showwavespic=s=1024x512,scale=1024x512',
      '-frames:v',
      '1',
      '-f',
      'image2',
      '-vcodec',
      'png',
      'pipe:1',
    ]);
    ffmpeg.stdout.on('data', (chunk) => chunks.push(chunk));
    ffmpeg
      .on('close', (code) => {
        if (code === 0) {
          resolve(Buffer.concat(chunks));
        } else {
          reject(new Error(`ffmpeg exited with code ${code}`));
        }
      })
      .on('error', reject);
  });

export const band = async <T>(count: number, callback: BandCallback<number, T>) =>
  Promise.all([...Array(count).keys()].map(callback));

// Single installer shared by the two disjoint page origins: the per-test `context` fixture
// (`routedTest`) and the serial `beforeAll` context. Neither covers the other - the fixture never
// sees the serial page and `beforeAll` never sees fixture pages - while popups inherit context
// routes either way.
const blockTrackers = async (target: Page | BrowserContext): Promise<void> => {
  await target.route(COLLECT, (route: Route) => route.abort());
};

export const beforeAll = async (options: Options) => {
  const context = await (options.browser as Browser).newContext();
  await blockTrackers(context);
  const page: Page = await context.newPage();
  await page.goto(options.url as string, { waitUntil: 'load' });
  return { context, page };
};

const collectTypes = (nodes: Record<string, unknown>[], types: Set<string>): string | undefined => {
  let faqId: string | undefined;
  nodes.forEach((node) => {
    const type = node['@type'];
    if (Array.isArray(type)) {
      (type as string[]).forEach((t) => {
        types.add(t);
      });
    } else if (type) {
      types.add(type as string);
    }
    if (type === 'FAQPage' && typeof node['@id'] === 'string') {
      faqId = node['@id'];
    }
  });
  return faqId;
};

const drawn = async ({ page, selector, timeout = 775 }: Options): Promise<void> => {
  if (!page) {
    return;
  }
  if (selector) {
    await page.waitForSelector(selector, { state: 'visible', timeout }).catch(() => {});
  } else {
    await page.evaluate(() => {
      return new Promise((resolve) => requestAnimationFrame(resolve));
    });
  }
};

export { type BrowserContext, expect, type Page };

export const hasAudio = async (options: Options) => {
  const signature = Buffer.from(
    JSON.stringify(await audioMetadata(options.url as string), null, 2),
    'utf8',
  );
  const spectrogram = await audioSpectrogram(options.url as string);

  await attachOnError(
    options,
    () => expect(signature).toMatchSnapshot(`${options.file}/signature.json`),
    async () => ({
      body: signature,
      contentType: 'application/json',
      name: `${options.file} signature`,
    }),
  );
  await attachOnError(
    options,
    () =>
      expect(spectrogram).toMatchSnapshot(`${options.file}/spectrogram.png`, {
        // 6.5%.
        maxDiffPixelRatio: 0.065,
      }),
    async () => ({
      body: spectrogram,
      contentType: 'image/png',
      name: `${options.file} spectrogram`,
    }),
  );
};

const hasDesktopNavigations = async (nav: Locators, theme: Locators) => {
  await expect(nav.desktop.getByRole('link', { name: 'Github' })).toBeVisible();
  expect(await nav.desktop.getByRole('link', { name: 'Github' }).getAttribute('href')).toContain(
    'https://github.com/rickypc',
  );
  await expect(nav.mobile.getByRole('link', { name: 'Github' })).toBeHidden();

  await expect(nav.desktop.getByRole('link', { name: 'Linkedin' })).toBeVisible();
  expect(await nav.desktop.getByRole('link', { name: 'Linkedin' }).getAttribute('href')).toContain(
    'https://www.linkedin.com/in/rihuang',
  );
  await expect(nav.mobile.getByRole('link', { name: 'Linkedin' })).toBeHidden();

  await expect(nav.desktop.getByRole('link', { name: 'Translate' })).toBeVisible();
  expect(await nav.desktop.getByRole('link', { name: 'Translate' }).getAttribute('href')).toMatch(
    /https:\/\/ricky[^.]+\.translate\.goog\//i,
  );
  await expect(nav.mobile.getByRole('link', { name: 'Translate' })).toBeHidden();

  await expect(theme.desktop.getByRole('button', { name: 'light mode' })).toBeVisible();
  await expect(theme.mobile.getByRole('button', { name: 'light mode' })).toBeHidden();
};

export const hasHeader = async (options: Options) => {
  expect(await (options.page as Page).textContent('main header h1')).toMatchSnapshot(
    'header-headline.txt',
  );
  expect(await (options.page as Page).textContent('main header p')).toMatchSnapshot(
    'header-description.txt',
  );
};

export const hasJsonLd = async (options: Options) => {
  const scripts = await (options.page as Page).$$eval('script[type="application/ld+json"]', (els) =>
    els.map((el) => el.textContent || ''),
  );
  expect(scripts.length).toBeGreaterThan(0);
  const types = new Set<string>();
  let faqId: string | undefined;
  scripts.forEach((text) => {
    try {
      const parsed = JSON.parse(text);
      const nodes: Record<string, unknown>[] = Array.isArray(parsed['@graph'])
        ? parsed['@graph']
        : [parsed];
      faqId = collectTypes(nodes, types) ?? faqId;
    } catch {
      // ignore non-JSON blocks
    }
  });
  expect(types.has('FAQPage')).toBe(true);
  expect(faqId).toContain(options.faqId || faqId);
  (options.expected || []).forEach((type) => {
    expect(types.has(type)).toBe(true);
  });
};

export const hasMetadatas = async (options: Options) => {
  expect(
    // biome-ignore lint/security/noSecrets: -
    await (options.page as Page).locator('head>meta[name="description"]').getAttribute('content'),
  ).toMatchSnapshot('meta-description.txt');
  expect(
    // biome-ignore lint/security/noSecrets: -
    await (options.page as Page).locator('head>meta[name="keywords"]').getAttribute('content'),
  ).toMatchSnapshot('meta-keywords.txt');
  expect(
    await (options.page as Page)
      // biome-ignore lint/security/noSecrets: -
      .locator('head>meta[property="og:description"]')
      .getAttribute('content'),
  ).toMatchSnapshot('meta-og-description.txt');
  expect(
    // biome-ignore lint/security/noSecrets: -
    await (options.page as Page).locator('head>meta[property="og:title"]').getAttribute('content'),
  ).toMatchSnapshot('meta-og-title.txt');
  expect(
    // biome-ignore lint/security/noSecrets: -
    await (options.page as Page).locator('head>meta[property="og:type"]').getAttribute('content'),
  ).toEqual('website');
  expect(
    await (options.page as Page)
      .locator('head>meta[name="twitter:description"]')
      .getAttribute('content'),
  ).toMatchSnapshot('meta-twitter-description.txt');
  expect(
    await (options.page as Page).locator('head>meta[name="twitter:title"]').getAttribute('content'),
  ).toMatchSnapshot('meta-twitter-title.txt');
  expect(await (options.page as Page).textContent('head>title')).toMatchSnapshot('title.txt');
};

const hasMobileNavigations = async (nav: Locators, theme: Locators) => {
  await expect(nav.desktop.getByRole('link', { name: 'Github' })).toBeHidden();
  await expect(nav.mobile.getByRole('link', { name: 'Github' })).toBeVisible();
  expect(await nav.mobile.getByRole('link', { name: 'Github' }).getAttribute('href')).toContain(
    'https://github.com/rickypc',
  );

  await expect(nav.desktop.getByRole('link', { name: 'Linkedin' })).toBeHidden();
  await expect(nav.mobile.getByRole('link', { name: 'Linkedin' })).toBeVisible();
  expect(await nav.mobile.getByRole('link', { name: 'Linkedin' }).getAttribute('href')).toContain(
    'https://www.linkedin.com/in/rihuang',
  );

  await expect(nav.desktop.getByRole('link', { name: 'Translate' })).toBeHidden();
  await expect(nav.mobile.getByRole('link', { name: 'Translate' })).toBeVisible();
  expect(await nav.mobile.getByRole('link', { name: 'Translate' }).getAttribute('href')).toMatch(
    /https:\/\/ricky[^.]+\.translate\.goog\//i,
  );

  await expect(theme.desktop.getByRole('button', { name: 'light mode' })).toBeHidden();
  await expect(theme.mobile.getByRole('button', { name: 'light mode' })).toBeVisible();
};

export const hasPdf = async (options: Options) => {
  const images = await pdfToPng(options.url as string);
  expect(images).toHaveLength(options.pages as number);
  await Promise.all(
    images.map(async (img, i) =>
      attachOnError(
        options,
        () => expect(img.content).toMatchSnapshot(`${options.file}/page-${i}.png`),
        async () => ({
          body: img.content as Buffer,
          contentType: 'image/png',
          name: `${options.file} page ${i + 1}`,
        }),
      ),
    ),
  );
};

export const hasPlayback = async (options: Options) => {
  await (options.page as Page).goto(`${options.url}?docusaurus-data-volume=silent`, {
    waitUntil: 'domcontentloaded',
  });
  // The controls container also holds the Stop button once playback starts, so the bare selector
  // matches two elements and strict mode throws whenever a poll lands after Stop mounts. Scope
  // every step to the Play/Pause toggle itself, which never collides with Stop.
  const toggle = (options.page as Page).locator(
    `${options.selector}[title="Pause"],${options.selector}[title="Play"]`,
  );
  if (!(await toggle.isVisible())) {
    return;
  }
  await expect(toggle).toHaveAttribute('title', /play/i);
  await toggle.click();
  await expect(toggle).toHaveAttribute('title', /pause/i);
  await (options.page as Page).waitForFunction(
    (el) => el?.getAttribute('title')?.toLowerCase() !== 'pause',
    await toggle.elementHandle(),
  );
  await expect(toggle).toHaveAttribute('title', /play/i);
};

export const hasPrint = async (options: Options) => {
  test.skip(options.browserName !== 'chromium', 'Print only works in Chromium');
  (options.testInfo as TestInfo).setTimeout(60000);
  const search = (options.url as string).includes('portfolio')
    ? '?docusaurus-data-carousel-play=manual'
    : '';
  await (options.page as Page).goto(`${options.url}${search}`, { waitUntil: 'networkidle' });
  await (options.page as Page).evaluate(() => window.dispatchEvent(new Event('beforeprint')));
  const last = (options.page as Page).locator('picture > img').last();
  if (await last?.count?.()) {
    await last.scrollIntoViewIfNeeded();
  }
  await (options.page as Page).waitForLoadState('networkidle');
  await drawn(options);
  const pdf = await (options.page as Page).pdf({ format: 'Letter', printBackground: true });
  const images = await pdfToPng(pdf.buffer.slice(pdf.byteOffset, pdf.byteOffset + pdf.byteLength));
  await Promise.all(
    images.map(async (img, i) =>
      attachOnError(
        options,
        () => expect(img.content).toMatchSnapshot(`print-page-${i}.png`),
        async () => ({
          body: img.content as Buffer,
          contentType: 'image/png',
          name: `Print page ${i + 1}`,
        }),
      ),
    ),
  );
};

export const hasScreenshot = async (options: Options) => {
  const screenshotOptions: PageScreenshotOptions = { fullPage: true, scale: 'css' };
  const themeLower = (options.theme as string).toLowerCase();
  // After themeLower assignment.
  let search = `?docusaurus-theme=${themeLower}`;
  if ((options.url as string).includes('portfolio')) {
    search += '&docusaurus-data-carousel-play=manual';
  }
  // The app honors `prefers-reduced-motion` via MotionConfig (`src/theme/Root.tsx`); the runner
  // emulates the same preference so spring/rAF motion settles instantly and screenshots stay
  // deterministic.
  await (options.page as Page).emulateMedia({ reducedMotion: 'reduce' });
  await (options.page as Page).goto(`${options.url}${search}`, { waitUntil: 'networkidle' });
  await drawn(options);
  await attachOnError(
    options,
    () => expect(options.page as Page).toHaveScreenshot(`${themeLower}.png`, screenshotOptions),
    async () => ({
      body: await (options.page as Page).screenshot(screenshotOptions),
      contentType: 'image/png',
      name: `${options.theme} Theme`,
    }),
  );
};

export const hasUrl = async (options: Options) =>
  expect(options.page as Page).toHaveURL(`${options.baseURL}${options.url}`);

const mobile = (testInfo: Options['testInfo']) =>
  /^mobile/i.test(testInfo?.project?.name as string);

// After mobile assingment.
export const hasActiveNavigation = async (options: Options) => {
  const patterns: Record<string, RegExp> = {};
  if (mobile(options.testInfo)) {
    await (options.page as Page).locator('nav .navbar__inner button.navbar__toggle').click();
    patterns['nav.navbar .navbar-sidebar__items'] = /menu__link--active/;
  } else {
    patterns['nav.navbar .navbar__items'] = /navbar__link--active/;
  }
  for (const [locator, pattern] of Object.entries(patterns)) {
    await expect((options.page as Page).locator(locator).getByRole('link', options)).toHaveClass(
      pattern,
    );
  }
};

export const hasNavigations = async (options: Options) => {
  await (options.page as Page).goto(options.url as string, { waitUntil: 'domcontentloaded' });

  const nav = {
    desktop: (options.page as Page).locator('nav.navbar .navbar__items--right'),
    mobile: (options.page as Page).locator(
      'nav.navbar .navbar-sidebar .navbar-sidebar__items .menu',
    ),
  };
  const theme = {
    desktop: nav.desktop,
    mobile: (options.page as Page).locator('nav.navbar .navbar-sidebar .navbar-sidebar__brand'),
  };

  if (mobile(options.testInfo)) {
    await (options.page as Page).locator('nav .navbar__inner button.navbar__toggle').click();
    await hasMobileNavigations(nav, theme);
    await (options.page as Page)
      .locator('nav .navbar-sidebar button.navbar-sidebar__close')
      .click();
  } else {
    await hasDesktopNavigations(nav, theme);
  }
};

const routedTest = test.extend<{ context: BrowserContext }>({
  context: async ({ context }, use) => {
    await blockTrackers(context);
    await use(context);
  },
});

export { mobile, routedTest as test };
