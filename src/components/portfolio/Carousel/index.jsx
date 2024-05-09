/*!
 * All the code that follow is
 * Copyright (c) 2015 - 2024 Richard Huang <rickypc@users.noreply.github.com>.
 * All Rights Reserved. Not for reuse without permission.
 */

import {
  AnimatePresence,
  domMax,
  LazyMotion,
  m,
} from 'framer-motion';
import Button from '@site/src/components/common/Button';
import { clsx, key } from '@site/src/data/common';
import { GenIcon } from 'react-icons/lib';
import Image from '@site/src/components/common/Image';
import {
  memo,
  useCallback,
  useEffect,
  useState,
} from 'react';
import PropTypes from 'prop-types';
import useEmblaCarousel from 'embla-carousel-react';
import styles from './styles.module.css';

function FaAngleLeft(props) {
  return GenIcon({ tag: 'svg', attr: { viewBox: '0 0 320 512' }, child: [{ tag: 'path', attr: { d: 'M41.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.3 256 246.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z' }, child: [] }] })(props);
}

function FaAngleRight(props) {
  return GenIcon({ tag: 'svg', attr: { viewBox: '0 0 320 512' }, child: [{ tag: 'path', attr: { d: 'M278.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-160 160c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L210.7 256 73.4 118.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l160 160z' }, child: [] }] })(props);
}

const Buttons = memo(function Buttons({ api }) {
  const debounce = useCallback((fn, delay = 200) => {
    let timer;
    const debouncer = (...args) => {
      clearTimeout(timer);
      timer = setTimeout(async () => fn(...args), delay);
    };
    debouncer.cancel = () => {
      if (timer) {
        clearTimeout(timer);
        timer = null;
      }
    };
    return debouncer;
  }, []);

  const onNext = debounce(() => api?.scrollNext?.());
  const onPrevious = debounce(() => api?.scrollPrev?.());

  return (
    <div className={styles.buttons}>
      <Button
        aria-label="Previous"
        onClick={onPrevious}
        whileTap={{ scale: 0.85 }}
      >
        <FaAngleLeft />
      </Button>
      <Button
        aria-label="Next"
        onClick={onNext}
        whileTap={{ scale: 0.85 }}
      >
        <FaAngleRight />
      </Button>
    </div>
  );
});
Buttons.propTypes = {
  api: PropTypes.shape({
    scrollNext: PropTypes.func,
    scrollPrev: PropTypes.func,
  }),
};

const DotGroup = memo(function DotGroup({ api, images, prefix }) {
  const [active, setActive] = useState(0);

  const onDot = useCallback((index) => api?.scrollTo?.(index), [api]);
  const onSelect = useCallback((arg) => setActive(arg?.selectedScrollSnap?.() || 0), []);

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
              aria-label={index}
              className={clsx(current && styles.active, styles.dot)}
              key={`dot-${prefix}-${alt}`}
              onClick={current ? null : () => onDot(index)}
              whileTap={current ? null : { scale: 0.85 }}
            >
              <LazyMotion features={domMax}>
                {current ? (
                  <m.span
                    className={styles.outline}
                    layoutId={`dot-outline-${prefix}`}
                  />
                ) : null}
              </LazyMotion>
            </Button>
          );
        })}
      </AnimatePresence>
    </div>
  );
});
DotGroup.propTypes = {
  api: PropTypes.shape({
    on: PropTypes.func,
    scrollTo: PropTypes.func,
    selectedScrollSnap: PropTypes.func,
  }),
  images: PropTypes.arrayOf(PropTypes.shape()),
  prefix: PropTypes.string.isRequired,
};

const LazySlide = memo(function LazySlide({
  api,
  image,
  index,
  onClick,
}) {
  const [inView, setInView] = useState(false);
  const [loaded, setLoaded] = useState(false);

  const onSlideClick = useCallback(() => onClick(image), [image, onClick]);

  useEffect(() => {
    const slideInView = () => setInView(api?.slidesInView?.()?.includes?.(index) || false);
    slideInView();
    api?.on('slidesInView', slideInView);
    return () => api?.off('slidesInView', slideInView);
  }, [api, index]);

  return (
    <div
      className={styles.slide}
      onClick={onSlideClick}
      onKeyPress={onSlideClick}
      role="button"
      tabIndex={0}
    >
      {inView || loaded ? <Image {...image} onLoad={() => setLoaded(true)} /> : null}
    </div>
  );
});
LazySlide.propTypes = {
  api: PropTypes.shape({
    off: PropTypes.func,
    on: PropTypes.func,
    slidesInView: PropTypes.func,
  }),
  image: PropTypes.shape(),
  index: PropTypes.number.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default memo(Object.assign(function Carousel({ images, onClick, prefix }) {
  const [setViewport, api] = useEmblaCarousel({ loop: true });

  useEffect(() => {
    const onDrag = (_, evt) => api
      ?.rootNode()
      ?.classList?.[evt === 'pointerDown' ? 'add' : 'remove']?.(styles.dragging);
    ['pointerDown', 'pointerUp'].forEach((evt) => api?.on(evt, onDrag));
    return () => ['pointerDown', 'pointerUp'].forEach((evt) => api?.off(evt, onDrag));
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
      {images.length > 1 ? (
        <div className={styles.controls}>
          <Buttons api={api} />
          <DotGroup api={api} images={images} prefix={prefix} />
        </div>
      ) : null}
    </div>
  );
}, {
  propTypes: {
    images: PropTypes.arrayOf(PropTypes.shape()),
    onClick: PropTypes.func.isRequired,
    prefix: PropTypes.string.isRequired,
  },
}));
