// Canonical day spine for the whole run — every in-game date from 4/9 to 2/3.
// Single source of truth for "your current day", shared by the Calendar and the
// Command Suite so both stay in sync. The Calendar renders a curated subset of
// these dates; it maps the shared date to its nearest curated day.

const MONTH_LENGTHS = [
  [4, 30], [5, 31], [6, 30], [7, 31], [8, 31], [9, 30],
  [10, 31], [11, 30], [12, 31], [1, 31], [2, 3]
];

export const DAY_AXIS = (() => {
  const axis = [];
  MONTH_LENGTHS.forEach(([month, len], i) => {
    for (let d = (i === 0 ? 9 : 1); d <= len; d++) axis.push(`${month}/${d}`);
  });
  return axis;
})();

// date string -> global index (0-based, game order)
export const DAY_INDEX = Object.fromEntries(DAY_AXIS.map((date, i) => [date, i]));

export const GAME_START = DAY_AXIS[0]; // "4/9"

export const isValidDay = (date) => Object.prototype.hasOwnProperty.call(DAY_INDEX, date);

export const clampIdx = (idx) => Math.max(0, Math.min(DAY_AXIS.length - 1, idx));

export const idxToDate = (idx) => DAY_AXIS[clampIdx(idx)];

export const dateToIdx = (date) => DAY_INDEX[date] ?? 0;
