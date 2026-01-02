/*!
 * Copyright © 2015 Richard Huang <rickypc@users.noreply.github.com>
 * All rights reserved.
 */

type GenIconConfig = {
  tag?: string;
};

// eslint-disable-next-line import/prefer-default-export
export const GenIcon = (config: GenIconConfig) => function GetIcon(props: {}) {
  return (
    <svg
      data-config={JSON.stringify(config)}
      data-props={JSON.stringify(props)}
      data-testid={`icon-${config.tag}`}
      {...props}
    />
  );
};
