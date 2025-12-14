/*!
 * All the code that follow is
 * Copyright (c) 2015 - 2025 Richard Huang <rickypc@users.noreply.github.com>.
 * All Rights Reserved. Not for reuse without permission.
 */

import {
  band,
  beforeEach,
  expect,
  hasActiveNavigation,
  hasHeader,
  hasMetadatas,
  hasNavigations,
  hasPrint,
  hasScreenshot,
  hasUrl,
  test,
} from './utils/helper';

const url = '/portfolio';

test.beforeEach(async ({ page }, testInfo) => beforeEach(page, testInfo, url));

test('has correct URL', async ({ baseURL, page }) => hasUrl(baseURL as string, page, url));
test('has correct metadatas', hasMetadatas);
test('has correct header', hasHeader);
test('has active navigation', async ({ page }, testInfo) => hasActiveNavigation('Portfolio', page, testInfo));
test('has navigations', async ({ page }, testInfo) => hasNavigations(page, testInfo));

test('has 12 portfolios', async ({ page }) => {
  await band(12, async (index) => {
    const nth = index + 1;
    expect(await page.textContent(`main section article:nth-of-type(${nth}) figure figcaption`)).toMatchSnapshot(`portfolio-${nth}.txt`);
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
