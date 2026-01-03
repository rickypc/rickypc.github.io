/*!
 * Copyright © 2015 Richard Huang <rickypc@users.noreply.github.com>
 * All rights reserved.
 * ----------------------------------------------------------------------------
 * @jest-environment jsdom
 */

import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Link from '@site/src/components/common/Link';
import * as useBrokenLinks from '@docusaurus/useBrokenLinks';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

const collectLink = jest.mocked(jest.mocked<any>(useBrokenLinks).collectLink);

jest.unmock('@site/src/components/common/Link');

describe('Link', () => {
  describe('with href provided', () => {
    test('renders external link with rel, target, aria-label, and class', () => {
      render((
        <Link className="ext" href="https://example.com" title="external">
          External
        </Link>
      ));
      const anchor = screen.getByRole('link');
      expect(anchor).toHaveAttribute('aria-label', 'external');
      expect(anchor).toHaveAttribute('href', 'https://example.com');
      expect(anchor).toHaveAttribute('rel', 'noopener noreferrer');
      expect(anchor).toHaveAttribute('target', '_blank');
      expect(anchor).toHaveAttribute('title', 'external');
      expect(anchor).toHaveClass('ext');
    });

    test('renders trailing slashed internal link without rel/target and calls collectLink', () => {
      jest.mocked<any>(useDocusaurusContext).mockReturnValue({
        siteConfig: {
          trailingSlash: true,
          url: 'https://domain.test',
        },
      });
      render((
        <Link className="int" href="/docs/intro" title="internal">
          Internal
        </Link>
      ));
      const anchor = screen.getByRole('link');
      expect(anchor).toHaveAttribute('href', '/docs/intro/');
      expect(anchor).not.toHaveAttribute('rel');
      expect(anchor).not.toHaveAttribute('target');
      expect(collectLink).toHaveBeenCalledWith('/docs/intro');
    });

    test('renders non-trailing slashed internal link without rel/target and calls collectLink', () => {
      jest.mocked<any>(useDocusaurusContext).mockReturnValue({
        siteConfig: {
          trailingSlash: false,
          url: 'https://domain.test',
        },
      });
      render((
        <Link className="int" href="/docs/intro" title="internal">
          Internal
        </Link>
      ));
      const anchor = screen.getByRole('link');
      expect(anchor).toHaveAttribute('href', '/docs/intro');
      expect(anchor).not.toHaveAttribute('rel');
      expect(anchor).not.toHaveAttribute('target');
      expect(collectLink).toHaveBeenCalledWith('/docs/intro');
    });

    test.each([
      ['https://external.com'],
      ['/files/report.pdf'],
    ])('does not call collectLink for %s', (href) => {
      render(<Link href={href}>Test</Link>);
      expect(collectLink).not.toHaveBeenCalled();
    });
  });

  describe('without href', () => {
    test('renders span when validate=true and href is missing', () => {
      render((
        // eslint-disable-next-line jsx-a11y/anchor-is-valid
        <Link className="no-link" validate title="missing">
          No Link
        </Link>
      ));
      const span = screen.getByText('No Link');
      expect(span.tagName).toBe('SPAN');
      expect(span).toHaveClass('no-link');
      expect(span).not.toHaveAttribute('aria-label');
      expect(span).not.toHaveAttribute('title');
    });

    test('renders anchor when validate=false and href is missing', () => {
      render((
        // eslint-disable-next-line jsx-a11y/anchor-is-valid
        <Link className="fallback" title="fallback">
          Fallback
        </Link>
      ));
      const anchor = screen.getByText('Fallback');
      expect(anchor.tagName).toBe('A');
      expect(anchor).toHaveAttribute('aria-label', 'fallback');
      expect(anchor).toHaveAttribute('title', 'fallback');
      expect(anchor).toHaveClass('fallback');
      expect(anchor).not.toHaveAttribute('href');
    });
  });
});
