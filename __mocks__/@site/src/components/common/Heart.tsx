/*!
 * All the code that follow is
 * Copyright (c) 2015 - 2025 Richard Huang <rickypc@users.noreply.github.com>.
 * All Rights Reserved. Not for reuse without permission.
 */

import { type PropsWithChildren, type ReactElement } from 'react';

/**
 * Minimal mock common/Heart component that renders children.
 * @param {PropsWithChildren} props
 *   The component props.
 * @returns {ReactElement}
 *   The common/Heart component.
 */
export default function Heart({ children, ...rest }: PropsWithChildren<{}>): ReactElement {
  return <div data-testid="heart" {...rest}>{children}</div>;
}
