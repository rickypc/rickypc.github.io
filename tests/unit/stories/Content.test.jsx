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

jest.unmock('@site/src/components/stories/Content');

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

describe('stories.Content', () => {
  it('renders a wrapper with the content class', () => {
    const { container } = render(<Content />);
    // eslint-disable-next-line testing-library/no-container,testing-library/no-node-access
    const wrapper = container.querySelector('.content');
    expect(wrapper).toBeInTheDocument();
  });

  it('renders one story per entry with heading, heart, content, and links', () => {
    render(<Content />);
    const articles = screen.getAllByTestId('article');

    // One <article> for each story.
    expect(articles).toHaveLength(stories.length);

    articles.forEach((article, idx) => {
      // eslint-disable-next-line security/detect-object-injection
      const story = stories[idx];

      // article has the story CSS class.
      expect(article).toHaveClass('story');

      // Heading as h2 with Link (header) and Heart.
      const heading = within(article).getByTestId('heading');
      expect(heading.tagName).toBe('H2');

      const headerLink = within(heading).getByTestId(/^link-/);
      expect(headerLink).toHaveAttribute('href', story.header.href);
      // eslint-disable-next-line testing-library/no-node-access
      expect(headerLink).toHaveTextContent(story.header.children);

      const heart = within(heading).getByTestId('heart');
      // eslint-disable-next-line testing-library/no-node-access
      expect(heart).toHaveAttribute('id', `story-${story.header.children.toLowerCase()}`);

      // Endorsement paragraph.
      const endorsement = within(article).getByText(story.content);
      expect(endorsement).toHaveClass('endorsement');

      // There should be four links in total: header, author, title, affiliation.
      const links = within(article).getAllByTestId(/^link-/);
      const hrefs = links.map((a) => a.getAttribute('href'));
      expect(hrefs).toEqual([
        story.header.href,
        story.author.href,
        story.title.href,
        story.affiliation.href,
      ]);
    });
  });
});
