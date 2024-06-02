/*!
 * All the code that follow is
 * Copyright (c) 2015 - 2024 Richard Huang <rickypc@users.noreply.github.com>.
 * All Rights Reserved. Not for reuse without permission.
 */

import Admonition from '@theme/Admonition';
import Button from '@site/src/components/common/Button';
import { a11y, clsx } from '@site/src/data/common';
import { GenIcon } from 'react-icons/lib';
import {
  memo,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import PropTypes from 'prop-types';
import { useSpeech } from '@site/src/hooks/observer';
import styles from './styles.module.css';

function GrPause(props) {
  return GenIcon({ tag: 'svg', attr: { viewBox: '0 0 24 24' }, child: [{ tag: 'path', attr: { fill: 'none', strokeWidth: '2', d: 'M3,21 L9,21 L9,3 L3,3 L3,21 Z M15,21 L21,21 L21,3 L15,3 L15,21 Z' }, child: [] }] })(props);
}

function GrPlay(props) {
  return GenIcon({ tag: 'svg', attr: { viewBox: '0 0 24 24' }, child: [{ tag: 'polygon', attr: { fill: 'none', strokeWidth: '2', points: '3 22 21 12 3 2' }, child: [] }] })(props);
}

function GrResume(props) {
  return GenIcon({ tag: 'svg', attr: { viewBox: '0 0 24 24' }, child: [{ tag: 'path', attr: { fill: 'none', strokeWidth: '2', d: 'M1,20 L6,20 L6,4 L1,4 L1,20 Z M11,19.0000002 L22,12 L11,5 L11,19.0000002 Z' }, child: [] }] })(props);
}

function GrStop(props) {
  return GenIcon({
    tag: 'svg',
    attr: { viewBox: '0 0 24 24' },
    child: [{
      tag: 'rect',
      attr: {
        width: '16',
        height: '16',
        x: '4',
        y: '4',
        fill: 'none',
        strokeWidth: '2',
      },
      child: [],
    }],
  })(props);
}

export default memo(Object.assign(function Speech({
  children,
  className,
  lang = 'id-ID',
  names,
  pitch = 1,
  rate = 0.9,
  volume = 1,
}) {
  const [{ paused, playing }, setControl] = useState({ paused: false, playing: false });
  const [ready] = useSpeech();
  const synth = useRef();
  const text = typeof (children) === 'string' ? children : children?.props?.children;
  const utterance = useRef();
  const [voice, setVoice] = useState({ lang: null });

  const onPause = useCallback(() => {
    synth.current?.pause();
    setControl({ paused: true, playing: false });
  }, []);

  const onPlay = useCallback(async () => {
    if (synth.current?.speaking) {
      synth.current?.cancel();
      await new Promise((resolve) => {
        setTimeout(resolve, 250);
      });
    }
    synth.current?.speak(utterance.current);
    setControl({ paused: false, playing: true });
  }, []);

  const onResume = useCallback(() => {
    synth.current?.resume();
    setControl({ paused: false, playing: true });
  }, []);

  const onStop = useCallback(() => {
    synth.current?.cancel();
    setControl({ paused: false, playing: false });
  }, []);

  useEffect(() => {
    const list = names?.length ? names : [
      'Damayanti',
      'Microsoft Gadis Online (Natural) - Indonesian (Indonesia)',
      'Google Bahasa Indonesia',
    ];
    (async () => {
      let voices = speechSynthesis?.getVoices();
      if (!voices?.length) {
        await new Promise((resolve) => {
          speechSynthesis?.addEventListener('voiceschanged', resolve, { once: true });
        });
        voices = speechSynthesis?.getVoices();
      }
      let accent = voices.find((voi) => list.includes(voi.name));
      if (lang && typeof (accent?.lang) !== 'string') {
        // Handle browser inconsistency.
        if ((voices[0]?.lang?.split(/-_/g)?.[0]?.length || 0) > 2) {
          const lng = lang.split('-')[0];
          accent = voices.find((voi) => voi.lang?.startsWith(lng));
        } else {
          accent = voices.find((voi) => voi.lang?.replace(/_/g, '-') === lang);
        }
      }
      // Set default value.
      if (typeof (accent?.lang) !== 'string') {
        accent = { lang: false };
      }
      setVoice(accent);
    })();
    // return none.
  }, [lang, names]);

  useEffect(() => {
    if (ready) {
      (async () => {
        synth.current = speechSynthesis;
        utterance.current = new SpeechSynthesisUtterance(text);
        utterance.current.addEventListener('end', onStop);
        utterance.current.addEventListener('error', onStop);
        utterance.current.pitch = pitch;
        utterance.current.rate = rate;
        utterance.volume = document.documentElement.dataset.volume === 'silent' ? 0 : volume;
        if (typeof (voice?.lang) === 'string') {
          utterance.current.lang = voice.lang;
          utterance.current.voice = voice;
        }
      })();
    }
    return () => {
      synth.current?.cancel();
      utterance.current?.removeEventListener('end', onStop);
      utterance.current?.removeEventListener('error', onStop);
    };
  }, [onStop, pitch, rate, ready, text, voice, volume]);

  return (
    <>
      {ready && voice?.lang === false && (
        <Admonition type="info">
          <p>
            {`${new Intl.DisplayNames(['en'], { type: 'language' }).of(lang)} voice is not available in this browser. Please try different browser.`}
          </p>
        </Admonition>
      )}
      <div className={styles.controls}>
        {playing && (
          <>
            <Button
              {...a11y('Stop')}
              className={clsx(className, styles.control)}
              onClick={onStop}
              whileTap={{ scale: 0.85 }}
            >
              <GrStop />
            </Button>
            <Button
              {...a11y('Pause')}
              className={clsx(className, styles.control)}
              onClick={onPause}
              whileTap={{ scale: 0.85 }}
            >
              <GrPause />
            </Button>
          </>
        )}
        {!playing && !!text?.length && typeof (voice?.lang) === 'string' && (
          <Button
            {...a11y(paused ? 'Resume' : 'Play')}
            className={clsx(className, styles.control)}
            onClick={paused ? onResume : onPlay}
            whileTap={{ scale: 0.85 }}
          >
            {paused ? <GrResume /> : <GrPlay />}
          </Button>
        )}
      </div>
    </>
  );
}, {
  propTypes: {
    children: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.node),
      PropTypes.node,
    ]),
    className: PropTypes.string,
    lang: PropTypes.string,
    names: PropTypes.arrayOf(PropTypes.string),
    pitch: PropTypes.number,
    rate: PropTypes.number,
    volume: PropTypes.number,
  },
}));
