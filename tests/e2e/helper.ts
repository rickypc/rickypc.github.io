/*!
 * All the code that follow is
 * Copyright (c) 2015 - 2025 Richard Huang <rickypc@users.noreply.github.com>.
 * All Rights Reserved. Not for reuse without permission.
 */

import {
  expect,
  type Page,
  type PageScreenshotOptions,
  type PlaywrightTestArgs,
  test,
  type TestInfo,
} from '@playwright/test';
import { pdfToPng } from 'pdf-to-png-converter';
import { URLSearchParams } from 'node:url';

// eslint-disable-next-line no-unused-vars
export type BandCallback<T, U = T> = (value: T, index?: number, array?: T[]) => U | Promise<U>;

const mobile = (testInfo: TestInfo) => /^mobile/i.test(testInfo?.project?.name);

export const band = async <T>(count: number, callback: BandCallback<number, T>) => Promise.all(
  [...Array(count).keys()].map(callback),
);

export const beforeEach = async (page: Page, testInfo: TestInfo, url: string) => {
  if (![
    'has correct dark theme screenshot',
    'has correct light theme screenshot',
    'has greeting',
  ].includes(testInfo.title)) {
    await page.goto(url, { waitUntil: 'networkidle' });
    await page.waitForSelector('#__docusaurus .main-wrapper', { state: 'visible' });
  }
};

export { expect };

export const hasActiveNavigation = async (name: string, page: Page, testInfo: TestInfo) => {
  if (mobile(testInfo)) {
    await page.locator('nav .navbar__inner button.navbar__toggle').click();
    await expect(page.getByRole('link', { name })).toHaveClass(/menu__link--active/);
  } else {
    await expect(page.getByRole('link', { name })).toHaveClass(/navbar__link--active/);
  }
};

export const hasHeader = async ({ page }: PlaywrightTestArgs) => {
  expect(await page.textContent('main header h1')).toMatchSnapshot('header-headline.txt');
  expect(await page.textContent('main header p')).toMatchSnapshot('header-description.txt');
};

export const hasMetadatas = async ({ page }: PlaywrightTestArgs) => {
  expect(await page.locator('head>meta[name="description"]').getAttribute('content'))
    .toMatchSnapshot('meta-description.txt');
  expect(await page.locator('head>meta[name="keywords"]').getAttribute('content'))
    .toMatchSnapshot('meta-keywords.txt');
  expect(await page.locator('head>meta[property="og:description"]').getAttribute('content'))
    .toMatchSnapshot('meta-og-description.txt');
  expect(await page.locator('head>meta[property="og:title"]').getAttribute('content'))
    .toMatchSnapshot('meta-og-title.txt');
  expect(await page.locator('head>meta[property="og:type"]').getAttribute('content'))
    .toEqual('website');
  expect(await page.locator('head>meta[name="twitter:description"]').getAttribute('content'))
    .toMatchSnapshot('meta-twitter-description.txt');
  expect(await page.locator('head>meta[name="twitter:title"]').getAttribute('content'))
    .toMatchSnapshot('meta-twitter-title.txt');
  expect(await page.textContent('head>title')).toMatchSnapshot('title.txt');
};

