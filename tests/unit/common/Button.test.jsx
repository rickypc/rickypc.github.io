/*!
 * Copyright (c) 2015 - 2025 Richard Huang <rickypc@users.noreply.github.com>.
 * All Rights Reserved. Not for reuse without permission.
 * ----------------------------------------------------------------------------
 * @jest-environment jsdom
 */

import { createRef } from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import Button from '@site/src/components/common/Button';

jest.unmock('@site/src/components/common/Button');

describe('Button', () => {
  it('renders children, applies className, and spreads extra props', () => {
    const { getByRole } = render((
      <Button className="test-class" data-testid="my-btn">
        Click me
      </Button>
    ));
    const btn = getByRole('button', { name: 'Click me' });
    expect(btn).toHaveClass('test-class');
    expect(btn).toHaveAttribute('data-testid', 'my-btn');
  });

  it('forwards ref to the underlying button element', () => {
    const ref = createRef();
    render(<Button ref={ref}>Ref Button</Button>);
    expect(ref.current).toBeInstanceOf(HTMLButtonElement);
  });
});
