/*!
 * Copyright © 2015 Richard Huang <rickypc@users.noreply.github.com>
 * All rights reserved.
 * ----------------------------------------------------------------------------
 * @jest-environment jsdom
 */

import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Greeting from '@site/src/components/home/Greeting';

jest.unmock('@site/src/components/home/Greeting');

describe('home.Greeting', () => {
  test('renders greeting text, IPA, Playback, and Heart inside Heading', () => {
    const { container } = render(<Greeting />);

    // Verify Heading wrapper.
    // eslint-disable-next-line testing-library/no-container,testing-library/no-node-access
    const heading = container.querySelector('.greeting');
    expect(heading!.tagName).toBe('DIV');

    // Greeting span.
    // eslint-disable-next-line testing-library/no-node-access
    const greetSpan = heading!.querySelector(':scope>span');
    // eslint-disable-next-line testing-library/no-node-access
    const ipaSpan = heading!.querySelector('span.ipa');
    expect(greetSpan).toHaveTextContent('Hello, I\'m Ricky Huang');
    expect(ipaSpan).toHaveTextContent('/ˈɹɪki ˈhwɑːŋ/');
    expect(ipaSpan).toHaveClass('ipa');

    // Playback component.
    const playback = screen.getByTestId('playback');
    expect(playback).toHaveAttribute('data-path', expect.stringContaining('_ricky_huang'));
    expect(playback).toHaveAttribute('data-transliteration', JSON.stringify({
      children: 'Ricky Huang',
      title: 'Ricky Huang',
    }));

    // Heart component.
    const heart = screen.getByTestId('heart');
    expect(heart).toHaveAttribute('class', 'reaction');
    expect(heart).toHaveAttribute('id', 'home-landing');
  });
});
