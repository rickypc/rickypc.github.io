/*!
 * Copyright (c) 2015 - 2025 Richard Huang <rickypc@users.noreply.github.com>.
 * All Rights Reserved. Not for reuse without permission.
 * ----------------------------------------------------------------------------
 * @jest-environment jsdom
 */

import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import MultiLingual from '@site/src/components/common/MultiLingual';

describe('MultiLingual', () => {
  const chinese = { children: 'ch', testId: 'ch' };
  const pali = { sinhala: { children: 'si', testId: 'si' } };
  const sanskrit = { children: 'sa', siddham: { children: 'sid', testId: 'sid' }, testId: 'sa' };
  const thai = { children: 'th', testId: 'th' };
  const tibetan = { children: 'ti', testId: 'ti' };
  const transliteration = { className: 'trans-class', unify: true };

  describe('when all language props are provided', () => {
    it.each([
      ['chinese', {
        id: 'ch',
        infix: '·',
        prefix: '꣼ ',
        suffix: '。',
      }],
      ['pali', {
        id: 'si',
        infix: '.',
        prefix: '꣼ ',
        suffix: '෴',
      }],
      ['sanskrit', {
        id: 'sa',
        infix: '।',
        prefix: '꣼ ',
        suffix: '॥',
      }],
      ['siddham', {
        id: 'sid',
        infix: '𑗂',
        prefix: '꣼ ',
        suffix: '𑗃',
      }],
      ['thai', {
        id: 'th',
        infix: 'ฯ',
        prefix: '꣼ ',
        suffix: '๚',
      }],
      ['tibetan', {
        id: 'ti',
        infix: '།',
        prefix: '༄༅། །',
        suffix: '༎',
      }],
    ])('%s phrase block has correct markers', (_lang, {
      id,
      infix,
      prefix,
      suffix,
    }) => {
      render((
        <MultiLingual
          chinese={chinese}
          pali={pali}
          sanskrit={sanskrit}
          thai={thai}
          tibetan={tibetan}
          transliteration={transliteration}
        />
      ));
      const el = screen.queryByTestId(`phrase-block-${id}`);
      expect(el).toBeInTheDocument();
      expect(el).toHaveAttribute('class', transliteration.className);
      expect(el).toHaveAttribute('data-infix', infix);
      expect(el).toHaveAttribute('data-prefix', prefix);
      expect(el).toHaveAttribute('data-suffix', suffix);
      expect(el).toHaveAttribute('data-unify', 'true');
    });
  });

  it('renders nothing when no children props are provided', () => {
    const { container } = render(<MultiLingual transliteration={transliteration} />);
    // eslint-disable-next-line testing-library/no-node-access
    expect(container.firstChild).toBeNull();
  });

  it('falls back to default markers when transliteration not provided', () => {
    const sanskritOnly = { children: 'sa', testId: 'sa' };
    render(<MultiLingual sanskrit={sanskritOnly} />);
    const el = screen.getByTestId('phrase-block-sa');

    expect(el).not.toHaveAttribute('class');
    expect(el).toHaveAttribute('data-infix', '।');
    expect(el).toHaveAttribute('data-prefix', '꣼ ');
    expect(el).toHaveAttribute('data-suffix', '॥');
    expect(el).toHaveAttribute('data-unify', 'false');
  });
});
