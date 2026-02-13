/*!
 * Copyright © 2015 Richard Huang <rickypc@users.noreply.github.com>
 * All rights reserved.
 */

import {
  type Browser,
  type BrowserContext,
  expect,
  type Page,
  type PageScreenshotOptions,
  type PlaywrightTestArgs,
  type PlaywrightTestOptions,
  test,
  type TestInfo,
} from '@playwright/test';
import { pdfToPng } from 'pdf-to-png-converter';
import { execFile, spawn } from 'node:child_process';

// eslint-disable-next-line no-unused-vars
export type BandCallback<T, U = T> = (value: T, index?: number, array?: T[]) => U | Promise<U>;

export type Options = Partial<PlaywrightTestArgs>
  & Partial<PlaywrightTestOptions>
  & {
    browser?: Browser;
    browserName?: string;
    file?: string;
    name?: string;
    page?: Page;
    pages?: number;
    selector?: string,
    testInfo?: TestInfo;
    theme?: string,
    url?: string;
  };

export const afterAll = async (context: BrowserContext) => context.close();

const audioMetadata = (path: string) => new Promise((resolve, reject) => {
  execFile('ffprobe', [
    '-print_format', 'json',
    '-show_entries', 'stream=channels,codec_name,codec_type,height,index,pix_fmt,time_base,width',
    '-show_format',
    '-v', 'quiet',
    path,
  ], (ex, stdout) => {
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
  });
});

const audioSpectrogram = (path: string): Promise<Buffer> => new Promise((resolve, reject) => {
  const chunks: Buffer[] = [];
  const ffmpeg = spawn('ffmpeg', [
    '-hide_banner',
    '-i', path,
    '-loglevel', 'quiet',
    '-filter_complex',
    'asetnsamples=n=4096:p=0,highpass=f=80,lowpass=f=300,showwavespic=s=1024x512,scale=1024x512',
    '-frames:v', '1',
    '-f', 'image2',
    '-vcodec', 'png',
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
    }).on('error', reject);
});

export const band = async <T>(
  count: number,
  callback: BandCallback<number, T>,
) => Promise.all([...Array(count).keys()].map(callback));

export const beforeAll = async (options: Options) => {
  const context = await options.browser!.newContext();
  const page: Page = await context.newPage();
  await page.goto(options.url!, { waitUntil: 'load' });
  return { context, page };
};

export { type BrowserContext, expect, type Page };

const mobile = (testInfo: Options['testInfo']) => /^mobile/i
  .test(testInfo?.project?.name as string);

export const hasActiveNavigation = async (options: Options) => {
  if (mobile(options.testInfo)) {
    await options.page!.locator('nav .navbar__inner button.navbar__toggle')
      .click();
    await expect(options.page!.getByRole('link', options))
      .toHaveClass(/menu__link--active/);
  } else {
    await expect(options.page!.getByRole('link', options))
      .toHaveClass(/navbar__link--active/);
  }
};

export const hasAudio = async (options: Options) => {
  const signature = Buffer.from(JSON.stringify(await audioMetadata(options.url!), null, 2), 'utf8');
  const spectrogram = await audioSpectrogram(options.url!);

  expect(signature).toMatchSnapshot(`${options.file}/signature.json`);
  expect(spectrogram).toMatchSnapshot(`${options.file}/spectrogram.png`, {
    // 6.5%.
    maxDiffPixelRatio: 0.065,
  });

  await options.testInfo!.attach(`${options.file} signature`, {
    body: signature,
    contentType: 'application/json',
  });
  await options.testInfo!.attach(`${options.file} spectrogram`, {
    body: spectrogram,
    contentType: 'image/png',
  });
};

export const hasHeader = async (options: Options) => {
  expect(await options.page!.textContent('main header h1'))
    .toMatchSnapshot('header-headline.txt');
  expect(await options.page!.textContent('main header p'))
    .toMatchSnapshot('header-description.txt');
};

