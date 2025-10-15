/*!
 * All the code that follow is
 * Copyright (c) 2015 - 2025 Richard Huang <rickypc@users.noreply.github.com>.
 * All Rights Reserved. Not for reuse without permission.
 * ----------------------------------------------------------------------------
 * @jest-environment jsdom
 */

import { render, within } from '@testing-library/react';
import '@testing-library/jest-dom';
import {
  greeting,
  hats,
  image,
  ipa,
  layout,
  socials,
} from '@site/src/data/home';

describe('data.home', () => {
  it('renders greeting fragment with two spans', () => {
    const { container } = render(<div>{greeting}</div>);
    const spans = container.querySelectorAll('span');
    expect(spans).toHaveLength(2);
    expect(spans[0]).toHaveTextContent("Hello, I'm");
    expect(spans[1]).toHaveAttribute('translate', 'no');
    expect(spans[1]).toHaveTextContent('Ricky Huang');
  });

  it('exports four hats with correct children (img + Reveal)', () => {
    expect(Array.isArray(hats)).toBeTruthy();
    expect(hats).toHaveLength(4);

    const expectedAlts = ['Pilot', 'Software Engineer', 'Unicorn', 'Rocket'];

    hats.forEach((hat, i) => {
      // label exists
      expect(typeof hat.label).toEqual('string');
      expect(hat.label.length).toBeGreaterThan(0);

      // children -> <img>
      const { container } = render(<div>{hat.children}</div>);
      const img = container.querySelector('img');
      expect(img).toBeInTheDocument();
      // eslint-disable-next-line security/detect-object-injection
      expect(img).toHaveAttribute('alt', expectedAlts[i]);
    });
  });

  it('each hat.description renders at least one link', () => {
    hats.forEach((hat) => {
      const { container } = render(<div>{hat.description}</div>);
      const links = within(container).getAllByTestId(/^link-/);
      expect(links.length).toBeGreaterThan(0);
      links.forEach((a) => {
        expect(a).toHaveAttribute('href');
        expect(a.textContent.length).toBeGreaterThan(0);
      });
    });
  });

  it('exports image with correct alt and picture props', () => {
    expect(image.alt).toEqual('Ricky Huang');
    expect(image.picture.fallback).toEqual('self.png');
    expect(image.picture.webp).toEqual('self.webp');
  });

  it('exports ipa string correctly', () => {
    expect(ipa).toEqual('/ˈɹɪki ˈhwɑːŋ/');
  });

  it('exports layout with description, keywords array, and title', () => {
    expect(typeof layout.description).toEqual('string');
    expect(layout.description).toMatch(/^Welcome to Ricky Huang\'s site/);

    expect(Array.isArray(layout.keywords)).toBeTruthy();
    expect(layout.keywords.length).toBeGreaterThan(0);

    expect(typeof layout.title).toEqual('string');
    expect(layout.title).toContain('Engineering Leadership');
  });

  it('exports two socials entries with href, title, and Icon component', () => {
    expect(Array.isArray(socials)).toBeTruthy();
    expect(socials).toHaveLength(2);

    socials.forEach(({ href, title, Icon }) => {
      expect(typeof href).toEqual('string');
      // Icon is the internal FaGithub or FaLinkedin
      expect(typeof Icon).toEqual('function');
      expect(typeof title).toEqual('string');

      // Render and scope the <svg data-testid="icon"> to this icon’s own container
      const { container } = render((
        <Icon className="foo" style={{}} title="bar" />
      ));
      const icon = within(container).getByTestId('icon-svg');
      expect(icon).toBeInTheDocument();

      // Check that GenIcon config matches expected viewBox
      const config = JSON.parse(icon.getAttribute('data-config'));
      expect(config.attr.viewBox).toEqual(title === 'Github' ? '0 0 496 512' : '0 0 448 512');

      // Props round-trip
      const props = JSON.parse(icon.getAttribute('data-props'));
      expect(props).toMatchObject({ className: 'foo', title: 'bar' });
    });
  });
});
