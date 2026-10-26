/*!
 * Copyright © 2015 Richard Huang <rickypc@users.noreply.github.com>
 * All rights reserved.
 */

import { isValidElement, type PropsWithChildren, type ReactElement, type ReactNode } from 'react';

const below20: string[] = [
  '',
  'one',
  'two',
  'three',
  'four',
  'five',
  'six',
  'seven',
  'eight',
  'nine',
  'ten',
  'eleven',
  'twelve',
  'thirteen',
  'fourteen',
  'fifteen',
  'sixteen',
  'seventeen',
  'eighteen',
  'nineteen',
];

const DEFAULT_DESCRIPTION = 'Engineering Leader, Full Stack Developer, Smart Creative, Innovator';

const DEFAULT_KEYWORDS: string[] = [
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
];

const DEFAULT_TITLE = 'Engineering Leader, Full Stack Developer, Smart Creative, Innovator';

export const PERSON_NODE = {
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
};

const PERSON_REF = { '@id': PERSON_NODE['@id'] };

const REVIEW_RATING = { '@type': 'Rating', bestRating: 5, ratingValue: 5 };

const tens: string[] = [
  '',
  '',
  'twenty',
  'thirty',
  'forty',
  'fifty',
  'sixty',
  'seventy',
  'eighty',
  'ninety',
];

const thousands: string[] = [
  '',
  'thousand',
  'million',
  'billion',
  'trillion',
  'quadrillion',
  'quintillion',
];

export type ArticleDates = Record<string, { dateModified: string; datePublished: string }>;

export type Faq = { items: FaqItems[]; slug: string };

export type FaqItems = { answer: ReactNode; question: ReactNode };

export type NodeFacts = {
  dateModified?: string;
  datePublished?: string;
  description?: string;
  keywords?: string[];
  title?: string;
  url?: string;
};

export type SchemaType =
  | 'BlogPosting'
  | 'CollectionPage'
  | 'FAQPage'
  | 'Person'
  | 'ProfilePage'
  | 'Review';

export const a11y = (value?: string, rest = {}) => ({ 'aria-label': value, title: value, ...rest });

export const articleDatesFor = (
  dates: ArticleDates | undefined,
  permalink: string,
): ArticleDates[string] | undefined =>
  dates?.[permalink as string] ?? dates?.[`${permalink}/`] ?? dates?.[permalink.replace(/\/$/, '')];

export const articleUrl = (siteUrl: string, permalink: string): string =>
  `${siteUrl}${permalink.endsWith('/') ? permalink : `${permalink}/`}`;

export const blogPostingNode = ({
  dateModified,
  datePublished,
  description = DEFAULT_DESCRIPTION,
  keywords = DEFAULT_KEYWORDS,
  title = DEFAULT_TITLE,
  url = 'https://ricky.one',
}: NodeFacts = {}) => ({
  '@id': `${url}#article`,
  '@type': 'BlogPosting',
  author: PERSON_REF,
  dateModified,
  datePublished,
  description,
  headline: title,
  image: PERSON_NODE.image,
  inLanguage: 'en-US',
  keywords: keywords.join(','),
  mainEntityOfPage: { '@id': url, '@type': 'WebPage' },
  name: title,
  publisher: PERSON_REF,
  url,
});

export const breadcrumbListNode = (
  breadcrumbs: { href?: string; label: string }[],
  siteUrl: string,
) => ({
  '@type': 'BreadcrumbList',
  itemListElement: breadcrumbs
    .filter((breadcrumb) => breadcrumb.href)
    .map((breadcrumb, index) => ({
      '@type': 'ListItem',
      item: `${siteUrl}${breadcrumb.href}`,
      name: breadcrumb.label,
      position: index + 1,
    })),
});

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
      response.push(`-${below20[num as number]}`);
    }
  } else if (num > 0) {
    response.push(below20[num as number]);
  }
  return response.join('');
};

export const clsx = (...classes: (boolean | null | number | string | undefined)[]) =>
  classes.filter((cls) => cls && typeof cls === 'string').join(' ');

export const fetchAsJson = async (
  ...args: Parameters<typeof fetch>
): Promise<Response | Record<string, unknown>> => {
  const result = await fetch(...args);
  try {
    return await result.json();
  } catch {
    return {};
  }
};

