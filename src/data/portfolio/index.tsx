/*!
 * Copyright © 2015 Richard Huang <rickypc@users.noreply.github.com>
 * All rights reserved.
 */

/* eslint-disable global-require */

import { type LayoutProps } from '@site/src/components/common/Layout';
import { oneLine } from '@site/src/data/common';
import { type PreambleProps } from '@site/src/components/common/Preamble';

export const catalog = [
  {
    description: oneLine(`A consumer-focused system providing individuals with
      secure, no-cost access to their credit reports, credit scores, and
      identity monitoring tools. Built as part of one of the nation's major
      credit bureaus, the platform is engineered for scale and reliability,
      supporting millions of users across web and mobile channels as they track
      and improve their financial health. The ecosystem also includes Smart
      Money, a digital banking extension offering checking and savings
      accounts, pre-approved credit cards, and personalized loan options,
      further empowering consumers to manage their financial well-being.`),
    href: 'https://experian.com',
    images: [
      {
        alt: 'Experian Landing',
        picture: {
          avif: require('@site/src/pages/portfolio/img/experian-landing.avif').default,
          fallback: require('@site/src/pages/portfolio/img/experian-landing.jpg'),
          webp: require('@site/src/pages/portfolio/img/experian-landing.webp').default,
        },
      },
      {
        alt: 'Experian Smart Money',
        picture: {
          avif: require('@site/src/pages/portfolio/img/experian-smart-money.avif').default,
          fallback: require('@site/src/pages/portfolio/img/experian-smart-money.jpg'),
          webp: require('@site/src/pages/portfolio/img/experian-smart-money.webp').default,
        },
      },
      {
        alt: 'Experian Pre-approved Credit Card',
        picture: {
          avif: require('@site/src/pages/portfolio/img/experian-credit-card.avif').default,
          fallback: require('@site/src/pages/portfolio/img/experian-credit-card.jpg'),
          webp: require('@site/src/pages/portfolio/img/experian-credit-card.webp').default,
        },
      },
      {
        alt: 'Experian Free Credit Score',
        picture: {
          avif: require('@site/src/pages/portfolio/img/experian-free-credit-score.avif').default,
          fallback: require('@site/src/pages/portfolio/img/experian-free-credit-score.jpg'),
          webp: require('@site/src/pages/portfolio/img/experian-free-credit-score.webp').default,
        },
      },
      {
        alt: 'Experian Free Credit Report',
        picture: {
          avif: require('@site/src/pages/portfolio/img/experian-free-credit-report.avif').default,
          fallback: require('@site/src/pages/portfolio/img/experian-free-credit-report.jpg'),
          webp: require('@site/src/pages/portfolio/img/experian-free-credit-report.webp').default,
        },
      },
      {
        alt: 'Experian Credit Score',
        picture: {
          avif: require('@site/src/pages/portfolio/img/experian-credit-score.avif').default,
          fallback: require('@site/src/pages/portfolio/img/experian-credit-score.jpg'),
          webp: require('@site/src/pages/portfolio/img/experian-credit-score.webp').default,
        },
      },
      {
        alt: 'Experian Credit Report',
        picture: {
          avif: require('@site/src/pages/portfolio/img/experian-credit-report.avif').default,
          fallback: require('@site/src/pages/portfolio/img/experian-credit-report.jpg'),
          webp: require('@site/src/pages/portfolio/img/experian-credit-report.webp').default,
        },
      },
    ],
    prefix: 'experian',
    summary: oneLine(`A large-scale platform that provides secure access to
      credit reports, credit scores, identity monitoring, and Smart Money
      digital banking. Designed for multi-channel delivery across web and
      mobile, supporting millions of users with high availability, strong
      security, and real-time financial insights.`),
    tags: [
      'Python',
      'React',
      'AWS',
      'Linux',
      'C#',
      'TypeScript',
      'Go',
      'MySQL',
      'PHP',
      'REST',
    ],
    title: 'Consumer Credit & Financial Wellness Platform',
  },
  {
    description: oneLine(`A large-scale email marketing system built for
      enterprise brands to deliver highly targeted campaigns at massive volume.
      Designed as a B2B platform, it powered customer engagement for major
      global companies such as Yahoo!, Starbucks, Walgreens, SiriusXM, and
      Carnival through personalized, data-driven messaging. Engineered for
      reliability and throughput, the architecture supported billions of emails
      per day with advanced segmentation, tracking, and reporting capabilities,
      giving marketing teams the flexibility to orchestrate campaigns and
      measure performance across diverse audiences.`),
    href: 'https://meetmarigold.com',
    images: [
      {
        alt: 'Experian CheetahMail Landing',
        picture: {
          avif: require('@site/src/pages/portfolio/img/cheetahmail-landing.avif').default,
          fallback: require('@site/src/pages/portfolio/img/cheetahmail-landing.jpg'),
          webp: require('@site/src/pages/portfolio/img/cheetahmail-landing.webp').default,
        },
      },
      {
        alt: 'Experian CheetahMail Japan',
        picture: {
          avif: require('@site/src/pages/portfolio/img/cheetahmail-japan.avif').default,
          fallback: require('@site/src/pages/portfolio/img/cheetahmail-japan.jpg'),
          webp: require('@site/src/pages/portfolio/img/cheetahmail-japan.webp').default,
        },
      },
      {
        alt: 'Experian CheetahMail Netherlands',
        picture: {
          avif: require('@site/src/pages/portfolio/img/cheetahmail-netherlands.avif').default,
          fallback: require('@site/src/pages/portfolio/img/cheetahmail-netherlands.jpg'),
          webp: require('@site/src/pages/portfolio/img/cheetahmail-netherlands.webp').default,
        },
      },
      {
        alt: 'Experian CheetahMail Hong Kong',
        picture: {
          avif: require('@site/src/pages/portfolio/img/cheetahmail-hongkong.avif').default,
          fallback: require('@site/src/pages/portfolio/img/cheetahmail-hongkong.jpg'),
          webp: require('@site/src/pages/portfolio/img/cheetahmail-hongkong.webp').default,
        },
      },
      {
        alt: 'Experian CheetahMail China',
        picture: {
          avif: require('@site/src/pages/portfolio/img/cheetahmail-china.avif').default,
          fallback: require('@site/src/pages/portfolio/img/cheetahmail-china.jpg'),
          webp: require('@site/src/pages/portfolio/img/cheetahmail-china.webp').default,
        },
      },
    ],
    prefix: 'cheetahmail',
    summary: oneLine(`High-throughput system powering targeted campaigns for
      major global brands, supporting billions of emails per day with advanced
      segmentation, tracking, and reporting.`),
    tags: [
      'Python',
      'Linux',
      'Oracle',
      'C#',
      'TypeScript',
      'Perl',
      'REST',
    ],
    title: 'Enterprise Email Marketing Platform',
  },
  {
    description: oneLine(`A scalable ticketing platform enabling sellers to
      publish live event inventory - sports, concerts, and theater - directly
      across Yahoo!'s high-traffic ecosystem. Built on a SOAP Web Services
      architecture, the system supported flexible integrations and sustained
      millions of user sessions, delivering reliable performance under heavy
      load while powering event discovery and purchasing for a global audience.`),
    href: undefined,
    images: [
      {
        alt: 'Yahoo! Tickets Landing',
        picture: {
          avif: require('@site/src/pages/portfolio/img/yahoo-tickets-landing.avif').default,
          fallback: require('@site/src/pages/portfolio/img/yahoo-tickets-landing.jpg'),
          webp: require('@site/src/pages/portfolio/img/yahoo-tickets-landing.webp').default,
        },
      },
      {
        alt: 'Yahoo! Tickets Category',
        picture: {
          avif: require('@site/src/pages/portfolio/img/yahoo-tickets-category.avif').default,
          fallback: require('@site/src/pages/portfolio/img/yahoo-tickets-category.jpg'),
          webp: require('@site/src/pages/portfolio/img/yahoo-tickets-category.webp').default,
        },
      },
      {
        alt: 'Yahoo! Tickets Search',
        picture: {
          avif: require('@site/src/pages/portfolio/img/yahoo-tickets-search.avif').default,
          fallback: require('@site/src/pages/portfolio/img/yahoo-tickets-search.jpg'),
          webp: require('@site/src/pages/portfolio/img/yahoo-tickets-search.webp').default,
        },
      },
    ],
    prefix: 'yahoo-tickets',
    summary: oneLine(`Scalable ticketing platform enabling sellers to publish
      live event inventory across Yahoo!'s ecosystem, supporting high-traffic
      volume, flexible integrations, and reliable performance.`),
    tags: [
      'C#',
      'TypeScript',
      'SQL Server',
      'PHP',
      'REST',
      'XML',
    ],
    title: 'Yahoo! Tickets',
  },
  {
    description: oneLine(`A pioneering tech media system powering GigaOm's
      multi-channel coverage of startups, emerging technologies, and industry
      trends. Built as a custom WordPress plugin, the platform supported
      scalable content delivery, flexible editorial workflows, and high reader
      engagement across millions of monthly visitors.`),
    href: 'https://gigaom.com',
    images: [
      {
        alt: 'GigaOm Landing',
        picture: {
          avif: require('@site/src/pages/portfolio/img/gigaom-landing.avif').default,
          fallback: require('@site/src/pages/portfolio/img/gigaom-landing.jpg'),
          webp: require('@site/src/pages/portfolio/img/gigaom-landing.webp').default,
        },
      },
      {
        alt: 'GigaOm Apple',
        picture: {
          avif: require('@site/src/pages/portfolio/img/gigaom-apple.avif').default,
          fallback: require('@site/src/pages/portfolio/img/gigaom-apple.jpg'),
          webp: require('@site/src/pages/portfolio/img/gigaom-apple.webp').default,
        },
      },
      {
        alt: 'GigaOm Clean Tech',
        picture: {
          avif: require('@site/src/pages/portfolio/img/gigaom-cleantech.avif').default,
          fallback: require('@site/src/pages/portfolio/img/gigaom-cleantech.jpg'),
          webp: require('@site/src/pages/portfolio/img/gigaom-cleantech.webp').default,
        },
      },
      {
        alt: 'GigaOm Cloud',
        picture: {
          avif: require('@site/src/pages/portfolio/img/gigaom-cloud.avif').default,
          fallback: require('@site/src/pages/portfolio/img/gigaom-cloud.jpg'),
          webp: require('@site/src/pages/portfolio/img/gigaom-cloud.webp').default,
        },
      },
      {
        alt: 'GigaOm Collaboration',
        picture: {
          avif: require('@site/src/pages/portfolio/img/gigaom-collaboration.avif').default,
          fallback: require('@site/src/pages/portfolio/img/gigaom-collaboration.jpg'),
          webp: require('@site/src/pages/portfolio/img/gigaom-collaboration.webp').default,
        },
      },
      {
        alt: 'GigaOm Mobile',
        picture: {
          avif: require('@site/src/pages/portfolio/img/gigaom-mobile.avif').default,
          fallback: require('@site/src/pages/portfolio/img/gigaom-mobile.jpg'),
          webp: require('@site/src/pages/portfolio/img/gigaom-mobile.webp').default,
        },
      },
      {
        alt: 'GigaOm Video',
        picture: {
          avif: require('@site/src/pages/portfolio/img/gigaom-video.avif').default,
          fallback: require('@site/src/pages/portfolio/img/gigaom-video.jpg'),
          webp: require('@site/src/pages/portfolio/img/gigaom-video.webp').default,
        },
      },
      {
        alt: 'GigaOm Events',
        picture: {
          avif: require('@site/src/pages/portfolio/img/gigaom-events.avif').default,
          fallback: require('@site/src/pages/portfolio/img/gigaom-events.jpg'),
          webp: require('@site/src/pages/portfolio/img/gigaom-events.webp').default,
        },
      },
      {
        alt: 'GigaOm TV',
        picture: {
          avif: require('@site/src/pages/portfolio/img/gigaom-tv.avif').default,
          fallback: require('@site/src/pages/portfolio/img/gigaom-tv.jpg'),
          webp: require('@site/src/pages/portfolio/img/gigaom-tv.webp').default,
        },
      },
    ],
    prefix: 'gigaom',
    summary: oneLine(`Custom publishing engine powering a multi-channel tech
      media site with scalable content delivery, high engagement, and flexible
      editorial workflows.`),
    tags: [
      'PHP',
      'TypeScript',
      'MySQL',
      'REST',
    ],
    title: 'GigaOm Publishing Platform',
  },
  {
    description: oneLine(`An online marketplace for reselling tickets to
      sports, theater, and concert events, along with curated travel packages
      for major games. Built to support both B2B and B2C commerce models, the
      platform handled high-volume search, purchasing flows, and partner
      integrations. Its diverse technology stack enabled transactional
      reliability, operational flexibility, and scale across multiple business
      lines.`),
    href: 'https://www.tickpick.com',
    images: [
      {
        alt: 'RazorGator Landing',
        picture: {
          avif: require('@site/src/pages/portfolio/img/razorgator-landing.avif').default,
          fallback: require('@site/src/pages/portfolio/img/razorgator-landing.jpg'),
          webp: require('@site/src/pages/portfolio/img/razorgator-landing.webp').default,
        },
      },
      {
        alt: 'RazorGator FOX Sports',
        picture: {
          avif: require('@site/src/pages/portfolio/img/razorgator-foxsports.avif').default,
          fallback: require('@site/src/pages/portfolio/img/razorgator-foxsports.jpg'),
          webp: require('@site/src/pages/portfolio/img/razorgator-foxsports.webp').default,
        },
      },
      {
        alt: 'RazorGator Tickets.com',
        picture: {
          avif: require('@site/src/pages/portfolio/img/razorgator-ticketscom.avif').default,
          fallback: require('@site/src/pages/portfolio/img/razorgator-ticketscom.jpg'),
          webp: require('@site/src/pages/portfolio/img/razorgator-ticketscom.webp').default,
        },
      },
      {
        alt: 'RazorGator MSN',
        picture: {
          avif: require('@site/src/pages/portfolio/img/razorgator-msn.avif').default,
          fallback: require('@site/src/pages/portfolio/img/razorgator-msn.jpg'),
          webp: require('@site/src/pages/portfolio/img/razorgator-msn.webp').default,
        },
      },
      {
        alt: 'RazorGator Jacksonville',
        picture: {
          avif: require('@site/src/pages/portfolio/img/razorgator-jacksonville.avif').default,
          fallback: require('@site/src/pages/portfolio/img/razorgator-jacksonville.jpg'),
          webp: require('@site/src/pages/portfolio/img/razorgator-jacksonville.webp').default,
        },
      },
    ],
    prefix: 'razorgator',
    summary: oneLine(`B2B/B2C ticket marketplace supporting sports, concerts,
      theater, and travel packages, engineered for transactional reliability,
      multi-model commerce, and high-volume search and purchasing flows.`),
    tags: [
      'C#',
      'TypeScript',
      'SQL Server',
      'MySQL',
      'ASP.NET',
      'REST',
      'XML',
    ],
    title: 'RazorGator Ticket Marketplace',
  },
  {
    description: oneLine(`A digital storefront extending a 33-year music
      retailer's reach to global customers. Built to showcase detailed product
      information, diverse inventory, and a rich browsing experience, the
      platform connected musicians worldwide to the shop's passion for
      instruments and sound.`),
    href: 'https://www.rainbowguitars.com',
    images: [
      {
        alt: 'Rainbow Guitars',
        picture: {
          avif: require('@site/src/pages/portfolio/img/rainbowguitars.avif').default,
          fallback: require('@site/src/pages/portfolio/img/rainbowguitars.jpg'),
          webp: require('@site/src/pages/portfolio/img/rainbowguitars.webp').default,
        },
      },
    ],
    prefix: 'rainbow-guitars',
    summary: oneLine(`Rainbow Guitars E-Commerce Platform - Online retail
      system supporting rich product detail, diverse inventory, and a smooth
      purchasing experience for a long-standing music retailer.`),
    tags: [
      'C#',
      'TypeScript',
      'SQL Server',
      'ASP.NET',
      'REST',
    ],
    title: 'Rainbow Guitars E-Commerce Platform',
  },
  {
    description: oneLine(`A lifestyle-driven commerce experience highlighting
      handcrafted goods and artisan craftsmanship. Designed to reflect the
      brand's values and aesthetic, the platform delivered rich visual
      storytelling and a premium shopping experience for customers seeking
      authentic, curated products.`),
    href: undefined,
    images: [
      {
        alt: 'Fortini Home',
        picture: {
          avif: require('@site/src/pages/portfolio/img/fortinihome.avif').default,
          fallback: require('@site/src/pages/portfolio/img/fortinihome.jpg'),
          webp: require('@site/src/pages/portfolio/img/fortinihome.webp').default,
        },
      },
    ],
    prefix: 'fortini-home',
    summary: oneLine(`Lifestyle-focused retail system showcasing handcrafted
      products with rich visual storytelling and a premium shopping experience.`),
    tags: [
      'C#',
      'TypeScript',
      'SQL Server',
      'ASP.NET',
      'REST',
    ],
    title: 'Fortini Home Artisan Retail Platform',
  },
  {
    description: oneLine(`A global logistics system built for the trade show
      industry, supporting exhibitors, exhibit houses, and event organizers.
      Designed for international shipping workflows, operational visibility,
      and seamless coordination, the platform helped clients manage complex
      logistics and deliver standout event experiences worldwide.`),
    href: undefined,
    images: [
      {
        alt: 'Exhibit Transport',
        picture: {
          avif: require('@site/src/pages/portfolio/img/exhibittransport.avif').default,
          fallback: require('@site/src/pages/portfolio/img/exhibittransport.jpg'),
          webp: require('@site/src/pages/portfolio/img/exhibittransport.webp').default,
        },
      },
    ],
    prefix: 'exhibit-transport',
    summary: oneLine(`Global logistics system supporting international shipping
      workflows, operational visibility, and seamless coordination for the
      trade show industry.`),
    tags: [
      'PHP',
      'TypeScript',
      'MySQL',
    ],
    title: 'Exhibit Transport Logistics Platform',
  },
  {
    description: oneLine(`A brand-driven e-commerce system showcasing
      high-performance BMX products. Built to reflect the company's bold
      identity, the platform highlighted rugged bikes designed for real-world
      punishment while supporting robust product management and customer
      engagement.`),
    href: 'https://www.sandmbikes.com',
    images: [
      {
        alt: 'S&M Bikes',
        picture: {
          avif: require('@site/src/pages/portfolio/img/sandmbikes.avif').default,
          fallback: require('@site/src/pages/portfolio/img/sandmbikes.jpg'),
          webp: require('@site/src/pages/portfolio/img/sandmbikes.webp').default,
        },
      },
    ],
    prefix: 'sm-bikes',
    summary: oneLine(`Brand-driven commerce system showcasing high-performance
      BMX products with strong product management and customer engagement
      capabilities.`),
    tags: [
      'PHP',
      'TypeScript',
      'MySQL',
    ],
    title: 'S&M Bikes Commerce Platform',
  },
  {
    description: oneLine(`A service-oriented system enabling Clipper Corp to
      deliver tailored solutions that increase revenue and reduce operational
      costs. Built for flexibility and client engagement, the platform
      supported scalable service delivery and strengthened the company's
      ability to innovate for a global audience.`),
    href: 'https://www.clippercorp.com',
    images: [
      {
        alt: 'Clipper Corp',
        picture: {
          avif: require('@site/src/pages/portfolio/img/clippercorp.avif').default,
          fallback: require('@site/src/pages/portfolio/img/clippercorp.jpg'),
          webp: require('@site/src/pages/portfolio/img/clippercorp.webp').default,
        },
      },
    ],
    prefix: 'clipper-corp',
    summary: oneLine(`Service-oriented system enabling tailored solutions,
      scalable delivery, and improved operational efficiency.`),
    tags: [
      'PHP',
      'TypeScript',
      'MySQL',
    ],
    title: 'Clipper Corp Service Solutions Platform',
  },
  {
    description: oneLine(`A wireless asset-management system built to provide
      continuous, real-time tracking of vehicles and high-value equipment.
      Designed with GPS-based monitoring, internet-enabled telemetry, and a
      robust backend and user interface layer, the platform delivered reliable
      location intelligence, alerts, and operational visibility. Its
      architecture established the groundwork for future advancements in
      connected mobility and large-scale fleet tracking solutions.`),
    href: 'https://www.airiq.com',
    images: [
      {
        alt: 'Aircept Landing',
        picture: {
          avif: require('@site/src/pages/portfolio/img/aircept-landing.avif').default,
          fallback: require('@site/src/pages/portfolio/img/aircept-landing.jpg'),
          webp: require('@site/src/pages/portfolio/img/aircept-landing.webp').default,
        },
      },
      {
        alt: 'Aircept NationTrack',
        picture: {
          avif: require('@site/src/pages/portfolio/img/aircept-nationstrack.avif').default,
          fallback: require('@site/src/pages/portfolio/img/aircept-nationstrack.jpg'),
          webp: require('@site/src/pages/portfolio/img/aircept-nationstrack.webp').default,
        },
      },
      {
        alt: 'Aircept RentalTrack',
        picture: {
          avif: require('@site/src/pages/portfolio/img/aircept-rentaltrack.avif').default,
          fallback: require('@site/src/pages/portfolio/img/aircept-rentaltrack.jpg'),
          webp: require('@site/src/pages/portfolio/img/aircept-rentaltrack.webp').default,
        },
      },
    ],
    prefix: 'airiq',
    summary: oneLine(`System supporting continuous vehicle and equipment
      tracking with GPS monitoring, telemetry, alerts, and location
      intelligence.`),
    tags: [
      'C#',
      'TypeScript',
      'SQL Server',
      'ASP.NET',
      'REST',
    ],
    title: 'Real-Time GPS Asset Tracking Platform',
  },
  {
    description: oneLine(`A digital commerce system launching the online
      presence of a national youth-focused clothing retailer. Built for
      product discovery, merchandising, and seamless purchasing, the platform
      extended the brand's reach beyond physical stores and supported a modern
      retail experience.`),
    href: undefined,
    images: [
      {
        alt: 'AnchorBlue Community',
        picture: {
          avif: require('@site/src/pages/portfolio/img/anchorblue-community.avif').default,
          fallback: require('@site/src/pages/portfolio/img/anchorblue-community.jpg'),
          webp: require('@site/src/pages/portfolio/img/anchorblue-community.webp').default,
        },
      },
      {
        alt: 'AnchorBlue Girls',
        picture: {
          avif: require('@site/src/pages/portfolio/img/anchorblue-girls.avif').default,
          fallback: require('@site/src/pages/portfolio/img/anchorblue-girls.jpg'),
          webp: require('@site/src/pages/portfolio/img/anchorblue-girls.webp').default,
        },
      },
    ],
    prefix: 'anchorblue',
    summary: oneLine(`Online retail platform supporting product discovery,
      merchandising, and seamless purchasing for a national youth clothing
      brand.`),
    tags: [
      'PHP',
      'TypeScript',
      'MySQL',
      'REST',
    ],
    title: 'AnchorBlue E-Commerce Platform',
  },
  {
    description: oneLine(`A precision-driven product system showcasing
      WheelBuilder's commitment to high-quality wheel craftsmanship. Built to
      support custom configuration, meticulous parts selection, and global
      ordering, the platform connected riders worldwide with performance they
      could trust.`),
    href: 'https://wheelbuilder.com',
    images: [
      {
        alt: 'WheelBuilder',
        picture: {
          avif: require('@site/src/pages/portfolio/img/wheelbuilder.avif').default,
          fallback: require('@site/src/pages/portfolio/img/wheelbuilder.jpg'),
          webp: require('@site/src/pages/portfolio/img/wheelbuilder.webp').default,
        },
      },
    ],
    prefix: 'wheelbuilder',
    summary: oneLine(`Precision-driven product system supporting custom wheel
      configuration, accurate ordering, and high-quality product presentation.`),
    tags: [
      'PHP',
      'TypeScript',
      'MySQL',
      'REST',
    ],
    title: 'WheelBuilder Custom Wheel Platform',
  },
  {
    description: oneLine(`A dynamic services platform extending a respected
      engineering and management firm into a modern digital marketplace. Built
      for consistent, responsive client engagement, the system supported
      scalable operations and evolving industry demands while reinforcing
      long-term client trust.`),
    href: 'https://www.pacificaservices.com',
    images: [
      {
        alt: 'Pacifica Services',
        picture: {
          avif: require('@site/src/pages/portfolio/img/pacificaservices.avif').default,
          fallback: require('@site/src/pages/portfolio/img/pacificaservices.jpg'),
          webp: require('@site/src/pages/portfolio/img/pacificaservices.webp').default,
        },
      },
    ],
    prefix: 'pacifica-services',
    summary: oneLine(`Dynamic services system enabling consistent client
      engagement, scalable operations, and support for evolving industry needs.`),
    tags: [
      'PHP',
      'TypeScript',
      'MySQL',
    ],
    title: 'Pacifica Services Engineering Platform',
  },
];

export const catalogMap = Object.fromEntries(catalog.map((item) => [item.prefix, item]));

export const layout: LayoutProps = {
  description: oneLine(`Scalable platforms for Yahoo!, GigaOm, & more - Ricky
    Huang's portfolio showcases engineering, media, e-commerce & logistics
    expertise.`),
  keywords: [
    'software engineering portfolio',
    'Yahoo! Tickets',
    'GigaOm',
    'RazorGator',
    'S&M Bikes',
    'e-commerce platforms',
    'React development',
    'micro-services architecture',
    'B2B and B2C systems',
    'scalable web applications',
    'engineering leadership',
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
    // Image preload won't match the actual loaded image due to screen size.
  ],
  */
  title: 'Scalable Systems - Yahoo!, GigaOm & More',
};

export const preamble: PreambleProps = {
  description: oneLine(`Each project here reflects years of hands-on
    experience, thoughtful problem-solving, and a commitment to quality.
    Alongside every build, you'll find the technology stack that brought it to
    life, the impact it delivered, and the continual learning that keeps my
    work aligned with the pace of modern technology.`),
  title: 'Portfolio',
};
