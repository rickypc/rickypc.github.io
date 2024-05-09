/*!
 * All the code that follow is
 * Copyright (c) 2015 - 2024 Richard Huang <rickypc@users.noreply.github.com>.
 * All Rights Reserved. Not for reuse without permission.
 */

import { useCallback } from 'react';

export default function useTransport() {
  return {
    fetchAsJson: useCallback(async (...args) => {
      let json = {};
      const result = await fetch(...args);
      try {
        json = await result.json();
      } catch (_) {
        // no-op.
      }
      return json;
    }, []),
  };
}
