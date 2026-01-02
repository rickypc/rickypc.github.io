/*!
 * Copyright © 2015 Richard Huang <rickypc@users.noreply.github.com>
 * All rights reserved.
 */

import { catalogMap } from '@site/src/data/portfolio';
import { type ComponentProps, type ReactElement } from 'react';
import { type DocusaurusConfig } from '@docusaurus/types';
import { FaGithub, FaLinkedin } from '@site/src/data/home';
import { GenIcon } from 'react-icons/lib';
import Heading from '@theme/Heading';
import { type IconBaseProps } from 'react-icons';
import { type LayoutProps } from '@site/src/components/common/Layout';
import Link from '@site/src/components/common/Link';
import { type ThemeConfig } from '@docusaurus/preset-classic';

type HeaderProps = {
  siteConfig: DocusaurusConfig;
};

export type HeadingProps = ComponentProps<typeof Heading>;
type HeadingType = HeadingProps['as'];

/**
 * Renders the `Testimonials` icon.
 * @param {object} props - React props passed to the icon component.
 * @param {string} [props.className] - Optional CSS class for styling.
 * @param {object} [props.style] - Optional inline styles.
 * @param {string} [props.title] - Optional title for accessibility.
 * @returns {object} The icon.
 */
function BsChatQuote(props: IconBaseProps): ReactElement {
  return GenIcon({ tag: 'svg', attr: { fill: 'currentColor', viewBox: '0 0 16 16' }, child: [{ tag: 'path', attr: { d: 'M2.678 11.894a1 1 0 0 1 .287.801 11 11 0 0 1-.398 2c1.395-.323 2.247-.697 2.634-.893a1 1 0 0 1 .71-.074A8 8 0 0 0 8 14c3.996 0 7-2.807 7-6s-3.004-6-7-6-7 2.808-7 6c0 1.468.617 2.83 1.678 3.894m-.493 3.905a22 22 0 0 1-.713.129c-.2.032-.352-.176-.273-.362a10 10 0 0 0 .244-.637l.003-.01c.248-.72.45-1.548.524-2.319C.743 11.37 0 9.76 0 8c0-3.866 3.582-7 8-7s8 3.134 8 7-3.582 7-8 7a9 9 0 0 1-2.347-.306c-.52.263-1.639.742-3.468 1.105' }, child: [] }, { tag: 'path', attr: { d: 'M7.066 6.76A1.665 1.665 0 0 0 4 7.668a1.667 1.667 0 0 0 2.561 1.406c-.131.389-.375.804-.777 1.22a.417.417 0 0 0 .6.58c1.486-1.54 1.293-3.214.682-4.112zm4 0A1.665 1.665 0 0 0 8 7.668a1.667 1.667 0 0 0 2.561 1.406c-.131.389-.375.804-.777 1.22a.417.417 0 0 0 .6.58c1.486-1.54 1.293-3.214.682-4.112z' }, child: [] }] })(props);
}

/**
 * Renders the `Leadership` icon.
 * @param {object} props - React props passed to the icon component.
 * @param {string} [props.className] - Optional CSS class for styling.
 * @param {object} [props.style] - Optional inline styles.
 * @param {string} [props.title] - Optional title for accessibility.
 * @returns {object} The icon.
 */
function BsGraphUpArrow(props: IconBaseProps): ReactElement {
  return GenIcon({ tag: 'svg', attr: { fill: 'currentColor', viewBox: '0 0 16 16' }, child: [{ tag: 'path', attr: { fillRule: 'evenodd', d: 'M0 0h1v15h15v1H0zm10 3.5a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 .5.5v4a.5.5 0 0 1-1 0V4.9l-3.613 4.417a.5.5 0 0 1-.74.037L7.06 6.767l-3.656 5.027a.5.5 0 0 1-.808-.588l4-5.5a.5.5 0 0 1 .758-.06l2.609 2.61L13.445 4H10.5a.5.5 0 0 1-.5-.5' }, child: [] }] })(props);
}

/**
 * Renders the `Location` icon.
 * @param {object} props - React props passed to the icon component.
 * @param {string} [props.className] - Optional CSS class for styling.
 * @param {object} [props.style] - Optional inline styles.
 * @param {string} [props.title] - Optional title for accessibility.
 * @returns {object} The icon.
 */
