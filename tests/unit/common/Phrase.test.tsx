/*!
 * Copyright © 2015 Richard Huang <rickypc@users.noreply.github.com>
 * All rights reserved.
 * ----------------------------------------------------------------------------
 * @jest-environment jsdom
 */

import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Phrase, { GrPrint, Instruction } from '@site/src/components/common/Phrase';
import { type ReactElement, type ReactNode } from 'react';
import { type Transliteration } from '@site/src/components/common/MultiLingual';

type Props = {
  image?: any;
  instruction?: ReactNode;
  path?: string;
  transliteration?: Transliteration;
};

// eslint-disable-next-line no-unused-vars
const PhraseMock = Phrase as (_: Props) => ReactElement;

describe('GrPrint', () => {
  it('renders a print icon with passed props', () => {
    render(<GrPrint className="print" title="PrintTitle" />);
    const icon = screen.getByTestId('icon-svg');
    expect(icon).toHaveAttribute('class', 'print');
    expect(icon).toHaveAttribute('title', 'PrintTitle');
  });
});

describe('Instruction', () => {
  it('renders MDXDetails and Image when image prop is provided', () => {
    const props = { image: 'path/to/img.png', text: null, transliteration: { title: 'MyTitle' } } as any;
    render(<Instruction {...props} />);

    expect(screen.getByTestId('mdx-details')).toBeInTheDocument();
    expect(screen.getByText('MyTitle')).toBeInTheDocument();

    const img = screen.getByTestId('img-MyTitle');
    expect(img).toHaveAttribute('alt', 'MyTitle');
    expect(img).toHaveAttribute('src', 'path/to/img.png');
    expect(img).toHaveClass('picture');
  });

  it('renders a div with instruction text when only text prop is provided', () => {
    const props = { image: undefined, text: 'Please read carefully', transliteration: { title: 'IgnoredTitle' } };
    render(<Instruction {...props} />);
    const div = screen.getByText('Please read carefully');
    expect(div).toHaveClass('instruction');
  });
});

describe('Phrase', () => {
  const transliteration = { children: 'Hello', testId: 'transliteration' };

  it('returns null when transliteration is not provided', () => {
    const { container } = render(<PhraseMock />);
    // eslint-disable-next-line testing-library/no-node-access
    expect(container.firstChild).toBeNull();
  });

  describe('basic rendering without speech or repetition', () => {
    it('renders only PhraseBlock with default Sanskrit markers', () => {
      render((
        <PhraseMock transliteration={{ ...transliteration, speech: undefined, repetition: 0 }} />
      ));
      const block = screen.getByTestId('phrase-block-transliteration');
      expect(block).toHaveAttribute('data-infix', '।');
      expect(block).toHaveAttribute('data-prefix', '꣼ ');
      expect(block).toHaveAttribute('data-suffix', '॥');
      expect(block.textContent).toBe('Hello');
    });

    it('does not include Details, Speech, or PDF links', () => {
      render((
        <PhraseMock transliteration={{ ...transliteration, speech: undefined, repetition: 0 }} />
      ));
      expect(screen.queryByTestId(/^link-/)).toBeNull();
      expect(screen.queryByTestId('mdx-details')).toBeNull();
      expect(screen.queryByTestId('speech')).toBeNull();
    });
  });

  it('renders Speech and support wrapper when speech is provided', () => {
    const { container } = render((
      <PhraseMock transliteration={{ ...transliteration, speech: 'SpeakUp', repetition: 0 }} />
    ));
    expect(screen.queryByTestId(/^link-/)).toBeNull();
    expect(screen.getByTestId('speech').textContent).toBe('SpeakUp');
    // eslint-disable-next-line testing-library/no-container,testing-library/no-node-access
    expect(container.querySelector('.support')).toBeInTheDocument();
  });

  describe('repetition badge', () => {
    it('does not render badge when repetition is 0', () => {
      const { container } = render((
        <PhraseMock path="/docs/buddhism/phrases/_arya_tara.ts" transliteration={transliteration as any} />
      ));
      // eslint-disable-next-line testing-library/no-container,testing-library/no-node-access
      expect(container.querySelector('.badge')).toBeNull();
    });

    it('renders badge when repetition > 1', () => {
      const { container } = render((
        <PhraseMock transliteration={{ ...transliteration, repetition: 5 }} />
      ));
      // eslint-disable-next-line testing-library/no-container,testing-library/no-node-access
      const badge = container.querySelector('.badge');
      expect(badge).toBeInTheDocument();
      expect(badge?.textContent).toBe('5x');
      expect(badge).toHaveAttribute('title', 'Preferred repetition: 5 times');
    });
  });

  describe('PDF links generation', () => {
    it('renders all four PDF links with correct hrefs and testids', () => {
      render((
        <PhraseMock path="/docs/buddhism/phrases/_arya_tara.ts" transliteration={{ ...transliteration, title: 'MyPrayer' }} />
      ));
      [
        ['link-Open MyPrayer condensed prayer roll', '/pdf/arya-tara-condensed.pdf'],
        ['link-Open MyPrayer prayer roll', '/pdf/arya-tara.pdf'],
        ['link-Open MyPrayer paubhā/thangka prayer', '/pdf/arya-tara-thangka.pdf'],
        ['link-Open MyPrayer prayer wheel', '/pdf/arya-tara-wheel.pdf'],
      ].forEach(([testId, href]) => {
        const link = screen.getByTestId(testId);
        expect(link).toBeInTheDocument();
        expect(link).toHaveAttribute('href', href);
      });
    });
  });

  describe('inline Instruction rendering', () => {
    it('renders Instruction when image prop is provided on Phrase', () => {
      render((
        <PhraseMock image="img.png" path="/docs/buddhism/phrases/_arya_tara.ts" transliteration={{ ...transliteration, title: 'ImgTest' }} />
      ));
      expect(screen.getByTestId('mdx-details')).toBeInTheDocument();
      expect(screen.getByTestId('img-ImgTest')).toHaveAttribute('src', 'img.png');
    });

    it('renders Instruction when instruction prop is provided on Phrase', () => {
      render((
        <PhraseMock instruction="Read this" transliteration={{ ...transliteration, title: 'NoImg' }} />
      ));
      const div = screen.getByText('Read this');
      expect(div).toHaveClass('instruction');
    });
  });
});
