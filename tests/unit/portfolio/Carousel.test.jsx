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
import '@testing-library/jest-dom';
import Carousel from '@site/src/components/portfolio/Carousel';
import useEmblaCarousel from 'embla-carousel-react';

jest.unmock('@site/src/components/portfolio/Carousel');

describe('portfolio.Carousel', () => {
  let api;
  const images = [
    { alt: 'One', picture: { fallback: 'one.png' } },
    { alt: 'Two', picture: { fallback: 'two.png' } },
  ];
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
    render(<Carousel images={images} onClick={onClickMock} prefix="test" />);

    const nextBtn = screen.getByRole('button', { name: 'Next' });
    expect(nextBtn).toBeInTheDocument();

    // Click twice rapidly.
    fireEvent.click(nextBtn);
    fireEvent.click(nextBtn);

    // Grab the debounced handler.
    // eslint-disable-next-line no-underscore-dangle
    const handler = nextBtn._handler;
    expect(typeof handler).toEqual('function');

    // Cancel before timeout.
    handler.cancel();
    act(() => jest.advanceTimersByTime(300));
    expect(api.scrollNext).not.toHaveBeenCalled();

    // Click once normally.
    fireEvent.click(nextBtn);
    act(() => jest.advanceTimersByTime(300));
    expect(api.scrollNext).toHaveBeenCalledTimes(1);
  });

  it('renders controls, handles dots, drag add/remove, and cleans up', () => {
    const { container, unmount } = render(<Carousel images={images} onClick={onClickMock} prefix="test" />);

    expect(setViewport).toHaveBeenCalled();
    // eslint-disable-next-line testing-library/no-container,testing-library/no-node-access
    expect(container.querySelector('.controls')).toBeInTheDocument();

    const prevBtn = screen.getByRole('button', { name: 'Previous' });
    const nextBtn = screen.getByRole('button', { name: 'Next' });
    expect(prevBtn).toBeInTheDocument();
    expect(nextBtn).toBeInTheDocument();

    // Debounced prev.
    fireEvent.click(prevBtn);
    fireEvent.click(prevBtn);
    act(() => jest.advanceTimersByTime(250));
    expect(api.scrollPrev).toHaveBeenCalledTimes(1);

    // Dot buttons.
    // eslint-disable-next-line testing-library/no-container,testing-library/no-node-access
    const dots = container.querySelectorAll('.dot');
    expect(dots).toHaveLength(2);

    fireEvent.click(dots[1]);
    expect(api.scrollTo).toHaveBeenCalledWith(1);

    // eslint-disable-next-line testing-library/no-container,testing-library/no-node-access
    expect(container.querySelectorAll('.outline')).toHaveLength(1);

    // on() was called for two slidesInView, pointerDown, pointerUp.
    const registrations = api.on.mock.calls.map(([evt]) => evt);
    expect(registrations).toEqual(
      expect.arrayContaining([
        'pointerDown',
        'pointerUp',
        'slidesInView',
      ]),
    );

    // Trigger drag add/remove.
    const onDragDown = api.on.mock.calls.find(([e]) => e === 'pointerDown')[1];
    const onDragUp = api.on.mock.calls.find(([e]) => e === 'pointerUp')[1];

    act(() => onDragDown(null, 'pointerDown'));
    // eslint-disable-next-line testing-library/no-node-access
    expect(api.rootNode().classList.add).toHaveBeenCalledWith('dragging');

    act(() => onDragUp(null, 'pointerUp'));
    // eslint-disable-next-line testing-library/no-node-access
    expect(api.rootNode().classList.remove).toHaveBeenCalledWith('dragging');

    // Cleanup on unmount.
    unmount();
    expect(api.off).toHaveBeenCalledWith('pointerDown', expect.any(Function));
    expect(api.off).toHaveBeenCalledWith('pointerUp', expect.any(Function));
    expect(api.off).toHaveBeenCalledWith('slidesInView', expect.any(Function));
  });

  it('lazy loads slides, covers loaded=true branch, and fires onClick', () => {
    const { container } = render(<Carousel images={images} onClick={onClickMock} prefix="test" />);

    act(() => jest.advanceTimersByTime(600));
    // eslint-disable-next-line testing-library/no-container,testing-library/no-node-access
    let imgs = container.querySelectorAll('img');
    expect(imgs).toHaveLength(1);

    // Fire onLoad to set loaded = true
    fireEvent.load(imgs[0]);
    act(() => jest.advanceTimersByTime(1));

    // eslint-disable-next-line testing-library/no-container,testing-library/no-node-access
    imgs = container.querySelectorAll('img');
    expect(imgs).toHaveLength(1);

    // eslint-disable-next-line testing-library/no-container,testing-library/no-node-access
    const slides = container.querySelectorAll('.slide');
    expect(slides).toHaveLength(2);

    fireEvent.click(slides[0]);
    expect(onClickMock).toHaveBeenCalledWith(images[0]);
  });
});
