/*!
 * Copyright © 2015 Richard Huang <rickypc@users.noreply.github.com>
 * All rights reserved.
 */

import { mock } from 'bun:test';

export default class Audio implements Partial<HTMLAudioElement> {
  currentTime = 0;

  duration = 10;

  private listeners: Record<string, (() => void)[]> = {};

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
    (this.listeners[event] || []).forEach((fn) => {
      fn();
    });
  }

  pause = mock(() => {
    this.paused = true;
    this.emit('pause');
  });

  play = mock(async () => {
    this.paused = false;
    this.emit('timeupdate');
  });

  removeEventListener(event: string, listener: any) {
    // eslint-disable-next-line security/detect-object-injection
    this.listeners[event] = (this.listeners[event] || []).filter((fn) => fn !== listener);
  }
}
