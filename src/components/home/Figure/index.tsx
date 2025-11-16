/*!
 * All the code that follow is
 * Copyright (c) 2015 - 2025 Richard Huang <rickypc@users.noreply.github.com>.
 * All Rights Reserved. Not for reuse without permission.
 */

import { a11y } from '@site/src/data/common';
import { domAnimation, LazyMotion, m } from 'framer-motion';
import Image from '@site/src/components/common/Image';
import { image } from '@site/src/data/home';
import { memo } from 'react';
import styles from './styles.module.css';

export default memo(function Figure() {
  return (
    <LazyMotion features={domAnimation}>
      <m.figure
        {...a11y(image.alt)}
        className={styles.figure}
        initial={{ opacity: 0, scale: 0.75 }}
        transition={{ delay: 1.15, duration: 1, ease: 'easeOut' }}
        viewport={{ once: true }}
        whileInView={{ opacity: 1, scale: 1 }}
      >
        <Image fetchPriority="high" {...image} />
      </m.figure>
    </LazyMotion>
  );
});
