/*!
 * Copyright © 2015 Richard Huang <rickypc@users.noreply.github.com>
 * All rights reserved.
 */

import amoghapasaPadmaUsnisa from './_amoghapasa_padma_usnisa';

const core = {
  sanskrit: {
    children: 'ॐ अमोघ पूजा मणिपद्म वज्रे तथागत विलोकिते समन्त प्रसर हूँ',
  },
  transliteration: {
    children: 'oṃ amogha pūja maṇipadma vajre tathāgata vilokite samanta prasara hūṃ',
  },
};

export default {
  core,
  path: import.meta.url,
  sanskrit: {
    children: [core.sanskrit.children, amoghapasaPadmaUsnisa.sanskrit.children].join(' । '),
    title: 'अमोघपाश मणि पूजा',
  },
  translation: {
    title: 'Amoghapāśa Jewels Offering',
  },
  transliteration: {
    children: [core.transliteration.children, amoghapasaPadmaUsnisa.transliteration.children].join(' । '),
    repetition: 3,
    title: 'Amoghapāśa Maṇi Pūja',
  },
};
