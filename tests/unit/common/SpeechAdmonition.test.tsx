/*!
 * Copyright © 2015 Richard Huang <rickypc@users.noreply.github.com>
 * All rights reserved.
 * ----------------------------------------------------------------------------
 * @jest-environment jsdom
 */

import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { admonitions } from '@site/src/data/common';
import SpeechAdmonition from '@site/src/components/common/SpeechAdmonition';
import { useSpeech } from '@site/src/hooks/observer';

const useSpeechMock = jest.mocked(useSpeech);

jest.unmock('@site/src/components/common/SpeechAdmonition');

describe('SpeechAdmonition', () => {
  test('does not render anything when speech is ready', () => {
    useSpeechMock.mockReturnValue([true]);
    const { container } = render(<SpeechAdmonition />);
    // eslint-disable-next-line testing-library/no-node-access
    expect(container.firstChild).toBeNull();
  });

  test('renders admonition inside an <aside> when speech is not ready', () => {
    useSpeechMock.mockReturnValue([false]);
    render(<SpeechAdmonition />);

    const admon = screen.getByTestId('admonition');
    expect(admon).toHaveAttribute('data-type', admonitions.speech.type);
    expect(admon).toHaveTextContent(admonitions.speech.text);

    // eslint-disable-next-line testing-library/no-node-access
    const aside = admon.closest('aside');
    expect(aside).toHaveAttribute('aria-hidden', 'true');
    expect(aside).toHaveClass('row');
  });
});
