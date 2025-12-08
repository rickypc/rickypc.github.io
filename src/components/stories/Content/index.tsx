/*!
 * All the code that follow is
 * Copyright (c) 2015 - 2025 Richard Huang <rickypc@users.noreply.github.com>.
 * All Rights Reserved. Not for reuse without permission.
 */

import { domAnimation, LazyMotion, motion } from 'motion/react';
import Heading from '@theme/Heading';
import Heart from '@site/src/components/common/Heart';
import { key } from '@site/src/data/common';
import Link from '@site/src/components/common/Link';
import { memo, type ReactElement } from 'react';
import { stories } from '@site/src/data/stories';
import styles from './styles.module.css';

export type StoryProps = {
  affiliation: {
    children: string;
    href: string;
    translate?: 'no' | 'yes';
  };
  author: {
    children: string;
    href: string;
    translate?: 'no' | 'yes';
  };
  content: string;
  header: {
    children: string;
    href?: string;
  };
  title: {
    children: string;
    href?: string;
  };
};

const Story = memo(function Story({
  affiliation,
  author,
  content,
  header,
  title,
}: StoryProps): ReactElement {
  return (
    <LazyMotion features={domAnimation}>
      <motion.article
        className={styles.story}
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
          <Link className={styles.name} validate {...author} />
          {/* Reader view support. */}
          &nbsp;|&nbsp;
          <Link className={styles.title} validate {...title} />
          {/* Reader view support. */}
          &nbsp;|&nbsp;
          <Link className={styles.affiliation} validate {...affiliation} />
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
