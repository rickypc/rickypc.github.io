/*!
 * All the code that follow is
 * Copyright (c) 2015 - 2025 Richard Huang <rickypc@users.noreply.github.com>.
 * All Rights Reserved. Not for reuse without permission.
 */

import { type ReactElement } from 'react';

type ImageProps = PictureProps & {
  link?: {
    whileTap?: {
      scale?: number;
    };
  };
  whileTap?: {
    scale?: number;
  };
};

type PictureInfo = {
  avif?: string;
  fallback?: string;
  webp?: string;
};

type PictureProps = {
  alt?: string;
  picture: PictureInfo;
};

/**
 * Minimal mock common/Picture component that renders children.
 * @param {PictureProps} props
 *   The component props.
 * @returns {ReactElement}
 *   The common/Picture component.
 */
function Picture({ alt, picture, ...rest }: PictureProps): ReactElement {
  return (
    <picture data-testid="picture" style={{ backgroundImage: `url(${picture?.fallback})` }}>
      {picture?.avif && <source srcSet={picture.avif} type="image/avif" />}
      {picture?.webp && <source srcSet={picture.webp} type="image/webp" />}
      {picture?.fallback && (
        <img
          alt={alt || 'alt'}
          data-testid={`img-${alt || 'alt'}`}
          src={picture?.fallback}
          srcSet={picture.fallback}
          {...rest}
        />
      )}
    </picture>
  );
}

/**
 * Minimal mock common/Image component that renders children.
 * @param {ImageProps} props
 *   The component props.
 * @returns {ReactElement}
 *   The common/Image component.
 */
export default function Image({
  link,
  picture,
  whileTap,
  ...rest
}: ImageProps): ReactElement {
  if (link) {
    const { whileTap: linkWhileTap, ...linkRest } = link;
    return (
      // eslint-disable-next-line @docusaurus/no-html-links
      <a data-testid="link" data-whiletap={JSON.stringify(linkWhileTap || {})} {...linkRest}>
        <Picture picture={picture} {...rest} />
      </a>
    );
  }
  return <Picture picture={picture} {...rest} />;
}
