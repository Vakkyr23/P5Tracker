import { useState, useEffect } from "react";

/**
 * Drop-in replacement for useState that transparently persists the value to
 * localStorage and restores it on mount. Resilient to unavailable or throwing
 * storage (e.g. private-mode / disabled storage) and to malformed saved JSON.
 *
 * Two encodings:
 *  - default: JSON round-trip (unchanged since v2.x — all tab checklists).
 *  - `{ raw: true }` (v3.7.0): the value is stored/read as a plain string with
 *    NO JSON round-trip. The App-shell keys (p5r_theme, p5r_route, p5r_day,
 *    p5r_activeTab, p5r_reg_subtab, p5r_td_mode) predate this hook and were
 *    always raw strings — keeping that encoding means existing stored values,
 *    old save files, and the smoke suite's raw seeds all stay valid. In raw
 *    mode `initialValue` may be a function `(storedString|null) => value` for
 *    validation or migration of what's on disk (e.g. the shared-day resolver).
 *
 * @param {string} key            Unique localStorage key.
 * @param {*}      initialValue   Value (or raw-mode initializer fn) used when
 *                                nothing valid is stored.
 * @param {{raw?: boolean}} [options]
 */
export function usePersistentState(key, initialValue, { raw = false } = {}) {
  const [value, setValue] = useState(() => {
    try {
      const stored = localStorage.getItem(key);
      if (raw) {
        return typeof initialValue === 'function'
          ? initialValue(stored)
          : (stored !== null ? stored : initialValue);
      }
      return stored !== null ? JSON.parse(stored) : initialValue;
    } catch {
      return raw && typeof initialValue === 'function' ? initialValue(null) : initialValue;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(key, raw ? value : JSON.stringify(value));
    } catch {
      /* storage unavailable — fail silently, app still works in-memory */
    }
  }, [key, raw, value]);

  return [value, setValue];
}
