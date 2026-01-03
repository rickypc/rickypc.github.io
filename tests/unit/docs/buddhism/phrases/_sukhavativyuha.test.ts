/*!
 * Copyright © 2015 Richard Huang <rickypc@users.noreply.github.com>
 * All rights reserved.
 */

import amitabha from '#buddhism/phrases/_amitabha';
import sukhavativyuha from '#buddhism/phrases/_sukhavativyuha';

jest.mock('#buddhism/phrases/_amitabha', () => ({
  default: {
    sanskrit: { children: 'AMITABHA_SANSKRIT' },
    transliteration: {
      children: 'AMITABHA_TRANSLIT',
      speech: 'amitabha speech',
    },
  },
  __esModule: true,
}));

describe('docs.buddhism._sukhavativyuha', () => {
  test('exports the correct core structure', () => {
    expect(sukhavativyuha.core).toHaveProperty('sanskrit.children');
    expect(sukhavativyuha.core).toHaveProperty('transliteration.children');
    expect(sukhavativyuha.core).toHaveProperty('transliteration.speech');
  });

  test('builds the sanskrit section correctly', () => {
    expect(sukhavativyuha.sanskrit.title).toBe('सुखावतीव्यूह धारणी');

    expect(sukhavativyuha.sanskrit.children).toBe(
      [
        sukhavativyuha.core.sanskrit.children,
        amitabha.sanskrit.children,
      ].join(' । '),
    );

    expect(sukhavativyuha.sanskrit.repeat).toEqual({
      condensed: 51,
      roll: 18,
      wheel: 17,
    });
  });

  test('builds the translation section correctly', () => {
    expect(sukhavativyuha.translation.title).toBe('Pure Land Rebirth Dhāraṇī');
  });

  test('builds the transliteration section correctly', () => {
    expect(sukhavativyuha.transliteration.title).toBe('Sukhāvatīvyūha Dhāraṇī');

    expect(sukhavativyuha.transliteration.children).toBe(
      [
        sukhavativyuha.core.transliteration.children,
        amitabha.transliteration.children,
      ].join(' । '),
    );

    expect(sukhavativyuha.transliteration.speech).toBe(
      [
        sukhavativyuha.core.transliteration.speech,
        amitabha.transliteration.speech,
      ].join(', '),
    );
  });

  test('sets the correct language and path', () => {
    expect(sukhavativyuha.lang).toBe('sa-IN');
    expect(sukhavativyuha).toHaveProperty('path');
  });
});
