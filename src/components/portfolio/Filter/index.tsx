/*!
 * Copyright © 2015 Richard Huang <rickypc@users.noreply.github.com>
 * All rights reserved.
 */

import { catalog } from '@site/src/data/portfolio';
import Collapsible from '@site/src/components/common/Collapsible';
import { memo, type ReactElement, useMemo } from 'react';
import Pills from '@site/src/components/common/Pills';
import { useMedia } from '@site/src/hooks/observer';

export type FilterProps = {
  current: string;
  // eslint-disable-next-line no-unused-vars
  onClick: (_: string) => void;
};

export default memo(function Filter({ current, onClick }: FilterProps): ReactElement {
  const [collapsible] = useMedia('screen and (max-width: 62rem)');

  const tags = useMemo(() => {
    const combine = [...new Set(catalog.reduce<string[]>(
      (accumulator, project) => accumulator.concat(project.tags),
      [],
    ))];
    return ['All', ...(combine.sort((a, b) => a.localeCompare(b)))];
  }, []);

  return collapsible
    ? <Collapsible active={current} items={tags} onClick={onClick} translate="no" />
    : (
      <Pills
        active={current}
        items={tags}
        onClick={onClick}
        prefix="portfolio"
        translate="no"
      />
    );
});
