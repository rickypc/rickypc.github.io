/*!
 * Copyright © 2015 Richard Huang <rickypc@users.noreply.github.com>
 * All rights reserved.
 */

import type { ImageProps } from '@site/src/components/common/Image';
import Layout from '@site/src/components/common/Layout';
import Preamble from '@site/src/components/common/Preamble';
import QRCode from '@site/src/components/common/QRCode';
import Filter from '@site/src/components/portfolio/Filter';
import Projects from '@site/src/components/portfolio/Projects';
import Zoom from '@site/src/components/portfolio/Zoom';
import { clsx } from '@site/src/data/common';
import {
  MODEL_CONTEXT_RESULT_CAP,
  registerTools,
  type ToolDescriptor,
} from '@site/src/data/model-context';
import { catalog, intro, layout } from '@site/src/data/portfolio';
import { memo, useCallback, useEffect, useState } from 'react';
import styles from './styles.module.css';

type FilterableProject = { tags: string[]; title: string };

const filterTags = (projects: readonly FilterableProject[]) => [
  'All',
  ...new Set(projects.flatMap((project) => project.tags)),
];

// After filterTags assignment.
const filterTool = (
  projects: readonly FilterableProject[],
  onFilterClick: (value?: string) => void,
): ToolDescriptor => ({
  description: 'Filters the portfolio grid to one catalog tag through the filter button path.',
  execute: (args) => {
    const allowed = filterTags(projects);
    const requested = args?.tag;
    const tag = requested === undefined || requested === null ? 'All' : requested;
    if (typeof tag !== 'string' || !allowed.includes(tag)) {
      return { error: `filter-projects expects one of: ${allowed.join(', ')}` };
    }
    onFilterClick(tag);
    const visible =
      tag === 'All' ? projects : projects.filter((project) => project.tags.includes(tag));
    return {
      count: visible.length,
      projects: visible
        .slice(0, MODEL_CONTEXT_RESULT_CAP)
        .map(({ tags, title }) => ({ tags, title })),
      tag,
    };
  },
  inputSchema: {
    properties: {
      tag: { description: 'One catalog tag, or All for the full grid.', type: 'string' },
    },
    type: 'object',
  },
  name: 'filter-projects',
});

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

  useEffect(() => {
    const registration = registerTools([filterTool(catalog, onFilterClick)]);
    return () => {
      if (registration instanceof AbortController) {
        registration.abort();
      }
    };
  }, [onFilterClick]);

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
