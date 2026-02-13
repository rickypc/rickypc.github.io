/*!
 * Copyright © 2015 Richard Huang <rickypc@users.noreply.github.com>
 * All rights reserved.
 */

export default class Audio implements Partial<HTMLAudioElement> {
  currentTime = 0;

  duration = 10;

  private listeners: Record<string, Function[]> = {};

  paused = false;

  preload: HTMLAudioElement['preload'] = 'metadata';

  src = '';

  volume = 1;

  constructor(src?: string) {
    if (src) {
      this.src = src;
    }
  }

  addEventListener(event: string, listener: any) {
    // eslint-disable-next-line security/detect-object-injection
    this.listeners[event] = this.listeners[event] || [];
    // eslint-disable-next-line security/detect-object-injection
    this.listeners[event].push(listener);
  }

  emit(event: string) {
    // eslint-disable-next-line security/detect-object-injection
    (this.listeners[event] || []).forEach((fn) => fn());
  }

  pause = jest.fn(() => {
    this.paused = true;
    this.emit('pause');
  });

  play = jest.fn(async () => {
    this.paused = false;
    this.emit('timeupdate');
  });

  removeEventListener(event: string, listener: any) {
    // eslint-disable-next-line security/detect-object-injection
    this.listeners[event] = (this.listeners[event] || [])
      .filter((fn) => fn !== listener);
  }
}
