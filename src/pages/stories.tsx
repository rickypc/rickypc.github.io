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
import { memo, type ReactElement } from 'react';
import styles from './stories.module.css';

/**
 * Stories route: each published testimonial as an animated article with its endorsement text, the
 * endorser's name, role, and affiliation.
 * @returns {ReactElement} The references page element wrapped in the shared `Layout` and `Preamble`.
 */
export default memo(function Stories(): ReactElement {
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
