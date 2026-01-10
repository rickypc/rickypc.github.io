/*!
 * Copyright © 2015 Richard Huang <rickypc@users.noreply.github.com>
 * All rights reserved.
 * ----------------------------------------------------------------------------
 * @jest-environment jsdom
 */

import { act, renderHook, waitFor } from '@testing-library/react';
import { type Location } from 'history';
import useIsBrowser from '@docusaurus/useIsBrowser';
import { useLocation } from '@docusaurus/router';
import {
  useMedia,
  usePrint,
  useResize,
  useSpeech,
  useVisibility,
  useWelcome,
} from '@site/src/hooks/observer';

const useIsBrowserMock = jest.mocked(useIsBrowser);
const useLocationMock = jest.mocked(useLocation);

jest.unmock('@site/src/hooks/observer');

const spies = {
  doc: {
    add: jest.spyOn(document, 'addEventListener'),
    remove: jest.spyOn(document, 'removeEventListener'),
  },
  win: {
    add: jest.spyOn(window, 'addEventListener'),
    remove: jest.spyOn(window, 'removeEventListener'),
  },
};

describe('useMedia', () => {
  // eslint-disable-next-line no-unused-vars
  let mediaQueryListeners: Map<string, (ev: MediaQueryListEvent) => void>;
  let mediaQueryLists: MediaQueryList[];

  beforeEach(() => {
    mediaQueryListeners = new Map();
    mediaQueryLists = [];

    // Stub window.matchMedia fresh each test.
    window.matchMedia = jest.fn((query): MediaQueryList => {
      const mql = {
        addEventListener: jest.fn((event, cb) => {
          mediaQueryListeners.set(query, cb);
        }),
        matches: query.includes('min-width'),
        media: query,
        removeEventListener: jest.fn((event, cb) => {
          if (mediaQueryListeners.get(query) === cb) {
            mediaQueryListeners.delete(query);
          }
        }),
      };
      mediaQueryLists.push(mql as unknown as MediaQueryList);
      return mql as unknown as MediaQueryList;
    });
  });

  test('initializes state to matchMedia(query).matches', async () => {
    const query = '(min-width: 600px)';
    const { result } = renderHook(() => useMedia(query));

    // Wait for the effect to call setChange(media.matches).
    await waitFor(() => expect(result.current[0]).toBeTruthy());

    expect(window.matchMedia).toHaveBeenCalledWith(query);
  });

  test('updates state when the media query fires change events', async () => {
    const query = '(min-width: 600px)';
    const { result } = renderHook(() => useMedia(query));

    await waitFor(() => expect(result.current[0]).toBeTruthy());

    act(() => {
      // Simulate the listener callback.
      const cb = mediaQueryListeners.get(query);
      cb?.({ matches: false, media: query } as MediaQueryListEvent);
    });

    await waitFor(() => expect(result.current[0]).toBeFalsy());
  });

  test('removes its listener on unmount', async () => {
    const query = '(min-width: 600px)';
    const { unmount } = renderHook(() => useMedia(query));

    // Wait until addEventListener has definitely run.
    const mql = mediaQueryLists[0];
    await waitFor(() => expect(mql.addEventListener)
      .toHaveBeenCalledWith('change', expect.any(Function)));

    unmount();

    expect(mql.removeEventListener)
      .toHaveBeenCalledWith('change', expect.any(Function));
    expect(mediaQueryListeners.has(query)).toBeFalsy();
  });

  test('tears down the old listener and subscribes a new one when query changes', async () => {
    const query1 = '(min-width: 400px)';
    const query2 = '(max-width: 500px)';

    const { result, rerender } = renderHook(
      ({ q }) => useMedia(q),
      { initialProps: { q: query1 } },
    );

    // Initial effect.
    await waitFor(() => {
      expect(window.matchMedia).toHaveBeenLastCalledWith(query1);
      expect(result.current[0]).toBeTruthy();
    });
    const mql1 = mediaQueryLists[0];

    // Change the query.
    rerender({ q: query2 });

    // Now the old listener cleanup + new subscription + state update should all fire.
    await waitFor(() => {
      // Old cleanup.
      expect(mql1.removeEventListener)
        .toHaveBeenCalledWith('change', expect.any(Function));

      // New subscription was added.
      const mql2 = mediaQueryLists[1];
      expect(window.matchMedia).toHaveBeenLastCalledWith(query2);
      expect(mql2.addEventListener)
        .toHaveBeenCalledWith('change', expect.any(Function));

      // New state reflects matches for max-width -> false.
      expect(result.current[0]).toBeFalsy();
    });
  });
});

