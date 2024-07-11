/*!
 * All the code that follow is
 * Copyright (c) 2015 - 2024 Richard Huang <rickypc@users.noreply.github.com>.
 * All Rights Reserved. Not for reuse without permission.
 */

import { a11y } from '@site/src/data/common';
import { domAnimation, LazyMotion, m } from 'framer-motion';
import { forwardRef, memo } from 'react';
import PropTypes from 'prop-types';
import useBrokenLinks from '@docusaurus/useBrokenLinks';

const Link = forwardRef(({
  children,
  className,
  href,
  title,
  validate = false,
  ...rest
}, ref) => {
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
        rel={href?.includes('https://') ? 'noopener noreferrer' : null}
        target={href?.includes('https://') ? '_blank' : null}
        {...rest}
      >
        {children}
      </m.a>
    </LazyMotion>
  ) : <span className={className}>{children}</span>;
});
Link.displayName = 'Link';
Link.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
  className: PropTypes.string,
  href: PropTypes.string,
  title: PropTypes.string,
  validate: PropTypes.bool,
};

export default memo(Link);
