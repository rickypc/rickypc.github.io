/*!
 * All the code that follow is
 * Copyright (c) 2015 - 2025 Richard Huang <rickypc@users.noreply.github.com>.
 * All Rights Reserved. Not for reuse without permission.
 */

import { clsx, key } from '@site/src/data/common';
import { domAnimation, LazyMotion, motion } from 'motion/react';
import Heading from '@theme/Heading';
import Heart from '@site/src/components/common/Heart';
import Image, { type PictureInfo } from '@site/src/components/common/Image';
import Link from '@site/src/components/common/Link';
import { memo, type ReactElement, useCallback } from 'react';
import { timelines } from '@site/src/data/timeline';
import { useMedia } from '@site/src/hooks/observer';
import styles from './styles.module.css';

export type TimelineProps = {
  affiliation: {
    children: string;
    href?: string;
    translate?: 'no' | 'yes';
  };
  className?: string;
  description: string;
  picture: PictureInfo;
  title: {
    children: string;
    href?: string;
  };
  year: string;
};

const Timeline = memo(function Timeline({
  affiliation,
  className,
  description,
  picture,
  title,
  year,
}: TimelineProps): ReactElement {
  const alt = `${affiliation.children} Logo`;
  const id = key(title.children, 'timeline');

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
        picture={picture}
      />
      <LazyMotion features={domAnimation}>
        <motion.article
          className={styles.inner}
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
