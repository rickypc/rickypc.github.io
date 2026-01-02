/*!
 * Copyright © 2015 Richard Huang <rickypc@users.noreply.github.com>
 * All rights reserved.
 * ----------------------------------------------------------------------------
 * @jest-environment jsdom
 */

import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Home from '@site/src/pages/index';
import { layout } from '@site/src/data/home';

describe('pages.index', () => {
  test('renders Layout with correct class and layout props; places Greeting, Hats+Figure and Socials in correct DOM structure', () => {
    render(<Home />);

    const figure = screen.getByTestId('figure');
    expect(figure).toBeInTheDocument();

    // eslint-disable-next-line testing-library/no-node-access
    const figureSection = figure.closest('section');
    expect(figureSection).toBeTruthy();
    expect(figureSection).toContainElement(figure);

    const greeting = screen.getByTestId('greeting');
    expect(greeting).toBeInTheDocument();
    expect(greeting).toHaveTextContent('home.greeting');

    const hats = screen.getByTestId('hats');
    expect(hats).toBeInTheDocument();

    // eslint-disable-next-line testing-library/no-node-access
    const hatsSection = hats.closest('section');
    expect(hatsSection).toBeTruthy();
    expect(hatsSection).toContainElement(hats);

    // eslint-disable-next-line testing-library/no-node-access
    const header = greeting.closest('header');
    expect(header).toBeTruthy();
    expect(header).toContainElement(greeting);

    const layoutEl = screen.getByTestId('layout');
    expect(layoutEl).toBeInTheDocument();
    expect(layoutEl).toHaveAttribute('class', 'home');
    expect(layoutEl.getAttribute('title')).toContain(layout.title);

    const socials = screen.getByTestId('socials');
    expect(socials).toBeInTheDocument();
    expect(socials).toHaveTextContent('home.socials');

    // eslint-disable-next-line testing-library/no-node-access
    const socialsSection = socials.closest('section');
    expect(socialsSection).toBeTruthy();
    expect(socialsSection).toContainElement(socials);
  });
});
