/*!
 * Copyright (c) 2015 - 2025 Richard Huang <rickypc@users.noreply.github.com>.
 * All Rights Reserved. Not for reuse without permission.
 * ----------------------------------------------------------------------------
 * @jest-environment jsdom
 */

import { fireEvent, render } from '@testing-library/react';
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
  preamble: { title: 'Preamble Title', description: 'Preamble Desc', printAdmonition: false },
}));

describe('pages.portfolio', () => {
  it('passes layout props and className token to Layout', () => {
    const { getByTestId } = render(<Portfolio />);
    const layoutEl = getByTestId('layout');
    expect(layoutEl.getAttribute('class')).toContain('portfolio');
    expect(layoutEl.getAttribute('description')).toEqual(layout.description);
    expect(layoutEl.getAttribute('title')).toEqual(layout.title);
  });

  it('renders Preamble with expected props', () => {
    const { getByTestId } = render(<Portfolio />);
    const pre = getByTestId('preamble');
    expect(pre.getAttribute('data-print-admonition')).toEqual(String(!!preamble.printAdmonition));
    expect(pre.getAttribute('description')).toEqual(preamble.description);
    expect(pre.getAttribute('title')).toEqual(preamble.title);
  });

  it('initial state: Filter current All, Projects full catalog, Zoom closed', () => {
    const { getByTestId } = render(<Portfolio />);
    expect(getByTestId('filter').getAttribute('data-current')).toEqual('All');
    expect(getByTestId('projects').getAttribute('data-count')).toEqual(String(catalog.length));
    expect(getByTestId('zoom').getAttribute('data-open')).toEqual('false');
  });

  it('clicking filter-all invokes default "All" branch and keeps full catalog', () => {
    const { getByTestId } = render(<Portfolio />);
    fireEvent.click(getByTestId('filter-all'));
    expect(getByTestId('filter').getAttribute('data-current')).toEqual('All');
    expect(getByTestId('projects').getAttribute('data-count')).toEqual(String(catalog.length));
  });

  it('clicking filter-tag invokes filtering branch and reduces Projects', () => {
    const { getByTestId } = render(<Portfolio />);
    fireEvent.click(getByTestId('filter-tag1'));
    expect(getByTestId('filter').getAttribute('data-current')).toEqual('Tag1');
    expect(getByTestId('projects').getAttribute('data-count')).toEqual('1');
  });

  it('clicking a project opens Zoom; clicking Zoom closes it', () => {
    const { getByTestId } = render(<Portfolio />);
    // Open.
    fireEvent.click(getByTestId('projects'));
    expect(getByTestId('zoom').getAttribute('data-open')).toEqual('true');
    // Close.
    fireEvent.click(getByTestId('zoom'));
    expect(getByTestId('zoom').getAttribute('data-open')).toEqual('false');
  });
});
