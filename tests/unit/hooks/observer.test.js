/*!
 * All the code that follow is
 * Copyright (c) 2015 - 2025 Richard Huang <rickypc@users.noreply.github.com>.
 * All Rights Reserved. Not for reuse without permission.
 * ----------------------------------------------------------------------------
 * @jest-environment jsdom
 */

import { act, renderHook, waitFor } from '@testing-library/react';
import useIsBrowser from '@docusaurus/useIsBrowser';
import { useLocation } from '@docusaurus/router';
import {
  useMedia,
  usePrint,
  useSpeech,
  useVisibility,
  useWelcome,
} from '@site/src/hooks/observer';

jest.mock('@docusaurus/useIsBrowser', () => jest.fn());
jest.mock('@docusaurus/router', () => ({ useLocation: jest.fn() }));
jest.unmock('@site/src/hooks/observer');

describe('useMedia', () => {
  let listeners;
  let mqlInstances;

  beforeEach(() => {
    listeners = new Map();
    mqlInstances = [];

    // Stub window.matchMedia fresh each test.
    window.matchMedia = jest.fn((query) => {
      const mql = {
        addEventListener: jest.fn((event, cb) => {
          listeners.set(query, cb);
        }),
        matches: query.includes('min-width'),
        media: query,
        removeEventListener: jest.fn((event, cb) => {
          if (listeners.get(query) === cb) {
            listeners.delete(query);
          }
        }),
      };
      mqlInstances.push(mql);
      return mql;
    });
  });

  it('initializes state to matchMedia(query).matches', async () => {
    const query = '(min-width: 600px)';
    const { result } = renderHook(() => useMedia(query));

    // Wait for the effect to call setChange(media.matches).
    await waitFor(() => expect(result.current[0]).toBeTruthy());

    expect(window.matchMedia).toHaveBeenCalledWith(query);
  });

  it('updates state when the media query fires change events', async () => {
    const query = '(min-width: 600px)';
    const { result } = renderHook(() => useMedia(query));

    await waitFor(() => expect(result.current[0]).toBeTruthy());

    act(() => {
      // Simulate the listener callback.
      const cb = listeners.get(query);
      cb({ matches: false, media: query });
    });

    await waitFor(() => expect(result.current[0]).toBeFalsy());
  });

  it('removes its listener on unmount', async () => {
    const query = '(min-width: 600px)';
    const { unmount } = renderHook(() => useMedia(query));

    // Wait until addEventListener has definitely run.
    await waitFor(() => expect(mqlInstances[0].addEventListener)
      .toHaveBeenCalledWith('change', expect.any(Function)));

    unmount();

    const mql = mqlInstances[0];
    expect(mql.removeEventListener)
      .toHaveBeenCalledWith('change', expect.any(Function));
    expect(listeners.has(query)).toBeFalsy();
  });

  it('tears down the old listener and subscribes a new one when query changes', async () => {
    const q1 = '(min-width: 400px)';
    const q2 = '(max-width: 500px)';

    const { result, rerender } = renderHook(
      ({ q }) => useMedia(q),
      { initialProps: { q: q1 } },
    );

    // Initial effect.
    await waitFor(() => {
      expect(window.matchMedia).toHaveBeenLastCalledWith(q1);
      expect(result.current[0]).toBeTruthy();
    });
    const mql1 = mqlInstances[0];

    // Change the query.
    act(() => rerender({ q: q2 }));

    // Now the old listener cleanup + new subscription + state update should all fire.
    await waitFor(() => {
      // Old cleanup.
      expect(mql1.removeEventListener)
        .toHaveBeenCalledWith('change', expect.any(Function));

      // New subscription was added.
      const mql2 = mqlInstances[1];
      expect(window.matchMedia).toHaveBeenLastCalledWith(q2);
      expect(mql2.addEventListener)
        .toHaveBeenCalledWith('change', expect.any(Function));

      // New state reflects matches for max-width -> false.
      expect(result.current[0]).toBeFalsy();
    });
  });
});

