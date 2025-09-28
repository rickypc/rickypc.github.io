/*!
 * All the code that follow is
 * Copyright (c) 2015 - 2025 Richard Huang <rickypc@users.noreply.github.com>.
 * All Rights Reserved. Not for reuse without permission.
 * ----------------------------------------------------------------------------
 * @jest-environment jsdom
 */

import { render, screen, within } from '@testing-library/react';
import '@testing-library/jest-dom';
import Content from '@site/src/components/stories/Content';
import { stories } from '@site/src/data/stories';

jest.mock('framer-motion', () => ({
  domAnimation: {},
  // eslint-disable-next-line react/jsx-no-useless-fragment,react/prop-types
  LazyMotion: ({ children }) => <>{children}</>,
  m: {
    article: ({ children, className, ...props }) => (
      <article data-testid="story-article" className={className} {...props}>
        {children}
      </article>
    ),
  },
}));

// eslint-disable-next-line react/display-name,react/function-component-definition
jest.mock('@site/src/components/common/Heart', () => (props) => (
  // eslint-disable-next-line react/destructuring-assignment,react/prop-types
  <svg data-testid="heart" id={props.id} />
));

// eslint-disable-next-line react/display-name,react/function-component-definition,react/prop-types
jest.mock('@site/src/components/common/Link', () => ({ children, className, href }) => (
  // eslint-disable-next-line @docusaurus/no-html-links
  <a className={className} data-href={href} data-testid="link" href={href}>
    {children}
  </a>
));

jest.mock('@site/src/components/stories/Content/styles.module.css', () => ({
  content: 'content-class',
  story: 'story-class',
  endorsement: 'endorsement-class',
  dash: 'dash-class',
  topic: 'topic-class',
  name: 'name-class',
  title: 'title-class',
  affiliation: 'affiliation-class',
}));

jest.mock('@site/src/data/common', () => ({
  key: (value, prefix) => `${prefix}-${value}`,
}));

jest.mock('@site/src/data/stories', () => ({
  stories: [
    {
      affiliation: { children: 'Aff1', href: '/af1' },
      author: { children: 'Author1', href: '/a1' },
      content: 'Content1',
      header: { children: 'Header1', href: '/h1' },
      title: { children: 'Title1', href: '/t1' },
    },
    {
      affiliation: { children: 'Aff2', href: '/af2' },
      author: { children: 'Author2', href: '/a2' },
      content: 'Content2',
      header: { children: 'Header2', href: '/h2' },
      title: { children: 'Title2', href: '/t2' },
    },
  ],
}));

// eslint-disable-next-line react/display-name,react/function-component-definition,react/prop-types
jest.mock('@theme/Heading', () => ({ as, children }) => (
  <div data-testid="heading" data-as={as}>
    {children}
  </div>
));

describe('stories.Content', () => {
  it('renders a wrapper with the content class', () => {
    const { container } = render(<Content />);
    const wrapper = container.querySelector('.content-class');
    expect(wrapper).toBeInTheDocument();
  });

  it('renders one story per entry with heading, heart, content, and links', () => {
    render(<Content />);
    const articles = screen.getAllByTestId('story-article');

    // One <article> for each story
    expect(articles).toHaveLength(stories.length);

    articles.forEach((article, idx) => {
      // eslint-disable-next-line security/detect-object-injection
      const story = stories[idx];

      // article has the story CSS class
      expect(article).toHaveClass('story-class');

      // Heading as h2 with Link (header) and Heart
      const heading = within(article).getByTestId('heading');
      expect(heading).toHaveAttribute('data-as', 'h2');

      const headerLink = within(heading).getByTestId('link');
      expect(headerLink).toHaveAttribute('data-href', story.header.href);
      expect(headerLink).toHaveTextContent(story.header.children);

      const heart = within(heading).getByTestId('heart');
      expect(heart).toHaveAttribute('id', `story-${story.header.children}`);

      // Endorsement paragraph
      const endorsement = within(article).getByText(story.content);
      expect(endorsement).toHaveClass('endorsement-class');

      // There should be four links in total: header, author, title, affiliation
      const links = within(article).getAllByTestId('link');
      const hrefs = links.map((a) => a.getAttribute('data-href'));
      expect(hrefs).toEqual([
        story.header.href,
        story.author.href,
        story.title.href,
        story.affiliation.href,
      ]);
    });
  });
});
