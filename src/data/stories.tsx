/*!
 * Copyright © 2015 Richard Huang <rickypc@users.noreply.github.com>
 * All rights reserved.
 */

import type { LayoutProps } from '@site/src/components/common/Layout';
import Link from '@site/src/components/common/Link';
import type { IntroProps } from '@site/src/components/common/Preamble';
import { type FaqItems, humanizeYears, oneLine, type SchemaType } from '@site/src/data/common';
import { total } from '@site/src/data/home';

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

export const faqItems: FaqItems[] = [
  {
    answer: oneLine(`Four peers, each named and linked to a real LinkedIn profile and company: an
      invested partner, a master of many trades, a problem-solving savior, and a versatile polymath.
      Together they cover clean code, versatility, rescue work, and breadth across stacks. Esteban's
      testimonial spans the independent project body on the Portfolio page. The other three map to
      CheetahMail-era and Pacifica work on the Timeline.`),
    question: 'What do former collaborators actually say about working with Ricky?',
  },
  {
    answer: oneLine(`Esteban Chavez, Creative Director at Headhigh Creative. His words carry the
      most weight because they span the most ground: multiple independent projects (GigaOm, Rainbow
      Guitars, Fortini, Exhibit Transport, S&M Bikes, Clipper, AnchorBlue, WheelBuilder). One
      client, many delivered projects - that is trust built across the independent stretch of the
      Timeline.`),
    question: 'Which testimonial carries the most weight, and why?',
  },
  {
    answer: oneLine(`Phillip Lin (Pacifica Services and Experian CheetahMail coworker), Christos
      Kakris (Experian CheetahMail coworker), and Vlad Podgurschi (Experian CheetahMail coworker).
      All three worked with me at Experian CheetahMail, so their testimonials are Experian
      CheetahMail-specific. Esteban's spans the broader independent work body across many portfolio
      projects. Together the four cover both halves of the story: CheetahMail-era and Pacifica work
      on one side, independent projects on the other.`),
    question: 'Who are the other recommenders and what is their context?',
  },
  {
    answer: oneLine(`Versatility, reliability, and partnership. Esteban calls out clean, functional,
      expertly crafted code across multiple projects. Phillip calls me a master of all trades on
      every side of the stack and says it would be your loss not to hire me. Vlad recalls me
      rescuing a frontend component with a clean, flexible, timely implementation. Christos notes a
      year of depth across multiple languages, frameworks, and environments. The About page plots
      these same attributes on its two axes - here they are in other people's words.`),
    question: 'What themes repeat across all four testimonials?',
  },
  {
    answer: oneLine(`They're roughly a decade old - I note that openly. The relationships and the
      work were genuine, and the performance has compounded since. The person those recommenders
      describe now maintains a mission-critical service with 5+ years of zero production defects and
      received a Platinum Aspire Award (top 1% performance) plus roughly 20 EMF Hero and Spot Awards
      since. The trust didn't peak. It kept compounding - which is exactly what makes the years
      ahead worth talking about.`),
    question: 'Are these testimonials current, or dated?',
  },
  {
    answer: oneLine(`Yes - early in my tenure on high-throughput systems, I integrated a popular
      open-source dependency for a complex data processing component. It looked like the perfect
      shortcut. When traffic surged to enterprise scale, the library's architecture proved
      inefficient - bottleneck latencies and unexpected bugs. To protect uptime, I pivoted
      immediately: stripped out the dependency and rolled out a much simpler, custom-built internal
      script tailored exactly to our performance needs. Lesson: never let library popularity
      substitute for deep architectural validation. Today I treat external dependencies as a last
      resort for mission-critical services, preferring lightweight, highly optimized internal code
      that we fully control and can scale predictably. Paid for once, learned for good.`),
    question: 'Has Ricky ever bet on the wrong technology, and what happened?',
  },
];

export const intro: IntroProps = {
  description: (
    <>
      Anyone can write their own praise. References are harder to fake.&nbsp;
      {humanizeYears(total, 'decades')} of engineering leaves two kinds of proof: systems that keep
      running, and colleagues whose trust keeps compounding. The four testimonials below are the
      second kind - each one named, linked, and tied to work you can check (independent work
      breadth, CheetahMail scale, rescue work, depth across stacks). The person those peers describe
      now maintains a mission-critical service with 5+ years of zero production defects, received a
      Platinum Aspire Award (top 1% performance) and roughly 20 EMF Hero and Spot Awards since, and
      was first in his company to set up&nbsp;
      <Link href="https://developer.microsoft.com/blog/spec-driven-development-ai-native-engineering/#what-is-spec-driven-development">
        spec-driven development
      </Link>
      . If the themes running through&nbsp;
      <Link href="/" title="Home">
        Home
      </Link>
      ,&nbsp;
      <Link href="/timeline" title="Timeline">
        Timeline
      </Link>
      ,&nbsp;
      <Link href="/portfolio" title="Portfolio">
        Portfolio
      </Link>
      , and&nbsp;
      <Link href="/about" title="About">
        About
      </Link>
      &nbsp;describe the builder you need, the next step is a conversation. The&nbsp;
      <Link href="/resume" title="Resume">
        Resume
      </Link>
      &nbsp;page is the scannable record that closes the loop.
    </>
  ),
  title: 'Stories',
};

