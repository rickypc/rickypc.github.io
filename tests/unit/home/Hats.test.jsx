/*!
 * All the code that follow is
 * Copyright (c) 2015 - 2025 Richard Huang <rickypc@users.noreply.github.com>.
 * All Rights Reserved. Not for reuse without permission.
 * ----------------------------------------------------------------------------
 * @jest-environment jsdom
 */

import { render, within } from '@testing-library/react';
import '@testing-library/jest-dom';
import Hats from '@site/src/components/home/Hats';

jest.mock('@site/src/data/common', () => ({
  key: (value, prefix) => `${prefix}-${value}`,
}));

jest.mock('@site/src/data/home', () => ({
  hats: [
    { label: 'First', description: 'Desc1', children: 'Content1' },
    { label: 'Second', description: 'Desc2', children: <strong>BoldText</strong> },
  ],
}));

// eslint-disable-next-line react/display-name,react/function-component-definition,react/prop-types
jest.mock('@theme/Heading', () => ({ as, children }) => (
  <div data-testid="heading" data-as={as}>
    {children}
  </div>
));

describe('home.Hats', () => {
  it('renders all hats with proper structure and content', () => {
    const { container } = render(<Hats />);

    // The root should be a <div> with two children (the two Hat articles)
    const root = container.firstChild;
    expect(root).toBeInstanceOf(HTMLElement);
    expect(root.tagName).toBe('DIV');
    expect(root.childElementCount).toBe(2);

    // Each child should be an <article>
    const articles = root.querySelectorAll('article');
    expect(articles).toHaveLength(2);

    // First article checks
    const [firstArticle, secondArticle] = articles;
    const firstHeading = within(firstArticle).getByTestId('heading');
    expect(firstHeading).toHaveAttribute('data-as', 'h2');
    // Label span + text child
    expect(firstHeading).toHaveTextContent(/^First\s+Content1$/);
    // Description paragraph
    expect(within(firstArticle).getByText('Desc1')).toBeInTheDocument();

    // Second article checks
    const secondHeading = within(secondArticle).getByTestId('heading');
    expect(secondHeading).toHaveAttribute('data-as', 'h2');
    // Label span + <strong> child
    expect(secondHeading).toHaveTextContent(/^Second\s+BoldText$/);
    expect(within(secondHeading).getByText('BoldText').tagName).toBe('STRONG');
    // Description paragraph
    expect(within(secondArticle).getByText('Desc2')).toBeInTheDocument();
  });
});
