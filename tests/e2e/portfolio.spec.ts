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
  hasHeader,
  hasMetadatas,
  hasNavigations,
  hasPrint,
  hasScreenshot,
  hasUrl,
  type Page,
  test,
} from './helper';

const url = '/portfolio';

test.describe.serial('shared page tests', () => {
  let context: BrowserContext;
  let page: Page;

  test.afterAll(async () => afterAll(context));
  test.beforeAll(async ({ browser }) => {
    ({ context, page } = await beforeAll({ browser, url }));
  });

  test('has correct URL', async ({ baseURL }) => hasUrl({ baseURL, page, url }));
  test('has correct metadatas', async () => hasMetadatas({ page }));
  test('has correct header', async () => hasHeader({ page }));
  // eslint-disable-next-line no-empty-pattern
  test('has active navigation', async ({}, testInfo) => hasActiveNavigation({ name: 'Portfolio', page, testInfo }));

  test('has 14 portfolios', async () => {
    await band(14, async (index) => {
      const nth = index + 1;
      expect(await page.textContent(`main section article:nth-of-type(${nth}) figure figcaption`))
        .toMatchSnapshot(`portfolio-${nth}.txt`);
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
        page, selector: 'article[class^="portfolio_"]:nth-of-type(12) div[class^="indicators_"]', testInfo, theme, url,
      }),
    );
  });
});
