/*!
 * Copyright © 2015 Richard Huang <rickypc@users.noreply.github.com>
 * All rights reserved.
 */

import { MilestoneStream } from '@site/src/plugins/media/milestone-stream';

describe('plugins.media.MilestoneStream', () => {
  const payload = (percent: number, task = 'Make PDF') => {
    const filled = Math.round((20 * percent) / 100);
    return `\x1B[35m● ${task} ${'█'.repeat(filled)}${'░'.repeat(20 - filled)}\x1B[0m (${percent}%) \x1B[2m${percent}/100 | ETA: 12s\x1B[0m`;
  };
  const sink = (write?: () => never) => {
    const written: string[] = [];
    const target = {
      write: write ?? ((text: string) => written.push(text)),
    } as unknown as NodeJS.WriteStream;
    return { stream: new MilestoneStream(target), written };
  };

  test('emits one clean milestone line per 10% step, plus the final 100%', () => {
    const { stream, written } = sink();
    for (const percent of [0, 4, 9, 10, 12, 19, 25, 34, 100]) {
      stream.write(payload(percent));
    }

    expect(written).toEqual([
      '● Make PDF (10%) 10/100 | ETA: 12s\n',
      '● Make PDF (25%) 25/100 | ETA: 12s\n',
      '● Make PDF (100%) 100/100 | ETA: 12s\n',
    ]);
  });

  test('tracks each task label and swallows payloads without a percentage', () => {
    const { stream, written } = sink();
    stream.write(payload(12, 'Map Tracks'));
    stream.write('noise without any percent');

    expect(written).toEqual(['● Map Tracks (12%) 12/100 | ETA: 12s\n']);
  });

  test('forwards write failures through the stream error event', async () => {
    const { stream } = sink(() => {
      throw new Error('sink failed');
    });
    const failure = new Promise<Error>((resolve) => {
      stream.on('error', resolve);
    });

    stream.write(payload(10));

    expect((await failure).message).toBe('sink failed');
  });

  test('keeps per-task milestones and reports each finished task once', () => {
    const { stream, written } = sink();
    stream.write(payload(10, 'Make PDF'));
    stream.write(payload(10, 'Make Audio'));
    stream.write(payload(100, 'Make PDF'));
    stream.write(payload(50, 'Make Audio'));
    stream.write(payload(100, 'Make PDF'));
    stream.write(payload(100, 'Make Audio'));

    expect(written).toEqual([
      '● Make PDF (10%) 10/100 | ETA: 12s\n',
      '● Make Audio (10%) 10/100 | ETA: 12s\n',
      '● Make PDF (100%) 100/100 | ETA: 12s\n',
      '● Make Audio (50%) 50/100 | ETA: 12s\n',
      '● Make Audio (100%) 100/100 | ETA: 12s\n',
    ]);
  });
});
