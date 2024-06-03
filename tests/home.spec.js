/*!
 * All the code that follow is
 * Copyright (c) 2015 - 2024 Richard Huang <rickypc@users.noreply.github.com>.
 * All Rights Reserved. Not for reuse without permission.
 */

const {
  band,
  beforeEach,
  expect,
  hasScreenshot,
  hasSpeech,
  hasTitle,
  hasUrl,
  test,
} = require('./utils/helper');

const url = '/';

test.beforeEach(async ({ page }, testInfo) => beforeEach(page, testInfo, url));

test('has correct URL', async ({ baseURL, page }) => hasUrl(baseURL, page, url));
test('has correct title', hasTitle);

test('has greeting', async ({ page }) => {
  await hasSpeech(page, 'main header h1 [class*="controls_"]', url);
  await band(2, async (index) => {
    const nth = index + 1;
    // After nth assignment.
    const locator = page.locator(`main header h1 span:nth-of-type(${nth})`);
    await expect(locator).toBeVisible();
    expect(await locator.textContent()).toMatchSnapshot(`greeting-${nth}.txt`);
  });
});

test('has 4 paragraphs', async ({ page }) => {
  await band(4, async (index) => {
    const nth = index + 1;
    await Promise.all((await page.locator(`main article:nth-of-type(${nth}) h2 span[class*='phrases_'] span[class*='word_']`).all())
      .map(async (word) => expect(word).toBeVisible()));
    expect(await page.textContent(`main article:nth-of-type(${nth}) p`)).toMatchSnapshot(`paragraph-${nth}.txt`);
  });
});

test('has self image', async ({ page }, testInfo) => {
  const selector = /^mobile/i.test(testInfo.project.name) ? 'main figure picture' : 'main figure picture img';
  await expect(page.locator(selector)).toBeVisible();
});

test('has social links', async ({ page }) => {
  await band(2, async (index) => {
    await expect(page.locator(`main ul[class*='social_'] li:nth-of-type(${index + 1}) a`)).toBeVisible();
  });
});

['Dark', 'Light'].forEach((theme) => {
  test(
    `has correct ${theme.toLowerCase()} theme screenshot`,
    async ({ page }, testInfo) => hasScreenshot(page, testInfo, theme, url),
  );
});
