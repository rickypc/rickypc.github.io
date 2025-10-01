/*!
 * Copyright (c) 2015 - 2025 Richard Huang <rickypc@users.noreply.github.com>.
 * All Rights Reserved. Not for reuse without permission.
 * ----------------------------------------------------------------------------
 * @jest-environment jsdom
 */

import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import PrintAdmonition from '@site/src/components/common/PrintAdmonition';
import { usePrint } from '@site/src/hooks/observer';

jest.mock('@site/src/hooks/observer', () => ({ usePrint: jest.fn() }));

jest.mock('@theme/Admonition', () => ({
  __esModule: true,
  default: ({ children, type }) => (
    <div data-testid="admonition" data-type={type}>{children}</div>
  ),
}));

describe('PrintAdmonition', () => {
  describe('when print is not ready', () => {
    it('renders an aside with Admonition', () => {
      usePrint.mockReturnValue([false]);
      const { getByTestId, getByText } = render(<PrintAdmonition />);
      expect(getByText('The print content is not ready. Please try again.')).toBeInTheDocument();

      const admonition = getByTestId('admonition');
      expect(admonition).toHaveAttribute('data-type', 'warning');

      const aside = admonition.closest('aside');
      expect(aside).toHaveAttribute('aria-hidden', 'true');
      expect(aside).toHaveClass('admonition row');
    });
  });

  describe('when print is ready', () => {
    it('renders nothing', () => {
      usePrint.mockReturnValue([true]);
      const { container } = render(<PrintAdmonition />);
      expect(container.firstChild).toBeNull();
    });
  });
});
