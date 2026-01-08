/*!
 * Copyright © 2015 Richard Huang <rickypc@users.noreply.github.com>
 * All rights reserved.
 */

import { catalog, intro, layout } from '@site/src/data/portfolio';
import { clsx } from '@site/src/data/common';
import Filter from '@site/src/components/portfolio/Filter';
import { type ImageProps } from '@site/src/components/common/Image';
import Layout from '@site/src/components/common/Layout';
import { memo, useCallback, useState } from 'react';
import Preamble from '@site/src/components/common/Preamble';
import Projects from '@site/src/components/portfolio/Projects';
import QRCode from '@site/src/components/common/QRCode';
import Zoom from '@site/src/components/portfolio/Zoom';
import styles from './styles.module.css';

export default memo(function Portfolio() {
  const [[current, filtered], setFilter] = useState(['All', catalog]);
  const [open, setOpen] = useState({});

  const onFilterClick = useCallback((value = 'All') => {
    setFilter([
      value,
      value === 'All' ? catalog : catalog.filter((project) => project.tags.includes(value)),
    ]);
  }, []);
  const onProjectClick = useCallback((image: ImageProps) => setOpen(image), []);
  const onZoomClick = useCallback(() => setOpen({}), []);

  return (
    <Layout className={styles.portfolio} {...layout}>
      <Preamble intro={intro} />
      <section className={clsx(styles.filter, 'row', styles.row)}>
        <div className="col">
          <Filter current={current} onClick={onFilterClick} />
        </div>
      </section>
      <section className={clsx(styles.projects, 'row', styles.row)}>
        <Projects filtered={filtered} onClick={onProjectClick} open={open} />
      </section>
      <Zoom onClick={onZoomClick} open={open} />
      <QRCode />
    </Layout>
  );
});