function FaLocationDot(props: IconBaseProps): ReactElement {
  return GenIcon({ tag: 'svg', attr: { viewBox: '0 0 384 512' }, child: [{ tag: 'path', attr: { d: 'M215.7 499.2C267 435 384 279.4 384 192C384 86 298 0 192 0S0 86 0 192c0 87.4 117 243 168.3 307.2c12.3 15.3 35.1 15.3 47.4 0zM192 128a64 64 0 1 1 0 128 64 64 0 1 1 0-128z' }, child: [] }] })(props);
}

/**
 * Renders the `Certifications` icon.
 * @param {object} props - React props passed to the icon component.
 * @param {string} [props.className] - Optional CSS class for styling.
 * @param {object} [props.style] - Optional inline styles.
 * @param {string} [props.title] - Optional title for accessibility.
 * @returns {object} The icon.
 */
function GrCertificate(props: IconBaseProps): ReactElement {
  return GenIcon({ tag: 'svg', attr: { fill: 'none', viewBox: '0 0 24 24' }, child: [{ tag: 'path', attr: { strokeWidth: '2', d: 'M15 19H2V1h16v4m0 0a5 5 0 110 10 5 5 0 010-10zm-3 9v8l3-2 3 2v-8M5 8h6m-6 3h5m-5 3h2M5 5h2' }, child: [] }] })(props);
}

/**
 * Renders the `Summary` icon.
 * @param {object} props - React props passed to the icon component.
 * @param {string} [props.className] - Optional CSS class for styling.
 * @param {object} [props.style] - Optional inline styles.
 * @param {string} [props.title] - Optional title for accessibility.
 * @returns {object} The icon.
 */
function HiOutlineIdentification(props: IconBaseProps): ReactElement {
  return GenIcon({
    attr: {
      'aria-hidden': 'true',
      fill: 'none',
      stroke: 'currentColor',
      strokeWidth: '2',
      viewBox: '0 0 24 24',
    },
    child: [{ tag: 'path', attr: { strokeLinecap: 'round', strokeLinejoin: 'round', d: 'M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2' }, child: [] }],
    tag: 'svg',
  })(props);
}

/**
 * Renders the `Skills` icon.
 * @param {object} props - React props passed to the icon component.
 * @param {string} [props.className] - Optional CSS class for styling.
 * @param {object} [props.style] - Optional inline styles.
 * @param {string} [props.title] - Optional title for accessibility.
 * @returns {object} The icon.
 */
function HiOutlineWrenchScrewdriver(props: IconBaseProps): ReactElement {
  return GenIcon({
    attr: {
      'aria-hidden': 'true',
      fill: 'none',
      stroke: 'currentColor',
      strokeWidth: '1.5',
      viewBox: '0 0 24 24',
    },
    child: [{ tag: 'path', attr: { strokeLinecap: 'round', strokeLinejoin: 'round', d: 'M11.42 15.17 17.25 21A2.652 2.652 0 0 0 21 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 1 1-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 0 0 4.486-6.336l-3.276 3.277a3.004 3.004 0 0 1-2.25-2.25l3.276-3.276a4.5 4.5 0 0 0-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437 1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008Z' }, child: [] }],
    tag: 'svg',
  })(props);
}

/**
 * Renders the `Globe` icon.
 * @param {object} props - React props passed to the icon component.
 * @param {string} [props.className] - Optional CSS class for styling.
 * @param {object} [props.style] - Optional inline styles.
 * @param {string} [props.title] - Optional title for accessibility.
 * @returns {object} The icon.
 */
