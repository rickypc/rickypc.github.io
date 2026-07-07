/*!
 * Copyright © 2015 Richard Huang <rickypc@users.noreply.github.com>
 * All rights reserved.
 */

import { type PropsWithChildren, type ReactElement } from 'react';

type LayoutProps = PropsWithChildren<{
  className?: string;
  description?: string;
  keywords?: string[];
  title?: string;
}>;

/**
 * Minimal mock common/Layout component that renders children. Only the
 * DOM-safe props asserted by page tests are forwarded onto the wrapper
 * div; non-DOM props (faq, metadatas, schema) are dropped so React does
 * not warn about unknown attributes.
 * @param {LayoutProps} props
 *   The component props.
 * @returns {ReactElement}
 *   The common/Layout component.
 */
export default function Layout({
  children, className, description, keywords, title,
}: LayoutProps): ReactElement {
  return (
    <div
      className={className}
      data-description={description}
      data-keywords={keywords?.join(',')}
      data-testid="layout"
      data-title={title}
    >
      {children}
    </div>
  );
}
