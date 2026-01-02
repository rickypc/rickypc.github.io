/*!
 * Copyright © 2015 Richard Huang <rickypc@users.noreply.github.com>
 * All rights reserved.
 */

import { type PropsWithChildren, type ReactElement } from 'react';

/**
 * Minimal mock common/Layout component that renders children.
 * @param {PropsWithChildren} props
 *   The component props.
 * @returns {ReactElement}
 *   The common/Layout component.
 */
export default function Layout({ children, ...rest }: PropsWithChildren): ReactElement {
  return <div data-testid="layout" {...rest}>{children}</div>;
}
