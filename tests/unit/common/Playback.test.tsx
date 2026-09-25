/*!
 * Copyright © 2015 Richard Huang <rickypc@users.noreply.github.com>
 * All rights reserved.
 */

import { mock } from 'bun:test';
import Playback from '@site/src/components/common/Playback';
import useAudio, { type AudioResponse } from '@site/src/hooks/audio';
import { fireEvent, render, screen } from '@testing-library/react';
import { createRef } from 'react';

mock.module('@site/src/hooks/audio', () => ({ default: mock() }));

const mockUseAudio = useAudio as Mocked<typeof useAudio>;

describe('Playback', () => {
  const setup = (status: AudioResponse['status']) => {
    const onPause = mock();
    const onPlay = mock();
    const onStop = mock();
    const value = status === 'playing' ? 1 : 0;

    mockUseAudio.mockReturnValue({
      onPause,
      onPlay,
      onStop,
      progress: { get: () => value, set: mock() } as any,
      ref: createRef<HTMLAudioElement>(),
      status,
    });

    render(<Playback path="/path/to/audio.m4a" />);
    return { onPause, onPlay, onStop };
  };

  test('renders nothing when audio is missing', () => {
    setup('404');

    expect(screen.queryByRole('button', { name: /play/i })).not.toBeInTheDocument();
    expect(screen.queryByRole('button', { name: /stop/i })).not.toBeInTheDocument();
  });

  test('renders Play state when idle', () => {
    setup('idle');

    expect(screen.getByRole('button', { name: /play/i })).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: /stop/i })).not.toBeInTheDocument();
  });

  test('renders Resume state when paused', () => {
    setup('paused');

    expect(screen.getByRole('button', { name: /resume/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /stop/i })).toBeInTheDocument();
  });

  test('renders Pause state when playing', () => {
    setup('playing');

    expect(screen.getByRole('button', { name: /pause/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /stop/i })).toBeInTheDocument();
  });

  test('clicking Play calls onPlay', () => {
    const { onPlay } = setup('idle');

    fireEvent.click(screen.getByRole('button', { name: /play/i }));
    expect(onPlay).toHaveBeenCalledTimes(1);
  });

  test('clicking Resume calls onPlay', () => {
    const { onPlay } = setup('paused');

    fireEvent.click(screen.getByRole('button', { name: /resume/i }));
    expect(onPlay).toHaveBeenCalledTimes(1);
  });

  test('clicking Pause calls onPause', () => {
    const { onPause } = setup('playing');

    fireEvent.click(screen.getByRole('button', { name: /pause/i }));
    expect(onPause).toHaveBeenCalledTimes(1);
  });

  test('clicking Stop calls onStop', () => {
    const { onStop } = setup('playing');

    fireEvent.click(screen.getByRole('button', { name: /stop/i }));
    expect(onStop).toHaveBeenCalledTimes(1);
  });

  test('mouse press interactions toggle pressed state', () => {
    setup('idle');

    const btn = screen.getByRole('button', { name: /play/i });

    fireEvent.mouseDown(btn);
    fireEvent.mouseUp(btn);
    fireEvent.mouseLeave(btn);

    // We don't assert animation - just ensure no crash.
    expect(btn).toBeInTheDocument();
  });
});
