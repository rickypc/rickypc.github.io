/*!
 * All the code that follow is
 * Copyright (c) 2015 - 2025 Richard Huang <rickypc@users.noreply.github.com>.
 * All Rights Reserved. Not for reuse without permission.
 */

const listeners = {};

export default jest.fn(() => ({
  createPdfKitDocument() {
    return {
      end() {
        if (listeners.end) {
          listeners.end();
        }
      },
      on(ev, fn) {
        // eslint-disable-next-line security/detect-object-injection
        listeners[ev] = fn;
      },
      pipe() {},
    };
  },
}));
