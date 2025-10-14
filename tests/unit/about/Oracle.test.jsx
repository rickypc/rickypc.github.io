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

jest.unmock('@site/src/components/about/Oracle');

describe('about.Oracle', () => {
  it.each([
    [false, 'oracle'],
    [true, 'play oracle'],
  ])('visible=%s -> container.className="%s"', (visible, expectedClassName) => {
    useVisibility.mockReturnValue({ ref: jest.fn(), visible });
    const { container } = render(<Oracle />);
    const outer = container.firstChild;
    expect(outer).toHaveClass(expectedClassName);
    // Exact match (no extra classes)
    expect(outer.className).toEqual(expectedClassName);
  });

  it('renders three oracular items and calls ref on the inner div', () => {
    const mockRef = jest.fn();
    useVisibility.mockReturnValue({ ref: mockRef, visible: false });
    const { container } = render(<Oracle />);

    // Inner wrapper with oraculares
    const wrapper = container.querySelector('.oraculares');
    expect(wrapper).toBeInstanceOf(HTMLElement);
    expect(mockRef).toHaveBeenCalledWith(wrapper);

    // Three oracular divs
    expect(container.getElementsByClassName('oracular1')).toHaveLength(1);
    expect(container.getElementsByClassName('oracular2')).toHaveLength(1);
    expect(container.getElementsByClassName('oracular3')).toHaveLength(1);
  });
});
