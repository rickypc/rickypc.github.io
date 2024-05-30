/*!
 * All the code that follow is
 * Copyright (c) 2015 - 2024 Richard Huang <rickypc@users.noreply.github.com>.
 * All Rights Reserved. Not for reuse without permission.
 */

import {
  AnimatePresence,
  domAnimation,
  LazyMotion,
  m,
} from 'framer-motion';
import { clsx, key } from '@site/src/data/common';
import {
  forwardRef,
  memo,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import Link from '@site/src/components/common/Link';
import PropTypes from 'prop-types';
import { useVisibility } from '@site/src/hooks/observer';
import styles from './styles.module.css';

const Picture = memo(function Picture({
  alt,
  className,
  onLoad,
  picture,
  ref,
  ...rest
}) {
  const { images } = picture?.fallback?.src || {};
  // After images assignment.
  const [{
    background,
    fit,
    loaded,
    show,
  }, setRender] = useState({
    background: true,
    fit: images?.[0] || { width: 0 },
    loaded: false,
    show: false,
  });
  // eslint-disable-next-line no-param-reassign,react-hooks/rules-of-hooks
  ref = ref || useRef();
  const { visible } = useVisibility({ ref, threshold: 0.1 });

  const onFallbackLoad = useCallback((evt) => {
    setRender((previous) => (!previous.loaded ? { ...previous, loaded: true } : previous));
    onLoad?.(evt);
    setTimeout(() => setRender((previous) => (previous.background ? {
      ...previous,
      background: false,
    } : previous)), 450);
  }, [onLoad]);

  useEffect(() => {
    if (ref?.current) {
      let responsive = images;
      const width = ref.current.clientWidth || ref.current.parentNode.clientWidth;
      if (!Array.isArray(responsive) && typeof (picture?.fallback) === 'string') {
        responsive = [{ path: picture.fallback, width }];
      }
      setRender((previous) => {
        const found = responsive?.find((image) => image.width >= width)
          || responsive?.slice(-1)?.[0];
        return found.path === previous.fit?.path ? previous : {
          ...previous,
          fit: found,
        };
      });
    }
  }, [images, picture, ref]);

  useEffect(() => {
    if (visible) {
      setRender((previous) => (!previous.show ? { ...previous, show: true } : previous));
    }
  }, [visible]);

  // a11y() doesn't provide `alt` by design.
  return (
    <picture
      className={clsx(
        className,
        styles.picture,
        (background && !picture.fallback?.preSrc) && styles.shimmer,
      )}
      ref={ref}
      style={background && picture.fallback?.preSrc ? {
        backgroundImage: `url(${picture.fallback?.preSrc})`,
      } : {}}
    >
      <LazyMotion features={domAnimation}>
        <AnimatePresence>
          {show && (
            <>
              {picture?.avif && <source srcSet={picture.avif} type="image/avif" />}
              {picture?.webp && <source srcSet={picture.webp} type="image/webp" />}
              {picture?.fallback && (
                <m.img
                  {...rest}
                  alt={loaded ? alt : null}
                  animate={{ opacity: loaded ? 1 : 0 }}
                  draggable={false}
                  height={fit.height}
                  initial={{ opacity: 0 }}
                  key={key(alt, 'picture')}
                  onLoad={onFallbackLoad}
                  src={fit.path}
                  srcSet={picture.fallback?.src?.srcSet}
                  transition={{ duration: 0.5, ease: 'easeInOut' }}
                  width={fit.width}
                />
              )}
            </>
          )}
        </AnimatePresence>
      </LazyMotion>
    </picture>
  );
});
Picture.propTypes = {
  alt: PropTypes.string,
  className: PropTypes.string,
  onLoad: PropTypes.func,
  picture: PropTypes.shape({
    avif: PropTypes.string,
    fallback: PropTypes.oneOfType([
      PropTypes.shape(),
      PropTypes.string,
    ]),
    webp: PropTypes.string,
  }),
  ref: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.shape() }),
  ]),
};

const Image = forwardRef(({ link, ...rest }, ref) => (link
  ? <Link {...link}><Picture ref={ref} {...rest} /></Link>
  : <Picture ref={ref} {...rest} />));
Image.displayName = 'Image';
Image.propTypes = {
  link: PropTypes.shape({
    className: PropTypes.string,
    href: PropTypes.string,
    title: PropTypes.string,
    whileTap: PropTypes.shape({
      scale: PropTypes.number,
    }),
  }),
};

export default memo(Image);
