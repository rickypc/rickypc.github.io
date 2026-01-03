/*!
 * Copyright © 2015 Richard Huang <rickypc@users.noreply.github.com>
 * All rights reserved.
 */

import base from '#buddhism/_base';

describe('docs.buddhism._base', () => {
  test('loads definition and options from required module', async () => {
    jest.mock('#buddhism/default', () => () => ({
      definition: {
        info: { keywords: ['a', 'b'] },
        pageSize: 'A4',
      },
      options: { debug: true },
    }), { virtual: true });

    const result = await base('#buddhism/default');

    expect(result).toEqual({
      definition: {
        defaultStyle: { font: 'NotoSans', fontSize: 10 },
        info: { keywords: ['a', 'b'] },
        pageMargins: [7.5, 7.5, 7.5, 7.5],
        pageSize: 'A4', // overridden
      },
      options: { debug: true },
    });
  });

  test('uses defaults when module returns empty object', async () => {
    jest.mock('#buddhism/empty', () => () => ({}), { virtual: true });

    const result = await base('#buddhism/empty');

    expect(result).toEqual({
      definition: {
        defaultStyle: { font: 'NotoSans', fontSize: 10 },
        info: { keywords: undefined },
        pageMargins: [7.5, 7.5, 7.5, 7.5],
        pageSize: 'LETTER',
      },
      options: {},
    });
  });
});
