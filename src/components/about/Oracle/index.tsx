/*!
 * Copyright © 2015 Richard Huang <rickypc@users.noreply.github.com>
 * All rights reserved.
 */

import { clsx } from '@site/src/data/common';
import { useVisibility } from '@site/src/hooks/observer';
import { memo } from 'react';
import styles from './styles.module.css';

export default memo(function Oracle() {
  const { ref, visible } = useVisibility<HTMLDivElement>({ threshold: 0.15 });
  return (
    <div className={clsx(visible && styles.play, styles.oracle)}>
      <div className={styles.oraculares} ref={ref}>
        {['1', '2', '3'].map((key) => (
          <div className={styles[`oracular${key}`]} key={`oracular-${key}`} />
        ))}
      </div>
    </div>
  );
});
