/*!
 * Copyright © 2015 Richard Huang <rickypc@users.noreply.github.com>
 * All rights reserved.
 */

import { clsx, textContent } from '@site/src/data/common';
import {
  catalogMap,
  certifications,
  codeBackground,
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
import {
  Fragment,
  memo,
  type PropsWithChildren,
  type ReactElement,
  useMemo,
} from 'react';
import Heading from '@theme/Heading';
import { image } from '@site/src/data/home';
import Link from '@site/src/components/common/Link';
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
} from 'motion/react';
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
    title?: string;
  };
};

type TestimonialProps = {
  testimonial: {
    key: string;
  };
};

const Activity = memo(function Activity({ entry }: ActivityProps) {
  const timeline = timelineMap[entry.key];
  return (
    <Heading as="h3">
      <span className={styles.role}>
        <Link className={styles.title} href={`/timeline#${entry.key}`}>
          {timeline.title.children}
        </Link>
        <span className={styles.separator}>, </span>
        <span className={styles.affiliation}>{timeline.affiliation.children}</span>
      </span>
      <span className={styles.year}>{entry.year || timeline.year}</span>
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

const CodeBackground = memo(function CodeBackground() {
  const { scrollYProgress } = useScroll();
  const y = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, -250]),
    { damping: 30, mass: 0.1, stiffness: 500 },
  );
  return (
    <motion.aside className={styles.background} style={{ y }}>
      {codeBackground.content}
    </motion.aside>
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
  const catalog = catalogMap[summary.key];
  const tags = catalog.tags.join(', ');
  const title = summary.title || catalog.title;
  return (
    <article aria-label={title} data-project={summary.key}>
      <strong>
        <em>
          <Link href={`/portfolio#${summary.key}`} title={`Visit ${title}`}>
            {title}
          </Link>
        </em>
      </strong>
      &nbsp;-&nbsp;
      {summary.content}
      &nbsp;
      <em className={styles.tags}>
        (
        {tags}
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
  const props = useMemo(() => header({ siteConfig }), [siteConfig]);
  return (
    <Block as="header" className={styles.header} heading={props.heading}>
      <p>{props.roles}</p>
      <p className={styles.contacts}>{props.contacts}</p>
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

const QRCode = memo(function QRCode() {
  return (
    <svg className={styles.qr} height="600" width="600" viewBox="0 0 29 29" role="img">
      <title>ricky.one</title>
      <path fill="transparent" d="M0,0 h29v29H0z" shapeRendering="crispEdges" />
      <path fill="currentColor" d="M0 0h7v1H0zM14 0h2v1H14zM18 0h1v1H18zM20 0h1v1H20zM22,0 h7v1H22zM0 1h1v1H0zM6 1h1v1H6zM9 1h1v1H9zM12 1h3v1H12zM16 1h1v1H16zM19 1h2v1H19zM22 1h1v1H22zM28,1 h1v1H28zM0 2h1v1H0zM2 2h3v1H2zM6 2h1v1H6zM9 2h3v1H9zM13 2h1v1H13zM16 2h1v1H16zM18 2h1v1H18zM20 2h1v1H20zM22 2h1v1H22zM24 2h3v1H24zM28,2 h1v1H28zM0 3h1v1H0zM2 3h3v1H2zM6 3h1v1H6zM9 3h7v1H9zM17 3h1v1H17zM19 3h1v1H19zM22 3h1v1H22zM24 3h3v1H24zM28,3 h1v1H28zM0 4h1v1H0zM2 4h3v1H2zM6 4h1v1H6zM8 4h1v1H8zM10 4h1v1H10zM12 4h2v1H12zM15 4h1v1H15zM17 4h1v1H17zM19 4h1v1H19zM22 4h1v1H22zM24 4h3v1H24zM28,4 h1v1H28zM0 5h1v1H0zM6 5h1v1H6zM11 5h4v1H11zM16 5h1v1H16zM19 5h2v1H19zM22 5h1v1H22zM28,5 h1v1H28zM0 6h7v1H0zM8 6h1v1H8zM10 6h1v1H10zM12 6h1v1H12zM14 6h1v1H14zM16 6h1v1H16zM18 6h1v1H18zM20 6h1v1H20zM22,6 h7v1H22zM8 7h4v1H8zM16 7h3v1H16zM20 7h1v1H20zM2 8h2v1H2zM6 8h7v1H6zM14 8h1v1H14zM20 8h3v1H20zM24 8h1v1H24zM0 9h1v1H0zM2 9h1v1H2zM4 9h2v1H4zM8 9h1v1H8zM10 9h1v1H10zM12 9h3v1H12zM16 9h2v1H16zM21 9h1v1H21zM24 9h3v1H24zM28,9 h1v1H28zM0 10h3v1H0zM4 10h1v1H4zM6 10h1v1H6zM9 10h1v1H9zM22 10h1v1H22zM24 10h1v1H24zM27 10h1v1H27zM1 11h1v1H1zM5 11h1v1H5zM8 11h2v1H8zM19 11h1v1H19zM23 11h2v1H23zM28,11 h1v1H28zM0 12h1v1H0zM2 12h2v1H2zM5 12h2v1H5zM8 12h2v1H8zM21 12h1v1H21zM23 12h1v1H23zM26,12 h3v1H26zM4 13h1v1H4zM7 13h3v1H7zM19 13h1v1H19zM22 13h2v1H22zM25 13h2v1H25zM28,13 h1v1H28zM1 14h3v1H1zM6 14h3v1H6zM19 14h1v1H19zM21 14h1v1H21zM23 14h3v1H23zM28,14 h1v1H28zM0 15h6v1H0zM7 15h2v1H7zM19 15h1v1H19zM21 15h2v1H21zM24 15h2v1H24zM1 16h1v1H1zM6 16h1v1H6zM20 16h6v1H20zM28,16 h1v1H28zM1 17h4v1H1zM8 17h2v1H8zM19 17h2v1H19zM22 17h1v1H22zM26 17h1v1H26zM0 18h1v1H0zM3 18h4v1H3zM19 18h1v1H19zM22 18h5v1H22zM2 19h1v1H2zM4 19h2v1H4zM11 19h1v1H11zM14 19h3v1H14zM18 19h2v1H18zM21 19h2v1H21zM25 19h2v1H25zM28,19 h1v1H28zM1 20h2v1H1zM5 20h2v1H5zM10 20h2v1H10zM13 20h1v1H13zM18 20h1v1H18zM20 20h7v1H20zM28,20 h1v1H28zM8 21h1v1H8zM10 21h4v1H10zM15 21h1v1H15zM19 21h2v1H19zM24 21h2v1H24zM28,21 h1v1H28zM0 22h7v1H0zM8 22h2v1H8zM11 22h4v1H11zM19 22h2v1H19zM22 22h1v1H22zM24 22h1v1H24zM26 22h2v1H26zM0 23h1v1H0zM6 23h1v1H6zM9 23h1v1H9zM14 23h1v1H14zM20 23h1v1H20zM24 23h1v1H24zM27 23h1v1H27zM0 24h1v1H0zM2 24h3v1H2zM6 24h1v1H6zM10 24h4v1H10zM15 24h3v1H15zM20,24 h9v1H20zM0 25h1v1H0zM2 25h3v1H2zM6 25h1v1H6zM8 25h1v1H8zM11 25h1v1H11zM13 25h2v1H13zM18 25h2v1H18zM24 25h2v1H24zM27 25h1v1H27zM0 26h1v1H0zM2 26h3v1H2zM6 26h1v1H6zM8 26h1v1H8zM10 26h2v1H10zM13 26h1v1H13zM16 26h2v1H16zM20 26h1v1H20zM23 26h1v1H23zM25 26h2v1H25zM28,26 h1v1H28zM0 27h1v1H0zM6 27h1v1H6zM9 27h1v1H9zM12 27h1v1H12zM19 27h1v1H19zM21 27h1v1H21zM24 27h2v1H24zM27 27h1v1H27zM0 28h7v1H0zM9 28h1v1H9zM13 28h2v1H13zM16 28h3v1H16zM20 28h2v1H20zM23 28h1v1H23zM27 28h1v1H27z" shapeRendering="crispEdges" />
      <image href={image.picture.fallback.src} height="7.25" width="7.25" x="10.875" y="10.875" preserveAspectRatio="none" opacity="1" />
    </svg>
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

const Testimonial = memo(function Testimonial({ testimonial }: TestimonialProps) {
  return (
    <li>
      &#34;
      <Link href={`/stories#${testimonial.key}`}>
        {storyMap[testimonial.key].overview}
      </Link>
      &#34;
    </li>
  );
});

const Testimonials = memo(function Testimonials() {
  return (
    <Block className={styles.testimonials} heading={testimonials.heading}>
      <ul>
        {testimonials.content.map((testimonial) => (
          <Testimonial key={testimonial.key} testimonial={testimonial} />
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
      <QRCode />
      <CodeBackground />
    </>
  );
});
