/*!
 * Copyright (c) 2015 - 2025 Richard Huang <rickypc@users.noreply.github.com>.
 * All Rights Reserved. Not for reuse without permission.
 * ----------------------------------------------------------------------------
 * @jest-environment jsdom
 */

import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import Phrase, { GrPrint, Instruction } from '@site/src/components/common/Phrase';

jest.mock('#buddhism/_pdf.js', () => [
  ['condensed', '#foo'],
  ['roll', '#foo'],
  ['thangka', '#foo'],
  ['wheel', '#foo'],
]);

jest.mock('react-icons/lib', () => ({
  __esModule: true,
  // eslint-disable-next-line react/display-name,react/function-component-definition
  GenIcon: (config) => (props) => <svg data-testid={`icon-${config.tag}`} {...props} />,
}));

jest.mock('@site/src/components/common/Image', () => ({
  __esModule: true,
  default: ({ alt, className, picture }) => (
    <img
      alt={alt}
      className={className}
      data-testid={`image-${alt}`}
      src={picture.fallback}
    />
  ),
}));

jest.mock('@site/src/components/common/Link', () => ({
  __esModule: true,
  default: ({
    children,
    className,
    href,
    title,
  }) => (
    // eslint-disable-next-line @docusaurus/no-html-links,jsx-a11y/anchor-is-valid
    <a className={className} data-href={href} data-testid={`link-${title}`}>
      {children}
    </a>
  ),
}));

jest.mock('@site/src/components/common/PhraseBlock', () => ({
  __esModule: true,
  default: ({
    infix,
    phrase,
    prefix,
    suffix,
  }) => (
    <div
      data-infix={infix}
      data-prefix={prefix}
      data-suffix={suffix}
      data-testid={`phrase-block-${phrase.testId}`}
    >
      {phrase.children}
    </div>
  ),
}));

jest.mock('@site/src/components/common/Speech', () => ({
  __esModule: true,
  default: ({ children }) => <div data-testid="speech">{children}</div>,
}));

jest.mock('@site/src/data/common', () => ({
  __esModule: true,
  clsx: (...args) => args.filter(Boolean).join(' '),
  fileName: (path, template) => `file-${path}-${template}`,
  key: (...args) => args.join(''),
  tail: (path) => path?.split('/')?.pop(),
}));

jest.mock('@theme-original/MDXComponents/Details', () => ({
  __esModule: true,
  default: ({ children }) => <div data-testid="mdx-details">{children}</div>,
}));

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

    const img = getByTestId('image-MyTitle');
    expect(img).toHaveAttribute('src', 'path/to/img.png');
    expect(img).toHaveAttribute('alt', 'MyTitle');
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
  const defaultTrans = { testId: 'trans', children: 'Hello' };
  let utils;

  it('returns null when transliteration is not provided', () => {
    const { container } = render(<Phrase />);
    expect(container.firstChild).toBeNull();
  });

  describe('basic rendering without speech or repetition', () => {
    beforeEach(() => {
      utils = render((
        <Phrase transliteration={{ ...defaultTrans, speech: undefined, repetition: 0 }} />
      ));
    });

    it('renders only PhraseBlock with default Sanskrit markers', () => {
      const block = utils.getByTestId('phrase-block-trans');
      expect(block).toHaveAttribute('data-infix', '।');
      expect(block).toHaveAttribute('data-prefix', '꣼ ');
      expect(block).toHaveAttribute('data-suffix', '॥');
      expect(block.textContent).toBe('Hello');
    });

    it('does not include Details, Speech, or PDF links', () => {
      expect(utils.queryByTestId('mdx-details')).toBeNull();
      expect(utils.queryByTestId('speech')).toBeNull();
      expect(utils.queryByTestId(/^link-/)).toBeNull();
    });
  });

  it('renders Speech and support wrapper when speech is provided', () => {
    utils = render(<Phrase transliteration={{ ...defaultTrans, speech: 'SpeakUp', repetition: 0 }} />);
    expect(utils.getByTestId('speech').textContent).toBe('SpeakUp');
    expect(utils.container.querySelector('.support')).toBeInTheDocument();
    expect(utils.queryByTestId(/^link-/)).toBeNull();
  });

  describe('repetition badge', () => {
    it('does not render badge when repetition is 0', () => {
      const { container } = render(<Phrase path="/buddhism/foo" transliteration={defaultTrans} />);
      expect(container.querySelector('.badge')).toBeNull();
    });

    it('renders badge when repetition > 1', () => {
      const { container } = render(<Phrase transliteration={{ ...defaultTrans, repetition: 5 }} />);
      const badge = container.querySelector('.badge');
      expect(badge).toBeInTheDocument();
      expect(badge.textContent).toBe('5x');
      expect(badge).toHaveAttribute('title', 'Preferred repetition: 5 times');
    });
  });

  describe('PDF links generation', () => {
    beforeEach(() => {
      utils = render(<Phrase path="/buddhism/foo" transliteration={{ ...defaultTrans, title: 'MyPrayer' }} />);
    });

    it('renders all four PDF links with correct hrefs and testids', () => {
      const { getByTestId } = utils;
      const expected = [
        ['link-Open MyPrayer condensed prayer roll', 'file-/buddhism/foo-condensed/pdf/pdf.'],
        ['link-Open MyPrayer prayer roll', 'file-/buddhism/foo-roll/pdf/pdf.'],
        ['link-Open MyPrayer paubhā/thangka prayer', 'file-/buddhism/foo-thangka/pdf/pdf.'],
        ['link-Open MyPrayer prayer wheel', 'file-/buddhism/foo-wheel/pdf/pdf.'],
      ];
      expected.forEach(([testId, href]) => {
        const link = getByTestId(testId);
        expect(link).toBeInTheDocument();
        expect(link).toHaveAttribute('data-href', href);
      });
    });
  });

  describe('inline Instruction rendering', () => {
    it('renders Instruction when image prop is provided on Phrase', () => {
      const { getByTestId } = render(<Phrase image="img.png" path="/buddhism/foo" transliteration={{ ...defaultTrans, title: 'ImgTest' }} />);
      expect(getByTestId('mdx-details')).toBeInTheDocument();
      expect(getByTestId('image-ImgTest')).toHaveAttribute('src', 'img.png');
    });

    it('renders Instruction when instruction prop is provided on Phrase', () => {
      const { getByText } = render(<Phrase instruction="Read this" transliteration={{ ...defaultTrans, title: 'NoImg' }} />);
      const div = getByText('Read this');
      expect(div).toHaveClass('instruction');
    });
  });
});