describe('usePrint', () => {
  test('should return false initially', () => {
    const { result } = renderHook(() => usePrint());
    expect(result.current[0]).toBeFalsy();
  });

  test('should set printing to false on afterprint event', () => {
    const { result } = renderHook(() => usePrint());

    // First simulate beforeprint.
    act(() => window.dispatchEvent(new Event('beforeprint')));
    expect(result.current[0]).toBeTruthy();

    // Then simulate afterprint.
    act(() => window.dispatchEvent(new Event('afterprint')));
    expect(result.current[0]).toBeFalsy();
  });
});

describe('useResize', () => {
  test('sets resizing to true immediately on resize', () => {
    const { result } = renderHook(() => useResize());

    expect(result.current[0]).toBeFalsy();

    act(() => window.dispatchEvent(new Event('resize')));

    expect(result.current[0]).toBeTruthy();
  });

  test('sets resizing to false after debounce delay', () => {
    jest.useFakeTimers();
    const { result } = renderHook(() => useResize(500));

    act(() => window.dispatchEvent(new Event('resize')));

    expect(result.current[0]).toBeTruthy();

    act(() => jest.advanceTimersByTime(500));

    expect(result.current[0]).toBeFalsy();
    jest.useRealTimers();
  });

  test('debounce resets if resize fires repeatedly', () => {
    jest.useFakeTimers();
    const { result } = renderHook(() => useResize(500));

    act(() => window.dispatchEvent(new Event('resize')));

    expect(result.current[0]).toBeTruthy();

    // Fire resize again before debounce ends.
    act(() => {
      jest.advanceTimersByTime(300);
      window.dispatchEvent(new Event('resize'));
    });

    // Still resizing.
    expect(result.current[0]).toBeTruthy();

    // Now let full debounce pass.
    act(() => jest.advanceTimersByTime(500));

    expect(result.current[0]).toBeFalsy();
    jest.useRealTimers();
  });

  test('removes resize listener on unmount', () => {
    const { unmount } = renderHook(() => useResize(500));
    unmount();

    expect(spies.win.remove).toHaveBeenCalledWith(
      'resize',
      expect.any(Function),
    );
  });
});

describe('useSpeech', () => {
  afterEach(() => {
    Object.defineProperty(window, 'speechSynthesis', { configurable: true, value: undefined });
    Object.defineProperty(window, 'SpeechSynthesisUtterance', { configurable: true, value: undefined });
  });

  test('returns false when both globals are missing', async () => {
    const { result } = renderHook(() => useSpeech());
    await waitFor(() => expect(result.current[0]).toBeFalsy());
  });

  test('returns false when only speechSynthesis is defined', async () => {
    Object.defineProperty(window, 'speechSynthesis', { configurable: true, value: {} });

    const { result } = renderHook(() => useSpeech());
    await waitFor(() => expect(result.current[0]).toBeFalsy());
  });

  test('returns false when only SpeechSynthesisUtterance is defined', async () => {
    // Dummy constructor.
    Object.defineProperty(window, 'SpeechSynthesisUtterance', { configurable: true, value() {} });

    const { result } = renderHook(() => useSpeech());
    await waitFor(() => expect(result.current[0]).toBeFalsy());
  });

  test('returns true when both speechSynthesis and SpeechSynthesisUtterance are defined', async () => {
    // Dummy constructor
    Object.defineProperty(window, 'speechSynthesis', { configurable: true, value: {} });
    Object.defineProperty(window, 'SpeechSynthesisUtterance', { configurable: true, value() {} });

    const { result } = renderHook(() => useSpeech());
    await waitFor(() => expect(result.current[0]).toBeTruthy());
  });
});

