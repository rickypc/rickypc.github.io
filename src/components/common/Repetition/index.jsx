/*!
 * All the code that follow is
 * Copyright (c) 2015 - 2024 Richard Huang <rickypc@users.noreply.github.com>.
 * All Rights Reserved. Not for reuse without permission.
 */

import { clsx } from '@site/src/data/common';
import { memo } from 'react';
import PropTypes from 'prop-types';
import styles from './styles.module.css';

export default memo(Object.assign(function Repetition({ value = 1 }) {
  if (value < 2) {
    return null;
  }
  return (
    <div className={styles.controls}>
      <span
        className={clsx(styles.badge, 'badge', 'badge--primary')}
        title={`Preferred repetition: ${value} times`}
      >
        {`${value}x`}
      </span>
    </div>
  );
}, {
  propTypes: {
    value: PropTypes.number,
  },
}));
