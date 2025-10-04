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

// eslint-disable-next-line react/display-name,react/function-component-definition
jest.mock('@site/src/components/common/Heart', () => (props) => (
  // eslint-disable-next-line react/destructuring-assignment,react/prop-types
  <svg data-testid="heart" id={props.id} />
));

jest.mock('@site/src/components/common/Image', () => ({
  __esModule: true,
  default: ({ alt, link, picture }) => (
    <div
      data-alt={alt}
      data-link-classname={link.className}
      data-link-href={link.href}
      data-link-title={link.title}
      data-link-whiletap={JSON.stringify(link.whileTap)}
      data-picture-avif={picture.avif}
      data-picture-webp={picture.webp}
      data-testid="image"
    />
  ),
}));

// eslint-disable-next-line react/display-name,react/function-component-definition
jest.mock('@site/src/components/common/Link', () => (props) => (
  // eslint-disable-next-line @docusaurus/no-html-links
  <a
    // eslint-disable-next-line react/destructuring-assignment,react/prop-types
    className={props.className}
    // eslint-disable-next-line react/destructuring-assignment,react/prop-types
    data-href={props.href}
    data-testid="link"
    // eslint-disable-next-line react/destructuring-assignment,react/prop-types
    href={props.href}
  >
    {
      /* eslint-disable-next-line react/destructuring-assignment,react/prop-types */
      props.children
    }
  </a>
));

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

jest.mock('@site/src/hooks/observer', () => ({
  useMedia: jest.fn(),
}));

describe('timeline.Content', () => {
  it('renders wrapper and timeline items with correct layout when single = false', () => {
    // single = false -> position alternates: idx0 -> right, idx1 -> left
    useMedia.mockReturnValue([false]);

    const { container } = render(<Content />);

    // Check wrapper
    const wrapper = container.querySelector('.content');
    expect(wrapper).toBeInTheDocument();

    // Find all timeline wrappers
    const wrappers = container.querySelectorAll('.timeline');
    expect(wrappers).toHaveLength(timelines.length);

    wrappers.forEach((w, idx) => {
      // position classes
      const expectedPosClass = idx % 2 === 0 ? 'right' : 'left';
      expect(w).toHaveClass(expectedPosClass);

      // clsx called with (position, styles.timeline)
      expect(clsx).toHaveBeenCalledWith(expectedPosClass, 'timeline');

      // Image stub
      const img = within(w).getByTestId('image');
      // eslint-disable-next-line security/detect-object-injection
      const dataAlt = `${timelines[idx].affiliation.children} Logo`;
      expect(img).toHaveAttribute('data-alt', dataAlt);
      expect(img).toHaveAttribute(
        'data-link-href',
        // eslint-disable-next-line security/detect-object-injection
        timelines[idx].affiliation.href,
      );
      expect(img).toHaveAttribute('data-link-className', 'logo');
      expect(img).toHaveAttribute(
        'data-picture-avif',
        // eslint-disable-next-line security/detect-object-injection
        timelines[idx].picture.avif,
      );
      expect(img).toHaveAttribute(
        'data-picture-webp',
        // eslint-disable-next-line security/detect-object-injection
        timelines[idx].picture.webp,
      );

      // Article & inner class
      const article = within(w).getByTestId('article');
      expect(article).toHaveClass('inner');

      // Headings
      const headings = within(article).getAllByTestId('heading');
      const h2 = headings.find((h) => h.tagName === 'H2');
      // eslint-disable-next-line security/detect-object-injection
      expect(h2).toHaveTextContent(timelines[idx].year);

      const h3 = headings.find((h) => h.tagName === 'H3');
      // Title link
      const titleLink = within(h3).getByTestId('link');
      expect(titleLink).toHaveAttribute(
        'data-href',
        // eslint-disable-next-line security/detect-object-injection
        timelines[idx].title.href,
      );
      // eslint-disable-next-line security/detect-object-injection
      expect(titleLink).toHaveTextContent(timelines[idx].title.children);
      // Heart icon
      const heart = within(h3).getByTestId('heart');
      expect(heart).toHaveAttribute(
        'id',
        // eslint-disable-next-line security/detect-object-injection
        `timeline-${timelines[idx].title.children}`,
      );

      const h4 = headings.find((h) => h.tagName === 'H4');
      const affLink = within(h4).getByTestId('link');
      expect(affLink).toHaveAttribute(
        'data-href',
        // eslint-disable-next-line security/detect-object-injection
        timelines[idx].affiliation.href,
      );
      // eslint-disable-next-line security/detect-object-injection
      expect(affLink).toHaveTextContent(timelines[idx].affiliation.children);

      // Description
      // eslint-disable-next-line security/detect-object-injection
      const p = within(article).getByText(timelines[idx].description);
      expect(p).toBeInTheDocument();
    });
  });

  it('renders all timeline items on the right when single = true', () => {
    useMedia.mockReturnValue([true]);

    const { container } = render(<Content />);
    const wrappers = container.querySelectorAll('.timeline');

    wrappers.forEach((w) => expect(w).toHaveClass('right'));
  });
});
