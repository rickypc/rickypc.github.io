/*!
 * All the code that follow is
 * Copyright (c) 2015 - 2024 Richard Huang <rickypc@users.noreply.github.com>.
 * All Rights Reserved. Not for reuse without permission.
 */

import People from '@site/src/pages/about/img/type.people.svg';
import Task from '@site/src/pages/about/img/type.task.svg';

export const characteristic = {
  attributes: [
    'I am "people" and "task" oriented.',
    'I am outgoing and socially skilled.',
    'I provide a clear vision and purpose, able to translate ideas into action.',
    'I am a good coordinator. I get things done by my ability to inspire people with me.',
    'I focused on excellence and delivery.',
    'I get the best from people due to insight and understanding into what makes different people respond and the ability to empathize with differing needs and viewpoints.',
    'I value individual qualities and skills.',
  ],
  title: 'My key characteristics:',
};

export const headline = 'I am a Transformer-Transactor type and I build ultimate things.';

export const layout = {
  description: 'I am a Transformer-Transactor type and I build ultimate things | Ricky Huang',
  keywords: [
    'ricky huang',
    'richard huang',
    'transformer-transactor type',
    'vision and purpose',
    'coordinator and inspirator',
    'qualities and skills',
    'full stack developer',
    'engineering leader',
    'value proposition',
    'technical innovation',
    'business strategy',
    'software engineering',
    'smart creative',
    'master degree',
  ],
  metadatas: [
    // eslint-disable-next-line global-require
    <link as="font" fetchPriority="high" href={require('@site/src/font/yesevaone/OpNJno4ck8vc-xYpwWWxli1VWzfAw0Y.woff2').default} key={0} rel="preload" type="font/woff2" />,
  ],
  title: 'Type and key characteristics',
};

export const paragraphs = [
  'I am a Transformer People Type, who combines interpersonal sensitivity with strong social networks, and definite leadership impact.',
  'I am a Transactor Task Type, who combines thoughtful analysis with the driven pursuit of goals. I enjoy challenges and can be relied upon to deliver results.',
];

export const preamble = {
  description: 'I combine the focus on achieving goals with thoughtful analysis and judgment.',
  title: 'About Ricky Huang',
};

export const types = [
  {
    alt: 'Transformer People Type',
    Image: People,
  },
  {
    alt: 'Transactor Task Type',
    Image: Task,
  },
];
