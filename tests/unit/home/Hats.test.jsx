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

jest.unmock('@site/src/components/home/Hats');

describe('home.Hats', () => {
  it('renders all hats with proper structure and content', () => {
    const { container } = render(<Hats />);
    const expecteds = [
      {
        description: /^I lead engineering teams/,
        heading: /^Engineering Leader/,
      },
      {
        description: /^I bridge the gap between/,
        heading: /^Full Stack Developer/,
      },
      {
        description: /^I blend technical expertise/,
        heading: /^Smart Creative/,
      },
      {
        description: /^With over 30 years/,
        heading: /^Innovator/,
      },
    ];

    // eslint-disable-next-line testing-library/no-node-access
    const root = container.firstChild;
    expect(root).toBeInstanceOf(HTMLElement);
    expect(root.tagName).toEqual('DIV');
    // eslint-disable-next-line testing-library/no-node-access
    expect(root.childElementCount).toEqual(4);

    // eslint-disable-next-line testing-library/no-node-access
    const articles = root.querySelectorAll('article');
    expect(articles).toHaveLength(4);

    for (let i = 0, j = articles.length; i < j; i += 1) {
      // eslint-disable-next-line security/detect-object-injection
      const article = articles[i];
      // eslint-disable-next-line security/detect-object-injection
      const expected = expecteds[i];

      // eslint-disable-next-line testing-library/no-node-access
      const description = article.querySelector('p');
      expect(description).toHaveTextContent(expected.description);

      const heading = within(article).getByTestId('heading');
      expect(heading.tagName).toEqual('H2');
      expect(heading).toHaveTextContent(expected.heading);
    }
  });
});
