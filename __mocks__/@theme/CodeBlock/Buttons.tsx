/*!
 * Copyright © 2015 Richard Huang <rickypc@users.noreply.github.com>
 * All rights reserved.
 */

import { type PropsWithChildren, type ReactElement } from 'react';

/**
 * Minimal mock \@theme/CodeBlock/Buttons component that renders children.
 * @param {PropsWithChildren} props
 *   The component props.
 * @returns {ReactElement}
 *   The \@theme/CodeBlock/Buttons component.
 */
export default function Buttons({ children }: PropsWithChildren): ReactElement {
  return <div data-testid="buttons">{children}</div>;
}
