/*!
 * Copyright (c) 2015 - 2025 Richard Huang <rickypc@users.noreply.github.com>.
 * All Rights Reserved. Not for reuse without permission.
 * ----------------------------------------------------------------------------
 * @jest-environment jsdom
 */

import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { useVisibility } from '@site/src/hooks/observer';
import Reveal from '../../../src/components/common/Reveal';

jest.mock('@site/src/data/common', () => ({
  __esModule: true,
  clsx: (...args) => args.filter(Boolean).join(' '),
  key: (a, b) => `${a}-${b}`,
}));

jest.mock(
  '../../../../src/components/common/styles.module.css',
  () => ({
    character: 'char-class',
    word: 'word-class',
    phrases: 'phrases-class',
    play: 'play-class',
  }),
);

jest.mock('@site/src/hooks/observer', () => ({
  __esModule: true,
  useVisibility: jest.fn(),
}));

jest.mock('framer-motion', () => ({
  __esModule: true,
  // eslint-disable-next-line react/jsx-no-useless-fragment,react/prop-types
  LazyMotion: ({ children }) => <>{children}</>,
  domAnimation: {},
  m: {
    span: ({ children, className, ...rest }) => (
      <span data-testid="motion-span" className={className} {...rest}>
        {children}
      </span>
    ),
  },
}));

describe('Reveal', () => {
  it('renders with visible=false: no play class, correct split into words and characters', () => {
    useVisibility.mockReturnValue({ ref: () => { }, visible: false });

    const { container, getAllByTestId } = render(<Reveal>hello world</Reveal>);

    const root = container.querySelector('span[aria-hidden]');
    expect(root).toHaveClass('phrases-class');
    expect(root).not.toHaveClass('play-class');

    // now correctly grab all spans by test-id
    const spans = getAllByTestId('motion-span');
    // 2 word wrappers + 10 char wrappers = 12 total
    expect(spans).toHaveLength(12);

    const wordSpans = spans.filter((el) => el.classList.contains('word-class'));
    const charSpans = spans.filter((el) => el.classList.contains('char-class'));
    expect(wordSpans).toHaveLength(2);
    expect(charSpans).toHaveLength(10);
  });

  it('renders with visible=true: adds play class', () => {
    useVisibility.mockReturnValue({ ref: () => { }, visible: true });
    const { container } = render(<Reveal>test</Reveal>);
    const root = container.querySelector('span[aria-hidden]');
    expect(root).toHaveClass('phrases-class play-class');
  });

  it('handles a React element child (non-Fragment) via cloneElement branch', () => {
    useVisibility.mockReturnValue({ ref: () => { }, visible: false });
    const { getAllByTestId } = render((
      <Reveal coeff={1}>
        <span>foo bar</span>
      </Reveal>
    ));

    // "foo bar" → 2 words + 6 chars = 8 motion spans
    const spans = getAllByTestId('motion-span');
    expect(spans).toHaveLength(8);

    // Verify the first character of first word after the word wrapper span
    expect(spans[1]).toHaveTextContent('f');
  });

  it('handles a Fragment with multiple element children (array-branch)', () => {
    useVisibility.mockReturnValue({ ref: () => { }, visible: false });
    const { getAllByTestId } = render((
      <Reveal coeff={0}>
        <>
          <span>aa</span>
          <span>bb cc</span>
        </>
      </Reveal>
    ));

    // First "<span>aa</span>" → 1 word + 2 chars = 3 spans
    // Second "<span>bb cc</span>" → 2 words + 4 chars = 6 spans
    // Total = 9
    const spans = getAllByTestId('motion-span');
    expect(spans).toHaveLength(9);

    // Check that words and chars carry correct classes
    const wordCount = spans.filter((s) => s.classList.contains('word-class')).length;
    const charCount = spans.filter((s) => s.classList.contains('char-class')).length;
    // "aa", "bb", "cc"
    expect(wordCount).toBe(3);
    expect(charCount).toBe(6);
  });

  it('renders correctly when a Fragment has exactly one child (not an array)', () => {
    // simulate not yet visible
    useVisibility.mockReturnValue({ ref: () => { }, visible: false });

    // A Fragment with one text child: should hit the non‐array Fragment branch
    // eslint-disable-next-line react/jsx-no-useless-fragment
    const { getAllByTestId, container } = render(<Reveal coeff={0}><>solo test</></Reveal>);

    // One word wrapper per space‐split word: "solo" and "test" → 2 word spans
    // One character wrapper per letter: 4 + 4 = 8 char spans
    const spans = getAllByTestId('motion-span');
    expect(spans).toHaveLength(10);

    // Verify word‐class vs char‐class counts
    const wordSpans = spans.filter((el) => el.classList.contains('word-class'));
    const charSpans = spans.filter((el) => el.classList.contains('char-class'));
    expect(wordSpans).toHaveLength(2);
    expect(charSpans).toHaveLength(8);

    // Ensure the root <span> got the proper aria‐hidden attribute
    const root = container.querySelector('span[aria-hidden]');
    expect(root).toHaveClass('phrases-class');
  });

  it('processes a Fragment whose children array are raw strings', () => {
    // simulate invisible so we still render all words/characters
    useVisibility.mockReturnValue({ ref: () => { }, visible: false });

    // Here child.props.children === ['foo', 'bar']
    // eslint-disable-next-line react/jsx-no-useless-fragment
    const { getAllByTestId } = render(<Reveal coeff={0}><>{['foo', 'bar']}</></Reveal>);

    // "foo" → 1 word + 3 chars = 4 spans
    // "bar" → 1 word + 3 chars = 4 spans
    const spans = getAllByTestId('motion-span');
    expect(spans).toHaveLength(8);

    // First span is the word wrapper for "foo"
    expect(spans[0]).toHaveTextContent('foo');
    // Next three are the char wrappers "f","o","o"
    expect(spans.slice(1, 4).map((s) => s.textContent)).toEqual(['f', 'o', 'o']);
  });
});
