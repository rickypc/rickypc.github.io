/*!
 * Copyright © 2015 Richard Huang <rickypc@users.noreply.github.com>
 * All rights reserved.
 */

import { useVisibility } from '@site/src/hooks/observer';

jest.unmock('@site/src/hooks/observer');

describe('useVisibility (Node.js)', () => {
  it('can be required under Node and exports useVisibility', () => {
    expect(typeof useVisibility).toBe('function');
  });
});
