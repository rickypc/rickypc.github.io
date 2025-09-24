/*!
 * Copyright (c) 2015 - 2025 Richard Huang <rickypc@users.noreply.github.com>.
 * All Rights Reserved. Not for reuse without permission.
 * ----------------------------------------------------------------------------
 * @jest-environment jsdom
 */

import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import PhraseBlock from '../../../src/components/common/PhraseBlock';

jest.mock('@theme/CodeBlock/Buttons', () => ({
  __esModule: true,
  default: () => <div data-testid="buttons" />,
}));

jest.mock('@site/src/data/common', () => ({
  __esModule: true,
  clsx: (...args) => args.filter(Boolean).join(' '),
  key: (a, b) => `${a}-${b}`,
}));

jest.mock('@docusaurus/theme-common/internal', () => ({
  __esModule: true,
  // eslint-disable-next-line react/prop-types
  CodeBlockContextProvider: ({ children }) => (
    <div data-testid="codeblock-context">{children}</div>
  ),
  createCodeBlockMetadata: jest.fn((meta) => ({
    // return an object with a `code` property so Buttons will render
    code: meta.code,
    title: meta.title,
  })),
  useCodeWordWrap: () => ({
    codeBlockRef: { current: null },
  }),
}));

jest.mock(
  '../../../src/components/common/styles.module.css',
  () => ({
    container: 'container',
    title: 'title',
    content: 'content',
    standalone: 'standalone',
    lines: 'lines',
  }),
);

describe('PhraseBlock', () => {
  it('renders single-child phrase with prefix/infix/suffix and Buttons', () => {
    const phrase = {
      children: 'ABC',
      testId: 't1',
      title: 'MyTitle',
      className: 'cls',
      unify: false,
    };

    const { getByTestId } = render((
      <PhraseBlock
        className="extra"
        infix="*"
        prefix="+"
        suffix="-"
        phrase={phrase}
      />
    ));

    // The context provider should wrap the output
    const context = getByTestId('codeblock-context');
    expect(context).toBeInTheDocument();

    // Container div gets our extra class, module container class, and theme‐code‐block
    const container = context.querySelector('.container');
    expect(container).toHaveClass('extra container theme-code-block');

    // We should see the title block with translate="no"
    const titleDiv = container.querySelector('.title');
    expect(titleDiv).toHaveTextContent('MyTitle');
    expect(titleDiv).toHaveAttribute('translate', 'no');

    // The <code> element should include "ABC" followed by our suffix "-"
    const codeElem = container.querySelector('code');
    expect(codeElem).toHaveClass('lines cls');
    expect(codeElem.textContent).toBe('ABC-');

    // Because metadata.code is truthy, Buttons should render
    expect(getByTestId('buttons')).toBeInTheDocument();
  });

  it('renders multiple children correctly when unify=true', () => {
    const phrase = {
      children: ['a', 'b'],
      testId: 't2',
      unify: true,
      className: 'cls2',
    };

    const { getByTestId } = render((
      <PhraseBlock
        infix="="
        prefix="P"
        suffix=";"
        phrase={phrase}
      />
    ));

    // Check the <code> content preserves newlines and infix/suffix logic
    const context = getByTestId('codeblock-context');
    const codeElem = context.querySelector('code');
    // index 0: "a" + infix + "\n", index 1: "b" + suffix + "\n"
    expect(codeElem.textContent).toBe('a=\nb;\n');
  });

  it('renders the prefix on every fragment when unify=false and multiple children', () => {
    const phrase = {
      children: ['foo', 'bar'],
      testId: 'multi',
      unify: false,
      className: 'cls',
    };

    const { getByTestId } = render((
      <PhraseBlock
        infix="="
        prefix="+"
        suffix="-"
        phrase={phrase}
      />
    ));

    const codeElem = getByTestId('codeblock-context').querySelector('code');
    // Expect each fragment to start with "+" and end with "-" followed by newline
    expect(codeElem.textContent).toBe('+foo-\n+bar-\n');
  });

  it('does not render Buttons when the rendered code is empty', () => {
    const phrase = {
      children: null,
      testId: 'empty',
      unify: false,
    };

    const { queryByTestId } = render((
      <PhraseBlock
        infix="*"
        prefix="P"
        suffix="S"
        phrase={phrase}
      />
    ));

    // Metadata.code will be '' so Buttons should not appear
    expect(queryByTestId('buttons')).toBeNull();
  });
});
