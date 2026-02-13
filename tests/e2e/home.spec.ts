/*!
 * Copyright © 2015 Richard Huang <rickypc@users.noreply.github.com>
 * All rights reserved.
 */

import {
  afterAll,
  band,
  beforeAll,
  type BrowserContext,
  expect,
  hasMetadatas,
  hasNavigations,
  hasPlayback,
  hasPrint,
  hasScreenshot,
  hasUrl,
  mobile,
  type Page,
  test,
} from './helper';

const url = '/';

test.describe.serial('shared page tests', () => {
  let context: BrowserContext;
  let page: Page;

  test.afterAll(async () => afterAll(context));
  test.beforeAll(async ({ browser }) => {
    ({ context, page } = await beforeAll({ browser, url }));
  });

  test('has correct URL', async ({ baseURL }) => hasUrl({ baseURL, page, url }));
  test('has correct metadatas', async () => hasMetadatas({ page }));

  test('has 4 paragraphs', async () => {
    await band(4, async (index) => {
      const nth = index + 1;
      await Promise.all((await page.locator(`main article:nth-of-type(${nth}) h2 span[class*='phrases_'] span[class*='word_']`).all())
        .map(async (word) => expect(word).toBeVisible()));
      expect(await page.textContent(`main article:nth-of-type(${nth}) p`))
        .toMatchSnapshot(`paragraph-${nth}.txt`);
    });
  });

  // eslint-disable-next-line no-empty-pattern
  test('has self image', async ({}, testInfo) => {
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

  test('has social links', async () => {
    await band(2, async (index) => {
      await expect(page.locator(`main ul[class*='social_'] li:nth-of-type(${index + 1}) a`))
        .toBeVisible();
    });
  });
});

test.describe('isolated tests', () => {
  test('has navigations', async ({ page }, testInfo) => hasNavigations({ page, testInfo, url }));

  test('has greeting', async ({ page }) => {
    // [class] can contain multiple classes, controls_ may not be the first.
    await hasPlayback({ page, selector: 'main header [class*="greeting_"] [class*="controls_"] [class*="control_"]', url });
    const nth = 1;
    // After nth assignment.
    const locator = page.locator(`main header [class*="greeting_"]>[class*="pronunciation_"]>span:nth-of-type(${nth})`);
    await expect(locator).toBeVisible();
    expect(await locator.textContent()).toMatchSnapshot(`greeting-${nth}.txt`);
  });

  test('has correct print screenshot', async ({ browserName, page }, testInfo) => hasPrint({
    browserName,
    page,
    selector: 'section.row article[aria-label="Innovator"] [class*="character_"][style*="opacity: 1"]:nth-of-type(9)',
    testInfo,
    url,
  }));

  ['Dark', 'Light'].forEach((theme) => {
    test(
      `has correct ${theme.toLowerCase()} theme screenshot`,
      async ({ page }, testInfo) => hasScreenshot({
        page,
        selector: 'section.row article[aria-label="Innovator"] [class*="character_"][style*="opacity: 1"]:nth-of-type(9)',
        testInfo,
        theme,
        url,
      }),
    );
  });
});
