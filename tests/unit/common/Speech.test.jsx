/*!
 * Copyright (c) 2015 - 2025 Richard Huang <rickypc@users.noreply.github.com>.
 * All Rights Reserved. Not for reuse without permission.
 * ----------------------------------------------------------------------------
 * @jest-environment jsdom
 */

import {
  act,
  render,
  fireEvent,
  waitFor,
} from '@testing-library/react';
import '@testing-library/jest-dom';
import Speech from '@site/src/components/common/Speech';
import { useSpeech } from '@site/src/hooks/observer';

jest.mock('react-icons/lib', () => ({
  __esModule: true,
  // eslint-disable-next-line react/display-name,react/function-component-definition
  GenIcon: (config) => (props) => (<svg data-testid={`icon-${config.tag}`} {...props} />),
}));

jest.mock('@site/src/components/common/Button', () => ({
  __esModule: true,
  default: ({
    'aria-label': ariaLabel,
    children,
    className,
    onClick,
    whileTap, // destructure so motion props are not forwarded to DOM
    ...rest
  }) => (
    // eslint-disable-next-line react/button-has-type
    <button className={className} data-testid={`button-${ariaLabel || 'btn'}`} onClick={onClick} {...rest}>
      {children}
    </button>
  ),
}));

jest.mock('@site/src/hooks/observer', () => ({
  __esModule: true,
  useSpeech: jest.fn(),
}));

jest.mock('@theme/Admonition', () => ({
  __esModule: true,
  default: ({ children }) => <div data-testid="admonition">{children}</div>,
}));

/**
 * Creates a fully controlled mock setup for speechSynthesis
 *   and SpeechSynthesisUtterance.
 * @param {object} config - Configuration options for the mock.
 * @param {boolean} [config.initiallyPaused] - Whether the mock synth should
 *   start in a paused state.
 * @param {boolean} [config.initiallySpeaking] - Whether it should start as if
 *   it's already speaking.
 * @param {Array} [config.voices] - An optional list of voice objects to
 *   simulate available voices.
 * @returns {object} A set of speech-related mocks:
 *   - instances: an array of all utterance instances created
 *   - lastUtteranceRef: a function that returns the most recently spoken utterance
 *   - synth: the mocked speechSynthesis object
 *   - UtteranceMock: a constructor for mocked utterances
 */
