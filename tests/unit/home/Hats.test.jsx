/*!
 * Copyright © 2015 Richard Huang <rickypc@users.noreply.github.com>
 * All rights reserved.
 * ----------------------------------------------------------------------------
 * @jest-environment jsdom
 */

import { fireEvent, render, within } from '@testing-library/react';
import '@testing-library/jest-dom';
import Hats from '@site/src/components/home/Hats';
import { usePrint } from '@site/src/hooks/observer';

const usePrintMock = jest.mocked(usePrint);

jest.unmock('@site/src/components/home/Hats');

describe('home.Hats', () => {
  test('renders all hats with proper structure and content', () => {
    usePrintMock.mockReturnValue([false]);
    const { container } = render(<Hats />);
    const expecteds = [
      {
        description: /^I lead engineering teams/,
        heading: /^Engineering Leader/,
      },
      {
        description: /^I bridge front-end and back-end/,
        heading: /^Full Stack Developer/,
      },
      {
        description: /^I combine engineering depth/,
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
    expect(root.tagName).toBe('DIV');
    // eslint-disable-next-line testing-library/no-node-access
    expect(root.childElementCount).toBe(4);

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
      expect(heading.tagName).toBe('H2');
      expect(heading).toHaveTextContent(expected.heading);
    }

    // eslint-disable-next-line testing-library/no-node-access
    fireEvent.click(articles[0].querySelector('.details'));
  });

  test('renders all hats when printing', () => {
    usePrintMock.mockReturnValue([true]);
    const { container } = render(<Hats />);

    // eslint-disable-next-line testing-library/no-node-access
    const root = container.firstChild;
    expect(root).toBeInstanceOf(HTMLElement);
    expect(root.tagName).toBe('DIV');
    // eslint-disable-next-line testing-library/no-node-access
    expect(root.childElementCount).toBe(4);

    // eslint-disable-next-line testing-library/no-node-access
    const articles = root.querySelectorAll('article');
    expect(articles).toHaveLength(4);

    // eslint-disable-next-line testing-library/no-node-access
    fireEvent.click(articles[0].querySelector('.details'));
  });
});
