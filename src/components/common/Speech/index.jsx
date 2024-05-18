/*!
 * All the code that follow is
 * Copyright (c) 2015 - 2024 Richard Huang <rickypc@users.noreply.github.com>.
 * All Rights Reserved. Not for reuse without permission.
 */

import Button from '@site/src/components/common/Button';
import { clsx } from '@site/src/data/common';
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

const Repetition = memo(function Repetition({ value = 1 }) {
  if (value < 2) {
    return null;
  }
  return <span className="badge badge--primary" title={`Preferred repetition: ${value} times`}>{`${value}x`}</span>;
});
Repetition.propTypes = {
  value: PropTypes.number,
};

export default memo(Object.assign(function Speech({
  children,
  className,
  lang = 'id-ID',
  name = 'Damayanti',
  pitch = 1,
  rate = 1,
  repetition = 1,
  volume = 1,
}) {
  const [paused, setPaused] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [ready] = useSpeech();
  const synth = useRef();
  const utterance = useRef();

  const onPause = useCallback(() => {
    synth.current?.pause();
    setPaused(true);
    setPlaying(false);
  }, []);

  const onPlay = useCallback(async () => {
    if (synth.current?.speaking) {
      synth.current?.cancel();
      await new Promise((resolve) => {
        setTimeout(resolve, 250);
      });
    }
    synth.current?.speak(utterance.current);
    setPaused(false);
    setPlaying(true);
  }, []);

  const onResume = useCallback(() => {
    synth.current?.resume();
    setPaused(false);
    setPlaying(true);
  }, []);

  const onStop = useCallback(() => {
    synth.current?.cancel();
    setPaused(false);
    setPlaying(false);
  }, []);

  useEffect(() => {
    if (ready) {
      synth.current = speechSynthesis;
      const text = typeof (children) === 'string'
        ? children : children.props.children;
      utterance.current = new SpeechSynthesisUtterance(text);
      utterance.current.onend = onStop;
      utterance.current.onerror = onStop;
      utterance.current.pitch = pitch;
      utterance.current.rate = rate;
      const voices = synth.current.getVoices();
      utterance.current.voice = voices.find((voice) => voice.name === name)
        || voices.find((voice) => voice.lang === lang)
        || voices.find((voice) => voice.default)
        || voices[0];
      utterance.volume = volume;
    }
    return () => synth.current?.cancel();
  }, [children, lang, name, onStop, pitch, rate, ready, volume]);

  if (!ready) {
    return (
      <div className={styles.controls}>
        <Repetition value={repetition} />
      </div>
    );
  }

  if (playing) {
    return (
      <div className={styles.controls}>
        <Repetition value={repetition} />
        <Button
          aria-label="Stop"
          className={clsx(className, styles.control)}
          onClick={onStop}
          whileTap={{ scale: 0.85 }}
        >
          <GrStop />
        </Button>
        <Button
          aria-label="Pause"
          className={clsx(className, styles.control)}
          onClick={onPause}
          whileTap={{ scale: 0.85 }}
        >
          <GrPause />
        </Button>
      </div>
    );
  }

  return (
    <div className={styles.controls}>
      <Repetition value={repetition} />
      <Button
        aria-label={paused ? 'Resume' : 'Play'}
        className={clsx(className, styles.control)}
        onClick={paused ? onResume : onPlay}
        whileTap={{ scale: 0.85 }}
      >
        {paused ? <GrResume /> : <GrPlay />}
      </Button>
    </div>
  );
}, {
  propTypes: {
    children: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.node),
      PropTypes.node,
    ]).isRequired,
    className: PropTypes.string,
    lang: PropTypes.string,
    name: PropTypes.string,
    pitch: PropTypes.number,
    rate: PropTypes.number,
    repetition: PropTypes.number,
    volume: PropTypes.number,
  },
}));
