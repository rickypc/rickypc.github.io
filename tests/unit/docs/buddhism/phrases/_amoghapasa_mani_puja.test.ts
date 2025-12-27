/*!
 * All the code that follow is
 * Copyright (c) 2015 - 2025 Richard Huang <rickypc@users.noreply.github.com>.
 * All Rights Reserved. Not for reuse without permission.
 */

import amoghapasaPadmaUsnisa from '#buddhism/phrases/_amoghapasa_padma_usnisa';
import puja from '#buddhism/phrases/_amoghapasa_mani_puja';

jest.mock('#buddhism/phrases/_amoghapasa_padma_usnisa', () => ({
  default: {
    sanskrit: { children: 'PADMA_USNISA_SANSKRIT' },
    transliteration: {
      children: 'PADMA_USNISA_TRANSLIT',
      speech: 'padma usnisa speech',
    },
  },
  __esModule: true,
}));

describe('docs.buddhism.phrases._amoghapasa_mani_puja', () => {
  it('exports the correct core structure', () => {
    expect(puja.core).toEqual({
      sanskrit: {
        children: 'ॐ अमोघ पूजा मणिपद्म वज्रे तथागत विलोकिते समन्त प्रसर हूँ',
      },
      transliteration: {
        children:
          'oṃ amogha pūja maṇipadma vajre tathāgata vilokite samanta prasara hūṃ',
        speech:
          'oum amoga puja mani padma wajre tathagata wiloki-t samanta prasara houm',
      },
    });
  });

  it('builds the sanskrit section correctly', () => {
    expect(puja.sanskrit.title).toBe('अमोघपाश मणि पूजा');

    expect(puja.sanskrit.children).toBe(
      [
        puja.core.sanskrit.children,
        amoghapasaPadmaUsnisa.sanskrit.children,
      ].join(' । '),
    );
  });

  it('builds the transliteration section correctly', () => {
    expect(puja.transliteration.title).toBe('Amoghapāśa Maṇi Pūja');
    expect(puja.transliteration.repetition).toBe(3);

    expect(puja.transliteration.children).toBe(
      [
        puja.core.transliteration.children,
        amoghapasaPadmaUsnisa.transliteration.children,
      ].join(' । '),
    );

    expect(puja.transliteration.speech).toBe(
      [
        puja.core.transliteration.speech,
        amoghapasaPadmaUsnisa.transliteration.speech,
      ].join(', '),
    );
  });

  it('builds the translation section correctly', () => {
    expect(puja.translation.title).toBe('Amoghapāśa Jewels Offering');
  });
});
