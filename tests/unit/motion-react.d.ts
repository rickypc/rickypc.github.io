/*!
 * Copyright © 2015 Richard Huang <rickypc@users.noreply.github.com>
 * All rights reserved.
 */

import 'motion/react';

declare module 'motion/react' {
  // eslint-disable-next-line import/prefer-default-export
  export const listeners: {
    [key: string]: (..._args: any[]) => void;
  };
}
