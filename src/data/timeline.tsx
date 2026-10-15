/*!
 * Copyright © 2015 Richard Huang <rickypc@users.noreply.github.com>
 * All rights reserved.
 */

import type { PictureInfo } from '@site/src/components/common/Image';
import type { LayoutProps } from '@site/src/components/common/Layout';
import Link from '@site/src/components/common/Link';
import type { IntroProps } from '@site/src/components/common/Preamble';
import { type FaqItems, oneLine, type SchemaType } from '@site/src/data/common';
import type { JSX } from 'react';

export type TimelineProps = {
  affiliation: {
    children: string;
    href?: string;
    translate?: 'no' | 'yes';
  };
  className?: string;
  description: JSX.Element | string;
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
    answer: oneLine(`Architecture, formally. I earned a Bachelor of Engineering in Architecture from
      Petra Christian University, then an MS in Software Engineering from Cal State Fullerton, where
      my final project received the Outstanding Graduate Project Award. The planning and structural
      discipline trained first. This Timeline is the record of how it carried into software, and the
      Home page opens on the same instinct.`),
    question: "What was Ricky's original background before software?",
  },
  {
    answer: oneLine(`20+ years at Experian, across two business units - 7+ at Experian CheetahMail
      and 13+ at Experian Consumer Services, across three roles: Automation Engineer, Senior
      Automation Engineer, and Senior / Principal-level Software Engineer. The recognition kept
      coming: the Platinum Aspire Award (top 1% performance) and roughly 20 EMF Hero and Spot
      Awards. Long tenure is the point - the same hands keep maintaining the architecture, so the
      choices I ship stay dependable and still run five years later.`),
    question: 'How long has Ricky been at Experian, and in what roles?',
  },
  {
    answer: oneLine(`I joined Experian Consumer Services as an Automation Engineer and was promoted
      twice. Between those promotions I earned a Stanford Distinction in Mining Massive Datasets,
      alongside Machine Learning and Automata coursework, deepening the data-engineering side of my
      work as the scope kept widening. The pattern repeats: learn the theory, then widen the
      territory it covers. That same pattern later made me the first in my company to set up
      spec-driven development, as you'll see on the Home page.`),
    question: "What is the cadence of Ricky's promotions and continued learning?",
  },
  {
    answer: oneLine(`I would not leave lightly - that continuity is the proof. The search is
      additive: a role with more design leverage, a wider reach for architecture decisions, or an
      org further along the AI-native, spec-driven path I already lead. The direction for that next
      step is outlined on the Stories page.`),
    question: 'Why would Ricky leave Experian after 20+ years?',
  },
  {
    answer: oneLine(`Three systems worth checking. At Experian CheetahMail I served as Software
      Development Lead, and the work earned the Pinnacle Award for powering email at the scale of a
      billion messages a day. Before that: real-time GPS asset tracking at AirIQ, and full-stack
      ticketing at RazorGator, including Yahoo! Tickets. Freelance projects ran in parallel
      throughout. The Portfolio page shows every one of those systems, with screenshots - the core
      body of work that follows this career arc.`),
    question: 'What did Ricky build before Experian Consumer Services?',
  },
  {
    answer: oneLine(`No gaps. I joined Experian Consumer Services in 2013 and have been promoted and
      wearing multiple hats across roles there ever since. The earlier Experian CheetahMail tenure
      fed directly into that move. My real-time GPS work at AirIQ taught the telemetry and
      high-frequency data patterns I now apply to high-volume pipelines. The record is continuous;
      the role and scope keep growing.`),
    question: 'Are there any unexplained gaps in the timeline?',
  },
];

export const intro: IntroProps = {
  description: (
    <>
      You read a career history to check three things: tenure, stability, and growth. Most make you
      dig. These milestones give you all three in order, earliest roots first. The arc starts with
      an engineering background at
      <Link href="https://petra.ac.id/?lang=en" title="Petra Christian University">
        Petra Christian University
      </Link>
      , where I learned to plan, design, and construct physical structures. That discipline carried
      into software as an independent professional in 1995 - through
      <Link href="https://www.tickpick.com" title="RazorGator">
        RazorGator
      </Link>
      ,
      <Link href="https://www.airiq.com" title="AirIQ">
        AirIQ
      </Link>
      , Experian CheetahMail, and into
      <Link href="https://www.experian.com" title="Experian Consumer Services">
        Experian Consumer Services
      </Link>
      , where the work continues today. Each step widened the scope of what I could build, and the
      opening promises live on the
      <Link href="/" title="Home">
        Home
      </Link>
      page, the core projects on
      <Link href="/portfolio" title="Portfolio">
        Portfolio
      </Link>
      . Read both to see the capabilities this arc built - the telemetry discipline from AirIQ, the
      billion-message scale of CheetahMail, and the cost-design discipline itemized on the
      <Link href="/resume" title="Resume">
        Resume
      </Link>
      page as 5% of a licensed replacement.
    </>
  ),
  title: 'Timeline',
};

