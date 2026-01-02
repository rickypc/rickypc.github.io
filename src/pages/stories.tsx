/*!
 * Copyright © 2015 Richard Huang <rickypc@users.noreply.github.com>
 * All rights reserved.
 */

import { clsx } from '@site/src/data/common';
import Content from '@site/src/components/stories/Content';
import Layout from '@site/src/components/common/Layout';
import { layout, preamble } from '@site/src/data/stories';
import { memo } from 'react';
import Preamble from '@site/src/components/common/Preamble';
import styles from './stories.module.css';

export default memo(function Stories() {
  return (
    <Layout className={styles.stories} {...layout}>
      <Preamble {...preamble} />
      <section className={clsx('row', styles.row)}>
        <Content />
      </section>
    </Layout>
  );
});
