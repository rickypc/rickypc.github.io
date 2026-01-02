/*!
 * Copyright © 2015 Richard Huang <rickypc@users.noreply.github.com>
 * All rights reserved.
 */

import { catalog } from '@site/src/data/portfolio';
import { type ReactElement } from 'react';

type FilterProps = {
  current: boolean;
  // eslint-disable-next-line no-unused-vars
  onClick: (_?: string) => void;
};

/**
 * Minimal mock portfolio/Filter component that renders children.
 * @param {FilterProps} props
 *   The component props.
 * @returns {ReactElement}
 *   The portfolio/Filter component.
 */
export default function PortfolioFilter({ current, onClick }: FilterProps): ReactElement {
  const combine = [
    ...new Set(
      catalog.reduce<string[]>(
        (accumulator, project) => accumulator.concat(project.tags || []),
        [],
      ),
    ),
  ];
  const tags = ['All', ...(combine.sort((a, b) => a.localeCompare(b)))];
  return (
    <div data-current={String(current)} data-testid="filter">
      {tags.map((tag) => (
        <button
          aria-label={tag}
          data-testid={`filter-${tag.toLowerCase()}`}
          key={tag}
          onClick={() => onClick(tag === 'All' ? undefined : tag)}
          type="button"
        />
      ))}
    </div>
  );
}
