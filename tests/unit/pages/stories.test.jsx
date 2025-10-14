/*!
 * Copyright (c) 2015 - 2025 Richard Huang <rickypc@users.noreply.github.com>.
 * All Rights Reserved. Not for reuse without permission.
 * ----------------------------------------------------------------------------
 * @jest-environment jsdom
 */

import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { layout, preamble } from '@site/src/data/stories';
import Stories from '@site/src/pages/stories';

describe('pages.stories', () => {
  test('renders Layout with className and layout props', () => {
    const { getByTestId } = render(<Stories />);

    const layoutEl = getByTestId('layout');
    expect(layoutEl).toBeInTheDocument();
    expect(layoutEl).toHaveAttribute('class', 'stories');
    expect(layoutEl.getAttribute('description')).toContain(layout.description);
    expect(layoutEl.getAttribute('title')).toContain(layout.title);
  });

  test('renders Preamble with correct props and text', () => {
    const { getByTestId } = render(<Stories />);

    const preambleEl = getByTestId('preamble');
    expect(preambleEl).toBeInTheDocument();
    expect(preambleEl.getAttribute('description')).toContain(preamble.description);
    expect(preambleEl.getAttribute('title')).toContain(preamble.title);
  });

  test('renders a section with combined classes and includes Content inside it', () => {
    const { getByTestId } = render(<Stories />);

    const content = getByTestId('content');
    expect(content).toBeInTheDocument();
    expect(content).toHaveTextContent('stories.content');

    const section = content.closest('section');
    expect(section).toBeTruthy();
    expect(section.getAttribute('class')).toContain('row');
    expect(section).toContainElement(content);
  });
});
