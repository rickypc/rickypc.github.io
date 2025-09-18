/*!
 * All the code that follow is
 * Copyright (c) 2015 - 2025 Richard Huang <rickypc@users.noreply.github.com>.
 * All Rights Reserved. Not for reuse without permission.
 */

const { defineConfig, devices } = require('@playwright/test');

// Widely used desktop viewport.
const viewport = { height: 1080, width: 1920 };

module.exports = defineConfig({
  expect: {
    timeout: 25000,
  },
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  fullyParallel: true,
  outputDir: './playwright/results',
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'], viewport },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'], viewport },
    },
    {
      name: 'mobile-chrome',
      use: { ...devices['Pixel 5'] },
    },
    {
      name: 'mobile-safari',
      use: { ...devices['iPhone 12'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'], viewport },
    },
  ],
  reporter: [['html', { outputFolder: './playwright/report' }]],
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  snapshotPathTemplate: './playwright/snapshots/{testFilePath}/{arg}-{projectName}{ext}',
  testDir: './tests/e2e',
  use: {
    baseURL: process.env.BASE_URL || 'http://localhost:3000',
    trace: 'on-first-retry',
  },
  webServer: {
    command: 'yarn start',
    reuseExistingServer: !process.env.CI,
    url: 'http://localhost:3000',
  },
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
});
