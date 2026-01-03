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
    speech: 'oum amoga puja mani padma wajre tathagata wiloki-t samanta prasara houm',
  },
};

export default {
  core,
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
    speech: [core.transliteration.speech, amoghapasaPadmaUsnisa.transliteration.speech].join(', '),
    title: 'Amoghapāśa Maṇi Pūja',
  },
};
