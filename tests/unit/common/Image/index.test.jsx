/*!
 * Copyright (c) 2015 - 2025 Richard Huang <rickypc@users.noreply.github.com>.
 * All Rights Reserved. Not for reuse without permission.
 * ----------------------------------------------------------------------------
 * @jest-environment jsdom
 */

import { act, render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { useVisibility } from '@site/src/hooks/observer';
import Image from '../../../../src/components/common/Image';

jest.mock('@site/src/hooks/observer', () => ({
  useVisibility: jest.fn(),
}));

describe('Image', () => {
  const picture = {
    avif: 'img.avif',
    webp: 'img.webp',
    fallback: {
      src: {
        images: [{ path: 'fallback.jpg', width: 100 }],
        srcSet: 'fallbackSrcSet',
      },
      preSrc: 'preSrc.jpg',
    },
  };

  beforeEach(() => {
    jest.useFakeTimers();
    useVisibility.mockReturnValue({ visible: true });
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
    jest.clearAllMocks();
  });

  it('does not render image or sources when not visible', () => {
    useVisibility.mockReturnValue({ visible: false });
    const { container } = render(<Image alt="Alt" picture={picture} />);
    expect(container.querySelector('source')).not.toBeInTheDocument();
    expect(container.querySelector('img')).not.toBeInTheDocument();
  });

  it('renders picture when visible', () => {
    const { container } = render(<Image alt="Alt" picture={picture} />);
    expect(container.querySelector('picture')).toBeInTheDocument();
  });

  it('calls onLoad and updates alt and background after img load', () => {
    const onLoadMock = jest.fn();
    const { container } = render((
      <Image alt="Alt text" picture={picture} onLoad={onLoadMock} />
    ));

    const img = container.querySelector('img');
    expect(img).not.toHaveAttribute('alt');

    fireEvent.load(img);
    expect(onLoadMock).toHaveBeenCalledTimes(1);
    expect(img).toHaveAttribute('alt', 'Alt text');

    act(() => {
      jest.advanceTimersByTime(450);
    });
    const pic = container.querySelector('picture');
    expect(pic).not.toHaveStyle('background-image: url(preSrc.jpg)');
  });

  it('ignores load when already loaded and does not change background on second load', () => {
    const onLoadMock = jest.fn();
    const { container } = render((
      <Image alt="Alt" picture={picture} onLoad={onLoadMock} />
    ));

    const img = container.querySelector('img');
    fireEvent.load(img);
    act(() => {
      jest.advanceTimersByTime(450);
    });
    const pic = container.querySelector('picture');
    expect(onLoadMock).toHaveBeenCalledTimes(1);
    expect(pic).not.toHaveStyle('background-image: url(preSrc.jpg)');

    fireEvent.load(img);
    act(() => {
      jest.advanceTimersByTime(450);
    });
    expect(onLoadMock).toHaveBeenCalledTimes(2);
    expect(pic).not.toHaveStyle('background-image: url(preSrc.jpg)');
  });

  it('renders avif, webp sources and fallback image', () => {
    const { container } = render(<Image alt="Alt" picture={picture} />);
    const sources = container.querySelectorAll('source');
    expect(sources).toHaveLength(2);
    expect(sources[0]).toHaveAttribute('srcset', 'img.avif');
    expect(sources[1]).toHaveAttribute('srcset', 'img.webp');

    const img = container.querySelector('img');
    expect(img).toHaveAttribute('src', 'fallback.jpg');
  });

  it('wraps picture in a link when link prop is provided', () => {
    const { getByRole } = render((
      <Image
        alt="Alt"
        picture={picture}
        link={{ href: '/test', title: 'Test' }}
      />
    ));
    const anchor = getByRole('link');
    expect(anchor).toHaveAttribute('href', '/test');
    expect(anchor).toHaveAttribute('title', 'Test');
    expect(anchor.querySelector('picture')).toBeInTheDocument();
  });

  it('applies preSrc as background-image style', () => {
    const { container } = render(<Image alt="Alt" picture={picture} />);
    const pic = container.querySelector('picture');
    expect(pic).toHaveStyle('background-image: url(preSrc.jpg)');
  });

  it('updates fit based on clientWidth in fallback.src.images', () => {
    const originalDescriptor = Object.getOwnPropertyDescriptor(
      HTMLElement.prototype,
      'clientWidth',
    );
    Object.defineProperty(HTMLElement.prototype, 'clientWidth', {
      configurable: true,
      get: () => 150,
    });

    const responsive = [
      { path: 'small.jpg', width: 50 },
      { path: 'large.jpg', width: 200 },
    ];
    const pictureCustom = {
      avif: picture.avif,
      webp: picture.webp,
      fallback: {
        src: { images: responsive, srcSet: 'fallbackSrcSet' },
        preSrc: 'preSrc.jpg',
      },
    };

    const { container } = render(<Image alt="Alt" picture={pictureCustom} />);
    const img = container.querySelector('img');
    expect(img).toHaveAttribute('src', 'large.jpg');

    if (originalDescriptor) {
      Object.defineProperty(
        HTMLElement.prototype,
        'clientWidth',
        originalDescriptor,
      );
    }
  });

  it('falls back to last image when none exceed width', () => {
    const originalDescriptor = Object.getOwnPropertyDescriptor(
      HTMLElement.prototype,
      'clientWidth',
    );
    Object.defineProperty(HTMLElement.prototype, 'clientWidth', {
      configurable: true,
      get: () => 150,
    });

    const responsive = [
      { path: 'one.jpg', width: 50 },
      { path: 'two.jpg', width: 100 },
    ];
    const pictureCustom = {
      avif: picture.avif,
      webp: picture.webp,
      fallback: {
        src: { images: responsive, srcSet: 'fallbackSrcSet' },
        preSrc: 'preSrc.jpg',
      },
    };

    const { container } = render(<Image alt="Alt" picture={pictureCustom} />);
    const img = container.querySelector('img');
    expect(img).toHaveAttribute('src', 'two.jpg');

    if (originalDescriptor) {
      Object.defineProperty(
        HTMLElement.prototype,
        'clientWidth',
        originalDescriptor,
      );
    }
  });

  it('does not update fit when found path equals initial fit path', () => {
    const originalDescriptor = Object.getOwnPropertyDescriptor(
      HTMLElement.prototype,
      'clientWidth',
    );
    Object.defineProperty(HTMLElement.prototype, 'clientWidth', {
      configurable: true,
      get: () => 50,
    });

    const responsive = [
      { path: 'one.jpg', width: 50 },
      { path: 'two.jpg', width: 100 },
    ];
    const pictureCustom = {
      avif: picture.avif,
      webp: picture.webp,
      fallback: {
        src: { images: responsive, srcSet: 'fallbackSrcSet' },
        preSrc: 'preSrc.jpg',
      },
    };

    const { container } = render(<Image alt="Alt" picture={pictureCustom} />);
    const img = container.querySelector('img');
    expect(img).toHaveAttribute('src', 'one.jpg');

    if (originalDescriptor) {
      Object.defineProperty(
        HTMLElement.prototype,
        'clientWidth',
        originalDescriptor,
      );
    }
  });

  it('handles string fallback by choosing the fallback path', () => {
    const originalDescriptor = Object.getOwnPropertyDescriptor(
      HTMLElement.prototype,
      'clientWidth',
    );
    Object.defineProperty(HTMLElement.prototype, 'clientWidth', {
      configurable: true,
      get: () => 80,
    });

    const pictureString = { fallback: 'stringFallback.jpg' };
    const { container } = render((
      <Image alt="Alt" picture={pictureString} />
    ));
    const img = container.querySelector('img');
    expect(img).toHaveAttribute('src', 'stringFallback.jpg');

    if (originalDescriptor) {
      Object.defineProperty(
        HTMLElement.prototype,
        'clientWidth',
        originalDescriptor,
      );
    }
  });
});
