/*!
 * Copyright © 2015 Richard Huang <rickypc@users.noreply.github.com>
 * All rights reserved.
 */

import type { LayoutProps } from '@site/src/components/common/Layout';
import Link from '@site/src/components/common/Link';
import type { IntroProps } from '@site/src/components/common/Preamble';
import { type FaqItems, oneLine, type SchemaType } from '@site/src/data/common';

type QuadrantAnchor = 'start' | 'middle' | 'end';

export type QuadrantAxis = QuadrantPosition & {
  anchor: QuadrantAnchor;
  text: string;
  transform?: string;
};

export type QuadrantLabel = QuadrantPosition & {
  anchor: QuadrantAnchor;
  text: string;
  title: string;
};

export type QuadrantPosition = {
  x: number;
  y: number;
};

export const characteristic = {
  attributes: [
    'A strong balance of people focus and task orientation',
    'Naturally outgoing and socially intuitive',
    'Clear vision and purpose that translate into action',
    'A hands-on coordinator who gets things done and lifts others up',
    'Committed to excellence and follow-through',
    'Skilled at drawing out the best in people through insight and empathy',
    'Attuned to different perspectives and individual needs',
    'Deep respect for unique talents and contributions',
  ],
  title: 'What defines my leadership style:',
};

export const faqItems: FaqItems[] = [
  {
    answer: oneLine(`A Transformer on the people axis - high influence and high adaptability - and a
      Transactor on the task axis - thoughtful analysis combined with the driven pursuit of goals.
      Influence was earned the slow way: by listening first. Adaptability was earned by shipping the
      boring choice that still runs years later. The dual position is a working stance, and the
      graphs on this page show exactly where it sits.`),
    question: 'How does Ricky actually work, in measurable terms?',
  },
  {
    answer: oneLine(`This is a self-assessment across two standard quadrant frameworks - people
      adaptability vs. influence and task thought vs. delivery. The position is plotted from the
      eight characteristic attributes on this page, which span people-task balance, social
      intuition, clear vision, hands-on coordination, and empathy. The Home page introduces the
      structural instinct behind it; this page pins it to a measurable position.`),
    question: 'Is the Transformer / Transactor framing based on anything real?',
  },
  {
    answer: oneLine(`The clearest evidence is operational. A service I took over used to hit
      production issues every 2 to 4 hours. Within a month, it was holding multi-day stability
      windows, and monthly windows followed - all for roughly 5% of what a licensed third-party
      replacement would run (operations included, licensing alone far higher). Peers describe me as
      the heart and brains of the team in 2026 Spot Award nominations. An internal tool I built from
      the ground up now backs a business that grew from under $100K a year to hundreds of millions.
      The Resume page itemizes this same evidence as a strategic appendix, and the same cost
      discipline runs across this site.`),
    question: 'What evidence supports the self-assessment beyond the graphs?',
  },
  {
    answer: oneLine(`Yes. I lean toward planning and long-term vision, and I pick stable full-time
      roles over short contracts. That preference is a strength in teams that value durable
      architecture. I adapt tools, stacks, and process to what the team actually needs, and I was
      the first in my company to set up spec-driven development. The Timeline shows the cadence;
      this page shows the why.`),
    question: 'Does Ricky adapt, or does the planner preference read as inflexible?',
  },
  {
    answer: oneLine(`Honest answer: I can over-engineer - chasing micro-optimizations past what the
      business needs. Left alone, I will spend extra cycles on nanosecond-level precision or design
      pipelines that scale to millions of records when the project only needs millisecond responses
      and a few hundred records. So before writing code, I strictly apply a "Value vs. Effort"
      framework and ask stakeholders what "good enough" looks like for the current iteration. Deep
      scalability work gets documented as "Phase 2" notes, which keeps delivery lean. The Portfolio
      page tells the over-engineering story this lesson came from.`),
    question: 'What is Ricky actively NOT good at, and how does he manage it?',
  },
  {
    answer: oneLine(`I speak Bahasa Indonesia and Melayu (born and raised in Indonesia), a little
      Chinese, and I'm currently learning Rust for fun - building a real scheduler and a packet IO
      demo as a personal project. I hold US citizenship (clearance-eligible), I'm based in the LA
      area, and I'm open to remote and hybrid work. The same curiosity took me back to Stanford
      mid-career and made me the first in my company to set up spec-driven development at work.`),
    question: "What's something about Ricky that doesn't show up on a resume?",
  },
  {
    answer: oneLine(`Eight characteristic attributes, seen in behavior and in results: people-task
      balance, social intuition, clear vision that translates into action, hands-on coordination,
      commitment to excellence and follow-through, drawing the best out of people through empathy,
      attunement to different perspectives, and respect for unique talents. The Stories page shows
      those same attributes in other people's voices.`),
    question: 'What specifically makes Ricky good with people and teams?',
  },
];

