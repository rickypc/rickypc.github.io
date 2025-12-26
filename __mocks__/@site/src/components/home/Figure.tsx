/*!
 * All the code that follow is
 * Copyright (c) 2015 - 2025 Richard Huang <rickypc@users.noreply.github.com>.
 * All Rights Reserved. Not for reuse without permission.
 */

import { type PropsWithChildren, type ReactElement } from 'react';

/**
 * Minimal mock home/Figure component that renders children.
 * @param {PropsWithChildren} props
 *   The component props.
 * @returns {ReactElement}
 *   The home/Figure component.
 */
export default function HomeFigure({ children, ...rest }: PropsWithChildren): ReactElement {
  return <div data-testid="figure" {...rest}>{children}</div>;
}
