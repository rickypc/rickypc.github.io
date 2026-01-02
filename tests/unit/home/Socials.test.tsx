/*!
 * Copyright © 2015 Richard Huang <rickypc@users.noreply.github.com>
 * All rights reserved.
 * ----------------------------------------------------------------------------
 * @jest-environment jsdom
 */

import { render, screen, within } from '@testing-library/react';
import '@testing-library/jest-dom';
import Socials from '@site/src/components/home/Socials';
import { socials } from '@site/src/data/home';

jest.unmock('@site/src/components/home/Socials');

describe('home.Socials', () => {
  it('renders one link per social entry', () => {
    const { container } = render(<Socials />);
    // eslint-disable-next-line testing-library/no-container,testing-library/no-node-access
    const ul = container.querySelector('ul');
    expect(ul).toHaveClass('social');

    // eslint-disable-next-line testing-library/no-node-access
    const items = ul?.querySelectorAll('li');
    expect(items).toHaveLength(socials.length);

    const links = screen.getAllByTestId(/^link-/);
    expect(links).toHaveLength(socials.length);

    links.forEach((link, i) => {
      // eslint-disable-next-line security/detect-object-injection
      const { href, title } = socials[i];
      expect(link).toHaveAttribute('href', href);
      expect(link).toHaveAttribute('title', title);
      const icon = within(link).getByLabelText(title);
      expect(icon).toHaveAttribute('role', 'img');
      expect(icon).toHaveAttribute('aria-label', title);
    });
  });
});
