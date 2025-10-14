/*!
 * All the code that follow is
 * Copyright (c) 2015 - 2025 Richard Huang <rickypc@users.noreply.github.com>.
 * All Rights Reserved. Not for reuse without permission.
 */

import { forwardRef } from 'react';

export default forwardRef(({ 'aria-label': ariaLabel, children, onClick, whileTap, ...rest }, ref) => {
  const refHandler = (node) => {
    if (node) {
      node._handler = onClick;
    }
    if (typeof ref === 'function') {
      ref(node);
    } else if (ref) {
      ref.current = node;
    }
  };
  return <button data-testid={`button-${ariaLabel || 'btn'}`} onClick={onClick} ref={refHandler} {...rest}>{children}</button>;
});
