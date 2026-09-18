/*!
 * Copyright © 2015 Richard Huang <rickypc@users.noreply.github.com>
 * All rights reserved.
 */

import Heart from '@site/src/components/common/Heart';
import { characteristic, headline, paragraphs } from '@site/src/data/about';
import { key } from '@site/src/data/common';
import Heading from '@theme/Heading';
import { domAnimation, LazyMotion, motion } from 'motion/react';
import { memo } from 'react';
import styles from './styles.module.css';

export default memo(function Content() {
  return (
    <LazyMotion features={domAnimation}>
      <motion.article
        className={styles.content}
        initial={{ opacity: [0, 1], scale: [0.85, 1] }}
        transition={{ delay: 0.25, duration: 0.5 }}
        viewport={{ once: true }}
        whileInView={{ opacity: [0, 1], scale: [0.85, 1] }}
      >
        <Heading as="h2">
          {headline}
          {/* biome-ignore lint/correctness/useUniqueElementIds: - */}
          <Heart id="about-landing" />
        </Heading>
        {paragraphs.map((paragraph) => (
          <p key={key(paragraph, 'about-paragraph')}>{paragraph}</p>
        ))}
        <Heading as="h3">{characteristic.title}</Heading>
        <ul>
          {characteristic.attributes.map((attribute) => (
            <li key={key(attribute, 'about-characteristic')}>{attribute}</li>
          ))}
        </ul>
      </motion.article>
    </LazyMotion>
  );
});
