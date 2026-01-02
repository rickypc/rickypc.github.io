/*!
 * Copyright © 2015 Richard Huang <rickypc@users.noreply.github.com>
 * All rights reserved.
 */

import { type ReactElement } from 'react';

/**
 * Minimal mock home/Greeting component that renders children.
 * @returns {ReactElement}
 *   The home/Greeting component.
 */
export default function HomeGreeting(props: {}): ReactElement {
  return <div data-testid="greeting" {...props}>home.greeting</div>;
}
