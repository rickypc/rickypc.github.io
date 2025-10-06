/*!
 * Copyright (c) 2015 - 2025 Richard Huang <rickypc@users.noreply.github.com>.
 * All Rights Reserved. Not for reuse without permission.
 * ----------------------------------------------------------------------------
 * @jest-environment jsdom
 */

import { act, render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Image from '@site/src/components/common/Image';
import { useVisibility } from '@site/src/hooks/observer';

describe('Image', () => {
  const basePicture = {
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
  });

  describe('visibility', () => {
    it('does not render sources or img when not visible', () => {
      useVisibility.mockReturnValue({ visible: false });
      const { container } = render(<Image alt="Alt" picture={basePicture} />);
      const picture = container.querySelector('picture');
      expect(picture).toBeInTheDocument();
      expect(picture.querySelector('source')).toBeNull();
      expect(picture.querySelector('img')).toBeNull();
    });

    it('renders a picture element when visible', () => {
      useVisibility.mockReturnValue({ visible: true });
      const { container } = render(<Image alt="Alt" picture={basePicture} />);
      expect(container.querySelector('picture')).toBeInTheDocument();
    });
  });

  describe('sources and fallback', () => {
    it('renders avif, webp sources and fallback img', () => {
      const { container } = render(<Image alt="Alt" picture={basePicture} />);
      const sources = container.querySelectorAll('source');
      expect(sources).toHaveLength(2);
      expect(sources[0]).toHaveAttribute('srcset', 'img.avif');
      expect(sources[1]).toHaveAttribute('srcset', 'img.webp');

      const img = container.querySelector('img');
      expect(img).toHaveAttribute('src', 'fallback.jpg');
    });
  });

  describe('link wrapper', () => {
    it('wraps picture in an anchor when link prop is provided', () => {
      const { getByRole } = render((
        <Image
          alt="Alt"
          picture={basePicture}
          link={{ href: '/test', title: 'Test' }}
        />
      ));
      const anchor = getByRole('link');
      expect(anchor).toHaveAttribute('href', '/test');
      expect(anchor).toHaveAttribute('title', 'Test');
      expect(anchor.querySelector('picture')).toBeInTheDocument();
    });
  });

  describe('preSrc background and load behavior', () => {
    it('applies preSrc background, sets alt on load, and clears preSrc after delay', () => {
      const onLoad = jest.fn();
      const { container } = render((
        <Image alt="Alt text" picture={basePicture} onLoad={onLoad} />
      ));

      const pic = container.querySelector('picture');
      expect(pic).toHaveStyle('background-image: url(preSrc.jpg)');

      const img = container.querySelector('img');
      expect(img).not.toHaveAttribute('alt');

      fireEvent.load(img);
      expect(onLoad).toHaveBeenCalledTimes(1);
      expect(img).toHaveAttribute('alt', 'Alt text');

      act(() => jest.advanceTimersByTime(450));
      expect(pic).not.toHaveStyle('background-image: url(preSrc.jpg)');
    });

    it('invokes onLoad again on subsequent loads without restoring preSrc', () => {
      const onLoad = jest.fn();
      const { container } = render((
        <Image alt="Alt" picture={basePicture} onLoad={onLoad} />
      ));

      const img = container.querySelector('img');
      const pic = container.querySelector('picture');

      fireEvent.load(img);
      act(() => jest.advanceTimersByTime(450));
      fireEvent.load(img);
      expect(onLoad).toHaveBeenCalledTimes(2);
      expect(pic).not.toHaveStyle('background-image: url(preSrc.jpg)');
    });
  });

  describe('responsive fallback selection', () => {
    const scenarios = [
      {
        name: 'selects first image exceeding width',
        width: 150,
        images: [
          { path: 'small.jpg', width: 50 },
          { path: 'large.jpg', width: 200 },
        ],
        expected: 'large.jpg',
      },
      {
        name: 'falls back to last image when none exceed width',
        width: 150,
        images: [
          { path: 'one.jpg', width: 50 },
          { path: 'two.jpg', width: 100 },
        ],
        expected: 'two.jpg',
      },
      {
        name: 'does not change when initial fit equals first',
        width: 50,
        images: [
          { path: 'one.jpg', width: 50 },
          { path: 'two.jpg', width: 100 },
        ],
        expected: 'one.jpg',
      },
      {
        name: 'handles string fallback',
        width: 80,
        images: 'stringFallback.jpg',
        expected: 'stringFallback.jpg',
      },
    ];

    it.each(scenarios)('$name', ({ width, images, expected }) => {
      const original = Object.getOwnPropertyDescriptor(
        HTMLElement.prototype,
        'clientWidth',
      );
      Object.defineProperty(HTMLElement.prototype, 'clientWidth', {
        configurable: true,
        get: () => width,
      });

      const picObj = typeof images === 'string'
        ? { fallback: images }
        : {
          avif: basePicture.avif,
          webp: basePicture.webp,
          fallback: { src: { images, srcSet: '' }, preSrc: '' },
        };

      const { container } = render(<Image alt="Alt" picture={picObj} />);
      const img = container.querySelector('img');
      expect(img).toHaveAttribute('src', expected);

      if (original) {
        Object.defineProperty(HTMLElement.prototype, 'clientWidth', original);
      }
    });
  });
});
