/*!
 * All the code that follow is
 * Copyright (c) 2015 - 2025 Richard Huang <rickypc@users.noreply.github.com>.
 * All Rights Reserved. Not for reuse without permission.
 */

import { type PropsWithChildren, type ReactElement } from 'react';

type PreambleProps = {
  printAdmonition: boolean;
};

/**
 * Minimal mock common/Heart component that renders children.
 * @param {PropsWithChildren} props
 *   The component props.
 * @returns {ReactElement}
 *   The common/Heart component.
 */
export default function Preamble({
  children,
  printAdmonition,
  ...rest
}: PropsWithChildren<PreambleProps>): ReactElement {
  return (
    <div
      data-print-admonition={String(!!printAdmonition)}
      data-testid="preamble"
      {...rest}
    >
      {children}
    </div>
  );
}
