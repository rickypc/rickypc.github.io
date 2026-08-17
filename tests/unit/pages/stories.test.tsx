/*!
 * Copyright © 2015 Richard Huang <rickypc@users.noreply.github.com>
 * All rights reserved.
 * ----------------------------------------------------------------------------
 * @jest-environment jsdom
 */

import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { intro, layout } from '@site/src/data/stories';
import Stories from '@site/src/pages/stories';
import { textContent } from '@site/src/data/common';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

describe('pages.stories', () => {
  jest.mocked<any>(useDocusaurusContext).mockReturnValue({
    siteConfig: { url: 'https://domain.test' },
  });

  test('renders Layout with className and layout props', () => {
    render(<Stories />);

    const layoutEl = screen.getByTestId('layout');
    expect(layoutEl).toBeInTheDocument();
    expect(layoutEl).toHaveAttribute('class', 'stories');
    expect(layoutEl.getAttribute('data-description')).toContain(layout.description);
    expect(layoutEl.getAttribute('data-title')).toContain(layout.title);
  });

  test('renders Preamble with correct props and text', () => {
    render(<Stories />);

    const preambleEl = screen.getByTestId('preamble');
    expect(preambleEl).toBeInTheDocument();
    const introJson = JSON.parse(preambleEl.dataset.intro!);
    expect(introJson.description).toEqual(textContent(intro.description));
    expect(introJson.title).toEqual(intro.title);
  });

  test('renders a section with combined classes and includes Content inside it', () => {
    render(<Stories />);

    const content = screen.getByTestId('content');
    expect(content).toBeInTheDocument();
    expect(content).toHaveTextContent('stories.content');

    // eslint-disable-next-line testing-library/no-node-access
    const section = content.closest('section');
    expect(section).toBeTruthy();
    expect(section?.getAttribute('class')).toContain('row');
    expect(section).toContainElement(content);
  });
});
