/*!
 * Copyright © 2015 Richard Huang <rickypc@users.noreply.github.com>
 * All rights reserved.
 */

/* eslint-disable global-require */

import { GenIcon } from 'react-icons/lib';
import { type IconBaseProps } from 'react-icons';
import { type LayoutProps } from '@site/src/components/common/Layout';
import Link from '@site/src/components/common/Link';
import { type ComponentType, type ReactElement } from 'react';
import { humanizeYears, oneLine } from '@site/src/data/common';
import { type PreambleProps } from '@site/src/components/common/Preamble';
import Reveal from '@site/src/components/common/Reveal';

const total = new Date().getFullYear() - 1995;

export type SocialProps = {
  href?: string;
  Icon: ComponentType<IconBaseProps & { className?: string }>;
  title: string;
};

/**
 * Renders the `Github` icon.
 * @param {object} props - React props passed to the icon component.
 * @param {string} [props.className] - Optional CSS class for styling.
 * @param {object} [props.style] - Optional inline styles.
 * @param {string} [props.title] - Optional title for accessibility.
 * @returns {object} The icon.
 */
export function FaGithub(props: IconBaseProps): ReactElement {
  return GenIcon({ tag: 'svg', attr: { viewBox: '0 0 496 512' }, child: [{ tag: 'path', attr: { d: 'M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3.3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5.3-6.2 2.3zm44.2-1.7c-2.9.7-4.9 2.6-4.6 4.9.3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3.7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3.3 2.9 2.3 3.9 1.6 1 3.6.7 4.3-.7.7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3.7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3.7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z' }, child: [] }] })(props);
}

/**
 * Renders the `Linkedin` icon.
 * @param {object} props - React props passed to the icon component.
 * @param {string} [props.className] - Optional CSS class for styling.
 * @param {object} [props.style] - Optional inline styles.
 * @param {string} [props.title] - Optional title for accessibility.
 * @returns {object} The icon.
 */
export function FaLinkedin(props: IconBaseProps): ReactElement {
  return GenIcon({ tag: 'svg', attr: { viewBox: '0 0 448 512' }, child: [{ tag: 'path', attr: { d: 'M416 32H31.9C14.3 32 0 46.5 0 64.3v383.4C0 465.5 14.3 480 31.9 480H416c17.6 0 32-14.5 32-32.3V64.3c0-17.8-14.4-32.3-32-32.3zM135.4 416H69V202.2h66.5V416zm-33.2-243c-21.3 0-38.5-17.3-38.5-38.5S80.9 96 102.2 96c21.2 0 38.5 17.3 38.5 38.5 0 21.3-17.2 38.5-38.5 38.5zm282.1 243h-66.4V312c0-24.8-.5-56.7-34.5-56.7-34.6 0-39.9 27-39.9 54.9V416h-66.4V202.2h63.7v29.2h.9c8.9-16.8 30.6-34.5 62.9-34.5 67.2 0 79.7 44.3 79.7 101.9V416z' }, child: [] }] })(props);
}

