/*!
 * All the code that follow is
 * Copyright (c) 2015 - 2025 Richard Huang <rickypc@users.noreply.github.com>.
 * All Rights Reserved. Not for reuse without permission.
 */

import { catalog } from '@site/src/data/portfolio';
import { type ComponentProps } from 'react';
import { type DocusaurusConfig } from '@docusaurus/types';
import Heading from '@theme/Heading';
import { type LayoutProps } from '@site/src/components/common/Layout';
import Link from '@site/src/components/common/Link';
import { stories } from '@site/src/data/stories';
import { type ThemeConfig } from '@docusaurus/preset-classic';
import { timelines } from '@site/src/data/timeline';

type HeaderProps = {
  siteConfig: DocusaurusConfig;
};

export type HeadingProps = ComponentProps<typeof Heading>;
type HeadingType = HeadingProps['as'];

export const catalogMap = Object.fromEntries(catalog.map((item) => [item.prefix, item]));

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
  heading: { as: 'h2' as HeadingType, children: 'Certifications' },
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
  heading: { as: 'h2' as HeadingType, children: 'Education' },
};

export const experiences = {
  content: [
    {
      achievements: (
        <ul>
          <li>
            Architect and build core platform services on AWS using Fargate,
            Lambda, API Gateway, DynamoDB, Kinesis, EventBridge, and SQS/SNS
          </li>
          <li>Design distributed systems for high-volume, business-critical workloads</li>
          <li>
            Instrument systems with Datadog for deep observability and
            fast incident resolution
          </li>
          <li>Lead cross-team technical direction and architectural standards</li>
          <li>Mentor engineers and guide complex technical decisions</li>
          <li>
            Recipient of Platinum Aspire, EMF Hero - Above & Beyond, and
            multiple Spot Awards
          </li>
        </ul>
      ),
      key: 'experian',
      summaries: [
        {
          content: 'Consumer credit and financial-wellness platform providing secure access to credit reports, credit scores, and Smart Money digital banking. Engineered for scale, reliability, and multi-channel delivery across web and mobile, serving millions of users.',
          key: 'experian',
        },
      ],
      year: '2013 - Present',
    },
    {
      achievements: (
        <ul>
          <li>Led engineering teams building large-scale email and marketing systems</li>
          <li>Designed backend services, APIs, and high-throughput data pipelines</li>
          <li>Recipient of the Pinnacle Award for engineering excellence</li>
        </ul>
      ),
      key: 'cheetahmail',
      summaries: [
        {
          content: 'Enterprise email marketing platform powering targeted campaigns for major global brands. Designed for massive throughput, segmentation, tracking, and reporting, supporting billions of emails per day with high reliability.',
          key: 'cheetahmail',
        },
      ],
    },
    {
      achievements: (
        <ul>
          <li>Built real-time GPS tracking and telemetry systems</li>
          <li>Designed backend services and data flows for high-frequency location data</li>
        </ul>
      ),
      key: 'airiq',
      summaries: [
        {
          content: 'Wireless asset-tracking platform providing real-time GPS monitoring for vehicles and equipment. Built with robust backend services and UI applications supporting telemetry, alerts, and location intelligence.',
          key: 'airiq',
        },
      ],
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
        {
          content: 'Scalable ticketing platform enabling sellers to publish live event inventory across Yahoo!\'s ecosystem. Built for high traffic volume, flexible integration, and reliable performance across millions of user sessions.',
          key: 'yahoo-tickets',
        },
        {
          content: 'B2B/B2C ticket marketplace supporting sports, concerts, theater, and travel packages. Engineered for transactional reliability, multi-model commerce, and high-volume search and purchasing flows.',
          key: 'razorgator',
        },
      ],
    },
    {
      achievements: (
        <ul>
          <li>Architect and deliver production-ready systems across industries</li>
          <li>Provide engineering depth, technical leadership, and end-to-end ownership</li>
        </ul>
      ),
      key: 'self-employed',
      summaries: [
        {
          content: 'Custom publishing engine powering a multi-channel tech media platform founded by Om Malik. Designed for scalable content delivery, high reader engagement, and flexible editorial workflows.',
          key: 'gigaom',
        },
        {
          content: 'E-commerce platform extending a long-standing music retailer\'s reach to global customers. Built to showcase rich product detail, support diverse inventory, and deliver a smooth purchasing experience.',
          key: 'rainbow-guitars',
        },
        {
          content: 'Lifestyle-driven artisan retail platform highlighting handcrafted products with rich visual storytelling. Built to deliver a premium shopping experience aligned with brand identity and values.',
          key: 'fortini-home',
        },
        {
          content: 'Global logistics system for the trade show industry, supporting exhibitors, exhibit houses, and event organizers. Engineered for international shipping workflows, operational visibility, and seamless coordination.',
          key: 'exhibit-transport',
        },
        {
          content: 'Brand-driven commerce platform showcasing high-performance BMX products. Built to reflect the company\'s bold identity while supporting robust product management and customer engagement.',
          key: 'sm-bikes',
        },
        {
          content: 'Service-oriented platform enabling tailored solutions that increase revenue and reduce operational costs. Designed for flexibility, client engagement, and scalable service delivery.',
          key: 'clipper-corp',
        },
        {
          content: 'E-commerce platform launching the digital presence of a national youth-focused clothing retailer. Built for product discovery, merchandising, and seamless online purchasing.',
          key: 'anchorblue',
        },
        {
          content: 'Precision-driven product platform supporting custom wheel configuration and global ordering. Engineered for accuracy, reliability, and high-quality product presentation.',
          key: 'wheelbuilder',
        },
        {
          content: 'Dynamic engineering services platform enabling consistent, responsive client engagement. Built to support scalable operations and evolving industry demands.',
          key: 'pacifica-services',
        },
      ],
    },
  ],
  heading: { as: 'h2' as HeadingType, children: 'Professional Experience' },
};

