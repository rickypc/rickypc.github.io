/*!
 * All the code that follow is
 * Copyright (c) 2015 - 2025 Richard Huang <rickypc@users.noreply.github.com>.
 * All Rights Reserved. Not for reuse without permission.
 */

/**
 * Generates a pdfMake object for `generic content`.
 * @param {string} path - Multilingual file path.
 * @returns {object} A pdfMake compatible object.
 */
export default async function base(path: string) {
  /* eslint-disable global-require,import/no-dynamic-require,security/detect-non-literal-require */
  const { definition = {}, options = {} } = await (require(path))();
  /* eslint-enable global-require,import/no-dynamic-require,security/detect-non-literal-require */
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
