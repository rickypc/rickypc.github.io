/*!
 * All the code that follow is
 * Copyright (c) 2015 - 2025 Richard Huang <rickypc@users.noreply.github.com>.
 * All Rights Reserved. Not for reuse without permission.
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

export const hasPrint = async (options: Options) => {
  test.skip(options.browserName !== 'chromium', 'Print only works in Chromium');
  const search = options.url!.includes('portfolio')
    ? '?docusaurus-data-carousel-play=manual' : '';
  await options.page!.goto(`${options.url}${search}`, { waitUntil: 'networkidle' });
  await options.page!.evaluate(() => window
    .dispatchEvent(new Event('beforeprint')));
  const last = options.page!.locator('picture > img').last();
  if (await last.count() > 0) {
    await last.scrollIntoViewIfNeeded();
    await options.page!.evaluate(async () => new Promise((resolve) => {
      setTimeout(() => requestAnimationFrame(resolve), 500);
    }));
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
    await options.page!.waitForSelector(options.selector, { timeout: 250 })
      .catch(() => {});
  }
  await expect(options.page!)
    .toHaveScreenshot(`${themeLower}.png`, screenshotOptions);
  await options.testInfo!.attach(`${options.theme} Theme`, {
    body: await options.page!.screenshot(screenshotOptions),
    contentType: 'image/png',
  });
};

export const hasSpeech = async (options: Options) => {
  await options.page!.goto(
    `${options.url}?docusaurus-data-volume=silent`,
    { waitUntil: 'domcontentloaded' },
  );
  const locator = options.page!.locator(options.selector!);
  if (await locator.isVisible()) {
    await locator.click();
    expect(await options.page!.evaluate(() => speechSynthesis.speaking))
      .toBeTruthy();
    await options.page!.waitForFunction(() => !speechSynthesis.speaking);
    expect(await options.page!.evaluate(() => speechSynthesis.speaking))
      .toBeFalsy();
  }
};

export const hasUrl = async (options: Options) => expect(options.page!)
  .toHaveURL(`${options.baseURL}${options.url}`);

export { mobile, test };
