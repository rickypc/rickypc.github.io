/*!
 * Copyright © 2015 Richard Huang <rickypc@users.noreply.github.com>
 * All rights reserved.
 */

import 'motion/react';

declare module 'motion/react' {
  export const listeners: {
    [key: string]: (..._args: any[]) => void;
  };
}
