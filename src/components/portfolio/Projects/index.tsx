/*!
 * Copyright © 2015 Richard Huang <rickypc@users.noreply.github.com>
 * All rights reserved.
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
import { clsx, key } from '@site/src/data/common';
import Link from '@site/src/components/common/Link';
import {
  memo,
  type ReactElement,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
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
  hovered: number;
  index: number;
  // eslint-disable-next-line no-unused-vars
  onClick: (_: ImageProps) => void;
  onHoverEnd: () => void;
  onHoverStart: () => void;
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
  hovered,
  href,
  images,
  index,
  onClick,
  onHoverEnd,
  onHoverStart,
  open,
  prefix,
  tags,
  title,
}: ProjectProps): ReactElement {
  const carousel = useRef<CarouselHandles>(null);
  useEffect(
    // eslint-disable-next-line no-bitwise
    () => carousel.current?.setPaused?.((~hovered && hovered !== index) as boolean),
    [hovered, index],
  );
  return (
    <motion.article
      aria-label={title}
      className={clsx(hovered === index && styles.hover, styles.portfolio)}
      id={prefix}
      layout
      onHoverEnd={onHoverEnd}
      onHoverStart={onHoverStart}
      onLayoutAnimationComplete={() => carousel.current?.setPaused?.(false)}
      onLayoutAnimationStart={() => carousel.current?.setPaused?.(true)}
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
  const [hovered, setHovered] = useState(-1);
  const createHoverStart = useCallback((index: number) => () => setHovered(index), []);
  const onHoverEnd = useCallback(() => setHovered(-1), []);
  return (
    <LazyMotion features={domMax}>
      <LayoutGroup>
        <motion.div className={styles.portfolios}>
          <AnimatePresence>
            {filtered.map(({ prefix, ...rest }, index) => (
              <Project
                key={`project-${prefix}`}
                {...{
                  hovered,
                  index,
                  onClick,
                  onHoverEnd,
                  onHoverStart: createHoverStart(index),
                  open,
                  prefix,
                }}
                {...rest}
              />
            ))}
          </AnimatePresence>
        </motion.div>
      </LayoutGroup>
    </LazyMotion>
  );
});
