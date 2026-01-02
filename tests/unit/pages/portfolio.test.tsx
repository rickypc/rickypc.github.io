/*!
 * Copyright © 2015 Richard Huang <rickypc@users.noreply.github.com>
 * All rights reserved.
 * ----------------------------------------------------------------------------
 * @jest-environment jsdom
 */

import { fireEvent, render, screen } from '@testing-library/react';
import { catalog, layout, preamble } from '@site/src/data/portfolio';
import Portfolio from '@site/src/pages/portfolio';

jest.mock('@site/src/data/portfolio', () => ({
  __esModule: true,
  // Deterministic catalog: one item matches Tag1, one does not.
  catalog: [
    { id: 1, title: 'HasTag1', tags: ['Tag1', 'Common'] },
    { id: 2, title: 'NoTag1', tags: ['Other', 'Common'] },
  ],
  layout: { title: 'Portfolio Title', description: 'Portfolio Desc' },
  preamble: { title: 'Preamble Title', description: 'Preamble Desc' },
}));

describe('pages.portfolio', () => {
  it('passes layout props and className token to Layout', () => {
    render(<Portfolio />);
    const layoutEl = screen.getByTestId('layout');
    expect(layoutEl.getAttribute('class')).toContain('portfolio');
    expect(layoutEl.getAttribute('description')).toEqual(layout.description);
    expect(layoutEl.getAttribute('title')).toEqual(layout.title);
  });

  it('renders Preamble with expected props', () => {
    render(<Portfolio />);
    const pre = screen.getByTestId('preamble');
    expect(pre.getAttribute('description')).toEqual(preamble.description);
    expect(pre.getAttribute('title')).toEqual(preamble.title);
  });

  it('initial state: Filter current All, Projects full catalog, Zoom closed', () => {
    render(<Portfolio />);
    expect(screen.getByTestId('filter').getAttribute('data-current')).toBe('All');
    expect(screen.getByTestId('projects').getAttribute('data-count')).toEqual(String(catalog.length));
    expect(screen.getByTestId('zoom').getAttribute('data-open')).toBe('false');
  });

  it('clicking filter-all invokes default "All" branch and keeps full catalog', () => {
    render(<Portfolio />);
    fireEvent.click(screen.getByTestId('filter-all'));
    expect(screen.getByTestId('filter').getAttribute('data-current')).toBe('All');
    expect(screen.getByTestId('projects').getAttribute('data-count')).toEqual(String(catalog.length));
  });

  it('clicking filter-tag invokes filtering branch and reduces Projects', () => {
    render(<Portfolio />);
    fireEvent.click(screen.getByTestId('filter-tag1'));
    expect(screen.getByTestId('filter').getAttribute('data-current')).toBe('Tag1');
    expect(screen.getByTestId('projects').getAttribute('data-count')).toBe('1');
  });

  it('clicking a project opens Zoom; clicking Zoom closes it', () => {
    render(<Portfolio />);
    // Open.
    fireEvent.click(screen.getByTestId('projects'));
    expect(screen.getByTestId('zoom').getAttribute('data-open')).toBe('true');
    // Close.
    fireEvent.click(screen.getByTestId('zoom'));
    expect(screen.getByTestId('zoom').getAttribute('data-open')).toBe('false');
  });
});
