/*!
 * Copyright © 2015 Richard Huang <rickypc@users.noreply.github.com>
 * All rights reserved.
 */

import { clsx } from '@site/src/data/common';
import { useVisibility } from '@site/src/hooks/observer';
import { memo, type ReactElement } from 'react';
import styles from './styles.module.css';

/**
 * Decorative oracle on the About page: three stacked panels carrying no text of their own.
 * An `IntersectionObserver` hook adds the play class only while the stack is on screen.
 * @returns {ReactElement} The oracle wrapper and its three layered panels.
 */
export default memo(function Oracle(): ReactElement {
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
