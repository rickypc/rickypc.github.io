/*!
 * All the code that follow is
 * Copyright (c) 2015 - 2025 Richard Huang <rickypc@users.noreply.github.com>.
 * All Rights Reserved. Not for reuse without permission.
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
export function useMedia(query) {
  const [change, setChange] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(query);
    const onChange = (evt) => setChange(evt.matches);
    onChange(media);
    media.addEventListener('change', onChange);
    return () => media.removeEventListener('change', onChange);
  }, [query]);

  return [change];
}

/**
 * Detects if page is ready for printing during initial load.
 * @returns {[boolean]} React tuple: [ready].
 */
export function usePrint() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const print = {
      once: false,
      scroll: {
        back: false,
        bottom: false,
        top: window.scrollY === 0,
      },
      scrollbar: 20,
      scrollHeight: document.body.scrollHeight,
    };

    const onBeforePrint = async (evt) => {
      if (print.once) {
        return;
      }
      print.once = true;
      const { clientHeight } = document.documentElement;
      // Y could be in the middle of the page.
      const { scrollY } = window;
      // Scroll all the way up.
      if (scrollY !== 0 && !print.scroll.top) {
        print.scroll.back = true;
        evt.target.scrollTo(0, 0);
      }
      // Scroll all the way down.
      if (clientHeight !== print.scrollHeight && !print.scroll.bottom) {
        if (print.scroll.back) {
          await new Promise((resolve) => {
            setTimeout(resolve, 500);
          });
        }
        print.scroll.back = true;
        evt.target.scrollTo(0, print.scrollHeight);
      }
      // Scroll back to where it was.
      if (print.scroll.back) {
        await new Promise((resolve) => {
          setTimeout(resolve, 500);
        });
        evt.target.scrollTo(0, scrollY);
      }
      setReady(true);
    };

    const onScroll = () => {
      if (print.scroll.bottom && print.scroll.top) {
        setReady((previous) => (!previous ? true : previous));
      } else {
        const { clientHeight } = document.documentElement;
        const { scrollY } = window;
        if (print.scrollHeight - clientHeight - print.scrollbar < scrollY) {
          print.scroll.bottom = true;
        }
        if (scrollY < print.scrollbar) {
          print.scroll.top = true;
        }
      }
    };

    window.addEventListener('beforeprint', onBeforePrint);
    window.addEventListener('scroll', onScroll);
    return () => {
      window.removeEventListener('beforeprint', onBeforePrint);
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  return [ready];
}

const useSafeLayoutEffect = typeof (window) !== 'undefined' ? useLayoutEffect : useEffect;

/**
 * Detects if speech synthesis is ready during page load.
 * @returns {[boolean]} React tuple: [ready].
 */
export function useSpeech() {
  const [ready, setReady] = useState();

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
export function useVisibility({ ref = useRef(), threshold = 1.0, ...rest } = {}) {
  const [visible, setVisible] = useState(false);

  const onVisibilityChange = useCallback(
    () => setVisible(document.visibilityState === 'visible'),
    [],
  );

  useEffect(() => {
    const { current } = ref;
    let observer;
    if (current) {
      observer = new IntersectionObserver(([entry]) => {
        setVisible(entry.isIntersecting);
      }, { threshold, ...rest });
      observer.observe(current);
    }
    return () => observer?.unobserve(current);
  }, [ref, rest, threshold]);

  // Listen once.
  useSafeLayoutEffect(() => {
    document.addEventListener('visibilitychange', onVisibilityChange);
    return () => document.removeEventListener('visibilitychange', onVisibilityChange);
  }, []);

  return { ref, visible };
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
    const path = `${location.pathname}/`.replace(/\/\//g, '/');
    const target = (['mni-Mtei', 'zh-CN', 'zh-TW'].includes(navigator.language) ? navigator.language : navigator.language?.split?.('-')?.[0]) || 'en';
    // After target assignment.
    const source = target === 'en' ? 'auto' : 'en';
    document.querySelector('nav .navbar__item.navbar__item--translate')
      .href = `https://ricky-one.translate.goog${path}?_x_tr_sl=${source}&_x_tr_tl=${target}`;
    // return none.
  }, [location.pathname]);

  useEffect(() => {
    if (browser) {
      document.querySelector('nav .navbar__brand .navbar__title')?.setAttribute?.('translate', 'no');
      // istanbul ignore else
      // eslint-disable-next-line no-restricted-globals
      if (top === window) {
        document.getElementById(`__${docusaurus}`).className = clsx(
          !navigation && `${docusaurus}--exclusive`,
          `${docusaurus}--welcome`,
        );
      }
    }
    // return none.
  }, [browser, navigation]);
}
