/*!
 * Copyright (c) 2015 - 2025 Richard Huang <rickypc@users.noreply.github.com>.
 * All Rights Reserved. Not for reuse without permission.
 * ----------------------------------------------------------------------------
 * @jest-environment jsdom
 */

import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { layout, preamble } from '@site/src/data/timeline';
import Timeline from '@site/src/pages/timeline';

describe('pages.timeline', () => {
  test('renders Layout with className and layout props, renders Preamble then section.row with Content', () => {
    const { getByTestId } = render(<Timeline />);

    const layoutEl = getByTestId('layout');
    expect(layoutEl).toBeInTheDocument();
    expect(layoutEl).toHaveAttribute('class', 'timeline');
    expect(layoutEl.getAttribute('description')).toContain(layout.description);
    expect(layoutEl.getAttribute('title')).toContain(layout.title);

    const preambleEl = getByTestId('preamble');
    expect(preambleEl).toBeInTheDocument();
    expect(preambleEl.getAttribute('description')).toContain(preamble.description);
    expect(preambleEl.getAttribute('title')).toContain(preamble.title);

    const content = getByTestId('content');

    const section = content.closest('section');
    expect(section).toBeTruthy();
    expect(section).toContainElement(content);
    expect(section.getAttribute('class')).toContain('row');

    expect(content).toBeInTheDocument();
    expect(content).toHaveTextContent('timeline.content');
  });
});
