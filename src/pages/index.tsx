/*!
 * All the code that follow is
 * Copyright (c) 2015 - 2025 Richard Huang <rickypc@users.noreply.github.com>.
 * All Rights Reserved. Not for reuse without permission.
 */

import Figure from '@site/src/components/home/Figure';
import Greeting from '@site/src/components/home/Greeting';
import Hats from '@site/src/components/home/Hats';
import Layout from '@site/src/components/common/Layout';
import { layout } from '@site/src/data/home';
import { memo } from 'react';
import Socials from '@site/src/components/home/Socials';
import styles from './index.module.css';

export default memo(function Home() {
  return (
    <Layout className={styles.home} {...layout}>
      <header className="row row--no-gutters">
        <div className="col">
          <Greeting />
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
    </Layout>
  );
});
