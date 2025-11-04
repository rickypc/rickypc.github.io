/*!
 * All the code that follow is
 * Copyright (c) 2015 - 2025 Richard Huang <rickypc@users.noreply.github.com>.
 * All Rights Reserved. Not for reuse without permission.
 */

import Admonition from '@theme/Admonition';
import { admonitions, clsx } from '@site/src/data/common';
import { memo } from 'react';
import { usePrint } from '@site/src/hooks/observer';
import styles from './styles.module.css';

export default memo(function PrintAdmonition() {
  const [ready] = usePrint();

  return !ready && (
    <aside aria-hidden="true" className={clsx(styles.admonition, 'row')}>
      <div className="col">
        <Admonition type={admonitions.print.type}>
          <p>{admonitions.print.text}</p>
        </Admonition>
      </div>
    </aside>
  );
});