describe('usePrint', () => {
  beforeEach(() => {
    jest.useFakeTimers();
    // Stub scrollY.
    Object.defineProperty(window, 'scrollY', { value: 0, writable: true });
    // Stub document heights.
    Object.defineProperty(document.body, 'scrollHeight', {
      value: 1000,
      writable: true,
    });
    Object.defineProperty(document.documentElement, 'clientHeight', {
      value: 800,
      writable: true,
    });
    window.scrollTo = jest.fn();
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
  });

  it('onBeforePrint: skips scroll steps on equal height', async () => {
    // Make heights equal.
    Object.defineProperty(document.body, 'scrollHeight', {
      value: 500,
      writable: true,
    });
    Object.defineProperty(document.documentElement, 'clientHeight', {
      value: 500,
      writable: true,
    });

    const { result } = renderHook(() => usePrint());
    expect(result.current[0]).toBeFalsy();

    act(() => window.dispatchEvent(new Event('beforeprint')));
    expect(window.scrollTo).not.toHaveBeenCalled();

    // Should be ready for print.
    await waitFor(() => expect(result.current[0]).toBeTruthy());
  });

  it('onBeforePrint: skips scrollUp, but scrolls down + back', async () => {
    const { result } = renderHook(() => usePrint());
    expect(result.current[0]).toBeFalsy();

    // Fire beforeprint.
    act(() => window.dispatchEvent(new Event('beforeprint')));

    // 1) Scroll down to bottom.
    expect(window.scrollTo).toHaveBeenNthCalledWith(1, 0, 1000);

    // Advance the 500ms back - scroll timeout.
    act(() => jest.advanceTimersByTime(500));
    await act(() => Promise.resolve());

    // 2) Scroll back to 0.
    expect(window.scrollTo).toHaveBeenNthCalledWith(2, 0, 0);

    // Should be ready for print.
    await waitFor(() => expect(result.current[0]).toBeTruthy());
  });

  it('onBeforeprint: scrollUp, scrollDown, scrollBack', async () => {
    // Start in the middle.
    window.scrollY = 100;

    const { result } = renderHook(() => usePrint());
    expect(result.current[0]).toBeFalsy();

    // Dispatch beforeprint, then advance each 500ms & flush microtasks.
    await act(async () => {
      window.dispatchEvent(new Event('beforeprint'));

      // 1st timeout → scroll down to bottom
      jest.advanceTimersByTime(500);
      await Promise.resolve();

      // 2nd timeout → scroll back to original Y
      jest.advanceTimersByTime(500);
    });

    // All three calls should have happened in order.
    // scrollUp.
    expect(window.scrollTo).toHaveBeenNthCalledWith(1, 0, 0);
    // scrollDown.
    expect(window.scrollTo).toHaveBeenNthCalledWith(2, 0, 1000);
    // scrollBack.
    expect(window.scrollTo).toHaveBeenNthCalledWith(3, 0, 100);

    // Hook’s state was set to ready inside that act(...)
    expect(result.current[0]).toBeTruthy();

    // A second beforeprint should do nothing.
    window.scrollTo.mockClear();
    await act(async () => {
      window.dispatchEvent(new Event('beforeprint'));
      jest.runOnlyPendingTimers();
    });
    expect(window.scrollTo).not.toHaveBeenCalled();
    expect(result.current[0]).toBeTruthy();
  });

  it('onScroll: sets bottom when top was initially false, and sets top when under scrollbar threshold', () => {
    // Sets scrollY>0 so initial print.scroll.top = false.
    Object.defineProperty(window, 'scrollY', { value: 100, writable: true });
    const { result } = renderHook(() => usePrint());

    // A) scrollY > (scrollHeight–clientHeight–scrollbar)=180 -> bottom branch.
    act(() => {
      window.scrollY = 200;
      window.dispatchEvent(new Event('scroll'));
    });
    // Still not ready, but print.scroll.bottom was set.
    expect(result.current[0]).toBeFalsy();

    // B) scrollY < scrollbar (20) -> top branch.
    act(() => {
      window.scrollY = 10;
      window.dispatchEvent(new Event('scroll'));
    });
    // Not ready until both are true in same event.
    expect(result.current[0]).toBeFalsy();
  });

  it('onScroll: flags bottom -> ready -> no-op (previous=true)', async () => {
    const { result } = renderHook(() => usePrint());

    // Start false.
    expect(result.current[0]).toBeFalsy();

    // 1st scroll: scrollY>threshold -> print.scroll.bottom=true,
    // top was true on mount -> still false.
    await act(() => {
      window.scrollY = 200;
      window.dispatchEvent(new Event('scroll'));
    });
    expect(result.current[0]).toBeFalsy();

    // 2nd scroll: both flags now true -> setReady(false -> true).
    await act(() => window.dispatchEvent(new Event('scroll')));
    await waitFor(() => expect(result.current[0]).toBeTruthy());

    // 3rd scroll: print is ready -> callback returns previous (true).
    await act(() => window.dispatchEvent(new Event('scroll')));
    expect(result.current[0]).toBeTruthy();
  });

  it('onUnmount: cleans up its event listeners', () => {
    const addSpy = jest.spyOn(window, 'addEventListener');
    const removeSpy = jest.spyOn(window, 'removeEventListener');

    const { unmount } = renderHook(() => usePrint());

    expect(addSpy).toHaveBeenCalledWith('beforeprint', expect.any(Function));
    expect(addSpy).toHaveBeenCalledWith('scroll', expect.any(Function));

    act(() => unmount());

    expect(removeSpy).toHaveBeenCalledWith('beforeprint', expect.any(Function));
    expect(removeSpy).toHaveBeenCalledWith('scroll', expect.any(Function));
  });
});

