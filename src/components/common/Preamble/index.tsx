/*!
 * Copyright © 2015 Richard Huang <rickypc@users.noreply.github.com>
 * All rights reserved.
 */

import { clsx } from '@site/src/data/common';
import Heading from '@theme/Heading';
import { memo, type ReactElement } from 'react';
import styles from './styles.module.css';

export type PreambleProps = {
  className?: string;
  description: string;
  title: string;
};

export const Intro = memo(function Intro({
  className,
  description,
  title,
}: PreambleProps): ReactElement {
  return (
    <div className={clsx('col', className, styles.preamble)}>
      <Heading as="h1">{title}</Heading>
      <p>{description}</p>
    </div>
  );
});

export default memo(function Preamble({
  className,
  description,
  title,
}: PreambleProps): ReactElement {
  return (
    <header aria-label={title} className={clsx(className, 'row')} role="banner">
      <Intro className="col--8 col--offset-2" {...{ description, title }} />
    </header>
  );
});
