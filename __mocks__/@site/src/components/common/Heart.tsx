/*!
 * Copyright © 2015 Richard Huang <rickypc@users.noreply.github.com>
 * All rights reserved.
 */

import { type PropsWithChildren, type ReactElement } from 'react';

/**
 * Minimal mock common/Heart component that renders children.
 * @param {PropsWithChildren} props
 *   The component props.
 * @returns {ReactElement}
 *   The common/Heart component.
 */
export default function Heart({ children, ...rest }: PropsWithChildren): ReactElement {
  return <div data-testid="heart" {...rest}>{children}</div>;
}
