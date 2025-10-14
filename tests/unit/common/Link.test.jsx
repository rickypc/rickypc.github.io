/*!
 * Copyright (c) 2015 - 2025 Richard Huang <rickypc@users.noreply.github.com>.
 * All Rights Reserved. Not for reuse without permission.
 * ----------------------------------------------------------------------------
 * @jest-environment jsdom
 */

import { collectLink } from '@docusaurus/useBrokenLinks';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import Link from '@site/src/components/common/Link';

jest.unmock('@site/src/components/common/Link');

describe('Link', () => {
  describe('with href provided', () => {
    it('renders external link with rel, target, aria-label, and class', () => {
      const { getByRole } = render((
        <Link className="ext" href="https://example.com" title="external">
          External
        </Link>
      ));
      const anchor = getByRole('link');
      expect(anchor).toHaveAttribute('aria-label', 'external');
      expect(anchor).toHaveAttribute('href', 'https://example.com');
      expect(anchor).toHaveAttribute('rel', 'noopener noreferrer');
      expect(anchor).toHaveAttribute('target', '_blank');
      expect(anchor).toHaveAttribute('title', 'external');
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
      expect(collectLink).toHaveBeenCalledWith('/docs/intro');
    });

    it.each([
      ['https://external.com'],
      ['/files/report.pdf'],
    ])('does not call collectLink for %s', (href) => {
      render(<Link href={href}>Test</Link>);
      expect(collectLink).not.toHaveBeenCalled();
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
      expect(span.tagName).toEqual('SPAN');
      expect(span).toHaveClass('no-link');
      expect(span).not.toHaveAttribute('aria-label');
      expect(span).not.toHaveAttribute('title');
    });

    it('renders anchor when validate=false and href is missing', () => {
      const { getByText } = render((
        // eslint-disable-next-line jsx-a11y/anchor-is-valid
        <Link className="fallback" title="fallback">
          Fallback
        </Link>
      ));
      const anchor = getByText('Fallback');
      expect(anchor.tagName).toEqual('A');
      expect(anchor).toHaveAttribute('aria-label', 'fallback');
      expect(anchor).toHaveAttribute('title', 'fallback');
      expect(anchor).toHaveClass('fallback');
      expect(anchor).not.toHaveAttribute('href');
    });
  });
});
