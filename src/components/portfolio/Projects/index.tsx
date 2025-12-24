/*!
 * All the code that follow is
 * Copyright (c) 2015 - 2025 Richard Huang <rickypc@users.noreply.github.com>.
 * All Rights Reserved. Not for reuse without permission.
 */

import {
  AnimatePresence,
  domMax,
  LayoutGroup,
  LazyMotion,
  motion,
} from 'motion/react';
import Carousel, { type CarouselHandles } from '@site/src/components/portfolio/Carousel';
import Heading from '@theme/Heading';
import Heart from '@site/src/components/common/Heart';
import { type ImageProps } from '@site/src/components/common/Image';
import { key } from '@site/src/data/common';
import Link from '@site/src/components/common/Link';
import { memo, type ReactElement, useRef } from 'react';
import transition from '@site/src/data/portfolio/common';
import styles from './styles.module.css';

type Filtered = {
  description: string;
  href?: string;
  images: ImageProps[];
  prefix: string;
  tags: string[];
  title: string;
};

type ProjectProps = Filtered & {
  // eslint-disable-next-line no-unused-vars
  onClick: (_: ImageProps) => void;
  open?: ImageProps;
};

type TagsProps = {
  prefix: string;
  tags: string[];
};

export type ProjectsProps = {
  filtered: Filtered[];
  // eslint-disable-next-line no-unused-vars
  onClick: (_: ImageProps) => void;
  open?: ImageProps;
};

const Tags = memo(function Tags({ prefix, tags }: TagsProps): ReactElement {
  return (
    <ul aria-label="Technology Stack" className={styles.tags} translate="no">
      {tags.map((tag) => (
        <li key={key(`${prefix}-${tag}`, 'tag')}>{tag}</li>
      ))}
    </ul>
  );
});

// After Tags assignment.
const Project = memo(function Project({
  description,
  href,
  images,
  onClick,
  open,
  prefix,
  tags,
  title,
}: ProjectProps): ReactElement {
  const carousel = useRef<CarouselHandles>(null);
  return (
    <motion.article
      aria-label={title}
      className={styles.portfolio}
      id={prefix}
      layout
      onLayoutAnimationComplete={() => carousel.current?.setPaused(false)}
      onLayoutAnimationStart={() => carousel.current?.setPaused(true)}
      transition={transition}
    >
      <figure>
        <Carousel
          {...{
            images,
            onClick,
            open,
            prefix,
            ref: carousel,
            title,
          }}
        />
        <figcaption>
          <Heading as="h2">
            <Link href={href} translate="no" validate>{title}</Link>
            <Heart id={`portfolio-${prefix}`} />
          </Heading>
          <p>{description}</p>
          <Tags {...{ prefix, tags }} />
        </figcaption>
      </figure>
    </motion.article>
  );
});

export default memo(function Projects({ filtered, onClick, open }: ProjectsProps): ReactElement {
  return (
    <LazyMotion features={domMax}>
      <LayoutGroup>
        <motion.div className={styles.portfolios}>
          <AnimatePresence>
            {filtered.map(({ prefix, ...rest }) => (
              <Project key={`project-${prefix}`} {...{ onClick, open, prefix }} {...rest} />
            ))}
          </AnimatePresence>
        </motion.div>
      </LayoutGroup>
    </LazyMotion>
  );
});
