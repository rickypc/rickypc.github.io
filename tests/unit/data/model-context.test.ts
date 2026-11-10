/*!
 * Copyright © 2015 Richard Huang <rickypc@users.noreply.github.com>
 * All rights reserved.
 */

import { mock } from 'bun:test';
import {
  getModelContext,
  registerTools,
  type ToolDescriptor,
  type ToolOutcome,
} from '@site/src/data/model-context';

const brokenDescriptor = { description: 'x', name: 'broken' } as ToolDescriptor;

const buildTool = (name: string, execute: ToolDescriptor['execute']): ToolDescriptor => ({
  description: 'Returns bounded FAQ entries for the current page.',
  execute,
  inputSchema: {
    properties: { topic: { description: 'Case-insensitive question filter.', type: 'string' } },
    type: 'object',
  },
  name,
});

const consoleErrorOriginal = console.error;

const contextMock = () => ({ registerTool: mock(), unregisterTool: mock() });

const descriptorFrom = (context: ReturnType<typeof contextMock>): ToolDescriptor => {
  const [call] = context.registerTool.mock.calls;
  return (Array.isArray(call) ? call[0] : undefined) as ToolDescriptor;
};

const documentOriginal = globalThis.document;

const installContext = (context: object) => {
  (globalThis as { document?: unknown }).document = { modelContext: context };
};

const removeDocument = () => {
  delete (globalThis as { document?: unknown }).document;
};

afterEach(() => {
  console.error = consoleErrorOriginal;
  if (documentOriginal === undefined) {
    removeDocument();
  } else {
    (globalThis as { document?: unknown }).document = documentOriginal;
  }
});

describe('data.model-context.getModelContext()', () => {
  test('returns the live model context object', () => {
    const context = contextMock();
    installContext(context);

    expect(getModelContext()).toBe(context);
  });

  test('returns undefined without a document', () => {
    removeDocument();

    expect(getModelContext()).toBeUndefined();
  });
});

describe('data.model-context.registerTools()', () => {
  test('forwards each descriptor to the model context, preserving identity fields', () => {
    const context = contextMock();
    installContext(context);
    const registration = registerTools([buildTool('get-faq', () => ({ items: ['a'] }))]);

    expect(registration).toBeInstanceOf(AbortController);
    expect(context.registerTool).toHaveBeenCalledTimes(1);
    const [descriptor, options] = context.registerTool.mock.calls[0] as [
      ToolDescriptor,
      { signal: AbortSignal },
    ];
    expect(descriptor.description).toBe('Returns bounded FAQ entries for the current page.');
    expect(descriptor.inputSchema).toEqual({
      properties: { topic: { description: 'Case-insensitive question filter.', type: 'string' } },
      type: 'object',
    });
    expect(descriptor.name).toBe('get-faq');
    expect(typeof descriptor.execute).toBe('function');
    expect(options.signal).toBeInstanceOf(AbortSignal);
  });

  test('unregisters registered tools when the returned controller aborts', () => {
    const context = contextMock();
    installContext(context);
    const registration = registerTools([
      buildTool('get-faq', () => ({})),
      buildTool('print-resume', () => ({})),
    ]);
    (registration as AbortController).abort();

    expect(context.unregisterTool).toHaveBeenCalledTimes(2);
    expect(context.unregisterTool).toHaveBeenCalledWith('get-faq');
    expect(context.unregisterTool).toHaveBeenCalledWith('print-resume');
  });

  test('survives an abort when the context lacks unregisterTool', () => {
    installContext({ registerTool: mock() });
    const registration = registerTools([buildTool('get-faq', () => ({}))]);

    expect(() => (registration as AbortController).abort()).not.toThrow();
  });

  test('unregisters registered tools when an external signal aborts', () => {
    const context = contextMock();
    installContext(context);
    const external = new AbortController();
    registerTools([buildTool('get-faq', () => ({}))], { signal: external.signal });
    external.abort();

    expect(context.unregisterTool).toHaveBeenCalledWith('get-faq');
  });

  test('no-ops when the model context is absent or lacks a callable registerTool', () => {
    (globalThis as { document?: unknown }).document = {};
    expect(getModelContext()).toBeUndefined();
    expect(registerTools([buildTool('get-faq', () => ({}))])).toBeUndefined();
    installContext({});
    expect(getModelContext()).toEqual({});
    expect(registerTools([buildTool('get-faq', () => ({}))])).toBeUndefined();
  });

  test('no-ops during SSR without a document', () => {
    removeDocument();

    expect(getModelContext()).toBeUndefined();
    expect(registerTools([buildTool('get-faq', () => ({}))])).toBeUndefined();
  });

  test('rejects an invalid tool list with an actionable error', () => {
    const context = contextMock();
    installContext(context);
    const consoleError = mock();
    console.error = consoleError;

    for (const tools of [[brokenDescriptor], [], 'nope'] as Array<unknown>) {
      const result = registerTools(tools as ToolDescriptor[]);
      if (!result || !('error' in result)) {
        throw new Error('registerTools must return a structured error for invalid input');
      }
      expect(result.error).toMatch(/non-empty array/);
    }
    expect(consoleError).toHaveBeenCalledTimes(3);
    expect(consoleError.mock.calls[0]?.[0]).toMatch(/non-empty array/);
    expect(context.registerTool).not.toHaveBeenCalled();
  });

  test('unregisters and reports when a host registration throws mid-list', () => {
    const context = {
      registerTool: mock((descriptor: ToolDescriptor) => {
        if (descriptor.name === 'print-resume') {
          throw new Error('host rejected');
        }
      }),
      unregisterTool: mock(),
    };
    installContext(context);

    const registration = registerTools([
      buildTool('get-faq', () => ({})),
      buildTool('print-resume', () => ({})),
    ]);

    expect(registration).toEqual({ error: 'host rejected' });
    expect(context.unregisterTool).toHaveBeenCalledWith('get-faq');
    expect(context.unregisterTool).not.toHaveBeenCalledWith('print-resume');
  });

  test('survives an unregisterTool that throws during abort', () => {
    const context = {
      registerTool: mock(),
      unregisterTool: mock(() => {
        throw new Error('unregister failed');
      }),
    };
    installContext(context);
    const registration = registerTools([buildTool('get-faq', () => ({}))]);

    expect(() => (registration as AbortController).abort()).not.toThrow();
  });
});

