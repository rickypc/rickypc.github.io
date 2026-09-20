/*!
 * Copyright © 2015 Richard Huang <rickypc@users.noreply.github.com>
 * All rights reserved.
 */

import type { PropsWithChildren, ReactElement } from 'react';

type LinkProps = {
  title?: string;
  validate?: boolean;
  whileTap?: {
    scale?: number;
  };
};

/**
 * Minimal mock common/Link component that renders children.
 * @param {PropsWithChildren} props
 *   The component props.
 * @returns {ReactElement}
 *   The common/Link component.
 */
export default function Link({
  children,
  title,
  validate,
  whileTap,
  ...rest
}: PropsWithChildren<LinkProps>): ReactElement {
  return (
    // eslint-disable-next-line @docusaurus/no-html-links
    <a
      data-testid={`link-${title || 'title'}`}
      data-validate={validate?.toString()}
      data-whiletap={JSON.stringify(whileTap || {})}
      title={title}
      {...rest}
    >
      {children}
    </a>
  );
}
