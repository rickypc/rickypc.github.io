/*!
 * Copyright © 2015 Richard Huang <rickypc@users.noreply.github.com>
 * All rights reserved.
 */

import audio from '#buddhism/media/audio/_index';
import audioManager from '@site/src/lib/audioManager';
import { fileName, key, tail } from '@site/src/data/common';
import { type MotionValue, useMotionValue } from 'motion/react';
import {
  type RefObject,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';

type AudioState = '404' | 'idle' | 'paused' | 'playing';

export type AudioResponse = {
  onPause: () => void;
  onPlay: () => void;
  onStop: () => void;
  progress: MotionValue<number>;
  ref: RefObject<HTMLAudioElement | null>;
  status: AudioState;
};

/**
 * Custom hook for managing audio playback.
 * @param {string} path - The source URL of the audio definition file.
 * @param {number} [volume] - Initial volume level (0–1).
 * @returns {AudioResponse} Audio controls and state.
 */
export default function useAudio(path: string, volume = 1): AudioResponse {
  const alias = `#${tail(path, '/buddhism')}`;
  // eslint-disable-next-line no-unused-vars
  const hasAudio = audio.some(([_, source]) => source === alias);
  const progress = useMotionValue(0);
  const ref = useRef<HTMLAudioElement | null>(null);
  const src = hasAudio ? key(fileName(path), '/audio', '/', 'm4a', '.') : '';
  const [status, setStatus] = useState<AudioState>(hasAudio ? 'idle' : '404');

  const onStateChange = useCallback((next: AudioState) => {
    if (!ref.current) {
      return;
    }
    if (next === 'idle' || ref.current.ended || !ref.current.currentTime) {
      ref.current.currentTime = 0;
      progress.set(0);
      setStatus('idle');
      return;
    }
    setStatus(next);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!ref.current && src) {
      ref.current = new Audio(src);
      ref.current.preload = 'none';
    }

    const onIdle = () => onStateChange('idle');
    const onPause = () => onStateChange('paused');

    ref.current?.addEventListener('ended', onIdle);
    ref.current?.addEventListener('error', onIdle);
    ref.current?.addEventListener('pause', onPause);

    return () => {
      ref.current?.removeEventListener('ended', onIdle);
      ref.current?.removeEventListener('error', onIdle);
      ref.current?.removeEventListener('pause', onPause);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [src]);

  useEffect(() => {
    if (!ref.current) {
      return undefined;
    }
    let last = 0;
    let raf: number;

    const tick = (now: number) => {
      const { currentTime, duration } = ref.current!;
      // ~30fps.
      // istanbul ignore else
      if (now - last > 33) {
        last = now;
        // istanbul ignore next
        progress.set(duration ? currentTime / duration : 0);
      }
      // istanbul ignore else
      if (status === 'playing' && currentTime < duration) {
        raf = requestAnimationFrame(tick);
      }
    };

    if (status === 'playing') {
      raf = requestAnimationFrame(tick);
    }

    return () => cancelAnimationFrame(raf);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status]);

  useEffect(() => {
    if (ref.current) {
      ref.current.volume = audioManager.volume ? volume : 0;
      ref.current.muted = !ref.current.volume;
    }
  }, [volume]);

  const onPause = useCallback(async () => {
    await audioManager.pause(ref.current);
    onStateChange('paused');
  }, [onStateChange]);

  const onPlay = useCallback(async () => {
    await audioManager.play(ref.current);
    onStateChange('playing');
  }, [onStateChange]);

  const onStop = useCallback(async () => {
    await audioManager.pause(ref.current);
    onStateChange('idle');
  }, [onStateChange]);

  return {
    onPause,
    onPlay,
    onStop,
    progress,
    ref,
    status,
  };
}
