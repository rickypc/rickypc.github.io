/*!
 * All the code that follow is
 * Copyright (c) 2015 - 2024 Richard Huang <rickypc@users.noreply.github.com>.
 * All Rights Reserved. Not for reuse without permission.
 */

import { clsx } from '@site/src/data/common';
import Content from '@site/src/components/timeline/Content';
import Layout from '@site/src/components/common/Layout';
import { layout, preamble } from '@site/src/data/timeline';
import { memo } from 'react';
import Preamble from '@site/src/components/common/Preamble';
import styles from './styles.module.css';

export default memo(function Timeline() {
  return (
    <Layout className={styles.timeline} {...layout}>
      <Preamble {...preamble} />
      <section className={clsx('row', styles.row)}>
        <Content />
      </section>
    </Layout>
  );
});
