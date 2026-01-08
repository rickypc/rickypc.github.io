/*!
 * Copyright © 2015 Richard Huang <rickypc@users.noreply.github.com>
 * All rights reserved.
 */

import { clsx } from '@site/src/data/common';
import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import useIsBrowser from '@docusaurus/useIsBrowser';
import { useLocation } from '@docusaurus/router';

const docusaurus = 'docusaurus';

/**
 * Tracks media query change status using matchMedia and useState.
 * @param {string} query - CSS media query string.
 * @returns {[boolean]} React tuple: [change].
 */
export function useMedia(query: string) {
  const [change, setChange] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(query);
    setChange(media.matches);
    const onChange = (evt: MediaQueryListEvent) => setChange(evt.matches);
    media.addEventListener('change', onChange);
    return () => media.removeEventListener('change', onChange);
  }, [query]);

  return [change];
}

/**
 * Detects when the page is being printed.
 * @returns {[boolean]} React tuple: [printing].
 */
export function usePrint() {
  const [printing, setPrinting] = useState(false);

  useEffect(() => {
    const onAfterPrint = () => setPrinting(false);
    const onBeforePrint = () => setPrinting(true);
    window.addEventListener('afterprint', onAfterPrint);
    window.addEventListener('beforeprint', onBeforePrint);
    return () => {
      window.removeEventListener('afterprint', onAfterPrint);
      window.removeEventListener('beforeprint', onBeforePrint);
    };
  }, []);

  return [printing];
}

/**
 * Detects when the page is being resized.
 * @param {number} [delay] - The debounce delay (in milliseconds) after the
 *   last resize event before `resizing` is set back to false.
 * @returns {[boolean]} React tuple: [resizing].
 */
export function useResize(delay = 250) {
  const [resizing, setResizing] = useState(false);

  useEffect(() => {
    let timeout: number | undefined;

    const onResize = () => {
      setResizing(true);
      clearTimeout(timeout);
      timeout = window.setTimeout(() => setResizing(false), delay);
    };

    window.addEventListener('resize', onResize);

    return () => {
      clearTimeout(timeout);
      window.removeEventListener('resize', onResize);
    };
  }, [delay]);

  return [resizing];
}

const useSafeLayoutEffect = typeof (window) !== 'undefined' ? useLayoutEffect : useEffect;

/**
 * Detects if speech synthesis is ready during page load.
 * @returns {[boolean]} React tuple: [ready].
 */
export function useSpeech() {
  const [ready, setReady] = useState<boolean>();

  useEffect(() => {
    setReady(typeof (speechSynthesis) !== 'undefined' && typeof (SpeechSynthesisUtterance) !== 'undefined');
    // return none.
  }, []);

  return [ready];
}

/**
 * Detects if a DOM ref is visible using IntersectionObserver.
 * @param {object} [options] - Options for visibility detection.
 * @param {object} [options.ref] - React ref to observe (default: useRef()).
 * @param {number} [options.threshold] - Visibility threshold (default: 1.0).
 * @returns {{ref: object, visible: boolean}} Object with ref and visibility state.
 */
// eslint-disable-next-line react-hooks/rules-of-hooks
export function useVisibility<T>({ ref = useRef<T>(null), threshold = 1.0, ...rest } = {}) {
  // Page is active.
  const [active, setActive] = useState(true);
  // Window has focus.
  const [focused, setFocused] = useState(false);
  // Geometry is visible.
  const [visible, setVisible] = useState(false);

  const onVisibilityChange = useCallback(
    () => {
      setActive(!document.hidden);
      setVisible(document.visibilityState === 'visible');
    },
    [],
  );

  useEffect(() => {
    const { current } = ref;
    let observer: IntersectionObserver | undefined;
    if (current instanceof Element) {
      observer = new IntersectionObserver(([entry]) => {
        setVisible(entry.isIntersecting);
      }, { threshold, ...rest });
      observer.observe(current);
    }
    return () => {
      if (current instanceof Element) {
        observer?.unobserve(current);
      }
    };
  }, [ref, rest, threshold]);

  // Listen once.
  useSafeLayoutEffect(() => {
    // Initial.
    setActive(!document.hidden);
    setFocused(document.hasFocus());
    const onFocusChange = (evt: FocusEvent) => setFocused(evt.type === 'focus');
    document.addEventListener('visibilitychange', onVisibilityChange);
    window.addEventListener('blur', onFocusChange);
    window.addEventListener('focus', onFocusChange);
    return () => {
      document.removeEventListener('visibilitychange', onVisibilityChange);
      window.removeEventListener('blur', onFocusChange);
      window.removeEventListener('focus', onFocusChange);
    };
  }, []);

  return { ref, visible: active && focused && visible };
}

/**
 * Reveals page after validation to prevent automated abuse.
 * @param {object} [options] - Configuration options.
 * @param {boolean} [options.navigation] - Whether to enable navigation handling
 *   (default: true).
 */
export function useWelcome({ navigation = true } = {}) {
  const browser = useIsBrowser();
  const location = useLocation();

  useEffect(() => {
    const anchor = document.querySelector<HTMLAnchorElement>('nav .navbar__item.navbar__item--translate');
    // istanbul ignore else
    if (anchor) {
      const path = `${location.pathname}/`.replace(/\/\//g, '/');
      const target = (['mni-Mtei', 'zh-CN', 'zh-TW'].includes(navigator.language)
        ? navigator.language : navigator.language?.split?.('-')?.[0]) || 'en';
      // After target assignment.
      const source = target === 'en' ? 'auto' : 'en';
      anchor.href = `https://rickypc-github-io.translate.goog${path}?_x_tr_sl=${source}&_x_tr_tl=${target}`;
    }
    // return none.
  }, [location.pathname]);

  useEffect(() => {
    if (browser) {
      document.querySelector('nav .navbar__brand .navbar__title')?.setAttribute?.('translate', 'no');
      // istanbul ignore else
      // eslint-disable-next-line no-restricted-globals
      if (top === window) {
        const root = document.getElementById(`__${docusaurus}`);
        // istanbul ignore else
        if (root) {
          root.className = clsx(
            !navigation && `${docusaurus}--exclusive`,
            `${docusaurus}--welcome`,
          );
        }
      }
    }
    // return none.
  }, [browser, navigation]);
}
