/*!
 * All the code that follow is
 * Copyright (c) 2015 - 2025 Richard Huang <rickypc@users.noreply.github.com>.
 * All Rights Reserved. Not for reuse without permission.
 */

import { clsx } from '@site/src/data/common';
import Content from '@site/src/components/about/Content';
import Figure from '@site/src/components/about/Figure';
import Layout from '@site/src/components/common/Layout';
import { layout, preamble } from '@site/src/data/about';
import { memo } from 'react';
import Oracle from '@site/src/components/about/Oracle';
import Preamble from '@site/src/components/common/Preamble';
import styles from './styles.module.css';

export default memo(function About() {
  return (
    <Layout {...layout}>
      <Preamble {...preamble} />
      <section className={clsx('row', styles.row)}>
        <div className="col col--1" />
        <div className="col col--6">
          <Content />
        </div>
        <div className="col col--4 col--offset-1">
          <Figure />
        </div>
      </section>
      <Oracle />
    </Layout>
  );
});
