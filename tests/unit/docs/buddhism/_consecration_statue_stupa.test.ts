/*!
 * Copyright © 2015 Richard Huang <rickypc@users.noreply.github.com>
 * All rights reserved.
 */

import consecration from '#buddhism/_consecration_statue_stupa';
import {
  header,
  main,
  phrase,
  phrases,
} from '#buddhism/_common';

jest.mock('#buddhism/_common', () => ({
  header: jest.fn((title, note) => ({ mockedHeader: true, note, title })),
  main: jest.fn((a, b, n) => [{
    a, b, mockedMain: true, n,
  }]),
  phrase: jest.fn((path, note, n) => [{
    mockedPhrase: true, n, note, path,
  }]),
  phrases: jest.fn(() => ['P1', 'P2', 'P3']),
}));

const headerCalls = [...jest.mocked(header).mock.calls];
const mainCalls = [...jest.mocked(main).mock.calls];
const phraseCalls = [...jest.mocked(phrase).mock.calls];
const phrasesCalls = [...jest.mocked(phrases).mock.calls];

describe('docs.buddhism._consecration_statue_stupa', () => {
  it('exports the correct top-level structure', () => {
    expect(consecration).toHaveProperty('pages');
    expect(consecration).toHaveProperty('path');
    expect(consecration).toHaveProperty('title');

    expect(Array.isArray(consecration.pages)).toBe(true);
    expect(consecration.title).toBe('Buddha Statue/Stupa/Sculpture Consecration');
  });

  it('calls phrases() once for pratityasamutpadaSamudayaNirodha', () => {
    expect(phrasesCalls).toHaveLength(1);
    expect(phrasesCalls[0]).toEqual(['#buddhism/phrases/_pratityasamutpada_samudaya_nirodha.ts']);
  });

  it('second page uses phrase() correctly for both columns', () => {
    const page = consecration.pages[1] as any;

    expect(page.chapters).toEqual(['Maṅgala', 'Abhiṣeka']);
    expect(page.number).toBe('3');

    expect(phraseCalls[0]).toEqual([
      '#buddhism/phrases/_mala.ts',
      ' (recite the prayer, then blow and rub the mālā gently)',
    ]);
    expect(phraseCalls[1]).toEqual(['#buddhism/phrases/_japa.ts']);
    expect(phraseCalls[2]).toEqual(['#buddhism/phrases/_dharma.ts']);
    expect(phraseCalls[3]).toEqual(['#buddhism/phrases/_namaskara.ts']);

    expect(phraseCalls[4]).toEqual(['#buddhism/phrases/_saranagamana_cittotpada.ts']);
    expect(phraseCalls[5]).toEqual(['#buddhism/phrases/_catvary_apramanani.ts']);
    expect(phraseCalls[6]).toEqual(['#buddhism/phrases/_prajna_paramita.ts', '', 7]);
    expect(phraseCalls[7]).toEqual(['#buddhism/phrases/_sunyata.ts']);
  });

  it('third page uses phrases() result correctly', () => {
    const page = consecration.pages[2] as any;

    expect(page.chapters).toEqual(['Abhiṣeka']);
    // contents: [pratityasamutpadaSamudayaNirodha[1]] -> ['P2']
    expect(page.contents).toEqual(['P2']);
    expect(page.number).toBe('5');
  });

  it('fourth page uses phrase() for both columns', () => {
    const page = consecration.pages[3] as any;

    expect(page.chapters).toEqual(['Abhiṣeka']);
    expect(page.number).toBe('6');

    expect(phraseCalls[8]).toEqual(['#buddhism/phrases/_anekajati.ts']);
    expect(phraseCalls[9]).toEqual(['#buddhism/phrases/_pratityasamutpada.ts']);

    expect(phraseCalls[10]).toEqual(['#buddhism/phrases/_vairocana_sarvakata_danavidhih.ts']);
    expect(phraseCalls[11]).toEqual(['#buddhism/phrases/_ratnadhvaja_parikrama.ts']);
    expect(phraseCalls[12]).toEqual(['#buddhism/phrases/_vimala_usnisa.ts']);
  });

  it('fifth page uses header() and phrase-set blocks', () => {
    const page = consecration.pages[4] as any;

    expect(page.chapters).toEqual(['Abhiṣeka']);
    expect(page.number).toBe('4');

    expect(headerCalls[0]).toEqual(['Āhvāna [Invitation]']);
  });

  it('sixth page uses main() and header()', () => {
    const page = consecration.pages[6] as any;

    expect(page.chapters).toEqual(['Abhiṣeka']);
    expect(page.number).toBe('7');

    expect(headerCalls[1]).toEqual(['Cakṣu Unmilan [Opening Of Eyes]']);
    expect(mainCalls[0]).toEqual([
      'ॐ ज्ञान चक्षु प्रवेशय फट्॥',
      'oṃ jñāna cakṣu praveśāya phaṭ॥',
      3,
    ]);
  });

  it('last major page uses main() and header()', () => {
    const page = consecration.pages[11] as any;

    expect(page.chapters).toEqual(['Abhiṣeka']);
    expect(page.number).toBe('8');

    expect(headerCalls.at(-3)).toEqual(['Svastigāthā [Verses of Auspiciousness]']);
    expect(mainCalls.at(-1)).toEqual([
      'पञ्चेन्द्रियावबोधनीये स्वहा । जय जय सुजय॥',
      'pañcendriyāvabodhanīye svāhā । jaya jaya sujaya॥',
    ]);
  });
});
