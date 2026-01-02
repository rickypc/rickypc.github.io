/*!
 * Copyright © 2015 Richard Huang <rickypc@users.noreply.github.com>
 * All rights reserved.
 */

import { type PropsWithChildren, type ReactElement } from 'react';

/**
 * Minimal mock \@theme-original/MDXComponents/Details component that renders children.
 * @param {PropsWithChildren} props
 *   The component props.
 * @returns {ReactElement}
 *   The \@theme-original/MDXComponents/Details component.
 */
export default function Details({ children }: PropsWithChildren): ReactElement {
  return <div data-testid="mdx-details">{children}</div>;
}
