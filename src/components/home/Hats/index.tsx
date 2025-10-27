/*!
 * All the code that follow is
 * Copyright (c) 2015 - 2025 Richard Huang <rickypc@users.noreply.github.com>.
 * All Rights Reserved. Not for reuse without permission.
 */

import { hats } from '@site/src/data/home';
import Heading from '@theme/Heading';
import { key } from '@site/src/data/common';
import { memo, type ReactElement, type ReactNode } from 'react';
import styles from './styles.module.css';

export type HatProps = {
  children: ReactNode;
  description: ReactNode;
  label: string;
};

const Hat = memo(function Hat({ children, description, label }: HatProps): ReactElement {
  return (
    <article className={styles.hat}>
      <Heading as="h2">
        <span className={styles.reader}>
          {label}
          &nbsp;
        </span>
        {children}
      </Heading>
      <p>{description}</p>
    </article>
  );
});

export default memo(function Hats() {
  return (
    <div className={styles.hats}>
      {hats.map((hat: HatProps) => <Hat {...hat} key={key(hat.label, 'hat')} />)}
    </div>
  );
});
