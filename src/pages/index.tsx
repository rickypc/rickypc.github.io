/*!
 * Copyright © 2015 Richard Huang <rickypc@users.noreply.github.com>
 * All rights reserved.
 */

import { clsx } from '@site/src/data/common';
import Figure from '@site/src/components/home/Figure';
import Greeting from '@site/src/components/home/Greeting';
import Hats from '@site/src/components/home/Hats';
import Heading from '@theme/Heading';
import Layout from '@site/src/components/common/Layout';
import { layout, preamble } from '@site/src/data/home';
import { memo } from 'react';
import QRCode from '@site/src/components/common/QRCode';
import Socials from '@site/src/components/home/Socials';
import styles from './index.module.css';

export default memo(function Home() {
  return (
    <Layout className={styles.home} {...layout}>
      <header className="row row--no-gutters" role="banner">
        <div className="col">
          <Greeting />
          <div className={clsx('col', styles.preamble)}>
            <Heading as="h1">{preamble.title}</Heading>
            <p>{preamble.description}</p>
          </div>
        </div>
      </header>
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
