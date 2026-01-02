/*!
 * Copyright © 2015 Richard Huang <rickypc@users.noreply.github.com>
 * All rights reserved.
 */

import { type PropsWithChildren, type ReactElement } from 'react';

/**
 * Minimal mock portfolio/Carousel component that renders children.
 * @param {PropsWithChildren} props
 *   The component props.
 * @returns {ReactElement}
 *   The portfolio/Carousel component.
 */
export default function PortfolioCarousel({
  children,
  ...rest
}: PropsWithChildren): ReactElement {
  return <div data-testid="carousel" {...rest}>{children}</div>;
}
