/*!
 * Copyright © 2015 Richard Huang <rickypc@users.noreply.github.com>
 * All rights reserved.
 */

import Image from '@site/src/components/common/Image';
import { a11y } from '@site/src/data/common';
import { image } from '@site/src/data/home';
import { domAnimation, LazyMotion, motion } from 'motion/react';
import { memo, type ReactElement } from 'react';
import styles from './styles.module.css';

/**
 * Portrait figure in the narrow right column of the home page, wrapping the high-priority hero
 * image beside the role cards. A delayed motion transition fades and scales it in the first time it
 * enters the viewport.
 * @returns {ReactElement} The figure element holding the hero portrait.
 */
export default memo(function Figure(): ReactElement {
  return (
    <LazyMotion features={domAnimation}>
      <motion.figure
        {...a11y(image.alt)}
        className={styles.figure}
        initial={{ opacity: 0, scale: 0.75 }}
        transition={{ delay: 1.15, duration: 1, ease: 'easeOut' }}
        viewport={{ once: true }}
        whileInView={{ opacity: 1, scale: 1 }}
      >
        <Image fetchPriority="high" {...image} />
      </motion.figure>
    </LazyMotion>
  );
});
