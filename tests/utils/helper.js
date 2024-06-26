/*!
 * All the code that follow is
 * Copyright (c) 2015 - 2024 Richard Huang <rickypc@users.noreply.github.com>.
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

export const hasTitle = async ({ page }) => {
  expect(await page.textContent('head>title')).toMatchSnapshot('title.txt');
};

export const hasUrl = async (baseURL, page, url) => {
  await expect(page).toHaveURL(new RegExp(`^${baseURL}${url}/?`));
};

export { mobile, test };
