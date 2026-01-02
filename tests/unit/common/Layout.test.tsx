/*!
 * Copyright © 2015 Richard Huang <rickypc@users.noreply.github.com>
 * All rights reserved.
 * ----------------------------------------------------------------------------
 * @jest-environment jsdom
 */

import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { context } from '@site/src/data/common';
import Layout from '@site/src/components/common/Layout';
import { useWelcome } from '@site/src/hooks/observer';

jest.unmock('@site/src/components/common/Layout');

describe('Layout', () => {
  it('calls useWelcome once on mount', () => {
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

    it('renders keyword and extra metas', () => {
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

    it('includes JSON-LD script with page metadata', () => {
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

    it('renders twitter metas', () => {
      render(<Layout {...props} />);

      const { head } = document;
      // eslint-disable-next-line testing-library/no-node-access
      expect(head.querySelector('meta[name="twitter:description"]'))
        .toHaveAttribute('content', 'desc text');
      // eslint-disable-next-line testing-library/no-node-access
      expect(head.querySelector('meta[name="twitter:title"]'))
        .toHaveAttribute('content', 'Page Title');
    });

    it('renders children', () => {
      render(<Layout {...props} />);

      expect(screen.getByTestId('child')).toBeInTheDocument();
    });
  });

  it('omits extra metas when metadatas is undefined', () => {
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
});
