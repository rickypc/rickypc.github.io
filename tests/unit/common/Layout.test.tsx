/*!
 * Copyright © 2015 Richard Huang <rickypc@users.noreply.github.com>
 * All rights reserved.
 */

import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import { usePluginData } from '@docusaurus/useGlobalData';
import Layout from '@site/src/components/common/Layout';
import type { FaqItems, SchemaType } from '@site/src/data/common';
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
