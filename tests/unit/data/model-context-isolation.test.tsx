/*!
 * Copyright © 2015 Richard Huang <rickypc@users.noreply.github.com>
 * All rights reserved.
 */

import { mock } from 'bun:test';
import { join } from 'node:path';
import { useHistory, useLocation } from '@docusaurus/router';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import { usePluginData } from '@docusaurus/useGlobalData';
import Layout from '@site/src/components/common/Layout';
import type { ToolDescriptor, ToolOutcome } from '@site/src/data/model-context';
import { render } from '@testing-library/react';
import DocItemWrapper from '@theme/DocItem';
import type { ComponentProps } from 'react';

type MediaEntry = { title: string; url: string };

const contextMock = () => ({ registerTool: mock(), unregisterTool: mock() });

const datesFor = (routes: readonly string[]) =>
  Object.fromEntries(
    routes.map((route) => [
      route,
      { dateModified: '2026-10-01T00:00:00.000Z', datePublished: '2025-06-01T00:00:00.000Z' },
    ]),
  );

const descriptorNamed = (context: ReturnType<typeof contextMock>, name: string): ToolDescriptor => {
  const call = context.registerTool.mock.calls.find(
    ([descriptor]) => (descriptor as ToolDescriptor).name === name,
  );
  return call?.[0] as ToolDescriptor;
};

const docPropsFor = (source: string) =>
  ({ content: { metadata: { source } } }) as unknown as ComponentProps<typeof DocItemWrapper>;

const docRoutes = [
  '/docs/buddhism/meditation/',
  '/docs/buddhism/practice-daily-life/phrases/_aksobhya/',
];

const docSource = '@site/docs/buddhism/practice-daily-life/phrases/_aksobhya.mdx';

const installContext = (context: object) => {
  (globalThis.document as { modelContext?: unknown }).modelContext = context;
};

const installUniverse = (routes: readonly string[]) => {
  (usePluginData as Mocked<typeof usePluginData>).mockReturnValue({ dates: datesFor(routes) });
};

const navigateSpy = () => (useHistory as Mocked<typeof useHistory>).mock.results[0]?.value.push;

const pageRoutes = ['/', '/about/', '/portfolio/', '/resume/', '/stories/', '/timeline/'];

const registeredNames = (context: ReturnType<typeof contextMock>) =>
  context.registerTool.mock.calls.map(([descriptor]) => (descriptor as ToolDescriptor).name);

const renderPages = (pathname: string) => {
  (useLocation as Mocked<typeof useLocation>).mockReturnValue({ pathname });
  return render(
    <Layout description="d" keywords={['k']} title="t">
      <p />
    </Layout>,
  );
};

const sourcePath = (...segments: string[]) => join(import.meta.dir, '..', '..', '..', ...segments);

afterEach(() => {
  delete (globalThis.document as { modelContext?: unknown }).modelContext;
  (usePluginData as Mocked<typeof usePluginData>).mockReturnValue({ dates: {} });
  (useLocation as Mocked<typeof useLocation>).mockReturnValue({ pathname: '/' });
  (useDocusaurusContext as Mocked<typeof useDocusaurusContext>).mockReturnValue({
    siteConfig: {},
  });
});

describe('model-context isolation', () => {
  test('the pages mount registers no tool on a docs-route data universe', () => {
    const context = contextMock();
    installContext(context);
    installUniverse(docRoutes);
    renderPages('/docs/buddhism/meditation/');

    expect(context.registerTool).not.toHaveBeenCalled();
  });

  test('the pages mount never registers a docs-domain tool', () => {
    const context = contextMock();
    installContext(context);
    installUniverse([...pageRoutes, ...docRoutes]);
    renderPages('/about/');

    expect(registeredNames(context)).toEqual(['navigate']);
  });

  test('the pages navigate allowlist rejects every docs route', async () => {
    const context = contextMock();
    installContext(context);
    installUniverse([...pageRoutes, ...docRoutes]);
    renderPages('/about/');
    const navigate = descriptorNamed(context, 'navigate');

    for (const route of [...docRoutes, '/docs/buddhism/meditation', '/docs/buddhism/media/pdf/']) {
      const outcome = (await navigate.execute({ path: route })) as ToolOutcome;
      expect(outcome.error).toBe(
        `navigate expects one of the site page routes: ${[...pageRoutes].sort().join(', ')}`,
      );
    }
    expect(navigateSpy()).not.toHaveBeenCalled();
  });

  test('the docs swizzle registers no tool for a page-route data universe', () => {
    const context = contextMock();
    installContext(context);
    installUniverse(pageRoutes);
    render(<DocItemWrapper {...docPropsFor('@site/src/pages/portfolio/index.tsx')} />);

    expect(context.registerTool).not.toHaveBeenCalled();
  });

  test('the docs swizzle never registers a pages-domain tool', () => {
    const context = contextMock();
    installContext(context);
    installUniverse([...pageRoutes, ...docRoutes]);
    render(<DocItemWrapper {...docPropsFor(docSource)} />);

    expect(registeredNames(context)).toEqual(['navigate', 'get-doc-media']);
  });

  test('the docs navigate allowlist rejects every page route', async () => {
    const context = contextMock();
    installContext(context);
    installUniverse([...pageRoutes, ...docRoutes]);
    render(<DocItemWrapper {...docPropsFor(docSource)} />);
    const navigate = descriptorNamed(context, 'navigate');

    for (const route of pageRoutes) {
      const outcome = (await navigate.execute({ path: route })) as ToolOutcome;
      expect(outcome.error).toBe(
        `navigate expects one of the site doc routes: ${docRoutes.join(', ')}`,
      );
    }
    expect(navigateSpy()).not.toHaveBeenCalled();
  });

  test('the docs media payload carries only same-origin media URLs', async () => {
    const context = contextMock();
    installContext(context);
    installUniverse([...pageRoutes, ...docRoutes]);
    render(<DocItemWrapper {...docPropsFor(docSource)} />);
    const media = descriptorNamed(context, 'get-doc-media');

    const outcome = (await media.execute()) as ToolOutcome;

    for (const entry of [...(outcome.audio as MediaEntry[]), ...(outcome.pdf as MediaEntry[])]) {
      expect(entry.title.length).toBeGreaterThan(0);
      expect(entry.url.startsWith('/audio/') || entry.url.startsWith('/pdf/')).toBe(true);
    }
  });

  test('no changed pages-side module imports a #buddhism/media index', async () => {
    const changedModules = [
      'src/components/common/Layout/index.tsx',
      'src/data/common.ts',
      'src/data/model-context.ts',
      'src/pages/portfolio/index.tsx',
    ];
    for (const module of changedModules) {
      expect(await Bun.file(sourcePath(module)).text()).not.toContain('#buddhism/media/');
    }
    const swizzle = await Bun.file(sourcePath('src/theme/DocItem/index.tsx')).text();
    expect(swizzle).toContain("import audio from '#buddhism/media/audio/_index';");
    expect(swizzle).toContain("import pdf from '#buddhism/media/pdf/_index';");
  });

  test('the pre-existing pages-side audio importer stays the single one', async () => {
    const audioHook = await Bun.file(sourcePath('src/hooks/audio.ts')).text();
    expect(audioHook).toContain("import audio from '#buddhism/media/audio/_index';");
    const pagesModules = await Bun.file(sourcePath('src/data/common.ts')).text();
    expect(pagesModules).not.toContain('#buddhism/media/');
  });
});
