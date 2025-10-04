/*!
 * All the code that follow is
 * Copyright (c) 2015 - 2025 Richard Huang <rickypc@users.noreply.github.com>.
 * All Rights Reserved. Not for reuse without permission.
 * ----------------------------------------------------------------------------
 * @jest-environment jsdom
 */

import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Figure from '@site/src/components/about/Figure';

describe('about.Figure', () => {
  it('renders a figure with shape container and img roles for each type', () => {
    const { container } = render(<Figure />);

    // The outer <figure> should have the CSS class
    const figure = container.querySelector('figure');
    expect(figure).toHaveClass('figure');

    // The inner shape <div> should have its CSS class
    const shape = figure.querySelector('div');
    expect(shape).toHaveClass('shape');

    // Each mock Image should render an element with role="img" and the correct aria-label
    const firstImg = screen.getByRole('img', { name: 'Transformer People Type' });
    expect(firstImg).toBeInTheDocument();

    const secondImg = screen.getByRole('img', { name: 'Transactor Task Type' });
    expect(secondImg).toBeInTheDocument();
  });
});
