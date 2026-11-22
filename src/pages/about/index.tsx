/*!
 * Copyright © 2015 Richard Huang <rickypc@users.noreply.github.com>
 * All rights reserved.
 */

import Content from '@site/src/components/about/Content';
import Figure from '@site/src/components/about/Figure';
import Oracle from '@site/src/components/about/Oracle';
import Layout from '@site/src/components/common/Layout';
import Preamble from '@site/src/components/common/Preamble';
import QRCode from '@site/src/components/common/QRCode';
import { intro, layout } from '@site/src/data/about';
import { clsx } from '@site/src/data/common';
import { memo, type ReactElement } from 'react';
import styles from './styles.module.css';

/**
 * About route: the leadership-profile narrative beside the persona quadrant charts, the oracular
 * animation, and a QR card.
 * @returns {ReactElement} The about page element wrapped in the shared `Layout` and `Preamble`.
 */
export default memo(function About(): ReactElement {
  return (
    <Layout {...layout}>
      <Preamble intro={intro} />
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
      <QRCode />
    </Layout>
  );
});
