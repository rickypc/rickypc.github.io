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
import {
  forwardRef,
  memo,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import { key } from '@site/src/data/common';
import Link from '@site/src/components/common/Link';
import PropTypes from 'prop-types';
import { useVisibility } from '@site/src/hooks/observer';
import styles from './styles.module.css';

const Picture = memo(function Picture({
  alt,
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
    setRender((previous) => ({ ...previous, loaded: true }));
    onLoad?.(evt);
    setTimeout(() => setRender((previous) => ({ ...previous, background: false })), 450);
  }, [onLoad]);

  useEffect(() => {
    if (ref?.current) {
      const width = ref.current.clientWidth || ref.current.parentNode.clientWidth;
      setRender((previous) => ({
        ...previous,
        fit: images?.find((image) => image.width >= width) || images?.slice(-1)?.[0],
      }));
    }
  }, [images, ref]);

  useEffect(() => {
    if (visible) {
      setRender((previous) => {
        if (previous.show) {
          return previous;
        }
        return previous.fit.width && !previous.loaded
          ? { ...previous, show: true } : previous;
      });
    }
  }, [visible]);

  // a11y() doesn't provide `alt` by design.
  return (
    <picture
      className={styles.picture}
      ref={ref}
      style={{ backgroundImage: background ? `url(${picture.fallback.preSrc})` : 'none' }}
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
                  srcSet={picture.fallback.src.srcSet}
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
  onLoad: PropTypes.func,
  picture: PropTypes.shape({
    avif: PropTypes.string,
    fallback: PropTypes.shape(),
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