function LiaGlobeAmericasSolid(props: IconBaseProps): ReactElement {
  return GenIcon({ tag: 'svg', attr: { viewBox: '0 0 32 32' }, child: [{ tag: 'path', attr: { d: 'M 16 3 C 8.832 3 3 8.832 3 16 C 3 23.168 8.832 29 16 29 C 23.168 29 29 23.168 29 16 C 29 8.832 23.168 3 16 3 z M 16 5 C 16.338 5 16.67 5.0207813 17 5.0507812 L 17 6 L 19 6 L 19 5.4257812 C 21.458 6.1247812 23.566 7.6543125 25 9.6953125 L 25 13 L 26 15 L 26 16 L 27 16 C 27 16.366 26.980312 16.728938 26.945312 17.085938 C 26.936312 17.181938 26.916297 17.274141 26.904297 17.369141 C 26.871297 17.632141 26.837156 17.893391 26.785156 18.150391 C 26.766156 18.246391 26.74075 18.340547 26.71875 18.435547 C 26.66075 18.689547 26.598437 18.942453 26.523438 19.189453 C 26.497438 19.274453 26.467453 19.357406 26.439453 19.441406 C 26.355453 19.695406 26.266063 19.947359 26.164062 20.193359 C 26.134062 20.265359 26.101312 20.33525 26.070312 20.40625 C 25.958313 20.66125 25.840938 20.91225 25.710938 21.15625 C 25.679938 21.21525 25.646281 21.273078 25.613281 21.330078 C 25.473281 21.582078 25.325016 21.826406 25.166016 22.066406 C 25.135016 22.113406 25.102312 22.161984 25.070312 22.208984 C 24.902313 22.453984 24.724109 22.691875 24.537109 22.921875 C 24.506109 22.959875 24.478266 22.996203 24.447266 23.033203 C 24.253266 23.266203 24.047937 23.489078 23.835938 23.705078 C 23.804938 23.736078 23.775141 23.769781 23.744141 23.800781 C 23.527141 24.015781 23.300406 24.221969 23.066406 24.417969 C 23.033406 24.445969 23.004703 24.474953 22.970703 24.501953 C 22.736703 24.693953 22.491187 24.872922 22.242188 25.044922 C 22.203187 25.071922 22.167906 25.102906 22.128906 25.128906 C 21.889906 25.289906 21.640672 25.436125 21.388672 25.578125 C 20.214672 26.237125 18.909578 26.690859 17.517578 26.880859 L 21.529297 23.857422 L 22.628906 22.757812 L 24 20 L 24 19 L 22 18 L 21 18 L 19 16 L 17 16 L 16 17 L 16 18 L 15 19 L 15 21 L 17 22.599609 L 15.023438 26.951172 C 9.4144375 26.453172 5 21.735 5 16 C 5 12.592 6.559 9.5414844 9 7.5214844 L 9 8 L 8 9 L 8 11.199219 L 9 15 L 14 17 L 15 17 L 15 16 L 12 15 L 12 13 L 15 13 L 16 10.5 L 18 9 L 18 8 L 15 6 L 13.5625 5.28125 C 14.3475 5.10325 15.161 5 16 5 z M 15 14 L 15 15 L 17 15 L 17 14 L 15 14 z' }, child: [] }] })(props);
}

/**
 * Renders the `Experience` icon.
 * @param {object} props - React props passed to the icon component.
 * @param {string} [props.className] - Optional CSS class for styling.
 * @param {object} [props.style] - Optional inline styles.
 * @param {string} [props.title] - Optional title for accessibility.
 * @returns {object} The icon.
 */
function MdOutlineWorkHistory(props: IconBaseProps): ReactElement {
  return GenIcon({ tag: 'svg', attr: { viewBox: '0 0 24 24' }, child: [{ tag: 'path', attr: { fill: 'none', d: 'M0 0h24v24H0z' }, child: [] }, { tag: 'path', attr: { d: 'M4 19V8h16v3.29c.72.22 1.4.54 2 .97V8c0-1.11-.89-2-2-2h-4V4c0-1.11-.89-2-2-2h-4c-1.11 0-2 .89-2 2v2H4c-1.11 0-1.99.89-1.99 2L2 19c0 1.11.89 2 2 2h7.68c-.3-.62-.5-1.29-.6-2H4zm6-15h4v2h-4V4z' }, child: [] }, { tag: 'path', attr: { d: 'M18 13c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zm1.65 7.35L17.5 18.2V15h1v2.79l1.85 1.85-.7.71z' }, child: [] }] })(props);
}

/**
 * Renders the `Education` icon.
 * @param {object} props - React props passed to the icon component.
 * @param {string} [props.className] - Optional CSS class for styling.
 * @param {object} [props.style] - Optional inline styles.
 * @param {string} [props.title] - Optional title for accessibility.
 * @returns {object} The icon.
 */
