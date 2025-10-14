/*!
 * Copyright (c) 2015 - 2025 Richard Huang <rickypc@users.noreply.github.com>.
 * All Rights Reserved. Not for reuse without permission.
 * ----------------------------------------------------------------------------
 * @jest-environment jsdom
 */

import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import PhraseBlock from '@site/src/components/common/PhraseBlock';

jest.unmock('@site/src/components/common/PhraseBlock');

describe('PhraseBlock', () => {
  it('renders single-child phrase with structure and Buttons', () => {
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

    const context = getByTestId('codeblock-context');
    const container = context.querySelector('.container');
    expect(container).toHaveClass('extra container theme-code-block');

    const titleDiv = container.querySelector('.title');
    expect(titleDiv).toHaveTextContent('MyTitle');
    expect(titleDiv).toHaveAttribute('translate', 'no');

    const codeElem = container.querySelector('code');
    expect(codeElem).toHaveClass('lines cls');
    expect(codeElem.textContent).toEqual('ABC-');

    expect(getByTestId('buttons')).toBeInTheDocument();
  });

  it.each([
    [
      'unify multiple children',
      { children: ['a', 'b'], unify: true, className: 'cls2' },
      { prefix: 'P', infix: '=', suffix: ';' },
      'a=\nb;\n',
    ],
    [
      'non-unify multiple children',
      { children: ['foo', 'bar'], unify: false, className: 'cls' },
      { prefix: '+', infix: '=', suffix: '-' },
      '+foo-\n+bar-\n',
    ],
  ])('renders code for %s', (_desc, phrase, opts, expected) => {
    const { getByTestId } = render((
      <PhraseBlock {...opts} phrase={phrase} />
    ));
    const codeElem = getByTestId('codeblock-context').querySelector('code');
    expect(codeElem.textContent).toEqual(expected);
  });

  it('does not render Buttons when the rendered code is empty', () => {
    const phrase = { children: null, testId: 'empty', unify: false };
    const { queryByTestId } = render((
      <PhraseBlock infix="*" prefix="P" suffix="S" phrase={phrase} />
    ));
    expect(queryByTestId('buttons')).toBeNull();
  });
});