function createSpeechMocks({
  initiallyPaused = false,
  initiallySpeaking = false,
  voices = [],
} = {}) {
  const instances = [];

  /**
   * A mock constructor for SpeechSynthesisUtterance. Use this to simulate
   * utterance behavior in tests without relying on the browser's native
   * speech synthesis. Each instance tracks the provided text and can be
   * inspected or triggered manually.
   * @class
   * @param {string} text - The text content to be "spoken" by the mock utterance.
   */
  function UtteranceMock(text) {
    instances.push(this);
    // eslint-disable-next-line no-underscore-dangle
    this._listeners = {};
    this.lang = undefined;
    this.pitch = 1;
    this.rate = 1;
    this.text = text;
    this.voice = undefined;
    this.volume = 1;

    this.addEventListener = jest.fn((evt, cb) => {
      // eslint-disable-next-line no-underscore-dangle,security/detect-object-injection
      this._listeners[evt] = this._listeners[evt] || [];
      // eslint-disable-next-line no-underscore-dangle,security/detect-object-injection
      this._listeners[evt].push(cb);
    });

    this.removeEventListener = jest.fn((evt, cb) => {
      // eslint-disable-next-line no-underscore-dangle,security/detect-object-injection
      if (!this._listeners[evt]) {
        return;
      }
      // eslint-disable-next-line no-underscore-dangle,security/detect-object-injection
      this._listeners[evt] = this._listeners[evt].filter((fn) => fn !== cb);
    });

    // Synchronous emit.
    // eslint-disable-next-line no-underscore-dangle
    this._emit = (evt) => {
      // eslint-disable-next-line no-underscore-dangle,security/detect-object-injection
      (this._listeners[evt] || []).slice()
        .forEach((fn) => { try { fn(); } catch { /* no-op. */ } });
    };
  }

  let lastUtterance = null;
  let onvoiceschangedProp = null;
  let voicesChangedCb = null;

  const synth = {
    addEventListener: jest.fn((evt, cb) => {
      if (evt === 'voiceschanged') {
        voicesChangedCb = cb;
      }
    }),
    cancel: jest.fn(async () => {
      const u = lastUtterance;
      lastUtterance = null;
      synth.paused = false;
      synth.speaking = false;
      if (u) {
        // eslint-disable-next-line no-underscore-dangle
        u._emit('end');
      }
    }),
    current: null,
    _emitVoicesChanged: () => {
      if (typeof onvoiceschangedProp === 'function') {
        onvoiceschangedProp();
      }
      if (typeof voicesChangedCb === 'function') {
        voicesChangedCb();
      }
    },
    // eslint-disable-next-line no-underscore-dangle
    getVoices: jest.fn(() => synth._voices),
    _instances: instances,
    _lastUtteranceRef: () => lastUtterance,
    pause: jest.fn(() => {
      if (synth.speaking) {
        synth.paused = true;
        synth.speaking = false;
      }
    }),
    paused: initiallyPaused,
    removeEventListener: jest.fn(),
    resume: jest.fn(() => {
      if (lastUtterance) {
        synth.paused = false;
        synth.speaking = true;
      }
    }),
    speak: jest.fn((u) => {
      lastUtterance = u;
      synth.paused = false;
      synth.speaking = true;
    }),
    speaking: initiallySpeaking,
    _voices: voices,
  };

  // Support synth.onvoiceschanged = cb
  Object.defineProperty(synth, 'onvoiceschanged', {
    configurable: true,
    enumerable: true,
    get: () => onvoiceschangedProp,
    set: (cb) => { onvoiceschangedProp = cb; },
  });

  synth.current = synth;

  return {
    // eslint-disable-next-line no-underscore-dangle
    instances: synth._instances,
    // eslint-disable-next-line no-underscore-dangle
    lastUtteranceRef: synth._lastUtteranceRef,
    synth,
    UtteranceMock,
  };
}

