/*!
 * All the code that follow is
 * Copyright (c) 2015 - 2025 Richard Huang <rickypc@users.noreply.github.com>.
 * All Rights Reserved. Not for reuse without permission.
 */

import { useCallback } from 'react';

/**
 * Custom React hook for handling transport-related operations.
 * @returns {{fetchAsJson: (...args: object[]) => Promise<object>}}
 *   Object containing transport utilities.
 */
export default function useTransport() {
  return {
    fetchAsJson: useCallback(async (...args) => {
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
