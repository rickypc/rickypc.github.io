/*!
 * Copyright © 2015 Richard Huang <rickypc@users.noreply.github.com>
 * All rights reserved.
 */

import book from '#buddhism/pdf/templates/_book';
import mockImage from '#buddhism/pdf/_image';

jest.mock('#buddhism/pdf/_image', () => ({
  default: jest.fn(async () => ({ mocked: true })),
  __esModule: true,
}));

describe('docs.buddhism.pdf.templates._book', () => {
  test('builds a title page correctly', async () => {
    jest.mock('#buddhism/book-title', () => ({
      default: {
        pages: [
          {
            images: {
              left: { path: 'L', width: 10 },
              middle: { path: 'M', width: 10 },
              right: { path: 'R', width: 10 },
            },
            number: 1,
            title: 'Cover Title',
          },
        ],
        title: 'MyBook',
      },
    }), { virtual: true });

    const result = await book('#buddhism/book-title');

    expect(result.definition.content).toHaveLength(1);

    const [page] = result.definition.content[0];

    expect(page.layout).toBe('page');
    expect(page.table.body[0][0].table.body[0]).toHaveLength(3);

    expect(mockImage).toHaveBeenCalledTimes(2);

    expect(result.definition.info.title).toBe('Mybook prayer book');

    expect(result.options.tableLayouts.empty).toEqual(expect.objectContaining({
      hLineColor: expect.any(Function),
      hLineWidth: expect.any(Function),
      paddingBottom: expect.any(Function),
      paddingLeft: expect.any(Function),
      paddingRight: expect.any(Function),
      paddingTop: expect.any(Function),
      vLineColor: expect.any(Function),
      vLineWidth: expect.any(Function),
    }));
    expect(result.options.tableLayouts.page).toEqual(expect.objectContaining({
      hLineWidth: expect.any(Function),
      paddingBottom: expect.any(Function),
      paddingLeft: expect.any(Function),
      paddingRight: expect.any(Function),
      paddingTop: expect.any(Function),
      vLineWidth: expect.any(Function),
    }));

    expect(result.options.tableLayouts.empty.hLineColor()).toBe('#ffffff');
    expect(result.options.tableLayouts.empty.hLineWidth()).toBe(0.5);
    expect(result.options.tableLayouts.empty.paddingBottom()).toBe(0);
    expect(result.options.tableLayouts.empty.paddingLeft()).toBe(5);
    expect(result.options.tableLayouts.empty.paddingRight()).toBe(5);
    expect(result.options.tableLayouts.empty.paddingTop()).toBe(0);
    expect(result.options.tableLayouts.empty.vLineColor()).toBe('#ffffff');
    expect(result.options.tableLayouts.empty.vLineWidth()).toBe(0.5);

    expect(result.options.tableLayouts.page.hLineWidth()).toBe(0.5);
    expect(result.options.tableLayouts.page.paddingBottom()).toBe(0);
    expect(result.options.tableLayouts.page.paddingLeft()).toBe(5);
    expect(result.options.tableLayouts.page.paddingRight()).toBe(5);
    expect(result.options.tableLayouts.page.paddingTop()).toBe(0);
    expect(result.options.tableLayouts.page.vLineWidth()).toBe(0.5);
  });

  test('builds a content page with chapters and contents', async () => {
    jest.mock('#buddhism/book-content', () => ({
      default: {
        title: 'Chants',
        pages: [
          {
            chapters: [],
            contents: ['LeftContent', 'RightContent'],
            images: {},
          },
        ],
      },
    }), { virtual: true });

    const result = await book('#buddhism/book-content');

    const [page, canvas] = result.definition.content[0];

    expect(page.layout).toBe('page');

    // Left chapter SVG exists.
    expect(page.table.body[0][0].svg).toContain('<svg');

    // Contents placed correctly.
    expect(page.table.body[0][2]).toBe('LeftContent');
    expect(page.table.body[0][4]).toBe('RightContent');

    // Images called 3 times (left, middle, right).
    expect(mockImage).toHaveBeenCalledTimes(3);

    // Canvas for last page is empty.
    expect(canvas).toEqual({ canvas: [] });
  });

  test('creates divider canvas for non-final pages', async () => {
    jest.mock('#buddhism/book-multi', () => ({
      default: {
        title: 'Multi',
        pages: [
          {
            contents: [],
            images: {
              left: { path: 'L', width: 10 },
              middle: { path: 'M', width: 10 },
              right: { path: 'R', width: 10 },
            },
            number: 1,
          },
          {
            contents: [],
            images: {
              left: { path: 'L', width: 10 },
              middle: { path: 'M', width: 10 },
              right: { path: 'R', width: 10 },
            },
            number: 2,
          },
        ],
      },
    }), { virtual: true });

    const result = await book('#buddhism/book-multi');

    const [, canvas1] = result.definition.content[0];
    const [, canvas2] = result.definition.content[1];

    // First page gets divider lines.
    expect(canvas1.canvas).toHaveLength(2);

    // Last page gets empty canvas.
    expect(canvas2).toEqual({ canvas: [] });
  });

  test('handles empty pages array', async () => {
    jest.mock('#buddhism/book-empty', () => ({
      default: { title: 'Empty' },
    }), { virtual: true });

    const result = await book('#buddhism/book-empty');

    expect(result.definition.content).toEqual([]);
  });
});