describe('useVisibility (Browser)', () => {
  let observeMock: jest.Mock<void, [Element]>;
  let onIntersect: IntersectionObserverCallback;
  let onWindowFocusChange: EventListenerOrEventListenerObject;
  let unobserveMock: jest.Mock<void, [Element]>;

  beforeAll(() => {
    // Stub IntersectionObserver globally.
    observeMock = jest.fn();
    unobserveMock = jest.fn();
    global.IntersectionObserver = jest.fn((callback) => {
      onIntersect = callback;
      return { observe: observeMock, unobserve: unobserveMock };
    }) as unknown as typeof IntersectionObserver;
  });

  afterAll(() => {
    // Restore the original IntersectionObserver
    (global.IntersectionObserver as any).mockRestore?.();
    delete (global as any).IntersectionObserver;
  });

  test('does nothing if ref.current is falsy, but reacts to visibilitychange', () => {
    spies.win.add.mockImplementation((event, cb) => {
      if (event === 'focus') {
        onWindowFocusChange = cb;
      }
    });

    // Render without passing a ref -> ref.current is undefined.
    const { result, unmount } = renderHook(() => useVisibility());
    act(() => (onWindowFocusChange as EventListener)(new FocusEvent('focus')));

    // IntersectionObserver never constructed.
    expect(global.IntersectionObserver).not.toHaveBeenCalled();
    expect(result.current.visible).toBeFalsy();

    // visibilitychange listener was added.
    expect(spies.doc.add).toHaveBeenCalledWith('visibilitychange', expect.any(Function));
    expect(spies.win.add).toHaveBeenCalledWith('blur', expect.any(Function));
    expect(spies.win.add).toHaveBeenCalledWith('focus', expect.any(Function));

    // Simulate page becoming visible.
    Object.defineProperty(document, 'hidden', { configurable: true, value: false });
    act(() => document.dispatchEvent(new Event('visibilitychange')));
    expect(result.current.visible).toBeFalsy();

    // On unmount, we remove that listener.
    act(() => unmount());
    expect(spies.doc.remove).toHaveBeenCalledWith('visibilitychange', expect.any(Function));
    expect(spies.win.remove).toHaveBeenCalledWith('blur', expect.any(Function));
    expect(spies.win.remove).toHaveBeenCalledWith('focus', expect.any(Function));
  });

  test('observes when ref.current is set and toggles visible on intersections', () => {
    const options = { rootMargin: '10px', threshold: 0.25 };
    const span = document.createElement('span');
    // After span assignment.
    const ref = { current: span };
    spies.win.add.mockImplementation((event, cb) => {
      if (event === 'focus') {
        onWindowFocusChange = cb;
      }
    });

    const { result, unmount } = renderHook(() => useVisibility({ ref, ...options }));
    act(() => (onWindowFocusChange as EventListener)(new FocusEvent('focus')));

    // Observer constructed with the same options we passed.
    expect(global.IntersectionObserver).toHaveBeenCalledWith(expect.any(Function), options);

    expect(spies.win.add).toHaveBeenCalledWith('blur', expect.any(Function));
    expect(spies.win.add).toHaveBeenCalledWith('focus', expect.any(Function));

    // And it starts observing our element.
    expect(observeMock).toHaveBeenCalledWith(span);
    expect(result.current.visible).toBeFalsy();

    // Fire an intersection entry = true.
    act(() => onIntersect(
      [{ isIntersecting: true } as IntersectionObserverEntry],
      {} as IntersectionObserver,
    ));
    expect(result.current.visible).toBeTruthy();

    // Then out of view.
    act(() => onIntersect(
      [{ isIntersecting: false } as IntersectionObserverEntry],
      {} as IntersectionObserver,
    ));
    expect(result.current.visible).toBeFalsy();

    // Also listens to visibilitychange.
    expect(spies.doc.add).toHaveBeenCalledWith('visibilitychange', expect.any(Function));
    Object.defineProperty(document, 'hidden', { configurable: true, value: false });
    act(() => {
      onIntersect(
        [{ isIntersecting: true } as IntersectionObserverEntry],
        {} as IntersectionObserver,
      );
      document.dispatchEvent(new Event('visibilitychange'));
    });
    expect(result.current.visible).toBeTruthy();

    // Cleanup: both removeEventListener and unobserve.
    act(() => unmount());

    expect(spies.doc.remove).toHaveBeenCalledWith('visibilitychange', expect.any(Function));
    expect(unobserveMock).toHaveBeenCalledWith(span);
    expect(spies.win.remove).toHaveBeenCalledWith('blur', expect.any(Function));
    expect(spies.win.remove).toHaveBeenCalledWith('focus', expect.any(Function));
  });
});

