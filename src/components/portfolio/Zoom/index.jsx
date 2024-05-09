/*!
 * All the code that follow is
 * Copyright (c) 2015 - 2024 Richard Huang <rickypc@users.noreply.github.com>.
 * All Rights Reserved. Not for reuse without permission.
 */

import { a11y, clsx } from '@site/src/data/common';
import { domMax, LazyMotion, m } from 'framer-motion';
import Image from '@site/src/components/common/Image';
import {
  memo,
  useCallback,
  useEffect,
  useRef,
} from 'react';
import PropTypes from 'prop-types';
import transition from '@site/src/data/portfolio/common';
import styles from './styles.module.css';

export default memo(Object.assign(function Zoom({ onClick, open }) {
  const opened = typeof (open?.picture) === 'object';
  const ref = useRef(null);

  const onEsc = useCallback((evt) => {
    if (evt.key === 'Escape' && opened) {
      onClick();
    }
  }, [onClick, opened]);

  useEffect(
    () => {
      document.body.classList.toggle('no-scroll', opened);
      if (opened) {
        const overlay = ref.current;
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
          {opened ? <Image {...open} /> : null}
        </m.figure>
      </LazyMotion>
    </div>
  );
}, {
  propTypes: {
    onClick: PropTypes.func.isRequired,
    open: PropTypes.shape({
      alt: PropTypes.string,
      picture: PropTypes.shape({
        avif: PropTypes.string,
        fallback: PropTypes.shape(),
        webp: PropTypes.string,
      }),
    }).isRequired,
  },
}));
