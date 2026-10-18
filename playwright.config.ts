/*!
 * Copyright © 2015 Richard Huang <rickypc@users.noreply.github.com>
 * All rights reserved.
 */

import { defineConfig, devices } from '@playwright/test';

// Widely used desktop viewport.
const viewport = { height: 1080, width: 1920 };

export default defineConfig({
  expect: { timeout: 5000 },
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  fullyParallel: true,
  outputDir: './playwright/results',
  projects: [
    { name: 'audio', testMatch: /.*audio\.spec\.ts/ },
    {
      name: 'chromium',
      testIgnore: /.*(audio|pdf)\.spec\.ts/,
      use: { ...devices['Desktop Chrome'], viewport },
    },
    {
      name: 'firefox',
      testIgnore: /.*(audio|pdf)\.spec\.ts/,
      use: { ...devices['Desktop Firefox'], viewport },
    },
    {
      name: 'mobile-chrome',
      testIgnore: /.*(audio|pdf)\.spec\.ts/,
      use: { ...devices['Pixel 5'] },
    },
    {
      name: 'mobile-safari',
      testIgnore: /.*(audio|pdf)\.spec\.ts/,
      use: { ...devices['iPhone 12'] },
    },
    { name: 'pdf', testMatch: /.*pdf\.spec\.ts/ },
    {
      name: 'webkit',
      testIgnore: /.*(audio|pdf)\.spec\.ts/,
      use: { ...devices['Desktop Safari'], viewport },
    },
  ],
  reporter: [['html', { outputFolder: './playwright/report' }]],
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  snapshotPathTemplate: './playwright/snapshots/{testFilePath}/{arg}-{projectName}{ext}',
  testDir: './tests/e2e',
  use: { baseURL: process.env.BASE_URL || 'http://localhost:3000', trace: 'on-first-retry' },
  webServer: {
    /* Snapshots match the production build's rendering. The dev server's DOM lacks the SSR
     * `<!-- -->` text-node markers the static build keeps, which changes text-run kerning and
     * shifts glyphs by subpixels - deterministic ~0.01% screenshot diffs (e.g. resume themes) plus
     * cold-compile timeouts. Build + serve so every run compares against the shipped site.
     */
    command: 'bun run build && bun run serve',
    reuseExistingServer: !process.env.CI,
    timeout: 600_000,
    url: 'http://localhost:3000',
  },
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
});
