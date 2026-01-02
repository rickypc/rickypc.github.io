/*!
 * Copyright © 2015 Richard Huang <rickypc@users.noreply.github.com>
 * All rights reserved.
 */

export const process = jest.fn((html) => Promise.resolve(html.replace('<html', '<html data-beasties-container')));

export default jest.fn(() => ({ process }));
