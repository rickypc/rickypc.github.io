/*!
 * Copyright (c) 2015 - 2025 Richard Huang <rickypc@users.noreply.github.com>.
 * All Rights Reserved. Not for reuse without permission.
 * ----------------------------------------------------------------------------
 * @jest-environment jsdom
 */

import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import Home from '@site/src/pages/index';
import { layout } from '@site/src/data/home';

describe('pages.index', () => {
  test('renders Layout with correct class and layout props; places Greeting, Hats+Figure and Socials in correct DOM structure', () => {
    const { getByTestId } = render(<Home />);

    const figure = getByTestId('figure');
    expect(figure).toBeInTheDocument();

    const figureSection = figure.closest('section');
    expect(figureSection).toBeTruthy();
    expect(figureSection).toContainElement(figure);

    const greeting = getByTestId('greeting');
    expect(greeting).toBeInTheDocument();
    expect(greeting).toHaveTextContent('home.greeting');

    const hats = getByTestId('hats');
    expect(hats).toBeInTheDocument();

    const hatsSection = hats.closest('section');
    expect(hatsSection).toBeTruthy();
    expect(hatsSection).toContainElement(hats);

    const header = greeting.closest('header');
    expect(header).toBeTruthy();
    expect(header).toContainElement(greeting);

    const layoutEl = getByTestId('layout');
    expect(layoutEl).toBeInTheDocument();
    expect(layoutEl).toHaveAttribute('class', 'home');
    expect(layoutEl.getAttribute('title')).toContain(layout.title);

    const socials = getByTestId('socials');
    expect(socials).toBeInTheDocument();
    expect(socials).toHaveTextContent('home.socials');

    const socialsSection = socials.closest('section');
    expect(socialsSection).toBeTruthy();
    expect(socialsSection).toContainElement(socials);
  });
});
