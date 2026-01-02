/*!
 * Copyright © 2015 Richard Huang <rickypc@users.noreply.github.com>
 * All rights reserved.
 * ----------------------------------------------------------------------------
 * @jest-environment jsdom
 */

import { createRef } from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Button from '@site/src/components/common/Button';

jest.unmock('@site/src/components/common/Button');

describe('Button', () => {
  it('renders children, applies className, and spreads extra props', () => {
    render((
      <Button className="test-class" data-testid="my-btn">
        Click me
      </Button>
    ));
    const btn = screen.getByRole('button', { name: 'Click me' });
    expect(btn).toHaveClass('test-class');
    expect(btn).toHaveAttribute('data-testid', 'my-btn');
  });

  it('forwards ref to the underlying button element', () => {
    const ref = createRef<HTMLButtonElement>();
    render(<Button ref={ref}>Ref Button</Button>);
    expect(ref.current).toBeInstanceOf(HTMLButtonElement);
  });
});
