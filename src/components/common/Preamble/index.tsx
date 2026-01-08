/*!
 * Copyright © 2015 Richard Huang <rickypc@users.noreply.github.com>
 * All rights reserved.
 */

import { clsx, textContent } from '@site/src/data/common';
import Heading from '@theme/Heading';
import {
  memo,
  type PropsWithChildren,
  type ReactElement,
  type ReactNode,
} from 'react';
import styles from './styles.module.css';

export type IntroProps = {
  after?: ReactNode;
  before?: ReactNode;
  className?: string;
  description: ReactNode;
  title: ReactNode;
};

export type PreambleProps = {
  col?: string;
  intro: PropsWithChildren<IntroProps>;
  row?: string;
};

export const Intro = memo(function Intro({
  after,
  before,
  children,
  className,
  description,
  title,
}: PropsWithChildren<IntroProps>): ReactElement {
  return (
    <>
      {before}
      <div className={clsx(styles.preamble, className)}>
        <Heading as="h1">{title}</Heading>
        <p>{description}</p>
        {children}
      </div>
      {after}
    </>
  );
});

export default memo(function Preamble({ col, intro, row }: PreambleProps): ReactElement {
  return (
    <header aria-label={textContent(intro.title)} className={row || 'row'} role="banner">
      <div className={col || clsx('col', 'col--8', 'col--offset-2')}>
        <Intro {...intro} />
      </div>
    </header>
  );
});