function PiGraduationCapBold(props: IconBaseProps): ReactElement {
  return GenIcon({ tag: 'svg', attr: { viewBox: '0 0 256 256', fill: 'currentColor' }, child: [{ tag: 'path', attr: { d: 'M249.8,85.49l-116-64a12,12,0,0,0-11.6,0l-116,64a12,12,0,0,0,0,21l21.8,12v47.76a19.89,19.89,0,0,0,5.09,13.32C46.63,194.7,77,220,128,220a136.88,136.88,0,0,0,40-5.75V240a12,12,0,0,0,24,0V204.12a119.53,119.53,0,0,0,30.91-24.51A19.89,19.89,0,0,0,228,166.29V118.53l21.8-12a12,12,0,0,0,0-21ZM128,45.71,219.16,96,186,114.3a1.88,1.88,0,0,1-.18-.12l-52-28.69a12,12,0,0,0-11.6,21l39,21.49L128,146.3,36.84,96ZM128,196c-40.42,0-64.65-19.07-76-31.27v-33l70.2,38.74a12,12,0,0,0,11.6,0L168,151.64v37.23A110.46,110.46,0,0,1,128,196Zm76-31.27a93.21,93.21,0,0,1-12,10.81V138.39l12-6.62Z' }, child: [] }] })(props);
}

/**
 * Renders the `Core Strengths` icon.
 * @param {object} props - React props passed to the icon component.
 * @param {string} [props.className] - Optional CSS class for styling.
 * @param {object} [props.style] - Optional inline styles.
 * @param {string} [props.title] - Optional title for accessibility.
 * @returns {object} The icon.
 */
function TbTargetArrow(props: IconBaseProps): ReactElement {
  return GenIcon({
    attr: {
      fill: 'none',
      stroke: 'currentColor',
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '2',
      viewBox: '0 0 24 24',
    },
    child: [{ tag: 'path', attr: { d: 'M12 12m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0' }, child: [] }, { tag: 'path', attr: { d: 'M12 7a5 5 0 1 0 5 5' }, child: [] }, { tag: 'path', attr: { d: 'M13 3.055a9 9 0 1 0 7.941 7.945' }, child: [] }, { tag: 'path', attr: { d: 'M15 6v3h3l3 -3h-3v-3z' }, child: [] }, { tag: 'path', attr: { d: 'M15 9l-3 3' }, child: [] }],
    tag: 'svg',
  })(props);
}

export { catalogMap };

export const certifications = {
  content: [
    {
      achievements: (
        <ul>
          <li>
            Mining Massive Datasets -&nbsp;
            <strong>
              <em>With Distinction</em>
            </strong>
          </li>
          <li>Machine Learning</li>
          <li>Automata</li>
        </ul>
      ),
      key: 'stanford',
    },
  ],
  heading: {
    as: 'h2' as HeadingType,
    children: (
      <>
        <GrCertificate />
        Certifications
      </>
    ),
  },
};

