/*!
 * Copyright © 2015 Richard Huang <rickypc@users.noreply.github.com>
 * All rights reserved.
 * ----------------------------------------------------------------------------
 * @jest-environment jsdom
 */

import { fireEvent, render, screen } from '@testing-library/react';
import { catalog, intro, layout } from '@site/src/data/portfolio';
import Portfolio from '@site/src/pages/portfolio';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

jest.mock('@site/src/data/portfolio', () => ({
  __esModule: true,
  // Deterministic catalog: one item matches Tag1, one does not.
  catalog: [
    { id: 1, title: 'HasTag1', tags: ['Tag1', 'Common'] },
    { id: 2, title: 'NoTag1', tags: ['Other', 'Common'] },
  ],
  intro: { title: 'Preamble Title', description: 'Preamble Desc' },
  layout: { title: 'Portfolio Title', description: 'Portfolio Desc' },
}));

describe('pages.portfolio', () => {
  jest.mocked<any>(useDocusaurusContext).mockReturnValue({
    siteConfig: { url: 'https://domain.test' },
  });

  test('passes layout props and className token to Layout', () => {
    render(<Portfolio />);
    const layoutEl = screen.getByTestId('layout');
    expect(layoutEl.getAttribute('class')).toContain('portfolio');
    expect(layoutEl.getAttribute('description')).toEqual(layout.description);
    expect(layoutEl.getAttribute('title')).toEqual(layout.title);
  });

  test('renders Preamble with expected props', () => {
    render(<Portfolio />);
    const pre = screen.getByTestId('preamble');
    expect(JSON.parse(pre.dataset.intro!)).toEqual(expect.objectContaining(intro));
  });

  test('initial state: Filter current All, Projects full catalog, Zoom closed', () => {
    render(<Portfolio />);
    expect(screen.getByTestId('filter').getAttribute('data-current')).toBe('All');
    expect(screen.getByTestId('projects').getAttribute('data-count')).toEqual(String(catalog.length));
    expect(screen.getByTestId('zoom').getAttribute('data-open')).toBe('false');
  });

  test('clicking filter-all invokes default "All" branch and keeps full catalog', () => {
    render(<Portfolio />);
    fireEvent.click(screen.getByTestId('filter-all'));
    expect(screen.getByTestId('filter').getAttribute('data-current')).toBe('All');
    expect(screen.getByTestId('projects').getAttribute('data-count')).toEqual(String(catalog.length));
  });

  test('clicking filter-tag invokes filtering branch and reduces Projects', () => {
    render(<Portfolio />);
    fireEvent.click(screen.getByTestId('filter-tag1'));
    expect(screen.getByTestId('filter').getAttribute('data-current')).toBe('Tag1');
    expect(screen.getByTestId('projects').getAttribute('data-count')).toBe('1');
  });

  test('clicking a project opens Zoom; clicking Zoom closes it', () => {
    render(<Portfolio />);
    // Open.
    fireEvent.click(screen.getByTestId('projects'));
    expect(screen.getByTestId('zoom').getAttribute('data-open')).toBe('true');
    // Close.
    fireEvent.click(screen.getByTestId('zoom'));
    expect(screen.getByTestId('zoom').getAttribute('data-open')).toBe('false');
  });
});
