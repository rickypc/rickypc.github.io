/*!
 * All the code that follow is
 * Copyright (c) 2015 - 2025 Richard Huang <rickypc@users.noreply.github.com>.
 * All Rights Reserved. Not for reuse without permission.
 */

import { a11y, clsx } from '@site/src/data/common';
import Admonition from '@theme/Admonition';
import Button from '@site/src/components/common/Button';
import { GenIcon } from 'react-icons/lib';
import { type IconBaseProps } from 'react-icons';
import {
  memo,
  type ReactElement,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import { useSpeech } from '@site/src/hooks/observer';
import styles from './styles.module.css';

export type SpeechProps = {
  children?: { props?: { children?: string } } | string;
  className?: string;
  lang?: string;
  names?: string[];
  pitch?: number;
  rate?: number;
  volume?: number;
};

/**
 * Renders the `Pause` icon.
 * @param {object} props - React props passed to the icon component.
 * @param {string} [props.className] - Optional CSS class for styling.
 * @param {object} [props.style] - Optional inline styles.
 * @param {string} [props.title] - Optional title for accessibility.
 * @returns {object} The icon.
 */
function GrPause(props: IconBaseProps): ReactElement {
  return GenIcon({ tag: 'svg', attr: { viewBox: '0 0 24 24' }, child: [{ tag: 'path', attr: { fill: 'none', strokeWidth: '2', d: 'M3,21 L9,21 L9,3 L3,3 L3,21 Z M15,21 L21,21 L21,3 L15,3 L15,21 Z' }, child: [] }] })(props);
}

/**
 * Renders the `Play` icon.
 * @param {object} props - React props passed to the icon component.
 * @param {string} [props.className] - Optional CSS class for styling.
 * @param {object} [props.style] - Optional inline styles.
 * @param {string} [props.title] - Optional title for accessibility.
 * @returns {object} The icon.
 */
function GrPlay(props: IconBaseProps): ReactElement {
  return GenIcon({ tag: 'svg', attr: { viewBox: '0 0 24 24' }, child: [{ tag: 'polygon', attr: { fill: 'none', strokeWidth: '2', points: '3 22 21 12 3 2' }, child: [] }] })(props);
}

/**
 * Renders the `Resume` icon.
 * @param {object} props - React props passed to the icon component.
 * @param {string} [props.className] - Optional CSS class for styling.
 * @param {object} [props.style] - Optional inline styles.
 * @param {string} [props.title] - Optional title for accessibility.
 * @returns {object} The icon.
 */
function GrResume(props: IconBaseProps): ReactElement {
  return GenIcon({ tag: 'svg', attr: { viewBox: '0 0 24 24' }, child: [{ tag: 'path', attr: { fill: 'none', strokeWidth: '2', d: 'M1,20 L6,20 L6,4 L1,4 L1,20 Z M11,19.0000002 L22,12 L11,5 L11,19.0000002 Z' }, child: [] }] })(props);
}

/**
 * Renders the `Stop` icon.
 * @param {object} props - React props passed to the icon component.
 * @param {string} [props.className] - Optional CSS class for styling.
 * @param {object} [props.style] - Optional inline styles.
 * @param {string} [props.title] - Optional title for accessibility.
 * @returns {object} The icon.
 */
function GrStop(props: IconBaseProps): ReactElement {
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

export default memo(function Speech({
  children,
  className,
  // See comment below.
  lang = 'id-ID',
  names,
  pitch = 1,
  rate = 0.9,
  volume = 1,
}: SpeechProps): ReactElement {
  const [hasVoice, setHasVoice] = useState<boolean | null>(null);
  const [{ paused, playing }, setControl] = useState({ paused: false, playing: false });
  const [ready] = useSpeech();
  const synth = useRef<SpeechSynthesis | null>(null);
  const text = typeof (children) === 'string' ? children : children?.props?.children;
  const utterance = useRef<SpeechSynthesisUtterance | null>(null);
  const [voice, setVoice] = useState<SpeechSynthesisVoice | null>(null);

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
    // istanbul ignore else
    if (utterance.current) {
      synth.current?.speak(utterance.current);
    }
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
    // Bahasa Indonesia was selected as the speech synthesis voice for
    // its phonetic qualities, which closely resemble the clarity and cadence
    // found in Sanskrit and Pali chants. While not a direct linguistic match,
    // its vowel-rich structure and rhythmic consistency make it well-suited
    // for voicing prayer-like utterances. Other available voices
    // were considered, but this one offered the most natural alignment
    // with the intended sound profile.
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
      let accent: SpeechSynthesisVoice | undefined;
      list.some((name) => {
        accent = voices.find((voi) => voi.name === name);
        return !!accent;
      });
      if (lang && typeof (accent?.lang) !== 'string') {
        // Handle browser inconsistency.
        if ((voices[0]?.lang?.split(/-_/g)?.[0]?.length || 0) > 2) {
          const lng = lang.split('-')[0];
          accent = voices.find((voi) => voi.lang?.startsWith(lng));
        } else {
          accent = voices.find((voi) => voi.lang?.replace(/_/g, '-') === lang);
        }
      }
      // Set the values.
      if (typeof (accent?.lang) === 'string') {
        setHasVoice(true);
        setVoice(accent);
      } else {
        setHasVoice(false);
      }
    })();
    // return none.
  }, [lang, names]);

  useEffect(() => {
    if (ready) {
      synth.current = speechSynthesis;
      utterance.current = new SpeechSynthesisUtterance(text);
      utterance.current.addEventListener('end', onStop);
      utterance.current.addEventListener('error', onStop);
      utterance.current.pitch = pitch;
      utterance.current.rate = rate;
      if (typeof (voice?.lang) === 'string') {
        utterance.current.lang = voice.lang;
        utterance.current.voice = voice;
      }
      utterance.current.volume = document.documentElement.dataset.volume === 'silent' ? 0 : volume;
    }
    return () => {
      synth.current?.cancel();
      utterance.current?.removeEventListener('end', onStop);
      utterance.current?.removeEventListener('error', onStop);
    };
  }, [onStop, pitch, rate, ready, text, voice, volume]);

  return (
    <div className={styles.controls}>
      {hasVoice === false && ready && (
        <Admonition type="info">
          <p>
            {`${new Intl.DisplayNames(['en'], { type: 'language' })
              .of(lang)} voice is not available in this browser. Please try different browser.`}
          </p>
        </Admonition>
      )}
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
      {hasVoice && !playing && !!text?.length && (
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
  );
});
