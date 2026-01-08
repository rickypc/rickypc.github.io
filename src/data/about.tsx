/*!
 * Copyright © 2015 Richard Huang <rickypc@users.noreply.github.com>
 * All rights reserved.
 */

import { type IntroProps } from '@site/src/components/common/Preamble';
import { type LayoutProps } from '@site/src/components/common/Layout';
import { oneLine } from '@site/src/data/common';

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

export const headline = 'Leading with People, Purpose, and Results';

export const intro: IntroProps = {
  description: oneLine(`I bring together a sharp focus on results with
    thoughtful analysis and sound judgment - always aiming to build meaningful
    outcomes through strong leadership and human connection.`),
  title: 'About Ricky Huang',
};

export const layout: LayoutProps = {
  description: oneLine(`Ricky Huang blends people skills, sharp analysis, and
    results-driven leadership to inspire teams and deliver impact.`),
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
