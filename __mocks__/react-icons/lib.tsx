/*!
 * All the code that follow is
 * Copyright (c) 2015 - 2025 Richard Huang <rickypc@users.noreply.github.com>.
 * All Rights Reserved. Not for reuse without permission.
 */

type GetIconConfig = {
  tag?: string;
};

// eslint-disable-next-line import/prefer-default-export
export const GenIcon = (config: GetIconConfig) => function GetIcon(props: {}) {
  return (
    <svg
      data-config={JSON.stringify(config)}
      data-props={JSON.stringify(props)}
      data-testid={`icon-${config.tag}`}
      {...props}
    />
  );
};
