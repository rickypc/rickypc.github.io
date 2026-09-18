/*!
 * Copyright © 2015 Richard Huang <rickypc@users.noreply.github.com>
 * All rights reserved.
 */

import useBrokenLinks from '@docusaurus/useBrokenLinks';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import { a11y } from '@site/src/data/common';
import { domAnimation, LazyMotion, motion } from 'motion/react';
import { memo, type PropsWithChildren, type ReactElement, type Ref } from 'react';

export type LinkProps = {
  className?: string;
  href?: string;
  ref?: Ref<HTMLAnchorElement>;
  rel?: string;
  target?: string;
  title?: string;
  translate?: 'no' | 'yes';
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
}: PropsWithChildren<LinkProps>): ReactElement {
  const links = useBrokenLinks();
  const { siteConfig } = useDocusaurusContext();
  if (!href && validate) {
    return (
      <span className={className} {...rest}>
        {children}
      </span>
    );
  }
  let rel: string | undefined;
  let renderHref = href;
  let target: string | undefined;
  if (href?.includes('https://')) {
    rel = 'noopener noreferrer';
    target = '_blank';
  } else if (href && !href.includes('.pdf')) {
    const { hash, pathname } = new URL(href, siteConfig.url);
    links.collectLink(pathname);
    if (siteConfig.trailingSlash && !pathname.endsWith('/')) {
      renderHref = `${pathname}/${hash}`;
    }
  }
  return (
    <LazyMotion features={domAnimation}>
      <motion.a
        {...a11y(title)}
        className={className}
        href={renderHref}
        ref={ref}
        rel={rel}
        target={target}
        {...rest}
      >
        {children}
      </motion.a>
    </LazyMotion>
  );
});
