/*!
 * All the code that follow is
 * Copyright (c) 2015 - 2024 Richard Huang <rickypc@users.noreply.github.com>.
 * All Rights Reserved. Not for reuse without permission.
 */

import { key } from '@site/src/data/common';
import { domAnimation, LazyMotion, m } from 'framer-motion';
import { memo } from 'react';
import { types } from '@site/src/data/about';
import styles from './styles.module.css';

export default memo(function Figure() {
  // We can't use a11y here because it will create SEO problem.
  return (
    <LazyMotion features={domAnimation}>
      <m.figure
        className={styles.figure}
        initial={{ opacity: [0, 1], scale: [0.85, 1] }}
        transition={{ delay: 0.25, duration: 0.5 }}
        viewport={{ once: true }}
        whileInView={{ opacity: [0, 1], scale: [0.85, 1] }}
      >
        <div className={styles.shape}>
          {types.map(({ alt, Image }) => (
            <Image key={key(alt, 'about-figure')} {...{ 'aria-label': alt, role: 'img' }} />
          ))}
        </div>
      </m.figure>
    </LazyMotion>
  );
});
