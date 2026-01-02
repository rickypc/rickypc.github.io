/*!
 * Copyright © 2015 Richard Huang <rickypc@users.noreply.github.com>
 * All rights reserved.
 */

export default jest.fn((props) => (
  <div data-testid="doc-tag-doc-list-page">{JSON.stringify(props)}</div>
));
