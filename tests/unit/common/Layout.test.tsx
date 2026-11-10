/*!
 * Copyright © 2015 Richard Huang <rickypc@users.noreply.github.com>
 * All rights reserved.
 */

import { beforeAll, mock } from 'bun:test';
import { useHistory, useLocation } from '@docusaurus/router';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import { usePluginData } from '@docusaurus/useGlobalData';
import Layout from '@site/src/components/common/Layout';
import type { FaqItems, SchemaType } from '@site/src/data/common';
import type { ToolDescriptor, ToolOutcome } from '@site/src/data/model-context';
import { useWelcome } from '@site/src/hooks/observer';
import { render, screen } from '@testing-library/react';

const personId = 'https://ricky.one#Person';

const jsonLdScripts = () =>
  screen
    .getByTestId('metadata')
    // eslint-disable-next-line testing-library/no-node-access
    .querySelectorAll('script[type="application/ld+json"]');

// After jsonLdScripts assignment.
const graphOfSoleScript = (): { '@graph': Record<string, unknown>[] } => {
  const scripts = jsonLdScripts();
  expect(scripts).toHaveLength(1);
  return JSON.parse(scripts[0]?.textContent ?? '{}');
};

afterEach(() => {
  (useDocusaurusContext as Mocked<typeof useDocusaurusContext>).mockReturnValue({
    siteConfig: {},
  });
  (usePluginData as Mocked<typeof usePluginData>).mockReturnValue({ dates: {} });
});

const descriptorFromTool = (context: ReturnType<typeof toolContextMock>): ToolDescriptor => {
  const [call] = context.registerTool.mock.calls;
  return (Array.isArray(call) ? call[0] : undefined) as ToolDescriptor;
};

