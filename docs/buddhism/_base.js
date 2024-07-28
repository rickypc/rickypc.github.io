/*!
 * All the code that follow is
 * Copyright (c) 2015 - 2024 Richard Huang <rickypc@users.noreply.github.com>.
 * All Rights Reserved. Not for reuse without permission.
 */

export default async function base(path) {
  // eslint-disable-next-line global-require,import/no-dynamic-require
  const { definition = {}, options = {} } = await (require(path))();
  return {
    definition: {
      defaultStyle: { font: 'NotoSans', fontSize: 10 },
      pageMargins: [7.5, 7.5, 7.5, 7.5],
      pageSize: 'LETTER',
      // Overrides.
      ...definition,
      info: {
        ...(definition.info || {}),
        keywords: definition.info?.keywords?.join?.(';'),
      },
    },
    options,
  };
}
