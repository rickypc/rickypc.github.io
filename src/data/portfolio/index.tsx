/*!
 * All the code that follow is
 * Copyright (c) 2015 - 2025 Richard Huang <rickypc@users.noreply.github.com>.
 * All Rights Reserved. Not for reuse without permission.
 */

/* eslint-disable global-require */

import { type LayoutProps } from '@site/src/components/common/Layout';
import { type PreambleProps } from '@site/src/components/common/Preamble';

export const catalog = [
  {
    description: 'A consumer-focused platform developed to provide individuals with secure access to their credit reports and credit scores at no cost. As part of Experian - one of the three largest credit bureaus - the system was designed for scale and reliability, enabling millions of users to monitor their financial health through web and mobile applications. Experian also expanded its offerings with Smart Money, a digital banking service providing checking and savings accounts alongside pre-approved credit cards and loans, extending its role in empowering consumers to manage and improve their financial well-being.',
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
    title: 'Experian Consumer Services',
  },
  {
    description: 'A high-volume email marketing platform built for enterprise clients to deliver targeted campaigns at massive scale. Designed as a B2B solution, the system enabled leading brands - including Yahoo!, Starbucks, Walgreens, SiriusXM, and Carnival - to engage their customers through personalized messaging. Engineered for reliability and throughput, the architecture supported billions of emails per day with advanced segmentation, tracking, and reporting features, giving client teams the flexibility to manage campaigns and measure performance across diverse audiences.',
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
    tags: [
      'Python',
      'Linux',
      'Oracle',
      'C#',
      'TypeScript',
      'Perl',
      'REST',
    ],
    title: 'Experian CheetahMail',
  },
  {
    description: 'A scalable platform designed for ticket sellers to showcase live event offerings - from sports to concerts - directly to Yahoo! users. Built on a SOAP Web Services architecture, the system was engineered for flexibility and high traffic volume, supporting millions of visits across Yahoo!\'s ecosystem.',
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
    description: 'A pioneering tech media platform founded by Om Malik, GigaOm delivers insights on startups, emerging technologies, and industry trends. The site was built as a custom WordPress plugin, enabling scalable content delivery across multiple topic channels and serving millions of engaged readers.',
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
    tags: [
      'PHP',
      'TypeScript',
      'MySQL',
      'REST',
    ],
    title: 'GigaOm',
  },
  {
    description: 'An online marketplace for reselling tickets to sports, theater, and concert events - along with curated vacation packages for major games. The platform was built using a diverse technology stack to support both B2B and B2C transactions, ensuring flexibility, reliability, and scale across multiple business models.',
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
    tags: [
      'C#',
      'TypeScript',
      'SQL Server',
      'MySQL',
      'ASP.NET',
      'REST',
      'XML',
    ],
    title: 'RazorGator',
  },
  {
    description: 'A long-standing music retailer based in Tucson, Arizona, Rainbow Guitars has supported local and international musicians for over 33 years. The platform was built to extend their passion for music beyond the storefront - connecting artists and enthusiasts worldwide through a rich, accessible online experience.',
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
    tags: [
      'C#',
      'TypeScript',
      'SQL Server',
      'ASP.NET',
      'REST',
    ],
    title: 'Rainbow Guitars',
  },
  {
    description: 'A family-run store rooted in a deep appreciation for artisan craftsmanship and authentic living. The platform was built to showcase their passion - bringing beautifully crafted products and rich, sensory details to a global audience, while reflecting the lifestyle and values behind every offering.',
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
    tags: [
      'C#',
      'TypeScript',
      'SQL Server',
      'ASP.NET',
      'REST',
    ],
    title: 'Fortini Home',
  },
  {
    description: 'A global logistics platform tailored for the trade show industry - serving exhibitors, exhibit houses, and event organizers. Built to extend their reach and streamline operations, the system enables seamless international shipping and helps clients deliver standout experiences around the world.',
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
    tags: [
      'PHP',
      'TypeScript',
      'MySQL',
    ],
    title: 'Exhibit Transport',
  },
  {
    description: 'A bold and independent BMX brand known for crafting bikes that stand up to real-world punishment. The platform was built to amplify their unique voice and showcase bikes designed to handle the intensity of riders who push limits - just like the founders and their crew have done from the start.',
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
    tags: [
      'PHP',
      'TypeScript',
      'MySQL',
    ],
    title: 'S&M Bikes',
  },
  {
    description: 'A service-driven platform designed to help Clipper Corp deliver tailored solutions that boost revenue while reducing operational costs. Built to support innovation and client engagement, the system empowers their team to offer strategic, cost-effective services to a growing global audience.',
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
    tags: [
      'PHP',
      'TypeScript',
      'MySQL',
    ],
    title: 'Clipper Corp',
  },
  {
    description: 'A wireless asset management platform designed to support real-time vehicle and asset tracking. Built to deliver GPS-based monitoring, internet-enabled tracking, and robust backend and user interface applications, the system laid the foundation for future innovations in connected mobility.',
    href: undefined,
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
    tags: [
      'C#',
      'TypeScript',
      'SQL Server',
      'ASP.NET',
      'REST',
    ],
    title: 'AirIQ (formerly Aircept)',
  },
  {
    description: 'A youth-focused clothing retailer known for its signature denim, graphic tees, and casual wear. The platform was developed to launch their e-commerce presence—making it easy for customers to browse and purchase online, while extending the brand\'s reach beyond physical retail.',
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
    tags: [
      'PHP',
      'TypeScript',
      'MySQL',
      'REST',
    ],
    title: 'AnchorBlue',
  },
  {
    description: 'A precision-driven platform built to showcase WheelBuilder\'s commitment to high-quality wheel products and services. Through meticulous parts selection and rigorous quality control, the system enables global access to their craftsmanship - connecting riders everywhere with performance they can trust.',
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
    tags: [
      'PHP',
      'TypeScript',
      'MySQL',
      'REST',
    ],
    title: 'WheelBuilder',
  },
  {
    description: 'A respected leader in engineering and management services, known for delivering quality and building long-term client trust. The platform was developed to extend their capabilities into a dynamic marketplace - offering efficient, consistent, and responsive solutions tailored to evolving industry demands.',
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
    tags: [
      'PHP',
      'TypeScript',
      'MySQL',
    ],
    title: 'Pacifica Services',
  },
];

export const layout: LayoutProps = {
  description: 'Scalable platforms for Yahoo!, GigaOm, & more - Ricky Huang\'s portfolio showcases engineering, media, e-commerce & logistics expertise.',
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
  description: 'Each project here reflects years of hands-on experience, thoughtful problem-solving, and a commitment to quality. Alongside every build, you\'ll find the technology stack that helped bring it to life - and the impact it delivered.',
  title: 'Portfolio',
};
