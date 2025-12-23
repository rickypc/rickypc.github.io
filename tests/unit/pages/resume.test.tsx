/*!
 * Copyright (c) 2015 - 2025 Richard Huang <rickypc@users.noreply.github.com>.
 * All Rights Reserved. Not for reuse without permission.
 * ----------------------------------------------------------------------------
 * @jest-environment jsdom
 */

import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { layout } from '@site/src/data/resume';
import Resume from '@site/src/pages/resume';

describe('pages.resume', () => {
  test('renders Layout with className and layout props, then Content', () => {
    render(<Resume />);

    const layoutEl = screen.getByTestId('layout');
    expect(layoutEl).toBeInTheDocument();
    expect(layoutEl).toHaveAttribute('class', 'resume');
    expect(layoutEl.getAttribute('description')).toContain(layout.description);
    expect(layoutEl.getAttribute('title')).toContain(layout.title);

    const content = screen.getByTestId('content');
    expect(content).toBeInTheDocument();
    expect(content).toHaveTextContent('resume.content');
  });
});
