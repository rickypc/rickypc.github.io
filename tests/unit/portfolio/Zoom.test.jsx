/*!
 * All the code that follow is
 * Copyright (c) 2015 - 2025 Richard Huang <rickypc@users.noreply.github.com>.
 * All Rights Reserved. Not for reuse without permission.
 * ----------------------------------------------------------------------------
 * @jest-environment jsdom
 */

import { fireEvent, render, screen } from '@testing-library/react';
import { forwardRef } from 'react';
import '@testing-library/jest-dom';
import Zoom from '@site/src/components/portfolio/Zoom';

jest.mock('framer-motion', () => ({
  domMax: {},
  // eslint-disable-next-line react/jsx-no-useless-fragment,react/prop-types
  LazyMotion: ({ children }) => <>{children}</>,
  m: {
    div: ({ className, onClick, ...props }) => (
      /* eslint-disable-next-line jsx-a11y/click-events-have-key-events,
         jsx-a11y/no-static-element-interactions */
      <div className={className} data-testid="overlay" onClick={onClick} {...props} />
    ),
    // eslint-disable-next-line react/display-name,react/prop-types
    figure: forwardRef(({ children, className, ...props }, ref) => (
      <figure className={className} data-testid="figure" ref={ref} {...props}>
        {children}
      </figure>
    )),
  },
}));

// eslint-disable-next-line react/display-name,react/function-component-definition
jest.mock('@site/src/components/common/Image', () => (props) => (
  // eslint-disable-next-line jsx-a11y/alt-text
  <img data-testid="zoom-img" {...props} />
));

jest.mock(
  '@site/src/components/portfolio/Zoom/styles.module.css',
  () => ({
    lens: 'lens-class',
    overlay: 'overlay-class',
    zoomed: 'zoomed-class',
  }),
);

jest.mock('@site/src/data/common', () => ({
  a11y: (label) => ({ 'aria-label': label, role: 'img' }),
  clsx: (...classes) => classes.filter(Boolean).join(' '),
}));

describe('portfolio.Zoom', () => {
  let onClickMock;

  beforeEach(() => {
    onClickMock = jest.fn();
    document.body.classList.remove('no-scroll');
  });

  it('renders closed state when open.picture is not an object and ignores Escape key', () => {
    const open = { alt: 'Alt text', picture: undefined };
    render(<Zoom open={open} onClick={onClickMock} />);

    // No body lock
    expect(document.body).not.toHaveClass('no-scroll');

    // Overlay present, no image
    expect(screen.getByTestId('overlay')).toHaveClass('overlay-class');
    expect(screen.queryByTestId('zoom-img')).toBeNull();

    // Figure has a11y attributes
    const fig = screen.getByTestId('figure');
    expect(fig).toHaveAttribute('aria-label', open.alt);
    expect(fig).toHaveAttribute('role', 'img');

    // Pressing Escape when closed should NOT fire onClick
    fireEvent.keyUp(document, { key: 'Escape' });
    expect(onClickMock).not.toHaveBeenCalled();
  });

  it('opens: toggles no-scroll, resets scrollTop via setter, focuses figure, and shows image', () => {
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
    expect(screen.getByTestId('zoom-img')).toBeInTheDocument();
  });

  it('calls onClick when overlay or figure clicked', () => {
    const pic = { avif: '', fallback: {}, webp: '' };
    render(<Zoom open={{ alt: 'A', picture: pic }} onClick={onClickMock} />);

    fireEvent.click(screen.getByTestId('overlay'));
    fireEvent.click(screen.getByTestId('figure'));
    expect(onClickMock).toHaveBeenCalledTimes(2);
  });

  it('handles key events when opened: ignores non-Escape, fires on Escape, cleans up listener on unmount', () => {
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

  it('removes no-scroll class when open.picture toggles to non-object', () => {
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
