/*!
 * All the code that follow is
 * Copyright (c) 2015 - 2025 Richard Huang <rickypc@users.noreply.github.com>.
 * All Rights Reserved. Not for reuse without permission.
 */

import { clsx } from '@site/src/data/common';
import { memo } from 'react';
import { useVisibility } from '@site/src/hooks/observer';
import styles from './styles.module.css';

export default memo(function Oracle() {
  const { ref, visible } = useVisibility<HTMLDivElement>({ threshold: 0.15 });

  return (
    <div className={clsx(visible && styles.play, styles.oracle)}>
      <div className={styles.oraculares} ref={ref}>
        {Array.from({ length: 3 }, (_, index) => (
          <div className={styles[`oracular${index + 1}`]} key={index} />
        ))}
      </div>
    </div>
  );
});