export const codeBackground = {
  content: `


use std::time::{Duration, Instant};

struct Task {
  id: u32,
  label: &'static str,
  progress: f32,
}

impl Task {
  fn new(id: u32, label: &'static str) -> Self {
    Self { id, label, progress: 0.0 }
  }
  fn update(&mut self, dt: f32) {
    self.progress = (self.progress + dt * 0.1).min(1.0);
  }
}

struct Scheduler {
  tasks: Vec<Task>,
  last: Instant,
}

impl Scheduler {
  fn new() -> Self {
    Self { tasks: vec![], last: Instant::now() }
  }
  fn add(&mut self, label: &'static str) {
    let id = self.tasks.len() as u32;
    self.tasks.push(Task::new(id, label));
  }
  fn tick(&mut self) {
    let dt = self.last.elapsed().as_secs_f32();
    for t in &mut self.tasks {
      t.update(dt);
    }
    self.last = Instant::now();
  }
  fn summary(&self) -> String {
    self.tasks
      .iter()
      .map(|t| format!("{}: {:.0}%", t.label, t.progress * 100.0))
      .collect::<Vec<_>>()
      .join(", ")
  }
}

fn compute_load(v: &[u32]) -> u32 {
  v.iter().fold(0, |a, b| a.wrapping_add(b.wrapping_mul(3)))
}

fn generate_series(n: usize) -> Vec<u32> {
  let mut x = 1u32;
  let mut out = Vec::with_capacity(n);
  for _ in 0..n {
    x = x.rotate_left(3) ^ 0x9e37;
    out.push(x);
  }
  out
}

struct Logger {
  entries: Vec<String>,
}

impl Logger {
  fn new() -> Self {
    Self { entries: vec![] }
  }
  fn log(&mut self, msg: String) {
    self.entries.push(msg);
  }
  fn flush(&self) {
    for e in &self.entries {
      println!("[log] {}", e);
    }
  }
}

fn normalize(v: &mut [f32]) {
  let sum: f32 = v.iter().sum();
  if sum > 0.0 {
    for x in v {
      *x /= sum;
    }
  }
}

fn smooth(v: &mut [f32]) {
  if v.len() < 3 {
    return;
  }
  let mut prev = v[0];
  for i in 1..v.len() - 1 {
    let current = v[i];
    let next = v[i + 1];
    v[i] = (prev + current + next) / 3.0;
    prev = current;
  }
}

struct Analyzer {
  buffer: Vec<f32>,
}

impl Analyzer {
  fn new() -> Self {
    Self { buffer: vec![0.0; 16] }
  }
  fn sample(&mut self, x: f32) {
    self.buffer.rotate_left(1);
    self.buffer[self.buffer.len() - 1] = x;
  }
  fn process(&mut self) {
    smooth(&mut self.buffer);
    normalize(&mut self.buffer);
  }
  fn score(&self) -> f32 {
    self.buffer.iter().enumerate().map(|(i, v)| *v * (i as f32)).sum()
  }
}

fn checksum(v: &[u8]) -> u32 {
  v.iter().fold(0u32, |a, b| a.wrapping_add((*b as u32).wrapping_mul(17)))
}

fn build_packet(id: u16, payload: &[u8]) -> Vec<u8> {
  let mut out = vec![(id >> 8) as u8, (id & 0xFF) as u8];
  out.extend_from_slice(payload);
  let sum = checksum(payload);
  out.extend_from_slice(&sum.to_be_bytes());
  out
}

fn simulate_io(logger: &mut Logger) {
  let payload = [1, 2, 3, 4, 5, 6];
  let packet = build_packet(42, &payload);
  logger.log(format!("packet {} bytes", packet.len()));
}

fn main() {
  let mut sched = Scheduler::new();
  let mut logger = Logger::new();
  let mut analyzer = Analyzer::new();

  sched.add("parse");
  sched.add("compile");
  sched.add("optimize");
  sched.add("emit");

  let series = generate_series(32);
  let load = compute_load(&series);

  for _ in 0..10 {
    sched.tick();
    analyzer.sample(sched.tasks.len() as f32);
    analyzer.process();
  }

  simulate_io(&mut logger);

  println!("load: {}", load);
  println!("tasks: {}", sched.summary());
  println!("score: {:.2}", analyzer.score());

  logger.flush();
}
  `,
};

export const educations = {
  content: [
    { achievements: (<article>Outstanding Graduate Project Award</article>), key: 'calstate-fullerton' },
    { key: 'petra' },
  ],
  heading: {
    as: 'h2' as HeadingType,
    children: (
      <>
        <PiGraduationCapBold />
        Education
      </>
    ),
  },
};

