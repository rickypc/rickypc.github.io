/*!
 * All the code that follow is
 * Copyright (c) 2015 - 2025 Richard Huang <rickypc@users.noreply.github.com>.
 * All Rights Reserved. Not for reuse without permission.
 */

import { forwardRef } from 'react';

// eslint-disable-next-line react/jsx-no-useless-fragment,react/prop-types
export const AnimatePresence = ({ children }) => <>{children}</>;

export const domAnimation = {};

export const domMax = {};

/* eslint-disable-next-line react/function-component-definition,
react/jsx-no-useless-fragment,react/prop-types */
export const LazyMotion = ({ children }) => <>{children}</>;

export const m = {
  a: ({ children, ...props }) => <a {...props}>{children}</a>,
  article: ({ children, className, whileInView, ...props }) => (
    <article className={className} data-testid="article" {...props}>
      {children}
    </article>
  ),
  button: forwardRef(({ children, ...props }, ref) => <button ref={ref} {...props}>{children}</button>),
  div: ({ children, className, layout, ...props }) => (
    <div className={className} data-testid="div" {...props}>
      {children}
    </div>
  ),
  dt: ({ children, className, onClick, whileTap, ...rest }) => (
    /* eslint-disable-next-line jsx-a11y/click-events-have-key-events,
    jsx-a11y/no-noninteractive-element-interactions */
    <dt className={className} onClick={onClick} {...rest}>
      {children}
    </dt>
  ),
  figure: forwardRef(({ children, className, layout, whileInView, ...props }, ref) => (
    <figure className={className} data-testid="figure" ref={ref} {...props}>
      {children}
    </figure>
  )),
  img: ({ children, ...props }) => <img {...props}>{children}</img>,
  span: ({ children, className, layoutId, ...rest }) => (
    <span
      className={className}
      data-layoutid={layoutId}
      data-testid="span"
      {...rest}
    >
      {children}
    </span>
  ),
};
