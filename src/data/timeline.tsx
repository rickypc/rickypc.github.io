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
    answer: oneLine(`Architectural Engineering, by design - and that's not a
      throwaway line. I graduated with a Bachelor of Engineering in
      Architecture from Petra Christian University before earning an MS in
      Software Engineering from Cal State Fullerton, where my final project
      received the Outstanding Graduate Project Award. The same planning and
      structural discipline that opens the Home page was trained first; this
      Timeline is the record of how that training crossed over into building
      systems that bear a different kind of load.`),
    question: 'What was Ricky\'s original background before software?',
  },
  {
    answer: oneLine(`20+ years at Experian across two business units - 7+ at
      Experian CheetahMail and 13+ at Experian Consumer Services across
      three roles (Automation Engineer, Senior Automation Engineer, and
      Senior / Principal-level Software Engineer), with recurring
      recognition including the Platinum Aspire Award (top 1% performance)
      and roughly 20 EMF Hero and Spot Awards. The continuity is part of the
      point: architecture ages well when the same hands keep maintaining it,
      and the longer tenure is what lets me ship dependable choices that
      still run five years later.`),
    question: 'How long has Ricky been at Experian, and in what roles?',
  },
  {
    answer: oneLine(`I joined as an Automation Engineer with Experian
      Consumer Services and was promoted twice, then earned a Stanford
      Distinction in Mining Massive Datasets alongside Machine Learning and
      Automata coursework - deepening the data-engineering side of my work
      alongside escalation in scope. The cadence is steady, not frantic:
      learn the theory, then widen the territory it can be applied to. That
      same cadence is what later made spec-driven development a natural
      first inside my company, as you'll see on the Home page.`),
    question: 'What is the cadence of Ricky\'s promotions and continued learning?',
  },
  {
    answer: oneLine(`I wouldn't leave lightly - that continuity is the proof.
      The search is additive: a role with more design leverage, a wider reach
      for architecture decisions, or an org further along the AI-native,
      spec-driven path I already leads - not an escape from a bad fit. The
      direction for that next step is outlined on the Stories page.`),
    question: 'Why would Ricky leave Experian after 20+ years?',
  },
  {
    answer: oneLine(`Before Experian Consumer Services: a Software Development
      Lead role at Experian CheetahMail that earned the Pinnacle Award for
      powering email at the scale of a billion messages a day, real-time GPS
      asset tracking at AirIQ, and full-stack ticketing at RazorGator
      (including Yahoo! Tickets). Freelance projects ran in parallel
      throughout, and you can see every one of those systems, with
      screenshots, on the Portfolio page - the core body of work that
      follows this career arc.`),
    question: 'What did Ricky build before Experian Consumer Services?',
  },
  {
    answer: oneLine(`Continuity, not gaps. I joined Experian Consumer
      Services in 2013 and have been promoted and wearing multiple hats
      across roles there ever since. The earlier Experian CheetahMail
      tenure fed directly into that move. My real-time GPS work at AirIQ
      taught the telemetry and high-frequency data patterns I now apply to
      high-volume pipelines. The record is continuous; the role and scope
      keep growing.`),
    question: 'Are there any unexplained gaps in the timeline?',
  },
];

export const intro: IntroProps = {
  description: oneLine(`These are the milestones - the years between the
    opening on the Home page and the core projects on Portfolio. Read them
    in the order they're shown (earliest roots first) and one career arc
    emerges: an engineering background rooted in how to plan, design, and
    construct physical structures at Petra Christian University, then
    carried into software - as an independent professional in 1995, through
    RazorGator, AirIQ, Experian CheetahMail, and into Experian Consumer
    Services where the work continues. Each step widened the scope of what I
    could build, and each one built capabilities you'll see applied later - the
    telemetry discipline from AirIQ, the billion-message scale of CheetahMail,
    the cost-design discipline that shows up on the Resume page as 5% of a
    licensed replacement.`),
  title: 'Timeline',
};

// Before layout assignment.
export const schema: SchemaType = 'ProfilePage';

