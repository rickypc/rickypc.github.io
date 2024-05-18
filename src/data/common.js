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
  speech: {
    text: 'Change or update your browser for a better experience.',
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
        '@type': 'OrganizationRole',
        alumniOf: {
          '@type': 'CollegeOrUniversity',
          name: 'California State University, Fullerton',
          sameAs: 'https://en.wikipedia.org/wiki/California_State_University,_Fullerton',
        },
        startDate: '2007',
      },
      {
        '@type': 'OrganizationRole',
        alumniOf: {
          '@type': 'CollegeOrUniversity',
          name: 'Petra Christian University',
          sameAs: 'https://en.wikipedia.org/wiki/Petra_Christian_University',
        },
        startDate: '1997',
      },
    ],
    familyName: 'Huang',
    gender: 'Male',
    givenName: 'Richard',
    honorificSuffix: 'MSE',
    image: 'https://ricky.one/img/home/self.png',
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

export const key = (value, prefix = '') => `${prefix ? `${prefix}-` : ''}${value.toLowerCase().replace(/\s+/, '-').replace(/\.[^/.]+$/, '')}`;
