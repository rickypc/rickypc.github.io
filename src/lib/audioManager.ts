/*!
 * Copyright © 2015 Richard Huang <rickypc@users.noreply.github.com>
 * All rights reserved.
 */

export type MaybeAudio = HTMLAudioElement | null;

class AudioManager {
  private active: MaybeAudio;

  volume: number;

  constructor() {
    this.active = null;
    this.volume = typeof (document) !== 'undefined' && document.documentElement.dataset.volume === 'silent' ? 0 : 1;
  }

  /**
   * Gradually increases an audio volume from its current level up to the
   * original volume.
   * @param {HTMLAudioElement} audio - The audio element whose volume will be
   *   faded in.
   * @param {number} volume - The final volume level to reach at the end of the
   *   fade.
   * @param {number} duration - Number of incremental steps used to reach
   *   the original volume.
   * @returns {Promise<void>} A promise that resolves once the fade‑in
   *   completes.
   */
  private static fadeIn(audio: HTMLAudioElement, volume: number, duration: number): Promise<void> {
    const step = volume / duration;
    return new Promise<void>((resolve) => {
      const id = setInterval(() => {
        // eslint-disable-next-line no-param-reassign
        audio.volume = Math.min(volume, audio.volume + step);
        if (audio.volume >= volume) {
          clearInterval(id);
          // eslint-disable-next-line no-param-reassign
          audio.volume = volume;
          resolve();
        }
      }, 1);
    });
  }

  /**
   * Gradually reduces the audio volume to zero over a specified duration.
   * @param {HTMLAudioElement} audio - The audio element whose volume will be
   *   faded out.
   * @param {number} volume - The starting volume before fading begins.
   * @param {number} duration - Number of steps used to fade out the volume.
   * @returns {Promise<void>} Resolves when the fade-out process completes.
   */
  private static fadeOut(audio: HTMLAudioElement, volume: number, duration: number): Promise<void> {
    const step = volume / duration;
    return new Promise<void>((resolve) => {
      const id = setInterval(() => {
        // eslint-disable-next-line no-param-reassign
        audio.volume = Math.max(0, audio.volume - step);
        if (audio.volume <= 0) {
          clearInterval(id);
          resolve();
        }
      }, 1);
    });
  }

  /**
   * Fades out the audio volume, pauses playback, and restores the original
   * volume. Ensures a smooth pause without producing click or pop artifacts.
   * @param {MaybeAudio} audio - The audio element to pause, or
   *   null/undefined.
   * @param {number} [duration] - Number of steps used to fade out the volume.
   * @returns {Promise<void>} Resolves once fading and pausing are complete.
   */
  // eslint-disable-next-line class-methods-use-this
  async pause(audio: MaybeAudio, duration = 30) {
    if (!audio || audio.paused) {
      return;
    }
    const { volume } = audio;
    await AudioManager.fadeOut(audio, volume, duration);
    audio.pause();
    // eslint-disable-next-line no-param-reassign
    audio.volume = volume;
  }

  /**
   * Plays an audio with a smooth fade‑in. If another audio element is
   * currently active, it is faded out and paused first. The method sets the
   * active audio, starts playback at zero volume, and fades it up to its
   * original volume.
   * @param {MaybeAudio} audio - The audio element to play, or
   *   null/undefined.
   * @param {number} [duration] - Number of incremental steps used to fade in
   *   the volume.
   * @returns {Promise<void>} A promise that resolves once playback and fade‑in
   *   are complete.
   */
  async play(audio: MaybeAudio, duration = 30) {
    if (!audio) {
      return;
    }
    if (this.active && this.active !== audio) {
      await this.pause(this.active, duration);
    }
    this.active = audio;
    const { volume } = this.active;
    this.active.volume = 0;
    await this.active.play();
    await AudioManager.fadeIn(this.active, volume, duration);
  }
}

export default new AudioManager();
