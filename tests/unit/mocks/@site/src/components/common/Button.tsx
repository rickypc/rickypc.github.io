/*!
 * Copyright © 2015 Richard Huang <rickypc@users.noreply.github.com>
 * All rights reserved.
 */

import type { PropsWithChildren, ReactElement, ReactEventHandler, Ref, RefCallback } from 'react';

type ButtonProps = {
  'aria-label': string;
  onClick?: ReactEventHandler<HTMLButtonElement>;
  ref?: Ref<HTMLButtonElement>;
  whileTap?: {
    scale?: number;
  };
};

type ButtonRefHandler = HTMLButtonElement & { _handler?: ReactEventHandler<HTMLButtonElement> };

/**
 * Minimal mock common/Button component that renders children.
 * @param {PropsWithChildren} props
 *   The component props.
 * @returns {ReactElement}
 *   The common/Button component.
 */
export default function Button({
  'aria-label': ariaLabel,
  children,
  onClick,
  ref,
  whileTap,
  ...rest
}: PropsWithChildren<ButtonProps>): ReactElement {
  const refHandler: RefCallback<ButtonRefHandler> = (node) => {
    if (node) {
      node._handler = onClick;
    }
    if (typeof ref === 'function') {
      ref(node);
    } else if (ref) {
      ref.current = node;
    }
  };
  return (
    <button
      data-testid={`button-${ariaLabel || 'btn'}`}
      data-whiletap={JSON.stringify(whileTap || {})}
      onClick={onClick}
      ref={refHandler}
      {...rest}
      type="button"
    >
      {children}
    </button>
  );
}
