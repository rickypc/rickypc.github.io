/*!
 * Copyright © 2015 Richard Huang <rickypc@users.noreply.github.com>
 * All rights reserved.
 * ----------------------------------------------------------------------------
 * @jest-environment jsdom
 */

import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { context, faqContext, type FaqItems } from '@site/src/data/common';
import Layout from '@site/src/components/common/Layout';
import { useWelcome } from '@site/src/hooks/observer';

jest.unmock('@site/src/components/common/Layout');

describe('Layout', () => {
  test('calls useWelcome once on mount', () => {
    render((
      <Layout
        className="whatever"
        description="my desc"
        keywords={['foo', 'bar']}
        metadatas={[]}
        title="my title"
      >
        <div>child</div>
      </Layout>
    ));
    expect(useWelcome).toHaveBeenCalledTimes(1);
  });

  describe('with extra metadatas', () => {
    const props = {
      children: <span data-testid="child">Hello world</span>,
      className: 'main-class',
      description: 'desc text',
      keywords: ['one', 'two'],
      metadatas: [
        <meta key="a" name="robots" content="noindex" />,
        <meta key="b" name="author" content="rick" />,
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
      // eslint-disable-next-line testing-library/no-node-access
      expect(head.querySelector('meta[name="author"]'))
        .toHaveAttribute('content', 'rick');
      // eslint-disable-next-line testing-library/no-node-access
      expect(head.querySelector('meta[name="robots"]'))
        .toHaveAttribute('content', 'noindex');
    });

    test('includes JSON-LD script with page metadata', () => {
      render(<Layout {...props} />);

      const script = screen.getByTestId('metadata')
        // eslint-disable-next-line testing-library/no-node-access
        .querySelector('script[type="application/ld+json"]');
      expect(script).toBeInTheDocument();
      expect(script?.textContent).toEqual(context({
        description: 'desc text',
        keywords: ['one', 'two'],
        title: 'Page Title',
      }));
    });

    test('renders twitter metas', () => {
      render(<Layout {...props} />);

      const { head } = document;
      // eslint-disable-next-line testing-library/no-node-access
      expect(head.querySelector('meta[name="twitter:description"]'))
        .toHaveAttribute('content', 'desc text');
      // eslint-disable-next-line testing-library/no-node-access
      expect(head.querySelector('meta[name="twitter:title"]'))
        .toHaveAttribute('content', 'Page Title');
    });

    test('renders children', () => {
      render(<Layout {...props} />);

      expect(screen.getByTestId('child')).toBeInTheDocument();
    });
  });

  test('omits extra metas when metadatas is undefined', () => {
    render((
      <Layout
        className="c"
        description="d"
        keywords={['x']}
        title="t"
      >
        <p />
      </Layout>
    ));
    const { head } = document;
    // eslint-disable-next-line testing-library/no-node-access
    expect(head.querySelector('meta[name="robots"]')).toBeNull();
    // eslint-disable-next-line testing-library/no-node-access
    expect(head.querySelector('meta[name="author"]')).toBeNull();
  });

  describe('with faq and schema', () => {
    const items: FaqItems[] = [{ answer: 'The answer', question: 'What is GEO?' }];
    const faq = { items, slug: 'about' };
    const schema = 'CollectionPage';

    test('emits FAQPage JSON-LD when faq is provided', () => {
      render((
        <Layout
          description="d"
          faq={faq}
          keywords={['k']}
          title="t"
        >
          <p />
        </Layout>
      ));
      // eslint-disable-next-line testing-library/no-node-access
      const scripts = document.querySelectorAll('script[type="application/ld+json"]');
      const payloads = Array.from(scripts).map((script) => script.textContent);
      expect(payloads).toContain(faqContext(faq));
    });

    test('emits page-specific schema block when schema is not ProfilePage', () => {
      render((
        <Layout
          description="d"
          faq={faq}
          keywords={['k']}
          schema={schema}
          title="t"
        >
          <p />
        </Layout>
      ));
      // eslint-disable-next-line testing-library/no-node-access
      const scripts = document.querySelectorAll('script[type="application/ld+json"]');
      const payloads = Array.from(scripts).map((script) => script.textContent);
      expect(payloads).toContain(context({
        description: 'd', keywords: ['k'], schema: 'CollectionPage', title: 't',
      }));
    });

    test('omits page-specific schema block when schema is ProfilePage', () => {
      render((
        <Layout
          description="d"
          faq={faq}
          keywords={['k']}
          schema="ProfilePage"
          title="t"
        >
          <p />
        </Layout>
      ));
      // eslint-disable-next-line testing-library/no-node-access
      const scripts = document.querySelectorAll('script[type="application/ld+json"]');
      // Only ProfilePage + FAQPage: the schema override must not duplicate.
      expect(scripts).toHaveLength(2);
    });

    test('omits faq block when faq items is empty', () => {
      render((
        <Layout
          description="d"
          faq={{ items: [], slug: 'about' }}
          keywords={['k']}
          schema="CollectionPage"
          title="t"
        >
          <p />
        </Layout>
      ));
      // eslint-disable-next-line testing-library/no-node-access
      const scripts = document.querySelectorAll('script[type="application/ld+json"]');
      // ProfilePage + CollectionPage only; no FAQPage for empty faq items.
      expect(scripts).toHaveLength(2);
    });

    test('omits geo blocks entirely when faq and schema are omitted', () => {
      render((
        <Layout
          description="d"
          keywords={['k']}
          title="t"
        >
          <p />
        </Layout>
      ));
      // eslint-disable-next-line testing-library/no-node-access
      const scripts = document.querySelectorAll('script[type="application/ld+json"]');
      expect(scripts).toHaveLength(1);
      const first = scripts[0];
      expect(first?.textContent).toBe(context({
        description: 'd', keywords: ['k'], title: 't',
      }));
    });
  });
});
