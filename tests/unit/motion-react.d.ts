/*!
 * All the code that follow is
 * Copyright (c) 2015 - 2025 Richard Huang <rickypc@users.noreply.github.com>.
 * All Rights Reserved. Not for reuse without permission.
 */

import 'motion/react';

declare module 'motion/react' {
  // eslint-disable-next-line import/prefer-default-export
  export const listeners: {
    // eslint-disable-next-line no-unused-vars
    [key: string]: (...args: any[]) => void;
  };
}
