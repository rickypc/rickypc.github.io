/*!
 * Copyright © 2015 Richard Huang <rickypc@users.noreply.github.com>
 * All rights reserved.
 */

import Collapsible from '@site/src/components/common/Collapsible';
import Pills from '@site/src/components/common/Pills';
import { catalog } from '@site/src/data/portfolio';
import { useMedia } from '@site/src/hooks/observer';
import { memo, type ReactElement, useMemo } from 'react';

export type FilterProps = {
  current: string;
  onClick: (_: string) => void;
};

/**
 * Portfolio tag filter: every tag used across the project catalog, sorted with `All` in front. A
 * media query swaps the pill row for a collapsible menu on narrow screens.
 * @param {FilterProps} props - The active tag and the handler called with the clicked tag.
 * @returns {ReactElement} The pill row or the collapsible menu, depending on viewport width.
 */
export default memo(function Filter({ current, onClick }: FilterProps): ReactElement {
  const [collapsible] = useMedia('screen and (max-width: 62rem)');

  const tags = useMemo(() => {
    const combine = [
      ...new Set(
        catalog.reduce<string[]>((accumulator, project) => accumulator.concat(project.tags), []),
      ),
    ];
    return ['All', ...combine.sort((a, b) => a.localeCompare(b))];
  }, []);

  return collapsible ? (
    <Collapsible active={current} items={tags} onClick={onClick} translate="no" />
  ) : (
    <Pills active={current} items={tags} onClick={onClick} prefix="portfolio" translate="no" />
  );
});