export const hasNavigations = async (page: Page, testInfo: TestInfo) => {
  const nav = {
    desktop: page.locator('nav.navbar .navbar__items--right'),
    mobile: page.locator('nav.navbar .navbar-sidebar .navbar-sidebar__items .menu'),
  };
  const theme = {
    desktop: nav.desktop,
    mobile: page.locator('nav.navbar .navbar-sidebar .navbar-sidebar__brand'),
  };
  if (mobile(testInfo)) {
    await page.locator('nav .navbar__inner button.navbar__toggle').click();

    await expect(nav.desktop.getByRole('link', { name: 'Github' })).toBeHidden();
    await expect(nav.mobile.getByRole('link', { name: 'Github' })).toBeVisible();
    expect(await nav.mobile.getByRole('link', { name: 'Github' }).getAttribute('href')).toContain('https://github.com/rickypc');

    await expect(nav.desktop.getByRole('link', { name: 'Linkedin' })).toBeHidden();
    await expect(nav.mobile.getByRole('link', { name: 'Linkedin' })).toBeVisible();
    expect(await nav.mobile.getByRole('link', { name: 'Linkedin' }).getAttribute('href')).toContain('https://www.linkedin.com/in/rihuang');

    await expect(nav.desktop.getByRole('link', { name: 'Translate' })).toBeHidden();
    await expect(nav.mobile.getByRole('link', { name: 'Translate' })).toBeVisible();
    expect(await nav.mobile.getByRole('link', { name: 'Translate' }).getAttribute('href')).toMatch(/https:\/\/ricky[^.]+\.translate\.goog\//i);

    await expect(theme.desktop.getByRole('button', { name: 'light mode' })).toBeHidden();
    await expect(theme.mobile.getByRole('button', { name: 'light mode' })).toBeVisible();
  } else {
    await expect(nav.desktop.getByRole('link', { name: 'Github' })).toBeVisible();
    expect(await nav.desktop.getByRole('link', { name: 'Github' }).getAttribute('href')).toContain('https://github.com/rickypc');
    await expect(nav.mobile.getByRole('link', { name: 'Github' })).toBeHidden();

    await expect(nav.desktop.getByRole('link', { name: 'Linkedin' })).toBeVisible();
    expect(await nav.desktop.getByRole('link', { name: 'Linkedin' }).getAttribute('href')).toContain('https://www.linkedin.com/in/rihuang');
    await expect(nav.mobile.getByRole('link', { name: 'Linkedin' })).toBeHidden();

    await expect(nav.desktop.getByRole('link', { name: 'Translate' })).toBeVisible();
    expect(await nav.desktop.getByRole('link', { name: 'Translate' }).getAttribute('href')).toMatch(/https:\/\/ricky[^.]+\.translate\.goog\//i);
    await expect(nav.mobile.getByRole('link', { name: 'Translate' })).toBeHidden();

    await expect(theme.desktop.getByRole('button', { name: 'light mode' })).toBeVisible();
    await expect(theme.mobile.getByRole('button', { name: 'light mode' })).toBeHidden();
  }
};

export const hasPrint = async (
  browserName: string,
  page: Page,
  testInfo: TestInfo,
  url: string,
) => {
  test.skip(browserName !== 'chromium', 'PDF only works in Chromium');
  const params: Record<string, string> = {};
  if (url.includes('portfolio')) {
    params['docusaurus-data-carousel-play'] = 'manual';
  }
  await page.goto(`${url}?${new URLSearchParams(params).toString()}`, { waitUntil: 'networkidle' });
  await page.waitForSelector('#__docusaurus .main-wrapper', { state: 'visible' });
  await page.evaluate(() => window.dispatchEvent(new Event('beforeprint')));
  await page.waitForLoadState('networkidle');
  const last = page.locator('picture > img').last();
  if (await last.count() > 0) {
    await last.scrollIntoViewIfNeeded();
    await page.evaluate(async (el) => {
      await (el as HTMLImageElement)?.decode?.();
      await new Promise((resolve) => {
        setTimeout(() => {
          requestAnimationFrame(() => requestAnimationFrame(resolve));
        }, 500);
      });
    }, await last.elementHandle());
  }
  const pdf = await page.pdf({ format: 'Letter', printBackground: true });
  const images = await pdfToPng(pdf.buffer.slice(
    pdf.byteOffset,
    pdf.byteOffset + pdf.byteLength,
  ));
  await Promise.all(images.map(async (img, i) => {
    expect(img.content).toMatchSnapshot(`print-page-${i}.png`);
    await testInfo.attach(`Print page ${i + 1}`, {
      body: img.content,
      contentType: 'image/png',
    });
  }));
};

export const hasScreenshot = async (page: Page, testInfo: TestInfo, theme: string, url: string) => {
  const options: PageScreenshotOptions = { animations: 'disabled', fullPage: true, scale: 'css' };
  const themeLower = theme.toLowerCase();
  // After themeLower assignment.
  const params: Record<string, string> = { 'docusaurus-theme': themeLower };
  if (url.includes('portfolio')) {
    params['docusaurus-data-carousel-play'] = 'manual';
  }
  await page.goto(`${url}?${new URLSearchParams(params).toString()}`, { waitUntil: 'networkidle' });
  await page.waitForSelector('#__docusaurus .main-wrapper', { state: 'visible' });
  await expect(page).toHaveScreenshot(`${themeLower}.png`, options);
  await testInfo.attach(`${theme} Theme`, {
    body: await page.screenshot(options),
    contentType: 'image/png',
  });
};

export const hasSpeech = async (page: Page, selector: string, url: string) => {
  const params = { 'docusaurus-data-volume': 'silent' };
  await page.goto(`${url}?${new URLSearchParams(params).toString()}`, { waitUntil: 'networkidle' });
  await page.waitForSelector('#__docusaurus .main-wrapper', { state: 'visible' });
  const locator = page.locator(selector);
  if (await locator.isVisible()) {
    await locator.click();
    await expect(page.evaluate(() => speechSynthesis.speaking)).toBeTruthy();
    await page.waitForFunction(() => !speechSynthesis.speaking);
  }
};

export const hasUrl = async (baseURL: string, page: Page, url: string) => {
  await expect(page.url()).toContain(`${baseURL}${url}`);
};

export { mobile, test };
