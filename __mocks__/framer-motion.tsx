/*!
 * All the code that follow is
 * Copyright (c) 2015 - 2025 Richard Huang <rickypc@users.noreply.github.com>.
 * All Rights Reserved. Not for reuse without permission.
 */

import {
  type MouseEventHandler,
  type PropsWithChildren,
  type ReactElement,
  type Ref,
} from 'react';

type ArticleProps = {
  className?: string;
  layout?: boolean;
  whileInView?: {
    opacity?: number | number[];
    scale?: number | number[];
  };
};

type ButtonProps = {
  ref?: Ref<HTMLButtonElement>;
};

type DivProps = {
  className?: string;
  layout?: boolean;
};

type DtProps = {
  className?: string;
  onClick?: MouseEventHandler<HTMLElement>;
  whileTap?: {
    scale?: number;
  };
};

type FigureProps = {
  className?: string;
  layout?: boolean;
  ref?: Ref<HTMLElement>;
  whileInView?: {
    opacity?: number | number[];
    scale?: number | number[];
  };
};

type SpanProps = {
  className?: string;
  layoutId?: string;
};

/**
 * Minimal mock framer-motion/AnimatePresence component that renders children.
 * @param {PropsWithChildren} props
 *   The component props.
 * @returns {ReactElement}
 *   The framer-motion/AnimatePresence component.
 */
export function AnimatePresence({ children }: PropsWithChildren): ReactElement {
  return <>{children}</>;
}

export const domAnimation = {};

export const domMax = {};

/**
 * Minimal mock framer-motion/LazyMotion component that renders children.
 * @param {PropsWithChildren} props
 *   The component props.
 * @returns {ReactElement}
 *   The framer-motion/LazyMotion component.
 */
export function LazyMotion({ children }: PropsWithChildren): ReactElement {
  return <>{children}</>;
}

export const m = {
  // eslint-disable-next-line @docusaurus/no-html-links
  a: ({ children, ...props }: PropsWithChildren<{}>) => <a {...props}>{children}</a>,
  article: ({
    children,
    className,
    layout,
    whileInView,
    ...props
  }: PropsWithChildren<ArticleProps>) => (
    <article className={className} data-layout={String(!!layout)} data-testid="article" {...props}>
      {children}
    </article>
  ),
  button: ({
    children,
    ref,
    ...props
  }: PropsWithChildren<ButtonProps>) => <button ref={ref} {...props} type="button">{children}</button>,
  div: ({
    children,
    className,
    layout,
    ...props
  }: PropsWithChildren<DivProps>) => (
    <div className={className} data-testid="div" {...props}>
      {children}
    </div>
  ),
  dt: ({
    children,
    className,
    onClick,
    whileTap,
    ...rest
  }: PropsWithChildren<DtProps>) => (
    /*
      eslint-disable-next-line
        jsx-a11y/click-events-have-key-events,
        jsx-a11y/no-noninteractive-element-interactions
    */
    <dt className={className} onClick={onClick} {...rest}>
      {children}
    </dt>
  ),
  figure: ({
    children,
    className,
    layout,
    ref,
    whileInView,
    ...props
  }: PropsWithChildren<FigureProps>) => (
    <figure className={className} data-testid="figure" ref={ref} {...props}>
      {children}
    </figure>
  ),
  // eslint-disable-next-line jsx-a11y/alt-text
  img: (props: {}) => <img {...props} />,
  span: ({
    children,
    className,
    layoutId,
    ...rest
  }: PropsWithChildren<SpanProps>) => (
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
