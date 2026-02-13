/*!
 * Copyright © 2015 Richard Huang <rickypc@users.noreply.github.com>
 * All rights reserved.
 */

import { type PropsWithChildren, type ReactElement } from 'react';
import { type Transliteration } from '@site/src/components/common/MultiLingual';

type PlaybackProps = {
  path: string;
  transliteration: Transliteration;
};

/**
 * Minimal mock common/Playback component that renders children.
 * @param {PropsWithChildren} props
 *   The component props.
 * @returns {ReactElement}
 *   The common/Playback component.
 */
export default function Playback({
  children,
  path,
  transliteration,
  ...rest
}: PropsWithChildren<PlaybackProps>): ReactElement {
  return (
    <div
      data-path={path}
      data-testid="playback"
      data-transliteration={JSON.stringify(transliteration)}
      {...rest}
    >
      {children}
    </div>
  );
}
