/*!
 * All the code that follow is
 * Copyright (c) 2015 - 2025 Richard Huang <rickypc@users.noreply.github.com>.
 * All Rights Reserved. Not for reuse without permission.
 */

import { clsx } from '@site/src/data/common';
import { catalog, layout, preamble } from '@site/src/data/portfolio';
import Filter from '@site/src/components/portfolio/Filter';
import { type ImageProps } from '@site/src/components/common/Image';
import Layout from '@site/src/components/common/Layout';
import { memo, useCallback, useState } from 'react';
import Preamble from '@site/src/components/common/Preamble';
import Projects from '@site/src/components/portfolio/Projects';
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
      <Preamble {...preamble} />
      <section className={clsx(styles.filter, 'row', styles.row)}>
        <div className="col">
          <Filter current={current} onClick={onFilterClick} />
        </div>
      </section>
      <section className={clsx(styles.projects, 'row', styles.row)}>
        <Projects filtered={filtered} onClick={onProjectClick} />
      </section>
      <Zoom onClick={onZoomClick} open={open} />
    </Layout>
  );
});