export const graphFor = (nodes: object[]) =>
  JSON.stringify({ '@context': 'https://schema.org/', '@graph': nodes });

const key = (
  value?: ReactNode,
  prefix = '',
  prefixSeparator = '-',
  suffix = '',
  suffixSeparator = '',
) => {
  const begin = prefix ? `${prefix}${prefixSeparator}` : '';
  const end = suffix ? `${suffixSeparator}${suffix}` : '';
  if (typeof value !== 'string' || !value.normalize) {
    return `${begin}${end}`;
  }
  const str = (value as string)
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase?.()
    .replace(/\s+/, '-')
    .replace(/\.[^/.]+$/, '');
  return `${begin}${str}${end}`;
};

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
      const suffix = thousands[chunkIndex as number];
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

export const oneLine = (text: string) => text.replace(/\n\s*/g, ' ');

export const profilePageNode = ({
  description = DEFAULT_DESCRIPTION,
  keywords = DEFAULT_KEYWORDS,
  title = DEFAULT_TITLE,
}: NodeFacts = {}) => ({
  '@type': 'ProfilePage',
  description,
  headline: 'Ricky Huang Leadership, Full Stack Development, Innovation, and Characteristic',
  keywords: keywords.join(','),
  mainEntity: PERSON_REF,
  name: title,
  url: 'https://ricky.one',
});

const tail = (path: string, keyword: string) =>
  path?.slice((path?.lastIndexOf(keyword) || -1) + 1) || '';

// After profilePageNode assignment.
export const collectionPageNode = (facts: NodeFacts = {}) => ({
  ...profilePageNode(facts),
  '@type': 'CollectionPage',
});

// After key & tail assignments.
const fileName = (path: string, template?: string) => {
  let response = key(tail(path, '/').replace(/_/g, '-').replace(/^-/, ''));
  if (['condensed', 'thangka', 'wheel'].includes(template || '')) {
    response += `-${template}`;
  }
  return response;
};

export { fileName, key, tail };

export const reviewNode = (facts: NodeFacts = {}) => ({
  ...profilePageNode(facts),
  '@type': 'Review',
  author: PERSON_REF,
  reviewRating: REVIEW_RATING,
});

/**
 * Recursively extracts all textual content from a ReactNode.
 *
 * This walks through:
 * - strings and numbers (returned directly)
 * - arrays of nodes (flattened and concatenated)
 * - React elements (recursing into their children)
 * @param {ReactNode} node - Any React node, including elements, arrays, fragments, or primitives.
 * @returns {string} A concatenated string containing all leaf text found within the node, with
 *   whitespace runs collapsed to single spaces and the edges trimmed.
 */
export function textContent(node: ReactNode): string {
  if (['number', 'string'].includes(typeof node)) {
    return String(node);
  }
  if (Array.isArray(node)) {
    return node.map(textContent).join(' ').replace(/\s+/g, ' ').trim();
  }
  if (isValidElement(node)) {
    return textContent((node as ReactElement<PropsWithChildren>).props.children);
  }
  return '';
}

// After textContent assignment.
export const faqEntries = (faq: Faq) => {
  const url = `https://ricky.one/${faq.slug}`;
  return faq.items
    .filter((entry): entry is { answer: string; question: string } => {
      const q = textContent(entry.question).trim();
      const a = textContent(entry.answer).trim();
      return q.length > 0 && a.length > 0;
    })
    .map((entry, index) => ({
      '@id': `${url}#faq-${index + 1}`,
      '@type': 'Question',
      acceptedAnswer: {
        '@id': `${url}#faq-${index + 1}-answer`,
        '@type': 'Answer',
        inLanguage: 'en-US',
        text: textContent(entry.answer).replace(/\s+/g, ' ').trim(),
      },
      inLanguage: 'en-US',
      name: textContent(entry.question).replace(/\s+/g, ' ').trim(),
    }));
};

export const faqPageNode = (faq: Faq) => ({
  '@id': `https://ricky.one/${faq.slug}#faq`,
  '@type': 'FAQPage',
  inLanguage: 'en-US',
  mainEntity: faqEntries(faq),
  url: `https://ricky.one/${faq.slug}`,
});
