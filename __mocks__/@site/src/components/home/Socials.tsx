/*!
 * All the code that follow is
 * Copyright (c) 2015 - 2025 Richard Huang <rickypc@users.noreply.github.com>.
 * All Rights Reserved. Not for reuse without permission.
 */

import { type ReactElement } from 'react';

/**
 * Minimal mock home/Socials component that renders children.
 * @returns {ReactElement}
 *   The home/Socials component.
 */
export default function HomeSocials(props: {}): ReactElement {
  return <div data-testid="socials" {...props}>home.socials</div>;
}
