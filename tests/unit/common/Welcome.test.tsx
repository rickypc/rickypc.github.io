/*!
 * Copyright © 2015 Richard Huang <rickypc@users.noreply.github.com>
 * All rights reserved.
 * ----------------------------------------------------------------------------
 * @jest-environment jsdom
 */

import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Welcome from '@site/src/components/common/Welcome';
import { usePrint, useWelcome } from '@site/src/hooks/observer';

const usePrintMock = jest.mocked(usePrint);

describe('Welcome', () => {
  test('calls useWelcome with navigation=false by default and renders speech admonition', () => {
    usePrintMock.mockReturnValue([false]);
    render(<Welcome />);
    expect(useWelcome).toHaveBeenCalledWith({ navigation: false });
    expect(screen.getByTestId('speech-admonition')).toBeInTheDocument();
  });

  test('calls useWelcome with navigation=true when prop is true', () => {
    usePrintMock.mockReturnValue([false]);
    render(<Welcome navigation />);
    expect(useWelcome).toHaveBeenCalledWith({ navigation: true });
  });

  test('expands details when printing=true and restores when printing=false', async () => {
    // Create mock <details> elements with a child <div>.
    const details1 = document.createElement('details');
    const div1 = document.createElement('div');
    details1.appendChild(div1);
    // Initially closed.
    details1.open = false;
    document.body.appendChild(details1);

    const details2 = document.createElement('details');
    const div2 = document.createElement('div');
    details2.appendChild(div2);
    // Initially open.
    details2.open = true;
    document.body.appendChild(details2);

    // First render with printing=true.
    usePrintMock.mockReturnValue([true]);
    const { rerender } = render(<Welcome />);

    // Both details should be forced open and styled.
    expect(details1.open).toBeTruthy();
    expect(details1.dataset.collapsed).toBe('false');
    expect(div1.style.display).toBe('block');
    expect(div1.style.height).toBe('auto');
    expect(div1.style.overflow).toBe('visible');

    expect(details2.open).toBeTruthy();
    expect(details2.dataset.collapsed).toBe('false');
    expect(div2.style.display).toBe('block');
    expect(div2.style.height).toBe('auto');
    expect(div2.style.overflow).toBe('visible');

    // Re-render with printing=false.
    usePrintMock.mockReturnValue([false]);
    // Changing props to trigger the rerender correctly.
    rerender(<Welcome navigation />);

    // details1 was originally closed, so it should be collapsed again.
    expect(details1.open).toBeFalsy();
    expect(details1.dataset.collapsed).toBe('true');
    expect(div1.style.display).toBe('none');
    expect(div1.style.height).toBe('0px');
    expect(div1.style.overflow).toBe('hidden');

    // details2 was originally open, so it should remain open.
    expect(details2.open).toBeTruthy();
    expect(details2.dataset.collapsed).not.toBe('true');
  });
});
