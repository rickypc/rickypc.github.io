/*!
 * Copyright © 2015 Richard Huang <rickypc@users.noreply.github.com>
 * All rights reserved.
 */

import { jest, mock } from 'bun:test';
import Image from '@site/src/components/common/Image';
import { useVisibility } from '@site/src/hooks/observer';
import { act, fireEvent, render, renderHook, screen } from '@testing-library/react';
import { useRef } from 'react';

const useVisibilityMock = useVisibility as Mocked<typeof useVisibility>;

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

afterEach(() => {
  jest.runOnlyPendingTimers();
  jest.useRealTimers();
});
beforeEach(() => jest.useFakeTimers());

describe('Image.visibility', () => {
  test('does not render sources or img when not visible', () => {
    const { result } = renderHook(() => useRef(null));
    useVisibilityMock.mockReturnValue({ ref: result.current, visible: false });
    const { container } = render(<Image alt="Alt" picture={basePicture} />);
    // eslint-disable-next-line testing-library/no-container,testing-library/no-node-access
    const picture = container.querySelector('picture');
    expect(picture).toBeInTheDocument();
    // eslint-disable-next-line testing-library/no-node-access
    expect(picture?.querySelector('source')).toBeNull();
    // eslint-disable-next-line testing-library/no-node-access
    expect(picture?.querySelector('img')).toBeNull();
  });

  test('renders a picture element when visible', () => {
    const { result } = renderHook(() => useRef(null));
    useVisibilityMock.mockReturnValue({ ref: result.current, visible: true });
    const { container } = render(<Image alt="Alt" picture={basePicture} />);
    // eslint-disable-next-line testing-library/no-container,testing-library/no-node-access
    expect(container.querySelector('picture')).toBeInTheDocument();
  });
});

describe('Image.sources and fallback', () => {
  test('renders avif, webp sources and fallback img', () => {
    const { container } = render(<Image alt="Alt" picture={basePicture} />);
    // eslint-disable-next-line testing-library/no-container,testing-library/no-node-access
    const sources = container.querySelectorAll('source');
    expect(sources).toHaveLength(2);
    expect(sources[0]).toHaveAttribute('srcset', 'img.avif');
    expect(sources[1]).toHaveAttribute('srcset', 'img.webp');
    // eslint-disable-next-line testing-library/no-container,testing-library/no-node-access
    const img = container.querySelector('img');
    expect(img).toHaveAttribute('src', 'fallback.jpg');
  });
});

describe('Image.link wrapper', () => {
  test('wraps picture in an anchor when link prop is provided', () => {
    render(<Image alt="Alt" link={{ href: '/test', title: 'Test' }} live picture={basePicture} />);
    const anchor = screen.getByTestId('link-Test');
    expect(anchor).toHaveAttribute('href', '/test');
    expect(anchor).toHaveAttribute('title', 'Test');
    // eslint-disable-next-line testing-library/no-node-access
    expect(anchor.firstChild).toBeInTheDocument();
  });
});

describe('Image.preSrc background and load behavior', () => {
  test('applies preSrc background, sets alt on load, and clears preSrc after delay', () => {
    const onLoad = mock();
    const { container } = render(<Image alt="Alt text" onLoad={onLoad} picture={basePicture} />);
    // eslint-disable-next-line testing-library/no-container,testing-library/no-node-access
    const pic = container.querySelector('picture');
    expect(pic).toHaveStyle('background-image: url(preSrc.jpg)');
    // eslint-disable-next-line testing-library/no-container,testing-library/no-node-access
    const img = container.querySelector('img');
    expect(img).not.toHaveAttribute('alt');

    fireEvent.load(img as HTMLImageElement);
    expect(onLoad).toHaveBeenCalledTimes(1);
    expect(img).toHaveAttribute('alt', 'Alt text');

    act(() => jest.advanceTimersByTime(450));
    expect(pic).not.toHaveStyle('background-image: url(preSrc.jpg)');
  });

  test('invokes onLoad again on subsequent loads without restoring preSrc', async () => {
    const onLoad = mock();
    const { container } = render(<Image alt="Alt" onLoad={onLoad} picture={basePicture} />);
    // eslint-disable-next-line testing-library/no-container,testing-library/no-node-access
    const img = container.querySelector('img');
    // eslint-disable-next-line testing-library/no-container,testing-library/no-node-access
    const pic = container.querySelector('picture');

    fireEvent.load(img as HTMLImageElement);
    act(() => jest.advanceTimersByTime(450));
    fireEvent.load(img as HTMLImageElement);
    expect(onLoad).toHaveBeenCalledTimes(2);
    expect(pic).not.toHaveStyle('background-image: url(preSrc.jpg)');
  });
});

describe('Image.responsive fallback selection', () => {
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

  test.each(scenarios)('$name', ({ expected, images, width }) => {
    const original = Object.getOwnPropertyDescriptor(HTMLElement.prototype, 'clientWidth');
    Object.defineProperty(HTMLElement.prototype, 'clientWidth', {
      configurable: true,
      get: () => width,
    });

    const picObj =
      typeof images === 'string'
        ? { fallback: images }
        : {
            avif: basePicture.avif,
            fallback: { preSrc: '', src: { images, srcSet: '' } },
            webp: basePicture.webp,
          };

    const { container } = render(<Image alt="Alt" picture={picObj as any} />);
    // eslint-disable-next-line testing-library/no-container,testing-library/no-node-access
    const img = container.querySelector('img');
    expect(img?.getAttribute('src')).toEqual(expected);

    if (original) {
      Object.defineProperty(HTMLElement.prototype, 'clientWidth', original);
    }
  });
});
