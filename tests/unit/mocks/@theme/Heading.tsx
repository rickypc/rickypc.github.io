/*!
 * Copyright © 2015 Richard Huang <rickypc@users.noreply.github.com>
 * All rights reserved.
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
