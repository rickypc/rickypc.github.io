/*!
 * All the code that follow is
 * Copyright (c) 2015 - 2024 Richard Huang <rickypc@users.noreply.github.com>.
 * All Rights Reserved. Not for reuse without permission.
 */

export const a11y = (value, rest = {}) => ({ 'aria-label': value, title: value, ...rest });

export const admonitions = {
  print: {
    text: 'The print content is not ready. Please try again.',
    type: 'warning',
  },
};

export function clsx(...classes) {
  return classes
    .filter((cls) => cls && typeof (cls) === 'string')
    .join(' ');
}

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
  '@type': 'WebSite',
  description,
  keywords: keywords.join(','),
  logo: 'https://ricky.one/img/home/self.png',
  mainEntity: {
    '@type': 'Person',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Orange County',
      addressRegion: 'CA',
    },
    alumniOf: 'California State University, Fullerton',
    gender: 'male',
    image: 'https://ricky.one/img/home/self.png',
    jobTitle: 'Engineering Leader, Full Stack Developer, Smart Creative, Innovator',
    name: 'Ricky Huang',
    nationality: 'Southeast Asian American',
    sameAs: [
      'https://hub.docker.com/u/rickypc',
      'https://github.com/rickypc',
      'https://keybase.io/rickypc',
      'https://libraries.io/github/rickypc',
      'https://www.linkedin.com/in/rihuang',
      'https://www.npmjs.com/~rickypc',
    ],
  },
  name: title,
  url: 'https://ricky.one/',
});

export const key = (value, prefix = '') => `${prefix ? `${prefix}-` : ''}${value.toLowerCase().replace(/\s+/, '-').replace(/\.[^/.]+$/, '')}`;
