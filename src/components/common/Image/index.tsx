/*!
 * Copyright © 2015 Richard Huang <rickypc@users.noreply.github.com>
 * All rights reserved.
 */

import Link from '@site/src/components/common/Link';
import { clsx, key } from '@site/src/data/common';
import { useVisibility } from '@site/src/hooks/observer';
import { AnimatePresence, domAnimation, LazyMotion, motion } from 'motion/react';
import {
  type CSSProperties,
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

type PictureContentProps = {
  alt?: string;
  fit: ImageInfo;
  live?: boolean;
  loaded: boolean;
  onFallbackLoad: (_: SyntheticEvent<HTMLImageElement, Event>) => void;
  picture: PictureInfo | undefined;
  rest: any;
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

type PictureSourcesProps = {
  picture?: PictureInfo;
};

const findFittingImage = (
  images: ImageInfo[] | undefined,
  fallback: ImageSource | undefined,
  width: number,
): ImageInfo => {
  let responsive = images;
  if (!Array.isArray(responsive) && typeof fallback === 'string') {
    responsive = [{ path: fallback, width }];
  }
  return (
    responsive?.find((image) => image.width >= width) || responsive?.slice(-1)?.[0] || { width: 0 }
  );
};

const pictureClassName = (
  className: string | undefined,
  background: boolean,
  preSrc: boolean,
): string => clsx(className, styles.picture, background && !preSrc && styles.shimmer);

const pictureStyle = (background: boolean, preSrc: string | undefined): CSSProperties =>
  background && preSrc ? { backgroundImage: `url(${preSrc})` } : {};

const pictureImages = (picture: PictureInfo | undefined) => picture?.fallback?.src?.images;
const picturePreSrc = (picture: PictureInfo | undefined) => picture?.fallback?.preSrc;
const pictureSrcSet = (picture: PictureInfo | undefined) => picture?.fallback?.src?.srcSet;

const PictureSources = memo(function PictureSources({ picture }: PictureSourcesProps) {
  return (
    <>
      {picture?.avif && <source srcSet={picture.avif} type="image/avif" />}
      {picture?.webp && <source srcSet={picture.webp} type="image/webp" />}
    </>
  );
});

// After PictureSources assignment.
const PictureContent = memo(function PictureContent({
  alt,
  fit,
  live,
  loaded,
  onFallbackLoad,
  picture,
  rest,
}: PictureContentProps): ReactElement {
  return (
    <Fragment key={key(alt, 'fragment')}>
      <PictureSources picture={picture} />
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
          srcSet={pictureSrcSet(picture)}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
          width={fit.width}
        />
      )}
    </Fragment>
  );
});

// After PictureContent assignment.
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
  const images = pictureImages(picture);
  // After images assignment.
  const [fit, setFit] = useState<ImageInfo>(images?.[0] || { width: 0 });
  const [loaded, setLoaded] = useState(false);
  const localRef = useRef<HTMLPictureElement | null>(null);
  const pictureRef = ref || localRef;
  const preSrc = picturePreSrc(picture);
  const [show, setShow] = useState(false);
  const { visible } = useVisibility({ ref: pictureRef, threshold: 0.1 });

  const onFallbackLoad = useCallback(
    (evt: SyntheticEvent<HTMLImageElement, Event>) => {
      setLoaded(true);
      onLoad?.(evt);
      setTimeout(() => setBackground(false), 450);
    },
    [onLoad],
  );

  useEffect(() => {
    // istanbul ignore else
    if (pictureRef?.current) {
      const width =
        pictureRef.current.clientWidth || pictureRef.current.parentElement?.clientWidth || 0;
      const found = findFittingImage(images, picture?.fallback, width);
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
        className={pictureClassName(className, background, !!preSrc)}
        ref={pictureRef}
        style={pictureStyle(background, preSrc)}
      >
        <AnimatePresence>
          {show && (
            <PictureContent
              alt={alt}
              fit={fit}
              live={live}
              loaded={loaded}
              onFallbackLoad={onFallbackLoad}
              picture={picture}
              rest={rest}
            />
          )}
        </AnimatePresence>
      </picture>
    </LazyMotion>
  );
});

export default memo(function Image({ link, ...rest }: ImageProps): ReactElement {
  return link ? (
    <Link {...link}>
      <Picture {...rest} />
    </Link>
  ) : (
    <Picture {...rest} />
  );
});
