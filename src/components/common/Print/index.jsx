/*!
 * All the code that follow is
 * Copyright (c) 2015 - 2024 Richard Huang <rickypc@users.noreply.github.com>.
 * All Rights Reserved. Not for reuse without permission.
 */

import Button from '@site/src/components/common/Button';
import { a11y, clsx } from '@site/src/data/common';
import { GenIcon } from 'react-icons/lib';
import {
  memo,
  useCallback,
  useEffect,
  useMemo,
} from 'react';
import pdfMake from 'pdfmake/build/pdfmake';
import PropTypes from 'prop-types';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import useIsBrowser from '@docusaurus/useIsBrowser';
import styles from './styles.module.css';

function FaPrint(props) {
  return GenIcon({ tag: 'svg', attr: { viewBox: '0 0 512 512' }, child: [{ tag: 'path', attr: { d: 'M128 0C92.7 0 64 28.7 64 64v96h64V64H354.7L384 93.3V160h64V93.3c0-17-6.7-33.3-18.7-45.3L400 18.7C388 6.7 371.7 0 354.7 0H128zM384 352v32 64H128V384 368 352H384zm64 32h32c17.7 0 32-14.3 32-32V256c0-35.3-28.7-64-64-64H64c-35.3 0-64 28.7-64 64v96c0 17.7 14.3 32 32 32H64v64c0 35.3 28.7 64 64 64H384c35.3 0 64-28.7 64-   64V384zM432 248a24 24 0 1 1 0 48 24 24 0 1 1 0-48z' }, child: [] }] })(props);
}

export default memo(Object.assign(function Print({
  className,
  definition,
  Icon = FaPrint,
  label = 'Print',
  layouts,
}) {
  const browser = useIsBrowser();
  pdfMake.fonts = useMemo(() => {
    if (!browser) {
      return {};
    }
    const { origin } = window.location;
    // eslint-disable-next-line global-require
    const devanagari = `${origin}${require('@site/src/components/common/Print/font/noto/NotoSerifDevanagari-Regular.ttf').default}`;
    // eslint-disable-next-line global-require
    const devanagariBold = `${origin}${require('@site/src/components/common/Print/font/noto/NotoSerifDevanagari-Bold.ttf').default}`;
    // eslint-disable-next-line global-require
    const kokonor = `${origin}${require('@site/src/components/common/Print/font/kokonor/Kokonor-Regular.ttf').default}`;
    return {
      Kokonor: {
        bold: kokonor,
        bolditalics: kokonor,
        italics: kokonor,
        normal: kokonor,
      },
      NotoSans: {
        // eslint-disable-next-line global-require
        bold: `${origin}${require('@site/src/components/common/Print/font/noto/NotoSans-Bold.ttf').default}`,
        // eslint-disable-next-line global-require
        bolditalics: `${origin}${require('@site/src/components/common/Print/font/noto/NotoSans-BoldItalic.ttf').default}`,
        // eslint-disable-next-line global-require
        italics: `${origin}${require('@site/src/components/common/Print/font/noto/NotoSans-Italic.ttf').default}`,
        // eslint-disable-next-line global-require
        normal: `${origin}${require('@site/src/components/common/Print/font/noto/NotoSans-Regular.ttf').default}`,
      },
      NotoSerifDevanagari: {
        bold: devanagariBold,
        bolditalics: devanagariBold,
        italics: devanagari,
        normal: devanagari,
      },
    };
  }, [browser]);
  const { siteConfig } = useDocusaurusContext();

  const onClick = useCallback(
    // Immutable definition.
    () => pdfMake.createPdf(JSON.parse(JSON.stringify(definition)), layouts).print(),
    [definition, layouts],
  );

  useEffect(() => {
    if (typeof (definition) === 'object') {
      // eslint-disable-next-line no-param-reassign
      definition.info = {
        ...definition.info,
        author: siteConfig.title,
        creator: siteConfig.url,
        producer: siteConfig.url,
      };
    }
  }, [definition, label, siteConfig]);

  return browser && (
    <div className={styles.controls}>
      <Button
        {...a11y(label)}
        className={clsx(className, styles.control)}
        onClick={onClick}
        whileTap={{ scale: 0.85 }}
      >
        <Icon />
      </Button>
    </div>
  );
}, {
  propTypes: {
    className: PropTypes.string,
    definition: PropTypes.shape(),
    Icon: PropTypes.func,
    label: PropTypes.string,
    layouts: PropTypes.shape(),
  },
}));
