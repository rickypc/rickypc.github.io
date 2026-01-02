/*!
 * Copyright © 2015 Richard Huang <rickypc@users.noreply.github.com>
 * All rights reserved.
 */

import darsanaMukta from '#buddhism/phrases/_darsana_mukta';
import mahamani from '#buddhism/phrases/_mahamani_vipulavimana';

jest.mock('#buddhism/phrases/_darsana_mukta', () => ({
  default: {
    sanskrit: { children: 'DARSANA_SANSKRIT' },
    tibetan: { children: 'DARSANA_TIBETAN' },
    transliteration: {
      children: 'DARSANA_TRANSLIT',
      speech: 'darsana speech',
    },
  },
  __esModule: true,
}));

describe('docs.buddhism._mahamani_vipulavimana', () => {
  it('exports the correct core structure', () => {
    expect(mahamani.core).toHaveProperty('sanskrit.children');
    expect(mahamani.core).toHaveProperty('tibetan.children');
    expect(mahamani.core).toHaveProperty('transliteration.children');
    expect(mahamani.core).toHaveProperty('transliteration.speech');
  });

  it('builds the sanskrit section correctly', () => {
    expect(mahamani.sanskrit.title).toBe('महामणि विपुलविमान');

    expect(mahamani.sanskrit.children).toBe(
      [
        mahamani.core.sanskrit.children,
        darsanaMukta.sanskrit.children,
      ].join(' । '),
    );
  });

  it('builds the tibetan section correctly', () => {
    expect(mahamani.tibetan.title).toBe('ནོར་བུ་ཆེན་པོ་རྒྱས་པའི་གཞལ་མེད་ཁང');

    expect(mahamani.tibetan.children).toBe(
      [
        mahamani.core.tibetan.children,
        darsanaMukta.tibetan.children,
      ].join('། '),
    );

    expect(mahamani.tibetan.repeat).toEqual({
      condensed: 39,
      roll: 14,
      wheel: 13,
    });
  });

  it('builds the translation section correctly', () => {
    expect(mahamani.translation.title).toBe('Great Jewel Celestial Palace');
  });

  it('builds the transliteration section correctly', () => {
    expect(mahamani.transliteration.title).toBe('Mahāmaṇi Vipulavimāna');
    expect(mahamani.transliteration.repetition).toBe(3);

    expect(mahamani.transliteration.children).toBe(
      [
        mahamani.core.transliteration.children,
        darsanaMukta.transliteration.children,
      ].join(' । '),
    );

    expect(mahamani.transliteration.speech).toBe(
      [
        mahamani.core.transliteration.speech,
        darsanaMukta.transliteration.speech,
      ].join(', '),
    );
  });
});
