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
