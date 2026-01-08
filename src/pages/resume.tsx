/*!
 * Copyright © 2015 Richard Huang <rickypc@users.noreply.github.com>
 * All rights reserved.
 */

import { clsx } from '@site/src/data/common';
import Content from '@site/src/components/resume/Content';
import Layout from '@site/src/components/common/Layout';
import { header, layout } from '@site/src/data/resume';
import { memo, useMemo } from 'react';
import Preamble from '@site/src/components/common/Preamble';
import QRCode from '@site/src/components/common/QRCode';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import styles from './resume.module.css';

export default memo(function Resume() {
  const { siteConfig } = useDocusaurusContext();
  const props = useMemo(() => header({ siteConfig }), [siteConfig]);
  return (
    <Layout className={styles.resume} {...layout}>
      <Preamble
        col={clsx('col', 'col--10', 'col--offset-1', styles.col)}
        intro={{
          children: <p className={styles.contacts}>{props.contacts}</p>,
          description: props.roles,
          title: props.heading.children,
        }}
        row={clsx('row', styles.header)}
      />
      <Content />
      <QRCode />
    </Layout>
  );
});
