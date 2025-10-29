/*!
 * All the code that follow is
 * Copyright (c) 2015 - 2025 Richard Huang <rickypc@users.noreply.github.com>.
 * All Rights Reserved. Not for reuse without permission.
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
