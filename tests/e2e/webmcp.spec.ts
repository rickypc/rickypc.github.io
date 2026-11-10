/*!
 * Copyright © 2015 Richard Huang <rickypc@users.noreply.github.com>
 * All rights reserved.
 */

import { expect, type Page, test } from './helper';

type Capture = { available: boolean; names: string[]; tools: Record<string, Tool> };

type RegisteredTool = Tool & { name: string };

type Tool = { execute: (args?: { path?: string }) => ToolOutcome | Promise<ToolOutcome> };

type ToolOutcome = { error?: string };

const docsRoute = '/docs/buddhism/foundations-core-view/what-is-buddhism/';

declare global {
  interface Window {
    webmcp?: Capture;
  }
}

// Wraps registerTool before any site script runs so the tests observe exactly what a WebMCP
// host would see while keeping the real registration live.
const captureWebMcp = () => {
  const modelContext = (
    document as Document & {
      modelContext?: {
        registerTool?: (descriptor: RegisteredTool, options?: unknown) => unknown;
      };
    }
  ).modelContext;
  const capture: Capture = { available: Boolean(modelContext), names: [], tools: {} };
  window.webmcp = capture;
  if (typeof modelContext?.registerTool !== 'function') {
    return;
  }
  const original = modelContext.registerTool.bind(modelContext);
  modelContext.registerTool = (descriptor, options) => {
    capture.names.push(descriptor.name);
    capture.tools[descriptor.name] = descriptor;
    return original(descriptor, options);
  };
};

const gotoWithCapture = async (page: Page, path: string) => {
  await page.addInitScript(captureWebMcp);
  await page.goto(path);
};

const registeredNames = async (page: Page, tool: string) => {
  await page.waitForFunction((name) => Boolean(window.webmcp?.names?.includes(name)), tool, {
    timeout: 15000,
  });
  return page.evaluate(() => window.webmcp?.names ?? []);
};

test.describe('webmcp on chrome', () => {
  test('exposes document.modelContext under the WebMCP testing flag', async ({ page }) => {
    await gotoWithCapture(page, '/');

    const available = await page.evaluate(() => window.webmcp?.available);

    expect(available).toBe(true);
  });

  test('registers pages-domain tools on the home page', async ({ page }) => {
    await gotoWithCapture(page, '/');

    const names = await registeredNames(page, 'navigate');

    expect(names).toContain('get-faq');
    expect(names).toContain('navigate');
    expect(names).not.toContain('filter-projects');
    expect(names).not.toContain('get-doc-media');
  });

  test('registers filter-projects on the portfolio route', async ({ page }) => {
    await gotoWithCapture(page, '/portfolio/');

    const names = await registeredNames(page, 'filter-projects');

    expect(names).toContain('filter-projects');
    expect(names).not.toContain('get-doc-media');
  });

  test('registers docs-domain tools on a docs content route', async ({ page }) => {
    await gotoWithCapture(page, docsRoute);

    const names = await registeredNames(page, 'get-doc-media');

    expect(names).toContain('navigate');
    expect(names).toContain('get-doc-media');
    expect(names).not.toContain('get-faq');
    expect(names).not.toContain('filter-projects');
  });

  test('drives real browser navigation to an allowed page route', async ({ page }) => {
    await gotoWithCapture(page, '/');
    await registeredNames(page, 'navigate');

    const outcome = (await page.evaluate(() =>
      window.webmcp?.tools.navigate?.execute({ path: '/about/' }),
    )) as ToolOutcome;

    expect(outcome).toEqual({ path: '/about/' });
    await expect(page).toHaveURL(/\/about\/$/);
  });

  test('rejects a docs path on a page route without navigating', async ({ page }) => {
    await gotoWithCapture(page, '/');
    await registeredNames(page, 'navigate');

    const outcome = (await page.evaluate(
      (route) => window.webmcp?.tools.navigate?.execute({ path: route }),
      docsRoute,
    )) as ToolOutcome;

    expect(outcome.error).toMatch(/expects one of the site page routes/);
    expect(page.url()).not.toContain('/docs');
  });
});
