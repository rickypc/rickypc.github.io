/*!
 * All the code that follow is
 * Copyright (c) 2015 - 2025 Richard Huang <rickypc@users.noreply.github.com>.
 * All Rights Reserved. Not for reuse without permission.
 */

export const AnimatePresence = ({ children }) => <>{children}</>;

export const domAnimation = {};

export const domMax = {};

export const LazyMotion = ({ children }) => <>{children}</>;

export const m = {
  a: ({ children, ...props }) => <a {...props}>{children}</a>,
  article: ({ children, className, layout, whileInView, ...props }) => (
    <article className={className} data-testid="article" layout={String(!!layout)} {...props}>
      {children}
    </article>
  ),
  button: ({ children, ref, ...props }) => <button ref={ref} {...props}>{children}</button>,
  div: ({ children, className, layout, ...props }) => (
    <div className={className} data-testid="div" {...props}>
      {children}
    </div>
  ),
  dt: ({ children, className, onClick, whileTap, ...rest }) => (
    <dt className={className} onClick={onClick} {...rest}>
      {children}
    </dt>
  ),
  figure: ({ children, className, layout, ref, whileInView, ...props }) => (
    <figure className={className} data-testid="figure" ref={ref} {...props}>
      {children}
    </figure>
  ),
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
