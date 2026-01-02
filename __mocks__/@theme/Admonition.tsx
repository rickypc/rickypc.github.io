/*!
 * Copyright © 2015 Richard Huang <rickypc@users.noreply.github.com>
 * All rights reserved.
 */

import { type PropsWithChildren, type ReactElement } from 'react';

type AdmonitionProps = {
  type?: string;
};

/**
 * Minimal mock \@theme/Admonition component that renders children.
 * @param {PropsWithChildren} props
 *   The component props.
 * @returns {ReactElement}
 *   The \@theme/Admonition component.
 */
export default function Admonition({
  children,
  type,
}: PropsWithChildren<AdmonitionProps>): ReactElement {
  return <div data-testid="admonition" data-type={type}>{children}</div>;
}
