/*!
 * Copyright © 2015 Richard Huang <rickypc@users.noreply.github.com>
 * All rights reserved.
 */

import Content from '@site/src/components/resume/Content';
import Layout from '@site/src/components/common/Layout';
import { layout } from '@site/src/data/resume';
import { memo } from 'react';
import QRCode from '@site/src/components/common/QRCode';
import styles from './resume.module.css';

export default memo(function Resume() {
  return (
    <Layout className={styles.resume} {...layout}>
      <Content />
      <QRCode />
    </Layout>
  );
});
