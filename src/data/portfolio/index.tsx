/*!
 * Copyright © 2015 Richard Huang <rickypc@users.noreply.github.com>
 * All rights reserved.
 */

import type { LayoutProps } from '@site/src/components/common/Layout';
import Link from '@site/src/components/common/Link';
import type { IntroProps } from '@site/src/components/common/Preamble';
import { type FaqItems, oneLine, type SchemaType } from '@site/src/data/common';

export const catalog = [
  {
    description: (
      <>
        The flagship I run today lives inside one of the nation's major credit bureaus. Millions of
        people use it free, on web and mobile, for secure credit reports, credit scores, and
        identity monitoring as they track and improve their financial health.
        <Link href="https://www.experian.com/money/experian-smart-money/" title="Smart Money">
          Smart Money
        </Link>
        extends it into digital banking - checking and savings accounts, pre-approved credit cards,
        and personalized loan options - while a mission-critical service inside holds 50 ms p99 on
        tens of billions of records monthly, 5+ years of zero production defects, at roughly 5% of a
        licensed replacement's cost per year.
      </>
    ),
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
    summary: oneLine(`The flagship I maintain today: a mission-critical platform serving millions of
      users across web and mobile with secure credit reports, credit scores, identity monitoring,
      and Smart Money digital banking. High availability, strong security, real-time financial
      insights - all built around a 50 ms p99 essential service with a zero-defect five-year run.`),
    tags: ['Python', 'React', 'AWS', 'Linux', 'C#', 'TypeScript', 'Go', 'MySQL', 'PHP', 'REST'],
    title: 'Consumer Credit & Financial Wellness Platform',
  },
  {
    description: (
      <>
        The earliest flagship is still the ceiling:
        <Link href="https://www.yahoo.com" title="Yahoo!">
          Yahoo!
        </Link>
        ,
        <Link href="https://www.starbucks.com" title="Starbucks">
          Starbucks
        </Link>
        ,
        <Link href="https://www.walgreens.com" title="Walgreens">
          Walgreens
        </Link>
        ,
        <Link href="https://www.siriusxm.com" title="SiriusXM">
          SiriusXM
        </Link>
        , and
        <Link href="https://www.carnivalcorp.com" title="Carnival">
          Carnival
        </Link>
        ran targeted, personalized, data-driven campaigns on this B2B platform, at billions of
        emails per day. Segmentation, tracking, and reporting let marketing teams orchestrate
        campaigns and measure performance across diverse audiences. The structural-design instinct
        met planet-scale traffic here for the first time - the Pinnacle Award on the
        <Link href="/timeline" title="Timeline">
          Timeline
        </Link>
        was earned here, and everything after is measured against this bar.
      </>
    ),
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
    summary: oneLine(`The earliest flagship: a high-throughput engine driving targeted campaigns for
      major global brands at billions of emails per day, with advanced segmentation, tracking, and
      reporting. Every later system is measured against this ceiling.`),
    tags: ['Python', 'Linux', 'Oracle', 'C#', 'TypeScript', 'Perl', 'REST'],
    title: 'Enterprise Email Marketing Platform',
  },
  {
    description: (
      <>
        Scale arrived early here. Sellers published live event inventory - sports, concerts, and
        theater - straight into
        <Link href="https://www.yahoo.com" title="Yahoo!">
          Yahoo!
        </Link>
        's high-traffic ecosystem on a flexible
        <Link href="https://en.wikipedia.org/wiki/SOAP" title="SOAP">
          SOAP
        </Link>
        Web Services architecture, sustaining millions of user sessions with reliable performance
        under heavy load. Event discovery and purchasing served a global audience, and the
        full-stack vision from
        <Link href="https://www.tickpick.com" title="RazorGator">
          RazorGator
        </Link>
        met its public-scale test here - one team owning the call on both sides of the wire.
      </>
    ),
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
    summary: oneLine(`Public-scale ticketing: sellers pushed live event inventory across Yahoo!'s
      ecosystem, with high-traffic volume, flexible integrations, and reliable performance. The
      full-stack vision from RazorGator met a global audience here.`),
    tags: ['C#', 'TypeScript', 'SQL Server', 'PHP', 'REST', 'XML'],
    title: 'Yahoo! Tickets',
  },
  {
    description: (
      <>
        Independent work, built to last. A custom
        <Link href="https://wordpress.com" title="WordPress">
          WordPress
        </Link>
        plugin powered
        <Link href="https://gigaom.com" title="GigaOm">
          GigaOm
        </Link>
        's multi-channel coverage of startups, emerging technologies, and industry trends. It scaled
        to millions of monthly visitors, with flexible editorial workflows, scalable content
        delivery, and high reader engagement. The committed-partner testimonial from Esteban Chavez
        on the
        <Link href="/stories" title="Stories">
          Stories
        </Link>
        page was earned here, and across the independent retail and logistics entries below -
        outside any single employer.
      </>
    ),
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
    summary: oneLine(`Independent productized media: a custom publishing engine powering a
      multi-channel tech media site with scalable content delivery, flexible editorial workflows,
      and high engagement.`),
    tags: ['PHP', 'TypeScript', 'MySQL', 'REST'],
    title: 'GigaOm Publishing Platform',
  },
  {
    description: (
      <>
        My first transactional commerce role. An online marketplace for reselling tickets to sports,
        theater, and concert events, plus curated travel packages for major games. It served both
        <Link href="https://en.wikipedia.org/wiki/Business-to-business" title="B2B">
          B2B
        </Link>
        and
        <Link href="https://en.wikipedia.org/wiki/Direct-to-consumer" title="B2C">
          B2C
        </Link>
        models. High-volume search, purchasing flows, and partner integrations had to deliver
        transactional reliability, operational flexibility, and scale across multiple business
        lines. The diverse stack forced one lesson early: the same person has to see all of it. That
        depth-versus-breadth lesson later anchored the
        <Link href="/about" title="About">
          About
        </Link>
        philosophy.
      </>
    ),
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
    summary: oneLine(`A B2B/B2C ticket marketplace covering sports, concerts, theater, and travel
      packages - my first transactional commerce role. Built for transactional reliability,
      multi-model commerce, and high-volume search and purchasing flows.`),
    tags: ['C#', 'TypeScript', 'SQL Server', 'MySQL', 'ASP.NET', 'REST', 'XML'],
    title: 'RazorGator Ticket Marketplace',
  },
  {
    description: oneLine(`A 33-year music retailer, opened to the world. This digital storefront
      carried the shop's detailed product information and diverse inventory to musicians worldwide,
      with rich browsing and the same passion for instruments and sound. Every independent retail
      entry in this catalog taught one lesson in a different skin: the system serves the brand.`),
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
    summary: oneLine(`An online retail system for a long-standing music retailer: rich product
      detail, diverse inventory, and a smooth purchasing experience, worldwide.`),
    tags: ['C#', 'TypeScript', 'SQL Server', 'ASP.NET', 'REST'],
    title: 'Rainbow Guitars E-Commerce Platform',
  },
  {
    description: (
      <>
        Handmade goods ask for a quiet, confident stage. This lifestyle commerce experience framed
        handcrafted, artisan products with the brand's own values and aesthetic - rich visual
        storytelling, a premium shopping experience, authentic and curated. It is one of the four
        catalog entries no longer live today; businesses change, the rigor that built them stays,
        and the
        <Link href="/stories" title="Stories">
          Stories
        </Link>
        page holds the partners who were there.
      </>
    ),
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
    summary: oneLine(`Lifestyle retail with a curator's eye: handcrafted products, rich visual
      storytelling, and a premium shopping experience.`),
    tags: ['C#', 'TypeScript', 'SQL Server', 'ASP.NET', 'REST'],
    title: 'Fortini Home Artisan Retail Platform',
  },
  {
    description: (
      <>
        A trade show is logistics with a deadline. This global system served exhibitors, exhibit
        houses, and event organizers. International shipping workflows, operational visibility, and
        seamless coordination let clients manage complex logistics and deliver standout event
        experiences worldwide. Many moving parts, tight coordination - a recurring pattern in this
        body of work, and a direct antecedent of the event-driven architectures on the
        <Link href="/resume" title="Resume">
          Resume
        </Link>
        .
      </>
    ),
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
    summary: oneLine(`Global logistics for the trade show industry: international shipping
      workflows, operational visibility, and seamless coordination.`),
    tags: ['PHP', 'TypeScript', 'MySQL'],
    title: 'Exhibit Transport Logistics Platform',
  },
  {
    description: (
      <>
        <Link href="https://en.wikipedia.org/wiki/BMX_bike" title="BMX">
          BMX
        </Link>
        gear takes a beating.
        <Link href="https://www.sandmbikes.com" title="S&M Bikes">
          S&M Bikes
        </Link>
        needed a storefront as bold as its brand, showcasing rugged, high-performance BMX products
        built for real-world demand, with robust product management and customer engagement. These
        systems had to take hard use and keep running - the same durability bar I later applied to
        mission-critical services.
      </>
    ),
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
    summary: oneLine(`Brand-driven commerce showcasing rugged, high-performance BMX products with
      strong product management and customer engagement capabilities.`),
    tags: ['PHP', 'TypeScript', 'MySQL'],
    title: 'S&M Bikes Commerce Platform',
  },
  {
    description: (
      <>
        Service, sold as a system.
        <Link href="https://www.clippercorp.com" title="Clipper Corp">
          Clipper Corp
        </Link>
        used this platform to deliver tailored solutions that increase revenue and reduce
        operational costs - flexible, client-facing, and scalable enough to keep innovating for a
        global audience. It is the cost-design discipline in one line: build the thing that
        increases revenue and reduces cost, then keep it running for years.
      </>
    ),
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
    summary: oneLine(`A service-oriented system for tailored solutions: scalable delivery, client
      engagement, and improved operational efficiency.`),
    tags: ['PHP', 'TypeScript', 'MySQL'],
    title: 'Clipper Corp Service Solutions Platform',
  },
  {
    description: (
      <>
        Tracking a fleet in real time, before that was normal. This wireless asset-management system
        followed vehicles and high-value equipment continuously.
        <Link href="https://en.wikipedia.org/wiki/Global_Positioning_System" title="GPS">
          GPS
        </Link>
        -based monitoring, internet-enabled telemetry, and a robust backend and user interface layer
        did the work. Clients got location intelligence, alerts, and operational visibility. It set
        the groundwork for connected mobility and large-scale fleet tracking. The telemetry
        discipline learned here later took a mission-critical service from frequent production
        issues to month-long stability within a month (see
        <Link href="/resume" title="Resume">
          Resume
        </Link>
        ).
      </>
    ),
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
    summary: oneLine(`Continuous vehicle and equipment tracking: GPS monitoring, telemetry, alerts,
      and location intelligence.`),
    tags: ['C#', 'TypeScript', 'SQL Server', 'ASP.NET', 'REST'],
    title: 'Real-Time GPS Asset Tracking Platform',
  },
  {
    description: (
      <>
        A national youth clothing brand, online for the first time. The platform launched
        AnchorBlue's digital presence with product discovery, merchandising, and seamless
        purchasing. It extended the brand beyond its physical stores and gave shoppers a modern
        retail experience. No longer live today; like every entry in this catalog, the work stays
        verifiable through the partners on the
        <Link href="/stories" title="Stories">
          Stories
        </Link>
        page.
      </>
    ),
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
    summary: oneLine(`Online retail for a national youth clothing brand: product discovery,
      merchandising, and seamless purchasing.`),
    tags: ['PHP', 'TypeScript', 'MySQL', 'REST'],
    title: 'AnchorBlue E-Commerce Platform',
  },
  {
    description: (
      <>
        Every wheel is built to order.
        <Link href="https://wheelbuilder.com" title="WheelBuilder">
          WheelBuilder
        </Link>
        's platform carried its commitment to high-quality wheel craftsmanship online. Custom
        configuration, meticulous parts selection, and global ordering connected riders worldwide
        with performance they could trust. Precision was the daily job here - the same discipline
        that later held a mission-critical service at 50 ms p99 for 5+ years with zero defects.
      </>
    ),
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
    summary: oneLine(`Precision-driven products, made to order: custom wheel configuration, accurate
      ordering, and high-quality presentation.`),
    tags: ['PHP', 'TypeScript', 'MySQL', 'REST'],
    title: 'WheelBuilder Custom Wheel Platform',
  },
  {
    description: (
      <>
        An engineering firm, extended into a digital marketplace. This dynamic services platform
        carried a respected engineering and management firm online. Consistent, responsive client
        engagement, scalable operations, and room for evolving industry demands reinforced long-term
        client trust. A colleague's testimonial sits on the
        <Link href="/stories" title="Stories">
          Stories
        </Link>
        page: the human shape of the rigor this whole catalog demanded.
      </>
    ),
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
    summary: oneLine(`Dynamic services for an engineering firm: consistent client engagement,
      scalable operations, and support for evolving industry needs.`),
    tags: ['PHP', 'TypeScript', 'MySQL'],
    title: 'Pacifica Services Engineering Platform',
  },
];

