/*!
 * Copyright © 2015 Richard Huang <rickypc@users.noreply.github.com>
 * All rights reserved.
 */

/* eslint-disable global-require */

import { type FaqItems, type SchemaType, oneLine } from '@site/src/data/common';
import { type IntroProps } from '@site/src/components/common/Preamble';
import { type LayoutProps } from '@site/src/components/common/Layout';

export const catalog = [
  {
    description: oneLine(`The current flagship of the arc. A consumer-focused
      system providing individuals with secure, no-cost access to their credit
      reports, credit scores, and identity monitoring tools, built as part of
      one of the nation's major credit bureaus. The platform is engineered for
      scale and reliability, supporting millions of users across web and
      mobile channels as they track and improve their financial health. The
      ecosystem also includes Smart Money, a digital banking extension offering
      checking and savings accounts, pre-approved credit cards, and
      personalized loan options, further empowering consumers to manage their
      financial well-being. The Tier-1 essential service inside this ecosystem
      is where the cost-design discipline running through every chapter
      converges - 50 ms p99, tens of billions of records monthly, 5+ years of
      zero production defects, and roughly 5% of a licensed replacement's cost
      per year.`),
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
    summary: oneLine(`The current flagship - a large-scale, Tier-1 platform
      that provides secure access to credit reports, credit scores, identity
      monitoring, and Smart Money digital banking. Designed for multi-channel
      delivery across web and mobile, supporting millions of users with high
      availability, strong security, and real-time financial insights. The
      essential service inside it is where the 50 ms p99, the zero-defect
      five-year run, and the 5%-of-replacement-cost discipline all converge.`),
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
    description: oneLine(`The earliest flagship. A large-scale email marketing
      system built for enterprise brands to deliver highly targeted campaigns
      at massive volume. Designed as a B2B platform, it powered customer
      engagement for major global companies such as Yahoo!, Starbucks,
      Walgreens, SiriusXM, and Carnival through personalized, data-driven
      messaging. Engineered for reliability and throughput, the architecture
      supported billions of emails per day with advanced segmentation,
      tracking, and reporting capabilities, giving marketing teams the
      flexibility to orchestrate campaigns and measure performance across
      diverse audiences. The Pinnacle Award that appears on the Timeline was
      earned here - where the structural-design instinct met planet-scale
      traffic for the first time. Everything after is measured against this
      ceiling.`),
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
    summary: oneLine(`The earliest flagship - high-throughput system powering
      targeted campaigns for major global brands, supporting billions of
      emails per day with advanced segmentation, tracking, and reporting. The
      ceiling that every later system is measured against.`),
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
    description: oneLine(`An integration at scale. A scalable ticketing
      platform enabling sellers to publish live event inventory - sports,
      concerts, and theater - directly across Yahoo!'s high-traffic ecosystem.
      Built on a SOAP Web Services architecture, the system supported flexible
      integrations and sustained millions of user sessions, delivering
      reliable performance under heavy load while powering event discovery and
      purchasing for a global audience. The full-stack vision first formed at
      RazorGator found its public-scale test here - one team owning the call on
      both sides of the wire.`),
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
    summary: oneLine(`Public-scale ticketing - a scalable platform enabling
      sellers to publish live event inventory across Yahoo!'s ecosystem,
      supporting high-traffic volume, flexible integrations, and reliable
      performance. Where the full-stack vision from RazorGator met a global
      audience.`),
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
    description: oneLine(`Independent work in productized media. A pioneering
      tech media system powering GigaOm's multi-channel coverage of startups,
      emerging technologies, and industry trends. Built as a custom WordPress
      plugin, the platform supported scalable content delivery, flexible
      editorial workflows, and high reader engagement across millions of
      monthly visitors. The committed-partner testimonial from Esteban Chavez
      on the Stories page was earned across independent work like this and the
      other retail and logistics entries below, not inside a single employer.`),
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
    summary: oneLine(`Independent productized media - a custom publishing
      engine powering a multi-channel tech media site with scalable content
      delivery, high engagement, and flexible editorial workflows.`),
    tags: [
      'PHP',
      'TypeScript',
      'MySQL',
      'REST',
    ],
    title: 'GigaOm Publishing Platform',
  },
  {
    description: oneLine(`The first role in transactional commerce. An online
      marketplace for reselling tickets to sports, theater, and concert events,
      along with curated travel packages for major games. Built to support both
      B2B and B2C commerce models, the platform handled high-volume search,
      purchasing flows, and partner integrations. Its diverse technology stack
      enabled transactional reliability, operational flexibility, and scale
      across multiple business lines. The depth-versus-breadth lesson that
      later anchored the About philosophy was first pressured here - when the
      stack is that diverse, the same person has to see all of it.`),
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
    summary: oneLine(`First transactional commerce role - a B2B/B2C ticket
      marketplace supporting sports, concerts, theater, and travel packages,
      engineered for transactional reliability, multi-model commerce, and
      high-volume search and purchasing flows.`),
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
    description: oneLine(`An independent study in brand-as-architecture. A
      digital storefront extending a 33-year music retailer's reach to global
      customers. Built to showcase detailed product information, diverse
      inventory, and a rich browsing experience, the platform connected
      musicians worldwide to the shop's passion for instruments and sound.
      Each independent work retail entry in this catalog taught the same lesson
      in a different skin: the system serves the brand, not the other way
      around.`),
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
    description: oneLine(`Work in aesthetic restraint. A lifestyle-driven
      commerce experience highlighting handcrafted goods and artisan
      craftsmanship. Designed to reflect the brand's values and aesthetic, the
      platform delivered rich visual storytelling and a premium shopping
      experience for customers seeking authentic, curated products. It's also
      one of the four catalog entries no longer live today - which is itself a
      quiet truth of this body of work: businesses change, but the rigor that
      built them stays (see Stories for the partners who were there).`),
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
    description: oneLine(`Work in operational geometry. A global logistics
      system built for the trade show industry, supporting exhibitors, exhibit
      houses, and event organizers. Designed for international shipping
      workflows, operational visibility, and seamless coordination, the
      platform helped clients manage complex logistics and deliver standout
      event experiences worldwide. The shape of the problem - many moving
      parts, tight coordination - is a recurring pattern in this body of work
      and a direct antecedent of the event-driven architectures on the Resume.`),
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
    description: oneLine(`Work in brand-driven commerce. A brand-driven
      e-commerce system showcasing high-performance BMX products. Built to
      reflect the company's bold identity, the platform highlighted rugged
      bikes designed for real-world demand while supporting robust product
      management and customer engagement. The point holds up: these systems had
      to take hard use and keep running, the same durability bar I later
      applied to Tier-1 essential services.`),
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
    description: oneLine(`Work in service-as-system. A service-oriented system
      enabling Clipper Corp to deliver tailored solutions that increase
      revenue and reduce operational costs. Built for flexibility and client
      engagement, the platform supported scalable service delivery and
      strengthened the company's ability to innovate for a global audience.
      The succinct version of the cost-design discipline running through every
      page of this site: build the thing that increases revenue and reduces
      cost, then keep it running for years.`),
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
    description: oneLine(`Real-time systems work. A wireless asset-management
      system built to provide continuous, real-time tracking of vehicles and
      high-value equipment. Designed with GPS-based monitoring,
      internet-enabled telemetry, and a robust backend and user interface
      layer, the platform delivered reliable location intelligence, alerts,
      and operational visibility. Its architecture established the groundwork
      for future advancements in connected mobility and large-scale fleet
      tracking solutions. The telemetry discipline learned here is exactly
      what let me later take a Tier-1 service with frequent production issues
      to month-long stability within a month (see Resume). Read this entry as
      the seed of that later work.`),
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
    description: oneLine(`Work in youthful reach. A digital commerce system
      launching the online presence of a national youth-focused clothing
      retailer. Built for product discovery, merchandising, and seamless
      purchasing, the platform extended the brand's reach beyond physical
      stores and supported a modern retail experience. No longer live today,
      but the work - like every entry in this catalog - is verifiable through
      the partners on the Stories page.`),
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
    description: oneLine(`Work in precision. A precision-driven product system
      showcasing WheelBuilder's commitment to high-quality wheel craftsmanship.
      Built to support custom configuration, meticulous parts selection, and
      global ordering, the platform connected riders worldwide with performance
      they could trust. Precision, here, was not a slogan - it is the same
      discipline that later held a Tier-1 service at 50 ms p99 for 5+ years
      with zero defects.`),
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
    description: oneLine(`Work in service architecture. A dynamic services
      platform extending a respected engineering and management firm into a
      modern digital marketplace. Built for consistent, responsive client
      engagement, the system supported scalable operations and evolving
      industry demands while reinforcing long-term client trust. Trusted by a
      colleague whose testimonial sits on the Stories page - the human shape
      of the rigor this whole catalog demanded.`),
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

export const faqItems: FaqItems[] = [
  {
    answer: oneLine(`15 production systems across cloud (Experian Credit &
      Financial Wellness), email marketing (CheetahMail powering Yahoo!,
      Starbucks, Walgreens, SiriusXM, Carnival), ticketing (Yahoo! Tickets,
      RazorGator with FOX Sports, Tickets.com, MSN partners), media (GigaOm
      with millions of monthly visitors), retail (Rainbow Guitars, AnchorBlue,
      S&M Bikes, WheelBuilder, Fortini Home), logistics (Exhibit Transport),
      and engineering (Pacifica Services). Taken together, they are the core
      body of work where the rising action on the Timeline proved itself under
      real load.`),
    question: 'What breadth of systems has Ricky actually shipped?',
  },
  {
    answer: oneLine(`The largest numbers in the catalog: a billion emails a
      day at CheetahMail (a decade ago, with minimum error rate), and a
      Tier-1 essential Experian service I maintain today holding 50 ms p99,
      processing tens of billions of records monthly, and 5+ years of zero
      production defects. These two are the twin peaks of the arc - the first
      taught me planet-scale, the second taught me that durability is a design
      choice (the 5%-of-replacement-cost discipline running through the whole
      site).`),
    question: 'Can Ricky point to systems that operate at real scale?',
  },
  {
    answer: oneLine(`Eight plus languages in production: Python, Go, C#, PHP,
      TypeScript, Node.js, SQL Server, MySQL, Oracle, along with cloud
      infrastructure (AWS Fargate, Lambda, Kinesis, EventBridge, SQS/SNS) and
      front-end React. I'm also learning Rust for fun. The breadth is what
      lets one person own end-to-end - the ownership model introduced on the
      Home page and quantified on the Resume.`),
    question: 'What technology stack does Ricky cover across these projects?',
  },
  {
    answer: oneLine(`End-to-end ownership - the same person who designs the
      architecture also writes the code and runs the on-call. On the
      Tier-1 essential Experian service, that meant turning a system hitting
      production issues every 2-4 hours into one sustaining multi-day then
      monthly stability within a month. The stability and consistency pattern
      from the Home page is no sales pitch; it is a live architecture with
      concrete proof inside.`),
    question: 'What is Ricky\'s role on each project - lead, IC, or something else?',
  },
  {
    answer: oneLine(`Concrete and recurring. The Tier-1 essential Experian
      service runs for roughly 5% of what a licensed replacement would cost
      per year (operations included, licensing alone far higher), and an
      internal tool I built ground-up for a tenant grew from under $100K a
      year in revenue to hundreds of millions of dollars - my systems still
      back that business today. This is the dollar shape of the cost-design
      discipline the Resume page itemizes as a strategic appendix.`),
    question: 'Are there measurable cost or revenue impacts tied to these projects?',
  },
  {
    answer: oneLine(`Catalog entries map directly to companies in my timeline:
      Experian Consumer Services, Experian CheetahMail, AirIQ, RazorGator,
      Yahoo! Tickets. The independent projects (GigaOm, Rainbow Guitars,
      Fortini, S&M, Clipper, AnchorBlue, WheelBuilder, Pacifica Services) were
      delivery I ran in partnership with my partners across the same years, not
      gaps in employment. Read Timeline and Portfolio as two views of one
      continuous arc.`),
    question: 'How do these projects map back to the timeline and companies?',
  },
  {
    answer: oneLine(`Both. The enterprise CheetahMail platform powered Yahoo!,
      Starbucks, Walgreens, SiriusXM, and Carnival with advanced segmentation,
      tracking, and reporting - while the WheelBuilder custom wheel platform
      and GigaOm publishing system show productized thinking across global
      ordering and multi-channel media (Apple, Clean Tech, Cloud, Mobile,
      Video, Events, TV). The span is deliberate: it forces the breadth that
      later makes the depth useful.`),
    question: 'Does Ricky\'s portfolio include both enterprise and consumer work?',
  },
  {
    answer: oneLine(`Tagged on each catalog entry. Tags range from Python,
      React, AWS, C#, TypeScript, Go, MySQL, PHP, REST (Experian Consumer
      Services) to Python, Linux, Oracle, Perl (Experian CheetahMail) to C#,
      SQL Server, ASP.NET, XML (RazorGator) to PHP, TypeScript, MySQL (media
      and retail).`),
    question: 'Can I scan the technology stack for each project quickly?',
  },
  {
    answer: oneLine(`Image galleries accompany the projects with images,
      production screenshots, or both - 7 images for Experian Consumer, 9 for
      GigaOm, 5 for CheetahMail and RazorGator, 3 for Yahoo! Tickets and
      AirIQ - so you can see what I shipped, not just read about it. Visual
      proof is part of the rigor; the trust formed around it shows up, in
      human voices, on the Stories page.`),
    question: 'Is there visual proof for each project, not just descriptions?',
  },
  {
    answer: oneLine(`While four catalog items have no live href today (Yahoo!
      Tickets, Fortini, Exhibit Transport, AnchorBlue), the rest link to live
      production sites - and the underlying work is verifiable through the
      testimonial authors in the Stories page who worked on these projects
      with me.`),
    question: 'What if a project is no longer live - can I still verify it?',
  },
  {
    answer: oneLine(`Early in my career, my team built a highly visible data
      transformation feature. I designed an elegant, decoupled architecture
      to scale into a long-term roadmap. Shortly after launch, the business
      shifted direction, rendering the entire feature obsolete - we had to
      scrap the codebase. We delivered on time, but it was a hard lesson in
      over-engineering for an unverified future. Since then, I approach
      architecture with a strict MVP-first mentality: design for immediate
      requirements while keeping tomorrow's roadmap at arm's length, knowing
      it may never materialize. This is the lesson behind the
      essential-vs-decorative instinct that runs through the whole site,
      codified as an operating philosophy on the About page.`),
    question: 'What is a project where Ricky\'s judgment turned out to be wrong, and what did he learn?',
  },
];

export const intro: IntroProps = {
  description: oneLine(`This is the core body of work. The rising action of the
    Timeline page culminates here in a catalog of 15 production systems across
    cloud, media, commerce, logistics, and ticketing - each one a test
    that demanded a different kind of mastery. The twin peaks of the arc are
    both in this catalog: a billion emails a day at CheetahMail, and the
    Tier-1 essential Experian service I maintain today at 50 ms p99, 5+ years
    of zero production defects, running for roughly 5% of what a licensed
    replacement would cost per year. Between them sits the rest of the work -
    each build carrying the technology stack that brought it to life, the
    impact it delivered, and another lesson that taught me to distinguish
    essential from decorative. An internal tool here even grew its business
    from under $100K a year to hundreds of millions in revenue; my systems
    still back that business today. Read these as the proof behind the
    promises made on the Home page - and the raw material the Resume later
    distills into a strategic appendix.`),
  title: 'Portfolio',
};

// Before layout assignment.
export const schema: SchemaType = 'CollectionPage';

export const layout: LayoutProps = {
  description: oneLine(`Ricky Huang's software portfolio - 15 systems across
    cloud, media, e-commerce, logistics, and ticketing, from billion-email
    scale to a Tier-1 Experian service.`),
  faq: { items: faqItems, slug: 'portfolio' },
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
  schema,
  title: 'Scalable Systems - Yahoo!, GigaOm & More',
};
