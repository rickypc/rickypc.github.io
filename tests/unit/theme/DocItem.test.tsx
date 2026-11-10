/*!
 * Copyright © 2015 Richard Huang <rickypc@users.noreply.github.com>
 * All rights reserved.
 */

import { mock } from 'bun:test';
import { useHistory } from '@docusaurus/router';
import { usePluginData } from '@docusaurus/useGlobalData';
import type { ToolDescriptor, ToolOutcome } from '@site/src/data/model-context';
import { render, screen } from '@testing-library/react';
import DocItemWrapper from '@theme/DocItem';
import type { ComponentProps } from 'react';

const contextMock = () => ({ registerTool: mock(), unregisterTool: mock() });

const descriptorNamed = (context: ReturnType<typeof contextMock>, name: string): ToolDescriptor => {
  const call = context.registerTool.mock.calls.find(
    ([descriptor]) => (descriptor as ToolDescriptor).name === name,
  );
  return call?.[0] as ToolDescriptor;
};

const docSource = (slug: string) => `@site/docs/buddhism/practice-daily-life/phrases/${slug}.mdx`;

const installContext = (context: object) => {
  (globalThis.document as { modelContext?: unknown }).modelContext = context;
};

const installDates = () => {
  (usePluginData as Mocked<typeof usePluginData>).mockReturnValue({
    dates: {
      '/about/': {
        dateModified: '2026-10-01T00:00:00.000Z',
        datePublished: '2025-06-01T00:00:00.000Z',
      },
      '/docs/buddhism/meditation/': {
        dateModified: '2026-10-01T00:00:00.000Z',
        datePublished: '2025-06-01T00:00:00.000Z',
      },
    },
  });
};

const mediaFreeSource = '@site/docs/buddhism/foundations-core-view/why-we-are-born.mdx';

const navigateSpy = () => (useHistory as Mocked<typeof useHistory>).mock.results[0]?.value.push;

const propsFor = (source: string) =>
  ({ content: { metadata: { source } } }) as unknown as ComponentProps<typeof DocItemWrapper>;

const routedSource = '@site/docs/buddhism/practice-daily-life/phrases/index.mdx';

afterEach(() => {
  delete (globalThis.document as { modelContext?: unknown }).modelContext;
  (usePluginData as Mocked<typeof usePluginData>).mockReturnValue({ dates: {} });
});

describe('theme.DocItem', () => {
  test('renders the original doc item with the forwarded props', () => {
    render(<DocItemWrapper {...propsFor(docSource('_aksobhya'))} />);

    expect(screen.getByTestId('doc-item')).toBeInTheDocument();
  });

  test('registers exactly the two docs-domain tools and unregisters them on unmount', () => {
    const context = contextMock();
    installContext(context);
    installDates();
    const view = render(<DocItemWrapper {...propsFor(docSource('_aksobhya'))} />);

    expect(context.registerTool).toHaveBeenCalledTimes(2);
    expect(context.registerTool.mock.calls.map(([descriptor]) => descriptor.name)).toEqual([
      'navigate',
      'get-doc-media',
    ]);
    view.unmount();
    expect(context.unregisterTool).toHaveBeenCalledWith('navigate');
    expect(context.unregisterTool).toHaveBeenCalledWith('get-doc-media');
  });
});

describe('theme.DocItem.navigate tool', () => {
  test('routes a doc path without a trailing slash through the router', async () => {
    const context = contextMock();
    installContext(context);
    installDates();
    render(<DocItemWrapper {...propsFor(docSource('_aksobhya'))} />);

    const outcome = (await descriptorNamed(context, 'navigate').execute({
      path: '/docs/buddhism/meditation',
    })) as ToolOutcome;

    expect(outcome).toEqual({ path: '/docs/buddhism/meditation/' });
    expect(navigateSpy()).toHaveBeenCalledWith('/docs/buddhism/meditation/');
  });

  test('rejects a page route without echoing it', async () => {
    const context = contextMock();
    installContext(context);
    installDates();
    render(<DocItemWrapper {...propsFor(docSource('_aksobhya'))} />);

    const outcome = (await descriptorNamed(context, 'navigate').execute({
      path: '/about/',
    })) as ToolOutcome;

    expect(outcome.error).toMatch(/expects one of the site doc routes/);
    expect(outcome.error).not.toContain('/about/');
    expect(navigateSpy()).not.toHaveBeenCalled();
  });

  test('rejects a non-string path with the route error', async () => {
    const context = contextMock();
    installContext(context);
    installDates();
    render(<DocItemWrapper {...propsFor(docSource('_aksobhya'))} />);

    const outcome = (await descriptorNamed(context, 'navigate').execute({
      path: 42,
    })) as ToolOutcome;

    expect(outcome.error).toMatch(/expects one of the site doc routes/);
  });

  test('rejects empty and whitespace-only paths without navigating anywhere', async () => {
    const context = contextMock();
    installContext(context);
    installDates();
    render(<DocItemWrapper {...propsFor(docSource('_aksobhya'))} />);

    for (const path of ['', '   ']) {
      const outcome = (await descriptorNamed(context, 'navigate').execute({
        path,
      })) as ToolOutcome;
      expect(outcome.error).toMatch(/expects one of the site doc routes/);
    }
    expect(navigateSpy()).not.toHaveBeenCalled();
  });

  test('registers no navigate tool when the docs route universe is empty', () => {
    const context = contextMock();
    installContext(context);
    render(<DocItemWrapper {...propsFor(docSource('_aksobhya'))} />);

    expect(context.registerTool).toHaveBeenCalledTimes(1);
    expect(context.registerTool.mock.calls.map(([descriptor]) => descriptor.name)).toEqual([
      'get-doc-media',
    ]);
  });

  test('registers no docs tool for a source outside the docs topic', () => {
    const context = contextMock();
    installContext(context);
    render(<DocItemWrapper {...propsFor('@site/src/pages/about/index.tsx')} />);

    expect(context.registerTool).not.toHaveBeenCalled();
  });
});

describe('theme.DocItem.get-doc-media tool', () => {
  test("returns the topic's audio and pdf entries with same-origin URLs", async () => {
    const context = contextMock();
    installContext(context);
    installDates();
    render(<DocItemWrapper {...propsFor(docSource('_aksobhya'))} />);

    const outcome = (await descriptorNamed(context, 'get-doc-media').execute()) as ToolOutcome;

    expect(outcome).toEqual({
      audio: [{ title: 'id_ID-news_tts-medium', url: '/audio/aksobhya.m4a' }],
      pdf: [
        { title: 'condensed', url: '/pdf/aksobhya-condensed.pdf' },
        { title: 'roll', url: '/pdf/aksobhya.pdf' },
        { title: 'thangka', url: '/pdf/aksobhya-thangka.pdf' },
        { title: 'wheel', url: '/pdf/aksobhya-wheel.pdf' },
      ],
    });
  });

  test('returns empty lists for the routed phrases index page without a topic of its own', async () => {
    const context = contextMock();
    installContext(context);
    installDates();
    render(<DocItemWrapper {...propsFor(routedSource)} />);

    const outcome = (await descriptorNamed(context, 'get-doc-media').execute()) as ToolOutcome;

    expect(outcome).toEqual({ audio: [], pdf: [] });
  });

  test('returns empty lists for a routed doc without media entries', async () => {
    const context = contextMock();
    installContext(context);
    installDates();
    render(<DocItemWrapper {...propsFor(mediaFreeSource)} />);

    const outcome = (await descriptorNamed(context, 'get-doc-media').execute()) as ToolOutcome;

    expect(outcome).toEqual({ audio: [], pdf: [] });
  });
});