export const catalogMap = Object.fromEntries(catalog.map((item) => [item.prefix, item]));

export const faqItems: FaqItems[] = [
  {
    answer: oneLine(`15 production systems, spanning cloud (Experian Credit & Financial Wellness),
      email marketing (CheetahMail powering Yahoo!, Starbucks, Walgreens, SiriusXM, Carnival),
      ticketing (Yahoo! Tickets, RazorGator with FOX Sports, Tickets.com, MSN partners), media
      (GigaOm with millions of monthly visitors), retail (Rainbow Guitars, AnchorBlue, S&M Bikes,
      WheelBuilder, Fortini Home), logistics (Exhibit Transport), and engineering (Pacifica
      Services). Together they are the core body of work where the rising action on the Timeline
      proved itself under real load.`),
    question: 'What breadth of systems has Ricky actually shipped?',
  },
  {
    answer: oneLine(`The catalog's biggest numbers sit at both ends. CheetahMail pushed a billion
      emails a day, a decade ago, at minimum error rate; the mission-critical Experian service I
      maintain today holds 50 ms p99, tens of billions of records monthly, and 5+ years of zero
      production defects. The first taught planet-scale; the second taught that durability is a
      design choice - the 5%-of-replacement-cost discipline running through the whole site.`),
    question: 'Can Ricky point to systems that operate at real scale?',
  },
  {
    answer: oneLine(`Eight plus languages in production: Python, Go, C#, PHP, TypeScript, Node.js,
      SQL Server, MySQL, and Oracle, plus cloud infrastructure (AWS Fargate, Lambda, Kinesis,
      EventBridge, SQS/SNS) and front-end React. I'm also learning Rust for fun. The breadth is what
      lets one person own end-to-end - the ownership model introduced on the Home page and
      quantified on the Resume.`),
    question: 'What technology stack does Ricky cover across these projects?',
  },
  {
    answer: oneLine(`End-to-end ownership: the same person designs the architecture, writes the
      code, and runs the on-call. On the mission-critical Experian service, that meant turning a
      system with production issues every 2-4 hours into one sustaining multi-day, then monthly,
      stability within a month. The stability and consistency pattern from the Home page is a live
      architecture with concrete proof inside.`),
    question: "What is Ricky's role on each project - lead, IC, or something else?",
  },
  {
    answer: oneLine(`Concrete and recurring: the mission-critical Experian service runs for roughly
      5% of what a licensed replacement would cost per year - operations included, licensing alone
      far higher. An internal tool I built ground-up for a tenant grew from under $100K a year in
      revenue to hundreds of millions of dollars, and my systems still back that business today.
      This is the dollar shape of the cost-design discipline the Resume page itemizes as a strategic
      appendix.`),
    question: 'Are there measurable cost or revenue impacts tied to these projects?',
  },
  {
    answer: oneLine(`Every catalog entry maps to a company in my timeline: Experian Consumer
      Services, Experian CheetahMail, AirIQ, RazorGator, and Yahoo! Tickets. The independent
      projects - GigaOm, Rainbow Guitars, Fortini, S&M, Clipper, AnchorBlue, WheelBuilder, Pacifica
      Services - were delivery I ran with my partners across those same years, with no employment
      gaps between them. Read the Timeline and this Portfolio as two views of one continuous arc.`),
    question: 'How do these projects map back to the timeline and companies?',
  },
  {
    answer: oneLine(`Both, by design: the enterprise CheetahMail platform powered Yahoo!, Starbucks,
      Walgreens, SiriusXM, and Carnival with advanced segmentation, tracking, and reporting. The
      WheelBuilder custom wheel platform and the GigaOm publishing system show the productized
      side - global ordering and multi-channel media (Apple, Clean Tech, Cloud, Mobile, Video,
      Events, TV). The span is deliberate: it forces the breadth that later makes the depth useful.`),
    question: "Does Ricky's portfolio include both enterprise and consumer work?",
  },
  {
    answer: oneLine(`Every catalog entry carries its tags. The range runs from Python, React, AWS,
      C#, TypeScript, Go, MySQL, PHP, REST (Experian Consumer Services) to Python, Linux, Oracle,
      Perl (Experian CheetahMail). Then C#, SQL Server, ASP.NET, XML (RazorGator) to PHP,
      TypeScript, MySQL (media and retail).`),
    question: 'Can I scan the technology stack for each project quickly?',
  },
  {
    answer: oneLine(`Every project ships with its gallery - production screenshots, images, or both:
      7 for Experian Consumer, 9 for GigaOm, 5 each for CheetahMail and RazorGator, 3 each for
      Yahoo! Tickets and AirIQ. You can see the work itself. Visual proof is part of the rigor, and
      the trust it built shows up in human voices on the Stories page.`),
    question: 'Is there visual proof for each project, not just descriptions?',
  },
  {
    answer: oneLine(`Four catalog items have no live href today - Yahoo! Tickets, Fortini, Exhibit
      Transport, and AnchorBlue. The rest link to live production sites. Every underlying claim
      stays verifiable through the testimonial authors on the Stories page, who worked on these projects with me.`),
    question: 'What if a project is no longer live - can I still verify it?',
  },
  {
    answer: oneLine(`Early in my career, my team built a highly visible data transformation feature.
      We shipped it on time. I had designed an elegant, decoupled architecture to scale into a
      long-term roadmap. Shortly after launch the business shifted direction; the feature went
      obsolete, and we scrapped the codebase. A hard lesson in over-engineering for an unverified
      future. Since then I design MVP-first: meet today's requirements, keep tomorrow's roadmap at
      arm's length, and accept that it may never materialize. That lesson drives the
      essential-vs-decorative instinct on this site, codified as an operating philosophy on the
      About page.`),
    question:
      "What is a project where Ricky's judgment turned out to be wrong, and what did he learn?",
  },
];