const installArticleDates = () => {
  (usePluginData as Mocked<typeof usePluginData>).mockReturnValue({
    dates: {
      '/': {
        dateModified: '2026-10-01T00:00:00.000Z',
        datePublished: '2025-06-01T00:00:00.000Z',
      },
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

const installToolContext = (context: object) => {
  (globalThis.document as { modelContext?: unknown }).modelContext = context;
};

const navigateSpy = () => (useHistory as Mocked<typeof useHistory>).mock.results[0]?.value.push;

const renderPage = () =>
  render(
    <Layout description="d" keywords={['k']} title="t">
      <p />
    </Layout>,
  );

const toolContextMock = () => ({ registerTool: mock(), unregisterTool: mock() });

describe('Layout.useWelcome', () => {
  test('calls useWelcome once on mount', () => {
    render(
      <Layout
        className="whatever"
        description="my desc"
        keywords={['foo', 'bar']}
        metadatas={[]}
        title="my title"
      >
        <div>child</div>
      </Layout>,
    );
    expect(useWelcome).toHaveBeenCalledTimes(1);
  });
});

describe('Layout.with extra metadatas', () => {
  const props = {
    children: <span data-testid="child">Hello world</span>,
    className: 'main-class',
    description: 'desc text',
    keywords: ['one', 'two'],
    metadatas: [
      <meta content="noindex" key="a" name="robots" />,
      <meta content="rick" key="b" name="author" />,
    ],
    title: 'Page Title',
  };

  test('renders keyword and extra metas', () => {
    render(<Layout {...props} />);

    const child = screen.getByTestId('child');
    expect(child).toHaveTextContent('Hello world');

    const meta = screen.getByTestId('metadata');
    expect(meta).toHaveAttribute('description', 'desc text');
    expect(meta).toHaveAttribute('keywords', 'one,two');
    expect(meta).toHaveAttribute('title', 'Page Title');

    const { head } = document;
    expect(
      // eslint-disable-next-line testing-library/no-node-access
      head.querySelector(/* biome-ignore lint/security/noSecrets: - */ 'meta[name="author"]'),
    ).toHaveAttribute('content', 'rick');
    expect(
      // eslint-disable-next-line testing-library/no-node-access
      head.querySelector(/* biome-ignore lint/security/noSecrets: - */ 'meta[name="robots"]'),
    ).toHaveAttribute('content', 'noindex');
  });

  test('includes one JSON-LD script whose graph carries the profile page node', () => {
    render(<Layout {...props} />);

    const { '@graph': graph } = graphOfSoleScript();
    expect(graph).toHaveLength(2);
    expect(graph[0]).toEqual({
      '@type': 'ProfilePage',
      description: 'desc text',
      headline: 'Ricky Huang Leadership, Full Stack Development, Innovation, and Characteristic',
      keywords: 'one,two',
      mainEntity: { '@id': personId },
      name: 'Page Title',
      url: 'https://ricky.one',
    });
    expect(graph[1]).toMatchObject({
      '@id': personId,
      '@type': 'Person',
      address: { '@type': 'PostalAddress' },
      name: 'Ricky Huang',
    });
  });

  test('emits one BlogPosting graph member when the plugin provides article dates', () => {
    (useDocusaurusContext as Mocked<typeof useDocusaurusContext>).mockReturnValue({
      siteConfig: { url: 'https://ricky.one' },
    });
    (usePluginData as Mocked<typeof usePluginData>).mockReturnValue({
      dates: {
        '/': {
          dateModified: '2026-10-01T00:00:00.000Z',
          datePublished: '2025-06-01T00:00:00.000Z',
        },
      },
    });

    render(<Layout {...props} />);

    const { '@graph': graph } = graphOfSoleScript();
    expect(graph).toHaveLength(3);
    expect(graph[1]).toEqual({
      '@id': 'https://ricky.one/#article',
      '@type': 'BlogPosting',
      author: { '@id': personId },
      dateModified: '2026-10-01T00:00:00.000Z',
      datePublished: '2025-06-01T00:00:00.000Z',
      description: 'desc text',
      headline: 'Page Title',
      image: 'https://ricky.one/img/self.png',
      inLanguage: 'en-US',
      keywords: 'one,two',
      mainEntityOfPage: { '@id': 'https://ricky.one/', '@type': 'WebPage' },
      name: 'Page Title',
      publisher: { '@id': personId },
      url: 'https://ricky.one/',
    });
    expect(graph.filter((node) => node['@id'] === personId)).toHaveLength(1);
  });

  test('renders twitter metas', () => {
    render(<Layout {...props} />);

    const { head } = document;
    // eslint-disable-next-line testing-library/no-node-access
    expect(head.querySelector('meta[name="twitter:description"]')).toHaveAttribute(
      'content',
      'desc text',
    );
    // eslint-disable-next-line testing-library/no-node-access
    expect(head.querySelector('meta[name="twitter:title"]')).toHaveAttribute(
      'content',
      'Page Title',
    );
  });

  test('renders children', () => {
    render(<Layout {...props} />);

    expect(screen.getByTestId('child')).toBeInTheDocument();
  });
});

describe('Layout.without metadatas', () => {
  test('omits extra metas when metadatas is undefined', () => {
    render(
      <Layout className="c" description="d" keywords={['x']} title="t">
        <p />
      </Layout>,
    );
    const { head } = document;
    expect(
      // eslint-disable-next-line testing-library/no-node-access
      head.querySelector(/* biome-ignore lint/security/noSecrets: - */ 'meta[name="robots"]'),
    ).toBeNull();
    expect(
      // eslint-disable-next-line testing-library/no-node-access
      head.querySelector(/* biome-ignore lint/security/noSecrets: - */ 'meta[name="author"]'),
    ).toBeNull();
  });
});

describe('Layout.with faq and schema', () => {
  const items: FaqItems[] = [{ answer: 'The answer', question: 'What is GEO?' }];
  const faq = { items, slug: 'about' };

  test('emits one graph containing the FAQPage node when faq is provided', () => {
    render(
      <Layout description="d" faq={faq} keywords={['k']} title="t">
        <p />
      </Layout>,
    );
    const { '@graph': graph } = graphOfSoleScript();
    expect(graph).toHaveLength(3);
    expect(graph[1]).toEqual({
      '@id': 'https://ricky.one/about#faq',
      '@type': 'FAQPage',
      inLanguage: 'en-US',
      mainEntity: [
        {
          '@id': 'https://ricky.one/about#faq-1',
          '@type': 'Question',
          acceptedAnswer: {
            '@id': 'https://ricky.one/about#faq-1-answer',
            '@type': 'Answer',
            inLanguage: 'en-US',
            text: 'The answer',
          },
          inLanguage: 'en-US',
          name: 'What is GEO?',
        },
      ],
      url: 'https://ricky.one/about',
    });
    expect(graph.filter((node) => node['@id'] === personId)).toHaveLength(1);
  });

  test('emits one graph containing the Review node with author and rating', () => {
    render(
      <Layout description="d" keywords={['k']} schema="Review" title="t">
        <p />
      </Layout>,
    );
    const { '@graph': graph } = graphOfSoleScript();
    expect(graph).toHaveLength(3);
    expect(graph[1]['@type']).toBe('Review');
    expect(graph[1].author).toEqual({ '@id': personId });
    expect(graph[1].reviewRating).toEqual({ '@type': 'Rating', bestRating: 5, ratingValue: 5 });
    expect(graph[1].mainEntity).toEqual(graph[1].author);
    expect(graph.filter((node) => node['@id'] === personId)).toHaveLength(1);
  });

  test('emits one graph containing the CollectionPage node when schema is not ProfilePage', () => {
    render(
      <Layout description="d" faq={faq} keywords={['k']} schema="CollectionPage" title="t">
        <p />
      </Layout>,
    );
    const { '@graph': graph } = graphOfSoleScript();
    expect(graph).toHaveLength(4);
    expect(graph[1]['@type']).toBe('CollectionPage');
    expect(graph[1].mainEntity).toEqual({ '@id': personId });
  });

  test('omits the page-specific node when schema is ProfilePage', () => {
    render(
      <Layout description="d" faq={faq} keywords={['k']} schema="ProfilePage" title="t">
        <p />
      </Layout>,
    );
    const { '@graph': graph } = graphOfSoleScript();
    expect(graph.map((node) => node['@type'])).toEqual(['ProfilePage', 'FAQPage', 'Person']);
  });

  test('omits the FAQPage node when faq items is empty', () => {
    render(
      <Layout
        description="d"
        faq={{ items: [], slug: 'about' }}
        keywords={['k']}
        schema="CollectionPage"
        title="t"
      >
        <p />
      </Layout>,
    );
    const { '@graph': graph } = graphOfSoleScript();
    expect(graph.map((node) => node['@type'])).toEqual(['ProfilePage', 'CollectionPage', 'Person']);
  });

  test('emits only the profile page and person nodes when faq and schema are omitted', () => {
    render(
      <Layout description="d" keywords={['k']} title="t">
        <p />
      </Layout>,
    );
    const { '@graph': graph } = graphOfSoleScript();
    expect(graph.map((node) => node['@type'])).toEqual(['ProfilePage', 'Person']);
    expect(graph.some((node) => node['@type'] === 'BlogPosting')).toBe(false);
  });

  test('throws on a schema type with no node builder', () => {
    expect(() =>
      render(
        <Layout description="d" keywords={['k']} schema={'Person' as SchemaType} title="t">
          <p />
        </Layout>,
      ),
    ).toThrow('No graph node builder for schema type: Person');
  });
});

describe('Layout.get-faq tool', () => {
  const items: FaqItems[] = [
    { answer: 'The answer', question: 'What is GEO?' },
    { answer: 'Because search engines', question: 'Why schema?' },
  ];
  const faq = { items, slug: 'about' };

  afterEach(() => {
    delete (globalThis.document as { modelContext?: unknown }).modelContext;
  });

  test('registers one get-faq tool describing the current page', () => {
    const context = toolContextMock();
    installToolContext(context);
    render(
      <Layout description="d" faq={faq} keywords={['k']} title="t">
        <p />
      </Layout>,
    );

    expect(context.registerTool).toHaveBeenCalledTimes(1);
    const [descriptor] = context.registerTool.mock.calls[0] as [ToolDescriptor];
    expect(descriptor.name).toBe('get-faq');
    expect(descriptor.description).toContain('about');
  });

  test('names the home page when the FAQ slug is empty', () => {
    const context = toolContextMock();
    installToolContext(context);
    render(
      <Layout description="d" faq={{ items, slug: '' }} keywords={['k']} title="t">
        <p />
      </Layout>,
    );

    const [descriptor] = context.registerTool.mock.calls[0] as [ToolDescriptor];
    expect(descriptor.description).toContain('home');
    expect(descriptor.description).not.toContain('  page');
  });

  test('returns the page bounded Q&A payload with the question and answer text', async () => {
    const context = toolContextMock();
    installToolContext(context);
    render(
      <Layout description="d" faq={faq} keywords={['k']} title="t">
        <p />
      </Layout>,
    );
    const outcome = await descriptorFromTool(context).execute();

    expect(outcome).toEqual({
      items: [
        { answer: 'The answer', question: 'What is GEO?' },
        { answer: 'Because search engines', question: 'Why schema?' },
      ],
      page: 'about',
      total: 2,
    });
  });

  test('filters the topic parameter case-insensitively over the questions', async () => {
    const context = toolContextMock();
    installToolContext(context);
    render(
      <Layout description="d" faq={faq} keywords={['k']} title="t">
        <p />
      </Layout>,
    );

    const outcome = await descriptorFromTool(context).execute({ topic: 'schema' });

    expect(outcome.total).toBe(1);
    expect(outcome.items).toEqual([{ answer: 'Because search engines', question: 'Why schema?' }]);
  });

  test('rejects a non-string topic and treats null as no filter', async () => {
    const context = toolContextMock();
    installToolContext(context);
    render(
      <Layout description="d" faq={faq} keywords={['k']} title="t">
        <p />
      </Layout>,
    );

    for (const topic of [42, true, {}]) {
      const outcome = await descriptorFromTool(context).execute({ topic });
      expect(outcome.error).toBe('get-faq expects topic to be a string');
    }
    const outcome = await descriptorFromTool(context).execute({ topic: null });

    expect(outcome.total).toBe(2);
  });

  test('drops FAQ entries without answer text from the payload', async () => {
    const context = toolContextMock();
    installToolContext(context);
    render(
      <Layout
        description="d"
        faq={{ items: [...items, { answer: '', question: 'No answer?' }], slug: 'about' }}
        keywords={['k']}
        title="t"
      >
        <p />
      </Layout>,
    );

    const outcome = await descriptorFromTool(context).execute();

    expect(outcome.total).toBe(2);
  });

  test('registers nothing when the page has no FAQ data', () => {
    const context = toolContextMock();
    installToolContext(context);
    render(
      <Layout description="d" keywords={['k']} title="t">
        <p />
      </Layout>,
    );

    expect(context.registerTool).not.toHaveBeenCalled();
  });

  test('unregisters the tool on unmount', () => {
    const context = toolContextMock();
    installToolContext(context);
    const view = render(
      <Layout description="d" faq={faq} keywords={['k']} title="t">
        <p />
      </Layout>,
    );
    view.unmount();

    expect(context.unregisterTool).toHaveBeenCalledWith('get-faq');
  });
});

describe('Layout.navigate tool', () => {
  afterEach(() => {
    delete (globalThis.document as { modelContext?: unknown }).modelContext;
  });

  test('registers one navigate tool with only the page routes from the universe', () => {
    const context = toolContextMock();
    installToolContext(context);
    installArticleDates();
    renderPage();

    expect(context.registerTool).toHaveBeenCalledTimes(1);
    const [descriptor] = context.registerTool.mock.calls[0] as [ToolDescriptor];
    expect(descriptor.name).toBe('navigate');
  });

  test('routes an accepted page path through the router', async () => {
    const context = toolContextMock();
    installToolContext(context);
    installArticleDates();
    renderPage();

    const outcome = (await descriptorFromTool(context).execute({ path: '/about' })) as ToolOutcome;

    expect(outcome).toEqual({ path: '/about/' });
    expect(navigateSpy()).toHaveBeenCalledWith('/about/');
  });

  test('accepts the home route without a trailing slash after normalization', async () => {
    const context = toolContextMock();
    installToolContext(context);
    installArticleDates();
    renderPage();

    const outcome = (await descriptorFromTool(context).execute({ path: '/' })) as ToolOutcome;

    expect(outcome).toEqual({ path: '/' });
  });

  test('rejects every docs path without echoing it', async () => {
    const context = toolContextMock();
    installToolContext(context);
    installArticleDates();
    renderPage();

    const outcome = (await descriptorFromTool(context).execute({
      path: '/docs/buddhism/meditation/',
    })) as ToolOutcome;

    expect(outcome.error).toMatch(/expects one of the site page routes/);
    expect(outcome.error).not.toContain('buddhism');
    expect(outcome.error).not.toContain('meditation');
    expect(navigateSpy()).not.toHaveBeenCalled();
  });

  test('rejects external, protocol-relative, encoded traversal, and non-string paths', async () => {
    const context = toolContextMock();
    installToolContext(context);
    installArticleDates();
    renderPage();

    const rejected = [
      'https://evil.example/about/',
      '//evil.example',
      '/about/%2E%2E/docs',
      42,
      '',
      '   ',
    ];
    for (const path of rejected) {
      const outcome = (await descriptorFromTool(context).execute({ path })) as ToolOutcome;
      expect(outcome.error).toMatch(/expects one of the site page routes/);
    }
    expect(navigateSpy()).not.toHaveBeenCalled();
  });

  test('registers nothing when the route universe is empty', () => {
    const context = toolContextMock();
    installToolContext(context);
    renderPage();

    expect(context.registerTool).not.toHaveBeenCalled();
  });

  test('unregisters the tool on unmount', () => {
    const context = toolContextMock();
    installToolContext(context);
    installArticleDates();
    const view = renderPage();
    view.unmount();

    expect(context.unregisterTool).toHaveBeenCalledWith('navigate');
  });
});

describe('Layout.print-resume tool', () => {
  const printMock = mock();
  const printProperty = Object.getOwnPropertyDescriptor(globalThis, 'print');

  beforeAll(() => {
    (globalThis as { print?: unknown }).print = printMock;
  });

  afterAll(() => {
    if (printProperty) {
      Object.defineProperty(globalThis, 'print', printProperty);
    } else {
      delete (globalThis as { print?: unknown }).print;
    }
  });

  afterEach(() => {
    delete (globalThis.document as { modelContext?: unknown }).modelContext;
    printMock.mockClear();
    (useLocation as Mocked<typeof useLocation>).mockReturnValue({ pathname: '/' });
  });

  test('registers one print-resume tool on the resume route', () => {
    const context = toolContextMock();
    installToolContext(context);
    (useLocation as Mocked<typeof useLocation>).mockReturnValue({ pathname: '/resume/' });
    renderPage();

    expect(context.registerTool).toHaveBeenCalledTimes(1);
    const [descriptor] = context.registerTool.mock.calls[0] as [ToolDescriptor];
    expect(descriptor.name).toBe('print-resume');
  });

  test('opens the print dialog through the existing print flow on invocation', async () => {
    const context = toolContextMock();
    installToolContext(context);
    (useLocation as Mocked<typeof useLocation>).mockReturnValue({ pathname: '/resume/' });
    renderPage();

    const outcome = await descriptorFromTool(context).execute();

    expect(printMock).toHaveBeenCalledTimes(1);
    expect(outcome).toEqual({});
  });

  test('registers nothing on other routes', () => {
    const context = toolContextMock();
    installToolContext(context);
    (useLocation as Mocked<typeof useLocation>).mockReturnValue({ pathname: '/about/' });
    renderPage();

    expect(context.registerTool).not.toHaveBeenCalled();
  });
});
