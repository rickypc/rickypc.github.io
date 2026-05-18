/*!
 * Copyright © 2015 Richard Huang <rickypc@users.noreply.github.com>
 * All rights reserved.
 */

/**
 * Generates a pdfMake object for `generic content`.
 * @param {string} path - Multilingual file path.
 * @returns {object} A pdfMake compatible object.
 */
export default async function base(path: string) {
  const { definition = {}, options = {} } = await (await import(path)).default();
  return {
    definition: {
      defaultStyle: { font: 'NotoSans', fontSize: 10 },
      pageMargins: [7.5, 7.5, 7.5, 7.5],
      pageSize: 'LETTER',
      // Overrides.
      ...definition,
      info: {
        ...(definition.info || {}),
        keywords: definition.info?.keywords,
      },
    },
    options,
  };
}
