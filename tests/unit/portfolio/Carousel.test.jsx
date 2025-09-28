/*!
 * All the code that follow is
 * Copyright (c) 2015 - 2025 Richard Huang <rickypc@users.noreply.github.com>.
 * All Rights Reserved. Not for reuse without permission.
 * ----------------------------------------------------------------------------
 * @jest-environment jsdom
 */

import {
  act,
  fireEvent,
  render,
  screen,
} from '@testing-library/react';
import { forwardRef } from 'react';
import '@testing-library/jest-dom';
import Carousel from '@site/src/components/portfolio/Carousel';
import useEmblaCarousel from 'embla-carousel-react';

jest.mock('embla-carousel-react', () => jest.fn());

jest.mock('framer-motion', () => ({
  // eslint-disable-next-line react/jsx-no-useless-fragment,react/prop-types
  AnimatePresence: ({ children }) => <>{children}</>,
  domMax: {},
  // eslint-disable-next-line react/jsx-no-useless-fragment,react/prop-types
  LazyMotion: ({ children }) => <>{children}</>,
  m: { span: ({ children, ...props }) => <span {...props}>{children}</span> },
}));

// eslint-disable-next-line react/display-name
jest.mock('@site/src/components/common/Button', () => forwardRef((props, ref) => {
  // eslint-disable-next-line react/prop-types
  const { children, onClick, ...rest } = props;
  const handleRef = (node) => {
    if (node) {
      // eslint-disable-next-line no-param-reassign,no-underscore-dangle
      node._handler = onClick;
    }
    if (typeof ref === 'function') {
      ref(node);
    } else if (ref) {
      // eslint-disable-next-line no-param-reassign
      ref.current = node;
    }
  };
  return (
    // eslint-disable-next-line react/button-has-type
    <button
      data-testid="btn"
      onClick={onClick}
      ref={handleRef}
      {...rest}
    >
      {children}
    </button>
  );
}));

// eslint-disable-next-line react/display-name,react/function-component-definition
jest.mock('@site/src/components/common/Image', () => (props) => (
  // eslint-disable-next-line jsx-a11y/alt-text
  <img data-testid="img" {...props} />
));

jest.mock(
  '@site/src/components/portfolio/Carousel/styles.module.css',
  () => ({
    active: 'active-class',
    buttons: 'buttons-class',
    carousel: 'carousel-class',
    controls: 'controls-class',
    dot: 'dot-class',
    dots: 'dots-class',
    dragging: 'dragging-class',
    outline: 'outline-class',
    slide: 'slide-class',
    slider: 'slider-class',
    viewport: 'viewport-class',
  }),
);

jest.mock('@site/src/data/common', () => ({
  a11y: (label) => ({ role: 'button', 'aria-label': label }),
  clsx: (...classes) => classes.filter(Boolean).join(' '),
  key: (value, prefix) => `${prefix}-${value}`,
}));

