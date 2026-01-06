/*!
 * Copyright © 2015 Richard Huang <rickypc@users.noreply.github.com>
 * All rights reserved.
 */

import { AnimatePresence, motion } from 'motion/react';
import Button from '@site/src/components/common/Button';
import { hats } from '@site/src/data/home';
import { GenIcon } from 'react-icons/lib';
import Heading from '@theme/Heading';
import { type IconBaseProps } from 'react-icons';
import { clsx, key } from '@site/src/data/common';
import {
  memo,
  type PropsWithChildren,
  type ReactElement,
  type ReactNode,
  useState,
} from 'react';
import { usePrint } from '@site/src/hooks/observer';
import styles from './styles.module.css';

type DetailsProps = HatProps['details'];

export type HatProps = {
  description: ReactNode;
  details: {
    content: ReactNode;
    title: string;
  };
  label: string;
};

/**
 * Renders the `Plus` icon.
 * @param {object} props - React props passed to the icon component.
 * @param {string} [props.className] - Optional CSS class for styling.
 * @param {object} [props.style] - Optional inline styles.
 * @param {string} [props.title] - Optional title for accessibility.
 * @returns {object} The icon.
 */
function FaPlus(props: IconBaseProps): ReactElement {
  return GenIcon({ tag: 'svg', attr: { viewBox: '0 0 448 512' }, child: [{ tag: 'path', attr: { d: 'M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 144L48 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l144 0 0 144c0 17.7 14.3 32 32 32s32-14.3 32-32l0-144 144 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-144 0 0-144z' }, child: [] }] })(props);
}

const Details = memo(function Details({ content, title }: DetailsProps) {
  const [active, setActive] = useState(false);
  const animate = { height: 'auto', opacity: 1 };
  const exit = { height: 0, opacity: 0 };
  const onClick = () => setActive((previous) => !previous);
  const [printing] = usePrint();
  return (
    <motion.div className={styles.details} onClick={onClick}>
      <Button className={styles.toggle}>
        <FaPlus className={clsx(active && styles.active, styles.icon)} />
        {title}
      </Button>
      <AnimatePresence mode="sync">
        {(active || printing) && (
          <motion.div
            animate={animate}
            className={styles.wrapper}
            exit={exit}
            initial={printing ? animate : exit}
            transition={{ delay: 0.135, duration: 0.3, ease: 'easeInOut' }}
          >
            <span className={styles.content}>
              {content}
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
});

const Hat = memo(function Hat({
  children,
  description,
  details,
  label,
}: PropsWithChildren<HatProps>): ReactElement {
  return (
    <article aria-label={label} className={styles.hat}>
      <Heading as="h2">
        <span className={styles.reader}>
          {label}
          &nbsp;
        </span>
        {children}
      </Heading>
      <p>{description}</p>
      <Details {...details} />
    </article>
  );
});

export default memo(function Hats() {
  return (
    <div className={styles.hats}>
      {hats.map((hat: PropsWithChildren<HatProps>) => <Hat {...hat} key={key(hat.label, 'hat')} />)}
    </div>
  );
});
