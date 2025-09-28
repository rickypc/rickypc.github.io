/*!
 * Copyright (c) 2015 - 2025 Richard Huang <rickypc@users.noreply.github.com>.
 * All Rights Reserved. Not for reuse without permission.
 * ----------------------------------------------------------------------------
 * @jest-environment jsdom
 */

import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Layout from '@site/src/components/common/Layout';
import { useWelcome } from '@site/src/hooks/observer';

jest.mock('@docusaurus/Head', () => ({
  __esModule: true,
  // eslint-disable-next-line react/jsx-no-useless-fragment
  default: ({ children }) => <>{children}</>,
}));

jest.mock('@site/src/data/common', () => ({
  context: jest.fn(({ description, keywords, title }) => JSON
    .stringify({ description, keywords, title })),
}));

jest.mock('@site/src/hooks/observer', () => ({
  useWelcome: jest.fn(),
}));

jest.mock('@theme/Layout', () => ({
  __esModule: true,
  default: ({ children, description, title }) => (
    <div data-testid="theme-layout" data-description={description} data-title={title}>
      {children}
    </div>
  ),
}));

describe('Layout', () => {
  beforeEach(() => {
    useWelcome.mockClear();
  });

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
    const extraMetas = [
      <meta key="a" name="robots" content="noindex" />,
      <meta key="b" name="author" content="rick" />,
    ];
    let container;

    beforeEach(() => {
      const utils = render((
        <Layout
          className="main-class"
          description="desc text"
          keywords={['one', 'two']}
          metadatas={extraMetas}
          title="Page Title"
        >
          <span data-testid="child">Hello world</span>
        </Layout>
      ));
      container = utils.container;
    });

    it('sets theme layout description and title', () => {
      const theme = screen.getByTestId('theme-layout');
      expect(theme).toHaveAttribute('data-description', 'desc text');
      expect(theme).toHaveAttribute('data-title', 'Page Title');
    });

    it('renders keyword and extra metas', () => {
      expect(container.querySelector('meta[name="keyword"]')).toHaveAttribute(
        'content',
        'one,two',
      );
      expect(container.querySelector('meta[name="robots"]')).toHaveAttribute(
        'content',
        'noindex',
      );
      expect(container.querySelector('meta[name="author"]')).toHaveAttribute(
        'content',
        'rick',
      );
    });

    it('includes JSON-LD script with page metadata', () => {
      const script = container.querySelector(
        'script[type="application/ld+json"]',
      );
      expect(script).toBeInTheDocument();
      expect(script.textContent).toBe(
        JSON.stringify({
          description: 'desc text',
          keywords: ['one', 'two'],
          title: 'Page Title',
        }),
      );
    });

    it('renders twitter metas', () => {
      expect(
        container.querySelector('meta[name="twitter:description"]'),
      ).toHaveAttribute('content', 'desc text');
      expect(
        container.querySelector('meta[name="twitter:title"]'),
      ).toHaveAttribute('content', 'Page Title');
    });

    it('renders children', () => {
      expect(screen.getByTestId('child')).toBeInTheDocument();
    });
  });

  it('omits extra metas when metadatas is undefined', () => {
    const { container } = render((
      <Layout
        className="c"
        description="d"
        keywords={['x']}
        title="t"
      >
        <p />
      </Layout>
    ));
    expect(container.querySelector('meta[name="robots"]')).toBeNull();
    expect(container.querySelector('meta[name="author"]')).toBeNull();
  });
});
