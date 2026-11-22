/*!
 * Copyright © 2015 Richard Huang <rickypc@users.noreply.github.com>
 * All rights reserved.
 */

import { clsx } from '@site/src/data/common';
import { domAnimation, LazyMotion, motion } from 'motion/react';
import {
  type MouseEventHandler,
  memo,
  type PropsWithChildren,
  type ReactElement,
  type Ref,
} from 'react';

export type ButtonProps = {
  className?: string;
  disabled?: boolean;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  onMouseDown?: MouseEventHandler<HTMLButtonElement>;
  onMouseLeave?: MouseEventHandler<HTMLButtonElement>;
  onMouseUp?: MouseEventHandler<HTMLButtonElement>;
  ref?: Ref<HTMLButtonElement>;
  whileTap?: {
    scale?: number;
  };
};

/**
 * Motion-animated button behind the portfolio carousel arrows, playback controls, and hat toggles.
 * @param {PropsWithChildren<ButtonProps>} props - Button label, styling, ref, pointer handlers, and
 *   the optional tap-scale animation target.
 * @returns {ReactElement} The rendered button.
 */
export default memo(function Button({
  children,
  className,
  ref,
  ...rest
}: PropsWithChildren<ButtonProps>): ReactElement {
  return (
    <LazyMotion features={domAnimation}>
      <motion.button className={clsx('clean-btn', className)} ref={ref} type="button" {...rest}>
        {children}
      </motion.button>
    </LazyMotion>
  );
});
