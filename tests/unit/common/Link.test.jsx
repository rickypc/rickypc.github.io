/*!
 * Copyright (c) 2015 - 2025 Richard Huang <rickypc@users.noreply.github.com>.
 * All Rights Reserved. Not for reuse without permission.
 * ----------------------------------------------------------------------------
 * @jest-environment jsdom
 */

import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import Link from '@site/src/components/common/Link';

const mockCollectLink = jest.fn();

jest.mock('@docusaurus/useBrokenLinks', () => ({
  __esModule: true,
  default: () => ({ collectLink: mockCollectLink }),
}));

jest.mock('framer-motion', () => ({
  __esModule: true,
  domAnimation: {},
  // eslint-disable-next-line react/jsx-no-useless-fragment,react/prop-types
  LazyMotion: ({ children }) => <>{children}</>,
  m: {
    // eslint-disable-next-line @docusaurus/no-html-links
    a: ({ children, ...props }) => <a {...props}>{children}</a>,
  },
}));

jest.mock('@site/src/data/common', () => ({
  __esModule: true,
  a11y: (title) => ({ 'aria-label': title }),
}));

describe('Link', () => {
  beforeEach(() => {
    mockCollectLink.mockClear();
  });

  describe('with href provided', () => {
    it('renders external link with rel, target, aria-label, and class', () => {
      const { getByRole } = render((
        <Link className="ext" href="https://example.com" title="external">
          External
        </Link>
      ));
      const anchor = getByRole('link');
      expect(anchor).toHaveAttribute('href', 'https://example.com');
      expect(anchor).toHaveAttribute('rel', 'noopener noreferrer');
      expect(anchor).toHaveAttribute('target', '_blank');
      expect(anchor).toHaveAttribute('aria-label', 'external');
      expect(anchor).toHaveClass('ext');
    });

    it('renders internal link without rel/target and calls collectLink', () => {
      const { getByRole } = render((
        <Link className="int" href="/docs/intro" title="internal">
          Internal
        </Link>
      ));
      const anchor = getByRole('link');
      expect(anchor).toHaveAttribute('href', '/docs/intro');
      expect(anchor).not.toHaveAttribute('rel');
      expect(anchor).not.toHaveAttribute('target');
      expect(mockCollectLink).toHaveBeenCalledWith('/docs/intro');
    });

    it.each([
      ['https://external.com'],
      ['/files/report.pdf'],
    ])('does not call collectLink for %s', (href) => {
      render(<Link href={href}>Test</Link>);
      expect(mockCollectLink).not.toHaveBeenCalled();
    });
  });

  describe('without href', () => {
    it('renders span when validate=true and href is missing', () => {
      const { getByText } = render((
        // eslint-disable-next-line jsx-a11y/anchor-is-valid
        <Link className="no-link" validate title="missing">
          No Link
        </Link>
      ));
      const span = getByText('No Link');
      expect(span.tagName).toBe('SPAN');
      expect(span).toHaveClass('no-link');
      expect(span).not.toHaveAttribute('aria-label');
    });

    it('renders anchor when validate=false and href is missing', () => {
      const { getByText } = render((
        // eslint-disable-next-line jsx-a11y/anchor-is-valid
        <Link className="fallback" title="fallback">
          Fallback
        </Link>
      ));
      const anchor = getByText('Fallback');
      expect(anchor.tagName).toBe('A');
      expect(anchor).toHaveClass('fallback');
      expect(anchor).toHaveAttribute('aria-label', 'fallback');
      expect(anchor).not.toHaveAttribute('href');
    });
  });
});
