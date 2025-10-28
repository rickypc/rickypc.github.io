/*!
 * All the code that follow is
 * Copyright (c) 2015 - 2025 Richard Huang <rickypc@users.noreply.github.com>.
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
  memo,
  type ReactElement,
  type ReactEventHandler,
  type RefObject,
  type SyntheticEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import Link from '@site/src/components/common/Link';
import { useVisibility } from '@site/src/hooks/observer';
import styles from './styles.module.css';

export type ImageInfo = {
  height?: number;
  path?: string;
  width: number;
};

export type PictureInfo = {
  avif?: string;
  fallback?: {
    preSrc: string;
    src: {
      images: ImageInfo[];
      srcSet?: string;
    };
  };
  webp?: string;
};

export type PictureProps = {
  alt?: string;
  className?: string;
  onLoad?: ReactEventHandler<HTMLImageElement>;
  picture: PictureInfo;
  ref?: RefObject<HTMLPictureElement>;
};

export type PictureRender = {
  background: boolean;
  fit: ImageInfo;
  loaded: boolean;
  show: boolean;
};

// After PictureProps assignment.
export type ImageProps = PictureProps & {
  link?: {
    alt?: string;
    className?: string;
    href?: string;
    ref?: RefObject<HTMLAnchorElement>;
    title?: string;
    whileTap?: {
      scale?: number;
    };
  };
};

const Picture = memo(function Picture({
  alt,
  className,
  onLoad,
  picture,
  ref,
  ...rest
}: PictureProps): ReactElement {
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
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const pictureRef = ref || useRef<HTMLPictureElement | null>(null);
  const { visible } = useVisibility({ ref: pictureRef, threshold: 0.1 });

  const onFallbackLoad = useCallback((evt: SyntheticEvent<HTMLImageElement, Event>) => {
    setRender((previous) => (!previous.loaded ? { ...previous, loaded: true } : previous));
    onLoad?.(evt);
    setTimeout(() => setRender((previous) => (previous.background ? {
      ...previous,
      background: false,
    } : previous)), 450);
  }, [onLoad]);

  useEffect(() => {
    // istanbul ignore else
    if (pictureRef?.current) {
      let responsive = images;
      const width = pictureRef.current.clientWidth
        || pictureRef.current.parentElement?.clientWidth || 0;
      if (!Array.isArray(responsive) && typeof (picture?.fallback) === 'string') {
        responsive = [{ path: picture.fallback, width }];
      }
      setRender((previous: PictureRender) => {
        const found = responsive?.find((image) => image.width >= width)
          || responsive?.slice(-1)?.[0] || { width: 0 };
        return found.path === previous.fit?.path ? previous : {
          ...previous,
          fit: found,
        };
      });
    }
  }, [images, picture, pictureRef]);

  useEffect(() => {
    if (visible) {
      // istanbul ignore next
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
      ref={pictureRef}
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
                  alt={loaded ? alt : undefined}
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

export default memo(function Image({ link, ...rest }: ImageProps): ReactElement {
  return link ? <Link {...link}><Picture {...rest} /></Link> : <Picture {...rest} />;
});
