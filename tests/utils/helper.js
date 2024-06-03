/*!
 * All the code that follow is
 * Copyright (c) 2015 - 2024 Richard Huang <rickypc@users.noreply.github.com>.
 * All Rights Reserved. Not for reuse without permission.
 */

const { expect, test } = require('@playwright/test');

export const band = async (count, callback) => Promise.all([...Array(count).keys()].map(callback));

export const beforeEach = async (page, testInfo, url) => {
  if (![
    'has correct dark theme screenshot',
    'has correct light theme screenshot',
    'has greeting',
  ].includes(testInfo.title)) {
    await page.goto(url, { waitUntil: 'networkidle' });
  }
};

export { expect };

export const hasHeader = async ({ page }) => {
  expect(await page.textContent('main header h1')).toMatchSnapshot('header-headline.txt');
  expect(await page.textContent('main header p')).toMatchSnapshot('header-description.txt');
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
  const locator = page.locator(selector);
  if (await locator.isVisible()) {
    await locator.click();
    expect(await page.evaluate(() => speechSynthesis.speaking)).toBeTruthy();
    await page.waitForFunction(() => !speechSynthesis.speaking);
  }
};

export const hasTitle = async ({ page }) => {
  await page.waitForSelector('#__docusaurus .main-wrapper', { visible: true });
  expect(await page.textContent('head>title')).toMatchSnapshot('title.txt');
};

export const hasUrl = async (baseURL, page, url) => {
  await expect(page).toHaveURL(`${baseURL}${url}`);
};

export { test };
