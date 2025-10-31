/*!
 * All the code that follow is
 * Copyright (c) 2015 - 2025 Richard Huang <rickypc@users.noreply.github.com>.
 * All Rights Reserved. Not for reuse without permission.
 */

import {
  AnimatePresence,
  domMax,
  LazyMotion,
  m,
} from 'framer-motion';
import Carousel from '@site/src/components/portfolio/Carousel';
import Heading from '@theme/Heading';
import Heart from '@site/src/components/common/Heart';
import { type ImageProps } from '@site/src/components/common/Image';
import { key } from '@site/src/data/common';
import Link from '@site/src/components/common/Link';
import { memo, type ReactElement } from 'react';
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
};

type TagsProps = {
  prefix: string;
  tags: string[];
};

export type ProjectsProps = {
  filtered: Filtered[];
  // eslint-disable-next-line no-unused-vars
  onClick: (_: ImageProps) => void;
};

const Tags = memo(function Tags({ prefix, tags }: TagsProps): ReactElement {
  return (
    <ul className={styles.tags} translate="no">
      {tags.map((tag) => (
        <li aria-hidden="true" key={key(`${prefix}-${tag}`, 'tag')}>{tag}</li>
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
  prefix,
  tags,
  title,
}: ProjectProps): ReactElement {
  return (
    <LazyMotion features={domMax}>
      <m.article className={styles.portfolio} layout transition={transition}>
        <figure>
          <Carousel images={images} onClick={onClick} prefix={prefix} />
          <figcaption>
            <Tags prefix={prefix} tags={tags} />
            <Heading as="h2">
              <Link href={href} translate="no" validate>{title}</Link>
              <Heart id={`portfolio-${prefix}`} />
            </Heading>
            <p>{description}</p>
          </figcaption>
        </figure>
      </m.article>
    </LazyMotion>
  );
});

export default memo(function Projects({ filtered, onClick }: ProjectsProps): ReactElement {
  return (
    <LazyMotion features={domMax}>
      <m.div className={styles.portfolios} layout>
        {filtered.length && (
          <AnimatePresence>
            {filtered.map(({ prefix, ...rest }) => (
              <Project key={`project-${prefix}`} onClick={onClick} prefix={prefix} {...rest} />
            ))}
          </AnimatePresence>
        )}
      </m.div>
    </LazyMotion>
  );
});
