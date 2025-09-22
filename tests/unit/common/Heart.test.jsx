/*!
 * Copyright (c) 2015 - 2025 Richard Huang <rickypc@users.noreply.github.com>.
 * All Rights Reserved. Not for reuse without permission.
 * ----------------------------------------------------------------------------
 * @jest-environment jsdom
 */

import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import Heart from '../../../src/components/common/Heart';

describe('Heart', () => {
  it('renders a span element', () => {
    const { container } = render(<Heart id="heart1" />);
    const span = container.querySelector('span');
    expect(span).toBeInTheDocument();
  });

  it('applies the reaction style class', () => {
    const { container } = render(<Heart id="heart1" />);
    const span = container.querySelector('span');
    expect(span).toHaveClass('reaction');
  });

  it('combines custom className with reaction class', () => {
    const { container } = render((
      <Heart id="heart1" className="custom-class" />
    ));
    const span = container.querySelector('span');
    expect(span).toHaveClass('custom-class', 'reaction');
  });
});
