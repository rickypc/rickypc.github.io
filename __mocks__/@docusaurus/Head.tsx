/*!
 * Copyright © 2015 Richard Huang <rickypc@users.noreply.github.com>
 * All rights reserved.
 */

import { type PropsWithChildren, type ReactElement } from 'react';

/**
 * Minimal mock \@docusaurus/theme-common/Head component that renders children.
 * @param {PropsWithChildren} props
 *   The component props.
 * @returns {ReactElement}
 *   The \@docusaurus/theme-common/Head component.
 */
export default function Head({ children }: PropsWithChildren): ReactElement {
  return <>{children}</>;
}
