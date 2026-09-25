/*!
 * Copyright © 2015 Richard Huang <rickypc@users.noreply.github.com>
 * All rights reserved.
 */

import { mock } from 'bun:test';

const defaultMock = mock(({ children, label, value }) => (
  <div data-label={label} data-testid="tab-item" data-value={value}>
    {children}
  </div>
));

export default defaultMock;
