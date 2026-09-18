/*!
 * Copyright © 2015 Richard Huang <rickypc@users.noreply.github.com>
 * All rights reserved.
 */

import Layout from '@site/src/components/common/Layout';
import Preamble from '@site/src/components/common/Preamble';
import QRCode from '@site/src/components/common/QRCode';
import Content from '@site/src/components/stories/Content';
import { clsx } from '@site/src/data/common';
import { intro, layout } from '@site/src/data/stories';
import { memo } from 'react';
import styles from './stories.module.css';

export default memo(function Stories() {
  return (
    <Layout className={styles.stories} {...layout}>
      <Preamble intro={intro} />
      <section className={clsx('row', styles.row)}>
        <Content />
      </section>
      <QRCode />
    </Layout>
  );
});
