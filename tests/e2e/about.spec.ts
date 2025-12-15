/*!
 * All the code that follow is
 * Copyright (c) 2015 - 2025 Richard Huang <rickypc@users.noreply.github.com>.
 * All Rights Reserved. Not for reuse without permission.
 */

import {
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
} from './helper';

const url = '/about';

test.beforeEach(async ({ page }, testInfo) => beforeEach(page, testInfo, url));

test('has correct URL', async ({ baseURL, page }) => hasUrl(baseURL as string, page, url));
test('has correct metadatas', hasMetadatas);
test('has correct header', hasHeader);
test('has active navigation', async ({ page }, testInfo) => hasActiveNavigation('About Me', page, testInfo));
test('has navigations', async ({ page }, testInfo) => hasNavigations(page, testInfo));

test('has types', async ({ page }) => {
  await Promise.all(['Transformer People Type', 'Transactor Task Type'].map(async (label, index) => {
    // [class] can contain multiple classes, figure_ or shape_ may not be the first.
    const locator = page.locator(`figure[class*='figure_'] div[class*='shape_'] svg:nth-of-type(${index + 1})`);
    await expect(locator).toBeVisible();
    expect(await locator.getAttribute('aria-label')).toEqual(label);
  }));
});

test('has correct content', async ({ page }) => {
  const content = {
    h2: 'content-headline',
    h3: 'content-subheadline',
    'p:nth-of-type(1)': 'content-paragraph-1',
    'p:nth-of-type(2)': 'content-paragraph-2',
    ul: 'content-list',
  };
  await Promise.all(Object.entries(content).map(async ([tag, name]) => {
    expect(await page.textContent(`main section article ${tag}`)).toMatchSnapshot(`${name}.txt`);
  }));
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
