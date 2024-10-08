/*!
 * All the code that follow is
 * Copyright (c) 2015 - 2024 Richard Huang <rickypc@users.noreply.github.com>.
 * All Rights Reserved. Not for reuse without permission.
 */

export default {
  path: new URL('', import.meta.url).pathname,
  sanskrit: {
    children: 'अ आ शा स म ह',
    title: 'षड्जः मुक्त',
  },
  tibetan: {
    children: 'ཨ་ཨཱ་ཤཱ་ས་མ་ཧ',
    repeat: {
      roll: 228,
      wheel: 220,
    },
    title: 'གྲོལ་བ་དྲུག་ལྡན',
  },
  transliteration: {
    children: 'a āḥ śa sa ma ha',
    speech: 'a ah sha sa ma ha',
    // Six Spaces of Samantabhadra.
    title: 'Ṣaḍja Mukta',
  },
};
