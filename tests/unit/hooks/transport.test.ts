/*!
 * Copyright © 2015 Richard Huang <rickypc@users.noreply.github.com>
 * All rights reserved.
 * ----------------------------------------------------------------------------
 * @jest-environment jsdom
 */

import { act, renderHook } from '@testing-library/react';
import useTransport from '@site/src/hooks/transport';

describe('useTransport', () => {
  test('returns parsed JSON when fetch resolves with valid JSON', async () => {
    const mockJson = { data: [1, 2, 3], ok: true };
    const mockResponse = {
      json: jest.fn().mockResolvedValue(mockJson),
    };
    global.fetch = jest.fn().mockResolvedValue(mockResponse);

    const { result } = renderHook(() => useTransport());
    let returned;
    await act(async () => {
      returned = await result.current.fetchAsJson('https://example.com/api', { method: 'GET' });
    });

    expect(global.fetch).toHaveBeenCalledWith('https://example.com/api', { method: 'GET' });
    expect(mockResponse.json).toHaveBeenCalled();
    expect(returned).toEqual(mockJson);
  });

  test('returns empty object when response.json throws (non-JSON body)', async () => {
    const mockResponse = {
      json: jest.fn().mockRejectedValue(new Error('invalid json')),
    };
    global.fetch = jest.fn().mockResolvedValue(mockResponse);

    const { result } = renderHook(() => useTransport());
    let returned;
    await act(async () => {
      returned = await result.current.fetchAsJson('/no-json');
    });

    expect(global.fetch).toHaveBeenCalledWith('/no-json');
    expect(mockResponse.json).toHaveBeenCalled();
    expect(returned).toEqual({});
  });

  test('propagates fetch rejection error (fetch throws)', async () => {
    const fetchError = new Error('network failure');
    global.fetch = jest.fn().mockRejectedValue(fetchError);

    const { result } = renderHook(() => useTransport());

    await expect(
      act(async () => result.current.fetchAsJson('/bad')),
    ).rejects.toThrow('network failure');

    expect(global.fetch).toHaveBeenCalledWith('/bad');
  });
});
