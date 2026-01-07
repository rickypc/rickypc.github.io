/*!
 * Copyright © 2015 Richard Huang <rickypc@users.noreply.github.com>
 * All rights reserved.
 */

import {
  isValidElement,
  type PropsWithChildren,
  type ReactElement,
  type ReactNode,
} from 'react';

const below20: string[] = [
  '', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine',
  'ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen',
  'seventeen', 'eighteen', 'nineteen',
];

const tens: string[] = [
  '', '', 'twenty', 'thirty', 'forty', 'fifty',
  'sixty', 'seventy', 'eighty', 'ninety',
];

const thousands: string[] = [
  '', 'thousand', 'million', 'billion', 'trillion',
  'quadrillion', 'quintillion',
];

export const a11y = (value?: string, rest = {}) => ({ 'aria-label': value, title: value, ...rest });

export const admonitions = {
  print: {
    text: 'The print content is not ready. Scroll to the bottom to load all images, then try again.',
    type: 'warning',
  },
  speech: {
    text: 'Speech synthesis may not work properly. Change or update your browser for a better experience.',
    type: 'warning',
  },
};

export const chunkToWords = (input: number): string => {
  let num = input;
  const response: string[] = [];
  if (num >= 100) {
    response.push(`${below20[Math.floor(num / 100)]} hundred`);
    num %= 100;
    if (num > 0) {
      response.push(' ');
    }
  }
  if (num >= 20) {
    response.push(tens[Math.floor(num / 10)]);
    num %= 10;
    if (num > 0) {
      // eslint-disable-next-line security/detect-object-injection
      response.push(`-${below20[num]}`);
    }
  } else if (num > 0) {
    // eslint-disable-next-line security/detect-object-injection
    response.push(below20[num]);
  }
  return response.join('');
};

export const clsx = (...classes: (boolean | null | number | string | undefined)[]) => classes.filter((cls) => cls && typeof (cls) === 'string').join(' ');

export const context = ({
  description = 'Engineering Leader, Full Stack Developer, Smart Creative, Innovator',
  keywords = [
    'ricky huang',
    'richard huang',
    'full stack developer',
    'professional software engineer',
    'engineering leader',
    'value proposition',
    'technical innovation',
    'technology foundation',
    'business strategy',
    'business objective',
    'software engineering',
    'innovator',
    'smart creative',
    'secure product',
    'high quality',
    'master degree',
  ],
  title = 'Engineering Leader, Full Stack Developer, Smart Creative, Innovator',
} = {}) => JSON.stringify({
  '@context': 'https://schema.org/',
  '@type': 'ProfilePage',
  description,
  headline: 'Ricky Huang Leadership, Full Stack Development, Innovation, and Characteristic',
  keywords: keywords.join(','),
  mainEntity: {
    '@id': 'https://ricky.one#Person',
    '@type': 'Person',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Orange County',
      addressRegion: 'CA',
    },
    alumniOf: [
      {
        '@type': 'CollegeOrUniversity',
        name: 'California State University, Fullerton',
        sameAs: 'https://en.wikipedia.org/wiki/California_State_University,_Fullerton',
      },
      {
        '@type': 'CollegeOrUniversity',
        name: 'Petra Christian University',
        sameAs: 'https://en.wikipedia.org/wiki/Petra_Christian_University',
      },
    ],
    familyName: 'Huang',
    gender: 'Male',
    givenName: 'Richard',
    hasCredential: [
      {
        '@type': 'EducationalOccupationalCredential',
        credentialCategory: 'degree',
        dateCreated: '1997',
        name: 'Bachelor of Engineering in Architecture',
        recognizedBy: {
          '@type': 'Organization',
          name: 'Petra Christian University',
          sameAs: 'https://en.wikipedia.org/wiki/Petra_Christian_University',
        },
      },
      {
        '@type': 'EducationalOccupationalCredential',
        credentialCategory: 'degree',
        dateCreated: '2007',
        name: 'Master of Science in Software Engineering',
        recognizedBy: {
          '@type': 'Organization',
          name: 'California State University, Fullerton',
          sameAs: 'https://en.wikipedia.org/wiki/California_State_University,_Fullerton',
        },
      },
    ],
    honorificSuffix: 'MSE',
    image: 'https://ricky.one/img/self.png',
    jobTitle: 'Engineering Leader, Full Stack Developer, Smart Creative, Innovator',
    name: 'Ricky Huang',
    nationality: {
      '@type': 'Country',
      name: 'USA',
      sameAs: 'https://en.wikipedia.org/wiki/United_States',
    },
    sameAs: [
      'https://hub.docker.com/u/rickypc',
      'https://github.com/rickypc',
      'https://keybase.io/rickypc',
      'https://libraries.io/github/rickypc',
      'https://www.linkedin.com/in/rihuang',
      'https://www.npmjs.com/~rickypc',
    ],
    worksFor: {
      '@type': 'Organization',
      name: 'Experian',
      sameAs: 'https://en.wikipedia.org/wiki/Experian',
    },
  },
  name: title,
  url: 'https://ricky.one',
});

