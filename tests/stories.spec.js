/*!
 * All the code that follow is
 * Copyright (c) 2015 - 2024 Richard Huang <rickypc@users.noreply.github.com>.
 * All Rights Reserved. Not for reuse without permission.
 */

const {
  band,
  beforeEach,
  expect,
  hasHeader,
  hasScreenshot,
  hasTitle,
  hasUrl,
  test,
} = require('./utils/helper');

const url = '/stories';

test.beforeEach(async ({ page }, testInfo) => beforeEach(page, testInfo, url));

test('has correct URL', async ({ baseURL, page }) => hasUrl(baseURL, page, url));
test('has correct title', hasTitle);
test('has correct header', hasHeader);

test('has active navigation', async ({ page }) => {
  await expect(page.getByRole('link', { name: 'Stories' })).toHaveClass(/navbar__link--active/);
});

test('has 4 stories', async ({ page }) => {
  await band(4, async (index) => {
    const nth = index + 1;
    expect(await page.textContent(`main section article:nth-of-type(${nth}) h2`)).toMatchSnapshot(`story-header-${nth}.txt`);
    expect(await page.textContent(`main section article:nth-of-type(${nth}) p`)).toMatchSnapshot(`story-content-${nth}.txt`);
    expect(await page.textContent(`main section article:nth-of-type(${nth}) address`)).toMatchSnapshot(`story-author-${nth}.txt`);
  });
});

['Dark', 'Light'].forEach((theme) => {
  test(
    `has correct ${theme.toLowerCase()} theme screenshot`,
    async ({ page }, testInfo) => hasScreenshot(page, testInfo, theme, url),
  );
});
