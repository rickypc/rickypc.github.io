/*!
 * Copyright © 2015 Richard Huang <rickypc@users.noreply.github.com>
 * All rights reserved.
 */

import { mock } from 'bun:test';
import base from '#buddhism/media/pdf/templates/_base';

describe('docs.buddhism.media.pdf.templates._base', () => {
  test('loads definition and options from required module', async () => {
    mock.module('#buddhism/default', () => ({
      default: () => ({
        definition: {
          info: { keywords: ['a', 'b'] },
          pageSize: 'A4',
        },
      }),
    }));

    const result = await base('#buddhism/default');

    expect(result).toEqual({
      definition: {
        defaultStyle: { font: 'NotoSans', fontSize: 10 },
        info: { keywords: ['a', 'b'] },
        pageMargins: [7.5, 7.5, 7.5, 7.5],
        pageSize: 'A4', // overridden
      },
    });
  });

  test('uses defaults when module returns empty object', async () => {
    mock.module('#buddhism/empty', () => ({ default: () => ({}) }));

    const result = await base('#buddhism/empty');

    expect(result).toEqual({
      definition: {
        defaultStyle: { font: 'NotoSans', fontSize: 10 },
        info: { keywords: undefined },
        pageMargins: [7.5, 7.5, 7.5, 7.5],
        pageSize: 'LETTER',
      },
    });
  });
});
