/*!
 * All the code that follow is
 * Copyright (c) 2015 - 2025 Richard Huang <rickypc@users.noreply.github.com>.
 * All Rights Reserved. Not for reuse without permission.
 */

import { characteristic, headline, paragraphs } from '@site/src/data/about';
import { domAnimation, LazyMotion, motion } from 'motion/react';
import Heading from '@theme/Heading';
import Heart from '@site/src/components/common/Heart';
import { key } from '@site/src/data/common';
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
          <Heart id="about-landing" />
        </Heading>
        {paragraphs.map((paragraph) => (
          <p key={key(paragraph, 'about-paragraph')}>
            {paragraph}
          </p>
        ))}
        <Heading as="h3">{characteristic.title}</Heading>
        <ul>
          {characteristic.attributes.map((attribute) => (
            <li key={key(attribute, 'about-characteristic')}>
              {attribute}
            </li>
          ))}
        </ul>
      </motion.article>
    </LazyMotion>
  );
});
