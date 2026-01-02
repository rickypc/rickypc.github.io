/*!
 * Copyright © 2015 Richard Huang <rickypc@users.noreply.github.com>
 * All rights reserved.
 */

import { useCallback } from 'react';

/**
 * Custom React hook for handling transport-related operations.
 * @returns {{fetchAsJson: (...args: object[]) => Promise<object>}}
 *   Object containing transport utilities.
 */
export default function useTransport() {
  return {
    fetchAsJson: useCallback(async (...args: Parameters<typeof fetch>): Promise<Response | {}> => {
      let json = {};
      const result = await fetch(...args);
      try {
        json = await result.json();
      } catch {
        // no-op.
      }
      return json;
    }, []),
  };
}
