/*!
 * Copyright (c) 2015 - 2025 Richard Huang <rickypc@users.noreply.github.com>.
 * All Rights Reserved. Not for reuse without permission.
 * ----------------------------------------------------------------------------
 * @jest-environment jsdom
 */

import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Welcome from '@site/src/components/common/Welcome';
import { useWelcome } from '@site/src/hooks/observer';

// eslint-disable-next-line react/display-name,react/function-component-definition
jest.mock('@site/src/components/common/PrintAdmonition', () => () => (
  <div data-testid="print-admonition" />
));

// eslint-disable-next-line react/display-name,react/function-component-definition
jest.mock('@site/src/components/common/SpeechAdmonition', () => () => (
  <div data-testid="speech-admonition" />
));

jest.mock('@site/src/hooks/observer', () => ({
  useWelcome: jest.fn(),
}));

describe('Welcome', () => {
  it('calls useWelcome with navigation=false by default and renders both admonitions', () => {
    render(<Welcome />);
    expect(useWelcome).toHaveBeenCalledWith({ navigation: false });
    expect(screen.getByTestId('print-admonition')).toBeInTheDocument();
    expect(screen.getByTestId('speech-admonition')).toBeInTheDocument();
  });

  it('calls useWelcome with navigation=true when prop is true', () => {
    render(<Welcome navigation />);
    expect(useWelcome).toHaveBeenCalledWith({ navigation: true });
  });
});
