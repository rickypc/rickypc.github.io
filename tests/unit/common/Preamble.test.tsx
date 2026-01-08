/*!
 * Copyright © 2015 Richard Huang <rickypc@users.noreply.github.com>
 * All rights reserved.
 * ----------------------------------------------------------------------------
 * @jest-environment jsdom
 */

import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Preamble, { Intro } from '@site/src/components/common/Preamble';

jest.unmock('@site/src/components/common/Preamble');

describe('Preamble', () => {
  const intro = {
    description: 'This is a sample description.',
    title: 'Sample Title',
  };

  test('renders preamble header, heading, and description', () => {
    render(<Preamble intro={intro} />);

    // eslint-disable-next-line testing-library/no-node-access
    const header = screen.getByText(intro.title).closest('header');
    expect(header).toHaveClass('row');

    // eslint-disable-next-line testing-library/no-node-access
    const col = header?.querySelector('div');
    expect(col).toHaveClass('col col--8 col--offset-2');

    // eslint-disable-next-line testing-library/no-node-access
    const preamble = col?.querySelector('div');
    expect(preamble).toHaveClass('preamble');

    const heading = screen.getByTestId('heading');
    expect(heading.tagName).toBe('H1');
    expect(heading).toHaveTextContent(intro.title);

    const para = screen.getByText(intro.description);
    expect(para.tagName).toBe('P');
  });

  test('renders intro heading, and description', () => {
    render(<Intro {...intro} />);

    // eslint-disable-next-line testing-library/no-node-access
    const preamble = screen.getByText(intro.title).closest('div');
    expect(preamble).toHaveClass('preamble');

    const heading = screen.getByTestId('heading');
    expect(heading.tagName).toBe('H1');
    expect(heading).toHaveTextContent(intro.title);

    const para = screen.getByText(intro.description);
    expect(para.tagName).toBe('P');
  });
});
