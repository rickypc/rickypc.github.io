/*!
 * All the code that follow is
 * Copyright (c) 2015 - 2025 Richard Huang <rickypc@users.noreply.github.com>.
 * All Rights Reserved. Not for reuse without permission.
 */

import { clsx } from '@site/src/data/common';
import { domAnimation, LazyMotion, m } from 'framer-motion';
import {
  memo,
  type MouseEventHandler,
  type PropsWithChildren,
  type ReactElement,
  type Ref,
} from 'react';

export type ButtonProps = {
  className?: string;
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
      <m.button
        className={clsx('clean-btn', className)}
        ref={ref}
        type="button"
        {...rest}
      >
        {children}
      </m.button>
    </LazyMotion>
  );
});