// Before layout assignment.
export const schema: SchemaType = 'Review';

export const layout: LayoutProps = {
  description: oneLine(`Ricky Huang's developer testimonials: four peers in their own words - clean
    code, rescue work, depth across stacks. Read the quotes, then say hello.`),
  faq: { items: faqItems, slug: 'stories' },
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
  schema,
  title: 'Developer Testimonials - Four Peers in Their Own Words',
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
    content: oneLine(`Ricky was a godsend on our projects! He delivered clean, functional, expertly
      crafted code for multiple development projects for my company. He always approached his
      projects as an invested partner rather than just a contractor. He is an excellent problem
      solver with a proficient work ethic and a pleasurable attitude. Thank you Ricky for everything
      that you helped us with!`),
    header: { children: 'The Invested Partner', href: undefined },
    overview: oneLine(`An invested partner across the independent work logged on the Timeline
      (GigaOm, Rainbow Guitars, Fortini, Exhibit Transport, S&M Bikes, Clipper, AnchorBlue,
      WheelBuilder). Delivers clean, expertly crafted solutions, project after project.`),
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
    content: oneLine(`The consummate programmer, Ricky knows just about everything there is to know
      about development. Although his expertise is broad, he proves that one can really be the
      master of all trades. I worked with Ricky on several projects, and he surpassed my gradually
      increased expectations each time. Whether it's client- side, server - side, or every - side,
      he really can accomplish it all. Most importantly, Ricky is one of the nicest and most kind -
      hearted people you will meet in your lifetime. To any prospective employers for Ricky: it will
      truly be your loss if you don't hire him!`),
    header: { children: 'The Master of Many Trades', href: undefined },
    overview: oneLine(`A master of many trades - client-side, server-side, every-side - and one of
      the kindest people you'll meet. The Home page argues that breadth makes depth useful. Here a
      colleague makes that case in his own words.`),
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
    content: oneLine(`The first time I worked together with Ricky, it was on an important and
      complex project, which was beginning to fall seriously behind schedule. He literally rescued
      the project by taking charge of the frontend component and applying his amazing skills to
      deliver a clean, flexible, and timely implementation. Ricky is a dedicated professional,
      constantly working towards improving his skills and keeping up-to-date on the technologies he
      loves and specializes in. (And as we talk about the field of modern frontend web development,
      this is not an easy thing to do!) Ricky is the type of coworker you can trust with a project,
      and be sure that it gets done well and on time. I would be delighted to collaborate again with
      Ricky on any project, and I wholeheartedly recommend him for any software development work he
      chooses to get involved with.`),
    header: {
      children: 'The Problem-Solving Savior',
      href: 'https://en.wikipedia.org/wiki/Savior',
    },
    overview: oneLine(`A problem-solving savior who rescues complex projects with clean, flexible,
      timely implementations. The same stability pattern runs from Home through Portfolio to
      Resume - this quote is its earliest record.`),
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
    content: oneLine(`I worked with Ricky for over a year on two separate projects, one of which he
      led. During that time I was impressed with the depth of his knowledge (in multiple programming
      languages, frameworks, and environments), his thoroughness, attention to detail, dedication,
      and the hard work he put into both projects. I would not hesitate to recommend him and would
      enjoy working with him again.`),
    header: {
      children: 'The Versatile Polymath',
      href: 'https://en.wikipedia.org/wiki/Polymath',
    },
    overview: oneLine(`A versatile polymath with deep knowledge, close attention to detail, and
      steady dedication - a year of depth across multiple languages, frameworks, and environments.
      The About page plots the same depth-versus-breadth balance on its axes.`),
    prefix: 'versatile-polymath',
    title: {
      children: 'Senior Developer',
      href: 'https://en.wikipedia.org/wiki/Software_development',
    },
  },
];

export const storyMap = Object.fromEntries(stories.map((item) => [item.prefix, item]));
