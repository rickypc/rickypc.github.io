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
import { memo, type ReactElement } from 'react';
import styles from './styles.module.css';

/**
 * Timeline route: career milestone articles alternating along a scroll-driven spine and filed
 * under year headings.
 * @returns {ReactElement} The timeline page element wrapped in the shared `Layout` and `Preamble`.
 */
export default memo(function Timeline(): ReactElement {
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
