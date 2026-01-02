/*!
 * Copyright © 2015 Richard Huang <rickypc@users.noreply.github.com>
 * All rights reserved.
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
