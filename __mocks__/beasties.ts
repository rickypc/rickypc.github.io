/*!
 * All the code that follow is
 * Copyright (c) 2015 - 2025 Richard Huang <rickypc@users.noreply.github.com>.
 * All Rights Reserved. Not for reuse without permission.
 */

export const process = jest.fn((html) => Promise.resolve(html.replace('<html', '<html data-beasties-container')));

export default jest.fn(() => ({ process }));
