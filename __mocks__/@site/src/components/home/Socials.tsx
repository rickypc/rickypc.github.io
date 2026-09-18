/*!
 * Copyright © 2015 Richard Huang <rickypc@users.noreply.github.com>
 * All rights reserved.
 */

import type { ReactElement } from 'react';

/**
 * Minimal mock home/Socials component that renders children.
 * @returns {ReactElement}
 *   The home/Socials component.
 */
export default function HomeSocials(): ReactElement {
  return <div data-testid="socials">home.socials</div>;
}
