/*!
 * All the code that follow is
 * Copyright (c) 2015 - 2025 Richard Huang <rickypc@users.noreply.github.com>.
 * All Rights Reserved. Not for reuse without permission.
 * ----------------------------------------------------------------------------
 * @jest-environment jsdom
 */

import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Content from '@site/src/components/resume/Content';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

jest.unmock('@site/src/components/resume/Content');

describe('resume.Content', () => {
  jest.mocked<any>(useDocusaurusContext).mockReturnValue({
    siteConfig: {
      themeConfig: {
        navbar: {
          items: [
            { to: '/blog' },
            { to: '/projects' },
            { to: 'https://github.com/me' },
            { to: 'https://linkedin.com/in/me' },
          ],
        },
      },
      title: 'My Site',
      url: 'https://domain.test',
    },
  });

  it('renders without crashing', () => {
    render(<Content />);
    expect(screen.getByText('My Site')).toBeInTheDocument();

    // Summary.
    expect(screen.getByText('Professional Summary')).toBeInTheDocument();

    // Strengths.
    expect(screen.getByText('Core Strengths')).toBeInTheDocument();
    expect(screen.getByText('Architecture & system design for distributed, cloud-native platforms'))
      .toBeInTheDocument();

    // Leadership.
    expect(screen.getByText('Leadership Profile')).toBeInTheDocument();
    expect(screen.getByText('Define architecture and technical strategy across teams'))
      .toBeInTheDocument();

    // Experiences.
    expect(screen.getByText('Professional Experience')).toBeInTheDocument();
    expect(screen.getByText('Principal-Level Senior Software Engineer - Experian Consumer Services (2017-Present)'))
      .toBeInTheDocument();
    expect(screen.getByText('Experian Consumer Services')).toBeInTheDocument();

    // Educations.
    expect(screen.getByText('Education')).toBeInTheDocument();
    expect(screen.getByText('Master of Science, Software Engineering - California State University, Fullerton (2005-2007)'))
      .toBeInTheDocument();

    // Certifications.
    expect(screen.getByText('Certifications')).toBeInTheDocument();
    expect(screen.getByText('Advanced Studies, Data Science - Stanford University (2015)'))
      .toBeInTheDocument();

    // Skills.
    expect(screen.getByText('Technical Skills')).toBeInTheDocument();
    expect(screen.getByText('Cloud & Infrastructure:')).toBeInTheDocument();

    // Testimonials.
    expect(screen.getByText('Testimonials')).toBeInTheDocument();
    expect(screen.getByText('A problem-solving savior who rescues complex projects with clean, flexible, timely implementations.'))
      .toBeInTheDocument();
  });
});
