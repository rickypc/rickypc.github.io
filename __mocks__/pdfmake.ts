/*!
 * Copyright © 2015 Richard Huang <rickypc@users.noreply.github.com>
 * All rights reserved.
 */

import { Writable } from 'node:stream';

let piped: Writable | null = null;

export default jest.fn(() => ({
  createPdfKitDocument() {
    return {
      end() {
        if (piped) {
          process.nextTick(() => piped!.emit('finish'));
        }
      },
      on() {},
      pipe(stream: Writable) {
        piped = stream;
        return stream;
      },
    };
  },
}));