export const experiences = {
  content: [
    {
      achievements: (
        <ul>
          <li>
            Architect core platform services on AWS using Fargate, Lambda,
            API Gateway, DynamoDB, Kinesis, EventBridge, and SQS/SNS
          </li>
          <li>
            Design and implement distributed systems for high-volume,
            business-critical workloads
          </li>
          <li>
            Build deep observability into services using Datadog, enabling
            faster incident detection and resolution
          </li>
          <li>
            Lead cross-team architectural direction, technical standards, and
            long-term platform strategy
          </li>
          <li>
            Mentor engineers and guide complex technical decisions across
            multiple teams
          </li>
          <li>
            Recognized with Platinum Aspire, EMF Hero - Above & Beyond, and
            multiple Spot Awards for technical leadership and impact
          </li>
        </ul>
      ),
      key: 'experian',
      summaries: [{ content: catalogMap.experian.summary, key: 'experian' }],
      year: '2013 - Present',
    },
    {
      achievements: (
        <ul>
          <li>Led engineering teams delivering large-scale email and marketing systems</li>
          <li>Designed backend services, APIs, and high-throughput data pipelines</li>
          <li>Awarded the Pinnacle Award for engineering excellence</li>
        </ul>
      ),
      key: 'cheetahmail',
      summaries: [{ content: catalogMap.cheetahmail.summary, key: 'cheetahmail' }],
    },
    {
      achievements: (
        <ul>
          <li>Built real-time GPS tracking and telemetry systems</li>
          <li>Designed backend services and data flows for high-frequency location data</li>
        </ul>
      ),
      key: 'airiq',
      summaries: [{ content: catalogMap.airiq.summary, key: 'airiq' }],
    },
    {
      achievements: (
        <ul>
          <li>Built full-stack e-commerce systems supporting high-traffic ticketing operations</li>
          <li>Delivered features end-to-end across front-end, backend, and database layers</li>
        </ul>
      ),
      key: 'razorgator',
      summaries: [
        { content: catalogMap['yahoo-tickets'].summary, key: 'yahoo-tickets' },
        { content: catalogMap.razorgator.summary, key: 'razorgator' },
      ],
    },
    {
      achievements: (
        <ul>
          <li>
            Architect and deliver production-ready systems across diverse
            industries, from media and retail to logistics and engineering
            services
          </li>
          <li>
            Provide deep engineering expertise, technical leadership, and
            end-to-end ownership across full-stack development
          </li>
          <li>
            Design scalable architectures, data flows, and integration patterns
            for high-traffic and commerce-driven platforms
          </li>
          <li>
            Collaborate directly with founders, executives, and
            cross-functional teams to translate business goals into technical
            solutions
          </li>
          <li>
            Lead delivery of multiple concurrent projects while maintaining
            quality, performance, and long-term maintainability
          </li>
        </ul>
      ),
      key: 'self-employed',
      summaries: [
        { content: catalogMap.gigaom.summary, key: 'gigaom' },
        { content: catalogMap['rainbow-guitars'].summary, key: 'rainbow-guitars' },
        { content: catalogMap['fortini-home'].summary, key: 'fortini-home' },
        { content: catalogMap['exhibit-transport'].summary, key: 'exhibit-transport' },
        { content: catalogMap['sm-bikes'].summary, key: 'sm-bikes' },
        { content: catalogMap['clipper-corp'].summary, key: 'clipper-corp' },
        { content: catalogMap.anchorblue.summary, key: 'anchorblue' },
        { content: catalogMap.wheelbuilder.summary, key: 'wheelbuilder' },
        { content: catalogMap['pacifica-services'].summary, key: 'pacifica-services' },
      ],
    },
  ],
  heading: {
    as: 'h2' as HeadingType,
    children: (
      <>
        <MdOutlineWorkHistory />
        Experience
      </>
    ),
  },
};

export const header = ({ siteConfig }: HeaderProps) => {
  const items = (siteConfig.themeConfig as ThemeConfig).navbar?.items || [];
  return {
    contacts: [
      <FaLocationDot key="location-icon" />,
      (
        <Link href="https://en.wikipedia.org/wiki/Orange_County,_California" key="county" translate="no">
          Orange County, CA
        </Link>
      ),
      <LiaGlobeAmericasSolid key="globe-icon" />,
      (
        <Link href={siteConfig.url} key="website" title="Visit website" translate="no">
          {new URL(siteConfig.url).hostname}
        </Link>
      ),
      <FaGithub key="github-icon" />,
      (
        <Link href={items.at(-2)?.to as string} key="github" translate="no">
          GitHub
        </Link>
      ),
      <FaLinkedin key="linkedin-icon" />,
      (
        <Link href={items.at(-1)?.to as string} key="linkedin" translate="no">
          LinkedIn
        </Link>
      ),
    ],
    heading: {
      as: 'h1' as HeadingType,
      children: (
        <Link href={siteConfig.url} translate="no">
          {siteConfig.title}
        </Link>
      ),
    },
    roles: [
      'Principal Engineer',
      ' • ',
      'Senior Software Engineer',
      ' • ',
      'Full-Stack Architect',
    ],
  };
};

