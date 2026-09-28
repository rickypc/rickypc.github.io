/*!
 * Copyright © 2015 Richard Huang <rickypc@users.noreply.github.com>
 * All rights reserved.
 */

import { mock } from 'bun:test';
import Projects from '@site/src/components/portfolio/Projects';
import { fireEvent, render, screen } from '@testing-library/react';

describe('portfolio.Projects', () => {
  const onClickMock = mock();

  test('renders wrapper and no items when filtered is empty', () => {
    const { container } = render(<Projects filtered={[]} onClick={onClickMock} />);

    // Wrapper exists with correct class.
    // eslint-disable-next-line testing-library/no-container,testing-library/no-node-access
    const wrapper = container.querySelector('.portfolios');
    expect(wrapper).toBeInTheDocument();

    // No child project items.
    // eslint-disable-next-line testing-library/no-node-access
    const items = wrapper?.querySelectorAll('.portfolio');
    expect(items).toHaveLength(0);
  });

  test('renders one Project item per filtered entry with correct structure', () => {
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

    const { container } = render(<Projects filtered={filtered} onClick={onClickMock} />);

    // Wrapper and items.
    // eslint-disable-next-line testing-library/no-container,testing-library/no-node-access
    const wrapper = container.querySelector('.portfolios');
    expect(wrapper).toBeInTheDocument();

    const items = screen.getAllByTestId('article');
    expect(items).toHaveLength(filtered.length);

    filtered.forEach((proj, index) => {
      const item = items[index as number];
      fireEvent.mouseEnter(item);

      // Carousel stub receives prefix.
      const carousel = screen.getAllByTestId('carousel')[index as number];
      expect(carousel).toHaveAttribute('prefix', proj.prefix);

      // Tags list.
      // eslint-disable-next-line testing-library/no-node-access
      const tagsList = item.querySelector('ul.tags');
      expect(tagsList).toBeInTheDocument();
      // eslint-disable-next-line testing-library/no-node-access
      const tagItems = tagsList?.querySelectorAll('li');
      expect(tagItems).toHaveLength(proj.tags.length);
      proj.tags.forEach((tag, i) => {
        expect(tagItems?.[i as number]).not.toHaveAttribute('aria-hidden');
        expect(tagItems?.[i as number]).toHaveTextContent(tag);
      });

      // Heading with Link and Heart.
      const heading = screen.getAllByTestId('heading')[index as number];
      expect(heading.tagName).toBe('H2');

      const link = screen.getAllByTestId(/^link-/)[index as number];
      expect(link).toHaveAttribute('data-validate', 'true');
      expect(link).toHaveAttribute('href', proj.href);
      expect(link).toHaveAttribute('translate', 'no');
      expect(link).toHaveTextContent(proj.title);

      const heart = screen.getAllByTestId('heart')[index as number];
      expect(heart).toHaveAttribute('id', `portfolio-${proj.prefix}`);

      // Description paragraph.
      // eslint-disable-next-line testing-library/no-node-access
      const desc = item.querySelector('p');
      expect(desc).toHaveTextContent(proj.description);

      fireEvent.mouseLeave(item);
    });
  });
});
