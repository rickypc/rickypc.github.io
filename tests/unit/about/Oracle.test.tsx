/*!
 * Copyright © 2015 Richard Huang <rickypc@users.noreply.github.com>
 * All rights reserved.
 */

import Oracle from '@site/src/components/about/Oracle';
import { useVisibility } from '@site/src/hooks/observer';
import { render, renderHook } from '@testing-library/react';
import { useRef } from 'react';

const useVisibilityMock = useVisibility as Mocked<typeof useVisibility>;

describe('about.Oracle', () => {
  test.each([
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

  test('renders three oracular items and calls ref on the inner div', () => {
    const { result } = renderHook(() => useRef<null>(null));
    useVisibilityMock.mockReturnValue({ ref: result.current, visible: false });
    const { container } = render(<Oracle />);

    // Inner wrapper with oraculares.
    // eslint-disable-next-line testing-library/no-container,testing-library/no-node-access
    const wrapper = container.querySelector('.oraculares');
    expect(wrapper).toBeInstanceOf(HTMLElement);
    expect(wrapper).toEqual(result.current.current);

    // Three oracular divs.
    // eslint-disable-next-line testing-library/no-container,testing-library/no-node-access
    expect(container.getElementsByClassName('oracular1')).toHaveLength(1);
    // eslint-disable-next-line testing-library/no-container,testing-library/no-node-access
    expect(container.getElementsByClassName('oracular2')).toHaveLength(1);
    // eslint-disable-next-line testing-library/no-container,testing-library/no-node-access
    expect(container.getElementsByClassName('oracular3')).toHaveLength(1);
  });
});
