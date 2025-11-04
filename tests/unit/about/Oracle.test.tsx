/*!
 * All the code that follow is
 * Copyright (c) 2015 - 2025 Richard Huang <rickypc@users.noreply.github.com>.
 * All Rights Reserved. Not for reuse without permission.
 * ----------------------------------------------------------------------------
 * @jest-environment jsdom
 */

import { render, renderHook } from '@testing-library/react';
import '@testing-library/jest-dom';
import Oracle from '@site/src/components/about/Oracle';
import { useRef } from 'react';
import { useVisibility } from '@site/src/hooks/observer';

const useVisibilityMock = useVisibility as jest.MockedFunction<typeof useVisibility>;

jest.unmock('@site/src/components/about/Oracle');

describe('about.Oracle', () => {
  it.each([
    [false, 'oracle'],
    [true, 'play oracle'],
  ])('visible=%s -> container.className="%s"', (visible, expectedClassName) => {
    const { result } = renderHook(() => useRef(null));
    useVisibilityMock.mockReturnValue({ ref: result.current, visible });
    const { container } = render(<Oracle />);
    // eslint-disable-next-line testing-library/no-node-access
    const outer = container.firstChild as HTMLElement;
    expect(outer).toHaveClass(expectedClassName);
    // Exact match (no extra classes).
    expect(outer.className).toEqual(expectedClassName);
  });

  it('renders three oracular items and calls ref on the inner div', () => {
    const { result } = renderHook(() => useRef<null>(null));
    useVisibilityMock.mockReturnValue({ ref: result.current, visible: false });
    const { container } = render(<Oracle />);

    // Inner wrapper with oraculares.
    // eslint-disable-next-line testing-library/no-container,testing-library/no-node-access
    const wrapper = container.querySelector('.oraculares');
    expect(wrapper).toBeInstanceOf(HTMLElement);
    expect(result.current.current).toEqual(wrapper);

    // Three oracular divs.
    // eslint-disable-next-line testing-library/no-container,testing-library/no-node-access
    expect(container.getElementsByClassName('oracular1')).toHaveLength(1);
    // eslint-disable-next-line testing-library/no-container,testing-library/no-node-access
    expect(container.getElementsByClassName('oracular2')).toHaveLength(1);
    // eslint-disable-next-line testing-library/no-container,testing-library/no-node-access
    expect(container.getElementsByClassName('oracular3')).toHaveLength(1);
  });
});
