/*!
 * All the code that follow is
 * Copyright (c) 2015 - 2025 Richard Huang <rickypc@users.noreply.github.com>.
 * All Rights Reserved. Not for reuse without permission.
 */

import { clsx, textContent } from '@site/src/data/common';
import {
  catalogMap,
  certifications,
  educations,
  experiences,
  header,
  type HeadingProps,
  leadership,
  preamble,
  skills,
  storyMap,
  strengths,
  testimonials,
  timelineMap,
} from '@site/src/data/resume';
import Heading from '@theme/Heading';
import Link from '@site/src/components/common/Link';
import {
  Fragment,
  memo,
  type PropsWithChildren,
  type ReactElement,
} from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import styles from './styles.module.css';

type ActivityProps = {
  entry: {
    key: string;
    year?: string;
  };
};

type BlockProps = {
  as?: 'header' | 'section';
  className?: string;
  heading: HeadingProps;
};

type ExperienceProps = {
  summary: {
    content: string;
    key: string;
  };
};

const Activity = memo(function Activity({ entry }: ActivityProps) {
  const timeline = timelineMap[entry.key];
  const year = (entry.year || timeline.year).replace(/\s+/g, '');
  return (
    <Heading as="h3">
      <Link href={`/timeline#${entry.key}`}>
        {`${timeline.title.children} - ${timeline.affiliation.children} (${year})`}
      </Link>
    </Heading>
  );
});

const Block = memo(function Block({
  as: As = 'section',
  children,
  className,
  heading,
}: PropsWithChildren<BlockProps>): ReactElement {
  const role = As === 'header' ? 'banner' : undefined;
  return (
    <As aria-label={textContent(heading.children)} className={clsx(className, 'row', styles.block)} role={role}>
      <div className={clsx('col', styles.col, 'col--10', 'col--offset-1')}>
        <Heading {...heading}>{heading.children}</Heading>
        {children}
      </div>
    </As>
  );
});

const Certifications = memo(function Certifications() {
  return (
    <Block className={styles.certifications} heading={certifications.heading}>
      {certifications.content.map((certification) => (
        <Fragment key={certification.key}>
          <Activity entry={certification} />
          {certification.achievements}
        </Fragment>
      ))}
    </Block>
  );
});

const Educations = memo(function Educations() {
  return (
    <Block className={styles.educations} heading={educations.heading}>
      {educations.content.map((education) => (
        <Fragment key={education.key}>
          <Activity entry={education} />
          {education.achievements}
        </Fragment>
      ))}
    </Block>
  );
});

const Experience = memo(function Experience({ summary }: ExperienceProps) {
  return (
    <article aria-label={catalogMap[summary.key].title}>
      <strong>
        <em>
          <Link href={`/portfolio#${summary.key}`} title={`Visit ${catalogMap[summary.key].title} portfolio`}>
            {catalogMap[summary.key].title}
          </Link>
        </em>
      </strong>
      &nbsp;-&nbsp;
      {summary.content}
      &nbsp;
      <em className={styles.tags}>
        (
        {catalogMap[summary.key].tags.join(', ')}
        )
      </em>
    </article>
  );
});

const Experiences = memo(function Experiences() {
  return (
    <Block className={styles.experiences} heading={experiences.heading}>
      {experiences.content.map((experience) => (
        <Fragment key={experience.key}>
          <Activity entry={experience} />
          {experience.summaries.map((summary) => (
            <Experience key={summary.key} summary={summary} />
          ))}
          {experience.achievements}
        </Fragment>
      ))}
    </Block>
  );
});

const Header = memo(function Header() {
  const { siteConfig } = useDocusaurusContext();
  const props = header({ siteConfig });
  return (
    <Block as="header" className={styles.header} heading={props.heading}>
      <p>{props.roles}</p>
      <p>{props.contacts}</p>
    </Block>
  );
});

const Leadership = memo(function Leadership() {
  return (
    <Block className={styles.leadership} heading={leadership.heading}>
      {leadership.children}
    </Block>
  );
});

const Preamble = memo(function Preamble() {
  return (
    <Block className={styles.preamble} heading={preamble.heading}>
      <p>{preamble.content}</p>
    </Block>
  );
});

const Skills = memo(function Skills() {
  return (
    <Block className={styles.skills} heading={skills.heading}>
      {skills.children}
    </Block>
  );
});

const Strengths = memo(function Strengths() {
  return (
    <Block className={styles.strengths} heading={strengths.heading}>
      {strengths.children}
    </Block>
  );
});

const Testimonials = memo(function Testimonials() {
  return (
    <Block className={styles.testimonials} heading={testimonials.heading}>
      <ul>
        {testimonials.content.map((testimonial) => (
          <li key={testimonial.key}>
            &#34;
            <Link href={`/stories#${testimonial.key}`}>
              {storyMap[testimonial.key].overview}
            </Link>
            &#34;
          </li>
        ))}
      </ul>
    </Block>
  );
});

export default memo(function Content() {
  return (
    <>
      <Header />
      <Preamble />
      <Strengths />
      <Leadership />
      <Experiences />
      <Educations />
      <Certifications />
      <Skills />
      <Testimonials />
    </>
  );
});
