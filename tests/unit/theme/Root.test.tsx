/*!
 * Copyright © 2015 Richard Huang <rickypc@users.noreply.github.com>
 * All rights reserved.
 */

import { render, screen } from '@testing-library/react';
import Root from '@theme/Root';
import { motionConfigProps } from 'motion/react';

describe('theme.Root', () => {
  test('wraps children with MotionConfig honoring the user reduced-motion preference', () => {
    render(
      <Root>
        <span data-testid="page">page</span>
      </Root>,
    );

    expect(motionConfigProps.reducedMotion).toBe('user');
    expect(screen.getByTestId('page')).toBeInTheDocument();
  });

  test('is a passthrough wrapper around the page content', () => {
    const { container } = render(
      <Root>
        <main data-testid="content">content</main>
      </Root>,
    );

    expect(container).toContainElement(screen.getByTestId('content'));
  });
});
