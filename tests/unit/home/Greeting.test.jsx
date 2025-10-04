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

/* eslint-disable-next-line react/display-name,
   react/function-component-definition,react/prop-types */
jest.mock('@site/src/components/common/Heart', () => ({ id, className }) => (
  <span data-testid="heart" data-id={id} data-class={className} />
));

/* eslint-disable-next-line react/display-name,
   react/function-component-definition,react/prop-types */
jest.mock('@site/src/components/common/Speech', () => ({ lang, names, children }) => (
  <div
    data-lang={lang}
    // eslint-disable-next-line react/prop-types
    data-names={names.join('|')}
    data-testid="speech"
  >
    {children}
  </div>
));

describe('home.Greeting', () => {
  it('renders greeting text, IPA, Speech, and Heart inside Heading', () => {
    render(<Greeting />);

    // Verify Heading wrapper
    const heading = screen.getByTestId('heading');
    expect(heading.tagName).toEqual('H1');
    expect(heading.className).toEqual('greeting');

    // Greeting span
    const greetSpan = heading.querySelector(':scope>span');
    const ipaSpan = heading.querySelector('span.ipa');
    expect(greetSpan).toHaveTextContent('Hello, I\'m Ricky Huang');
    expect(ipaSpan).toHaveTextContent('/ˈɹɪki ˈhwɑːŋ/');
    expect(ipaSpan).toHaveClass('ipa');

    // Speech component
    const speech = screen.getByTestId('speech');
    expect(speech).toHaveAttribute('data-lang', 'en-US');
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
    expect(speech).toHaveTextContent('ricky huang');

    // Heart component
    const heart = screen.getByTestId('heart');
    expect(heart).toHaveAttribute('data-id', 'home-landing');
    expect(heart).toHaveAttribute('data-class', 'reaction');
  });
});