export const intro: IntroProps = {
  description: (
    <>
      Hiring managers see inflated portfolio claims everywhere - big names, vague scale, and no way
      to check either. This catalog is built to be checked: 15 production systems across cloud,
      media, commerce, logistics, and ticketing, each one shipped, run under real load, and shown
      with the technology stack that brought it to life, the impact it delivered, and the lesson it
      taught. The
      <Link href="/timeline" title="Timeline">
        Timeline
      </Link>
      page gives the years behind them. Two peaks anchor the set: a billion emails a day at
      CheetahMail, and the mission-critical
      <Link href="https://www.experian.com" title="Experian">
        Experian
      </Link>
      service I maintain today at 50 ms p99, 5+ years of zero production defects, at roughly 5% of
      what a licensed replacement would cost per year. One internal tool here grew its business from
      under $100K a year to hundreds of millions in revenue; my systems still back that business
      today. Read these as the proof behind the promises made on the
      <Link href="/" title="Home">
        Home
      </Link>
      page - and the raw material the
      <Link href="/resume" title="Resume">
        Resume
      </Link>
      page distills into a strategic appendix.
    </>
  ),
  title: 'Portfolio',
};

// Before layout assignment.
export const schema: SchemaType = 'CollectionPage';

export const layout: LayoutProps = {
  description: oneLine(`Ricky Huang's software engineering portfolio: 15 systems shipped, from
    billion-email scale to a mission-critical Experian service. See the proof, then say hello.`),
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
  title: 'Software Engineering Portfolio - 15 Proven Systems',
};
