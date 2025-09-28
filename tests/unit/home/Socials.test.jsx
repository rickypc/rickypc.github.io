/*!
 * All the code that follow is
 * Copyright (c) 2015 - 2025 Richard Huang <rickypc@users.noreply.github.com>.
 * All Rights Reserved. Not for reuse without permission.
 * ----------------------------------------------------------------------------
 * @jest-environment jsdom
 */

import { render, screen, within } from '@testing-library/react';
import '@testing-library/jest-dom';
import Socials from '@site/src/components/home/Socials';
import { socials } from '@site/src/data/home';

// eslint-disable-next-line react/display-name,react/function-component-definition
jest.mock('@site/src/components/common/Link', () => ({
  // eslint-disable-next-line react/prop-types
  children,
  // eslint-disable-next-line react/prop-types
  href,
  // eslint-disable-next-line react/prop-types
  title,
  // eslint-disable-next-line react/prop-types
  whileTap,
}) => (
  // eslint-disable-next-line @docusaurus/no-html-links,react/prop-types
  <a data-href={href} data-tap={whileTap?.scale} data-testid="link" data-title={title} href={href} title={title}>
    {children}
  </a>
));

jest.mock('@site/src/components/home/Socials/styles.module.css', () => ({
  social: 'social-class',
}));

jest.mock('@site/src/data/common', () => ({
  key: (value, prefix) => `${prefix}-${value}`,
}));

jest.mock('@site/src/data/home', () => ({
  socials: [
    {
      href: 'https://twitter.com/user',
      // eslint-disable-next-line react/destructuring-assignment,react/prop-types
      Icon: (props) => <svg data-testid={`icon-${props['aria-label']}`} {...props} />,
      title: 'Twitter',
    },
    {
      href: 'https://github.com/user',
      // eslint-disable-next-line react/destructuring-assignment,react/prop-types
      Icon: (props) => <svg data-testid={`icon-${props['aria-label']}`} {...props} />,
      title: 'GitHub',
    },
  ],
}));

describe('home.Socials', () => {
  it('renders one link per social entry', () => {
    const { container } = render(<Socials />);
    const ul = container.querySelector('ul');
    expect(ul).toHaveClass('social-class');

    const items = ul.querySelectorAll('li');
    expect(items).toHaveLength(socials.length);

    const links = screen.getAllByTestId('link');
    expect(links).toHaveLength(socials.length);

    links.forEach((link, i) => {
      // eslint-disable-next-line security/detect-object-injection
      const { title, href } = socials[i];
      expect(link).toHaveAttribute('href', href);
      expect(link).toHaveAttribute('title', title);
      const icon = within(link).getByTestId(`icon-${title}`);
      expect(icon).toHaveAttribute('role', 'img');
      expect(icon).toHaveAttribute('aria-label', title);
    });
  });
});
