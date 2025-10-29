/*!
 * All the code that follow is
 * Copyright (c) 2015 - 2025 Richard Huang <rickypc@users.noreply.github.com>.
 * All Rights Reserved. Not for reuse without permission.
 * ----------------------------------------------------------------------------
 * @jest-environment jsdom
 */

import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import Projects from '@site/src/components/portfolio/Projects';

jest.unmock('@site/src/components/portfolio/Projects');

describe('portfolio.Projects', () => {
  const onClickMock = jest.fn();

  it('renders wrapper and no items when filtered is empty', () => {
    const { container } = render(<Projects filtered={[]} onClick={onClickMock} />);

    // Wrapper exists with correct class
    const wrapper = container.querySelector('.portfolios');
    expect(wrapper).toBeInTheDocument();

    // No child project items
    const items = wrapper.querySelectorAll('.portfolio');
    expect(items).toHaveLength(0);
  });

  it('renders one Project item per filtered entry with correct structure', () => {
    const filtered = [
      {
        description: 'Desc1',
        href: '/link1',
        images: [{ alt: 'Alt1', src: 'Src1' }],
        prefix: 'p1',
        tags: ['x', 'y'],
        title: 'Title1',
      },
      {
        description: 'Desc2',
        href: '/link2',
        images: [{ alt: 'Alt2', src: 'Src2' }],
        prefix: 'p2',
        tags: ['a'],
        title: 'Title2',
      },
    ];

    const { container, getAllByTestId } = render(<Projects filtered={filtered} onClick={onClickMock} />);

    // Wrapper and items
    const wrapper = container.querySelector('.portfolios');
    expect(wrapper).toBeInTheDocument();

    const items = getAllByTestId('article');
    expect(items).toHaveLength(filtered.length);

    filtered.forEach((proj, index) => {
      // eslint-disable-next-line security/detect-object-injection
      const item = items[index];

      // Carousel stub receives prefix
      // eslint-disable-next-line security/detect-object-injection
      const carousel = getAllByTestId('carousel')[index];
      expect(carousel).toHaveAttribute('prefix', proj.prefix);

      // Tags list
      const tagsList = item.querySelector('ul.tags');
      expect(tagsList).toBeInTheDocument();
      const tagItems = tagsList.querySelectorAll('li');
      expect(tagItems).toHaveLength(proj.tags.length);
      proj.tags.forEach((tag, i) => {
        // eslint-disable-next-line security/detect-object-injection
        expect(tagItems[i]).toHaveAttribute('aria-hidden', 'true');
        // eslint-disable-next-line security/detect-object-injection
        expect(tagItems[i]).toHaveTextContent(tag);
      });

      // Heading with Link and Heart
      // eslint-disable-next-line security/detect-object-injection
      const heading = getAllByTestId('heading')[index];
      expect(heading.tagName).toEqual('H2');

      // eslint-disable-next-line security/detect-object-injection
      const link = getAllByTestId(/^link-/)[index];
      expect(link).toHaveAttribute('data-validate', 'true');
      expect(link).toHaveAttribute('href', proj.href);
      expect(link).toHaveAttribute('translate', 'no');
      expect(link).toHaveTextContent(proj.title);

      // eslint-disable-next-line security/detect-object-injection
      const heart = getAllByTestId('heart')[index];
      expect(heart).toHaveAttribute('id', `portfolio-${proj.prefix}`);

      // Description paragraph
      const desc = item.querySelector('p');
      expect(desc).toHaveTextContent(proj.description);
    });
  });
});
