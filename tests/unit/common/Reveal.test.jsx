/*!
 * Copyright (c) 2015 - 2025 Richard Huang <rickypc@users.noreply.github.com>.
 * All Rights Reserved. Not for reuse without permission.
 * ----------------------------------------------------------------------------
 * @jest-environment jsdom
 */

import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import Reveal from '@site/src/components/common/Reveal';
import { useVisibility } from '@site/src/hooks/observer';

jest.mock('@site/src/hooks/observer', () => ({
  __esModule: true,
  useVisibility: jest.fn(),
}));

describe('Reveal', () => {
  beforeEach(() => {
    useVisibility.mockReturnValue({ ref: () => {}, visible: false });
  });

  describe('visibility states', () => {
    it('when not visible: no play class and correct split into words and characters', () => {
      const { container, getAllByTestId } = render(<Reveal>hello world</Reveal>);
      const root = container.querySelector('span[aria-hidden]');
      expect(root).toHaveClass('phrases');
      expect(root).not.toHaveClass('play');

      const spans = getAllByTestId('span');
      expect(spans).toHaveLength(12);

      const wordCount = spans.filter((s) => s.classList.contains('word')).length;
      const charCount = spans.filter((s) => s.classList.contains('character')).length;
      expect(wordCount).toBe(2);
      expect(charCount).toBe(10);
    });

    it('when visible: adds play class', () => {
      useVisibility.mockReturnValue({ ref: () => { }, visible: true });
      const { container } = render(<Reveal>test</Reveal>);
      const root = container.querySelector('span[aria-hidden]');
      expect(root).toHaveClass('phrases play');
    });
  });

  describe('child type handling', () => {
    it('handles a React element child (cloneElement branch)', () => {
      const { getAllByTestId } = render((
        <Reveal coeff={1}>
          <span>foo bar</span>
        </Reveal>
      ));

      const spans = getAllByTestId('span');
      expect(spans).toHaveLength(8);
      expect(spans[1]).toHaveTextContent('f');
    });

    describe('Fragment children', () => {
      const singleText = <>solo test</>;
      // eslint-disable-next-line react/jsx-no-useless-fragment
      const rawStrings = <>{['foo', 'bar']}</>;

      it.each([
        [
          'multiple element children',
          <>
            <span>aa</span>
            <span>bb cc</span>
          </>,
          9,
          3,
          6,
        ],
        ['single text child', singleText, 10, 2, 8],
      ])(
        '%s -> total spans: %i, words: %i, chars: %i',
        (_desc, children, total, words, chars) => {
          const { container, getAllByTestId } = render(<Reveal coeff={0}>{children}</Reveal>);
          const spans = getAllByTestId('span');
          expect(spans).toHaveLength(total);

          const wordCount = spans.filter((s) => s.classList.contains('word')).length;
          const charCount = spans.filter((s) => s.classList.contains('character')).length;
          expect(wordCount).toBe(words);
          expect(charCount).toBe(chars);

          const root = container.querySelector('span[aria-hidden]');
          expect(root).toHaveClass('phrases');
        },
      );

      it('processes a Fragment whose children are raw strings', () => {
        const { getAllByTestId } = render(<Reveal coeff={0}>{rawStrings}</Reveal>);

        const spans = getAllByTestId('span');
        expect(spans).toHaveLength(8);
        expect(spans[0]).toHaveTextContent('foo');
        expect(spans.slice(1, 4).map((s) => s.textContent)).toEqual(['f', 'o', 'o']);
      });
    });
  });
});
