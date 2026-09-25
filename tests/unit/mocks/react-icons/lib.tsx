/*!
 * Copyright © 2015 Richard Huang <rickypc@users.noreply.github.com>
 * All rights reserved.
 */

import type { IconBaseProps } from 'react-icons';

type GenIconConfig = {
  tag?: string;
};

export const GenIcon = (config: GenIconConfig) =>
  function GetIcon(props: IconBaseProps) {
    return (
      <svg
        data-config={JSON.stringify(config)}
        data-props={JSON.stringify(props)}
        data-testid={`icon-${config.tag}`}
        {...props}
      />
    );
  };
