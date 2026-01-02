/*!
 * Copyright © 2015 Richard Huang <rickypc@users.noreply.github.com>
 * All rights reserved.
 */

import { type LayoutProps } from '@site/src/components/common/Layout';
import { oneLine } from '@site/src/data/common';
import { type PreambleProps } from '@site/src/components/common/Preamble';

export type StoryProps = {
  affiliation: {
    children: string;
    href: string;
    translate?: 'no' | 'yes';
  };
  author: {
    children: string;
    href: string;
    translate?: 'no' | 'yes';
  };
  content: string;
  header: {
    children: string;
    href?: string;
  };
  overview: string;
  prefix: string;
  title: {
    children: string;
    href?: string;
  };
};

export const layout: LayoutProps = {
  description: oneLine(`Stories and lessons from Ricky Huang's journey as a
    full stack developer and leader - highlighting impact, growth,
    collaboration, and trust.`),
  keywords: [
    'developer testimonials',
    'engineering leadership stories',
    'full stack developer experiences',
    'team success through technology',
    'software development lessons',
    'client feedback',
    'project impact',
    'engineering collaboration',
    'problem solving',
    'technical leadership',
    'Ricky portfolio',
    'developer reputation',
    'trusted engineer',
    'stories from tech career',
    'ricky huang',
  ],
  /*
  metadatas: [
    <link
      as="font"
      fetchPriority="high"
      // eslint-disable-next-line global-require
      href={require('@site/src/font/yesevaone/OpNJno4ck8vc-xYpwWWxli1VWzfAw0Y.woff2').default}
      key={0}
      rel="preload"
      type="font/woff2"
    />,
  ],
  */
  title: 'Stories, Testimonials & Lessons from the Journey',
};

export const preamble: PreambleProps = {
  description: oneLine(`Real-world experiences, lessons learned, and
    reflections from my journey as a modern multidisciplinary technologist.
    These stories highlight how I've helped teams and projects thrive - through
    technology, mentorship, personal growth, and the trust formed along the way.`),
  title: 'Stories',
};

export const stories: StoryProps[] = [
  {
    affiliation: {
      children: 'Headhigh Creative',
      href: 'https://headhighcreative.com',
      translate: 'no',
    },
    author: {
      children: 'Esteban Chavez',
      href: 'https://www.linkedin.com/in/estebanlorenzochavez',
      translate: 'no',
    },
    content: oneLine(`Ricky was a godsend on our projects! He delivered clean,
      functional, expertly crafted code for multiple development projects for
      my company. He always approached his projects as an invested partner
      rather than just a contractor. He is an excellent problem solver with a
      proficient work ethic and a pleasurable attitude. Thank you Ricky for
      everything that you helped us with!`),
    header: { children: 'The Invested Partner', href: undefined },
    overview: 'An invested partner - delivers clean, expertly crafted solutions.',
    prefix: 'invested-partner',
    title: {
      children: 'Creative Director, Chief Strategist',
      href: 'https://en.wikipedia.org/wiki/Strategist',
    },
  },
  {
    affiliation: {
      children: 'Marigold',
      href: 'https://meetmarigold.com',
      translate: 'no',
    },
    author: {
      children: 'Phillip Lin',
      href: 'https://www.linkedin.com/in/linphillip',
      translate: 'no',
    },
    content: oneLine(`The consummate programmer, Ricky knows just about
      everything there is to know about development. Although his expertise is
      broad, he proves that one can really be the master of all trades. I
      worked with Ricky on several projects, and he surpassed my gradually
      increased expectations each time. Whether it's client- side, server -
      side, or every - side, he really can accomplish it all. Most importantly,
      Ricky is one of the nicest and most kind - hearted people you will meet
      in your lifetime. To any prospective employers for Ricky: it will truly
      be your loss if you don't hire him!`),
    header: { children: 'The Master of Many Trades', href: undefined },
    overview: oneLine(`A master of many trades - client-side, server-side,
    every-side - and one of the kindest people you'll meet.`),
    prefix: 'master-of-many-trades',
    title: { children: 'Director, Technical Services', href: undefined },
  },
  {
    affiliation: {
      children: 'Varsity Tutors',
      href: 'https://www.varsitytutors.com',
      translate: 'no',
    },
    author: {
      children: 'Vlad Podgurschi',
      href: 'https://www.linkedin.com/in/vlad-podgurschi-a4a27414',
      translate: 'no',
    },
    content: oneLine(`The first time I worked together with Ricky, it was on an
      important and complex project, which was beginning to fall seriously
      behind schedule. He literally rescued the project by taking charge of the
      frontend component and applying his amazing skills to deliver a clean,
      flexible, and timely implementation. Ricky is a dedicated professional,
      constantly working towards improving his skills and keeping up-to-date on
      the technologies he loves and specializes in. (And as we talk about the
      field of modern frontend web development, this is not an easy thing to
      do!) Ricky is the type of coworker you can trust with a project, and be
      sure that it gets done well and on time. I would be delighted to
      collaborate again with Ricky on any project, and I wholeheartedly
      recommend him for any software development work he chooses to get
      involved with.`),
    header: {
      children: 'The Problem-Solving Savior',
      href: 'https://en.wikipedia.org/wiki/Savior',
    },
    overview: oneLine(`A problem-solving savior who rescues complex projects
      with clean, flexible, timely implementations.`),
    prefix: 'problem-solving-savior',
    title: {
      children: 'Senior Data Engineer',
      href: 'https://en.wikipedia.org/wiki/Data_engineering',
    },
  },
  {
    affiliation: {
      children: 'Nexus6',
      href: 'https://www.n6.com.au',
      translate: 'no',
    },
    author: {
      children: 'Christos Kakris',
      href: 'https://www.linkedin.com/in/kakris',
      translate: 'no',
    },
    content: oneLine(`I worked with Ricky for over a year on two separate
      projects, one of which he led. During that time I was impressed with the
      depth of his knowledge (in multiple programming languages, frameworks,
      and environments), his thoroughness, attention to detail, dedication, and
      the hard work he put into both projects. I would not hesitate to
      recommend him and would enjoy working with him again.`),
    header: {
      children: 'The Versatile Polymath',
      href: 'https://en.wikipedia.org/wiki/Polymath',
    },
    overview: oneLine(`A versatile polymath with deep knowledge, attention to
      detail, and unwavering dedication.`),
    prefix: 'versatile-polymath',
    title: {
      children: 'Senior Developer',
      href: 'https://en.wikipedia.org/wiki/Software_development',
    },
  },
];

export const storyMap = Object.fromEntries(stories.map((item) => [item.prefix, item]));
