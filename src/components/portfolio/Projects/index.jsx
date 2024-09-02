/*!
 * All the code that follow is
 * Copyright (c) 2015 - 2024 Richard Huang <rickypc@users.noreply.github.com>.
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
import { key } from '@site/src/data/common';
import Link from '@site/src/components/common/Link';
import { memo } from 'react';
import PropTypes from 'prop-types';
import transition from '@site/src/data/portfolio/common';
import styles from './styles.module.css';

const Tags = memo(function Tags({ prefix, tags }) {
  return (
    <ul className={styles.tags} translate="no">
      {tags.map((tag) => (
        <li aria-hidden="true" key={key(`${prefix}-${tag}`, 'tag')}>{tag}</li>
      ))}
    </ul>
  );
});
Tags.propTypes = {
  prefix: PropTypes.string.isRequired,
  tags: PropTypes.arrayOf(PropTypes.string).isRequired,
};

// After Tags assignment.
const Project = memo(function Project({
  description,
  href,
  images,
  onClick,
  prefix,
  tags,
  title,
}) {
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
Project.propTypes = {
  description: PropTypes.string.isRequired,
  href: PropTypes.string,
  images: PropTypes.arrayOf(PropTypes.shape({
    alt: PropTypes.string,
    picture: PropTypes.shape({
      avif: PropTypes.string,
      fallback: PropTypes.shape(),
      webp: PropTypes.string,
    }),
  })).isRequired,
  onClick: PropTypes.func.isRequired,
  prefix: PropTypes.string.isRequired,
  tags: PropTypes.arrayOf(PropTypes.string).isRequired,
  title: PropTypes.string.isRequired,
};

export default memo(Object.assign(function Projects({ filtered, onClick }) {
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
}, {
  propTypes: {
    filtered: PropTypes.arrayOf(PropTypes.shape()).isRequired,
    onClick: PropTypes.func.isRequired,
  },
}));
