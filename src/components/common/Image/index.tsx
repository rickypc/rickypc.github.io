/*!
 * Copyright © 2015 Richard Huang <rickypc@users.noreply.github.com>
 * All rights reserved.
 */

import {
  AnimatePresence,
  domAnimation,
  LazyMotion,
  motion,
} from 'motion/react';
import { clsx, key } from '@site/src/data/common';
import Link from '@site/src/components/common/Link';
import {
  Fragment,
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
import { useVisibility } from '@site/src/hooks/observer';
import styles from './styles.module.css';

type ImageInfo = {
  height?: number;
  path?: string;
  width: number;
};

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

export type ImageSource = {
  preSrc?: string;
  src?: {
    images: ImageInfo[];
    srcSet?: string;
  };
};

export type PictureInfo = {
  avif?: string;
  fallback?: ImageSource;
  webp?: string;
};

type PictureProps = {
  alt?: string;
  className?: string;
  fetchPriority?: 'auto' | 'high' | 'low';
  live?: boolean;
  onLoad?: ReactEventHandler<HTMLImageElement>;
  picture?: PictureInfo;
  ref?: RefObject<HTMLPictureElement>;
};

const Picture = memo(function Picture({
  alt,
  className,
  live,
  onLoad,
  picture,
  ref,
  ...rest
}: PictureProps): ReactElement {
  const [background, setBackground] = useState(true);
  const { images } = picture?.fallback?.src || {};
  // After images assignment.
  const [fit, setFit] = useState<ImageInfo>(images?.[0] || { width: 0 });
  const [loaded, setLoaded] = useState(false);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const pictureRef = ref || useRef<HTMLPictureElement | null>(null);
  const [show, setShow] = useState(false);
  const { visible } = useVisibility({ ref: pictureRef, threshold: 0.1 });

  const onFallbackLoad = useCallback((evt: SyntheticEvent<HTMLImageElement, Event>) => {
    setLoaded(true);
    onLoad?.(evt);
    setTimeout(() => setBackground(false), 450);
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
      const found = responsive?.find((image) => image.width >= width)
        || responsive?.slice(-1)?.[0] || { width: 0 };
      if (fit?.path !== found.path) {
        setFit(found);
      }
    }
  }, [fit, images, picture, pictureRef]);

  useEffect(() => {
    // istanbul ignore else
    if (live || visible) {
      setShow(true);
    }
  }, [live, visible]);

  // a11y() doesn't provide `alt` by design.
  return (
    <LazyMotion features={domAnimation}>
      <picture
        className={clsx(
          className,
          styles.picture,
          (background && !picture?.fallback?.preSrc) && styles.shimmer,
        )}
        ref={pictureRef}
        style={background && picture?.fallback?.preSrc ? {
          backgroundImage: `url(${picture?.fallback?.preSrc})`,
        } : {}}
      >
        <AnimatePresence>
          {show && (
            <Fragment key={key(alt, 'fragment')}>
              {picture?.avif && <source srcSet={picture.avif} type="image/avif" />}
              {picture?.webp && <source srcSet={picture.webp} type="image/webp" />}
              {picture?.fallback && (
                <motion.img
                  {...rest}
                  alt={loaded ? alt : undefined}
                  animate={{ opacity: live || loaded ? 1 : 0 }}
                  draggable={false}
                  height={fit.height}
                  initial={{ opacity: live ? 1 : 0 }}
                  key={key(alt, 'picture')}
                  onLoad={onFallbackLoad}
                  src={fit.path}
                  srcSet={picture.fallback?.src?.srcSet}
                  transition={{ duration: 0.5, ease: 'easeInOut' }}
                  width={fit.width}
                />
              )}
            </Fragment>
          )}
        </AnimatePresence>
      </picture>
    </LazyMotion>
  );
});

export default memo(function Image({ link, ...rest }: ImageProps): ReactElement {
  return link ? <Link {...link}><Picture {...rest} /></Link> : <Picture {...rest} />;
});
