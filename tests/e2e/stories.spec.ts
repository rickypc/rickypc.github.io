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

const url = '/stories';

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
  test('has active navigation', async ({}, testInfo) => hasActiveNavigation({ name: 'Stories', page, testInfo }));

  test('has 4 stories', async () => {
    await band(4, async (index) => {
      const nth = index + 1;
      expect(await page.textContent(`main section article:nth-of-type(${nth}) h2`))
        .toMatchSnapshot(`story-header-${nth}.txt`);
      expect(await page.textContent(`main section article:nth-of-type(${nth}) p`))
        .toMatchSnapshot(`story-content-${nth}.txt`);
      expect(await page.textContent(`main section article:nth-of-type(${nth}) address`))
        .toMatchSnapshot(`story-author-${nth}.txt`);
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
        page, selector: 'article[class^="story_"][style*="transform: none"]:nth-of-type(4)', testInfo, theme, url,
      }),
    );
  });
});
