/*!
 * Copyright © 2015 Richard Huang <rickypc@users.noreply.github.com>
 * All rights reserved.
 * ----------------------------------------------------------------------------
 * @jest-environment jsdom
 */

import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Zoom from '@site/src/components/portfolio/Zoom';

jest.unmock('@site/src/components/portfolio/Zoom');

describe('portfolio.Zoom', () => {
  let onClickMock: jest.MockedFunction<any>;

  beforeEach(() => {
    onClickMock = jest.fn();
    document.body.classList.remove('no-scroll');
  });

  test('renders closed state when open.picture is not an object and ignores Escape key', () => {
    const open = { alt: 'Alt text', picture: undefined };
    render(<Zoom open={open} onClick={onClickMock} />);

    // No body lock
    expect(document.body).not.toHaveClass('no-scroll');

    // Overlay present, no image
    expect(screen.getByTestId('div')).toHaveClass('overlay');
    expect(screen.queryByTestId(/^img-/)).toBeNull();

    // Figure has a11y attributes
    const fig = screen.getByTestId('figure');
    expect(fig).toHaveAttribute('aria-label', open.alt);
    expect(fig).toHaveAttribute('title', open.alt);

    // Pressing Escape when closed should NOT fire onClick
    fireEvent.keyUp(document, { key: 'Escape' });
    expect(onClickMock).not.toHaveBeenCalled();
  });

  test('opens: toggles no-scroll, resets scrollTop via setter, focuses figure, and shows image', () => {
    const alt = 'Alt text';
    const picture = { avif: 'x.avif', fallback: {}, webp: 'x.webp' };

    // Initial closed render
    const { rerender } = render(<Zoom open={{ alt, picture: undefined }} onClick={onClickMock} />);

    const fig = screen.getByTestId('figure');

    // Spy on scrollTop setter and focus()
    const scrollSetter = jest.fn();
    Object.defineProperty(fig, 'scrollTop', { set: scrollSetter });
    const focusSpy = jest.spyOn(fig, 'focus');

    // Re-render opened
    rerender(<Zoom open={{ alt, picture }} onClick={onClickMock} />);

    // Body locked, scrollTop reset, figure focused, image shown
    expect(document.body).toHaveClass('no-scroll');
    expect(scrollSetter).toHaveBeenCalledWith(0);
    expect(focusSpy).toHaveBeenCalled();
    expect(screen.getByTestId(/^img-/)).toBeInTheDocument();
  });

  test('calls onClick when overlay or figure clicked', () => {
    const pic = { avif: '', fallback: {}, webp: '' };
    render(<Zoom open={{ alt: 'A', picture: pic }} onClick={onClickMock} />);

    fireEvent.click(screen.getByTestId('div'));
    fireEvent.click(screen.getByTestId('figure'));
    expect(onClickMock).toHaveBeenCalledTimes(2);
  });

  test('handles key events when opened: ignores non-Escape, fires on Escape, cleans up listener on unmount', () => {
    const pic = { avif: '', fallback: {}, webp: '' };
    const { unmount } = render(<Zoom open={{ alt: 'K', picture: pic }} onClick={onClickMock} />);

    // Non-Escape
    fireEvent.keyUp(document, { key: 'Enter' });
    expect(onClickMock).not.toHaveBeenCalled();

    // Escape
    fireEvent.keyUp(document, { key: 'Escape' });
    expect(onClickMock).toHaveBeenCalledTimes(1);

    // Cleanup
    unmount();
    fireEvent.keyUp(document, { key: 'Escape' });
    expect(onClickMock).toHaveBeenCalledTimes(1);
  });

  test('removes no-scroll class when open.picture toggles to non-object', () => {
    const alt = 'A';
    const picture = { avif: '', fallback: {}, webp: '' };
    const { rerender } = render(<Zoom open={{ alt, picture }} onClick={onClickMock} />);

    // initially opened
    expect(document.body).toHaveClass('no-scroll');

    // rerender closed
    rerender(<Zoom open={{ alt, picture: undefined }} onClick={onClickMock} />);
    expect(document.body).not.toHaveClass('no-scroll');
  });
});
