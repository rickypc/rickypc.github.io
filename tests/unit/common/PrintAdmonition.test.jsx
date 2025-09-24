/*!
 * Copyright (c) 2015 - 2025 Richard Huang <rickypc@users.noreply.github.com>.
 * All Rights Reserved. Not for reuse without permission.
 * ----------------------------------------------------------------------------
 * @jest-environment jsdom
 */

import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { usePrint } from '@site/src/hooks/observer';
import PrintAdmonition from '../../../src/components/common/PrintAdmonition';

jest.mock('@theme/Admonition', () => ({
  __esModule: true,
  default: ({ type, children }) => (
    <div data-testid="admonition" data-type={type}>
      {children}
    </div>
  ),
}));

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

jest.mock(
  '../../../src/components/common/styles.module.css',
  () => ({
    admonition: 'admonition-class',
  }),
);

describe('PrintAdmonition', () => {
  it('renders nothing when print is ready', () => {
    usePrint.mockReturnValue([true]);
    const { container } = render(<PrintAdmonition />);
    expect(container.firstChild).toBeNull();
  });

  it('renders an aside with Admonition when print is not ready', () => {
    usePrint.mockReturnValue([false]);
    const { getByTestId, getByText } = render(<PrintAdmonition />);

    // The admonition text comes from common.admonitions.print.text
    expect(getByText('Please prepare to print')).toBeInTheDocument();

    // Admonition wrapper gets correct type
    const admonition = getByTestId('admonition');
    expect(admonition).toHaveAttribute('data-type', 'info');

    // Ensure it lives inside an <aside> with aria-hidden and correct classes
    const aside = admonition.closest('aside');
    expect(aside).toHaveAttribute('aria-hidden', 'true');
    expect(aside).toHaveClass('admonition-class row');
  });
});