describe('useSpeech', () => {
  afterEach(() => {
    delete window.speechSynthesis;
    delete window.SpeechSynthesisUtterance;
  });

  it('returns false when both globals are missing', async () => {
    const { result } = renderHook(() => useSpeech());
    await waitFor(() => expect(result.current[0]).toBeFalsy());
  });

  it('returns false when only speechSynthesis is defined', async () => {
    window.speechSynthesis = {};

    const { result } = renderHook(() => useSpeech());
    await waitFor(() => expect(result.current[0]).toBeFalsy());
  });

  it('returns false when only SpeechSynthesisUtterance is defined', async () => {
    // Dummy constructor.
    // eslint-disable-next-line func-names
    window.SpeechSynthesisUtterance = function () {};

    const { result } = renderHook(() => useSpeech());
    await waitFor(() => expect(result.current[0]).toBeFalsy());
  });

  it('returns true when both speechSynthesis and SpeechSynthesisUtterance are defined', async () => {
    window.speechSynthesis = {};
    // Dummy constructor
    // eslint-disable-next-line func-names
    window.SpeechSynthesisUtterance = function () {};

    const { result } = renderHook(() => useSpeech());
    await waitFor(() => expect(result.current[0]).toBeTruthy());
  });
});

describe('useVisibility (Browser)', () => {
  let ioCallback;
  let observeMock;
  let spyVisibility;
  let unobserveMock;

  beforeAll(() => {
    // Stub IntersectionObserver globally.
    observeMock = jest.fn();
    unobserveMock = jest.fn();
    global.IntersectionObserver = jest.fn((callback) => {
      ioCallback = callback;
      return { observe: observeMock, unobserve: unobserveMock };
    });
  });

  beforeEach(() => {
    // Mock the visibilityState getter to start as 'hidden'.
    spyVisibility = jest
      .spyOn(document, 'visibilityState', 'get')
      .mockReturnValue('hidden');
  });

  afterAll(() => {
    // Restore the original IntersectionObserver
    global.IntersectionObserver.mockRestore?.();
    delete global.IntersectionObserver;
  });

  it('does nothing if ref.current is falsy, but reacts to visibilitychange', () => {
    const addSpy = jest.spyOn(document, 'addEventListener');
    const removeSpy = jest.spyOn(document, 'removeEventListener');

    // Render without passing a ref -> ref.current is undefined.
    const { result, unmount } = renderHook(() => useVisibility());

    // IntersectionObserver never constructed.
    expect(global.IntersectionObserver).not.toHaveBeenCalled();
    expect(result.current.visible).toBeFalsy();

    // visibilitychange listener was added.
    expect(addSpy).toHaveBeenCalledWith('visibilitychange', expect.any(Function));

    // Simulate page becoming visible.
    spyVisibility.mockReturnValue('visible');
    act(() => document.dispatchEvent(new Event('visibilitychange')));
    expect(result.current.visible).toBeTruthy();

    // On unmount, we remove that listener.
    act(() => unmount());
    expect(removeSpy).toHaveBeenCalledWith('visibilitychange', expect.any(Function));
  });

  it('observes when ref.current is set and toggles visible on intersections', () => {
    const addSpy = jest.spyOn(document, 'addEventListener');
    const fakeEl = {};
    const options = { rootMargin: '10px', threshold: 0.25 };
    const ref = { current: fakeEl };
    const removeSpy = jest.spyOn(document, 'removeEventListener');

    const { result, unmount } = renderHook(() => useVisibility({ ref, ...options }));

    // Observer constructed with the same options we passed.
    expect(global.IntersectionObserver).toHaveBeenCalledWith(expect.any(Function), options);

    // And it starts observing our element.
    expect(observeMock).toHaveBeenCalledWith(fakeEl);
    expect(result.current.visible).toBeFalsy();

    // Fire an intersection entry = true.
    act(() => ioCallback([{ isIntersecting: true }]));
    expect(result.current.visible).toBeTruthy();

    // Then out of view.
    act(() => ioCallback([{ isIntersecting: false }]));
    expect(result.current.visible).toBeFalsy();

    // Also listens to visibilitychange.
    expect(addSpy).toHaveBeenCalledWith('visibilitychange', expect.any(Function));
    spyVisibility.mockReturnValue('visible');
    act(() => document.dispatchEvent(new Event('visibilitychange')));
    expect(result.current.visible).toBeTruthy();

    // Cleanup: both removeEventListener and unobserve.
    act(() => unmount());

    expect(removeSpy).toHaveBeenCalledWith('visibilitychange', expect.any(Function));
    expect(unobserveMock).toHaveBeenCalledWith(fakeEl);
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

  it('default object and navigation = true (undefined)', async () => {
    Object.defineProperty(window.navigator, 'language', {
      configurable: true,
      value: undefined,
    });
    useIsBrowser.mockReturnValue(true);
    useLocation.mockReturnValue({ pathname: '/missing' });

    let root = document.getElementById('__docusaurus');
    root.className = 'docusaurus-root';

    await act(async () => renderHook(() => useWelcome()));

    let translateLink = document.querySelector('nav .navbar__item.navbar__item--translate');
    expect(translateLink.href).toContain('translate.goog/missing/?_x_tr_sl=auto&_x_tr_tl=en');

    // Empty-string case.
    Object.defineProperty(window.navigator, 'language', {
      configurable: true,
      value: '',
    });
    useLocation.mockReturnValue({ pathname: '/missing-empty' });

    root = document.getElementById('__docusaurus');
    root.className = 'docusaurus-root';

    await act(async () => renderHook(() => useWelcome()));

    translateLink = document.querySelector('nav .navbar__item.navbar__item--translate');
    expect(translateLink.href).toContain('translate.goog/missing-empty/?_x_tr_sl=auto&_x_tr_tl=en');
  });

  it('default object and navigation = true (en-US)', async () => {
    Object.defineProperty(window.navigator, 'language', {
      configurable: true,
      value: 'en-US',
    });
    useIsBrowser.mockReturnValue(true);
    useLocation.mockReturnValue({ pathname: '/docs/intro' });

    const root = document.getElementById('__docusaurus');
    root.className = 'docusaurus-root';

    await act(async () => renderHook(() => useWelcome()));

    const translateLink = document.querySelector('nav .navbar__item.navbar__item--translate');
    expect(translateLink).not.toBeNull();
    expect(translateLink.href).toContain('/docs/intro/');
    expect(translateLink.href).toContain('translate.goog/docs/intro/?_x_tr_sl=auto&_x_tr_tl=en');

    expect(root.className).not.toMatch(/--exclusive/);
    expect(root.className).toMatch(/--welcome/);

    const title = document.querySelector('nav .navbar__brand .navbar__title');
    expect(title.getAttribute('translate')).toBe('no');
  });

  it('default object and navigation = true (en-US) - non-browser', async () => {
    Object.defineProperty(window.navigator, 'language', {
      configurable: true,
      value: 'en-US',
    });
    useIsBrowser.mockReturnValue(false);
    useLocation.mockReturnValue({ pathname: '/no-browser' });

    const root = document.getElementById('__docusaurus');
    root.className = 'docusaurus-root';

    await act(async () => renderHook(() => useWelcome()));

    const title = document.querySelector('nav .navbar__brand .navbar__title');
    expect(title.getAttribute('translate')).toBeNull();
    expect(root.className).toBe('docusaurus-root');
  });

  it('navigation = false (zh-CN)', async () => {
    Object.defineProperty(window.navigator, 'language', {
      configurable: true,
      value: 'zh-CN',
    });
    useIsBrowser.mockReturnValue(true);
    useLocation.mockReturnValue({ pathname: '/zh' });

    const root = document.getElementById('__docusaurus');
    root.className = 'docusaurus-root';

    await act(async () => renderHook(() => useWelcome({ navigation: false })));

    const translateLink = document.querySelector('nav .navbar__item.navbar__item--translate');
    expect(translateLink).not.toBeNull();
    expect(translateLink.href).toContain('translate.goog/zh/?_x_tr_sl=en&_x_tr_tl=zh-CN');

    // navigation false should add exclusive and welcome classes.
    expect(root.className).toMatch(/--exclusive/);
    expect(root.className).toMatch(/--welcome/);

    const title = document.querySelector('nav .navbar__brand .navbar__title');
    expect(title.getAttribute('translate')).toBe('no');
  });

  it('navigation = true (fr)', async () => {
    Object.defineProperty(window.navigator, 'language', {
      configurable: true,
      value: 'fr',
    });
    useIsBrowser.mockReturnValue(true);
    useLocation.mockReturnValue({ pathname: '/fr' });

    const root = document.getElementById('__docusaurus');
    root.className = 'docusaurus-root';

    await act(async () => renderHook(() => useWelcome({ navigation: true })));

    const translateLink = document.querySelector('nav .navbar__item.navbar__item--translate');
    expect(translateLink.href).toContain('translate.goog/fr/?_x_tr_sl=en&_x_tr_tl=fr');

    expect(root.className).toMatch(/--welcome/);
  });
});
