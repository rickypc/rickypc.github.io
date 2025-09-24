/*!
 * Copyright (c) 2015 - 2025 Richard Huang <rickypc@users.noreply.github.com>.
 * All Rights Reserved. Not for reuse without permission.
 * ----------------------------------------------------------------------------
 * @jest-environment jsdom
 */

import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import Phrase, { GrPrint, Instruction } from '../../../src/components/common/Phrase';

jest.mock('react-icons/lib', () => ({
  __esModule: true,
  // eslint-disable-next-line react/display-name,react/function-component-definition
  GenIcon: (config) => (props) => (<svg data-testid={`icon-${config.tag}`} {...props} />),
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

jest.mock('@theme-original/MDXComponents/Details', () => ({
  __esModule: true,
  default: ({ children }) => <div data-testid="mdx-details">{children}</div>,
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

jest.mock('#buddhism/_pdf.js', () => [
  ['condensed', '#foo'],
  ['roll', '#foo'],
  ['thangka', '#foo'],
  ['wheel', '#foo'],
]);

jest.mock('@site/src/data/common', () => ({
  __esModule: true,
  clsx: (...args) => args.filter(Boolean).join(' '),
  fileName: (path, template) => `file-${path}-${template}`,
  key: (...args) => args.join(''),
  tail: (path) => path?.split('/')?.pop(),
}));

jest.mock(
  '../../../src/components/common/styles.module.css',
  () => ({
    badge: 'badge-class',
    icon: 'icon-class',
    instruction: 'instr-class',
    picture: 'pic-class',
    support: 'support-class',
  }),
);

describe('GrPrint', () => {
  it('renders a print icon with passed props', () => {
    const { getByTestId } = render((
      <GrPrint className="print-class" title="PrintTitle" />
    ));
    const icon = getByTestId('icon-svg');
    expect(icon).toBeInTheDocument();
    expect(icon).toHaveAttribute('class', 'print-class');
    expect(icon).toHaveAttribute('title', 'PrintTitle');
  });
});

describe('Instruction', () => {
  it('renders MDXDetails with a summary and Image when image prop is provided', () => {
    const props = {
      image: 'path/to/img.png',
      text: null,
      transliteration: { title: 'MyTitle' },
    };
    const { getByTestId, getByText } = render(<Instruction {...props} />);

    // wrapper from MDXDetails
    const details = getByTestId('mdx-details');
    expect(details).toBeInTheDocument();

    // summary shows transliteration.title
    expect(getByText('MyTitle')).toBeInTheDocument();

    // Image rendered with correct src and alt
    const img = getByTestId('image-MyTitle');
    expect(img).toHaveAttribute('src', 'path/to/img.png');
    expect(img).toHaveAttribute('alt', 'MyTitle');
    expect(img).toHaveClass('pic-class');
  });

  it('renders a div with instruction text when only text prop is provided', () => {
    const props = {
      image: undefined,
      text: 'Please read carefully',
      transliteration: { title: 'IgnoredTitle' },
    };
    const { getByText } = render(<Instruction {...props} />);

    const div = getByText('Please read carefully');
    expect(div).toBeInTheDocument();
    expect(div).toHaveClass('instr-class');
  });
});

describe('Phrase', () => {
  const defaultTransliteration = { testId: 'trans', children: 'Hello' };

  it('returns null when transliteration is not provided', () => {
    const { container } = render(<Phrase />);
    expect(container.firstChild).toBeNull();
  });

  it('renders only PhraseBlock when only children provided', () => {
    const transliteration = {
      ...defaultTransliteration,
      speech: undefined,
      repetition: 0,
    };
    const { getByTestId, queryByTestId } = render((
      <Phrase transliteration={transliteration} />
    ));

    const block = getByTestId('phrase-block-trans');
    expect(block).toHaveAttribute('data-infix', '।');
    expect(block).toHaveAttribute('data-prefix', '꣼ ');
    expect(block).toHaveAttribute('data-suffix', '॥');
    expect(block.textContent).toBe('Hello');

    expect(queryByTestId('mdx-details')).toBeNull();
    expect(queryByTestId('speech')).toBeNull();
    expect(queryByTestId(/^link-/)).toBeNull();
  });

  it('renders Speech and support wrapper when speech is provided', () => {
    const transliteration = {
      ...defaultTransliteration,
      speech: 'SpeakUp',
      repetition: 0,
    };
    const { getByTestId, container, queryByTestId } = render((
      <Phrase transliteration={transliteration} />
    ));

    expect(getByTestId('speech').textContent).toBe('SpeakUp');

    const supportWrapper = container.querySelector('.support-class');
    expect(supportWrapper).toBeInTheDocument();

    expect(queryByTestId(/^link-/)).toBeNull();
  });

  it('does not render repetition badge when repetition prop is omitted (default 0)', () => {
    const transliteration = { ...defaultTransliteration };
    const { container } = render((
      <Phrase path="/buddhism/foo" transliteration={transliteration} />
    ));

    // With path provided, PDF links appear but no badge since default repetition is 0
    const badge = container.querySelector('.badge-class');
    expect(badge).toBeNull();
  });

  it('renders repetition badge when repetition > 1', () => {
    const transliteration = {
      ...defaultTransliteration,
      repetition: 5,
    };
    const { container } = render((
      <Phrase transliteration={transliteration} />
    ));

    const badge = container.querySelector('.badge-class');
    expect(badge).toBeInTheDocument();
    expect(badge.textContent).toBe('5x');
    expect(badge).toHaveAttribute(
      'title',
      'Preferred repetition: 5 times',
    );
  });

  it('renders PDF links when path and title are provided', () => {
    const transliteration = {
      ...defaultTransliteration,
      title: 'MyPrayer',
    };
    const { getByTestId } = render((
      <Phrase path="/buddhism/foo" transliteration={transliteration} />
    ));

    expect(getByTestId('link-Open MyPrayer prayer roll')).toHaveAttribute(
      'data-href',
      'file-/buddhism/foo-roll/pdf/pdf.',
    );
    expect(
      getByTestId('link-Open MyPrayer condensed prayer roll'),
    ).toBeInTheDocument();
    expect(getByTestId('link-Open MyPrayer prayer wheel')).toBeInTheDocument();
    expect(
      getByTestId('link-Open MyPrayer paubhā/thangka prayer'),
    ).toBeInTheDocument();
  });

  it('renders Instruction when image or instruction props provided', () => {
    const transliteration = {
      ...defaultTransliteration,
      title: 'ImgTest',
    };

    const { getByTestId } = render((
      <Phrase
        image="img.png"
        path="/buddhism/foo"
        transliteration={transliteration}
      />
    ));
    expect(getByTestId('mdx-details')).toBeInTheDocument();
    expect(getByTestId('image-ImgTest')).toHaveAttribute('src', 'img.png');

    const { getByText } = render((
      <Phrase
        instruction="Read this"
        transliteration={{ ...transliteration, title: 'NoImg' }}
      />
    ));
    const div = getByText('Read this');
    expect(div).toHaveClass('instr-class');
  });
});
