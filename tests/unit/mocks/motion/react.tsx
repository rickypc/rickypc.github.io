/*!
 * Copyright © 2015 Richard Huang <rickypc@users.noreply.github.com>
 * All rights reserved.
 */

import { mock } from 'bun:test';
import type {
  ComponentPropsWithoutRef,
  MouseEventHandler,
  PropsWithChildren,
  ReactElement,
  Ref,
} from 'react';

type ArticleProps = {
  className?: string;
  layout?: boolean;
  onHoverEnd: () => void;
  onHoverStart: () => void;
  onLayoutAnimationComplete?: () => void;
  onLayoutAnimationStart?: () => void;
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
  dragElastic?: number;
  dragMomentum?: boolean;
  layout?: boolean;
  onDragEnd?: MouseEventHandler<HTMLElement>;
  onDragStart?: MouseEventHandler<HTMLElement>;
};

type DtProps = {
  className?: string;
  item: string;
  onClick: MouseEventHandler<HTMLElement>;
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

export const animate = mock();

/**
 * Minimal mock motion/react/AnimatePresence component that renders children.
 * @param {PropsWithChildren} props
 *   The component props.
 * @returns {ReactElement}
 *   The motion/react/AnimatePresence component.
 */
export function AnimatePresence({ children }: PropsWithChildren): ReactElement {
  return <>{children}</>;
}

export const domAnimation = {};

export const domMax = {};

/**
 * Minimal mock motion/react/LayoutGroup component that renders children.
 * @param {PropsWithChildren} props
 *   The component props.
 * @returns {ReactElement}
 *   The motion/react/LayoutGroup component.
 */
export function LayoutGroup({ children }: PropsWithChildren): ReactElement {
  return <>{children}</>;
}

/**
 * Minimal mock motion/react/LazyMotion component that renders children.
 * @param {PropsWithChildren} props
 *   The component props.
 * @returns {ReactElement}
 *   The motion/react/LazyMotion component.
 */
export function LazyMotion({ children }: PropsWithChildren): ReactElement {
  return <>{children}</>;
}

export const listeners: { [key: string]: unknown } = {};

export const motion = {
  // eslint-disable-next-line @docusaurus/no-html-links
  a: ({ children, ...props }: PropsWithChildren) => <a {...props}>{children}</a>,
  article: ({
    children,
    className,
    layout,
    onHoverEnd,
    onHoverStart,
    onLayoutAnimationComplete,
    onLayoutAnimationStart,
    whileInView,
    ...props
  }: PropsWithChildren<ArticleProps>) => {
    if (onLayoutAnimationStart) {
      onLayoutAnimationStart();
    }
    if (onLayoutAnimationComplete) {
      onLayoutAnimationComplete();
    }
    return (
      <article
        className={className}
        data-layout={String(!!layout)}
        data-testid="article"
        data-whileinview={JSON.stringify(whileInView || {})}
        onMouseEnter={onHoverStart}
        onMouseLeave={onHoverEnd}
        {...props}
      >
        {children}
      </article>
    );
  },
  aside: ({ children, ...props }: PropsWithChildren) => <aside {...props}>{children}</aside>,
  button: ({ children, ref, ...props }: PropsWithChildren<ButtonProps>) => (
    <button ref={ref} {...props} type="button">
      {children}
    </button>
  ),
  circle: ({ children, ...props }: PropsWithChildren) => <circle {...props}>{children}</circle>,
  div: ({
    children,
    className,
    dragElastic,
    dragMomentum,
    layout,
    onDragEnd,
    onDragStart,
    ...props
  }: PropsWithChildren<DivProps>) => {
    listeners[`${className}-onDragEnd`] = onDragEnd;
    listeners[`${className}-onDragStart`] = onDragStart;
    return (
      <div
        className={className}
        data-drag-elastic={dragElastic}
        data-drag-momentum={dragMomentum}
        data-layout={JSON.stringify(layout || {})}
        data-testid="div"
        {...props}
      >
        {children}
      </div>
    );
  },
  dt: ({ children, className, item, onClick, whileTap, ...rest }: PropsWithChildren<DtProps>) => (
    /* biome-ignore lint/a11y/useSemanticElements: - */
    <dt
      className={className}
      data-whiletap={JSON.stringify(whileTap || {})}
      onClick={onClick}
      onKeyDown={(evt) => {
        if ([' ', 'Enter'].includes(evt.key)) {
          evt.preventDefault();
          onClick(item as any);
        }
      }}
      /* biome-ignore lint/a11y/noNoninteractiveElementToInteractiveRole: - */
      role="button"
      tabIndex={0}
      {...rest}
    >
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
    <figure
      className={className}
      data-layout={JSON.stringify(layout || {})}
      data-testid="figure"
      data-whileinview={JSON.stringify(whileInView || {})}
      ref={ref}
      {...props}
    >
      {children}
    </figure>
  ),
  img: ({ alt, ...props }: ComponentPropsWithoutRef<'img'>) => <img alt={alt} {...props} />,
  span: ({ children, className, layoutId, ...rest }: PropsWithChildren<SpanProps>) => (
    <span className={className} data-layoutid={layoutId} data-testid="span" {...rest}>
      {children}
    </span>
  ),
  svg: ({ children, ...props }: PropsWithChildren) => (
    <svg {...props}>
      <title> </title>
      {children}
    </svg>
  ),
};

export const useMotionValue = mock((value) => {
  let response = value;
  return {
    get() {
      return response;
    },
    set(newValue: number) {
      response = newValue;
    },
  };
});
export const useScroll = mock(() => ({ scrollYProgress: 0 }));
export const useSpring = mock(() => ({ y: 0 }));
export const useTransform = mock((value, cb) => {
  if (typeof cb === 'function') {
    const val = typeof value.get === 'function' ? value.get() : value;
    cb(val);
  }
});
