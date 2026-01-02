/*!
 * Copyright © 2015 Richard Huang <rickypc@users.noreply.github.com>
 * All rights reserved.
 */

import { type PropsWithChildren, type ReactElement } from 'react';

/**
 * Minimal mock about/Oracle component that renders children.
 * @param {PropsWithChildren} props
 *   The component props.
 * @returns {ReactElement}
 *   The about/Oracle component.
 */
export default function AboutOracle({ children, ...rest }: PropsWithChildren): ReactElement {
  return <div data-testid="oracle" {...rest}>{children}</div>;
}
