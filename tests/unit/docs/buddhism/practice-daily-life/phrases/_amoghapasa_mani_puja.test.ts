/*!
 * Copyright © 2015 Richard Huang <rickypc@users.noreply.github.com>
 * All rights reserved.
 */

import amoghapasaPadmaUsnisa from '#buddhism/practice-daily-life/phrases/_amoghapasa_padma_usnisa';
import puja from '#buddhism/practice-daily-life/phrases/_amoghapasa_mani_puja';

jest.mock('#buddhism/practice-daily-life/phrases/_amoghapasa_padma_usnisa', () => ({
  __esModule: true,
  default: {
    sanskrit: { children: 'PADMA_USNISA_SANSKRIT' },
    transliteration: { children: 'PADMA_USNISA_TRANSLIT' },
  },
}));

describe('docs.buddhism.phrases._amoghapasa_mani_puja', () => {
  test('exports the correct core structure', () => {
    expect(puja.core).toEqual({
      sanskrit: {
        children: 'ॐ अमोघ पूजा मणिपद्म वज्रे तथागत विलोकिते समन्त प्रसर हूँ',
      },
      transliteration: {
        children:
          'oṃ amogha pūja maṇipadma vajre tathāgata vilokite samanta prasara hūṃ',
      },
    });
  });

  test('builds the sanskrit section correctly', () => {
    expect(puja.sanskrit.title).toBe('अमोघपाश मणि पूजा');

    expect(puja.sanskrit.children).toBe(
      [
        puja.core.sanskrit.children,
        amoghapasaPadmaUsnisa.sanskrit.children,
      ].join(' । '),
    );
  });

  test('builds the transliteration section correctly', () => {
    expect(puja.transliteration.title).toBe('Amoghapāśa Maṇi Pūja');
    expect(puja.transliteration.repetition).toBe(3);

    expect(puja.transliteration.children).toBe(
      [
        puja.core.transliteration.children,
        amoghapasaPadmaUsnisa.transliteration.children,
      ].join(' । '),
    );
  });

  test('builds the translation section correctly', () => {
    expect(puja.translation.title).toBe('Amoghapāśa Jewels Offering');
  });
});
