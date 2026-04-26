/*!
 * Copyright © 2015 Richard Huang <rickypc@users.noreply.github.com>
 * All rights reserved.
 */

import sadjaMukta from './_sadja_mukta';

export default {
  path: import.meta.url,
  sanskrit: {
    children: [
      'ॐ धरे धरे बंधरे स्वहा',
      'जय जय सिद्धि सिद्धि फल फल',
      sadjaMukta.sanskrit.children,
      'मम कॉलिंग समन्त',
    ].join(' । '),
    title: 'परिणमन',
  },
  translation: {
    title: 'Dedication',
  },
  transliteration: {
    children: [
      'oṃ dhare dhare bandhare svāhā',
      'jayā jayā siddhi siddhi phala phala',
      sadjaMukta.transliteration.children,
      'mama koling samanta',
    ].join(' । '),
    repetition: 3,
    title: 'Pariṇāmanā',
  },
};
