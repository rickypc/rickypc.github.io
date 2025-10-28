/*!
 * All the code that follow is
 * Copyright (c) 2015 - 2025 Richard Huang <rickypc@users.noreply.github.com>.
 * All Rights Reserved. Not for reuse without permission.
 */

import { a11y } from '@site/src/data/common';
import { domAnimation, LazyMotion, m } from 'framer-motion';
import {
  memo,
  type ReactElement,
  type ReactNode,
  type Ref,
} from 'react';
import useBrokenLinks from '@docusaurus/useBrokenLinks';

export type LinkProps = {
  children: ReactNode;
  className?: string;
  href?: string;
  ref?: Ref<HTMLAnchorElement>;
  title?: string;
  validate?: boolean;
  whileTap?: {
    scale?: number;
  };
};

export default memo(function Link({
  children,
  className,
  href,
  ref,
  title,
  validate = false,
  ...rest
}: LinkProps): ReactElement {
  const links = useBrokenLinks();

  if (href && !['https://', '.pdf'].filter((part) => href.includes(part)).length) {
    links.collectLink(href);
  }

  return !validate || (validate && href) ? (
    <LazyMotion features={domAnimation}>
      <m.a
        {...a11y(title)}
        className={className}
        href={href}
        ref={ref}
        rel={href?.includes('https://') ? 'noopener noreferrer' : undefined}
        target={href?.includes('https://') ? '_blank' : undefined}
        {...rest}
      >
        {children}
      </m.a>
    </LazyMotion>
  ) : <span className={className} {...rest}>{children}</span>;
});
