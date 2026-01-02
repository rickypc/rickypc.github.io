/*!
 * Copyright © 2015 Richard Huang <rickypc@users.noreply.github.com>
 * All rights reserved.
 * ----------------------------------------------------------------------------
 * @jest-environment jsdom
 */

import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { layout, preamble } from '@site/src/data/timeline';
import Timeline from '@site/src/pages/timeline';

describe('pages.timeline', () => {
  test('renders Layout with className and layout props, renders Preamble then section.row with Content', () => {
    render(<Timeline />);

    const layoutEl = screen.getByTestId('layout');
    expect(layoutEl).toBeInTheDocument();
    expect(layoutEl).toHaveAttribute('class', 'timeline');
    expect(layoutEl.getAttribute('description')).toContain(layout.description);
    expect(layoutEl.getAttribute('title')).toContain(layout.title);

    const preambleEl = screen.getByTestId('preamble');
    expect(preambleEl).toBeInTheDocument();
    expect(preambleEl.getAttribute('description')).toContain(preamble.description);
    expect(preambleEl.getAttribute('title')).toContain(preamble.title);

    const content = screen.getByTestId('content');

    // eslint-disable-next-line testing-library/no-node-access
    const section = content.closest('section');
    expect(section).toBeTruthy();
    expect(section).toContainElement(content);
    expect(section?.getAttribute('class')).toContain('row');

    expect(content).toBeInTheDocument();
    expect(content).toHaveTextContent('timeline.content');
  });
});
