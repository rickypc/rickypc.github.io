/*!
 * Copyright © 2015 Richard Huang <rickypc@users.noreply.github.com>
 * All rights reserved.
 */

import Layout from '@site/src/components/common/Layout';
import Preamble from '@site/src/components/common/Preamble';
import QRCode from '@site/src/components/common/QRCode';
import Content from '@site/src/components/timeline/Content';
import { clsx } from '@site/src/data/common';
import { intro, layout } from '@site/src/data/timeline';
import { memo } from 'react';
import styles from './styles.module.css';

export default memo(function Timeline() {
  return (
    <Layout className={styles.timeline} {...layout}>
      <Preamble intro={intro} />
      <section className={clsx('row', styles.row)}>
        <Content />
      </section>
      <QRCode />
    </Layout>
  );
});
