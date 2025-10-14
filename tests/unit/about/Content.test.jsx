/*!
 * Copyright (c) 2015 - 2025 Richard Huang <rickypc@users.noreply.github.com>.
 * All Rights Reserved. Not for reuse without permission.
 * ----------------------------------------------------------------------------
 * @jest-environment jsdom
 */

import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import Content from '@site/src/components/about/Content';

jest.unmock('@site/src/components/about/Content');

jest.mock('@site/src/data/about', () => ({
  characteristic: {
    attributes: ['Trait One', 'Trait Two'],
    title: 'Key Traits',
  },
  headline: 'Test Headline',
  paragraphs: ['First paragraph.', 'Second paragraph.'],
}));

describe('about.Content', () => {
  it('renders headline with Heart, paragraphs, and characteristic list', () => {
    const { getAllByRole, getAllByTestId, getAllByText, getByTestId } = render(<Content />);

    // Two headings: <Heading as="h2"> and <Heading as="h3">
    const headings = getAllByTestId('heading');
    expect(headings).toHaveLength(2);

    const [h2, h3] = headings;
    // h2: headline + heart
    expect(h2.tagName).toEqual('H2');
    expect(h2).toHaveTextContent('Test Headline');
    expect(getByTestId('heart')).toHaveAttribute('id', 'about-landing');

    // h3: characteristic title
    expect(h3.tagName).toEqual('H3');
    expect(h3).toHaveTextContent('Key Traits');

    // Paragraphs
    const paras = getAllByText(/paragraph\./);
    expect(paras).toHaveLength(2);
    expect(paras[0]).toHaveTextContent('First paragraph.');
    expect(paras[1]).toHaveTextContent('Second paragraph.');

    // List items
    const items = getAllByRole('listitem');
    expect(items).toHaveLength(2);
    expect(items[0]).toHaveTextContent('Trait One');
    expect(items[1]).toHaveTextContent('Trait Two');
  });
});
