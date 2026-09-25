/*!
 * Copyright © 2015 Richard Huang <rickypc@users.noreply.github.com>
 * All rights reserved.
 */

import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import { layout } from '@site/src/data/resume';
import Resume from '@site/src/pages/resume';
import { render, screen } from '@testing-library/react';

describe('pages.resume', () => {
  (useDocusaurusContext as Mocked<typeof useDocusaurusContext>).mockReturnValue({
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

  test('renders Layout with className and layout props, then Content', () => {
    render(<Resume />);

    const layoutEl = screen.getByTestId('layout');
    expect(layoutEl).toBeInTheDocument();
    expect(layoutEl).toHaveAttribute('class', 'resume');
    expect(layoutEl.getAttribute('data-description')).toContain(layout.description as string);
    expect(layoutEl.getAttribute('data-title')).toContain(layout.title as string);

    const content = screen.getByTestId('content');
    expect(content).toBeInTheDocument();
    expect(content).toHaveTextContent('resume.content');
  });
});
