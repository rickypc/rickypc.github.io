/*!
 * All the code that follow is
 * Copyright (c) 2015 - 2024 Richard Huang <rickypc@users.noreply.github.com>.
 * All Rights Reserved. Not for reuse without permission.
 */

import { catalog } from '@site/src/data/portfolio';
import Collapsible from '@site/src/components/common/Collapsible';
import { memo, useMemo } from 'react';
import Pills from '@site/src/components/common/Pills';
import PropTypes from 'prop-types';
import { useMedia } from '@site/src/hooks/observer';

export default memo(Object.assign(function Filter({ current, onClick }) {
  const [collapsible] = useMedia('screen and (max-width: 62rem)');

  const tags = useMemo(() => {
    const combine = [...new Set(catalog.reduce(
      (accumulator, project) => accumulator.concat(project.tags),
      [],
    ))];
    return ['All', ...(combine.sort((a, b) => a.localeCompare(b)))];
  }, []);

  return collapsible
    ? <Collapsible active={current} items={tags} onClick={onClick} />
    : (
      <Pills
        active={current}
        aria-hidden
        items={tags}
        onClick={onClick}
        prefix="portfolio"
      />
    );
}, {
  propTypes: {
    current: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
  },
}));