export const hats = [
  {
    children: (
      <>
        <img alt="Pilot" src={require('@site/src/pages/img/pilot.webp').default} />
        <Reveal coeff={0}>Engineering Leader</Reveal>
      </>
    ),
    description: (
      <>
        <span>I lead engineering teams with clarity, direction, and </span>
        <Link href="/about" title="strong technical judgement">strong technical judgement</Link>
        <span>. I guide organizations </span>
        <Link href="/stories" title="through complexity">through complexity</Link>
        <span>
          , aligning architecture, execution, and long-term strategy to
          reliable, meaningful results.
        </span>
      </>
    ),
    details: {
      content: (
        <>
          <p>
            I lead&nbsp;
            <Link href="/timeline" title="engineering organizations">engineering organizations</Link>
            &nbsp;by creating clarity in environments that are often ambiguous,
            fast-moving, or technically complex.&nbsp;
            <Link href="/about" title="My approach">My approach</Link>
            &nbsp;blends hands-on technical depth with a strong
            sense of direction, ensuring teams understand not just what
            they&#39;re building, but why it matters. I focus on establishing
            architectural standards, improving engineering quality, and
            creating systems that scale with the business rather than
            constrain it.
          </p>
          <p>
            I&#39;m known for stepping into difficult situations - unclear
            requirements, legacy systems, production issues, or cross-team
            conflicts - and bringing structure, calm, and a path forward. I
            mentor engineers at all levels, helping them grow their judgment,
            technical confidence, and ability to deliver under pressure.
            Whether guiding long-term platform strategy or unblocking a team in
            the middle of a release, I bring a steady, pragmatic leadership
            style that elevates both people and outcomes.
          </p>
        </>
      ),
      title: 'How I Lead Engineering Teams',
    },
    label: 'Engineering Leader',
  },
  {
    children: (
      <>
        <img alt="Software Engineer" src={require('@site/src/pages/img/technologist.webp').default} />
        <Reveal coeff={2.5}>
          <>
            <i aria-hidden="true">Full Stack</i>
            Developer
          </>
        </Reveal>
      </>
    ),
    description: (
      <>
        <span>I </span>
        <Link href="/about" title="bridge front-end and back-end development">bridge front-end and back-end development</Link>
        <span> to build </span>
        <Link href="/portfolio" title="scalable, high-performing applications">scalable, high-performing applications</Link>
        <span>
          . My work connects systems, teams, and modern tooling to deliver fast
          iteration and real-world impact.
        </span>
      </>
    ),
    details: {
      content: (
        <>
          <p>
            As a full-stack engineer, I&nbsp;
            <Link href="/portfolio" title="design and build systems">design and build systems</Link>
            &nbsp;that span front-end interfaces, backend services, data flows,
            and cloud infrastructure. I&#39;m comfortable moving between layers
            - from React components and API design to distributed systems,
            event-driven architectures, and AWS-managed services. This&nbsp;
            <Link href="/resume" title="breadth">breadth</Link>
            &nbsp;allows me to connect disciplines, identify integration risks
            early, and deliver cohesive solutions that feel seamless to users
            and maintainable to teams.
          </p>
          <p>
            My work emphasizes performance, reliability, and long-term
            maintainability. I build systems that are observable, testable,
            and designed to evolve. Whether I&#39;m implementing a new feature,
            designing a service boundary, or debugging a production issue, I
            bring a deep understanding of how each layer affects the others.
            This holistic perspective helps teams ship faster, reduce
            complexity, and avoid the hidden costs that accumulate when systems
            are built in isolation.
          </p>
        </>
      ),
      title: 'How I Build End-to-End Systems',
    },
    label: 'Full Stack Developer',
  },
  {
    children: (
      <>
        <img alt="Unicorn" src={require('@site/src/pages/img/unicorn.webp').default} />
        <Reveal coeff={2.5}>Smart Creative</Reveal>
      </>
    ),
    description: (
      <>
        <span>I combine </span>
        <Link href="/about" title="engineering depth, creative thinking, and business strategy">engineering depth, creative thinking, and business strategy</Link>
        <span>
          &nbsp;to turn ideas into well-tested solutions. I work at the
          intersection of innovation and execution, using modern tools to
          accelerate exploration and sharpen product direction.
        </span>
      </>
    ),
    details: {
      content: (
        <>
          <p>
            I operate at the intersection of engineering, product strategy, and
            creative exploration.&nbsp;
            <Link href="/resume" title="My strength">My strength</Link>
            &nbsp;lies in taking ambiguous ideas - early concepts, rough
            sketches, half-formed requirements - and turning them into&nbsp;
            <Link href="/portfolio" title="well-tested, technically sound solutions">well-tested, technically sound solutions</Link>
            . I use modern tools, including generative AI, to accelerate
            ideation, validate assumptions, and explore multiple paths before
            committing to a direction.
          </p>
          <p>
            This mindset helps teams move faster without sacrificing quality.
            I challenge assumptions, simplify complexity, and uncover
            opportunities that might otherwise be missed. Whether brainstorming
            with product teams, prototyping new features, or evaluating
            architectural tradeoffs, I bring a creative yet grounded approach
            that balances innovation with execution. The result is solutions
            that are not only technically strong but strategically aligned with
            business goals.
          </p>
        </>
      ),
      title: 'How I Blend Engineering and Creative Problem-Solving',
    },
    label: 'Smart Creative',
  },
  {
    children: (
      <>
        <img alt="Rocket" src={require('@site/src/pages/img/rocket.webp').default} />
        <Reveal coeff={4}>Innovator</Reveal>
      </>
    ),
    description: (
      <>
        <span>
          With&nbsp;
          {humanizeYears(total, 'over')}
          &nbsp;of&nbsp;
        </span>
        <Link href="/timeline" title="experience and a deep foundation">experience and a deep foundation</Link>
        <span> in software engineering, I help organizations build resilient </span>
        <Link href="/portfolio" title="platforms and forward-looking solutions">platforms and forward-looking solutions</Link>
        <span>
          . I evolve with modern technology to deliver systems that stand the
          test of time.
        </span>
      </>
    ),
    details: {
      content: (
        <>
          <p>
            With&nbsp;
            <Link href="/timeline" title={humanizeYears(total, 'decades')}>{humanizeYears(total, 'decades')}</Link>
            &nbsp;of engineering experience, I&#39;ve seen multiple waves of
            technology - from early web systems to cloud-native architectures
            and modern event-driven platforms. This perspective helps me
            identify what truly matters:&nbsp;
            <Link href="/about" title="durability, clarity, and the ability to adapt">durability, clarity, and the ability to adapt</Link>
            . I design systems that stand the test of time, even as
            tools, frameworks, and best practices evolve.
          </p>
          <p>
            My work focuses on building resilient platforms, improving
            architectural foundations, and helping organizations modernize
            without losing stability. I bring a&nbsp;
            <Link href="/stories" title="forward-looking mindset">forward-looking mindset</Link>
            &nbsp;grounded in practical experience, enabling teams to adopt new
            technologies thoughtfully rather than reactively. Whether evolving
            legacy systems, introducing new patterns, or shaping long-term
            technical strategy, I help organizations stay ahead of change while
            maintaining reliability and trust.
          </p>
        </>
      ),
      title: 'How I Drive Long-Term Technical Evolution',
    },
    label: 'Innovator',
  },
];

