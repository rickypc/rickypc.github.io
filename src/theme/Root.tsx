/*!
 * Copyright © 2015 Richard Huang <rickypc@users.noreply.github.com>
 * All rights reserved.
 */

import { MotionConfig } from 'motion/react';
import type { ReactNode } from 'react';

// Wraps every page. `reducedMotion="user"` honors the visitor's `prefers-reduced-motion`
// preference app-wide: transform and layout motion settles instantly while everyone else keeps
// full animation. The e2e runner emulates the same preference for deterministic screenshots.
const Root = ({ children }: { children: ReactNode }) => (
  <MotionConfig reducedMotion="user">{children}</MotionConfig>
);

export default Root;
