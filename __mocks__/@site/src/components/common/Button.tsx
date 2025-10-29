/*!
 * All the code that follow is
 * Copyright (c) 2015 - 2025 Richard Huang <rickypc@users.noreply.github.com>.
 * All Rights Reserved. Not for reuse without permission.
 */

import {
  type PropsWithChildren,
  type ReactElement,
  type ReactEventHandler,
  type Ref,
  type RefCallback,
} from 'react';

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
      // eslint-disable-next-line no-param-reassign,no-underscore-dangle
      node._handler = onClick;
    }
    if (typeof ref === 'function') {
      ref(node);
    } else if (ref) {
      // eslint-disable-next-line no-param-reassign
      ref.current = node;
    }
  };
  return (
    <button
      data-testid={`button-${ariaLabel || 'btn'}`}
      onClick={onClick}
      ref={refHandler}
      {...rest}
      type="button"
    >
      {children}
    </button>
  );
}