describe('useWelcome', () => {
  beforeEach(() => {
    // Minimal DOM expected by the hook.
    document.body.innerHTML = `
    <nav>
      <a class="navbar__item navbar__item--translate" href="#translate">translate</a>
      <div class="navbar__brand">
        <span class="navbar__title">Title</span>
      </div>
    </nav>
    <div id="__docusaurus" class="docusaurus-root"></div>
    `;
  });

  test('default object and navigation = true (undefined)', () => {
    Object.defineProperty(window.navigator, 'language', {
      configurable: true,
      value: undefined,
    });
    useIsBrowserMock.mockReturnValue(true);
    useLocationMock.mockReturnValue({ pathname: '/missing' } as Location);

    // eslint-disable-next-line testing-library/no-node-access
    let root = document.getElementById('__docusaurus');
    root!.className = 'docusaurus-root';

    renderHook(() => useWelcome());

    // eslint-disable-next-line testing-library/no-node-access
    let translateLink = document.querySelector('nav .navbar__item.navbar__item--translate');
    expect((translateLink as HTMLAnchorElement).href)
      .toContain('https://rickypc-github-io.translate.goog/missing/?_x_tr_sl=auto&_x_tr_tl=en');

    // Empty-string case.
    Object.defineProperty(window.navigator, 'language', {
      configurable: true,
      value: '',
    });
    useLocationMock.mockReturnValue({ pathname: '/missing-empty' } as Location);

    // eslint-disable-next-line testing-library/no-node-access
    root = document.getElementById('__docusaurus');
    root!.className = 'docusaurus-root';

    renderHook(() => useWelcome());

    // eslint-disable-next-line testing-library/no-node-access
    translateLink = document.querySelector('nav .navbar__item.navbar__item--translate');
    expect((translateLink as HTMLAnchorElement).href)
      .toContain('https://rickypc-github-io.translate.goog/missing-empty/?_x_tr_sl=auto&_x_tr_tl=en');
  });

  test('default object and navigation = true (en-US)', () => {
    Object.defineProperty(window.navigator, 'language', {
      configurable: true,
      value: 'en-US',
    });
    useIsBrowserMock.mockReturnValue(true);
    useLocationMock.mockReturnValue({ pathname: '/docs/intro' } as Location);

    // eslint-disable-next-line testing-library/no-node-access
    const root = document.getElementById('__docusaurus');
    root!.className = 'docusaurus-root';

    renderHook(() => useWelcome());

    // eslint-disable-next-line testing-library/no-node-access
    const translateLink = document.querySelector('nav .navbar__item.navbar__item--translate');
    expect(translateLink).not.toBeNull();
    expect((translateLink as HTMLAnchorElement).href)
      .toContain('https://rickypc-github-io.translate.goog/docs/intro/?_x_tr_sl=auto&_x_tr_tl=en');

    expect(root!.className).not.toMatch(/--exclusive/);
    expect(root!.className).toMatch(/--welcome/);

    // eslint-disable-next-line testing-library/no-node-access
    const title = document.querySelector('nav .navbar__brand .navbar__title');
    expect(title!.getAttribute('translate')).toBe('no');
  });

  test('default object and navigation = true (en-US) - non-browser', () => {
    Object.defineProperty(window.navigator, 'language', {
      configurable: true,
      value: 'en-US',
    });
    useIsBrowserMock.mockReturnValue(false);
    useLocationMock.mockReturnValue({ pathname: '/no-browser' } as Location);

    // eslint-disable-next-line testing-library/no-node-access
    const root = document.getElementById('__docusaurus');
    root!.className = 'docusaurus-root';

    renderHook(() => useWelcome());

    // eslint-disable-next-line testing-library/no-node-access
    const title = document.querySelector('nav .navbar__brand .navbar__title');
    expect(title!.getAttribute('translate')).toBeNull();
    expect(root!.className).toBe('docusaurus-root');
  });

  test('navigation = false (zh-CN)', () => {
    Object.defineProperty(window.navigator, 'language', {
      configurable: true,
      value: 'zh-CN',
    });
    useIsBrowserMock.mockReturnValue(true);
    useLocationMock.mockReturnValue({ pathname: '/zh' } as Location);

    // eslint-disable-next-line testing-library/no-node-access
    const root = document.getElementById('__docusaurus');
    root!.className = 'docusaurus-root';

    renderHook(() => useWelcome({ navigation: false }));

    // eslint-disable-next-line testing-library/no-node-access
    const translateLink = document.querySelector('nav .navbar__item.navbar__item--translate');
    expect(translateLink).not.toBeNull();
    expect((translateLink as HTMLAnchorElement).href)
      .toContain('https://rickypc-github-io.translate.goog/zh/?_x_tr_sl=en&_x_tr_tl=zh-CN');

    // Navigation false should add exclusive and welcome classes.
    expect(root!.className).toMatch(/--exclusive/);
    expect(root!.className).toMatch(/--welcome/);

    // eslint-disable-next-line testing-library/no-node-access
    const title = document.querySelector('nav .navbar__brand .navbar__title');
    expect(title!.getAttribute('translate')).toBe('no');
  });

  test('navigation = true (fr)', () => {
    Object.defineProperty(window.navigator, 'language', {
      configurable: true,
      value: 'fr',
    });
    useIsBrowserMock.mockReturnValue(true);
    useLocationMock.mockReturnValue({ pathname: '/fr' } as Location);

    // eslint-disable-next-line testing-library/no-node-access
    const root = document.getElementById('__docusaurus');
    root!.className = 'docusaurus-root';

    renderHook(() => useWelcome({ navigation: true }));

    // eslint-disable-next-line testing-library/no-node-access
    const translateLink = document.querySelector('nav .navbar__item.navbar__item--translate');
    expect((translateLink as HTMLAnchorElement).href)
      .toContain('https://rickypc-github-io.translate.goog/fr/?_x_tr_sl=en&_x_tr_tl=fr');

    expect(root!.className).toMatch(/--welcome/);
  });
});