describe('data.model-context.registerTools().execute()', () => {
  test('caps oversized result lists with an explicit truncated flag', async () => {
    const context = contextMock();
    installContext(context);
    const answers = Array.from({ length: 15 }, (_, index) => `answer ${index + 1}`);
    registerTools([buildTool('get-faq', () => ({ items: answers, total: answers.length }))]);
    const outcome = await descriptorFrom(context).execute();

    expect(outcome.items).toEqual(answers.slice(0, 12));
    expect(outcome.total).toBe(15);
    expect(outcome.truncated).toBe(true);
  });

  test('passes bounded results through without a truncated flag', async () => {
    const context = contextMock();
    installContext(context);
    registerTools([buildTool('get-faq', () => ({ items: ['a', 'b'] }))]);
    const outcome = await descriptorFrom(context).execute();

    expect(outcome.items).toEqual(['a', 'b']);
    expect('truncated' in outcome).toBe(false);
  });

  test('keeps the capping flag authoritative over a stale tool flag', async () => {
    const context = contextMock();
    installContext(context);
    const answers = Array.from({ length: 15 }, (_, index) => `answer ${index + 1}`);
    registerTools([buildTool('get-faq', () => ({ items: answers, truncated: false }))]);
    const outcome = await descriptorFrom(context).execute();

    expect(outcome.items).toEqual(answers.slice(0, 12));
    expect(outcome.truncated).toBe(true);
  });

  test('returns an empty outcome when the tool produces no object', async () => {
    const context = contextMock();
    installContext(context);
    registerTools([
      buildTool('get-faq', (() => undefined) as unknown as ToolDescriptor['execute']),
    ]);
    const outcome = await descriptorFrom(context).execute();

    expect(outcome).toEqual({});
  });

  test('rejects non-object arguments with an actionable error without executing', async () => {
    const context = contextMock();
    installContext(context);
    const execute = mock((): ToolOutcome => ({}));
    registerTools([buildTool('get-faq', execute)]);
    const outcome = await descriptorFrom(context).execute('nope' as never);

    expect(outcome.error).toMatch(/expects an object/);
    expect(execute).not.toHaveBeenCalled();
  });

  test('converts thrown errors into a structured error', async () => {
    const context = contextMock();
    installContext(context);
    registerTools([
      buildTool('get-faq', () => {
        throw new Error('boom');
      }),
    ]);
    const outcome = await descriptorFrom(context).execute();

    expect(outcome).toEqual({ error: 'boom' });
  });

  test('swallows an AbortError from the tool as a no-op', async () => {
    const context = contextMock();
    installContext(context);
    registerTools([
      buildTool('get-faq', () => {
        throw Object.assign(new Error('aborted'), { name: 'AbortError' });
      }),
    ]);
    const outcome = await descriptorFrom(context).execute();

    expect(outcome).toEqual({});
  });
});
