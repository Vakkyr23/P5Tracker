import { DAY_INDEX, DAY_AXIS } from "../data/timeline";

/* Shared current-day plate (v4.0.0, D3) — the P5 date flag for the two
   day-driven tabs. The weekday is DERIVED for display only: the in-game
   dates track the real 2016/17 calendar (Apr 2016 → Mar 2017), so nothing
   is stored and no game data changes. Sun = warm red, Sat = cyan — the
   game's own calendar convention. parseInt per house rule. */
const WEEKDAYS = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

export default function DatePlate({ currentDay }) {
  const [m, d] = String(currentDay || "").split("/").map((n) => parseInt(n, 10));
  if (!m || !d) return null;
  const wd = new Date(m >= 4 ? 2016 : 2017, m - 1, d).getDay();
  const idx = DAY_INDEX[currentDay];
  const chip = wd === 0 ? "pc-sunchip" : wd === 6 ? "pc-satchip" : "";
  return (
    <div className="pc-date" aria-label={`Current day ${currentDay}, ${WEEKDAYS[wd]}`}>
      <span className="pc-date-num">{m}/<b>{d}</b></span>
      <span className="pc-date-side">
        <span className={`pc-chip text-[11px] tracking-wider ${chip}`}><span>{WEEKDAYS[wd]}</span></span>
        {typeof idx === "number" && (
          <span className="pc-date-idx">DAY {idx + 1} / {DAY_AXIS.length}</span>
        )}
      </span>
    </div>
  );
}
