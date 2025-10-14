/*!
 * All the code that follow is
 * Copyright (c) 2015 - 2025 Richard Huang <rickypc@users.noreply.github.com>.
 * All Rights Reserved. Not for reuse without permission.
 */

const Picture = ({ alt, picture, ...rest }) => (
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

export default ({ link, picture, whileTap, ...rest }) => {
  if (link) {
    const { whileTap: linkWhileTap, ...linkRest } = link;
    return (
      <a data-testid="link" whiletap={JSON.stringify(linkWhileTap || {})} {...linkRest}>
        <Picture picture={picture} {...rest} />
      </a>
    );
  }
  return <Picture picture={picture} {...rest} />;
};
