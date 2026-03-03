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
  const hasAudio = audio.some(([/* ignore */, source]) => source === alias);
  const progress = useMotionValue(0);
  const ref = useRef<HTMLAudioElement | null>(null);
  const src = hasAudio ? key(fileName(path), '/audio', '/', 'm4a', '.') : '';
  const [status, setStatus] = useState<AudioState>(hasAudio ? 'idle' : '404');

  const onStateChange = useCallback((next: AudioState) => {
    if (!ref.current) {
      return;
    }
    if (next === 'idle' || ref.current.ended || (!['404', 'playing'].includes(next) && !ref.current.currentTime)) {
      ref.current.currentTime = 0;
      progress.set(0);
      setStatus('idle');
      return;
    }
    setStatus(next);
  }, [progress]);

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
  }, [onStateChange, src]);

  useEffect(() => {
    if (!ref.current) {
      return undefined;
    }
    const frame = { id: 0, offset: 0, time: 0 };
    const tick = (now: number) => {
      const duration = Number.isFinite(ref.current?.duration) ? ref.current?.duration : 0;
      if (duration) {
        const currentTime = ref.current?.currentTime || 0;
        if (!frame.time) {
          // Align synthetic start with real position.
          frame.offset = currentTime;
          frame.time = now;
        }
        // Seconds.
        const elapsed = (now - frame.time) / 1000;
        // Don't run ahead of currentTime.
        const time = Math.max(0, Math.min(frame.offset + elapsed, currentTime, duration));
        progress.set(time / duration);
      } else {
        progress.set(0);
      }
      // istanbul ignore else
      if (status === 'playing') {
        frame.id = requestAnimationFrame(tick);
      }
    };
    if (status === 'playing') {
      frame.id = requestAnimationFrame(tick);
    }
    return () => cancelAnimationFrame(frame.id);
  }, [status, progress]);

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
    let next: AudioState = 'playing';
    await audioManager.play(ref.current).catch((ex) => {
      next = ex.name === 'NotSupportedError' ? '404' : 'idle';
    });
    onStateChange(next);
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
