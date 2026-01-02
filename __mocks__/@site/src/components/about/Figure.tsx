/*!
 * Copyright © 2015 Richard Huang <rickypc@users.noreply.github.com>
 * All rights reserved.
 */

import { type PropsWithChildren, type ReactElement } from 'react';

/**
 * Minimal mock about/Figure component that renders children.
 * @param {PropsWithChildren} props
 *   The component props.
 * @returns {ReactElement}
 *   The about/Figure component.
 */
export default function AboutFigure({ children, ...rest }: PropsWithChildren): ReactElement {
  return <div data-testid="figure" {...rest}>{children}</div>;
}
