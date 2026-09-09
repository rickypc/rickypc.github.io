/*!
 * Copyright © 2015 Richard Huang <rickypc@users.noreply.github.com>
 * All rights reserved.
 */

export const write = jest.fn(() => Promise.resolve());

export default {
  addFonts: jest.fn(),
  createPdf: jest.fn(() => ({ write })),
  setLocalAccessPolicy: jest.fn((callback) => callback()),
  setUrlAccessPolicy: jest.fn((callback) => callback()),
};
