/*!
 * All the code that follow is
 * Copyright (c) 2015 - 2024 Richard Huang <rickypc@users.noreply.github.com>.
 * All Rights Reserved. Not for reuse without permission.
 */

/* eslint-disable import/extensions */
import amoghapasaPadmaUsnisa from './_amoghapasa_padma_usnisa.js';

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