export const header = ({ siteConfig }: HeaderProps) => {
  const items = (siteConfig.themeConfig as ThemeConfig).navbar?.items || [];
  return {
    contacts: [
      (
        <Link href="https://en.wikipedia.org/wiki/Orange_County,_California" key="county" translate="no">
          Orange County, CA
        </Link>
      ),
      ' • ',
      (
        <Link href={siteConfig.url} key="website" title="Visit website" translate="no">
          {new URL(siteConfig.url).hostname}
        </Link>
      ),
      ' • ',
      (
        <Link href={items.at(-2)?.to as string} key="github" translate="no">
          GitHub
        </Link>
      ),
      ' • ',
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
  heading: { as: 'h2' as HeadingType, children: 'Leadership Profile' },
};

export const preamble = {
  content: 'Principal Engineer with 30+ years of experience architecting, building, and scaling production systems across cloud, distributed, and event-driven environments. I define technical direction, design end-to-end architectures, and deliver systems that are reliable, observable, and built to last. Equally comfortable writing code, designing APIs, reviewing architectures, or debugging complex failures in production. Known for clear technical judgment, deep hands-on expertise, and the ability to turn ambiguous problems into well-engineered solutions.',
  heading: { as: 'h2' as HeadingType, children: 'Professional Summary' },
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
  heading: { as: 'h2' as HeadingType, children: 'Technical Skills' },
};

export const storyMap = Object.fromEntries(stories.map((item) => [item.prefix, item]));

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
  heading: { as: 'h2' as HeadingType, children: 'Core Strengths' },
};

export const testimonials = {
  content: [
    { key: 'problem-solving-savior' },
    { key: 'master-of-many-trades' },
    { key: 'versatile-polymath' },
    { key: 'invested-partner' },
  ],
  heading: { as: 'h2' as HeadingType, children: 'Testimonials' },
};

export const timelineMap = Object.fromEntries(timelines.map((item) => [item.prefix, item]));
