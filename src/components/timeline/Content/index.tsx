/*!
 * All the code that follow is
 * Copyright (c) 2015 - 2025 Richard Huang <rickypc@users.noreply.github.com>.
 * All Rights Reserved. Not for reuse without permission.
 */

import { clsx, key } from '@site/src/data/common';
import { domAnimation, LazyMotion, motion } from 'motion/react';
import Heading from '@theme/Heading';
import Heart from '@site/src/components/common/Heart';
import Image from '@site/src/components/common/Image';
import Link from '@site/src/components/common/Link';
import { memo, type ReactElement, useCallback } from 'react';
import { type TimelineProps, timelines } from '@site/src/data/timeline';
import { useMedia, usePrint } from '@site/src/hooks/observer';
import styles from './styles.module.css';

const Timeline = memo(function Timeline({
  affiliation,
  className,
  description,
  picture,
  prefix,
  title,
  year,
}: TimelineProps): ReactElement {
  const alt = `${affiliation.children} Logo`;
  const id = key(title.children, 'timeline');
  const [printing] = usePrint();

  return (
    <div className={clsx(className, styles.timeline)}>
      <Image
        alt={alt}
        link={{
          className: styles.logo,
          href: affiliation.href,
          title: alt,
          whileTap: { scale: 0.85 },
        }}
        live={printing}
        picture={picture}
      />
      <LazyMotion features={domAnimation}>
        <motion.article
          aria-label={`${title.children} - ${affiliation.children} (${year.replace(/\s+/g, '')})`}
          className={styles.inner}
          id={prefix}
          initial={{ opacity: [0, 1], scale: [0.85, 1] }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          whileInView={{ opacity: [0, 1], scale: [0.85, 1] }}
        >
          <Heading as="h2">{year}</Heading>
          <Heading as="h3">
            {className === styles.left && <Heart id={id} />}
            <Link {...title} />
            {className === styles.right && <Heart id={id} />}
          </Heading>
          <Heading as="h4"><Link {...affiliation} /></Heading>
          <p>{description}</p>
        </motion.article>
      </LazyMotion>
    </div>
  );
});

export default memo(function Content() {
  const [single] = useMedia('screen and (max-width: 48rem)');

  const position = useCallback(
    (index: number) => (index % 2 === 0 || single ? styles.right : styles.left),
    [single],
  );

  return (
    <div className={styles.content}>
      {timelines.map((timeline, index) => (
        <Timeline
          className={position(index)}
          key={key(timeline.title.children, 'timeline')}
          {...timeline}
        />
      ))}
    </div>
  );
});
