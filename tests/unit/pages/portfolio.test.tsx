/*!
 * Copyright © 2015 Richard Huang <rickypc@users.noreply.github.com>
 * All rights reserved.
 */

import { mock } from 'bun:test';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import { catalog, intro, layout } from '@site/src/data/portfolio';
import Portfolio from '@site/src/pages/portfolio';
import { fireEvent, render, screen } from '@testing-library/react';

mock.module('@site/src/data/portfolio', () => ({
  __esModule: true,
  // Deterministic catalog: one item matches Tag1, one does not.
  catalog: [
    { id: 1, tags: ['Tag1', 'Common'], title: 'HasTag1' },
    { id: 2, tags: ['Other', 'Common'], title: 'NoTag1' },
  ],
  intro: { description: 'Preamble Desc', title: 'Preamble Title' },
  layout: { description: 'Portfolio Desc', title: 'Portfolio Title' },
}));

describe('pages.portfolio', () => {
  (useDocusaurusContext as Mocked<typeof useDocusaurusContext>).mockReturnValue({
    siteConfig: { url: 'https://domain.test' },
  });

  test('passes layout props and className token to Layout', () => {
    render(<Portfolio />);
    const layoutEl = screen.getByTestId('layout');
    expect(layoutEl.getAttribute('class')).toContain('portfolio');
    expect(layoutEl.getAttribute('data-description')).toEqual(layout.description as string);
    expect(layoutEl.getAttribute('data-title')).toEqual(layout.title as string);
  });

  test('renders Preamble with expected props', () => {
    render(<Portfolio />);
    const pre = screen.getByTestId('preamble');
    expect(JSON.parse(pre.dataset.intro as string)).toEqual(expect.objectContaining(intro));
  });

  test('initial state: Filter current All, Projects full catalog, Zoom closed', () => {
    render(<Portfolio />);
    expect(screen.getByTestId('filter').getAttribute('data-current')).toBe('All');
    expect(screen.getByTestId('projects').getAttribute('data-count')).toEqual(
      String(catalog.length),
    );
    expect(screen.getByTestId('zoom').getAttribute('data-open')).toBe('false');
  });

  test('clicking filter-all invokes default "All" branch and keeps full catalog', () => {
    render(<Portfolio />);
    fireEvent.click(screen.getByTestId('filter-all'));
    expect(screen.getByTestId('filter').getAttribute('data-current')).toBe('All');
    expect(screen.getByTestId('projects').getAttribute('data-count')).toEqual(
      String(catalog.length),
    );
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
