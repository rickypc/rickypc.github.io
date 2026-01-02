/*!
 * Copyright © 2015 Richard Huang <rickypc@users.noreply.github.com>
 * All rights reserved.
 */

import { domAnimation, LazyMotion, motion } from 'motion/react';
import Heading from '@theme/Heading';
import Heart from '@site/src/components/common/Heart';
import { key } from '@site/src/data/common';
import Link from '@site/src/components/common/Link';
import { memo, type ReactElement } from 'react';
import { stories, type StoryProps } from '@site/src/data/stories';
import styles from './styles.module.css';

const Story = memo(function Story({
  affiliation,
  author,
  content,
  header,
  prefix,
  title,
}: StoryProps): ReactElement {
  return (
    <LazyMotion features={domAnimation}>
      <motion.article
        aria-label={header.children}
        className={styles.story}
        id={prefix}
        initial={{ opacity: [0, 1], scale: [0.85, 1] }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        whileInView={{ opacity: [0, 1], scale: [0.85, 1] }}
      >
        <Heading as="h2">
          <Link className={styles.topic} validate {...header} />
          <Heart id={key(header.children, 'story')} />
        </Heading>
        <p className={styles.endorsement}>{content}</p>
        <address>
          <i aria-hidden="true" className={styles.dash} />
          <p className={styles.title}>
            <Link validate {...title} />
          </p>
          <p className={styles.name}>
            <Link validate {...author} />
          </p>
          <div className={styles.affiliation}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" height="16" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" width="16">
              <path d="M12 12m-4 0a4 4 0 1 0 8 0a4 4 0 1 0 -8 0" />
              <path d="M16 12v1.5a2.5 2.5 0 0 0 5 0v-1.5a9 9 0 1 0 -5.5 8.28" />
            </svg>
            <p><Link validate {...affiliation} /></p>
          </div>
        </address>
      </motion.article>
    </LazyMotion>
  );
});

export default memo(function Content() {
  return (
    <div className={styles.content}>
      {stories.map(({ header, ...rest }) => (
        <Story
          header={header}
          key={key(header.children, 'story')}
          {...rest}
        />
      ))}
    </div>
  );
});
