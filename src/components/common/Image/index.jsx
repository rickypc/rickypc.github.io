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
  const [fit, setFit] = useState(images?.[0] || { width: 0 });
  const [loaded, setLoaded] = useState(false);
  // eslint-disable-next-line no-param-reassign,react-hooks/rules-of-hooks
  ref = ref || useRef();
  const { visible } = useVisibility({ ref, threshold: 0.15 });

  const onFallbackLoad = useCallback((evt) => {
    setLoaded(true);
    onLoad?.(evt);
  }, [onLoad]);

  useEffect(() => {
    if (ref?.current) {
      const width = ref.current.clientWidth || ref.current.parentNode.clientWidth;
      setFit(images?.find((image) => image.width >= width) || images?.slice(-1)?.[0]);
    }
  }, [images, ref]);

  // initial={{ opacity: 0.5 }}

  // a11y() doesn't provide `alt` by design.
  return (
    <picture className={styles.picture} ref={ref}>
      <LazyMotion features={domAnimation}>
        <AnimatePresence>
          {(fit.width && !loaded && visible) || loaded ? (
            <>
              {picture?.avif ? <source srcSet={picture.avif} type="image/avif" /> : null}
              {picture?.webp ? <source srcSet={picture.webp} type="image/webp" /> : null}
              {picture?.fallback ? (
                <m.img
                  {...rest}
                  alt={loaded ? alt : null}
                  animate={{ opacity: loaded ? 1 : 0.9 }}
                  draggable={false}
                  height={fit.height}
                  key={key(alt, 'picture')}
                  onLoad={onFallbackLoad}
                  src={fit.path}
                  srcSet={picture.fallback.src.srcSet}
                  style={loaded ? null : { backgroundImage: `url(${picture.fallback.preSrc})` }}
                  transition={{ duration: 0.25 }}
                  width={fit.width}
                />
              ) : null}
            </>
          ) : null}
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
