/*!
 * Copyright © 2015 Richard Huang <rickypc@users.noreply.github.com>
 * All rights reserved.
 */

import {
  afterAll,
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

const url = '/about';

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
  test('has active navigation', async ({}, testInfo) => hasActiveNavigation({ name: 'About Me', page, testInfo }));

  test('has types', async () => {
    await Promise.all(['Transformer People Type', 'Transactor Task Type'].map(async (label, index) => {
      // [class] can contain multiple classes, figure_ or shape_ may not be the first.
      const locator = page.locator(`figure[class*='figure_'] div[class*='shape_'] svg:nth-of-type(${index + 1})`);
      await expect(locator).toBeVisible();
      expect(await locator.getAttribute('aria-label')).toEqual(label);
    }));
  });

  test('has correct content', async () => {
    const content = {
      h2: 'content-headline',
      h3: 'content-subheadline',
      'p:nth-of-type(1)': 'content-paragraph-1',
      'p:nth-of-type(2)': 'content-paragraph-2',
      ul: 'content-list',
    };
    await Promise.all(Object.entries(content).map(async ([tag, name]) => {
      expect(await page.textContent(`main section article ${tag}`))
        .toMatchSnapshot(`${name}.txt`);
    }));
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
