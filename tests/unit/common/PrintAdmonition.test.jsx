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

jest.mock(
  '@site/src/components/common/PrintAdmonition/styles.module.css',
  () => ({ admonition: 'admonition-class' }),
);

jest.mock('@site/src/data/common', () => ({
  __esModule: true,
  admonitions: {
    print: {
      type: 'info',
      text: 'Please prepare to print',
    },
  },
  clsx: (...args) => args.filter(Boolean).join(' '),
}));

jest.mock('@site/src/hooks/observer', () => ({
  __esModule: true,
  usePrint: jest.fn(),
}));

jest.mock('@theme/Admonition', () => ({
  __esModule: true,
  default: ({ type, children }) => (
    <div data-testid="admonition" data-type={type}>
      {children}
    </div>
  ),
}));

describe('PrintAdmonition', () => {
  beforeEach(() => {
    usePrint.mockReturnValue([false]);
  });

  describe('when print is not ready', () => {
    it('renders an aside with Admonition', () => {
      const { getByTestId, getByText } = render(<PrintAdmonition />);
      expect(getByText('Please prepare to print')).toBeInTheDocument();

      const admonition = getByTestId('admonition');
      expect(admonition).toHaveAttribute('data-type', 'info');

      const aside = admonition.closest('aside');
      expect(aside).toHaveAttribute('aria-hidden', 'true');
      expect(aside).toHaveClass('admonition-class row');
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