export const layout: LayoutProps = {
  description: oneLine(`Milestones across Ricky Huang's career arc - from
    architectural engineering roots to software leadership, startups to global
    enterprise impact at Experian.`),
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
    description: oneLine(`The current chapter, and where the career arc
      leads into the core work on Portfolio. I accepted the Senior Software
      Engineer role at Experian Consumer Services to sharpen technical
      leadership and expand entrepreneurial range, and the recognition
      compounded: multiple Experian Platinum Aspire, EMF Hero - Above and
      Beyond, and recurring Experian Spot - Excellence in Action awards. The
      systems behind this chapter - including the Tier-1 essential service at
      50 ms p99, 5+ years of zero defects, running for roughly 5% of a licensed
      replacement's cost - are the ones the Resume later itemizes as proof; the
      Portfolio shows the wider platform that surrounds them.`),
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
    description: oneLine(`A deliberate detour into theory, fit between two
      decades of practice. I completed advanced computer science coursework
      from Stanford University, including Automata, Machine Learning, and
      Mining Massive Datasets - strengthening theoretical foundations in
      computation, gaining practical experience with modern ML techniques,
      and developing proficiency in large-scale data processing. I earned a
      Certificate of Completion with Distinction in Mining Massive Datasets
      for exceptional performance. The same hunger that drove me back to a
      classroom is what later made me the first in my company to set up
      spec-driven development - learn the rigor, then ship against it.`),
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
    description: oneLine(`The pivot point of the arc. I accepted the Automation
      Engineer position at Experian Consumer Services to deepen technical
      versatility and broaden engineering expertise, and was later promoted to
      Senior Automation Engineer, continuing to drive innovation and efficiency
      across automated systems. This is where the telemetry discipline I'd
      learned tracking GPS signals at AirIQ met the throughput discipline I'd
      earned at a billion emails a day at CheetahMail - and the combination
      is exactly what later produced the 5%-of-replacement-cost instinct you
      see threaded through every page of this site.`),
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
    description: oneLine(`The bridge between two architectures. I graduated from
      California State University, Fullerton with a Master's in Software
      Engineering, gaining expertise in delivering mission-ready,
      software-enabled systems that drive productivity, spark innovation, and
      create competitive advantage. Honored with the Outstanding Graduate
      Project award for the Master of Science in Software Engineering. This
      is where the structural-planning discipline from Petra formally became
      a system-design discipline - and the stepping stone to the CheetahMail
      work that followed (see Portfolio for the systems, see Stories for the
      people who were there).`),
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
    description: oneLine(`The first major milestone. I accepted the Senior
      Software Engineer role at Experian CheetahMail to strengthen engineering
      depth and grow as a leader, earned the Experian CheetahMail Pinnacle
      award for engineering excellence, and was later promoted to Software
      Development Lead, driving team performance and technical excellence. The
      Pinnacle Award was earned for powering email at the scale of a billion
      messages a day - planet-scale traffic that taught me how architecture
      holds at that volume. That scale is still the ceiling I measure new
      systems against, and it's visible, with screenshots, on the Portfolio
      page.`),
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
    description: oneLine(`Real-time systems work. I accepted a Software
      Engineer position at AirIQ, building on the wireless asset management
      work previously developed under the Aircept name. This role expanded my
      hands-on experience with GPS tracking systems and real-time data
      platforms - and quietly planted the seeds of the high-volume pipeline
      discipline I'd later apply at Experian Consumer Services. The telemetry
      patterns learned here are the same ones that let me later take a
      Tier-1 service with frequent production issues to month-long stability
      within a month (detailed on the Resume page).`),
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
    description: oneLine(`The earliest full-stack role. I accepted a Web
      Developer position at RazorGator to strengthen front-end and back-end
      development skills, deepening my expertise in building dynamic,
      user-focused web applications within a fast-paced e-commerce environment.
      This is where the full-stack instinct first clicked - the realization
      that the same person should own the call on both sides - and the Yahoo!
      Tickets integration built here is the entry you'll find, with its own
      gallery, over on the Portfolio page.`),
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
    description: oneLine(`The inciting incident, in retrospect. I graduated
      from Petra Christian University with a Bachelor's degree in Architecture,
      gaining a deep understanding of planning, designing, and constructing
      physical structures. Those skills later translated into software
      development, shaping how I approach system design, structure, and user
      experience - the same planning-before-pouring instinct that opens the
      Home page and that compounds, decade by decade, into the Resume's track
      record. Every chapter that follows is an echo of this one.`),
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
    description: oneLine(`The longest-running thread of all, running underneath
      every employed chapter since 1995. As an independent professional, I've
      worn many hats - balancing roles with precision, adapting seamlessly to
      shifting challenges, and thriving in fast-paced environments. I bring a
      wealth of insights, hands-on experience, and technical depth to every
      partnership and employer I collaborate with. The independent work body is
      its own sub-arc on Portfolio - GigaOm, Rainbow Guitars, Fortini, Exhibit
      Transport, S&M Bikes, Clipper, AnchorBlue, WheelBuilder, Pacifica -
      and the partners behind those projects are the voices on the Stories
      page.`),
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
