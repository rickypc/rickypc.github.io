/*!
 * All the code that follow is
 * Copyright (c) 2015 - 2025 Richard Huang <rickypc@users.noreply.github.com>.
 * All Rights Reserved. Not for reuse without permission.
 */

import { clsx } from '@site/src/data/common';
import Heading from '@theme/Heading';
import { memo, type ReactElement } from 'react';
import PrintAdmonition from '@site/src/components/common/PrintAdmonition';
import styles from './styles.module.css';

export type PreambleProps = {
  description: string;
  printAdmonition?: boolean;
  title: string;
};

export default memo(function Preamble({
  description,
  printAdmonition,
  title,
}: PreambleProps): ReactElement {
  return (
    <>
      {printAdmonition && <PrintAdmonition />}
      <header className="row">
        <div className={clsx('col', 'col--8', 'col--offset-2', styles.preamble)}>
          <Heading as="h1">{title}</Heading>
          <p>{description}</p>
        </div>
      </header>
    </>
  );
});
