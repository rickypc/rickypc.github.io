/*!
 * All the code that follow is
 * Copyright (c) 2015 - 2025 Richard Huang <rickypc@users.noreply.github.com>.
 * All Rights Reserved. Not for reuse without permission.
 * ----------------------------------------------------------------------------
 * @jest-environment jsdom
 */

import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import Greeting from '@site/src/components/home/Greeting';

jest.unmock('@site/src/components/home/Greeting');

describe('home.Greeting', () => {
  it('renders greeting text, IPA, Speech, and Heart inside Heading', () => {
    const { getByTestId } = render(<Greeting />);

    // Verify Heading wrapper
    const heading = getByTestId('heading');
    expect(heading.tagName).toEqual('H1');
    expect(heading.className).toEqual('greeting');

    // Greeting span
    const greetSpan = heading.querySelector(':scope>span');
    const ipaSpan = heading.querySelector('span.ipa');
    expect(greetSpan).toHaveTextContent('Hello, I\'m Ricky Huang');
    expect(ipaSpan).toHaveTextContent('/ˈɹɪki ˈhwɑːŋ/');
    expect(ipaSpan).toHaveClass('ipa');

    // Speech component
    const speech = getByTestId('speech');
    expect(speech).toHaveAttribute('lang', 'en-US');
    expect(speech).toHaveAttribute(
      'names',
      [
        'Alex',
        'Microsoft Guy Online (Natural) - English (United States)',
        'Microsoft David - English (United States)',
        'Google español',
        'Google US English',
      ].join('|'),
    );
    expect(speech).toHaveTextContent('ricky huang');

    // Heart component
    const heart = getByTestId('heart');
    expect(heart).toHaveAttribute('class', 'reaction');
    expect(heart).toHaveAttribute('id', 'home-landing');
  });
});
