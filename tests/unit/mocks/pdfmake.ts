/*!
 * Copyright © 2015 Richard Huang <rickypc@users.noreply.github.com>
 * All rights reserved.
 */

import { mock } from 'bun:test';

export const write = mock(() => Promise.resolve());

export default {
  addFonts: mock(),
  createPdf: mock(() => ({ write })),
  setLocalAccessPolicy: mock((callback) => callback()),
  setUrlAccessPolicy: mock((callback) => callback()),
};
