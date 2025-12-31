/*!
 * All the code that follow is
 * Copyright (c) 2015 - 2025 Richard Huang <rickypc@users.noreply.github.com>.
 * All Rights Reserved. Not for reuse without permission.
 */

/* eslint-disable global-require */

import { type LayoutProps } from '@site/src/components/common/Layout';
import { oneLine } from '@site/src/data/common';
import { type PictureInfo } from '@site/src/components/common/Image';
import { type PreambleProps } from '@site/src/components/common/Preamble';

export type TimelineProps = {
  affiliation: {
    children: string;
    href?: string;
    translate?: 'no' | 'yes';
  };
  className?: string;
  description: string;
  picture: PictureInfo;
  prefix: string;
  title: {
    children: string;
    href?: string;
  };
  year: string;
};

export const layout: LayoutProps = {
  description: oneLine(`Milestones in Ricky Huang's journey - from architecture
    to engineering, startups to global impact, and everything in between.`),
  keywords: [
    'career timeline',
    'software engineering milestones',
    'education journey',
    'Experian awards',
    'AirIQ',
    'Aircept',
    'RazorGator',
    'Petra Christian University',
    'California State University Fullerton',
    'Stanford University',
    'architecture to software',
    'tech career growth',
    'engineering promotions',
    'independent professional',
    'portfolio timeline',
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
  title: 'Timeline - Career, Education & Technical Milestones',
};

export const preamble: PreambleProps = {
  description: oneLine(`A curated journey through key milestones in my career,
    education, and technical growth. Each moment reflects a step forward -
    building expertise, shaping ideas, and driving impact across industries and
    technologies.`),
  title: 'Timeline',
};

export const timelines: TimelineProps[] = [
  {
    affiliation: {
      children: 'Experian Consumer Services',
      href: 'https://www.experian.com/corporate/experian-interactive',
      translate: 'no',
    },
    description: oneLine(`Accepted the Senior Software Engineer role at
      Experian Consumer Services to sharpen technical leadership and expand
      entrepreneurial range. Earned multiple recognitions, including the
      Experian Platinum Aspire, EMF Hero - Above and Beyond, and recurring
      Experian Spot - Excellence in Action awards.`),
    picture: {
      avif: require('@site/src/pages/timeline/img/experian.avif').default,
      fallback: require('@site/src/pages/timeline/img/experian.jpg'),
      webp: require('@site/src/pages/timeline/img/experian.webp').default,
    },
    prefix: 'experian',
    title: {
      children: 'Principal-Level Senior Software Engineer',
      href: 'https://en.wikipedia.org/wiki/Software_engineering',
    },
    year: '2017 - Present',
  },
  {
    affiliation: {
      children: 'Stanford University',
      href: 'https://www.stanford.edu',
      translate: 'no',
    },
    description: oneLine(`Completed advanced computer science coursework from
      Stanford University, including Automata, Machine Learning, and Mining
      Massive Datasets. Strengthened theoretical foundations in computation,
      gained practical experience with modern ML techniques, and developed
      proficiency in large-scale data processing. Earned a Certificate of
      Completion with Distinction in Mining Massive Datasets for exceptional
      performance.`),
    picture: {
      avif: require('@site/src/pages/timeline/img/stanford.avif').default,
      fallback: require('@site/src/pages/timeline/img/stanford.jpg'),
      webp: require('@site/src/pages/timeline/img/stanford.webp').default,
    },
    prefix: 'stanford',
    title: {
      children: 'Advanced Studies, Data Science',
      href: 'https://online.stanford.edu/explore',
    },
    year: '2015',
  },
  {
    affiliation: {
      children: 'Experian Consumer Services',
      href: 'https://www.experian.com/corporate/experian-interactive',
      translate: 'no',
    },
    description: oneLine(`Accepted the Automation Engineer position at Experian
      Consumer Services to deepen technical versatility and broaden engineering
      expertise. Later promoted to Senior Automation Engineer, continuing to
      drive innovation and efficiency across automated systems.`),
    picture: {
      avif: require('@site/src/pages/timeline/img/experian.avif').default,
      fallback: require('@site/src/pages/timeline/img/experian.jpg'),
      webp: require('@site/src/pages/timeline/img/experian.webp').default,
    },
    prefix: 'experian-automation',
    title: {
      children: 'Senior Automation Engineer',
      href: 'https://en.wikipedia.org/wiki/Automation_engineering',
    },
    year: '2013 - 2017',
  },
  {
    affiliation: {
      children: 'California State University, Fullerton',
      href: 'https://www.fullerton.edu',
      translate: 'no',
    },
    description: oneLine(`Graduated from California State University, Fullerton
      with a Master's in Software Engineering. Gained expertise in delivering
      mission-ready, software-enabled systems that drive productivity, spark
      innovation, and create competitive advantage. Honored with the
      Outstanding Graduate Project award for the Master of Science in Software
      Engineering.`),
    picture: {
      avif: require('@site/src/pages/timeline/img/csuf.avif').default,
      fallback: require('@site/src/pages/timeline/img/csuf.jpg'),
      webp: require('@site/src/pages/timeline/img/csuf.webp').default,
    },
    prefix: 'calstate-fullerton',
    title: {
      children: 'Master of Science, Software Engineering',
      href: 'https://www.fullerton.edu/ecs/mse/about/',
    },
    year: '2005 - 2007',
  },
  {
    affiliation: {
      children: 'Experian CheetahMail',
      href: 'https://www.experian.com/marketing/',
      translate: 'no',
    },
    description: oneLine(`Accepted the Senior Software Engineer role at
      Experian CheetahMail to strengthen engineering depth and grow as a
      leader. Earned the Experian CheetahMail Pinnacle award and was later
      promoted to Software Development Lead, driving team performance and
      technical excellence.`),
    picture: {
      avif: require('@site/src/pages/timeline/img/cheetahmail.avif').default,
      fallback: require('@site/src/pages/timeline/img/cheetahmail.jpg'),
      webp: require('@site/src/pages/timeline/img/cheetahmail.webp').default,
    },
    prefix: 'cheetahmail',
    title: {
      children: 'Software Development Lead',
      href: 'https://en.wikipedia.org/wiki/Software_development',
    },
    year: '2005 - 2013',
  },
  {
    affiliation: {
      children: 'AirIQ (formerly Aircept)',
      href: 'https://www.airiq.com',
      translate: 'no',
    },
    description: oneLine(`Accepted a Software Engineer position at AirIQ,
      building on the wireless asset management work previously developed under
      the Aircept name. This role expanded my hands-on experience with GPS
      tracking systems and real-time data platforms.`),
    picture: {
      avif: require('@site/src/pages/timeline/img/airiq.avif').default,
      fallback: require('@site/src/pages/timeline/img/airiq.jpg'),
      webp: require('@site/src/pages/timeline/img/airiq.webp').default,
    },
    prefix: 'airiq',
    title: {
      children: 'Software Engineer',
      href: 'https://en.wikipedia.org/wiki/Software_engineering',
    },
    year: '2005',
  },
  {
    affiliation: {
      children: 'RazorGator',
      href: 'https://www.tickpick.com',
      translate: 'no',
    },
    description: oneLine(`Accepted a Web Developer position at RazorGator to
      strengthen front-end and back-end development skills. This role deepened
      my expertise in building dynamic, user-focused web applications within a
      fast-paced e-commerce environment.`),
    picture: {
      avif: require('@site/src/pages/timeline/img/razorgator.avif').default,
      fallback: require('@site/src/pages/timeline/img/razorgator.jpg'),
      webp: require('@site/src/pages/timeline/img/razorgator.webp').default,
    },
    prefix: 'razorgator',
    title: {
      children: 'Web Developer',
      href: 'https://en.wikipedia.org/wiki/Web_developer',
    },
    year: '2003 - 2005',
  },
  {
    affiliation: {
      children: 'Petra Christian University',
      href: 'https://petra.ac.id/?lang=en',
      translate: 'no',
    },
    description: oneLine(`Graduated from Petra Christian University with a
      Bachelor's degree in Architecture. Gained a deep understanding of
      planning, designing, and constructing physical structures - skills that
      later translated into software development, shaping how I approach system
      design, structure, and user experience.`),
    picture: {
      avif: require('@site/src/pages/timeline/img/petra.avif').default,
      fallback: require('@site/src/pages/timeline/img/petra.jpg'),
      webp: require('@site/src/pages/timeline/img/petra.webp').default,
    },
    prefix: 'petra',
    title: {
      children: 'Bachelor of Engineering, Architecture',
      href: 'https://architecture.petra.ac.id/?lang=en',
    },
    year: '1993 - 1997',
  },
  {
    affiliation: { children: 'Self Employed', href: '/' },
    description: oneLine(`As an independent professional, I've worn many
      hats - balancing roles with precision, adapting seamlessly to shifting
      challenges, and thriving in fast-paced environments. I bring a wealth of
      insights, hands-on experience, and technical depth to every partnership
      and employer I collaborate with.`),
    // This is smaller size than the one in home.
    picture: {
      avif: require('@site/src/pages/timeline/img/self.avif').default,
      fallback: require('@site/src/pages/timeline/img/self.jpg'),
      webp: require('@site/src/pages/timeline/img/self.webp').default,
    },
    prefix: 'self-employed',
    title: {
      children: 'Independent Professional',
      href: 'https://en.wikipedia.org/wiki/Entrepreneurship',
    },
    year: '1995 - Present',
  },
];

export const timelineMap = Object.fromEntries(timelines.map((item) => [item.prefix, item]));
