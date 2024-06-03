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

const url = '/timeline';

test.beforeEach(async ({ page }, testInfo) => beforeEach(page, testInfo, url));

test('has correct URL', async ({ baseURL, page }) => hasUrl(baseURL, page, url));

test('has correct title', async ({ page }) => hasTitle(page, 'Experiences, knowledge, and education | Ricky Huang'));

test('has correct header', async ({ page }) => hasHeader(page));

test('has 8 events', async ({ page }) => {
  await band(8, async (index) => {
    const nth = index + 1;
    expect(await page.textContent(`main section [class*='timeline_']:nth-of-type(${nth}) article`)).toMatchSnapshot(`event-${nth}.txt`);
  });
});

['Dark', 'Light'].forEach((theme) => {
  test(
    `has correct ${theme.toLowerCase()} theme screenshot`,
    async ({ page }, testInfo) => hasScreenshot(page, testInfo, theme, url),
  );
});
