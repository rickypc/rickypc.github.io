/*!
 * Copyright © 2015 Richard Huang <rickypc@users.noreply.github.com>
 * All rights reserved.
 */

// eslint-disable-next-line no-unused-vars
const listeners: Record<string, (..._: any[]) => void> = {};

export default jest.fn(() => ({
  createPdfKitDocument() {
    return {
      end() {
        if (listeners.end) {
          listeners.end();
        }
      },
      // eslint-disable-next-line no-unused-vars
      on(ev: string, fn: (..._: any[]) => void) {
        // eslint-disable-next-line security/detect-object-injection
        listeners[ev] = fn;
      },
      pipe() {},
    };
  },
}));
