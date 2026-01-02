/*!
 * Copyright © 2015 Richard Huang <rickypc@users.noreply.github.com>
 * All rights reserved.
 */

import {
  header,
  instruction,
  main,
  phrase,
} from './_common';

export default {
  pages: [
    {
      title: [
        {
          alignment: 'center',
          fontSize: 28,
          margin: [0, 8, 0, 0],
          text: 'Āryatārā Atiyoga',
        },
        {
          alignment: 'center',
          fontSize: 9,
          style: 'sanskrit',
          text: 'आर्यतारा अतियोग',
        },
      ],
    },
    {
      chapters: ['Maṅgala', 'Viśuddhi'],
      contents: [
        [
          ...phrase('#buddhism/phrases/_mala.ts', ' (recite the prayer, then blow and rub the mālā gently)'),
          ...phrase('#buddhism/phrases/_japa.ts'),
          ...phrase('#buddhism/phrases/_dharma.ts'),
          ...phrase('#buddhism/phrases/_namaskara.ts'),
        ],
        [
          { style: ['section', 'section-set'], text: 'Prāṇāyāma [Breathing]' },
          {
            style: 'instruction',
            ul: [
              instruction([
                '3 rounds of inhaling luminous ',
                { color: 'green', text: 'green' },
                ' air from the left nostril down through the ',
                { color: 'red', text: 'iḍā' },
                ' (',
                { color: 'red', text: 'prajñā' },
                ') nāḍī to the ',
                { color: '#ffd814', text: 'svādhiṣṭhāna' },
                ', hold our breath there for 3 to 5 seconds while tightening and pulling up the anal sphincter, exhaling black smoke through the right nostril while releasing the anal sphincter, ',
                { color: 'green', text: 'green' },
                ' air rises and purifies the ',
                { color: 'gray', text: 'piṅgala' },
                ' (',
                { color: 'gray', text: 'upāya' },
                ') nāḍī.',
              ]),
              instruction([
                '3 rounds of inhaling luminous ',
                { color: 'green', text: 'green' },
                ' air from the right nostril down through the ',
                { color: 'gray', text: 'piṅgala' },
                ' (',
                { color: 'gray', text: 'upāya' },
                ') nāḍī to the ',
                { color: '#ffd814', text: 'svādhiṣṭhāna' },
                ', hold our breath there for 3 to 5 seconds while tightening and pulling up the anal sphincter, exhaling black smoke through the left nostril while releasing the anal sphincter, ',
                { color: 'green', text: 'green' },
                ' air rises and purifies the ',
                { color: 'red', text: 'iḍā' },
                ' (',
                { color: 'red', text: 'prajñā' },
                ') nāḍī.',
              ]),
              instruction([
                '3 rounds of inhaling luminous ',
                { color: 'green', text: 'green' },
                ' air from both nostrils down through the ',
                { color: 'red', text: 'iḍā' },
                '-',
                { color: 'gray', text: 'piṅgala' },
                ' nāḍīs to the ',
                { color: '#ffd814', text: 'svādhiṣṭhāna' },
                ', hold our breath there for 3 to 5 seconds while tightening and pulling up the anal sphincter, exhaling through both nostrils while releasing the anal sphincter, ',
                { color: 'green', text: 'green' },
                ' air rises and purifies the ',
                { color: 'blue', text: 'suṣumṇā' },
                ' (',
                { color: 'blue', text: 'śūnyatā' },
                ') nāḍī, black smoke comes out through the ',
                { color: '#ee82ee', text: 'sahasrāra' },
                ' and dissolves in space.',
              ]),
            ],
          },
        ],
      ],
      images: {
        middle: { alt: 'Prāṇāyāma', path: '#buddhism/img/pranayama.webp' },
      },
      number: '3',
    },
    {
      chapters: ['Trimūla Śaraṇa', 'Mettā-Bhāvanā'],
      contents: [
        [
          ...phrase('#buddhism/phrases/_trimula_sarana.ts'),
        ],
        [
          ...phrase('#buddhism/phrases/_surangama.ts'),
          ...phrase('#buddhism/phrases/_maha_cakra_vajra.ts'),
        ],
      ],
      images: {
        left: { alt: 'Mahā Cakra Vajra', path: '#buddhism/img/maha-cakra-vajra.webp' },
        right: { alt: 'Amoghapāśa', path: '#buddhism/img/amoghapasa.webp' },
      },
      number: '5',
    },
    {
      chapters: ['Mettā-Bhāvanā', 'Āhvāna'],
      contents: [
        [
          ...phrase('#buddhism/phrases/_amoghapasa_mani_puja.ts'),
          ...phrase('#buddhism/phrases/_sapta_atitabuddha_karasaniya.ts'),
        ],
        [
          ...phrase('#buddhism/phrases/_ahvana.ts'),
        ],
      ],
      images: {
        left: { alt: 'Sapta Atītabuddha', path: '#buddhism/img/7-past-buddhas.webp' },
        middle: { alt: 'Āryatārā', path: '#buddhism/img/arya-tara.webp' },
        right: { alt: 'Āryatārā Mudrā', path: '#buddhism/img/mudra-tara.webp' },
      },
      number: '6',
    },
    {
      chapters: ['Viśuddhi'],
      contents: [
        [
          header('Śūnyatā [Primordial State]', ' (bindu at our heart)'),
          ...main('अ॥', 'a॥'),
          header('Pañcabhūta [Five Elements]', [
            ' (bindu at our heart radiates out these infinite lights one by one: ',
            { style: 'sanskrit', text: 'ए' },
            ' ',
            { color: 'blue', style: 'instruction', text: 'blue' },
            ', ',
            { style: 'sanskrit', text: 'यं' },
            ' ',
            { color: 'green', style: 'instruction', text: 'green' },
            ', ',
            { style: 'sanskrit', text: 'रं' },
            ' ',
            { color: 'red', style: 'instruction', text: 'red' },
            ', ',
            { style: 'sanskrit', text: 'बं' },
            ' ',
            { color: 'gray', style: 'instruction', text: 'white' },
            ', ',
            { style: 'sanskrit', text: 'लं' },
            ' ',
            { color: '#ffd814', style: 'instruction', text: 'yellow' },
            ')',
          ]),
          {
            style: 'sanskrit',
            text: [
              'ॐ ',
              { color: 'blue', text: 'ए' },
              'हो शुद्धेशुद्धे । ',
              { color: 'green', text: 'यं' },
              'हो शुद्धेशुद्धे । ',
              { color: 'red', text: 'रं' },
              'हो शुद्धेशुद्धे । ',
              { color: 'gray', text: 'बं' },
              'हो शुद्धेशुद्धे । ',
              { color: '#ffd814', text: 'लं' },
              'हो शुद्धेशुद्धे । ',
              { color: 'blue', text: 'ए' },
              ' ',
              { color: 'green', text: 'यं' },
              ' ',
              { color: 'red', text: 'रं' },
              ' ',
              { color: 'gray', text: 'बं' },
              ' ',
              { color: '#ffd814', text: 'लं' },
              ' शुद्धे शोधनये स्वाहा॥',
            ],
          },
          {
            margin: [0, -3.5, 0, 1.5],
            style: 'phrase',
            text: ['oṃ ', { color: 'blue', text: 'e' }, ' ho śuddhe śuddhe ।'],
          },
          {
            margin: [0, -3.5, 0, 1.5],
            style: 'phrase',
            text: [{ color: 'green', text: 'yaṃ' }, ' ho śuddhe śuddhe ।'],
          },
          {
            margin: [0, -3.5, 0, 1.5],
            style: 'phrase',
            text: [{ color: 'red', text: 'raṃ' }, ' ho śuddhe śuddhe ।'],
          },
          {
            margin: [0, -3.5, 0, 1.5],
            style: 'phrase',
            text: [{ color: 'gray', text: 'vaṃ' }, ' ho śuddhe śuddhe ।'],
          },
          {
            margin: [0, -3.5, 0, 1.5],
            style: 'phrase',
            text: [{ color: '#ffd814', text: 'laṃ' }, ' ho śuddhe śuddhe ।'],
          },
          {
            style: ['phrase', 'phrase-set'],
            text: [
              { color: 'blue', text: 'e' },
              ' ',
              { color: 'green', text: 'yaṃ' },
              ' ',
              { color: 'red', text: 'raṃ' },
              ' ',
              { color: 'gray', text: 'vaṃ' },
              ' ',
              { color: '#ffd814', text: 'laṃ' },
              ' śuddhe śodhanaye svāhā॥',
            ],
          },
        ],
        [
          header('Śūnyatā [Primordial State]', [
            ' (bindu at our heart radiates out infinite rainbow lights to all the dimensions of: ',
            { color: 'gray', style: 'sanskrit', text: 'ॐ' },
            ' dharmakāya, ',
            { color: 'red', style: 'sanskrit', text: 'आः' },
            ' saṃbhogakāya, and ',
            { color: 'blue', style: 'sanskrit', text: 'हूँ' },
            ' nirmāṇakāya. In which there are all the manifestations of enlightened beings. We communicate with them, manifest infinite offerings to them, and accumulate merits through these lights. We will receive their light, wisdom, and empowerment)',
          ]),
          ...main('अ॥', 'a॥'),
        ],
      ],
      images: {
        left: { alt: 'Śūnyatā', path: '#buddhism/img/sunyata.webp' },
        middle: { alt: 'Pañcabhūta', path: '#buddhism/img/5-elements.webp' },
        right: { alt: 'Śūnyatā', path: '#buddhism/img/sunyata-radiate.webp' },
      },
      number: '4',
    },
    '',
    {
      chapters: ['Āryatārā'],
      contents: [
        [
          ...phrase('#buddhism/phrases/_arya_tara.ts', [
            ' (receive their light, wisdom, and empowerment, which dissolves into Noble Tārā above our ',
            { color: '#ee82ee', style: 'instruction', text: 'sahasrāra' },
            ')',
          ], 108, 'Āryatārā Hṛdaya Japa [Noble Tārā Primary Recitation]'),
          ...phrase('#buddhism/phrases/_arya_tara_astaghora_tarani_sutra.ts'),
        ],
        [
          header('Āryatārā Āghoṣa [Invocation]', ' (communicating and invoking Noble Tārā directly)'),
          ...main('तारे॥', 'tāre॥'),
          header('Āryatārā Ātma Utpatti [Self-Generation]', [
            ' (Noble Tārā above our head descends through our ',
            { color: '#ee82ee', style: 'instruction', text: 'sahasrāra' },
            ' and sits inside the open lotus bindu at our heart, radiates infinite Noble Tārā\'s ',
            { color: 'green', style: 'instruction', text: 'green' },
            ' lights and communicates with all enlightened beings to activate and receive their wisdom)',
          ]),
          ...main('ताँ॥', 'tāṃ॥'),
        ],
      ],
      images: {
        left: { alt: 'Hṛdaya', path: '#buddhism/img/recitation-green.webp' },
        right: { alt: 'Ātma Utpatti', path: '#buddhism/img/self-generation.webp' },
      },
      number: '7',
    },
    {
      chapters: ['Āryatārā', 'Sitātārā'],
      contents: [
        [
          ...phrase('#buddhism/phrases/_arya_tara.ts', [
            ' (bindu at our heart radiates infinite Noble Tārā\'s ',
            { color: 'green', style: 'instruction', text: 'green' },
            ' lights and communicates with all enlightened beings to activate and receive their wisdom)',
          ]),
        ],
        [
          ...phrase('#buddhism/phrases/_sita_tara.ts', [
            ' (bindu at our heart radiates infinite White Tārā\'s ',
            { color: 'gray', style: 'instruction', text: 'white' },
            ' lights and communicates with all enlightened beings to activate and receive their wisdom)',
          ]),
        ],
      ],
      images: {
        left: { alt: 'Āryatārā Ātṃa Utpatti', path: '#buddhism/img/self-generation-green.webp' },
        right: { alt: 'Sitātārā Ātṃa Utpatti', path: '#buddhism/img/self-generation-white.webp' },
      },
      number: '9',
    },
    {
      chapters: ['Sukhāvatīvyūha', 'Ekādaśamukhalokeśvara'],
      contents: [
        [
          ...phrase('#buddhism/phrases/_sukhavativyuha.ts'),
        ],
        [
          ...phrase('#buddhism/phrases/_ekadasamukhalokesvara.ts'),
        ],
      ],
      images: {
        left: { alt: 'Amitābha', path: '#buddhism/img/amitabha.webp' },
        right: { alt: 'Ekādaśamukhalokeśvara', path: '#buddhism/img/ekadasamukha.webp' },
      },
      number: '11',
    },
    {
      chapters: ['Mahāmaṇi Vipulavimāna'],
      contents: [
        [
          ...phrase('#buddhism/phrases/_mahamani_vipulavimana.ts'),
        ],
      ],
      images: {
        left: { alt: 'Avalokiteśvara', path: '#buddhism/img/guan-yin.webp' },
        right: { alt: 'Mahāmaṇi Vipulavimāna Maṇḍala', path: '#buddhism/img/mandala-mahamani-vipulavimana.webp' },
      },
      number: '12',
    },
    {
      chapters: ['Vajragītā'],
      contents: [
        [
          ...phrase('#buddhism/phrases/_vajra_gita.ts', ' (remain within the all-pervasive expanse of the mind\'s nature)'),
        ],
      ],
      images: {
        left: { alt: 'Samantabhadra', path: '#buddhism/img/samantabhadra.webp' },
      },
      number: '10',
    },
    {
      chapters: ['Pūjā', 'Raktatārā'],
      contents: [
        [
          header('Trikāya [Body, Speech, Mind]', [
            ' (',
            { color: 'gray', style: 'sanskrit', text: 'ॐ' },
            ' at our glabella,  ',
            { color: 'red', style: 'sanskrit', text: 'आः' },
            ' at our throat,  ',
            { color: 'blue', style: 'sanskrit', text: 'हूँ' },
            ' at our heart)',
          ]),
          ...main([
            { color: 'gray', text: 'ॐ' }, ' ',
            { color: 'red', text: 'आः' }, ' ',
            { color: 'blue', text: 'हूँ' }, '॥',
          ], [
            { color: 'gray', text: 'oṃ' }, ' ',
            { color: 'red', text: 'āḥ' }, ' ',
            { color: 'blue', text: 'hūṃ' }, '॥',
          ], 3),
          ...phrase('#buddhism/phrases/_mandala_puja.ts', ' (maṇḍala arpaṇa mudrā with the sun behind our back and the moon in front of us. Offering self-generated and pure land to all enlightened beings)'),
        ],
        [
          ...phrase('#buddhism/phrases/_rakta_tara.ts', [
            ' (bindu at our heart radiates infinite Red Tārā\'s ',
            { color: 'red', style: 'instruction', text: 'red' },
            ' lights and communicates with all enlightened beings to activate and receive their wisdom)',
          ]),
        ],
      ],
      images: {
        left: { alt: 'Maṇḍala Arpaṇa Mudrā', path: '#buddhism/img/mudra-mandala-arpana.webp' },
        middle: { alt: 'Maṇḍala Arpaṇa Ātma Utpatti', path: '#buddhism/img/self-generation-mandala.webp' },
        right: { alt: 'Raktatārā Ātṃa Utpatti', path: '#buddhism/img/self-generation-red.webp' },
      },
      number: '8',
    },
    {
      chapters: ['Dhanadatārā', 'Prajñāpāramitā Hṛdaya'],
      contents: [
        [
          ...phrase('#buddhism/phrases/_dhanadatara.ts'),
        ],
        [
          ...phrase('#buddhism/phrases/_prajna_paramita.ts'),
        ],
      ],
      images: {
        left: { alt: 'Dhanadatārā', path: '#buddhism/img/dhanadatara.webp' },
        right: { alt: 'Prajñāpāramitā', path: '#buddhism/img/prajna-paramita.webp' },
      },
      number: '13',
    },
    {
      chapters: ['Trimūla Namaskāra'],
      contents: [
        [
          header('Trimūla Namaskāra [Three Roots Homage]'),
          header('Gurus (Buddhas, Dharmakāya) of all times and directions', [
            ' (kneel with añjali mudrā, say ',
            { color: 'gray', style: 'sanskrit', text: 'ॐ' },
            ' at our glabella, say ',
            { color: 'red', style: 'sanskrit', text: 'आः' },
            ' at our throat, say ',
            { color: 'blue', style: 'sanskrit', text: 'हूँ' },
            ' at our heart, then back to our glabella. Bow with palm and head down on the ground to pay homage and then palm up to receive their wisdom and empowerment)',
          ]),
          ...main([
            { color: 'gray', text: 'ॐ' }, ' ',
            { color: 'red', text: 'आः' }, ' ',
            { color: 'blue', text: 'हूँ' }, '॥',
          ], [
            { color: 'gray', text: 'oṃ' }, ' ',
            { color: 'red', text: 'āḥ' }, ' ',
            { color: 'blue', text: 'hūṃ' }, '॥',
          ], 3),
        ],
        [
          header('Devás (Dharmas, Saṃbhogakāya) of all times and directions', [
            ' (kneel with padma mudrā, say ',
            { color: 'gray', style: 'sanskrit', text: 'ॐ' },
            ' at our glabella, say ',
            { color: 'red', style: 'sanskrit', text: 'आः' },
            ' at our throat, say ',
            { color: 'blue', style: 'sanskrit', text: 'हूँ' },
            ' at our heart, then back to our glabella. Bow with palm and head down on the ground to pay homage and then palm up to receive their wisdom and empowerment)',
          ]),
          ...main([
            { color: 'gray', text: 'ॐ' }, ' ',
            { color: 'red', text: 'आः' }, ' ',
            { color: 'blue', text: 'हूँ' }, '॥',
          ], [
            { color: 'gray', text: 'oṃ' }, ' ',
            { color: 'red', text: 'āḥ' }, ' ',
            { color: 'blue', text: 'hūṃ' }, '॥',
          ], 3),
        ],
      ],
      images: {
        left: { alt: 'Añjali Mudrā', path: '#buddhism/img/mudra-anjali.webp' },
        right: { alt: 'Padma Mudrā', path: '#buddhism/img/mudra-padma.webp' },
      },
      number: '15',
    },
    '',
    '',
    {
      chapters: ['Trimūla Namaskāra'],
      contents: [
        [
          header('Ḍākinīs (Saṅghas, Nirmāṇakāya) of all times and directions', [
            ' (kneel with karkaṭa mudrā, say ',
            { color: 'gray', style: 'sanskrit', text: 'ॐ' },
            ' at our glabella, say ',
            { color: 'red', style: 'sanskrit', text: 'आः' },
            ' at our throat, say ',
            { color: 'blue', style: 'sanskrit', text: 'हूँ' },
            ' at our heart, then back to our glabella. Bow with palm and head down on the ground to pay homage and then palm up to receive their wisdom and empowerment)',
          ]),
          ...main([
            { color: 'gray', text: 'ॐ' }, ' ',
            { color: 'red', text: 'आः' }, ' ',
            { color: 'blue', text: 'हूँ' }, '॥',
          ], [
            { color: 'gray', text: 'oṃ' }, ' ',
            { color: 'red', text: 'āḥ' }, ' ',
            { color: 'blue', text: 'hūṃ' }, '॥',
          ], 3),
        ],
        [
          header('All enlightened beings of all times and directions', ' (kneel with uttarabodhi mudrā at our glabella, half bow, then back to our glabella)'),
        ],
      ],
      images: {
        left: { alt: 'Karkaṭa Mudrā', path: '#buddhism/img/mudra-karkata.webp' },
        right: { alt: 'Uttarabodhi Mudrā', path: '#buddhism/img/mudra-uttarabodhi.webp' },
      },
      number: '16',
    },
    {
      chapters: ['Puṇya Pariṇāmanā'],
      contents: [
        [
          header('Puṇya Pariṇāmanā [Merit Dedication]', ' (in our own words)'),
          { margin: [0, 7.5, 0, 7.5], text: '' },
          ...phrase('#buddhism/phrases/_arya_tara_svapratijna_nama.ts'),
        ],
        [
          ...phrase('#buddhism/phrases/_parinamana.ts'),
          ...phrase('#buddhism/phrases/_arya_tara_sataksara.ts'),
        ],
      ],
      number: '14',
    },
  ],
  path: import.meta.url,
  title: 'Āryatārā Atiyoga',
};
