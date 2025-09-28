/*!
 * All the code that follow is
 * Copyright (c) 2015 - 2025 Richard Huang <rickypc@users.noreply.github.com>.
 * All Rights Reserved. Not for reuse without permission.
 * ----------------------------------------------------------------------------
 * @jest-environment jsdom
 */

import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Projects from '@site/src/components/portfolio/Projects';

jest.mock('framer-motion', () => ({
  // eslint-disable-next-line react/jsx-no-useless-fragment,react/prop-types
  AnimatePresence: ({ children }) => <>{children}</>,
  domMax: {},
  // eslint-disable-next-line react/jsx-no-useless-fragment,react/prop-types
  LazyMotion: ({ children }) => <>{children}</>,
  m: {
    article: ({ children, className, ...props }) => (
      <article data-testid="project-item" className={className} {...props}>
        {children}
      </article>
    ),
    div: ({ children, className, ...props }) => (
      <div data-testid="projects-wrapper" className={className} {...props}>
        {children}
      </div>
    ),
  },
}));

// eslint-disable-next-line react/display-name,react/function-component-definition
jest.mock('@site/src/components/common/Heart', () => (props) => (
  // eslint-disable-next-line react/destructuring-assignment,react/prop-types
  <svg data-testid="heart" id={props.id} />
));

// eslint-disable-next-line react/display-name,react/function-component-definition
jest.mock('@site/src/components/common/Link', () => ({
  // eslint-disable-next-line react/prop-types
  children,
  // eslint-disable-next-line react/prop-types
  href,
  // eslint-disable-next-line react/prop-types
  translate,
  // eslint-disable-next-line react/prop-types
  validate,
}) => (
  // eslint-disable-next-line @docusaurus/no-html-links
  <a
    data-href={href}
    data-testid="link"
    data-translate={translate}
    data-validate={validate?.toString()}
    href={href}
  >
    {children}
  </a>
));

jest.mock(
  '@site/src/components/portfolio/Carousel',
  // eslint-disable-next-line react/display-name,react/function-component-definition
  () => (props) => (
    // eslint-disable-next-line react/destructuring-assignment,react/prop-types
    <div data-testid="carousel" data-prefix={props.prefix}>
      Carousel
    </div>
  ),
);

jest.mock(
  '@site/src/components/portfolio/Projects/styles.module.css',
  () => ({
    portfolio: 'portfolio-class',
    portfolios: 'portfolios-class',
    tags: 'tags-class',
  }),
);

// eslint-disable-next-line react/display-name,react/function-component-definition,react/prop-types
jest.mock('@theme/Heading', () => ({ as, children }) => (
  <div data-testid="heading" data-as={as}>
    {children}
  </div>
));

describe('portfolio.Projects', () => {
  const onClickMock = jest.fn();

  it('renders wrapper and no items when filtered is empty', () => {
    const { container } = render(<Projects filtered={[]} onClick={onClickMock} />);

    // Wrapper exists with correct class
    const wrapper = container.querySelector('.portfolios-class');
    expect(wrapper).toBeInTheDocument();

    // No child project items
    const items = wrapper.querySelectorAll('.portfolio-class');
    expect(items).toHaveLength(0);
  });

  it('renders one Project item per filtered entry with correct structure', () => {
    const filtered = [
      {
        prefix: 'p1',
        title: 'Title1',
        description: 'Desc1',
        href: '/link1',
        tags: ['x', 'y'],
        images: [{ alt: 'Alt1', src: 'Src1' }],
      },
      {
        prefix: 'p2',
        title: 'Title2',
        description: 'Desc2',
        href: '/link2',
        tags: ['a'],
        images: [{ alt: 'Alt2', src: 'Src2' }],
      },
    ];

    const { container } = render(<Projects filtered={filtered} onClick={onClickMock} />);

    // Wrapper and items
    const wrapper = container.querySelector('.portfolios-class');
    expect(wrapper).toBeInTheDocument();

    const items = screen.getAllByTestId('project-item');
    expect(items).toHaveLength(filtered.length);

    filtered.forEach((proj, index) => {
      // eslint-disable-next-line security/detect-object-injection
      const item = items[index];

      // Carousel stub receives prefix
      // eslint-disable-next-line security/detect-object-injection
      const carousel = screen.getAllByTestId('carousel')[index];
      expect(carousel).toHaveAttribute('data-prefix', proj.prefix);

      // Tags list
      const tagsList = item.querySelector('ul.tags-class');
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
      const heading = screen.getAllByTestId('heading')[index];
      expect(heading).toHaveAttribute('data-as', 'h2');

      // eslint-disable-next-line security/detect-object-injection
      const link = screen.getAllByTestId('link')[index];
      expect(link).toHaveAttribute('data-href', proj.href);
      expect(link).toHaveAttribute('data-translate', 'no');
      expect(link).toHaveAttribute('data-validate', 'true');
      expect(link).toHaveTextContent(proj.title);

      // eslint-disable-next-line security/detect-object-injection
      const heart = screen.getAllByTestId('heart')[index];
      expect(heart).toHaveAttribute('id', `portfolio-${proj.prefix}`);

      // Description paragraph
      const desc = item.querySelector('p');
      expect(desc).toHaveTextContent(proj.description);
    });
  });
});
