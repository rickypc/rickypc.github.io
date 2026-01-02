/*!
 * Copyright © 2015 Richard Huang <rickypc@users.noreply.github.com>
 * All rights reserved.
 */

import { type PropsWithChildren, type ReactElement } from 'react';

/**
 * Minimal mock about/Content component that renders children.
 * @param {PropsWithChildren} props
 *   The component props.
 * @returns {ReactElement}
 *   The about/Content component.
 */
export default function AboutContent({ children, ...rest }: PropsWithChildren): ReactElement {
  return <div data-testid="content" {...rest}>{children}</div>;
}
