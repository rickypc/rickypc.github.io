/*!
 * Copyright © 2015 Richard Huang <rickypc@users.noreply.github.com>
 * All rights reserved.
 */

import pratitya from '#buddhism/practical-daily-practice/phrases/_pratityasamutpada';

describe('docs.buddhism._pratitya_samutpada', () => {
  test('exports the correct core structure', () => {
    expect(pratitya.core).toHaveProperty('pali.children');
    expect(pratitya.core).toHaveProperty('pali.sinhala.children');
    expect(pratitya.core).toHaveProperty('sanskrit.children');
    expect(pratitya.core).toHaveProperty('sanskrit.siddham.children');
    expect(pratitya.core).toHaveProperty('tibetan.children');
    expect(pratitya.core).toHaveProperty('transliteration.children');
    expect(pratitya.core).toHaveProperty('transliteration.speech');
  });

  test('builds the pali section correctly', () => {
    expect(pratitya.pali.title).toBe('Paṭiccasamuppāda Gāthā');

    expect(pratitya.pali.children).toBe(
      [
        pratitya.core.pali.children,
        'aññāṇaṁ cīyate kammaṁ jananaṁ kammakāraṇaṁ',
        'ñāṇaṁ na cīyate kammaṁ kammābhāvaṁ na jāyate',
      ].join(' । '),
    );

    expect(pratitya.pali.sinhala.children).toBe(
      [
        pratitya.core.pali.sinhala.children,
        'අඥානාච්චීයතේ කර්ම ජන්මනඃ කර්ම කාරණම්',
        'ඥානාන්නචීයතේ කර්ම කර්මාභාවාන්න ජායතේ',
      ].join(' . '),
    );

    expect(pratitya.pali.sinhala.title).toBe('පටිච්චසමුප්පාද ගාථා');
  });

  test('builds the sanskrit section correctly', () => {
    expect(pratitya.sanskrit.title).toBe('प्रतीत्यसमुत्पाद गाथा');

    expect(pratitya.sanskrit.children).toBe(
      [
        pratitya.core.sanskrit.children,
        'अज्ञानाच्चीयते कर्म जन्मनः कर्म कारणम्',
        'ज्ञानान्नचीयते कर्म कर्माभावान्न जायते',
      ].join(' । '),
    );

    expect(pratitya.sanskrit.siddham.children).toBe(
      [
        pratitya.core.sanskrit.siddham.children,
        '𑖀𑖕𑖿𑖗𑖯𑖡𑖯𑖓𑖿𑖓𑖱𑖧𑖝𑖸 𑖎𑖨𑖿𑖦 𑖕𑖡𑖿𑖦𑖡𑖾 𑖎𑖨𑖿𑖦 𑖎𑖯𑖨𑖜𑖦𑖿',
        '𑖕𑖿𑖗𑖯𑖡𑖯𑖡𑖿𑖡𑖓𑖱𑖧𑖝𑖸 𑖎𑖨𑖿𑖦 𑖎𑖨𑖿𑖦𑖯𑖥𑖯𑖪𑖯𑖡𑖿𑖡 𑖕𑖯𑖧𑖝𑖸',
      ].join(' 𑗂 '),
    );

    expect(pratitya.sanskrit.siddham.title).toBe('𑖢𑖿𑖨𑖝𑖱𑖝𑖿𑖧𑖭𑖦𑖲𑖝𑖿𑖢𑖯𑖟 𑖐𑖯𑖞𑖯');
  });

  test('builds the tibetan section correctly', () => {
    expect(pratitya.tibetan.children).toBe(pratitya.core.tibetan.children);

    expect(pratitya.tibetan.repeat).toEqual({
      condensed: 129,
      roll: 46,
      wheel: 44,
    });

    expect(pratitya.tibetan.title).toBe('རྟེན་ཅིང་འབྲེལ་བར་འབྱུང་བའི་ཚིགས་སུ་བཅད་པ།');
  });

  test('builds the translation section correctly', () => {
    expect(pratitya.translation.title).toBe('Dependent Origination');
  });

  test('builds the transliteration section correctly', () => {
    expect(pratitya.transliteration.title).toBe('Pratītyasamutpāda Gāthā');
    expect(pratitya.transliteration.repetition).toBe(7);

    expect(pratitya.transliteration.children).toBe(
      [
        pratitya.core.transliteration.children,
        'ajñānāc cīyate karma janmanaḥ karma kāraṇam',
        'jñānān na cīyate karma karmābhāvān na jāyate',
      ].join(' । '),
    );

    expect(pratitya.transliteration.speech).toBe(
      [
        pratitya.core.transliteration.speech,
        'ajnanac ciya-t karma, jan-manah karma karanam',
        'jnanan na ciya-t karma, karmabawan na jayate',
      ].join(', '),
    );
  });

  test('includes the chinese title', () => {
    expect(pratitya.chinese.title).toBe('緣起經');
  });
});
