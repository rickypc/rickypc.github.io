/*!
 * Copyright (c) 2015 - 2025 Richard Huang <rickypc@users.noreply.github.com>.
 * All Rights Reserved. Not for reuse without permission.
 * ----------------------------------------------------------------------------
 * @jest-environment jsdom
 */

import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import PrintAdmonition from '@site/src/components/common/PrintAdmonition';
import { usePrint } from '@site/src/hooks/observer';

jest.unmock('@site/src/components/common/PrintAdmonition');

describe('PrintAdmonition', () => {
  describe('when print is not ready', () => {
    it('renders an aside with Admonition', () => {
      usePrint.mockReturnValue([false]);
      render(<PrintAdmonition />);
      expect(screen.getByText('The print content is not ready. Please try again.')).toBeInTheDocument();

      const admonition = screen.getByTestId('admonition');
      expect(admonition).toHaveAttribute('data-type', 'warning');

      // eslint-disable-next-line testing-library/no-node-access
      const aside = admonition.closest('aside');
      expect(aside).toHaveAttribute('aria-hidden', 'true');
      expect(aside).toHaveClass('admonition row');
    });
  });

  describe('when print is ready', () => {
    it('renders nothing', () => {
      usePrint.mockReturnValue([true]);
      const { container } = render(<PrintAdmonition />);
      // eslint-disable-next-line testing-library/no-node-access
      expect(container.firstChild).toBeNull();
    });
  });
});