export const layout: LayoutProps = {
  description: 'Principal Engineer resume with deep experience in cloud systems, backend architecture, and scalable platform design.',
  keywords: [
    'principal engineer resume',
    'software engineering leadership',
    'backend architecture',
    'distributed systems',
    'cloud engineering',
    'AWS architecture',
    'React development',
    'Go and Python engineering',
    'C# backend systems',
    'microservices design',
    'event-driven systems',
    'scalable platforms',
    'full-stack engineering',
    'technical lead',
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
  title: 'Principal Engineer Resume - Cloud & Distributed Systems',
};

export const leadership = {
  children: (
    <ul>
      <li>Define architecture and technical strategy across teams</li>
      <li>Hands-on problem solver for the hardest engineering challenges</li>
      <li>Mentor engineers and elevate team technical standards</li>
      <li>Balance long-term architecture with immediate delivery needs</li>
      <li>Communicate clearly across engineering, product, and leadership</li>
    </ul>
  ),
  heading: {
    as: 'h2' as HeadingType,
    children: (
      <>
        <BsGraphUpArrow />
        Leadership
      </>
    ),
  },
};

export const preamble = {
  content: 'Principal Engineer with 30+ years of experience architecting, building, and scaling production systems across cloud, distributed, and event-driven environments. I define technical direction, design end-to-end architectures, and deliver systems that are reliable, observable, and built to last. Equally comfortable writing code, designing APIs, reviewing architectures, or debugging complex failures in production. Known for clear technical judgment, deep hands-on expertise, and the ability to turn ambiguous problems into well-engineered solutions.',
  heading: {
    as: 'h2' as HeadingType,
    children: (
      <>
        <HiOutlineIdentification />
        Summary
      </>
    ),
  },
};

export const skills = {
  children: (
    <ul>
      <li>
        <strong>Cloud & Infrastructure:</strong>
        &nbsp;AWS Fargate, Lambda, API Gateway, ALB, Route 53, S3, VPC
      </li>
      <li>
        <strong>Event-Driven Systems:</strong>
        &nbsp;Kinesis, Firehose, EventBridge, SQS, SNS
      </li>
      <li>
        <strong>Databases:</strong>
        &nbsp;DynamoDB, MySQL, Oracle, SQL Server
      </li>
      <li>
        <strong>Languages:</strong>
        &nbsp;Python, Go (Golang), C#, PHP, TypeScript, Node.js
      </li>
      <li>
        <strong>AI & Modern Tooling:</strong>
        &nbsp;AWS Bedrock
      </li>
      <li>
        <strong>Observability:</strong>
        &nbsp;Datadog (APM, logs, metrics, dashboards)
      </li>
      <li>
        <strong>Architecture:</strong>
        &nbsp;Distributed systems, microservices, event-driven design, serverless
      </li>
      <li>
        <strong>DevOps:</strong>
        &nbsp;Docker, CI/CD, Git workflows
      </li>
      <li>
        <strong>Front-End:</strong>
        &nbsp;React, HTML5, CSS
      </li>
    </ul>
  ),
  heading: {
    as: 'h2' as HeadingType,
    children: (
      <>
        <HiOutlineWrenchScrewdriver />
        Skills
      </>
    ),
  },
};

export { storyMap } from '@site/src/data/stories';

export const strengths = {
  children: (
    <ul>
      <li>Architecture & system design for distributed, cloud-native platforms</li>
      <li>Hands-on engineering across Python, Go, C#, TypeScript, and Node.js</li>
      <li>AWS expertise: Fargate, Lambda, DynamoDB, Kinesis, EventBridge, SQS/ SNS</li>
      <li>Technical ownership: standards, code quality, observability, reliability</li>
      <li>Cross-functional leadership with clear technical direction</li>
      <li>Execution under pressure; trusted to deliver critical systems</li>
    </ul>
  ),
  heading: {
    as: 'h2' as HeadingType,
    children: (
      <>
        <TbTargetArrow />
        Core Strengths
      </>
    ),
  },
};

export const testimonials = {
  content: [
    { key: 'problem-solving-savior' },
    { key: 'master-of-many-trades' },
    { key: 'versatile-polymath' },
    { key: 'invested-partner' },
  ],
  heading: {
    as: 'h2' as HeadingType,
    children: (
      <>
        <BsChatQuote />
        Testimonials
      </>
    ),
  },
};

export { timelineMap } from '@site/src/data/timeline';