// Before layout assignment.
export const schema: SchemaType = 'ProfilePage';

export const layout: LayoutProps = {
  description: oneLine(`Ricky Huang's career timeline: 30+ years from architecture roots to today's
    cloud platforms, every role and award in order. Trace the years, then say hello.`),
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
  title: 'Career Timeline - 30+ Years, One Continuous Arc',
};

export const timelines: TimelineProps[] = [
  {
    affiliation: {
      children: 'Experian Consumer Services',
      href: 'https://www.experian.com/corporate/experian-interactive',
      translate: 'no',
    },
    description: (
      <>
        The role I hold today. I accepted the
        <Link
          href="https://en.wikipedia.org/wiki/Software_engineering"
          title="Senior Software Engineer"
        >
          Senior Software Engineer
        </Link>
        role at
        <Link href="https://www.experian.com" title="Experian Consumer Services">
          Experian Consumer Services
        </Link>
        to sharpen technical leadership and expand entrepreneurial range, and the recognition
        compounded: multiple Experian Platinum Aspire, EMF Hero - Above and Beyond, and recurring
        Experian Spot - Excellence in Action awards. Behind the recognition sits the work - the
        mission-critical service at 50 ms p99, 5+ years of zero defects, running for roughly 5% of a
        licensed replacement's cost. The
        <Link href="/resume" title="Resume">
          Resume
        </Link>
        itemizes those systems as proof; the
        <Link href="/portfolio" title="Portfolio">
          Portfolio
        </Link>
        shows the wider platform that surrounds them.
      </>
    ),
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
    description: (
      <>
        A deliberate pause for theory, set between two decades of practice. I completed advanced
        computer science coursework from
        <Link href="https://www.stanford.edu" title="Stanford University">
          Stanford University
        </Link>
        : Automata,
        <Link href="https://en.wikipedia.org/wiki/Machine_learning" title="Machine Learning">
          Machine Learning
        </Link>
        , and Mining Massive Datasets. The work strengthened theoretical foundations in computation,
        gave practical experience with modern ML techniques, and built proficiency in large-scale
        data processing. I earned a Certificate of Completion with Distinction in Mining Massive
        Datasets for exceptional performance. The same drive later made me the first in my company
        to set up
        <Link
          href="https://developer.microsoft.com/blog/spec-driven-development-ai-native-engineering/#what-is-spec-driven-development"
          title="Spec-Driven Development"
        >
          spec-driven development
        </Link>
        <span> - learn the rigor, then ship against it.</span>
      </>
    ),
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
    description: (
      <>
        The pivot into
        <Link href="https://www.experian.com" title="Experian">
          Experian
        </Link>
        . I accepted the Automation Engineer position at Experian Consumer Services to deepen
        technical versatility and broaden engineering expertise, then was promoted to Senior
        Automation Engineer, continuing to drive innovation and efficiency across automated systems.
        Here the telemetry discipline from tracking
        <Link href="https://en.wikipedia.org/wiki/Global_Positioning_System" title="GPS">
          GPS
        </Link>
        signals at
        <Link href="https://www.airiq.com" title="AirIQ">
          AirIQ
        </Link>
        met the throughput discipline of a billion emails a day at CheetahMail. That combination
        produced the cost-design instinct threaded through every page of this site.
      </>
    ),
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
    description: (
      <>
        The bridge between two fields. I graduated from
        <Link href="https://www.fullerton.edu" title="California State University, Fullerton">
          California State University, Fullerton
        </Link>
        with a Master's in Software Engineering, gaining expertise in delivering mission-ready,
        software-enabled systems that drive productivity, spark innovation, and create competitive
        advantage. My final project received the Outstanding Graduate Project award for the Master
        of Science in Software Engineering. This is where the structural-planning discipline from
        <Link href="https://petra.ac.id/?lang=en" title="Petra">
          Petra
        </Link>
        formally became a system-design discipline - the stepping stone to the CheetahMail work that
        followed. See
        <Link href="/portfolio" title="Portfolio">
          Portfolio
        </Link>
        for the systems and
        <Link href="/stories" title="Stories">
          Stories
        </Link>
        for the people who were there.
      </>
    ),
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
    description: (
      <>
        The first planet-scale test. I accepted the
        <Link
          href="https://en.wikipedia.org/wiki/Software_engineering"
          title="Senior Software Engineer"
        >
          Senior Software Engineer
        </Link>
        role at Experian CheetahMail to strengthen engineering depth and grow as a leader, earned
        the Experian CheetahMail Pinnacle award for engineering excellence, and was later promoted
        to Software Development Lead, driving team performance and technical excellence. The
        Pinnacle Award itself was earned for powering email at the scale of a billion messages a day
        <span> - traffic that taught me how architecture holds at that volume.</span>
        That scale is still the ceiling I measure new systems against, and the
        <Link href="/portfolio" title="Portfolio">
          Portfolio
        </Link>
        page shows it with screenshots.
      </>
    ),
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
    description: (
      <>
        Real-time systems, learned hands-on. I accepted a Software Engineer position at AirIQ,
        building on the wireless asset management work previously developed under the Aircept name.
        The role expanded my hands-on experience with
        <Link href="https://en.wikipedia.org/wiki/Global_Positioning_System" title="GPS">
          GPS
        </Link>
        tracking systems and real-time data platforms, and planted the roots of the high-volume
        pipeline discipline I later applied at
        <Link href="https://www.experian.com" title="Experian Consumer Services">
          Experian Consumer Services
        </Link>
        . The telemetry patterns learned here are the same ones that later took a mission-critical
        service with frequent production issues to month-long stability within a month. The
        <Link href="/resume" title="Resume">
          Resume
        </Link>
        page details that turnaround.
      </>
    ),
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
    description: (
      <>
        The earliest full-stack role. I accepted a Web Developer position at
        <Link href="https://www.tickpick.com" title="RazorGator">
          RazorGator
        </Link>
        to strengthen front-end and back-end development skills, deepening my expertise in building
        dynamic, user-focused web applications within a fast-paced e-commerce environment. This is
        where the full-stack instinct first clicked: the same person should own the call on both
        sides. The
        <Link href="https://www.yahoo.com" title="Yahoo!">
          Yahoo!
        </Link>
        Tickets integration built here has its own gallery on the
        <Link href="/portfolio" title="Portfolio">
          Portfolio
        </Link>
        page.
      </>
    ),
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
    description: (
      <>
        Where the discipline started. I graduated from
        <Link href="https://petra.ac.id/?lang=en" title="Petra Christian University">
          Petra Christian University
        </Link>
        with a Bachelor's degree in Architecture, gaining a deep understanding of planning,
        designing, and constructing physical structures. Those skills later translated into
        <Link
          href="https://en.wikipedia.org/wiki/Software_engineering"
          title="Software Development"
        >
          software development
        </Link>
        , shaping how I approach system design, structure, and user experience. The same
        planning-before-pouring instinct opens the
        <Link href="/" title="Home">
          Home
        </Link>
        page and compounds, decade by decade, into the
        <Link href="/resume" title="Resume">
          Resume
        </Link>
        's track record.
      </>
    ),
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
    description: (
      <>
        The parallel track. Independent work has run underneath every employed chapter since 1995.
        As an independent professional I have worn many hats - balancing roles with precision,
        adapting to shifting challenges, and thriving in fast-paced environments. I bring a wealth
        of insights, hands-on experience, and technical depth to every partnership and employer I
        collaborate with. The independent work body is its own sub-arc on
        <Link href="/portfolio" title="Portfolio">
          Portfolio
        </Link>
        <span> - </span>
        <Link href="https://gigaom.com" title="GigaOm">
          GigaOm
        </Link>
        ,
        <Link href="https://www.rainbowguitars.com" title="Rainbow Guitars">
          Rainbow Guitars
        </Link>
        , Fortini, Exhibit Transport,
        <Link href="https://www.sandmbikes.com" title="S&M Bikes">
          S&M Bikes
        </Link>
        ,
        <Link href="https://www.clippercorp.com" title="Clipper">
          Clipper
        </Link>
        , AnchorBlue,
        <Link href="https://wheelbuilder.com" title="WheelBuilder">
          WheelBuilder
        </Link>
        ,
        <Link href="https://www.pacificaservices.com" title="Pacifica">
          Pacifica
        </Link>
        <span> - and the partners behind those projects are the voices on the </span>
        <Link href="/stories" title="Stories">
          Stories
        </Link>
        page.
      </>
    ),
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
