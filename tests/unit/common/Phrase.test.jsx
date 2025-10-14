/*!
 * Copyright (c) 2015 - 2025 Richard Huang <rickypc@users.noreply.github.com>.
 * All Rights Reserved. Not for reuse without permission.
 * ----------------------------------------------------------------------------
 * @jest-environment jsdom
 */

import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import Phrase, { GrPrint, Instruction } from '@site/src/components/common/Phrase';

describe('GrPrint', () => {
  it('renders a print icon with passed props', () => {
    const { getByTestId } = render((
      <GrPrint className="print" title="PrintTitle" />
    ));
    const icon = getByTestId('icon-svg');
    expect(icon).toHaveAttribute('class', 'print');
    expect(icon).toHaveAttribute('title', 'PrintTitle');
  });
});

describe('Instruction', () => {
  it('renders MDXDetails and Image when image prop is provided', () => {
    const props = { image: 'path/to/img.png', text: null, transliteration: { title: 'MyTitle' } };
    const { getByTestId, getByText } = render(<Instruction {...props} />);

    expect(getByTestId('mdx-details')).toBeInTheDocument();
    expect(getByText('MyTitle')).toBeInTheDocument();

    const img = getByTestId('img-MyTitle');
    expect(img).toHaveAttribute('alt', 'MyTitle');
    expect(img).toHaveAttribute('src', 'path/to/img.png');
    expect(img).toHaveClass('picture');
  });

  it('renders a div with instruction text when only text prop is provided', () => {
    const props = { image: undefined, text: 'Please read carefully', transliteration: { title: 'IgnoredTitle' } };
    const { getByText } = render(<Instruction {...props} />);
    const div = getByText('Please read carefully');
    expect(div).toHaveClass('instruction');
  });
});

describe('Phrase', () => {
  const transliteration = { children: 'Hello', testId: 'transliteration'  };

  it('returns null when transliteration is not provided', () => {
    const { container } = render(<Phrase />);
    expect(container.firstChild).toBeNull();
  });

  describe('basic rendering without speech or repetition', () => {
    it('renders only PhraseBlock with default Sanskrit markers', () => {
      const { getByTestId } = render((
        <Phrase transliteration={{ ...transliteration, speech: undefined, repetition: 0 }} />
      ));
      const block = getByTestId('phrase-block-transliteration');
      expect(block).toHaveAttribute('data-infix', '।');
      expect(block).toHaveAttribute('data-prefix', '꣼ ');
      expect(block).toHaveAttribute('data-suffix', '॥');
      expect(block.textContent).toEqual('Hello');
    });

    it('does not include Details, Speech, or PDF links', () => {
      const { queryByTestId } = render((
        <Phrase transliteration={{ ...transliteration, speech: undefined, repetition: 0 }} />
      ));
      expect(queryByTestId(/^link-/)).toBeNull();
      expect(queryByTestId('mdx-details')).toBeNull();
      expect(queryByTestId('speech')).toBeNull();
    });
  });

  it('renders Speech and support wrapper when speech is provided', () => {
    const { container, getByTestId, queryByTestId } = render((
      <Phrase transliteration={{ ...transliteration, speech: 'SpeakUp', repetition: 0 }} />
    ));
    expect(queryByTestId(/^link-/)).toBeNull();
    expect(getByTestId('speech').textContent).toEqual('SpeakUp');
    expect(container.querySelector('.support')).toBeInTheDocument();
  });

  describe('repetition badge', () => {
    it('does not render badge when repetition is 0', () => {
      const { container } = render((
        <Phrase path="/docs/buddhism/phrases/_arya_tara.js" transliteration={transliteration} />
      ));
      expect(container.querySelector('.badge')).toBeNull();
    });

    it('renders badge when repetition > 1', () => {
      const { container } = render((
        <Phrase transliteration={{ ...transliteration, repetition: 5 }} />
      ));
      const badge = container.querySelector('.badge');
      expect(badge).toBeInTheDocument();
      expect(badge.textContent).toEqual('5x');
      expect(badge).toHaveAttribute('title', 'Preferred repetition: 5 times');
    });
  });

  describe('PDF links generation', () => {
    it('renders all four PDF links with correct hrefs and testids', () => {
      const { getByTestId } = render((
        <Phrase path="/docs/buddhism/phrases/_arya_tara.js" transliteration={{ ...transliteration, title: 'MyPrayer' }} />
      ));
      [
        ['link-Open MyPrayer condensed prayer roll', '/pdf/arya-tara-condensed.pdf'],
        ['link-Open MyPrayer prayer roll', '/pdf/arya-tara.pdf'],
        ['link-Open MyPrayer paubhā/thangka prayer', '/pdf/arya-tara-thangka.pdf'],
        ['link-Open MyPrayer prayer wheel', '/pdf/arya-tara-wheel.pdf'],
      ].forEach(([testId, href]) => {
        const link = getByTestId(testId);
        expect(link).toBeInTheDocument();
        expect(link).toHaveAttribute('href', href);
      });
    });
  });

  describe('inline Instruction rendering', () => {
    it('renders Instruction when image prop is provided on Phrase', () => {
      const { getByTestId } = render((
        <Phrase image="img.png" path="/docs/buddhism/phrases/_arya_tara.js" transliteration={{ ...transliteration, title: 'ImgTest' }} />
      ));
      expect(getByTestId('mdx-details')).toBeInTheDocument();
      expect(getByTestId('img-ImgTest')).toHaveAttribute('src', 'img.png');
    });

    it('renders Instruction when instruction prop is provided on Phrase', () => {
      const { getByText } = render((
        <Phrase instruction="Read this" transliteration={{ ...transliteration, title: 'NoImg' }} />
      ));
      const div = getByText('Read this');
      expect(div).toHaveClass('instruction');
    });
  });
});
