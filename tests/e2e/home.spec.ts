/*!
 * All the code that follow is
 * Copyright (c) 2015 - 2025 Richard Huang <rickypc@users.noreply.github.com>.
 * All Rights Reserved. Not for reuse without permission.
 */

import {
  band,
  beforeEach,
  expect,
  hasMetadatas,
  hasNavigations,
  hasPrint,
  hasScreenshot,
  hasSpeech,
  hasUrl,
  mobile,
  test,
} from './utils/helper';

const url = '/';

test.beforeEach(async ({ page }, testInfo) => beforeEach(page, testInfo, url));

test('has correct URL', async ({ baseURL, page }) => hasUrl(baseURL as string, page, url));
test('has correct metadatas', hasMetadatas);
test('has navigations', async ({ page }, testInfo) => hasNavigations(page, testInfo));

test('has greeting', async ({ page }) => {
  await hasSpeech(page, 'main header h1 [class*="controls_"]', url);
  await band(1, async (index) => {
    // 1-based.
    const nth = index + 1;
    // After nth assignment.
    const locator = page.locator(`main header h1>[class*="pronunciation_"]>span:nth-of-type(${nth})`);
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
  if (mobile(testInfo)) {
    await expect(page.locator('main figure picture')).toHaveCount(1);
  } else {
    await expect(page.locator('main figure picture img')).toBeVisible();
    await page.waitForFunction(
      (selector) => {
        const element = document.querySelector(selector);
        if (!element) {
          return false;
        }
        const style = window.getComputedStyle(element);
        return style.opacity === '1' && style.transform === 'none';
      },
      'main figure picture img',
    );
  }
});

test('has social links', async ({ page }) => {
  await band(2, async (index) => {
    await expect(page.locator(`main ul[class*='social_'] li:nth-of-type(${index + 1}) a`)).toBeVisible();
  });
});

test(
  'has correct print screenshot',
  async ({ browserName, page }, testInfo) => hasPrint(browserName, page, testInfo, url),
);

['Dark', 'Light'].forEach((theme) => {
  test(
    `has correct ${theme.toLowerCase()} theme screenshot`,
    async ({ page }, testInfo) => hasScreenshot(page, testInfo, theme, url),
  );
});