export const headline = 'Leadership with People Skills - and Results You Can Check';

export const intro: IntroProps = {
  description: (
    <>
      You need a leader whose people skills show up in the numbers, and most profiles can&#39;t
      prove either half. This page can. The two graphs below plot where I actually land on a people
      axis and a task axis: a Transformer on people, a Transactor on tasks. That position is an
      operating philosophy built in four places - the structural discipline from architecture, the
      telemetry rigor from AirIQ, the planet-scale ceiling from CheetahMail, and the durability bar
      from the mission-critical Experian service. Check the systems behind it on the
      <Link href="/portfolio" title="Portfolio">
        Portfolio
      </Link>
      page, then trace the years that built it on the
      <Link href="/timeline" title="Timeline">
        Timeline
      </Link>
      page.
    </>
  ),
  title: 'About Ricky Huang',
};

// Before layout assignment.
export const schema: SchemaType = 'ProfilePage';

export const layout: LayoutProps = {
  description: oneLine(`Ricky Huang's leadership profile: a Transformer on people, a Transactor on
    tasks - two measured graphs, real evidence. Check the proof, then say hello.`),
  faq: { items: faqItems, slug: 'about' },
  keywords: [
    'leadership',
    'people skills',
    'emotional intelligence',
    'team building',
    'strategic thinking',
    'professional profile',
    'personal branding',
    'executive presence',
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
  title: 'About - Leadership Skills That Deliver',
};

export const paragraphs = [
  oneLine(`The two graphs on this page show one profile from two angles. The people graph plots
    adaptability against influence; the task graph plots thought against delivery. My position lands
    high on all four axes - I listen closely, adjust fast, think carefully, and finish what I start.`),
  <>
    That profile holds up under pressure. I read the room, name the real problem, and line up the
    people who can solve it, then keep the work moving until it ships. Modern tools help me think
    and iterate faster, and the
    <Link href="/stories" title="Stories">
      Stories
    </Link>
    page shows the same traits in other people's words.
  </>,
];

export const quadrants = {
  people: {
    alt: 'Transformer People Type',
    axes: [
      { anchor: 'middle', text: 'INFLUENCE', x: 100, y: 221 },
      { anchor: 'middle', text: 'ADAPTABILITY', transform: 'rotate(-90)', x: -100, y: -10 },
    ] as QuadrantAxis[],
    circle: { x: 190, y: 30 } as QuadrantPosition,
    labels: [
      {
        anchor: 'start',
        text: 'Adaptor',
        title: oneLine(`Adaptors are supportive, resilient and flexible in response to change. They
          are quiet and accommodating.`),
        x: 3,
        y: 12,
      },
      {
        anchor: 'end',
        text: 'Transformer',
        title: oneLine(`Transformers combine interpersonal sensitivity with powerful social networks
          and clear leadership impact.`),
        x: 197,
        y: 12,
      },
      {
        anchor: 'start',
        text: 'Individualist',
        title: oneLine(`Individualists put tasks before people. They favor environments where their
          specialist expertise is valued.`),
        x: 3,
        y: 197,
      },
      {
        anchor: 'end',
        text: 'Influencer',
        title: oneLine(`Influencers excel at communicating their message. They enjoy using power and
          single-mindedly pursue their goals.`),
        x: 197,
        y: 197,
      },
    ] as QuadrantLabel[],
  },
  task: {
    alt: 'Transactor Task Type',
    axes: [
      { anchor: 'middle', text: 'DELIVERY', x: 100, y: 221 },
      { anchor: 'middle', text: 'THOUGHT', transform: 'rotate(-90)', x: -100, y: -10 },
    ] as QuadrantAxis[],
    circle: { x: 190, y: 10 } as QuadrantPosition,
    labels: [
      {
        anchor: 'start',
        text: 'Thinker',
        title: oneLine(`Thinkers go straight to the core of a problem to find solutions. They may
          chase ideas and lose sight of results.`),
        x: 3,
        y: 12,
      },
      {
        anchor: 'end',
        text: 'Transactor',
        title: oneLine(`Transactors combine thoughtful analysis with the driven pursuit of goals.
          They enjoy challenges and can be relied upon to deliver results.`),
        x: 179,
        y: 12,
      },
      {
        anchor: 'start',
        text: 'Preserver',
        title: oneLine(`Preservers stick to conventional ways of working and avoid intellectual
          debate.`),
        x: 3,
        y: 197,
      },
      {
        anchor: 'end',
        text: 'Doer',
        title: oneLine(`Doers bring energy and care to their work. They favor action over debate.`),
        x: 197,
        y: 197,
      },
    ] as QuadrantLabel[],
  },
};
