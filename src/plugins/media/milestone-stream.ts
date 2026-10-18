/*!
 * Copyright © 2015 Richard Huang <rickypc@users.noreply.github.com>
 * All rights reserved.
 */

import { Writable } from 'node:stream';

/**
 * Non-interactive progress sink. cli-progress writes its payload on every changed render even
 * without a TTY (one unreadable fragment per percent, newline-free), so a captured or piped run
 * shows garbage. This stream swallows those payloads and emits one clean milestone line per 10%
 * step, plus the final 100%. Interactive terminals keep the untouched animated bars.
 */
export class MilestoneStream extends Writable {
  private readonly finished = new Set<string>();

  private readonly lastMilestones = new Map<string, number>();

  private readonly target: NodeJS.WriteStream;

  constructor(target: NodeJS.WriteStream) {
    super();
    this.target = target;
  }

  override _write(
    chunk: unknown,
    // cli-progress writes string chunks, which arrive with the stream default encoding 'buffer'.
    _encoding: BufferEncoding,
    callback: (error?: Error | null) => void,
  ): void {
    try {
      const text = this.milestone(
        String(chunk)
          // biome-ignore lint/suspicious/noControlCharactersInRegex: strips ANSI escapes.
          .replace(/\x1B\[[0-9;]*[A-Za-z]/g, '')
          .replace(/[█░]+/g, ' ')
          .replace(/\s+/g, ' ')
          .trim(),
      );
      if (text !== null) {
        this.target.write(`${text}\n`);
      }
      callback();
    } catch (error) {
      callback(error as Error);
    }
  }

  /**
   * Decides whether a cleaned payload is a reportable milestone.
   * @param {string} text - The cleaned payload text.
   * @returns {string | null} The text to emit, or null when it should be swallowed.
   */
  private milestone(text: string): string | null {
    const percent = Number(/(\d{1,3})%/.exec(text)?.[1] ?? Number.NaN);
    if (!Number.isFinite(percent)) {
      return null;
    }
    // Each bar keeps its own milestone state, so one finishing task never swallows another task's
    // progress and a completed task reports its 100% exactly once. Milestones start at 0, so the
    // noisy first render (0%, a 0/1 single-item phase, or ETA:INF before any sample) is swallowed
    // instead of logged.
    const task = (/●\s*(.+?)\s*\(/.exec(text)?.[1] ?? '').trim();
    const last = this.lastMilestones.get(task) ?? 0;
    if (percent === 100 ? this.finished.has(task) : percent - last < 10) {
      return null;
    }
    if (percent === 100) {
      this.finished.add(task);
    }
    this.lastMilestones.set(task, percent);
    return text;
  }
}
