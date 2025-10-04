/*!
 * Copyright (c) 2015 - 2025 Richard Huang <rickypc@users.noreply.github.com>.
 * All Rights Reserved. Not for reuse without permission.
 * ----------------------------------------------------------------------------
 * @jest-environment jsdom
 */

import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { admonitions } from '@site/src/data/common';
import SpeechAdmonition from '@site/src/components/common/SpeechAdmonition';
import { useSpeech } from '@site/src/hooks/observer';

jest.mock('@site/src/hooks/observer');

describe('SpeechAdmonition', () => {
  it('does not render anything when speech is ready', () => {
    useSpeech.mockReturnValue([true]);
    const { container } = render(<SpeechAdmonition />);
    expect(container.firstChild).toBeNull();
  });

  it('renders admonition inside an <aside> when speech is not ready', () => {
    useSpeech.mockReturnValue([false]);
    render(<SpeechAdmonition />);

    const admon = screen.getByTestId('admonition');
    expect(admon).toHaveAttribute('data-type', admonitions.speech.type);
    expect(admon).toHaveTextContent(admonitions.speech.text);

    const aside = admon.closest('aside');
    expect(aside).toHaveAttribute('aria-hidden', 'true');
    expect(aside).toHaveClass('row');
  });
});
