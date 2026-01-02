/*!
 * Copyright © 2015 Richard Huang <rickypc@users.noreply.github.com>
 * All rights reserved.
 */

import { type PropsWithChildren, type ReactElement } from 'react';

/**
 * Minimal mock common/Preamble component that renders children.
 * @param {PropsWithChildren} props
 *   The component props.
 * @returns {ReactElement}
 *   The common/Preamble component.
 */
export default function Preamble({ children, ...rest }: PropsWithChildren): ReactElement {
  return (
    <div data-testid="preamble" {...rest}>
      {children}
    </div>
  );
}