// Before humanizeYears assignment.
export const numberToWords = (input: number): string => {
  let num = input;
  if (num === 0) {
    return 'zero';
  }
  let chunkIndex = 0;
  let words = '';
  while (num > 0) {
    const chunk = num % 1000;
    if (chunk > 0) {
      const chunkWords = chunkToWords(chunk);
      // eslint-disable-next-line security/detect-object-injection
      const suffix = thousands[chunkIndex];
      words = `${chunkWords}${suffix ? ` ${suffix}` : ''}${words ? ` ${words}` : ''}`;
    }
    num = Math.floor(num / 1000);
    chunkIndex += 1;
  }
  return words.trim();
};

export const humanizeYears = (num: number, format = 'exact') => {
  const rounded = num < 10 ? num : Math.floor(num / 10) * 10;
  // After rounded assignment.
  const exact = num === rounded;
  switch (format) {
    case 'decades': {
      const decades = Math.floor(rounded / 10);
      const word = numberToWords(decades);
      return num % 10 === 0 ? `${word} decades` : `more than ${word} decades`;
    }
    case 'over':
      return exact ? `${num} years` : `over ${rounded} years`;
    case 'plus':
      return exact ? `${num} years` : `${rounded}+ years`;
    default:
      return `${num} year${num === 1 ? '' : 's'}`;
  }
};

const key = (
  value?: ReactNode,
  prefix = '',
  prefixSeparator = '-',
  suffix = '',
  suffixSeparator = '',
) => {
  const begin = prefix ? `${prefix}${prefixSeparator}` : '';
  const end = suffix ? `${suffixSeparator}${suffix}` : '';
  return `${begin}${(value as string)?.toLowerCase?.().replace(/\s+/, '-').replace(/\.[^/.]+$/, '')}${end}`;
};

export const oneLine = (text: string) => text.replace(/\n\s*/g, ' ');

const tail = (path: string, keyword: string) => (path?.slice((path?.lastIndexOf(keyword) || -1) + 1) || '');

// After key & tail assignments.
const fileName = (path: string, template?: string) => {
  let response = key(tail(path, '/').replace(/_/g, '-').replace(/^-/, ''));
  if (['condensed', 'thangka', 'wheel'].includes(template || '')) {
    response += `-${template}`;
  }
  return response;
};

export { fileName, key, tail };

/**
 * Recursively extracts all textual content from a ReactNode.
 *
 * This walks through:
 * - strings and numbers (returned directly)
 * - arrays of nodes (flattened and concatenated)
 * - React elements (recursing into their children)
 * @param {ReactNode} node - Any React node, including elements, arrays,
 *   fragments, or primitives.
 * @returns {string} A concatenated string containing all leaf text found
 *   within the node.
 */
export function textContent(node: ReactNode): string {
  if (['number', 'string'].includes(typeof (node))) {
    return String(node);
  }
  if (Array.isArray(node)) {
    return node.map(textContent).join(' ');
  }
  if (isValidElement(node)) {
    return textContent((node as ReactElement<PropsWithChildren>).props.children);
  }
  return '';
}
