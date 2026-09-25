/*!
 * Copyright © 2015 Richard Huang <rickypc@users.noreply.github.com>
 * All rights reserved.
 */

import { jest, mock } from 'bun:test';
import Carousel from '@site/src/components/portfolio/Carousel';
import { usePrint, useResize, useVisibility } from '@site/src/hooks/observer';
import { act, fireEvent, render, screen } from '@testing-library/react';
import { listeners } from 'motion/react';
import { createRef } from 'react';

const images = [{ alt: 'A' }, { alt: 'B' }, {}, {}];
const usePrintMock = usePrint as Mocked<typeof usePrint>;
usePrintMock.mockReturnValue([false]);
const useResizeMock = useResize as Mocked<typeof useResize>;
useResizeMock.mockReturnValue([false]);
const useVisibilityMock = useVisibility as Mocked<typeof useVisibility>;
useVisibilityMock.mockReturnValue({ ref: { current: null }, visible: true });

describe('portfolio.Carousel.Indicators', () => {
  test('renders nothing when only one image', () => {
    render(<Carousel images={[images[0]]} onClick={mock()} prefix="p" />);
    expect(screen.queryByRole('button', { name: /Slide/ })).toBeNull();
  });

  test('renders indicators and marks current slide', () => {
    render(<Carousel images={images} onClick={mock()} prefix="p" />);
    const buttons = screen.getAllByRole('button', { name: /Slide/ });
    expect(buttons).toHaveLength(4);
    expect(buttons[0]).toHaveAccessibleName('Slide 1: A (current slide)');
    fireEvent.click(buttons[1]);
    expect(buttons[1]).toHaveAccessibleName('Slide 2: B (current slide)');
  });
});

describe('portfolio.Carousel.Next and Previous', () => {
  test('Next disables at last image, previous disables at first image', () => {
    render(<Carousel images={images} onClick={mock()} prefix="p" />);
    const buttons = screen.getAllByRole('button', { name: /Slide/ });
    const next = screen.getByRole('button', { name: /Next: B/ });
    fireEvent.click(next);
    expect(buttons[1]).toHaveAccessibleName('Slide 2: B (current slide)');
    fireEvent.click(next);
    expect(buttons[2]).toHaveAccessibleName('Slide 3 (current slide)');
    fireEvent.click(next);
    expect(buttons[3]).toHaveAccessibleName('Slide 4 (current slide)');
    expect(next).toHaveAttribute('disabled');
    const prev = screen.getByRole('button', { name: /Previous/ });
    fireEvent.click(prev);
    fireEvent.click(prev);
    fireEvent.click(prev);
    expect(buttons[0]).toHaveAccessibleName('Slide 1: A (current slide)');
    expect(prev).toHaveAttribute('disabled');
  });
});

describe('portfolio.Carousel.Slide', () => {
  test('fires onClick and onKeyDown', () => {
    const onClick = mock();
    const { container } = render(<Carousel images={images} onClick={onClick} prefix="p" />);
    // eslint-disable-next-line testing-library/no-container,testing-library/no-node-access
    const firstSlide = container.querySelector('div.slide:first-of-type') as Element;
    fireEvent.click(firstSlide);
    fireEvent.keyDown(firstSlide);
    expect(onClick).toHaveBeenCalled();
  });
});

describe('portfolio.Carousel.Slider drag logic', () => {
  test('suppresses click when dragging', () => {
    const onClick = mock();
    usePrintMock.mockReturnValue([true]);
    useResizeMock.mockReturnValue([false]);
    const { container } = render(<Carousel images={images} onClick={onClick} prefix="p" />);
    act(() => listeners['slider-onDragStart']());
    // eslint-disable-next-line testing-library/no-container,testing-library/no-node-access
    fireEvent.click(container.querySelector('div.slide:first-of-type') as Element);
    usePrintMock.mockReturnValue([false]);
    expect(onClick).not.toHaveBeenCalled();
  });

  test('updates active on dragEnd with velocity', () => {
    render(<Carousel images={images} onClick={mock()} prefix="p" />);
    const buttons = screen.getAllByRole('button', { name: /Slide/ });
    act(() => listeners['slider-onDragEnd']({}, { offset: { x: 0 }, velocity: { x: 501 } }));
    expect(buttons[0]).toHaveAccessibleName('Slide 1: A (current slide)');
    act(() => listeners['slider-onDragEnd']({}, { offset: { x: 0 }, velocity: { x: -501 } }));
    expect(buttons[1]).toHaveAccessibleName('Slide 2: B (current slide)');
  });

  test('updates active on dragEnd with offset', () => {
    render(<Carousel images={images} onClick={mock()} prefix="p" />);
    const buttons = screen.getAllByRole('button', { name: /Slide/ });
    act(() => listeners['slider-onDragEnd']({}, { offset: { x: 501 }, velocity: { x: 0 } }));
    expect(buttons[0]).toHaveAccessibleName('Slide 1: A (current slide)');
    act(() => listeners['slider-onDragEnd']({}, { offset: { x: -501 }, velocity: { x: 0 } }));
    expect(buttons[1]).toHaveAccessibleName('Slide 2: B (current slide)');
  });

  test('retains active slide on dragEnd if thresholds are not met', () => {
    render(<Carousel images={images} onClick={mock()} prefix="p" />);
    const buttons = screen.getAllByRole('button', { name: /Slide/ });
    act(() => listeners['slider-onDragEnd']({}, { offset: { x: 0 }, velocity: { x: 0 } }));
    expect(buttons[0]).toHaveAccessibleName('Slide 1: A (current slide)');
  });
});

describe('portfolio.Carousel.auto-play', () => {
  test('advances slides when visible and not paused/opened', () => {
    jest.useFakeTimers();
    render(<Carousel images={images} onClick={mock()} prefix="p" />);
    const buttons = screen.getAllByRole('button', { name: /Slide/ });
    act(() => jest.advanceTimersByTime(5001));
    expect(buttons[1]).toHaveAccessibleName('Slide 2: B (current slide)');
    jest.useRealTimers();
  });

  test('pauses on mouse enter and resumes on mouse leave', () => {
    jest.useFakeTimers();
    const ref = createRef<{ setPaused(_paused: boolean): void }>();
    const { container } = render(
      <Carousel images={images} onClick={mock()} prefix="p" ref={ref} />,
    );
    const buttons = screen.getAllByRole('button', { name: /Slide/ });
    // eslint-disable-next-line testing-library/no-container,testing-library/no-node-access
    const viewport = container.querySelector('.viewport');
    fireEvent.mouseEnter(viewport as Element);
    act(() => jest.advanceTimersByTime(5001));
    expect(buttons[0]).toHaveAccessibleName('Slide 1: A (current slide)');
    fireEvent.mouseLeave(viewport as Element);
    act(() => jest.advanceTimersByTime(5001));
    expect(buttons[1]).toHaveAccessibleName('Slide 2: B (current slide)');
    act(() => ref.current?.setPaused(true));
    act(() => jest.advanceTimersByTime(5001));
    expect(buttons[1]).toHaveAccessibleName('Slide 2: B (current slide)');
    act(() => ref.current?.setPaused(false));
    act(() => jest.advanceTimersByTime(5001));
    expect(buttons[2]).toHaveAccessibleName('Slide 3 (current slide)');
    jest.useRealTimers();
  });
});
