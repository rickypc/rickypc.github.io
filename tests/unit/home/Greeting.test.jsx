/*!
 * All the code that follow is
 * Copyright (c) 2015 - 2025 Richard Huang <rickypc@users.noreply.github.com>.
 * All Rights Reserved. Not for reuse without permission.
 * ----------------------------------------------------------------------------
 * @jest-environment jsdom
 */

import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Greeting from '@site/src/components/home/Greeting';

jest.unmock('@site/src/components/home/Greeting');

describe('home.Greeting', () => {
  it('renders greeting text, IPA, Speech, and Heart inside Heading', () => {
    render(<Greeting />);

    // Verify Heading wrapper.
    const heading = screen.getByTestId('heading');
    expect(heading.tagName).toEqual('H1');
    expect(heading.className).toEqual('greeting');

    // Greeting span.
    // eslint-disable-next-line testing-library/no-node-access
    const greetSpan = heading.querySelector(':scope>span');
    // eslint-disable-next-line testing-library/no-node-access
    const ipaSpan = heading.querySelector('span.ipa');
    expect(greetSpan).toHaveTextContent('Hello, I\'m Ricky Huang');
    expect(ipaSpan).toHaveTextContent('/ˈɹɪki ˈhwɑːŋ/');
    expect(ipaSpan).toHaveClass('ipa');

    // Speech component.
    const speech = screen.getByTestId('speech');
    expect(speech).toHaveAttribute(
      'data-names',
      [
        'Alex',
        'Microsoft Guy Online (Natural) - English (United States)',
        'Microsoft David - English (United States)',
        'Google español',
        'Google US English',
      ].join('|'),
    );
    expect(speech).toHaveAttribute('lang', 'en-US');
    expect(speech).toHaveTextContent('ricky huang');

    // Heart component.
    const heart = screen.getByTestId('heart');
    expect(heart).toHaveAttribute('class', 'reaction');
    expect(heart).toHaveAttribute('id', 'home-landing');
  });
});
