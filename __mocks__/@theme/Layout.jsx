/*!
 * All the code that follow is
 * Copyright (c) 2015 - 2025 Richard Huang <rickypc@users.noreply.github.com>.
 * All Rights Reserved. Not for reuse without permission.
 */

/* eslint-disable-next-line react/display-name,
react/function-component-definition,react/prop-types */
export default ({ children, description, title }) => (
  <div data-description={description} data-testid="layout" data-title={title}>
    {children}
  </div>
);
