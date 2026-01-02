/*!
 * Copyright © 2015 Richard Huang <rickypc@users.noreply.github.com>
 * All rights reserved.
 */

import { type PropsWithChildren, type ReactElement } from 'react';

type ZoomProps = {
  open: {};
};

/**
 * Minimal mock portfolio/Zoom component that renders children.
 * @param {PropsWithChildren} props
 *   The component props.
 * @returns {ReactElement}
 *   The portfolio/Zoom component.
 */
export default function PortfolioZoom({
  children,
  open,
  ...rest
}: PropsWithChildren<ZoomProps>): ReactElement {
  return (
    <div
      data-open={String(!!Object.keys(open || {}).length)}
      data-testid="zoom"
      {...rest}
    >
      {children}
    </div>
  );
}
