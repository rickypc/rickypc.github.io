/*!
 * All the code that follow is
 * Copyright (c) 2015 - 2025 Richard Huang <rickypc@users.noreply.github.com>.
 * All Rights Reserved. Not for reuse without permission.
 */

import Content from '@site/src/components/resume/Content';
import Layout from '@site/src/components/common/Layout';
import { layout } from '@site/src/data/resume';
import { memo } from 'react';
import styles from './resume.module.css';

export default memo(function Resume() {
  return (
    <Layout className={styles.resume} {...layout}>
      <Content />
    </Layout>
  );
});
