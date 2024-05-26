/*!
 * All the code that follow is
 * Copyright (c) 2015 - 2024 Richard Huang <rickypc@users.noreply.github.com>.
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

const docusaurus = 'docusaurus';

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

export function useSpeech() {
  const [ready, setReady] = useState();

  useEffect(() => {
    setReady(typeof (speechSynthesis) !== 'undefined' && typeof (SpeechSynthesisUtterance) !== 'undefined');
    // return none.
  }, []);

  return [ready];
}

// eslint-disable-next-line no-param-reassign,react-hooks/rules-of-hooks
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

export function useWelcome({ navigation = true } = {}) {
  const browser = useIsBrowser();

  useEffect(() => {
    if (browser) {
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
