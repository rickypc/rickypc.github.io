/*!
 * Copyright © 2015 Richard Huang <rickypc@users.noreply.github.com>
 * All rights reserved.
 * ----------------------------------------------------------------------------
 * @jest-environment jsdom
 */

import Audio from '#root/tests/unit/helper/Audio';
import audioManager from '@site/src/lib/audioManager';

jest.unmock('@site/src/lib/audioManager');

(global as any).Audio = Audio;

describe('audioManager', () => {
  test('constructor respects document volume dataset (non-silent)', async () => {
    expect(audioManager.volume).toBe(1);
  });

  test('constructor respects document volume dataset (silent)', async () => {
    jest.resetModules();
    document.documentElement.dataset.volume = 'silent';
    const { default: audioMgr } = await import('@site/src/lib/audioManager');

    expect(audioMgr.volume).toBe(0);
    await expect(audioMgr.play(null)).resolves.toBeUndefined();
  });

  test('pause() does nothing when audio is null', async () => {
    await expect(audioManager.pause(null, 10)).resolves.toBeUndefined();
  });

  test('pause() fades out, pauses, and restores volume', async () => {
    const audio = new Audio();
    await audioManager.pause(audio as unknown as HTMLAudioElement);

    expect(audio!.pause).toHaveBeenCalledTimes(1);
    expect(audio!.volume).toBe(1);
  });

  test('pause() does nothing when audio is already paused', async () => {
    const audio = new Audio();
    audio?.pause();
    (audio?.pause as jest.Mock).mockClear();
    await audioManager.pause(audio as unknown as HTMLAudioElement, 10);

    expect(audio!.pause).not.toHaveBeenCalled();
  });

  test('play() calls play(), fades in, and ends at original volume', async () => {
    const audio = new Audio();
    audio?.pause();
    audio!.volume = 0.8;
    await audioManager.play(audio as unknown as HTMLAudioElement, 10);

    expect(audio!.play).toHaveBeenCalledTimes(1);
    expect(audio!.volume).toBeCloseTo(0.8);
  });

  test('play() pauses previously active audio before playing new one', async () => {
    const first = new Audio();
    const second = new Audio();
    second.pause();

    await audioManager.play(first as unknown as HTMLAudioElement);
    await audioManager.play(second as unknown as HTMLAudioElement, 5);

    expect(first.pause).toHaveBeenCalledTimes(1);
    expect(second.play).toHaveBeenCalledTimes(1);
  });
});
