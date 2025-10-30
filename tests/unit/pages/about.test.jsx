/*!
 * Copyright (c) 2015 - 2025 Richard Huang <rickypc@users.noreply.github.com>.
 * All Rights Reserved. Not for reuse without permission.
 * ----------------------------------------------------------------------------
 * @jest-environment jsdom
 */

import { render, screen } from '@testing-library/react';
import About from '@site/src/pages/about';
import { layout, preamble } from '@site/src/data/about';

describe('pages.about', () => {
  it('renders Layout and exposes primitive layout props', () => {
    render(<About />);
    const layoutEl = screen.queryByTestId('layout');

    if (!layoutEl) throw new Error('Layout not rendered');
    expect(layoutEl.getAttribute('description')).toEqual(layout.description);
    expect(layoutEl.getAttribute('title')).toEqual(layout.title);
  });

  it('renders Preamble with normalized props and is placed inside Layout', () => {
    render(<About />);
    const layoutEl = screen.queryByTestId('layout');
    const preambleEl = screen.queryByTestId('preamble');

    if (!preambleEl) throw new Error('Preamble not rendered');
    expect(preambleEl.getAttribute('data-print-admonition')).toEqual(String(!!preamble.printAdmonition));
    expect(preambleEl.getAttribute('description')).toEqual(preamble.description);
    expect(preambleEl.getAttribute('title')).toEqual(preamble.title);
    expect(layoutEl.contains(preambleEl)).toBeTruthy();
  });

  it('renders a section with class "row" that contains Content and Figure', () => {
    const { container } = render(<About />);
    // eslint-disable-next-line testing-library/no-container,testing-library/no-node-access
    const sectionEl = container.querySelector('section');

    if (!sectionEl) throw new Error('Section not found in About render');
    const cls = sectionEl.className || sectionEl.getAttribute('class') || '';
    expect(cls.includes('row')).toBeTruthy();

    const content = screen.queryByTestId('content');
    const figure = screen.queryByTestId('figure');
    if (!content) throw new Error('Content component not rendered');
    if (!figure) throw new Error('Figure component not rendered');

    expect(sectionEl.contains(content)).toBeTruthy();
    expect(sectionEl.contains(figure)).toBeTruthy();
  });

  it('renders Oracle inside Layout and it appears after the section', () => {
    render(<About />);
    const oracle = screen.queryByTestId('oracle');

    if (!oracle) throw new Error('Oracle not rendered');
    const layoutEl = screen.queryByTestId('layout');
    expect(layoutEl.contains(oracle)).toBeTruthy();

    // eslint-disable-next-line testing-library/no-node-access
    const children = Array.from(layoutEl.children);
    const sectionIndex = children.findIndex((c) => c.tagName && c.tagName.toLowerCase() === 'section');
    const oracleIndex = children.findIndex((c) => c.getAttribute && c.getAttribute('data-testid') === 'oracle');
    if (sectionIndex === -1) throw new Error('Section not found among Layout children');
    expect(oracleIndex).toBeGreaterThan(sectionIndex);
  });
});
