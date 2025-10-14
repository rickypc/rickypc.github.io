/*!
 * All the code that follow is
 * Copyright (c) 2015 - 2025 Richard Huang <rickypc@users.noreply.github.com>.
 * All Rights Reserved. Not for reuse without permission.
 */

import { catalog } from '@site/src/data/portfolio';

export default ({ current, onClick }) => {
  const combine = [
    ...new Set(
      catalog.reduce((accumulator, project) => accumulator.concat(project.tags || []), [])
    ),
  ];
  const tags = ['All', ...(combine.sort((a, b) => a.localeCompare(b)))];
  return (
    <div current={String(current)} data-testid="filter">
      {tags.map((tag) => (
        <button
          data-testid={`filter-${tag.toLowerCase()}`}
          key={tag}
          onClick={() => onClick(tag === 'All' ? undefined : tag)}
          type="button"
        />
      ))}
    </div>
  );
};
