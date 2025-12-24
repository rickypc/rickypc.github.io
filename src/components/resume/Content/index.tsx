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
  type HeaderProps,
  type HeadingProps,
  leadership,
  skills,
  storyMap,
  strengths,
  summary,
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
          <Heading as="h3">
            <Link href={`/timeline#${certification.key}`}>
              {`${timelineMap[certification.key].title.children} - ${timelineMap[certification.key].affiliation.children} (${timelineMap[certification.key].year.replace(/\s+/g, '')})`}
            </Link>
          </Heading>
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
          <Heading as="h3">
            <Link href={`/timeline#${education.key}`}>
              {`${timelineMap[education.key].title.children} - ${timelineMap[education.key].affiliation.children} (${timelineMap[education.key].year.replace(/\s+/g, '')})`}
            </Link>
          </Heading>
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
        <Link href={`/portfolio#${summary.key}`} title={`Visit ${catalogMap[summary.key].title} portfolio`}>
          {catalogMap[summary.key].title}
        </Link>
      </strong>
      &nbsp;-&nbsp;
      {summary.content}
      &nbsp;
      <em>
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
          <Heading as="h3">
            <Link href={`/timeline#${experience.key}`}>
              {`${timelineMap[experience.key].title.children} - ${timelineMap[experience.key].affiliation.children} (${timelineMap[experience.key].year.replace(/\s+/g, '')})`}
            </Link>
          </Heading>
          {experience.summaries.map((summary) => (
            <Experience key={summary.key} summary={summary} />
          ))}
          {experience.achievements}
        </Fragment>
      ))}
    </Block>
  );
});

const Header = memo(function Header({ siteConfig }: HeaderProps) {
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

const Summary = memo(function Summary() {
  return (
    <Block className={styles.summary} heading={summary.heading}>
      <p>{summary.content}</p>
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
  const { siteConfig } = useDocusaurusContext();
  return (
    <>
      <Header siteConfig={siteConfig} />
      <Summary />
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
