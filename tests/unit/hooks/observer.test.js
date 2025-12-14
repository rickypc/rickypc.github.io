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
    rerender({ q: q2 });

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
  it('should return false initially', () => {
    const { result } = renderHook(() => usePrint());
    expect(result.current[0]).toBeFalsy();
  });

  it('should set printing to false on afterprint event', () => {
    const { result } = renderHook(() => usePrint());

    // First simulate beforeprint.
    act(() => window.dispatchEvent(new Event('beforeprint')));
    expect(result.current[0]).toBeTruthy();

    // Then simulate afterprint.
    act(() => window.dispatchEvent(new Event('afterprint')));
    expect(result.current[0]).toBeFalsy();
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
    const options = { rootMargin: '10px', threshold: 0.25 };
    const span = document.createElement('span');
    // After span assignment.
    const ref = { current: span };
    const removeSpy = jest.spyOn(document, 'removeEventListener');

    const { result, unmount } = renderHook(() => useVisibility({ ref, ...options }));

    // Observer constructed with the same options we passed.
    expect(global.IntersectionObserver).toHaveBeenCalledWith(expect.any(Function), options);

    // And it starts observing our element.
    expect(observeMock).toHaveBeenCalledWith(span);
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
    expect(unobserveMock).toHaveBeenCalledWith(span);
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

  it('default object and navigation = true (undefined)', () => {
    Object.defineProperty(window.navigator, 'language', {
      configurable: true,
      value: undefined,
    });
    useIsBrowser.mockReturnValue(true);
    useLocation.mockReturnValue({ pathname: '/missing' });

    // eslint-disable-next-line testing-library/no-node-access
    let root = document.getElementById('__docusaurus');
    root.className = 'docusaurus-root';

    renderHook(() => useWelcome());

    // eslint-disable-next-line testing-library/no-node-access
    let translateLink = document.querySelector('nav .navbar__item.navbar__item--translate');
    expect(translateLink.href).toContain('https://rickypc-github-io.translate.goog/missing/?_x_tr_sl=auto&_x_tr_tl=en');

    // Empty-string case.
    Object.defineProperty(window.navigator, 'language', {
      configurable: true,
      value: '',
    });
    useLocation.mockReturnValue({ pathname: '/missing-empty' });

    // eslint-disable-next-line testing-library/no-node-access
    root = document.getElementById('__docusaurus');
    root.className = 'docusaurus-root';

    renderHook(() => useWelcome());

    // eslint-disable-next-line testing-library/no-node-access
    translateLink = document.querySelector('nav .navbar__item.navbar__item--translate');
    expect(translateLink.href).toContain('https://rickypc-github-io.translate.goog/missing-empty/?_x_tr_sl=auto&_x_tr_tl=en');
  });

  it('default object and navigation = true (en-US)', () => {
    Object.defineProperty(window.navigator, 'language', {
      configurable: true,
      value: 'en-US',
    });
    useIsBrowser.mockReturnValue(true);
    useLocation.mockReturnValue({ pathname: '/docs/intro' });

    // eslint-disable-next-line testing-library/no-node-access
    const root = document.getElementById('__docusaurus');
    root.className = 'docusaurus-root';

    renderHook(() => useWelcome());

    // eslint-disable-next-line testing-library/no-node-access
    const translateLink = document.querySelector('nav .navbar__item.navbar__item--translate');
    expect(translateLink).not.toBeNull();
    expect(translateLink.href).toContain('/docs/intro/');
    expect(translateLink.href).toContain('https://rickypc-github-io.translate.goog/docs/intro/?_x_tr_sl=auto&_x_tr_tl=en');

    expect(root.className).not.toMatch(/--exclusive/);
    expect(root.className).toMatch(/--welcome/);

    // eslint-disable-next-line testing-library/no-node-access
    const title = document.querySelector('nav .navbar__brand .navbar__title');
    expect(title.getAttribute('translate')).toBe('no');
  });

  it('default object and navigation = true (en-US) - non-browser', () => {
    Object.defineProperty(window.navigator, 'language', {
      configurable: true,
      value: 'en-US',
    });
    useIsBrowser.mockReturnValue(false);
    useLocation.mockReturnValue({ pathname: '/no-browser' });

    // eslint-disable-next-line testing-library/no-node-access
    const root = document.getElementById('__docusaurus');
    root.className = 'docusaurus-root';

    renderHook(() => useWelcome());

    // eslint-disable-next-line testing-library/no-node-access
    const title = document.querySelector('nav .navbar__brand .navbar__title');
    expect(title.getAttribute('translate')).toBeNull();
    expect(root.className).toBe('docusaurus-root');
  });

  it('navigation = false (zh-CN)', () => {
    Object.defineProperty(window.navigator, 'language', {
      configurable: true,
      value: 'zh-CN',
    });
    useIsBrowser.mockReturnValue(true);
    useLocation.mockReturnValue({ pathname: '/zh' });

    // eslint-disable-next-line testing-library/no-node-access
    const root = document.getElementById('__docusaurus');
    root.className = 'docusaurus-root';

    renderHook(() => useWelcome({ navigation: false }));

    // eslint-disable-next-line testing-library/no-node-access
    const translateLink = document.querySelector('nav .navbar__item.navbar__item--translate');
    expect(translateLink).not.toBeNull();
    expect(translateLink.href).toContain('https://rickypc-github-io.translate.goog/zh/?_x_tr_sl=en&_x_tr_tl=zh-CN');

    // Navigation false should add exclusive and welcome classes.
    expect(root.className).toMatch(/--exclusive/);
    expect(root.className).toMatch(/--welcome/);

    // eslint-disable-next-line testing-library/no-node-access
    const title = document.querySelector('nav .navbar__brand .navbar__title');
    expect(title.getAttribute('translate')).toBe('no');
  });

  it('navigation = true (fr)', () => {
    Object.defineProperty(window.navigator, 'language', {
      configurable: true,
      value: 'fr',
    });
    useIsBrowser.mockReturnValue(true);
    useLocation.mockReturnValue({ pathname: '/fr' });

    // eslint-disable-next-line testing-library/no-node-access
    const root = document.getElementById('__docusaurus');
    root.className = 'docusaurus-root';

    renderHook(() => useWelcome({ navigation: true }));

    // eslint-disable-next-line testing-library/no-node-access
    const translateLink = document.querySelector('nav .navbar__item.navbar__item--translate');
    expect(translateLink.href).toContain('https://rickypc-github-io.translate.goog/fr/?_x_tr_sl=en&_x_tr_tl=fr');

    expect(root.className).toMatch(/--welcome/);
  });
});
