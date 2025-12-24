/*!
 * All the code that follow is
 * Copyright (c) 2015 - 2025 Richard Huang <rickypc@users.noreply.github.com>.
 * All Rights Reserved. Not for reuse without permission.
 */

import { a11y, clsx, key } from '@site/src/data/common';
import { animate, motion, useMotionValue } from 'motion/react';
import Button from '@site/src/components/common/Button';
import Image, { type ImageProps } from '@site/src/components/common/Image';
import {
  memo,
  type ReactElement,
  type Ref,
  type RefObject,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import { usePrint, useVisibility } from '@site/src/hooks/observer';
import styles from './styles.module.css';

export type CarouselHandles = {
  // eslint-disable-next-line no-unused-vars
  setPaused: (paused: boolean) => void;
};

export type CarouselProps = {
  duration?: number;
  images: ImageProps[];
  // eslint-disable-next-line no-unused-vars
  onClick: (_: ImageProps) => void;
  open?: ImageProps;
  prefix: string;
  ref?: Ref<CarouselHandles>;
  title?: string;
};

type IndicatorsProps = {
  active: number;
  images: ImageProps[];
  // eslint-disable-next-line no-unused-vars
  onClick: (_: number) => void;
  prefix: string;
};

type NavigationProps = {
  active: number;
  images: ImageProps[];
  // eslint-disable-next-line no-unused-vars
  onClick: (_: (_: number) => number) => void;
};

type SlideProps = {
  image: ImageProps;
  live: boolean;
  onClick: () => void;
};

type SliderProps = {
  active: number;
  images: ImageProps[];
  // eslint-disable-next-line no-unused-vars
  onClick: (_: ImageProps) => void;
  prefix: string;
  printing: boolean;
  // eslint-disable-next-line no-unused-vars
  setActive: (_: number) => void;
  viewport: RefObject<HTMLDivElement | null>;
};

const Indicators = memo(function Indicators({
  active,
  images,
  onClick,
  prefix,
}: IndicatorsProps): false | ReactElement {
  return images.length > 1 && (
    <div className={styles.indicators}>
      {images.map(({ alt }, index) => {
        const current = active === index;
        return (
          <Button
            {...a11y(`Slide ${index + 1}${alt ? `: ${alt}` : ''}${current ? ' (current slide)' : ''}`)}
            className={clsx(current && styles.active, styles.indicator)}
            key={`indicator-${prefix}-${alt || index}`}
            onClick={() => onClick(index)}
          />
        );
      })}
    </div>
  );
});

const Next = memo(function Next({
  active,
  images,
  onClick,
}: NavigationProps): false | ReactElement {
  if (images.length < 2) {
    return false;
  }
  const last = images.length - 1;
  // After last assignment.
  const disabled = active === last;
  const label = disabled ? '' : images[active + 1]?.alt || '';
  return (
    <Button
      {...(disabled ? {} : a11y(`Next${label ? `: ${label}` : ''}`))}
      className={clsx(styles.button, disabled && styles.disabled, styles.next)}
      disabled={disabled}
      onClick={() => onClick((current: number) => Math.min(last, current + 1))}
    >
      <svg fill="none" viewBox="0 0 24 24">
        <path
          d="M9 5l7 7-7 7"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
        />
      </svg>
    </Button>
  );
});

const Previous = memo(function Previous({
  active,
  images,
  onClick,
}: NavigationProps): false | ReactElement {
  if (images.length < 2) {
    return false;
  }
  const disabled = active === 0;
  const label = disabled ? '' : images[active - 1]?.alt || '';
  return (
    <Button
      {...(disabled ? {} : a11y(`Previous${label ? `: ${label}` : ''}`))}
      className={clsx(styles.button, disabled && styles.disabled, styles.prev)}
      disabled={disabled}
      onClick={() => onClick((current: number) => Math.max(0, current - 1))}
    >
      <svg fill="none" viewBox="0 0 24 24">
        <path
          d="M15 19l-7-7 7-7"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
        />
      </svg>
    </Button>
  );
});

const Slide = memo(function Slide({ image, live, onClick }: SlideProps): ReactElement {
  return (
    <div
      aria-label={image.alt}
      className={styles.slide}
      onClick={onClick}
      onKeyDown={onClick}
      role="button"
      tabIndex={0}
    >
      <Image live={live} {...image} />
    </div>
  );
});

const Slider = memo(function Slider({
  active,
  images,
  onClick,
  prefix,
  printing,
  setActive,
  viewport,
}: SliderProps): ReactElement {
  const [dragging, setDragging] = useState(false);
  const onSlideClick = useCallback((handler: () => void) => () => {
    if (dragging) {
      return;
    }
    handler();
  }, [dragging]);
  const x = useMotionValue(0);

  useEffect(() => {
    if (!dragging && viewport.current) {
      const targetX = -active * (viewport.current.offsetWidth || 1);
      animate(x, targetX, { damping: 30, stiffness: 300, type: 'spring' });
    }
  }, [active, dragging, x, viewport]);

  return (
    <motion.div
      className={clsx(dragging && styles.dragging, styles.slider)}
      drag="x"
      dragElastic={0.2}
      dragMomentum={false}
      onDragEnd={(_, info) => {
        let newActive = active;
        const offset = info.offset.x;
        const velocity = info.velocity.x;
        // istanbul ignore else
        if (Math.abs(velocity) > 500) {
          // Fast swipe.
          newActive = velocity > 0 ? active - 1 : active + 1;
        } else if (Math.abs(offset) > (viewport.current?.offsetWidth || 1) * 0.3) {
          // Use offset threshold (30% of container width).
          newActive = offset > 0 ? active - 1 : active + 1;
        }
        setActive(Math.max(0, Math.min(images.length - 1, newActive)));
        setDragging(false);
      }}
      onDragStart={() => setDragging(true)}
      style={{ x }}
    >
      {images.map((image, index) => (
        <Slide
          key={key(`${prefix}-${image.alt || index}`, 'slide')}
          {...{
            image,
            live: printing && active === index,
            onClick: onSlideClick(() => onClick(image)),
          }}
        />
      ))}
    </motion.div>
  );
});

export default memo(function Carousel({
  duration = 3000,
  images,
  onClick,
  open,
  prefix,
  ref,
  title,
}: CarouselProps) {
  const [active, setActive] = useState(0);
  const opened = typeof (open?.picture) === 'object';
  const [paused, setPaused] = useState(false);
  const [printing] = usePrint();
  const viewport = useRef<HTMLDivElement>(null);
  const { visible } = useVisibility({ ref: viewport, threshold: 0.1 });

  const onMouseEnter = useCallback(() => setPaused(true), []);
  const onMouseLeave = useCallback(() => setPaused(false), []);

  useImperativeHandle(ref, () => ({ setPaused }), []);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | null = null;
    if (document.documentElement.dataset.carouselPlay !== 'manual'
      && images.length && !paused && !opened && visible) {
      interval = setInterval(() => {
        setActive((current) => (current + 1) % images.length);
      }, duration);
    }
    return () => {
      if (interval) {
        clearInterval(interval);
        interval = null;
      }
    };
  }, [duration, images.length, opened, paused, visible]);

  useEffect(() => setPaused(printing), [printing]);

  return (
    <div className={styles.carousel}>
      <div
        {...{
          'aria-label': title,
          className: styles.viewport,
          onMouseEnter,
          onMouseLeave,
          ref: viewport,
        }}
      >
        <Slider
          {...{
            active,
            images,
            onClick,
            prefix,
            printing,
            setActive,
            viewport,
          }}
        />
        <Previous {...{ active, images, onClick: setActive }} />
        <Next {...{ active, images, onClick: setActive }} />
        <Indicators
          {...{
            active,
            images,
            onClick: setActive,
            prefix,
          }}
        />
      </div>
    </div>
  );
});
