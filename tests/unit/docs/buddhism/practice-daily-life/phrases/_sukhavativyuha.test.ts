/*!
 * Copyright © 2015 Richard Huang <rickypc@users.noreply.github.com>
 * All rights reserved.
 */

import { mock } from 'bun:test';

mock.module('#buddhism/practice-daily-life/phrases/_amitabha', () => ({
  __esModule: true,
  default: {
    chinese: { children: 'AMITABHA_CHINESE' },
    sanskrit: { children: 'AMITABHA_SANSKRIT' },
    transliteration: { children: 'AMITABHA_TRANSLIT' },
  },
}));

// Bun's mock.module is registered at runtime: import the SUT and its sibling after the
// mock above so the SUT's module-scope read of the sibling sees the mocked value.
const { default: amitabha } = await import('#buddhism/practice-daily-life/phrases/_amitabha');
const { default: sukhavativyuha } = await import(
  '#buddhism/practice-daily-life/phrases/_sukhavativyuha'
);

describe('docs.buddhism._sukhavativyuha', () => {
  test('exports the correct core structure', () => {
    expect(sukhavativyuha.core).toHaveProperty('chinese.children');
    expect(sukhavativyuha.core).toHaveProperty('sanskrit.children');
    expect(sukhavativyuha.core).toHaveProperty('transliteration.children');
  });

  test('builds the sanskrit section correctly', () => {
    expect(sukhavativyuha.sanskrit.title).toBe('सुखावतीव्यूह धारणी');

    expect(sukhavativyuha.sanskrit.children).toBe(
      [sukhavativyuha.core.sanskrit.children, amitabha.sanskrit.children].join(' । '),
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
      [sukhavativyuha.core.transliteration.children, amitabha.transliteration.children].join(' । '),
    );
  });

  test('sets the correct language and path', () => {
    expect(sukhavativyuha.lang).toBe('sa-IN');
    expect(sukhavativyuha).toHaveProperty('path');
  });
});
