/*!
 * Copyright © 2015 Richard Huang <rickypc@users.noreply.github.com>
 * All rights reserved.
 */

import { mock } from 'bun:test';
import Content from '@site/src/components/about/Content';
import { render, screen } from '@testing-library/react';

mock.module('@site/src/data/about', () => ({
  characteristic: {
    attributes: ['Trait One', 'Trait Two'],
    title: 'Key Traits',
  },
  headline: 'Test Headline',
  paragraphs: ['First paragraph.', 'Second paragraph.'],
}));

describe('about.Content', () => {
  test('renders headline with Heart, paragraphs, and characteristic list', () => {
    render(<Content />);

    // Two headings: <Heading as="h2"> and <Heading as="h3">.
    const headings = screen.getAllByTestId('heading');
    expect(headings).toHaveLength(2);

    const [h2, h3] = headings;
    // h2: headline + heart.
    expect(h2.tagName).toBe('H2');
    expect(h2).toHaveTextContent('Test Headline');
    expect(screen.getByTestId('heart')).toHaveAttribute('id', 'about-landing');

    // h3: characteristic title.
    expect(h3.tagName).toBe('H3');
    expect(h3).toHaveTextContent('Key Traits');

    // Paragraphs.
    const paras = screen.getAllByText(/paragraph\./);
    expect(paras).toHaveLength(2);
    expect(paras[0]).toHaveTextContent('First paragraph.');
    expect(paras[1]).toHaveTextContent('Second paragraph.');

    // List items.
    const items = screen.getAllByRole('listitem');
    expect(items).toHaveLength(2);
    expect(items[0]).toHaveTextContent('Trait One');
    expect(items[1]).toHaveTextContent('Trait Two');
  });
});
