/*!
 * Copyright © 2015 Richard Huang <rickypc@users.noreply.github.com>
 * All rights reserved.
 */

import mockImage from '#buddhism/media/pdf/_image';
import book from '#buddhism/media/pdf/templates/_book';

jest.mock('#buddhism/media/pdf/_image', () => ({
  __esModule: true,
  default: jest.fn(async () => ({ mocked: true })),
}));

describe('docs.buddhism.media.pdf.templates._book: non-empty', () => {
  const images = {
    left: { path: 'L', width: 10 },
    middle: { path: 'M', width: 10 },
    right: { path: 'R', width: 10 },
  };
  test('builds a title page correctly', async () => {
    jest.mock(
      '#buddhism/book-title',
      () => ({
        __esModule: true,
        default: { pages: [{ images, number: 1, title: 'Cover Title' }], title: 'MyBook' },
      }),
      { virtual: true },
    );
    const result = await book('#buddhism/book-title');
    expect(result.definition.content).toHaveLength(1);
    const [page] = result.definition.content[0];

    expect(page.layout).toStrictEqual({
      hLineWidth: expect.any(Function),
      paddingBottom: expect.any(Function),
      paddingLeft: expect.any(Function),
      paddingRight: expect.any(Function),
      paddingTop: expect.any(Function),
      vLineWidth: expect.any(Function),
    });
    expect(page.table.body[0][0].table.body[0]).toHaveLength(3);
    expect(mockImage).toHaveBeenCalledTimes(2);
    expect(result.definition.info.title).toBe('Mybook prayer book');

    expect(page.layout.hLineWidth()).toBe(0.5);
    expect(page.layout.paddingBottom()).toBe(0);
    expect(page.layout.paddingLeft()).toBe(5);
    expect(page.layout.paddingRight()).toBe(5);
    expect(page.layout.paddingTop()).toBe(0);
    expect(page.layout.vLineWidth()).toBe(0.5);
  });

  test('builds a content page with chapters and contents', async () => {
    jest.mock(
      '#buddhism/book-content',
      () => ({
        __esModule: true,
        default: {
          pages: [{ chapters: [], contents: ['LeftContent', 'RightContent'], images: {} }],
          title: 'Chants',
        },
      }),
      { virtual: true },
    );
    const result = await book('#buddhism/book-content');
    const [page, canvas] = result.definition.content[0];

    expect(page.layout).toStrictEqual({
      hLineWidth: expect.any(Function),
      paddingBottom: expect.any(Function),
      paddingLeft: expect.any(Function),
      paddingRight: expect.any(Function),
      paddingTop: expect.any(Function),
      vLineWidth: expect.any(Function),
    });
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
    jest.mock(
      '#buddhism/book-multi',
      () => ({
        __esModule: true,
        default: {
          pages: [
            { contents: [1], images, number: 1 },
            { contents: [], images, number: 2 },
          ],
          title: 'Multi',
        },
      }),
      { virtual: true },
    );
    const result = await book('#buddhism/book-multi');
    const [, canvas1] = result.definition.content[0];
    const [, canvas2] = result.definition.content[1];

    // First page gets divider lines.
    expect(canvas1.canvas).toHaveLength(2);
    // Last page gets empty canvas.
    expect(canvas2).toEqual({ canvas: [] });
  });
});

describe('docs.buddhism.media.pdf.templates._book: empty', () => {
  test('handles empty pages array', async () => {
    jest.mock(
      '#buddhism/book-empty-pages',
      () => ({ __esModule: true, default: { title: 'Empty' } }),
      { virtual: true },
    );
    const result = await book('#buddhism/book-empty-pages');

    expect(result.definition.content).toEqual([]);
  });

  test('handles empty page object', async () => {
    jest.mock('#buddhism/book-empty-page', () => ({ __esModule: true, default: { pages: [{}] } }), {
      virtual: true,
    });
    const result = await book('#buddhism/book-empty-page');

    expect(result.definition.content).toEqual([
      [
        {
          layout: {
            hLineColor: expect.any(Function),
            hLineWidth: expect.any(Function),
            paddingBottom: expect.any(Function),
            paddingLeft: expect.any(Function),
            paddingRight: expect.any(Function),
            paddingTop: expect.any(Function),
            vLineColor: expect.any(Function),
            vLineWidth: expect.any(Function),
          },
          margin: [0, 0, 0, 0],
          table: {
            body: [[' ', { mocked: true }, { mocked: true }, { mocked: true }]],
            dontBreakRows: true,
            heights: [188],
            widths: ['100%'],
          },
        },
        { canvas: [] },
      ],
    ]);

    expect(result.definition.content[0][0].layout.hLineColor()).toBe('#ffffff');
    expect(result.definition.content[0][0].layout.hLineWidth()).toBe(0.5);
    expect(result.definition.content[0][0].layout.paddingBottom()).toBe(0);
    expect(result.definition.content[0][0].layout.paddingLeft()).toBe(5);
    expect(result.definition.content[0][0].layout.paddingRight()).toBe(5);
    expect(result.definition.content[0][0].layout.paddingTop()).toBe(0);
    expect(result.definition.content[0][0].layout.vLineColor()).toBe('#ffffff');
    expect(result.definition.content[0][0].layout.vLineWidth()).toBe(0.5);
  });
});
