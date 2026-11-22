/*!
 * Copyright © 2015 Richard Huang <rickypc@users.noreply.github.com>
 * All rights reserved.
 */

import PersonaQuadrant from '@site/src/components/about/PersonaQuadrant';
import { quadrants } from '@site/src/data/about';
import { domAnimation, LazyMotion, motion } from 'motion/react';
import { memo, type ReactElement } from 'react';
import styles from './styles.module.css';

/**
 * About page figure: the four persona quadrants from the About data arranged inside one shape,
 * faded and scaled in by a `LazyMotion` view animation.
 * @returns {ReactElement} The figure wrapping one persona-quadrant chart per quadrant entry.
 */
export default memo(function Figure(): ReactElement {
  // We can't use a11y here because it will create SEO problem.
  return (
    <LazyMotion features={domAnimation}>
      <motion.figure
        className={styles.figure}
        initial={{ opacity: [0, 1], scale: [0.85, 1] }}
        transition={{ delay: 0.25, duration: 0.5 }}
        viewport={{ once: true }}
        whileInView={{ opacity: [0, 1], scale: [0.85, 1] }}
      >
        <div className={styles.shape}>
          {Object.entries(quadrants).map(([type, quadrant]) => (
            <PersonaQuadrant className={type} key={type} {...quadrant} />
          ))}
        </div>
      </motion.figure>
    </LazyMotion>
  );
});
