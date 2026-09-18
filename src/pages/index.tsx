/*!
 * Copyright © 2015 Richard Huang <rickypc@users.noreply.github.com>
 * All rights reserved.
 */

import Layout from '@site/src/components/common/Layout';
import Preamble from '@site/src/components/common/Preamble';
import QRCode from '@site/src/components/common/QRCode';
import Figure from '@site/src/components/home/Figure';
import Greeting from '@site/src/components/home/Greeting';
import Hats from '@site/src/components/home/Hats';
import Socials from '@site/src/components/home/Socials';
import { intro, layout } from '@site/src/data/home';
import { memo } from 'react';
import styles from './index.module.css';

export default memo(function Home() {
  return (
    <Layout className={styles.home} {...layout}>
      <Preamble
        intro={{ before: <Greeting />, className: styles.preamble, ...intro }}
        row="row row--no-gutters"
      />
      <section className="row row--no-gutters">
        <div className="col col--10">
          <Hats />
        </div>
        <div className="col col--2">
          <Figure />
        </div>
      </section>
      <section className="row row--no-gutters">
        <div className="col">
          <Socials />
        </div>
      </section>
      <QRCode />
    </Layout>
  );
});
