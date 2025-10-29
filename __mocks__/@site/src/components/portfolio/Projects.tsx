/*!
 * All the code that follow is
 * Copyright (c) 2015 - 2025 Richard Huang <rickypc@users.noreply.github.com>.
 * All Rights Reserved. Not for reuse without permission.
 */

import { type PropsWithChildren, type ReactElement } from 'react';

type ProjectsProps = {
  filtered: string[];
};

/**
 * Minimal mock portfolio/Projects component that renders children.
 * @param {PropsWithChildren} props
 *   The component props.
 * @returns {ReactElement}
 *   The portfolio/Projects component.
 */
export default function PortfolioProjects({
  children,
  filtered,
  ...rest
}: PropsWithChildren<ProjectsProps>): ReactElement {
  return (
    <div
      data-count={String(filtered?.length || 0)}
      data-filtered={JSON.stringify(filtered)}
      data-testid="projects"
      {...rest}
    >
      {children}
    </div>
  );
}
