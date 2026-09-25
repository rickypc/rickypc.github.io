/*!
 * Copyright © 2015 Richard Huang <rickypc@users.noreply.github.com>
 * All rights reserved.
 */

import { mock } from 'bun:test';

const defaultMock = mock((props) => (
  <div data-testid="doc-tags-list-page">{JSON.stringify(props)}</div>
));

export default defaultMock;
