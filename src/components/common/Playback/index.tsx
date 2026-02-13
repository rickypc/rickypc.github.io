/*!
 * Copyright © 2015 Richard Huang <rickypc@users.noreply.github.com>
 * All rights reserved.
 */

import { a11y, clsx } from '@site/src/data/common';
import Button from '@site/src/components/common/Button';
import { GenIcon } from 'react-icons/lib';
import { type IconBaseProps } from 'react-icons';
import useAudio from '@site/src/hooks/audio';
import { memo, type ReactElement, useState } from 'react';
import { motion, useSpring, useTransform } from 'motion/react';
import styles from './styles.module.css';

export type PlaybackProps = {
  className?: string;
  path: string;
  volume?: number;
};

/**
 * Renders the `Pause` icon.
 * @param {object} props - React props passed to the icon component.
 * @param {string} [props.className] - Optional CSS class for styling.
 * @param {object} [props.style] - Optional inline styles.
 * @param {string} [props.title] - Optional title for accessibility.
 * @returns {object} The icon.
 */
function GrPause(props: IconBaseProps): ReactElement {
  return GenIcon({
    attr: { viewBox: '0 0 24 24' },
    child: [{
      attr: {
        d: 'M3,21 L9,21 L9,3 L3,3 L3,21 Z M15,21 L21,21 L21,3 L15,3 L15,21 Z',
        fill: 'none',
        strokeWidth: '2',
      },
      child: [],
      tag: 'path',
    }],
    tag: 'svg',
  })(props);
}

/**
 * Renders the `Play` icon.
 * @param {object} props - React props passed to the icon component.
 * @param {string} [props.className] - Optional CSS class for styling.
 * @param {object} [props.style] - Optional inline styles.
 * @param {string} [props.title] - Optional title for accessibility.
 * @returns {object} The icon.
 */
function GrPlay(props: IconBaseProps): ReactElement {
  return GenIcon({
    attr: { viewBox: '0 0 24 24' },
    child: [{
      attr: {
        fill: 'none',
        points: '5 22 23 12 5 2',
        strokeWidth: '2',
      },
      child: [],
      tag: 'polygon',
    }],
    tag: 'svg',
  })(props);
}

/**
 * Renders the `Resume` icon.
 * @param {object} props - React props passed to the icon component.
 * @param {string} [props.className] - Optional CSS class for styling.
 * @param {object} [props.style] - Optional inline styles.
 * @param {string} [props.title] - Optional title for accessibility.
 * @returns {object} The icon.
 */
function GrResume(props: IconBaseProps): ReactElement {
  return GenIcon({
    attr: { viewBox: '0 0 24 24' },
    child: [{
      attr: {
        d: 'M1,20 L6,20 L6,4 L1,4 L1,20 Z M11,19.0000002 L22,12 L11,5 L11,19.0000002 Z',
        fill: 'none',
        strokeWidth: '2',
      },
      child: [],
      tag: 'path',
    }],
    tag: 'svg',
  })(props);
}

/**
 * Renders the `Stop` icon.
 * @param {object} props - React props passed to the icon component.
 * @param {string} [props.className] - Optional CSS class for styling.
 * @param {object} [props.style] - Optional inline styles.
 * @param {string} [props.title] - Optional title for accessibility.
 * @returns {object} The icon.
 */
function GrStop(props: IconBaseProps): ReactElement {
  return GenIcon({
    attr: { viewBox: '0 0 24 24' },
    child: [{
      attr: {
        fill: 'none',
        height: '16',
        strokeWidth: '2',
        width: '16',
        x: '4',
        y: '4',
      },
      child: [],
      tag: 'rect',
    }],
    tag: 'svg',
  })(props);
}

const radius = 16;
const strokeDasharray = 2 * Math.PI * radius;

export default memo(function Playback({
  className,
  path,
  volume = 1,
}: PlaybackProps): ReactElement | null {
  const {
    onPause,
    onPlay,
    onStop,
    progress,
    status,
  } = useAudio(path, volume);
  const [pressed, setPressed] = useState(false);
  const opacity = useTransform(progress, (value) => (value < 0.01 ? 0 : 1));
  const strokeDashoffset = useSpring(
    useTransform(progress, (value) => strokeDasharray - value * strokeDasharray),
    { damping: 30, mass: 0.05, stiffness: 1200 },
  );

  if (status === '404') {
    return null;
  }

  const states = {
    idle: {
      handler: onPlay,
      icon: <GrPlay />,
      label: 'Play',
      stoppable: false,
    },
    paused: {
      handler: onPlay,
      icon: <GrResume />,
      label: 'Resume',
      stoppable: true,
    },
    playing: {
      handler: onPause,
      icon: <GrPause />,
      label: 'Pause',
      stoppable: true,
    },
  };
  // eslint-disable-next-line security/detect-object-injection
  const view = states[status];

  return (
    <div className={styles.controls}>
      <motion.svg
        animate={{ scale: pressed ? 0.85 : 1 }}
        className={styles.progress}
        viewBox="0 0 36 36"
      >
        <motion.circle
          className={styles.circle}
          cx="18"
          cy="18"
          r={radius}
          strokeDasharray={strokeDasharray}
          strokeWidth="2"
          style={{ opacity, strokeDashoffset }}
        />
      </motion.svg>
      <Button
        {...a11y(view.label)}
        className={clsx(className, styles.control)}
        onClick={view.handler}
        onMouseDown={() => setPressed(true)}
        onMouseLeave={() => setPressed(false)}
        onMouseUp={() => setPressed(false)}
        whileTap={{ scale: 0.85 }}
      >
        {view.icon}
      </Button>
      {view.stoppable && (
        <Button
          {...a11y('Stop')}
          className={clsx(className, styles.control)}
          onClick={onStop}
          whileTap={{ scale: 0.85 }}
        >
          <GrStop />
        </Button>
      )}
    </div>
  );
});