export const hasMetadatas = async (options: Options) => {
  expect(await options.page!.locator('head>meta[name="description"]')
    .getAttribute('content')).toMatchSnapshot('meta-description.txt');
  expect(await options.page!.locator('head>meta[name="keywords"]')
    .getAttribute('content')).toMatchSnapshot('meta-keywords.txt');
  expect(await options.page!.locator('head>meta[property="og:description"]')
    .getAttribute('content')).toMatchSnapshot('meta-og-description.txt');
  expect(await options.page!.locator('head>meta[property="og:title"]')
    .getAttribute('content')).toMatchSnapshot('meta-og-title.txt');
  expect(await options.page!.locator('head>meta[property="og:type"]')
    .getAttribute('content')).toEqual('website');
  expect(await options.page!.locator('head>meta[name="twitter:description"]')
    .getAttribute('content')).toMatchSnapshot('meta-twitter-description.txt');
  expect(await options.page!.locator('head>meta[name="twitter:title"]')
    .getAttribute('content')).toMatchSnapshot('meta-twitter-title.txt');
  expect(await options.page!.textContent('head>title'))
    .toMatchSnapshot('title.txt');
};

export const hasNavigations = async (options: Options) => {
  await options.page!.goto(options.url!, { waitUntil: 'domcontentloaded' });

  const nav = {
    desktop: options.page!.locator('nav.navbar .navbar__items--right'),
    mobile: options.page!
      .locator('nav.navbar .navbar-sidebar .navbar-sidebar__items .menu'),
  };
  const theme = {
    desktop: nav.desktop,
    mobile: options.page!
      .locator('nav.navbar .navbar-sidebar .navbar-sidebar__brand'),
  };

  if (mobile(options.testInfo)) {
    await options.page!.locator('nav .navbar__inner button.navbar__toggle')
      .click();

    await expect(nav.desktop.getByRole('link', { name: 'Github' }))
      .toBeHidden();
    await expect(nav.mobile.getByRole('link', { name: 'Github' }))
      .toBeVisible();
    expect(await nav.mobile.getByRole('link', { name: 'Github' })
      .getAttribute('href')).toContain('https://github.com/rickypc');

    await expect(nav.desktop.getByRole('link', { name: 'Linkedin' }))
      .toBeHidden();
    await expect(nav.mobile.getByRole('link', { name: 'Linkedin' }))
      .toBeVisible();
    expect(await nav.mobile.getByRole('link', { name: 'Linkedin' })
      .getAttribute('href')).toContain('https://www.linkedin.com/in/rihuang');

    await expect(nav.desktop.getByRole('link', { name: 'Translate' }))
      .toBeHidden();
    await expect(nav.mobile.getByRole('link', { name: 'Translate' }))
      .toBeVisible();
    expect(await nav.mobile.getByRole('link', { name: 'Translate' })
      .getAttribute('href')).toMatch(/https:\/\/ricky[^.]+\.translate\.goog\//i);

    await expect(theme.desktop.getByRole('button', { name: 'light mode' }))
      .toBeHidden();
    await expect(theme.mobile.getByRole('button', { name: 'light mode' }))
      .toBeVisible();

    await options.page!.locator('nav .navbar-sidebar button.navbar-sidebar__close')
      .click();
  } else {
    await expect(nav.desktop.getByRole('link', { name: 'Github' }))
      .toBeVisible();
    expect(await nav.desktop.getByRole('link', { name: 'Github' })
      .getAttribute('href')).toContain('https://github.com/rickypc');
    await expect(nav.mobile.getByRole('link', { name: 'Github' }))
      .toBeHidden();

    await expect(nav.desktop.getByRole('link', { name: 'Linkedin' }))
      .toBeVisible();
    expect(await nav.desktop.getByRole('link', { name: 'Linkedin' })
      .getAttribute('href')).toContain('https://www.linkedin.com/in/rihuang');
    await expect(nav.mobile.getByRole('link', { name: 'Linkedin' }))
      .toBeHidden();

    await expect(nav.desktop.getByRole('link', { name: 'Translate' }))
      .toBeVisible();
    expect(await nav.desktop.getByRole('link', { name: 'Translate' })
      .getAttribute('href')).toMatch(/https:\/\/ricky[^.]+\.translate\.goog\//i);
    await expect(nav.mobile.getByRole('link', { name: 'Translate' }))
      .toBeHidden();

    await expect(theme.desktop.getByRole('button', { name: 'light mode' }))
      .toBeVisible();
    await expect(theme.mobile.getByRole('button', { name: 'light mode' }))
      .toBeHidden();
  }
};

export const hasPdf = async (options: Options) => {
  const images = await pdfToPng(options.url!);
  expect(images).toHaveLength(options.pages!);
  await Promise.all(images.map(async (img, i) => {
    expect(img.content).toMatchSnapshot(`${options.file}/page-${i}.png`);
    await options.testInfo!.attach(`${options.file} page ${i + 1}`, {
      body: img.content,
      contentType: 'image/png',
    });
  }));
};

export const hasPlayback = async (options: Options) => {
  await options.page!.goto(
    `${options.url}?docusaurus-data-volume=silent`,
    { waitUntil: 'domcontentloaded' },
  );
  const locator = options.page!.locator(options.selector!);
  if (await locator.isVisible()) {
    await expect(locator).toHaveAttribute('title', /play/i);
    await locator.click();
    await expect(locator).toHaveAttribute('title', /pause/i);
    await options.page!.waitForFunction(
      (el) => el?.getAttribute('title')?.toLowerCase() !== 'pause',
      await locator.elementHandle(),
    );
    await expect(locator).toHaveAttribute('title', /play/i);
  }
};

export const hasPrint = async (options: Options) => {
  test.skip(options.browserName !== 'chromium', 'Print only works in Chromium');
  const search = options.url!.includes('portfolio')
    ? '?docusaurus-data-carousel-play=manual' : '';
  await options.page!.goto(
    `${options.url}${search}`,
    { waitUntil: 'networkidle' },
  );
  await options.page!.evaluate(() => window
    .dispatchEvent(new Event('beforeprint')));
  const last = options.page!.locator('picture > img').last();
  if (await last?.count?.()) {
    await last.scrollIntoViewIfNeeded();
  }
  await options.page!.waitForLoadState('networkidle');
  await options.page!.evaluate(async () => new Promise((resolve) => {
    setTimeout(() => requestAnimationFrame(resolve), 750);
  }));
  if (options.selector) {
    await options.page!.waitForSelector(options.selector, { timeout: 750 })
      .catch(() => {});
  }
  const pdf = await options.page!.pdf({
    format: 'Letter',
    printBackground: true,
  });
  const images = await pdfToPng(pdf.buffer.slice(
    pdf.byteOffset,
    pdf.byteOffset + pdf.byteLength,
  ));
  await Promise.all(images.map(async (img, i) => {
    expect(img.content).toMatchSnapshot(`print-page-${i}.png`);
    await options.testInfo!.attach(`Print page ${i + 1}`, {
      body: img.content,
      contentType: 'image/png',
    });
  }));
};

export const hasScreenshot = async (options: Options) => {
  const screenshotOptions: PageScreenshotOptions = {
    animations: 'disabled',
    fullPage: true,
    scale: 'css',
  };
  const themeLower = options.theme!.toLowerCase();
  // After themeLower assignment.
  let search = `?docusaurus-theme=${themeLower}`;
  if (options.url!.includes('portfolio')) {
    search += '&docusaurus-data-carousel-play=manual';
  }
  await options.page!.goto(
    `${options.url}${search}`,
    { waitUntil: 'networkidle' },
  );
  if (options.selector) {
    await options.page!.waitForSelector(options.selector, { timeout: 750 })
      .catch(() => {});
  }
  await expect(options.page!)
    .toHaveScreenshot(`${themeLower}.png`, screenshotOptions);
  await options.testInfo!.attach(`${options.theme} Theme`, {
    body: await options.page!.screenshot(screenshotOptions),
    contentType: 'image/png',
  });
};

export const hasUrl = async (options: Options) => expect(options.page!)
  .toHaveURL(`${options.baseURL}${options.url}`);

export { mobile, test };
