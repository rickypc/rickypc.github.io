/*!
 * Copyright (c) 2015 - 2025 Richard Huang <rickypc@users.noreply.github.com>.
 * All Rights Reserved. Not for reuse without permission.
 * ----------------------------------------------------------------------------
 * @jest-environment jsdom
 */

import { act, fireEvent, render } from '@testing-library/react';
import '@testing-library/jest-dom';
import Image from '@site/src/components/common/Image';
import { useVisibility } from '@site/src/hooks/observer';

jest.unmock('@site/src/components/common/Image');

describe('Image', () => {
  const basePicture = {
    avif: 'img.avif',
    fallback: {
      preSrc: 'preSrc.jpg',
      src: {
        images: [{ path: 'fallback.jpg', width: 100 }],
        srcSet: 'fallbackSrcSet',
      },
    },
    webp: 'img.webp',
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
      const { getByTestId } = render((
        <Image
          alt="Alt"
          link={{ href: '/test', title: 'Test' }}
          picture={basePicture}
        />
      ));
      const anchor = getByTestId('link-Test');
      expect(anchor).toHaveAttribute('href', '/test');
      expect(anchor).toHaveAttribute('title', 'Test');
      expect(anchor.querySelector('picture')).toBeInTheDocument();
    });
  });

  describe('preSrc background and load behavior', () => {
    it('applies preSrc background, sets alt on load, and clears preSrc after delay', () => {
      const onLoad = jest.fn();
      const { container } = render((
        <Image alt="Alt text" onLoad={onLoad} picture={basePicture} />
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
        <Image alt="Alt" onLoad={onLoad} picture={basePicture} />
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
        expected: 'large.jpg',
        images: [
          { path: 'small.jpg', width: 50 },
          { path: 'large.jpg', width: 200 },
        ],
        name: 'selects first image exceeding width',
        width: 150,
      },
      {
        expected: 'two.jpg',
        images: [
          { path: 'one.jpg', width: 50 },
          { path: 'two.jpg', width: 100 },
        ],
        name: 'falls back to last image when none exceed width',
        width: 150,
      },
      {
        expected: 'one.jpg',
        images: [
          { path: 'one.jpg', width: 50 },
          { path: 'two.jpg', width: 100 },
        ],
        name: 'does not change when initial fit equals first',
        width: 50,
      },
      {
        expected: 'stringFallback.jpg',
        images: 'stringFallback.jpg',
        name: 'handles string fallback',
        width: 80,
      },
      {
        expected: null,
        images: [],
        name: 'handles empty fallback',
        width: 80,
      },
    ];

    it.each(scenarios)('$name', ({ expected, images, width }) => {
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
          fallback: { preSrc: '', src: { images, srcSet: '' } },
          webp: basePicture.webp,
        };

      const { container } = render(<Image alt="Alt" picture={picObj} />);
      const img = container.querySelector('img');
      expect(img.getAttribute('src')).toEqual(expected);

      if (original) {
        Object.defineProperty(HTMLElement.prototype, 'clientWidth', original);
      }
    });
  });
});
