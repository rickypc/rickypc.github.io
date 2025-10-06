/*!
 * All the code that follow is
 * Copyright (c) 2015 - 2025 Richard Huang <rickypc@users.noreply.github.com>.
 * All Rights Reserved. Not for reuse without permission.
 * ----------------------------------------------------------------------------
 * @jest-environment jsdom
 */

import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Figure from '@site/src/components/home/Figure';
import { useVisibility } from '@site/src/hooks/observer';

describe('home.Figure', () => {
  it('renders a <figure> with correct accessibility attributes, CSS class, and nested Image', () => {
    useVisibility.mockReturnValue({ visible: true });
    const { container } = render(<Figure />);

    // Target the outer <figure> element directly
    const fig = container.querySelector('figure');
    expect(fig).toHaveClass('figure');
    expect(fig).toHaveAttribute('aria-label', 'Ricky Huang');
    expect(fig).toHaveAttribute('title', 'Ricky Huang');

    // Inner Image should render with correct src and alt
    const img = fig.querySelector('picture>img');
    expect(img).toHaveAttribute('src', 'self.png');

    const source = fig.querySelector('picture>source');
    expect(source).toHaveAttribute('srcset', 'self.webp');
    expect(source).toHaveAttribute('type', 'image/webp');
  });
});
