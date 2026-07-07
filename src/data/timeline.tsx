/*!
 * Copyright © 2015 Richard Huang <rickypc@users.noreply.github.com>
 * All rights reserved.
 */

/* eslint-disable global-require */

import { type FaqItems, type SchemaType, oneLine } from '@site/src/data/common';
import { type IntroProps } from '@site/src/components/common/Preamble';
import { type LayoutProps } from '@site/src/components/common/Layout';
import { type PictureInfo } from '@site/src/components/common/Image';

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

export const faqItems: FaqItems[] = [
  {
    answer: oneLine(`Architectural Engineering, by design - I graduated with a
      Bachelor of Engineering in Architecture from Petra Christian University
      before earning an MS in Software Engineering from Cal State Fullerton,
      where my final project received the Outstanding Graduate Project
      Award.`),
    question: 'What was Ricky\'s original background before software?',
  },
  {
    answer: oneLine(`20+ years at Experian across two business units - 7+ at
      Experian CheetahMail and 13+ at Experian Consumer Services across
      three roles (Automation Engineer, Senior Automation Engineer, and
      Senior / Principal-level Software Engineer), with recurring
      recognition including the Platinum Aspire Award (top 1% performance)
      and roughly 20 EMF Hero and Spot Awards.`),
    question: 'How long has Ricky been at Experian, and in what roles?',
  },
  {
    answer: oneLine(`I joined as an Automation Engineer with Experian
      Consumer Services and was promoted twice, then earned a Stanford
      Distinction in Mining Massive Datasets alongside Machine Learning and
      Automata coursework - deepening the data-engineering side of my work
      alongside escalation in scope.`),
    question: 'What is the cadence of Ricky\'s promotions and continued learning?',
  },
  {
    answer: oneLine(`He wouldn't leave lightly - that continuity is the proof.
      The search is additive: a role with more design leverage, a wider blast
      radius for architecture decisions, or an org further along the AI-native,
      spec-driven path he already leads - not an escape from a bad fit.`),
    question: 'Why would Ricky leave Experian after 20+ years?',
  },
  {
    answer: oneLine(`Before Experian Consumer Services: a Software Development
      Lead role at Experian CheetahMail that earned the Pinnacle Award for
      powering email at the scale of a billion messages a day, real-time GPS
      asset tracking at AirIQ, and full-stack ticketing at RazorGator
      (including Yahoo! Tickets). Freelance projects ran in parallel
      throughout.`),
    question: 'What did Ricky build before Experian Consumer Services?',
  },
  {
    answer: oneLine(`Continuity, not gaps. I joined Experian Consumer
      Services in 2013 and have been promoted and wearing multiple hats
      across roles there ever since. The earlier Experian CheetahMail
      tenure fed directly into that move. My real-time GPS work at AirIQ
      taught the telemetry and high-frequency data patterns I now apply to
      high-volume pipelines.`),
    question: 'Are there any unexplained gaps in the timeline?',
  },
];

export const intro: IntroProps = {
  description: oneLine(`A curated journey through key milestones in my career,
    education, and technical growth. Each moment reflects a step forward -
    building expertise, shaping ideas, and driving impact across industries and
    technologies, from a Bachelor of Engineering in Architecture to a
    Master of Science in Software Engineering to 20+ years at Experian
    across two business units and three roles, with a Platinum Aspire award
    along the way.`),
  title: 'Timeline',
};

// Before layout assignment.
export const schema: SchemaType = 'ProfilePage';

export const layout: LayoutProps = {
  description: oneLine(`Milestones in Ricky Huang's journey - from architecture
    to engineering, startups to global impact, and everything in between.`),
  faq: { items: faqItems, slug: 'timeline' },
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
  schema,
  title: 'Timeline - Career, Education & Technical Milestones',
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
