/*!
 * Copyright © 2015 Richard Huang <rickypc@users.noreply.github.com>
 * All rights reserved.
 */

const pronounces = {
  // Order Matters™.
  'bha ': 'ba, ',
  bhai: 'bai',
  bha: 'ba-',
  bhin: 'bin',
  'ba-se': 'base',
  chin: 'cin',
  dha: 'da',
  ddhe: 'd-e',
  'ema ': 'e-ma ',
  gga: 'ga',
  hum: 'hom',
  jayawa: 'jaya-wa',
  jje: 'je',
  jjha: 'ja',
  jya: 'ya',
  jye: 'y-e',
  kha: 'ka',
  khe: 'k-e',
  'le ': 'l-e ',
  'mbe ': 'mb-e ',
  me: 'm-e',
  ' m-e ': ' me ',
  ' m-e,': ' me,',
  'm-edh': 'medh',
  nno: 'nyo',
  'pe ': 'p-e ',
  phat: 'patt',
  '[say the nam-e]': '[[ sˈeɪ ðə nˈeɪm ]]',
  'ra h': 'ra, h',
  re: 'r-e',
  se: 's-e',
  'sr-es': 'sres',
  'sr-ey': 'srey',
  'ta h': 'ta, h',
  te: 't-e',
  'krt-e': 'krte',
};

const transliterations = {
  // Order Matters™.
  ' ।': ',',
  '।': ',',
  '॥': ',',
  '\n': ' ',
  á: 'a',
  ā: 'a',
  ḍ: 'd',
  é: 'e',
  ē: 'e',
  ḥ: 'h',
  ī: 'i',
  ḷ: 'l',
  ṁ: 'm',
  ṃ: 'm',
  ñ: 'n',
  ṅ: 'n',
  ṇ: 'n',
  ö: 'o',
  ō: 'o',
  ṛ: 'r',
  ś: 's',
  ṣ: 's',
  ṭ: 't',
  ū: 'u',
  v: 'w',
};

/**
 * Prepares text for TTS by transliterating and adjusting pronunciation.
 * @param {string} value - Raw input text.
 * @returns {string} Normalized text for TTS.
 */
export default function utterance(value: string) {
  let response = value.toLowerCase();

  Object.entries(transliterations).forEach(([key, val]) => {
    response = response.replaceAll(key, val);
  });

  Object.entries(pronounces).forEach(([key, val]) => {
    response = response.replaceAll(key, val);
  });

  return response;
}
