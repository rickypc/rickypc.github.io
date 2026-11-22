/*!
 * Copyright © 2015 Richard Huang <rickypc@users.noreply.github.com>
 * All rights reserved.
 */

import { clsx, textContent } from '@site/src/data/common';
import Heading from '@theme/Heading';
import { memo, type PropsWithChildren, type ReactElement, type ReactNode } from 'react';
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

/**
 * Page intro block: an optional lead-in node, the level-1 title, its description, and children.
 * @param {PropsWithChildren<IntroProps>} props - Intro content, including the optional `before`
 *   and `after` nodes and any children rendered below the description.
 * @returns {ReactElement} The intro block.
 */
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

/**
 * Page header that centres an `Intro` inside the theme's row and column wrappers.
 * @param {PreambleProps} props - The intro payload plus optional row and column class overrides.
 * @returns {ReactElement} The header element.
 */
export default memo(function Preamble({ col, intro, row }: PreambleProps): ReactElement {
  return (
    <>
      {/* biome-ignore lint/a11y/useAriaPropsSupportedByRole: - */}
      <header aria-label={textContent(intro.title)} className={row || 'row'}>
        <div className={col || 'col'}>
          <Intro {...intro} />
        </div>
      </header>
    </>
  );
});
