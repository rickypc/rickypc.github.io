/*!
 * Copyright © 2015 Richard Huang <rickypc@users.noreply.github.com>
 * All rights reserved.
 */

import { mock } from 'bun:test';

export const process = mock((html) =>
  Promise.resolve(html.replace('<html', '<html data-beasties-container')),
);

const defaultMock = mock(() => ({ options: {}, process }));

export default defaultMock;
