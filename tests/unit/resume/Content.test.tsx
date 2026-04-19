/*!
 * Copyright © 2015 Richard Huang <rickypc@users.noreply.github.com>
 * All rights reserved.
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
    siteConfig: { url: 'https://domain.test' },
  });

  test('renders without crashing', () => {
    render(<Content />);
    const h3s = screen.getAllByRole('heading', { level: 3 });

    // Summary.
    expect(screen.getByText('Summary')).toBeInTheDocument();

    // Strengths.
    expect(screen.getByText('Core Strengths')).toBeInTheDocument();
    expect(screen.getByText('Architecture & system design for distributed, cloud-native platforms'))
      .toBeInTheDocument();

    // Leadership.
    expect(screen.getByText('Leadership')).toBeInTheDocument();
    expect(screen.getByText('Define architecture and technical strategy across teams'))
      .toBeInTheDocument();

    // Experiences.
    expect(screen.getByText('Experience')).toBeInTheDocument();
    expect(h3s[0].textContent).toMatch(/Principal-Level Senior Software Engineer.*Experian Consumer Services.*2013 - Present/i);

    // Educations.
    expect(screen.getByText('Education')).toBeInTheDocument();
    expect(h3s[5].textContent).toMatch(/Master of Science, Software Engineering.*California State University, Fullerton.*2005 - 2007/i);

    // Certifications.
    expect(screen.getByText('Certifications')).toBeInTheDocument();
    expect(h3s[7].textContent).toMatch(/Advanced Studies, Data Science.*Stanford University.*2015/i);

    // Skills.
    expect(screen.getByText('Skills')).toBeInTheDocument();
    expect(screen.getByText('Cloud & Infrastructure:')).toBeInTheDocument();

    // Testimonials.
    expect(screen.getByText('Testimonials')).toBeInTheDocument();
    expect(screen.getByText('A problem-solving savior who rescues complex projects with clean, flexible, timely implementations.'))
      .toBeInTheDocument();
  });
});
