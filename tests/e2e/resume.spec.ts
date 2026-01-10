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
  hasActiveNavigation,
  hasMetadatas,
  hasNavigations,
  hasPrint,
  hasScreenshot,
  hasUrl,
  type Page,
  test,
} from './helper';

const url = '/resume';

test.describe.serial('shared page tests', () => {
  let context: BrowserContext;
  let page: Page;

  test.afterAll(async () => afterAll(context));
  test.beforeAll(async ({ browser }) => {
    ({ context, page } = await beforeAll({ browser, url }));
  });

  test('has correct URL', async ({ baseURL }) => hasUrl({ baseURL, page, url }));
  test('has correct metadatas', async () => hasMetadatas({ page }));
  // eslint-disable-next-line no-empty-pattern
  test('has active navigation', async ({}, testInfo) => hasActiveNavigation({ name: 'Resume', page, testInfo }));

  test('has 1 header and 8 sections', async () => {
    // [class] can contain multiple classes, timeline_ may not be the first.
    expect(await page.textContent('main header[class*="header_"]'))
      .toMatchSnapshot('header.txt');
    await band(8, async (index) => {
      const nth = index + 1;
      // [class] can contain multiple classes, timeline_ may not be the first.
      expect(await page.textContent(`main section[class*='block_']:nth-of-type(${nth})`))
        .toMatchSnapshot(`section-${nth}.txt`);
    });
  });
});

test.describe('isolated tests', () => {
  test('has navigations', async ({ page }, testInfo) => hasNavigations({ page, testInfo, url }));

  test('has correct print screenshot', async ({ browserName, page }, testInfo) => hasPrint({
    browserName, page, testInfo, url,
  }));

  ['Dark', 'Light'].forEach((theme) => {
    test(
      `has correct ${theme.toLowerCase()} theme screenshot`,
      async ({ page }, testInfo) => hasScreenshot({
        page, testInfo, theme, url,
      }),
    );
  });
});
