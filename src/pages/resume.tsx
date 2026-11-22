/*!
 * Copyright © 2015 Richard Huang <rickypc@users.noreply.github.com>
 * All rights reserved.
 */

import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@site/src/components/common/Layout';
import Preamble from '@site/src/components/common/Preamble';
import QRCode from '@site/src/components/common/QRCode';
import Content from '@site/src/components/resume/Content';
import { clsx } from '@site/src/data/common';
import { header, layout } from '@site/src/data/resume';
import { memo, type ReactElement, useMemo } from 'react';
import styles from './resume.module.css';

/**
 * Resume route: the headline, role line, and contact links read from the Docusaurus site config,
 * above the career history sections.
 * @returns {ReactElement} The resume page element wrapped in the shared `Layout` and `Preamble`.
 */
export default memo(function Resume(): ReactElement {
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
