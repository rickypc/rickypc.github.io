/*!
 * All the code that follow is
 * Copyright (c) 2015 - 2025 Richard Huang <rickypc@users.noreply.github.com>.
 * All Rights Reserved. Not for reuse without permission.
 */

const { expect, test } = require('@playwright/test');

const mobile = (testInfo) => /^mobile/i.test(testInfo?.project?.name);

export const band = async (count, callback) => Promise.all([...Array(count).keys()].map(callback));

export const beforeEach = async (page, testInfo, url) => {
  if (![
    'has correct dark theme screenshot',
    'has correct light theme screenshot',
    'has greeting',
  ].includes(testInfo.title)) {
    await page.goto(url, { waitUntil: 'networkidle' });
    await page.waitForSelector('#__docusaurus .main-wrapper', { visible: true });
  }
};

export { expect };

export const hasActiveNavigation = async (name, page, testInfo) => {
  if (mobile(testInfo)) {
    await page.locator('nav .navbar__inner button.navbar__toggle').click();
    await expect(page.getByRole('link', { name })).toHaveClass(/menu__link--active/);
  } else {
    await expect(page.getByRole('link', { name })).toHaveClass(/navbar__link--active/);
  }
};

export const hasHeader = async ({ page }) => {
  expect(await page.textContent('main header h1')).toMatchSnapshot('header-headline.txt');
  expect(await page.textContent('main header p')).toMatchSnapshot('header-description.txt');
};

export const hasMetadatas = async ({ page }) => {
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

export const hasNavigations = async (page, testInfo) => {
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

export const hasScreenshot = async (page, testInfo, theme, url) => {
  const options = { animations: 'disabled', fullPage: true, scale: 'css' };
  const themeLower = theme.toLowerCase();
  await page.goto(`${url}?docusaurus-theme=${themeLower}`, { waitUntil: 'networkidle' });
  await page.waitForSelector('#__docusaurus .main-wrapper', { visible: true });
  await expect(page).toHaveScreenshot(`${themeLower}.png`, options);
  await testInfo.attach(`${theme} Theme`, {
    body: await page.screenshot(options),
    contentType: 'image/png',
  });
};

export const hasSpeech = async (page, selector, url) => {
  await page.goto(`${url}?docusaurus-data-volume=silent`, { waitUntil: 'networkidle' });
  await page.waitForSelector('#__docusaurus .main-wrapper', { visible: true });
  const locator = page.locator(selector);
  if (await locator.isVisible()) {
    await locator.click();
    await expect(page.evaluate(() => speechSynthesis.speaking)).toBeTruthy();
    await page.waitForFunction(() => !speechSynthesis.speaking);
  }
};

export const hasUrl = async (baseURL, page, url) => {
  await expect(page.url()).toContain(`${baseURL}${url}`);
};

export { mobile, test };
