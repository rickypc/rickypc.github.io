/*!
 * Copyright © 2015 Richard Huang <rickypc@users.noreply.github.com>
 * All rights reserved.
 */

import { memo, useEffect, useRef } from 'react';
import { usePrint, useWelcome } from '@site/src/hooks/observer';
import './styles.module.css';

export type WelcomeProps = {
  navigation?: boolean;
};

export default memo(function Welcome({ navigation = false }: WelcomeProps): null {
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

  return null;
});
