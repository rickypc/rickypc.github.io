/*!
 * All the code that follow is
 * Copyright (c) 2015 - 2025 Richard Huang <rickypc@users.noreply.github.com>.
 * All Rights Reserved. Not for reuse without permission.
 */

import { createElement, type PropsWithChildren, type ReactElement } from 'react';

type HeadingProps = {
  as?: string;
  className?: string;
};

/**
 * Minimal mock \@theme/Heading component that renders children.
 * @param {PropsWithChildren} props
 *   The component props.
 * @returns {ReactElement}
 *   The \@theme/Heading component.
 */
export default function Heading({
  as = 'div',
  className,
  children,
}: PropsWithChildren<HeadingProps>): ReactElement {
  return createElement(as, { className, 'data-testid': 'heading' }, children);
}
