/*!
 * All the code that follow is
 * Copyright (c) 2015 - 2025 Richard Huang <rickypc@users.noreply.github.com>.
 * All Rights Reserved. Not for reuse without permission.
 * ----------------------------------------------------------------------------
 * @jest-environment jsdom
 */

import { render, within } from '@testing-library/react';
import '@testing-library/jest-dom';
import { clsx } from '@site/src/data/common';
import Content from '@site/src/components/timeline/Content';
import { timelines } from '@site/src/data/timeline';
import { useMedia } from '@site/src/hooks/observer';

jest.unmock('@site/src/components/timeline/Content');

jest.mock('@site/src/data/common', () => ({
  clsx: jest.fn((...classes) => classes.filter(Boolean).join(' ')),
  key: (value, prefix) => `${prefix}-${value}`,
}));

jest.mock('@site/src/data/timeline', () => ({
  timelines: [
    {
      affiliation: { children: 'Aff1', href: '/a1' },
      description: 'Desc1',
      picture: { avif: 'p1.avif', fallback: {}, webp: 'p1.webp' },
      title: { children: 'Title1', href: '/t1' },
      year: '2001',
    },
    {
      affiliation: { children: 'Aff2', href: '/a2' },
      description: 'Desc2',
      picture: { avif: 'p2.avif', fallback: {}, webp: 'p2.webp' },
      title: { children: 'Title2', href: '/t2' },
      year: '2002',
    },
  ],
}));

describe('timeline.Content', () => {
  it('renders wrapper and timeline items with correct layout when single = false', () => {
    // Single = false -> position alternates: idx0 -> right, idx1 -> left.
    useMedia.mockReturnValue([false]);

    const { container } = render(<Content />);

    // Check wrapper.
    // eslint-disable-next-line testing-library/no-container,testing-library/no-node-access
    const wrapper = container.querySelector('.content');
    expect(wrapper).toBeInTheDocument();

    // Find all timeline wrappers.
    // eslint-disable-next-line testing-library/no-container,testing-library/no-node-access
    const wrappers = container.querySelectorAll('.timeline');
    expect(wrappers).toHaveLength(timelines.length);

    wrappers.forEach((w, idx) => {
      // Position classes.
      const expectedPosClass = idx % 2 === 0 ? 'right' : 'left';
      // eslint-disable-next-line security/detect-object-injection
      const timeline = timelines[idx];
      expect(w).toHaveClass(expectedPosClass);

      // clsx called with (position, styles.timeline).
      expect(clsx).toHaveBeenCalledWith(expectedPosClass, 'timeline');

      // Image stub.
      const img = within(w).getByTestId(/^img-/);
      // eslint-disable-next-line testing-library/no-node-access
      expect(img).toHaveAttribute('alt', `${timeline.affiliation.children} Logo`);
      const imgLink = within(w).getByTestId('link');
      expect(imgLink).toHaveAttribute('class', 'logo');
      expect(imgLink).toHaveAttribute('href', timeline.affiliation.href);
      const picture = within(w).getByTestId('picture');
      // eslint-disable-next-line testing-library/no-node-access
      expect(picture.querySelector('source[type="image/avif"]'))
        .toHaveAttribute('srcSet', timeline.picture.avif);
      // eslint-disable-next-line testing-library/no-node-access
      expect(picture.querySelector('source[type="image/webp"]'))
        .toHaveAttribute('srcSet', timeline.picture.webp);

      // Article & inner class.
      const article = within(w).getByTestId('article');
      expect(article).toHaveClass('inner');

      // Headings.
      const headings = within(article).getAllByTestId('heading');
      const h2 = headings.find((h) => h.tagName === 'H2');
      expect(h2).toHaveTextContent(timeline.year);

      const h3 = headings.find((h) => h.tagName === 'H3');
      // Title link.
      const titleLink = within(h3).getByTestId(/^link-/);
      expect(titleLink).toHaveAttribute('href', timeline.title.href);
      // eslint-disable-next-line testing-library/no-node-access
      expect(titleLink).toHaveTextContent(timeline.title.children);
      // Heart icon
      const heart = within(h3).getByTestId('heart');
      // eslint-disable-next-line testing-library/no-node-access
      expect(heart).toHaveAttribute('id', `timeline-${timeline.title.children}`);

      const h4 = headings.find((h) => h.tagName === 'H4');
      const affLink = within(h4).getByTestId(/^link-/);
      expect(affLink).toHaveAttribute('href', timeline.affiliation.href);
      // eslint-disable-next-line testing-library/no-node-access
      expect(affLink).toHaveTextContent(timeline.affiliation.children);

      // Description.
      const p = within(article).getByText(timeline.description);
      expect(p).toBeInTheDocument();
    });
  });

  it('renders all timeline items on the right when single = true', () => {
    useMedia.mockReturnValue([true]);

    const { container } = render(<Content />);
    // eslint-disable-next-line testing-library/no-container,testing-library/no-node-access
    const wrappers = container.querySelectorAll('.timeline');

    wrappers.forEach((w) => expect(w).toHaveClass('right'));
  });
});
