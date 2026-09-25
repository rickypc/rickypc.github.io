/*!
 * Copyright © 2015 Richard Huang <rickypc@users.noreply.github.com>
 * All rights reserved.
 */

import { mock } from 'bun:test';

const defaultMock = mock((props) => (
  <div data-testid="doc-category-generated-index-page">{JSON.stringify(props)}</div>
));

export default defaultMock;
