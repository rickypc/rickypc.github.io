/*!
 * All the code that follow is
 * Copyright (c) 2015 - 2025 Richard Huang <rickypc@users.noreply.github.com>.
 * All Rights Reserved. Not for reuse without permission.
 */

import { a11y, clsx } from '@site/src/data/common';
import { domMax, LazyMotion, m } from 'framer-motion';
import Image, { type ImageProps } from '@site/src/components/common/Image';
import {
  memo,
  type ReactElement,
  useCallback,
  useEffect,
  useRef,
} from 'react';
import transition from '@site/src/data/portfolio/common';
import styles from './styles.module.css';

export type ZoomProps = {
  onClick: () => void;
  open: ImageProps;
};

export default memo(function Zoom({ onClick, open }: ZoomProps): ReactElement {
  const opened = typeof (open?.picture) === 'object';
  const ref = useRef<HTMLElement | null>(null);

  const onEsc = useCallback((evt: KeyboardEvent) => {
    if (evt.key === 'Escape' && opened) {
      onClick();
    }
  }, [onClick, opened]);

  useEffect(
    () => {
      document.body.classList.toggle('no-scroll', opened);
      if (opened) {
        const overlay = ref.current;
        // istanbul ignore else
        if (overlay) {
          overlay.scrollTop = 0;
          overlay.focus();
        }
      }
      // return none.
    },
    [opened, ref],
  );

  useEffect(() => {
    document.addEventListener('keyup', onEsc, false);
    return () => document.removeEventListener('keyup', onEsc, false);
  }, [onEsc]);

  return (
    <div className={clsx(styles.lens, opened && styles.zoomed)}>
      <LazyMotion features={domMax}>
        <m.div
          animate={{ opacity: opened ? 1 : 0 }}
          className={styles.overlay}
          onClick={onClick}
          transition={transition}
        />
        <m.figure
          {...a11y(open.alt)}
          layout
          onClick={onClick}
          ref={ref}
          transition={transition}
        >
          {opened && <Image {...open} />}
        </m.figure>
      </LazyMotion>
    </div>
  );
});
