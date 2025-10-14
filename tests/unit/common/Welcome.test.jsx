/*!
 * Copyright (c) 2015 - 2025 Richard Huang <rickypc@users.noreply.github.com>.
 * All Rights Reserved. Not for reuse without permission.
 * ----------------------------------------------------------------------------
 * @jest-environment jsdom
 */

import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import Welcome from '@site/src/components/common/Welcome';
import { useWelcome } from '@site/src/hooks/observer';

describe('Welcome', () => {
  it('calls useWelcome with navigation=false by default and renders both admonitions', () => {
    const { getByTestId } = render(<Welcome />);
    expect(useWelcome).toHaveBeenCalledWith({ navigation: false });
    expect(getByTestId('print-admonition')).toBeInTheDocument();
    expect(getByTestId('speech-admonition')).toBeInTheDocument();
  });

  it('calls useWelcome with navigation=true when prop is true', () => {
    render(<Welcome navigation />);
    expect(useWelcome).toHaveBeenCalledWith({ navigation: true });
  });
});
