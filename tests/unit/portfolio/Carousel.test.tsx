/*!
 * Copyright © 2015 Richard Huang <rickypc@users.noreply.github.com>
 * All rights reserved.
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
import { createRef } from 'react';
import { listeners } from 'motion/react';
import { usePrint, useVisibility } from '@site/src/hooks/observer';

const usePrintMock = jest.mocked(usePrint);
const useVisibilityMock = jest.mocked(useVisibility);

jest.unmock('@site/src/components/portfolio/Carousel');

describe('portfolio.Carousel', () => {
  const images = [
    { alt: 'A' },
    { alt: 'B' },
    {},
    {},
  ];
  usePrintMock.mockReturnValue([false]);
  useVisibilityMock.mockReturnValue({ ref: { current: null }, visible: true });

  describe('Indicators', () => {
    it('renders nothing when only one image', () => {
      render(<Carousel images={[images[0]]} onClick={jest.fn()} prefix="p" />);
      expect(screen.queryByRole('button', { name: /Slide/ })).toBeNull();
    });

    it('renders indicators and marks current slide', () => {
      render(<Carousel images={images} onClick={jest.fn()} prefix="p" />);
      const buttons = screen.getAllByRole('button', { name: /Slide/ });
      expect(buttons).toHaveLength(4);
      expect(
        screen.getByRole('button', { name: 'Slide 1: A (current slide)' }),
      ).toBeInTheDocument();
      fireEvent.click(buttons[1]);
      expect(
        screen.getByRole('button', { name: 'Slide 2: B (current slide)' }),
      ).toBeInTheDocument();
    });
  });

  describe('Next and Previous', () => {
    it('Next disables at last image, previous disables at first image', () => {
      render(<Carousel images={images} onClick={jest.fn()} prefix="p" />);
      const next = screen.getByRole('button', { name: /Next: B/ });
      fireEvent.click(next);
      expect(
        screen.getByRole('button', { name: 'Slide 2: B (current slide)' }),
      ).toBeInTheDocument();
      fireEvent.click(next);
      expect(
        screen.getByRole('button', { name: 'Slide 3 (current slide)' }),
      ).toBeInTheDocument();
      fireEvent.click(next);
      expect(
        screen.getByRole('button', { name: 'Slide 4 (current slide)' }),
      ).toBeInTheDocument();
      expect(next).toHaveAttribute('disabled');
      const prev = screen.getByRole('button', { name: /Previous/ });
      fireEvent.click(prev);
      fireEvent.click(prev);
      fireEvent.click(prev);
      expect(
        screen.getByRole('button', { name: 'Slide 1: A (current slide)' }),
      ).toBeInTheDocument();
      expect(prev).toHaveAttribute('disabled');
    });
  });

  describe('Slide', () => {
    it('fires onClick and onKeyDown', () => {
      const onClick = jest.fn();
      const { container } = render(
        <Carousel images={images} onClick={onClick} prefix="p" />,
      );
      // eslint-disable-next-line testing-library/no-container,testing-library/no-node-access
      const firstSlide = container.querySelector('div.slide:first-of-type') as Element;
      fireEvent.click(firstSlide);
      fireEvent.keyDown(firstSlide);
      expect(onClick).toHaveBeenCalled();
    });
  });

  describe('Slider drag logic', () => {
    it('suppresses click when dragging', () => {
      const onClick = jest.fn();
      usePrintMock.mockReturnValue([true]);
      const { container } = render(
        <Carousel images={images} onClick={onClick} prefix="p" />,
      );
      act(() => listeners['slider-onDragStart']());
      // eslint-disable-next-line testing-library/no-container,testing-library/no-node-access
      fireEvent.click(container.querySelector('div.slide:first-of-type') as Element);
      usePrintMock.mockReturnValue([false]);
      expect(onClick).not.toHaveBeenCalled();
    });

    it('updates active on dragEnd with velocity', () => {
      render(<Carousel images={images} onClick={jest.fn()} prefix="p" />);
      act(() => listeners['slider-onDragEnd'](
        {},
        { offset: { x: 0 }, velocity: { x: 501 } },
      ));
      expect(
        screen.getByRole('button', { name: 'Slide 1: A (current slide)' }),
      ).toBeInTheDocument();
      act(() => listeners['slider-onDragEnd'](
        {},
        { offset: { x: 0 }, velocity: { x: -501 } },
      ));
      expect(
        screen.getByRole('button', { name: 'Slide 2: B (current slide)' }),
      ).toBeInTheDocument();
    });

    it('updates active on dragEnd with offset', () => {
      render(<Carousel images={images} onClick={jest.fn()} prefix="p" />);
      act(() => listeners['slider-onDragEnd'](
        {},
        { offset: { x: 501 }, velocity: { x: 0 } },
      ));
      expect(
        screen.getByRole('button', { name: 'Slide 1: A (current slide)' }),
      ).toBeInTheDocument();
      act(() => listeners['slider-onDragEnd'](
        {},
        { offset: { x: -501 }, velocity: { x: 0 } },
      ));
      expect(
        screen.getByRole('button', { name: 'Slide 2: B (current slide)' }),
      ).toBeInTheDocument();
    });
  });

  describe('Carousel auto-play', () => {
    it('advances slides when visible and not paused/opened', () => {
      jest.useFakeTimers();
      render(<Carousel images={images} onClick={jest.fn()} prefix="p" />);
      act(() => jest.advanceTimersByTime(3001));
      expect(
        screen.getByRole('button', { name: 'Slide 2: B (current slide)' }),
      ).toBeInTheDocument();
      jest.useRealTimers();
    });

    it('pauses on mouse enter and resumes on mouse leave', () => {
      jest.useFakeTimers();
      // eslint-disable-next-line no-unused-vars
      const ref = createRef<{ setPaused(paused: boolean): void }>();
      const { container } = render(
        <Carousel images={images} onClick={jest.fn()} prefix="p" ref={ref} />,
      );
      // eslint-disable-next-line testing-library/no-container,testing-library/no-node-access
      const viewport = container.querySelector('.viewport');
      fireEvent.mouseEnter(viewport as Element);
      act(() => jest.advanceTimersByTime(3001));
      expect(
        screen.getByRole('button', { name: 'Slide 1: A (current slide)' }),
      ).toBeInTheDocument();
      fireEvent.mouseLeave(viewport as Element);
      act(() => jest.advanceTimersByTime(3001));
      expect(
        screen.getByRole('button', { name: 'Slide 2: B (current slide)' }),
      ).toBeInTheDocument();
      act(() => ref.current?.setPaused(true));
      act(() => jest.advanceTimersByTime(3001));
      expect(
        screen.getByRole('button', { name: 'Slide 2: B (current slide)' }),
      ).toBeInTheDocument();
      act(() => ref.current?.setPaused(false));
      act(() => jest.advanceTimersByTime(3001));
      expect(
        screen.getByRole('button', { name: 'Slide 3 (current slide)' }),
      ).toBeInTheDocument();
      jest.useRealTimers();
    });
  });
});
