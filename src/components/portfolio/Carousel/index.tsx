/*!
 * All the code that follow is
 * Copyright (c) 2015 - 2025 Richard Huang <rickypc@users.noreply.github.com>.
 * All Rights Reserved. Not for reuse without permission.
 */

import {
  AnimatePresence,
  domMax,
  LazyMotion,
  m,
} from 'framer-motion';
import Button from '@site/src/components/common/Button';
import { a11y, clsx, key } from '@site/src/data/common';
import { type EmblaCarouselType, type EmblaEventType } from 'embla-carousel';
import { GenIcon } from 'react-icons/lib';
import { type IconBaseProps } from 'react-icons';
import Image, { type ImageProps } from '@site/src/components/common/Image';
import {
  memo,
  type ReactElement,
  useCallback,
  useEffect,
  useState,
} from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import styles from './styles.module.css';

// eslint-disable-next-line no-unused-vars
type AnyFunction = (..._: any[]) => any;

type ButtonsProps = {
  api?: EmblaCarouselType;
};

export type CarouselProps = {
  images: ImageProps[];
  // eslint-disable-next-line no-unused-vars
  onClick: (_: ImageProps) => void;
  prefix: string;
};

type DotGroupProps = {
  api?: EmblaCarouselType;
  images: ImageProps[];
  prefix: string;
};

export type LazySlideProps = {
  api?: EmblaCarouselType;
  image: ImageProps;
  index: number;
  // eslint-disable-next-line no-unused-vars
  onClick: (_: ImageProps) => void;
};

const debounce = <F extends AnyFunction>(fn: F, delay = 200) => {
  let timer: ReturnType<typeof setTimeout> | null = null;
  const debouncer = (...args: Parameters<F>) => {
    // istanbul ignore else
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(async () => fn(...args), delay);
  };
  debouncer.cancel = () => {
    // istanbul ignore else
    if (timer) {
      clearTimeout(timer);
      timer = null;
    }
  };
  return debouncer;
};

/**
 * Renders the `Angle Left` icon.
 * @param {object} props - React props passed to the icon component.
 * @param {string} [props.className] - Optional CSS class for styling.
 * @param {object} [props.style] - Optional inline styles.
 * @param {string} [props.title] - Optional title for accessibility.
 * @returns {object} The icon.
 */
function FaAngleLeft(props: IconBaseProps): ReactElement {
  return GenIcon({ tag: 'svg', attr: { viewBox: '0 0 320 512' }, child: [{ tag: 'path', attr: { d: 'M41.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.3 256 246.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z' }, child: [] }] })(props);
}

/**
 * Renders the `Angle Right` icon.
 * @param {object} props - React props passed to the icon component.
 * @param {string} [props.className] - Optional CSS class for styling.
 * @param {object} [props.style] - Optional inline styles.
 * @param {string} [props.title] - Optional title for accessibility.
 * @returns {object} The icon.
 */
function FaAngleRight(props: IconBaseProps): ReactElement {
  return GenIcon({ tag: 'svg', attr: { viewBox: '0 0 320 512' }, child: [{ tag: 'path', attr: { d: 'M278.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-160 160c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L210.7 256 73.4 118.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l160 160z' }, child: [] }] })(props);
}

const Buttons = memo(function Buttons({ api }: ButtonsProps): ReactElement {
  const onNext = debounce(() => api?.scrollNext?.());
  const onPrevious = debounce(() => api?.scrollPrev?.());

  return (
    <div className={styles.buttons}>
      <Button
        {...a11y('Previous')}
        onClick={onPrevious}
        whileTap={{ scale: 0.85 }}
      >
        <FaAngleLeft />
      </Button>
      <Button
        {...a11y('Next')}
        onClick={onNext}
        whileTap={{ scale: 0.85 }}
      >
        <FaAngleRight />
      </Button>
    </div>
  );
});

const DotGroup = memo(function DotGroup({ api, images, prefix }: DotGroupProps): ReactElement {
  const [active, setActive] = useState(0);

  const onDot = useCallback((index: number) => api?.scrollTo?.(index), [api]);
  const onSelect = useCallback(
    (arg?: EmblaCarouselType) => setActive(arg?.selectedScrollSnap?.() || 0),
    [],
  );

  useEffect(() => {
    onSelect(api);
    api?.on('select', onSelect);
  }, [api, onSelect]);

  return (
    <div className={styles.dots}>
      <AnimatePresence>
        {images.map(({ alt }, index) => {
          const current = active === index;
          return (
            <Button
              {...a11y(index + 1)}
              className={clsx(current && styles.active, styles.dot)}
              key={`dot-${prefix}-${alt}`}
              onClick={current ? undefined : () => onDot(index)}
              whileTap={current ? undefined : { scale: 0.85 }}
            >
              <LazyMotion features={domMax}>
                {current && (
                  <m.span
                    className={styles.outline}
                    layoutId={`dot-outline-${prefix}`}
                  />
                )}
              </LazyMotion>
            </Button>
          );
        })}
      </AnimatePresence>
    </div>
  );
});

const LazySlide = memo(function LazySlide({
  api,
  image,
  index,
  onClick,
}: LazySlideProps): ReactElement {
  const [inView, setInView] = useState(false);
  const [loaded, setLoaded] = useState(false);

  const onSlideClick = useCallback(() => onClick(image), [image, onClick]);

  useEffect(() => {
    const slideInView = () => setTimeout(
      () => setInView(api?.slidesInView?.()?.includes?.(index) || false),
      0,
    );
    slideInView();
    api?.on('slidesInView', slideInView);
    return () => {
      api?.off('slidesInView', slideInView);
    };
  }, [api, index]);

  return (
    <div
      className={styles.slide}
      onClick={onSlideClick}
      onKeyDown={onSlideClick}
      role="button"
      tabIndex={0}
    >
      {(inView || loaded) && <Image {...image} onLoad={() => setLoaded(true)} />}
    </div>
  );
});

export default memo(function Carousel({ images, onClick, prefix }: CarouselProps): ReactElement {
  const [setViewport, api] = useEmblaCarousel({ inViewThreshold: 0.5, loop: true });

  useEffect(() => {
    const onDrag = (_: EmblaCarouselType, evt: EmblaEventType) => api
      ?.rootNode()
      ?.classList?.[evt === 'pointerDown' ? 'add' : 'remove']?.(styles.dragging);
    const pointers: EmblaEventType[] = ['pointerDown', 'pointerUp'];
    pointers.forEach((evt) => api?.on(evt, onDrag));
    return () => pointers.forEach((evt) => api?.off(evt, onDrag));
  }, [api]);

  return (
    <div className={styles.carousel}>
      <div className={styles.viewport} ref={setViewport}>
        <div className={styles.slider}>
          {images.map((image, index) => (
            <LazySlide
              api={api}
              image={image}
              index={index}
              key={key(`${prefix}-${image.alt}`, 'slide')}
              onClick={onClick}
            />
          ))}
        </div>
      </div>
      {images.length > 1 && (
        <div className={styles.controls}>
          <Buttons api={api} />
          <DotGroup api={api} images={images} prefix={prefix} />
        </div>
      )}
    </div>
  );
});
