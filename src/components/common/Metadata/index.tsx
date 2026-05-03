/*!
 * Copyright © 2015 Richard Huang <rickypc@users.noreply.github.com>
 * All rights reserved.
 */

import {
  memo, type ReactElement, useEffect, useRef,
} from 'react';
import { usePrint, useReadingTime, useWelcome } from '@site/src/hooks/observer';
import styles from './styles.module.css';

type Props = {
  navigation?: boolean;
};

const ReadingTime = memo(function ReadingTime(): ReactElement | null {
  const [readingTime] = useReadingTime('.theme-doc-markdown');
  const minutes = Math.floor(readingTime);
  const seconds = Math.round((readingTime - minutes) * 60);
  const text = minutes
    ? `🕒 ${minutes}:${seconds.toString().padStart(2, '0')} min read`
    : `🕒 ${seconds} sec read`;
  return minutes || seconds ? (
    <span className={styles.readingTime}>{text}</span>
  ) : null;
});

export default memo(function Metadata({ navigation = false }: Props): ReactElement | null {
  const [printing] = usePrint();
  const snapshots = useRef<boolean[]>([]);
  useWelcome({ navigation });

  useEffect(() => {
    const details = Array.from(document.querySelectorAll('details'));
    if (printing) {
      snapshots.current = details.map((el) => el.open);
      details.forEach((el) => {
        // eslint-disable-next-line no-param-reassign
        el.dataset.collapsed = 'false';
        // eslint-disable-next-line no-param-reassign
        el.open = true;
        Object.assign((el.querySelector(':scope > div') as HTMLElement).style, {
          display: 'block',
          height: 'auto',
          overflow: 'visible',
        });
      });
    } else {
      details.forEach((el, index) => {
        // eslint-disable-next-line security/detect-object-injection
        if (!snapshots.current[index]) {
          // eslint-disable-next-line no-param-reassign
          el.dataset.collapsed = 'true';
          // eslint-disable-next-line no-param-reassign
          el.open = false;
          Object.assign((el.querySelector(':scope > div') as HTMLElement).style, {
            display: 'none',
            height: '0',
            overflow: 'hidden',
          });
        }
      });
      snapshots.current = [];
    }
  }, [printing]);

  return navigation ? null : (
    <small className={styles.metadata}>
      <ReadingTime />
    </small>
  );
});