export const identity = {
  children: (
    <>
      <span>Hello, I&#39;m </span>
      <span className="name" translate="no">Ricky Huang</span>
    </>
  ),
  ipa: '/ˈɹɪki ˈhwɑːŋ/',
};

export const image = {
  alt: 'Ricky Huang',
  picture: {
    // Safari doesn't support transparent avif.
    // avif: require('@site/src/pages/img/self.avif').default,
    fallback: require('@site/src/pages/img/self.png'),
    webp: require('@site/src/pages/img/self.webp').default,
  },
};

export const layout: LayoutProps = {
  description: oneLine(`Welcome to Ricky Huang's site - engineering leader,
    full stack developer, and innovator with decades of software expertise.`),
  keywords: [
    'engineering leader',
    'full stack developer',
    'software engineer',
    'technology strategist',
    'creative technologist',
    'innovation',
    'personal website',
    'professional portfolio',
    'ricky huang',
  ],
  metadatas: [
    /*
    <link
      as="font"
      fetchPriority="high"
      href={require('@site/src/font/yesevaone/OpNJno4ck8vc-xYpwWWxli1VWzfAw0Y.woff2').default}
      key={0}
      rel="preload"
      type="font/woff2"
    />,
    */
    <link
      as="image"
      fetchPriority="high"
      href={require('@site/src/pages/img/hero.webp').default}
      key={1}
      rel="preload"
      type="image/webp"
    />,
  ],
  title: 'Engineering Leadership & Full Stack Innovation',
};

export const preamble: PreambleProps = {
  description: oneLine(`I design and deliver cloud-native, distributed
    platforms that power high-volume, business-critical products. With
    ${humanizeYears(total, 'plus')} of hands-on engineering experience, I bring
    clarity, technical depth, and strong architectural judgment to complex
    problems.`),
  title: 'Engineering Leader & Full-Stack Architect Building Scalable, Resilient Systems',
};

export const socials: SocialProps[] = [
  { href: 'https://github.com/rickypc', Icon: FaGithub, title: 'Github' },
  {
    href: 'https://www.linkedin.com/in/rihuang',
    Icon: FaLinkedin,
    title: 'Linkedin',
  },
];
