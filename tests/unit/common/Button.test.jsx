/*!
 * Copyright (c) 2015 - 2025 Richard Huang <rickypc@users.noreply.github.com>.
 * All Rights Reserved. Not for reuse without permission.
 * ----------------------------------------------------------------------------
 * @jest-environment jsdom
 */

import { createRef } from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import Button from '../../../src/components/common/Button';

describe('Button', () => {
  it('renders children', () => {
    const { getByText } = render(<Button>Click me</Button>);
    expect(getByText('Click me')).toBeInTheDocument();
  });

  it('applies className', () => {
    const { getByRole } = render(<Button className="test-class">Test</Button>);
    expect(getByRole('button')).toHaveClass('test-class');
  });

  it('forwards ref', () => {
    const ref = createRef();
    render(<Button ref={ref}>Ref Button</Button>);
    expect(ref.current).toBeInstanceOf(HTMLButtonElement);
  });

  it('spreads extra props', () => {
    const { getByRole } = render(<Button data-testid="my-btn">Props</Button>);
    expect(getByRole('button')).toHaveAttribute('data-testid', 'my-btn');
  });
});