describe('Speech', () => {
  let originalSpeechSynthesis;
  let originalUtterance;
  let mocks;

  beforeEach(() => {
    originalSpeechSynthesis = global.speechSynthesis;
    originalUtterance = global.SpeechSynthesisUtterance;
  });

  afterEach(() => {
    global.speechSynthesis = originalSpeechSynthesis;
    global.SpeechSynthesisUtterance = originalUtterance;
    delete document.documentElement.dataset.volume;
  });

  const clickButtons = async (pair) => {
    const pairs = Array.isArray(pair[0]) ? pair : [pair];
    // Check all buttons exist at the same time.
    for (let i = 0; i < pairs.length; i += 1) {
      // eslint-disable-next-line security/detect-object-injection
      const [btn] = pairs[i];
      expect(btn).toBeInTheDocument();
    }
    await pairs.reduce(async (prev, [btn, expected]) => {
      await prev;
      await act(async () => fireEvent.click(btn));
      expect(expected).toHaveBeenCalled();
    }, Promise.resolve());
  };

  /**
   * Create & install speech mocks.
   * @param {Array} voices - Voices config.
   * @returns {{ instances, lastUtteranceRef, synth, UtteranceMock }} The mocks.
   */
  function setupMocks(voices = []) {
    const result = createSpeechMocks({ voices });
    global.speechSynthesis = result.synth;
    global.SpeechSynthesisUtterance = result.UtteranceMock;
    useSpeech.mockReturnValue([true]);
    return result;
  }

  describe('control flows', () => {
    const expectButtonsRemoved = async (...elements) => waitFor(() => elements
      .forEach((el) => expect(el).toBeNull()));

    // eslint-disable-next-line no-underscore-dangle
    const startUtterance = async (fakes) => act(async () => fakes.instances.at(-1)._emit('start'));

    // eslint-disable-next-line jest/expect-expect
    it('shows Play when idle, can play -> pause -> stop -> controls update', async () => {
      const voices = [
        { name: 'Google Bahasa Indonesia', lang: 'id-ID' },
        { name: 'Damayanti', lang: 'id-ID' },
      ];
      mocks = setupMocks(voices);
      const ui = render(<Speech names={[voices[0].name]}>play test</Speech>);
      // eslint-disable-next-line no-underscore-dangle
      mocks.synth._emitVoicesChanged();

      await clickButtons([await ui.findByTestId('button-Play'), mocks.synth.speak]);
      await startUtterance(mocks);
      await clickButtons([
        [await ui.findByTestId('button-Pause'), mocks.synth.pause],
        [await ui.findByTestId('button-Stop'), mocks.synth.cancel],
      ]);
      await expectButtonsRemoved(ui.queryByTestId('button-Pause'), ui.queryByTestId('button-Stop'));
    });

    // eslint-disable-next-line jest/expect-expect
    it('creates paused state deterministically by driving UI and resumes correctly', async () => {
      const voices = [{ name: 'Damayanti', lang: 'id-ID' }];
      mocks = setupMocks(voices);
      const ui = render(<Speech names={[voices[0].name]}>resume creation test</Speech>);
      // eslint-disable-next-line no-underscore-dangle
      mocks.synth._emitVoicesChanged();

      await clickButtons([await ui.findByTestId('button-Play'), mocks.synth.speak]);
      await startUtterance(mocks);
      await clickButtons([await ui.findByTestId('button-Pause'), mocks.synth.pause]);
      await clickButtons([await ui.findByTestId('button-Resume'), mocks.synth.resume]);
      await clickButtons([
        [await ui.findByTestId('button-Pause'), mocks.synth.pause],
        [await ui.findByTestId('button-Stop'), mocks.synth.cancel],
      ]);
      await expectButtonsRemoved(ui.queryByTestId('button-Pause'), ui.queryByTestId('button-Stop'));
    });
  });

  describe('edge cases', () => {
    it('skips setup when ready is false', () => {
      global.speechSynthesis = undefined;
      global.SpeechSynthesisUtterance = undefined;
      useSpeech.mockReturnValue([false]);

      const { unmount } = render(<Speech>noop</Speech>);
      expect(() => unmount()).not.toThrow();
    });

    it('shows Admonition when no usable voice', async () => {
      mocks = setupMocks([]);
      const ui = render(<Speech>no voice</Speech>);
      // eslint-disable-next-line no-underscore-dangle
      mocks.synth._emitVoicesChanged();

      expect(await ui.findByTestId('admonition')).toHaveTextContent('voice is not available');
    });

    it('assigns utterance.lang and utterance.voice when matching voice found', async () => {
      const voices = [
        { name: 'Google Bahasa Indonesia', lang: 'id-ID' },
        { name: 'Damayanti', lang: 'id-ID' },
      ];
      mocks = setupMocks(voices);
      render(<Speech names={[voices[0].name]}>lang test</Speech>);
      // eslint-disable-next-line no-underscore-dangle
      mocks.synth._emitVoicesChanged();

      await waitFor(() => expect(mocks.instances.length).toBeGreaterThan(0));
      const last = mocks.instances.pop();
      expect(last.lang).toBe(voices[0].lang);
      expect(last.voice.name).toBe(voices[0].name);
    });

    it('respects document.dataset.volume silent override and fallback to provided volume', async () => {
      const voices = [{ name: 'Damayanti', lang: 'id-ID' }];
      // Silent override.
      mocks = setupMocks(voices);
      document.documentElement.dataset.volume = 'silent';
      render((
        <Speech names={[voices[0].name]} volume={0.42}>
          volume test
        </Speech>
      ));
      // eslint-disable-next-line no-underscore-dangle
      mocks.synth._emitVoicesChanged();

      await waitFor(() => expect(mocks.instances.length).toBeGreaterThan(0));
      expect(mocks.instances.pop().volume).toBe(0);

      // Normal case.
      delete document.documentElement.dataset.volume;
      mocks = setupMocks(voices);
      render((
        <Speech names={[voices[0].name]} volume={0.75}>
          volume test 2
        </Speech>
      ));
      // eslint-disable-next-line no-underscore-dangle
      mocks.synth._emitVoicesChanged();

      await waitFor(() => expect(mocks.instances.length).toBeGreaterThan(0));
      expect(mocks.instances.pop().volume).toBeCloseTo(0.75);
    });

    it('registers end/error listeners and cleans up on unmount', async () => {
      const voices = [{ name: 'Google Bahasa Indonesia', lang: 'id-ID' }];
      mocks = setupMocks(voices);
      const ui = render(<Speech names={[voices[0].name]}>end event test</Speech>);
      // eslint-disable-next-line no-underscore-dangle
      mocks.synth._emitVoicesChanged();

      await waitFor(() => expect(mocks.instances.length).toBeGreaterThan(0));
      const last = mocks.instances.pop();

      await waitFor(() => {
        const added = last.addEventListener.mock.calls.map((c) => c[0]);
        expect(added).toEqual(expect.arrayContaining(['end', 'error']));
      });

      await clickButtons([await ui.findByTestId('button-Play'), mocks.synth.speak]);

      // eslint-disable-next-line no-underscore-dangle
      await act(async () => last._emit('end'));
      await waitFor(() => expect(mocks.synth.cancel).toHaveBeenCalled());

      ui.unmount();
      await waitFor(() => {
        const removed = last.removeEventListener.mock.calls.map((c) => c[0]);
        expect(removed).toEqual(expect.arrayContaining(['end', 'error']));
      });
    });
  });

  describe('voice-selection quirks', () => {
    it('handles first lang segment >2 chars (browser inconsistency)', async () => {
      const voices = [
        { name: 'WeirdVoice', lang: 'eng-US' },
        { name: 'Other', lang: 'id-ID' },
      ];
      mocks = setupMocks(voices);
      render(<Speech lang="eng-US">browser inconsistency</Speech>);
      // eslint-disable-next-line no-underscore-dangle
      mocks.synth._emitVoicesChanged();

      await waitFor(() => expect(mocks.instances.length).toBeGreaterThan(0));
      const last = mocks.instances.pop();
      expect(last.lang).toBe('eng-US');
      expect(last.voice.name).toBe('WeirdVoice');
    });

    it('matches underscore-formatted lang by replacing underscores', async () => {
      const voices = [
        { name: 'UnderscoreVoice', lang: 'id_ID' },
        { name: 'Other', lang: 'en-US' },
      ];
      mocks = setupMocks(voices);
      render(<Speech lang="id-ID">underscore branch</Speech>);
      // eslint-disable-next-line no-underscore-dangle
      mocks.synth._emitVoicesChanged();

      await waitFor(() => expect(mocks.instances.length).toBeGreaterThan(0));
      const last = mocks.instances.pop();
      expect(last.lang).toBe(voices[0].lang);
      expect(last.voice.name).toBe('UnderscoreVoice');
    });

    // eslint-disable-next-line jest/expect-expect
    it('executes underscore->hyphen fallback in voices.find', async () => {
      const voices = [
        { name: 'Stub', lang: 'id' },
        { name: 'Indo Underscore', lang: 'id_ID' },
      ];
      mocks = setupMocks(voices);
      const ui = render(<Speech lang="id-ID" names={['UnmatchedName']}>fallback</Speech>);

      await clickButtons([await ui.findByTestId('button-Play'), mocks.synth.speak]);
    });
  });

  describe('onPlay branch', () => {
    // eslint-disable-next-line jest/expect-expect
    it('when already speaking, clicking Play triggers cancel and waits 250ms', async () => {
      jest.useFakeTimers();
      const voices = [{ name: 'CoverageVoice', lang: 'en-US' }];
      mocks = setupMocks(voices);
      const ui = render(<Speech names={[voices[0].name]}>branch coverage</Speech>);
      // eslint-disable-next-line no-underscore-dangle
      mocks.synth._emitVoicesChanged();
      mocks.synth.speaking = true;

      await clickButtons([await ui.findByTestId('button-Play'), mocks.synth.cancel]);
      jest.useRealTimers();
    });
  });

  describe('children.props.children branch', () => {
    // eslint-disable-next-line jest/expect-expect
    it('renders element child text via children.props.children', async () => {
      const voices = [{ name: 'AnyVoice', lang: 'en-US' }];
      mocks = setupMocks([]);
      const ui = render(<Speech lang="en-US"><span>element text</span></Speech>);
      await act(async () => {
        // eslint-disable-next-line no-underscore-dangle
        mocks.synth._voices = voices;
        // eslint-disable-next-line no-underscore-dangle
        mocks.synth._emitVoicesChanged();
      });

      await clickButtons([await ui.findByTestId('button-Play'), mocks.synth.speak]);
    });
  });
});
