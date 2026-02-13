/*!
 * Copyright © 2015 Richard Huang <rickypc@users.noreply.github.com>
 * All rights reserved.
 * ----------------------------------------------------------------------------
 * @jest-environment jsdom
 */

import { act, renderHook } from '@testing-library/react';
import Audio from '#root/tests/unit/helper/Audio';
import audioManager from '@site/src/lib/audioManager';
import useAudio from '@site/src/hooks/audio';

const path = '/docs/buddhism/practical-daily-practice/phrases/_arya_tara.ts';
let rafCallback: Parameters<typeof requestAnimationFrame>[0] | null = null;

(global as any).Audio = Audio;

// Mock RAF.
(global as any).cancelAnimationFrame = () => {};
(global as any).requestAnimationFrame = (cb: typeof rafCallback) => {
  rafCallback = cb;
  return 1;
};

describe('useAudio', () => {
  test('initial state is 404', async () => {
    const { result } = renderHook(() => useAudio(''));

    await act(async () => result.current.onPause());
    await act(async () => result.current.onPlay());
    await act(async () => result.current.onStop());

    expect(result.current.status).toBe('404');
  });

  test('creates audio element on mount', () => {
    audioManager.volume = 0;

    const { result } = renderHook(() => useAudio(path));

    expect(result.current.ref.current).toBeInstanceOf(Audio);
    expect(result.current.ref.current?.src).toContain('/audio/arya-tara.m4a');
    expect(result.current.ref.current?.volume).toBe(0);
    expect(result.current.status).toBe('idle');

    audioManager.volume = 1;
  });

  test('onPlay calls audioManager.play and sets status to playing', async () => {
    const { result } = renderHook(() => useAudio(path));

    result.current.ref.current!.currentTime = 1;
    await act(async () => result.current.onPlay());

    expect(audioManager.play).toHaveBeenCalledTimes(1);
    expect(result.current.status).toBe('playing');
  });

  test('onPause calls audioManager.pause and sets status to paused', async () => {
    const { result } = renderHook(() => useAudio(path));

    result.current.ref.current!.currentTime = 1;
    await act(async () => result.current.onPause());

    expect(audioManager.pause).toHaveBeenCalledTimes(1);
    expect(result.current.status).toBe('paused');
  });

  test('onStop resets time, progress, and sets status to idle', async () => {
    const { result } = renderHook(() => useAudio(path));

    result.current.ref.current!.currentTime = 5;
    await act(async () => result.current.onStop());

    expect(audioManager.pause).toHaveBeenCalledTimes(1);
    expect(result.current.ref.current?.currentTime).toBe(0);
    expect(result.current.progress.get()).toBe(0);
    expect(result.current.status).toBe('idle');
  });

  test('RAF tick updates progress MotionValue', async () => {
    const { result } = renderHook(() => useAudio(path));

    result.current.ref.current!.currentTime = 5;
    // Set status to playing to start RAF loop.
    await act(async () => result.current.onPlay());

    // Simulate RAF callback.
    act(() => rafCallback?.(100));

    expect(result.current.progress.get()).toBeCloseTo(0.5);
  });

  test('pause event sets status to paused or idle depending on currentTime', async () => {
    const { result } = renderHook(() => useAudio(path));

    const audio = result.current.ref.current!;
    audio.currentTime = 5;

    await act(async () => (audio as any).emit('pause'));
    expect(result.current.status).toBe('paused');

    audio.currentTime = 0;

    await act(async () => (audio as any).emit('pause'));
    expect(result.current.status).toBe('idle');
  });

  test('ended event resets progress and sets idle', () => {
    const { result } = renderHook(() => useAudio(path));

    const audio = result.current.ref.current!;
    audio.currentTime = 5;

    act(() => (audio as any).emit('ended'));

    expect(result.current.progress.get()).toBe(0);
    expect(result.current.status).toBe('idle');
  });

  test('error event sets idle', () => {
    const { result } = renderHook(() => useAudio(path));

    const audio = result.current.ref.current!;
    audio.currentTime = 5;

    act(() => (audio as any).emit('error'));

    expect(result.current.progress.get()).toBe(0);
    expect(result.current.status).toBe('idle');
  });
});