describe('portfolio.Carousel', () => {
  let api;
  let onClickMock;
  let setViewport;

  beforeEach(() => {
    jest.useFakeTimers();

    api = {
      off: jest.fn(),
      on: jest.fn(),
      rootNode: jest.fn().mockReturnValue({
        classList: { add: jest.fn(), remove: jest.fn() },
      }),
      scrollNext: jest.fn(),
      scrollPrev: jest.fn(),
      scrollTo: jest.fn(),
      selectedScrollSnap: jest.fn().mockReturnValue(0),
      slidesInView: jest.fn().mockReturnValue([0]),
    };

    onClickMock = jest.fn();
    setViewport = jest.fn();
    useEmblaCarousel.mockReturnValue([setViewport, api]);
  });

  afterEach(() => {
    act(() => jest.runOnlyPendingTimers());
    jest.useRealTimers();
  });

  it('debounces rapid Next clicks and supports cancel()', () => {
    const images = [
      { alt: 'One', src: 'one.png' },
      { alt: 'Two', src: 'two.png' },
    ];
    render(<Carousel images={images} onClick={onClickMock} prefix="test" />);

    const nextBtn = screen.getByRole('button', { name: 'Next' });
    expect(nextBtn).toBeInTheDocument();

    // Click twice rapidly
    fireEvent.click(nextBtn);
    fireEvent.click(nextBtn);

    // Grab the debounced handler
    // eslint-disable-next-line no-underscore-dangle
    const handler = nextBtn._handler;
    expect(typeof handler).toBe('function');

    // Cancel before timeout
    handler.cancel();
    act(() => jest.advanceTimersByTime(300));
    expect(api.scrollNext).not.toHaveBeenCalled();

    // Click once normally
    fireEvent.click(nextBtn);
    act(() => jest.advanceTimersByTime(300));
    expect(api.scrollNext).toHaveBeenCalledTimes(1);
  });

  it('renders controls, handles dots, drag add/remove, and cleans up', () => {
    const images = [
      { alt: 'One', src: 'one.png' },
      { alt: 'Two', src: 'two.png' },
    ];
    const { container, unmount } = render(<Carousel images={images} onClick={onClickMock} prefix="test" />);

    expect(setViewport).toHaveBeenCalled();
    expect(container.querySelector('.controls-class')).toBeInTheDocument();

    const prevBtn = screen.getByRole('button', { name: 'Previous' });
    const nextBtn = screen.getByRole('button', { name: 'Next' });
    expect(prevBtn).toBeInTheDocument();
    expect(nextBtn).toBeInTheDocument();

    // Debounced prev
    fireEvent.click(prevBtn);
    fireEvent.click(prevBtn);
    act(() => jest.advanceTimersByTime(250));
    expect(api.scrollPrev).toHaveBeenCalledTimes(1);

    // Dot buttons
    const dots = container.querySelectorAll('.dot-class');
    expect(dots).toHaveLength(2);

    fireEvent.click(dots[1]);
    expect(api.scrollTo).toHaveBeenCalledWith(1);

    expect(container.querySelectorAll('.outline-class')).toHaveLength(1);

    // on() was called for two slidesInView, pointerDown, pointerUp
    const registrations = api.on.mock.calls.map(([evt]) => evt);
    expect(registrations).toEqual(
      expect.arrayContaining([
        'pointerDown',
        'pointerUp',
        'slidesInView',
      ]),
    );

    // Trigger drag add/remove
    const onDragDown = api.on.mock.calls.find(([e]) => e === 'pointerDown')[1];
    const onDragUp = api.on.mock.calls.find(([e]) => e === 'pointerUp')[1];

    act(() => onDragDown(null, 'pointerDown'));
    expect(api.rootNode().classList.add).toHaveBeenCalledWith('dragging-class');

    act(() => onDragUp(null, 'pointerUp'));
    expect(api.rootNode().classList.remove).toHaveBeenCalledWith('dragging-class');

    // Cleanup on unmount
    unmount();
    expect(api.off).toHaveBeenCalledWith('pointerDown', expect.any(Function));
    expect(api.off).toHaveBeenCalledWith('pointerUp', expect.any(Function));
    expect(api.off).toHaveBeenCalledWith('slidesInView', expect.any(Function));
  });

  it('lazy loads slides, covers loaded=true branch, and fires onClick', () => {
    const images = [
      { alt: 'One', src: 'one.png' },
      { alt: 'Two', src: 'two.png' },
    ];
    const { container } = render(<Carousel images={images} onClick={onClickMock} prefix="test" />);

    act(() => jest.advanceTimersByTime(600));
    let imgs = container.querySelectorAll('img');
    expect(imgs).toHaveLength(1);

    // Fire onLoad to set loaded = true
    fireEvent.load(imgs[0]);
    act(() => jest.advanceTimersByTime(1));

    imgs = container.querySelectorAll('img');
    expect(imgs).toHaveLength(1);

    const slides = container.querySelectorAll('.slide-class');
    expect(slides).toHaveLength(2);

    fireEvent.click(slides[0]);
    expect(onClickMock).toHaveBeenCalledWith(images[0]);
  });
});
