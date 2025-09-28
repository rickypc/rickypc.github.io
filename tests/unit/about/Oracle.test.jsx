/*!
 * All the code that follow is
 * Copyright (c) 2015 - 2025 Richard Huang <rickypc@users.noreply.github.com>.
 * All Rights Reserved. Not for reuse without permission.
 * ----------------------------------------------------------------------------
 * @jest-environment jsdom
 */

import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import Oracle from '@site/src/components/about/Oracle';
import { useVisibility } from '@site/src/hooks/observer';

jest.mock(
  '@site/src/components/common/about/Oracle/styles.module.css',
  () => ({
    oracle: 'oracle-class',
    oracular1: 'oracular1-class',
    oracular2: 'oracular2-class',
    oracular3: 'oracular3-class',
    oraculares: 'oraculares-class',
    play: 'play-class',
  }),
);

jest.mock('@site/src/data/common', () => ({
  clsx: (...classes) => classes.filter(Boolean).join(' '),
}));

jest.mock('@site/src/hooks/observer');

describe('about.Oracle', () => {
  it.each([
    [false, 'oracle-class'],
    [true, 'play-class oracle-class'],
  ])('visible=%s → container.className="%s"', (visible, expectedClassName) => {
    useVisibility.mockReturnValue({ ref: jest.fn(), visible });
    const { container } = render(<Oracle />);
    const outer = container.firstChild;
    expect(outer).toHaveClass(expectedClassName);
    // Exact match (no extra classes)
    expect(outer.className).toBe(expectedClassName);
  });

  it('renders three oracular items and calls ref on the inner div', () => {
    const mockRef = jest.fn();
    useVisibility.mockReturnValue({ ref: mockRef, visible: false });
    const { container } = render(<Oracle />);

    // Inner wrapper with oraculares-class
    const wrapper = container.querySelector('.oraculares-class');
    expect(wrapper).toBeInstanceOf(HTMLElement);
    expect(mockRef).toHaveBeenCalledWith(wrapper);

    // Three oracular divs
    expect(container.getElementsByClassName('oracular1-class')).toHaveLength(1);
    expect(container.getElementsByClassName('oracular2-class')).toHaveLength(1);
    expect(container.getElementsByClassName('oracular3-class')).toHaveLength(1);
  });
});
