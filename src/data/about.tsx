/*!
 * Copyright © 2015 Richard Huang <rickypc@users.noreply.github.com>
 * All rights reserved.
 */

import { type FaqItems, type SchemaType, oneLine } from '@site/src/data/common';
import { type IntroProps } from '@site/src/components/common/Preamble';
import { type LayoutProps } from '@site/src/components/common/Layout';

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
  title: 'Here\'s what defines my approach:',
};

export const faqItems: FaqItems[] = [
  {
    answer: oneLine(`A Transformer on the people axis - high influence and high
      adaptability - and a Transactor on the task axis - thoughtful analysis
      combined with the driven pursuit of goals.`),
    question: 'How does Ricky actually work, in measurable terms?',
  },
  {
    answer: oneLine(`It's a self-assessment across two standard quadrant
      frameworks - people adaptability vs. influence and task thought vs.
      delivery - plotted from eight characteristic attributes that span
      people-task balance, social intuition, clear vision, hands-on
      coordination, and empathy.`),
    question: 'Is the Transformer / Transactor framing based on anything real?',
  },
  {
    answer: oneLine(`The clearest evidence is operational: a service I took
      over used to hit production issues every 2 to 4 hours and, within a
      month, was sustaining multi-day then monthly stability windows - while
      costing roughly 5% of what a licensed third-party replacement would
      run (operations included, licensing alone far higher). Peers describe
      me as the heart and brains of the team in 2026 Spot Award nominations,
      and an internal tool I built ground-up now backs a business that grew
      from under $100K a year to hundreds of millions.`),
    question: 'What evidence supports the self-assessment beyond the graphs?',
  },
  {
    answer: oneLine(`I lean toward planning and long-term vision - I'd rather
      take a stable full-time role than jump between contracts - but that
      preference is a strength in environments that value durable
      architecture, not a rigidity. I adapt tools, stacks, and process to
      what the team actually needs, including being the first in my company
      to set up spec-driven development.`),
    question: 'Does Ricky adapt, or does the planner preference read as inflexible?',
  },
  {
    answer: oneLine(`I have a tendency to over-engineer solutions by
      prioritizing micro-optimizations over immediate business needs -
      for example, spending extra cycles chasing nanosecond-level precision
      or designing pipelines that scale to millions of records when the
      project only needs millisecond responses and a few hundred records.
      To manage this, I strictly apply a "Value vs. Effort" framework
      before writing code, explicitly asking stakeholders what "good enough"
      looks like for the current iteration. This keeps delivery lean while
      documenting any deep scalability architecture as "Phase 2" notes for
      the future.`),
    question: 'What is Ricky actively NOT good at, and how does he manage it?',
  },
  {
    answer: oneLine(`He speaks Bahasa Indonesia and Melayu (born and raised in
      Indonesia), a little Chinese, holds US citizenship (clearance-eligible),
      is based in the LA area and open to remote and hybrid work, and is
      currently learning Rust for fun - building a real scheduler and packet
      IO demo as a personal project.`),
    question: 'What\'s something about Ricky that doesn\'t show up on a resume?',
  },
  {
    answer: oneLine(`Through eight characteristic attributes, observed both
      qualitatively and operationally: people-task balance, social intuition,
      clear vision that translates into action, hands-on coordination,
      commitment to excellence and follow-through, drawing the best out of
      people through empathy, attunement to different perspectives, and respect
      for unique talents.`),
    question: 'What specifically makes Ricky good with people and teams?',
  },
];

export const headline = 'Leading with People, Purpose, and Results';

export const intro: IntroProps = {
  description: oneLine(`Engineering leadership rooted in emotional
    intelligence, clear vision, and the ability to turn ideas into action.
    The graphs below capture how I work - adaptability, influence, analysis,
    and execution - grounded in a people-first approach that delivers real
    results.`),
  title: 'About Ricky Huang',
};

// Before layout assignment.
export const schema: SchemaType = 'ProfilePage';

export const layout: LayoutProps = {
  description: oneLine(`Ricky Huang blends people skills, sharp analysis, and
    results-driven leadership to inspire teams and deliver impact.`),
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
  title: 'About - Leadership, Insight, and Results',
};

export const paragraphs = [
  oneLine(`On the left, you'll find two graphs that capture how I work: one
    reflects my adaptability and ability to influence, while the other shows
    how I balance thoughtful analysis with strong execution.`),
  oneLine(`I bring together emotional intelligence, a broad network, and clear,
    decisive leadership. I thrive in complex environments - digging into
    challenges, analyzing them with care, and moving toward meaningful results.
    At the heart of it all, I'm focused on connecting people, inspiring teams,
    and turning ideas into action, supported by modern tools that help me think
    and iterate with greater clarity.`),
];

export const quadrants = {
  people: {
    alt: 'Transformer People Type',
    axes: [
      {
        anchor: 'middle',
        text: 'INFLUENCE',
        x: 100,
        y: 221,
      },
      {
        anchor: 'middle',
        text: 'ADAPTABILITY',
        transform: 'rotate(-90)',
        x: -100,
        y: -10,
      },
    ] as QuadrantAxis[],
    circle: {
      x: 190,
      y: 30,
    } as QuadrantPosition,
    labels: [
      {
        anchor: 'start',
        text: 'Adaptor',
        title: oneLine(`Adaptors are supportive, resilient and flexible in
          response to change. They are quiet and accommodating.`),
        x: 3,
        y: 12,
      },
      {
        anchor: 'end',
        text: 'Transformer',
        title: oneLine(`Transformers combine interpersonal sensitivity with
          powerful social networks and definite leadership impact.`),
        x: 197,
        y: 12,
      },
      {
        anchor: 'start',
        text: 'Individualist',
        title: oneLine(`Individualists are task-rather than people-focused.
          They favor environments where their specialist expertise is valued.`),
        x: 3,
        y: 197,
      },
      {
        anchor: 'end',
        text: 'Influencer',
        title: oneLine(`Influencers excel at communicating their message. They
          enjoy using power and single-mindedly pursue their goals.`),
        x: 197,
        y: 197,
      },
    ] as QuadrantLabel[],
  },
  task: {
    alt: 'Transactor Task Type',
    axes: [
      {
        anchor: 'middle',
        text: 'DELIVERY',
        x: 100,
        y: 221,
      },
      {
        anchor: 'middle',
        text: 'THOUGHT',
        transform: 'rotate(-90)',
        x: -100,
        y: -10,
      },
    ] as QuadrantAxis[],
    circle: {
      x: 190,
      y: 10,
    } as QuadrantPosition,
    labels: [
      {
        anchor: 'start',
        text: 'Thinker',
        title: oneLine(`Thinkers get straight to the core of a problem to find
          solutions. They may pursue ideas at the expense of accomplishing
          results.`),
        x: 3,
        y: 12,
      },
      {
        anchor: 'end',
        text: 'Transactor',
        title: oneLine(`Transactors combine thoughtful analysis with the driven
          pursuit of goals. They enjoy challenges and can be relied upon to
          deliver results.`),
        x: 179,
        y: 12,
      },
      {
        anchor: 'start',
        text: 'Preserver',
        title: oneLine(`Preservers adopt conventional approaches to their work
          and steer clear of participation in intellectual debate.`),
        x: 3,
        y: 197,
      },
      {
        anchor: 'end',
        text: 'Doer',
        title: oneLine(`Doers approach their work with dynamism and
          conscientiousness. They favor action over intellectualized debate.`),
        x: 197,
        y: 197,
      },
    ] as QuadrantLabel[],
  },
};
