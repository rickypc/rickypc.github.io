/*!
 * Copyright (c) 2015 - 2025 Richard Huang <rickypc@users.noreply.github.com>.
 * All Rights Reserved. Not for reuse without permission.
 * ----------------------------------------------------------------------------
 * @jest-environment jsdom
 */

import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import MultiLingual from '../../../src/components/common/MultiLingual';

jest.mock('@site/src/components/common/PhraseBlock', () => ({
  __esModule: true,
  default: ({
    infix,
    phrase,
    prefix,
    suffix,
  }) => (
    <div
      data-classname={phrase.className}
      data-infix={infix}
      data-prefix={prefix}
      data-suffix={suffix}
      data-testid={`phrase-${phrase.testId}`}
      data-unify={String(phrase.unify)}
    />
  ),
}));

describe('MultiLingual', () => {
  const transliteration = { className: 'trans-class', unify: true };
  const sanskrit = { children: 'sa', testId: 'sa', siddham: { children: 'sid', testId: 'sid' } };
  const tibetan = { children: 'ti', testId: 'ti' };
  const pali = { sinhala: { children: 'si', testId: 'si' } };
  const chinese = { children: 'ch', testId: 'ch' };
  const thai = { children: 'th', testId: 'th' };

  it('renders all phrase blocks correctly', () => {
    const { queryByTestId } = render((
      <MultiLingual
        sanskrit={sanskrit}
        tibetan={tibetan}
        pali={pali}
        chinese={chinese}
        thai={thai}
        transliteration={transliteration}
      />
    ));

    const expectations = [
      {
        id: 'ch',
        infix: '·',
        prefix: '꣼ ',
        suffix: '。',
      },
      {
        id: 'sa',
        infix: '।',
        prefix: '꣼ ',
        suffix: '॥',
      },
      {
        id: 'si',
        infix: '.',
        refix: '꣼ ',
        suffix: '෴',
      },
      {
        id: 'sid',
        infix: '𑗂',
        prefix: '꣼ ',
        suffix: '𑗃',
      },
      {
        id: 'th',
        infix: 'ฯ',
        prefix: '꣼ ',
        suffix: '๚',
      },
      {
        id: 'ti',
        infix: '།',
        prefix: '༄༅། །',
        suffix: '༎',
      },
    ];

    expectations.forEach(({
      id,
      infix,
      prefix,
      suffix,
    }) => {
      const el = queryByTestId(`phrase-${id}`);
      expect(el).toBeInTheDocument();
      expect(el).toHaveAttribute('data-infix', infix);
      expect(el).toHaveAttribute('data-prefix', prefix);
      expect(el).toHaveAttribute('data-suffix', suffix);
      expect(el).toHaveAttribute('data-classname', 'trans-class');
      expect(el).toHaveAttribute('data-unify', 'true');
    });
  });

  it('renders nothing when no children present', () => {
    const { container } = render(<MultiLingual transliteration={transliteration} />);
    expect(container.firstChild).toBeNull();
  });

  it('uses default transliteration when not provided', () => {
    const sanskritOnly = { children: 'sa', testId: 'sa' };
    const { getByTestId } = render(<MultiLingual sanskrit={sanskritOnly} />);
    const el = getByTestId('phrase-sa');
    expect(el).toHaveAttribute('data-infix', '।');
    expect(el).toHaveAttribute('data-prefix', '꣼ ');
    expect(el).toHaveAttribute('data-suffix', '॥');
    expect(el).not.toHaveAttribute('data-classname');
    expect(el).toHaveAttribute('data-unify', 'undefined');
  });
});
