/*!
 * All the code that follow is
 * Copyright (c) 2015 - 2025 Richard Huang <rickypc@users.noreply.github.com>.
 * All Rights Reserved. Not for reuse without permission.
 * ----------------------------------------------------------------------------
 * @jest-environment jsdom
 */

import { render, renderHook } from '@testing-library/react';
import '@testing-library/jest-dom';
import Figure from '@site/src/components/home/Figure';
import { useRef } from 'react';
import { useVisibility } from '@site/src/hooks/observer';

const useVisibilityMock = jest.mocked(useVisibility);

jest.unmock('@site/src/components/common/Image');
jest.unmock('@site/src/components/home/Figure');

describe('home.Figure', () => {
  it('renders a <figure> with correct accessibility attributes, CSS class, and nested Image', () => {
    const { result } = renderHook(() => useRef(null));
    useVisibilityMock.mockReturnValue({ ref: result.current, visible: true });
    const { container } = render(<Figure />);

    // Target the outer <figure> element directly.
    // eslint-disable-next-line testing-library/no-container,testing-library/no-node-access
    const fig = container.querySelector('figure');
    expect(fig).toHaveClass('figure');
    expect(fig).toHaveAttribute('aria-label', 'Ricky Huang');
    expect(fig).toHaveAttribute('title', 'Ricky Huang');

    // Inner Image should render with correct src and alt.
    // eslint-disable-next-line testing-library/no-node-access
    const img = fig?.querySelector('picture>img');
    expect(img).toHaveAttribute('src', 'self.png');

    // eslint-disable-next-line testing-library/no-node-access
    const source = fig?.querySelector('picture>source');
    expect(source).toHaveAttribute('srcset', 'self.webp');
    expect(source).toHaveAttribute('type', 'image/webp');
  });
});
