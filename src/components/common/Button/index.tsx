/*!
 * Copyright © 2015 Richard Huang <rickypc@users.noreply.github.com>
 * All rights reserved.
 */

import { clsx } from '@site/src/data/common';
import { domAnimation, LazyMotion, motion } from 'motion/react';
import {
  memo,
  type MouseEventHandler,
  type PropsWithChildren,
  type ReactElement,
  type Ref,
} from 'react';

export type ButtonProps = {
  className?: string;
  disabled?: boolean;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  ref?: Ref<HTMLButtonElement>;
  whileTap?: {
    scale?: number;
  };
};

export default memo(function Button({
  children,
  className,
  ref,
  ...rest
}: PropsWithChildren<ButtonProps>): ReactElement {
  return (
    <LazyMotion features={domAnimation}>
      <motion.button
        className={clsx('clean-btn', className)}
        ref={ref}
        type="button"
        {...rest}
      >
        {children}
      </motion.button>
    </LazyMotion>
  );
});
