/*!
 * All the code that follow is
 * Copyright (c) 2015 - 2024 Richard Huang <rickypc@users.noreply.github.com>.
 * All Rights Reserved. Not for reuse without permission.
 */

import { clsx } from '@site/src/data/common';
import { domAnimation, LazyMotion, m } from 'framer-motion';
import { memo } from 'react';
import PropTypes from 'prop-types';

const Button = ({ children, className, ref, ...rest }) => (
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
Button.displayName = 'Button';
Button.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
  className: PropTypes.string,
};

export default memo(Button);
