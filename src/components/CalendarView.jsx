import { useState, useMemo, useRef } from "react";
import DatePlate from "./DatePlate";
import { usePersistentState } from "../hooks/usePersistentState";
import { useTooltip, tipHandlers, tipCss } from "../hooks/useTooltip";
import { CALENDAR } from "../data/calendarData";
import { DAY_INDEX } from "../data/timeline";
import { STAT, STAT_DESC, ARC_NAME, ROMANCE, routeOf } from "../data/routeData";

/* =========================================================================
   P5R — 100% PHANTOM CHART  ·  Daily Spoiler Calendar
   The curated 297-day walkthrough tab. Chip tooltips (hover/focus) explain
   which Arcana to equip, what a Trophy is, etc. The clickable Route picker
   (default Platonic) adapts the calendar to a romance target — romance ↔
   friendship flags, Christmas partner — with a mid-run warning + live route
   summary. Spoiler modes: Story-Safe / Spoiler-Free / Reveal All.
   State persists via usePersistentState; the current day is the shared
   p5r_day owned by App.
   ========================================================================= */

const CSS = `

.p5x *{ box-sizing:border-box; }
.p5x{
  --fd:'Saira Condensed','Oswald',Impact,sans-serif;
  --fb:'Inter',system-ui,-apple-system,sans-serif;
  font-family:var(--fb); min-height:100%; color:var(--ink);
  background:radial-gradient(120% 60% at 100% 0%, var(--glow) 0%, transparent 55%),
             linear-gradient(160deg, var(--bg2) 0%, var(--bg) 60%);
  padding:18px; letter-spacing:.1px;
}
.p5x[data-theme="royal"]{
  --bg:#08050a; --bg2:#15080c; --surf:#190b10; --surf2:#22101a; --line:#40161f;
  --red:#ff1733; --red2:#c00d1f; --rose:#ff587a; --ink:#f7eef1; --mut:#b58e98;
  --glow:rgba(255,23,51,.16); --shadow:0 14px 34px rgba(0,0,0,.65);
  --stamp:#ff1733; --whitecard:#ffffff; --whiteink:#0a0508;
}
.p5x[data-theme="clinic"]{
  --bg:#090d15; --bg2:#0b1220; --surf:#0f1520; --surf2:#151d2b; --line:#243042;
  --red:#406aff; --red2:#284acd; --rose:#7e9cff; --ink:#e2ecf6; --mut:#8a9ab2;
  --glow:rgba(64,106,255,.12); --shadow:0 10px 26px rgba(0,0,0,.5);
  --stamp:#406aff; --whitecard:#ffffff; --whiteink:#0a1020;
}

.p5x .bar{ display:flex; align-items:center; gap:14px; flex-wrap:wrap; margin-bottom:14px; }
.p5x .logo{ font-family:var(--fd); font-weight:800; font-style:italic; font-size:30px; line-height:.9;
  color:var(--whitecard); background:var(--red); padding:8px 14px 9px; transform:skewX(-9deg);
  box-shadow:var(--shadow); letter-spacing:1px; clip-path:polygon(0 0,100% 0,94% 100%,0% 100%); }
.p5x .logo b{ color:var(--whiteink); }
.p5x .titlewrap{ display:flex; flex-direction:column; }
.p5x .title{ font-family:var(--fd); font-weight:700; font-size:19px; letter-spacing:2px; text-transform:uppercase; }
.p5x .sub{ font-size:11px; color:var(--mut); letter-spacing:3px; text-transform:uppercase; }
.p5x .proto{ font-family:var(--fd); font-size:10px; letter-spacing:2px; color:var(--whiteink);
  background:var(--rose); padding:2px 7px; transform:skewX(-9deg); align-self:center; }
.p5x .spacer{ flex:1 1 auto; }

.p5x .routewrap{ position:relative; }
.p5x button.route{ display:inline-flex; align-items:center; gap:6px; font-family:var(--fd); font-weight:700;
  font-size:13px; letter-spacing:1.5px; text-transform:uppercase; padding:7px 12px; cursor:pointer;
  border:1.5px solid var(--rose); color:var(--rose); background:transparent; transform:skewX(-9deg); }
.p5x button.route:hover{ background:rgba(255,88,122,.10); }
.p5x button.route span{ display:inline-block; transform:skewX(9deg); }
.p5x .backdrop{ position:fixed; inset:0; z-index:40; }
.p5x .picker{ position:absolute; right:0; top:calc(100% + 8px); z-index:50; width:290px; max-width:88vw;
  background:var(--surf); border:1px solid var(--line); border-radius:12px; box-shadow:var(--shadow); padding:8px; }
.p5x .warn{ font-size:11px; line-height:1.5; color:#fbbf24; background:rgba(251,191,36,.08);
  border:1px solid #7a5310; border-radius:8px; padding:8px 10px; margin-bottom:8px; }
.p5x .popt{ display:flex; align-items:center; gap:8px; width:100%; text-align:left; background:transparent;
  border:1px solid transparent; border-radius:8px; padding:7px 9px; cursor:pointer; color:var(--ink); }
.p5x .popt:hover{ background:var(--surf2); }
.p5x .popt.on{ border-color:var(--rose); }
.p5x .popt .pdot{ color:var(--rose); width:14px; text-align:center; }
.p5x .popt .pname{ flex:1; font-size:13px; }
.p5x .popt .parc{ font-size:10px; letter-spacing:1px; text-transform:uppercase; color:var(--mut); }

.p5x .controls{ display:flex; gap:10px; flex-wrap:wrap; align-items:stretch; margin-bottom:12px; }
.p5x .panel{ background:var(--surf); border:1px solid var(--line); border-radius:12px; padding:10px 12px; }
.p5x .panel .lab{ font-size:10px; letter-spacing:2px; text-transform:uppercase; color:var(--mut); margin-bottom:7px; font-weight:700; }
.p5x .seg{ display:inline-flex; gap:4px; }
.p5x .seg button{ font-family:var(--fd); font-weight:700; font-size:12px; letter-spacing:1px; text-transform:uppercase;
  border:1px solid var(--line); background:transparent; color:var(--mut); padding:7px 11px; border-radius:8px; cursor:pointer; transition:all .15s ease; }
.p5x .seg button:hover{ color:var(--ink); border-color:var(--red); }
.p5x .seg button[aria-pressed="true"]{ background:var(--red); color:var(--whitecard); border-color:var(--red); box-shadow:0 4px 14px -4px var(--red); }
.p5x .scrub{ flex:1 1 280px; min-width:240px; }
.p5x .scrub .row{ display:flex; align-items:center; gap:10px; }
.p5x .scrub .at{ font-family:var(--fd); font-weight:800; font-size:22px; line-height:1; white-space:nowrap; }
.p5x .scrub .at small{ display:block; font-size:10px; letter-spacing:2px; color:var(--mut); font-weight:600; }
.p5x .nav{ border:1px solid var(--line); background:var(--surf2); color:var(--ink); width:30px; height:30px; border-radius:8px; cursor:pointer; font-size:16px; }
.p5x .nav:hover{ border-color:var(--red); color:var(--red); }
.p5x input[type=range]{ flex:1; accent-color:var(--red); height:4px; }

.p5x .summary{ font-size:12.5px; line-height:1.5; color:var(--mut); background:var(--surf);
  border-left:3px solid var(--rose); border-radius:0 8px 8px 0; padding:9px 12px; margin-bottom:14px; }
.p5x .summary b{ color:var(--ink); }

.p5x .legend{ display:flex; gap:8px 14px; flex-wrap:wrap; font-size:11px; color:var(--mut);
  background:var(--surf); border:1px dashed var(--line); border-radius:10px; padding:9px 12px; margin-bottom:18px; }
.p5x .legend b{ color:var(--ink); }

.p5x .month{ margin:26px 0 12px; display:flex; align-items:center; gap:12px; }
.p5x .month h2{ font-family:var(--fd); font-weight:800; font-style:italic; font-size:34px; line-height:.85; text-transform:uppercase;
  letter-spacing:1px; margin:0; color:var(--whitecard); background:var(--red); padding:6px 18px 8px; transform:skewX(-9deg);
  clip-path:polygon(0 0,100% 0,96% 100%,0 100%); box-shadow:var(--shadow); }
.p5x .logo,.p5x .month h2,.p5x .seg button[aria-pressed="true"],.p5x .reveal{text-shadow:0 1px 1px rgba(0,0,0,.55);}
.p5x .month .rule{ flex:1; height:3px; background:linear-gradient(90deg,var(--red),transparent); }

.p5x .day{ display:flex; border:1px solid var(--line); border-radius:12px; overflow:hidden; background:var(--surf);
  margin-bottom:11px; box-shadow:var(--shadow); position:relative; animation:rise .35s ease both; }
@keyframes rise{ from{ opacity:0; transform:translateY(8px);} to{ opacity:1; transform:none; } }
.p5x .day.active{ outline:2px solid var(--red); }
.p5x .rail{ width:96px; flex:0 0 96px; background:var(--surf2); border-right:1px solid var(--line);
  display:flex; flex-direction:column; align-items:center; padding:12px 6px; gap:8px; }
.p5x .rail .dnum{ font-family:var(--fd); font-weight:800; font-size:26px; line-height:.9; position:relative; }
.p5x .rail .wd{ font-size:10px; letter-spacing:2px; color:var(--mut); text-transform:uppercase; }
/* v4.0.1 in-list polish — the DatePlate convention lands in the list itself:
   Sun = warm red, Sat = cyan; the active day carries a diamond marker; days
   behind the active day take the game's elapsed slash. Display-only. */
.p5x .day.sun .dnum, .p5x .day.sun .wd{ color:rgb(var(--c-weak)); }
.p5x .day.sat .dnum, .p5x .day.sat .wd{ color:rgb(var(--c-sat)); }
.p5x .day .dia{ position:absolute; top:-3px; right:-13px; width:8px; height:8px; background:var(--red);
  transform:rotate(45deg); box-shadow:1px 1px 0 rgba(0,0,0,.45); }
.p5x .day.elapsed .dnum::after{ content:""; position:absolute; left:-5px; right:-5px; top:52%; height:2px;
  background:var(--red); opacity:.8; transform:rotate(-9deg); pointer-events:none; }
.p5x .day.elapsed .dnum, .p5x .day.elapsed .wd{ opacity:.55; }
.p5x .phase{ font-family:var(--fd); font-weight:700; font-size:10px; letter-spacing:1.5px; text-transform:uppercase; padding:3px 7px; border-radius:5px; color:#fff; }
.p5x .phase.Story{ background:#7c2d12; } .p5x .phase.Palace{ background:#6d28d9; }
.p5x .phase.Free{ background:#0e7490; } .p5x .phase.Boss{ background:var(--red2); } .p5x .phase.Exam{ background:#a16207; }
.p5x .setactive{ font-size:9px; letter-spacing:1px; text-transform:uppercase; color:var(--mut); background:transparent;
  border:1px solid var(--line); border-radius:5px; padding:3px 5px; cursor:pointer; }
.p5x .setactive:hover{ color:var(--red); border-color:var(--red); }

.p5x .body{ flex:1; padding:12px 14px; min-width:0; }
.p5x .grp{ margin-bottom:9px; } .p5x .grp:last-child{ margin-bottom:0; }
.p5x .gl{ font-family:var(--fd); font-weight:700; font-size:11px; letter-spacing:2px; text-transform:uppercase; color:var(--red); display:inline-block; margin-bottom:3px; }
.p5x[data-theme="clinic"] .gl{ color:var(--rose); }
.p5x .ln{ font-size:13.5px; line-height:1.5; padding-left:14px; position:relative; }
.p5x .ln::before{ content:"›"; position:absolute; left:0; color:var(--mut); }
.p5x .ln.story{ color:var(--ink); font-weight:500; } .p5x .ln.mech{ color:var(--ink); } .p5x .ln.info{ color:var(--mut); }
.p5x .check{ display:flex; align-items:center; gap:8px; margin-top:10px; cursor:pointer; user-select:none; width:max-content; }
.p5x .check .box{ width:18px; height:18px; border:2px solid var(--mut); border-radius:5px; display:grid; place-items:center; font-size:13px; color:var(--whitecard); }
.p5x .check.on .box{ background:var(--red); border-color:var(--red); }
.p5x .check .ct{ font-family:var(--fd); font-size:11px; letter-spacing:1.5px; text-transform:uppercase; color:var(--mut); }
.p5x .check.on .ct{ color:var(--red); }

.p5x .chips{ display:flex; flex-wrap:wrap; gap:6px; margin-top:11px; }
.p5x .chip{ display:inline-flex; align-items:center; gap:5px; font-size:11px; font-weight:600; padding:3px 9px; border-radius:999px;
  border:1px solid var(--line); background:var(--surf2); white-space:nowrap; }
.p5x .chip .dot{ width:8px; height:8px; border-radius:50%; }
.p5x .chip.cap{ font-family:var(--fd); letter-spacing:1px; text-transform:uppercase; font-weight:700; }
.p5x .chip.trophy{ color:#f5c542; border-color:#7a5e15; }
.p5x .chip.save{ color:#67e8f9; border-color:#155e6b; }
.p5x .chip.seed{ color:#7ee787; border-color:#1f5a27; }
.p5x .chip.match{ color:#fbbf24; border-color:#7a5310; background:rgba(251,191,36,.08); }
.p5x .chip.deadline{ color:#fff; background:var(--red2); border-color:var(--red); }
.p5x .chip.romance,.p5x .chip.keydate{ color:var(--rose); border-color:var(--rose); background:rgba(255,88,122,.08); }
.p5x .chip.friendship{ color:var(--mut); border-color:var(--line); }
.p5x .chip.weather{ color:#93c5fd; border-color:#1e3a8a; }

.p5x .blurtok{ filter:blur(5px); cursor:pointer; border-radius:3px; background:var(--surf2); transition:filter .25s ease; padding:0 2px; }
.p5x .blurtok:hover{ filter:blur(3px); } .p5x .blurtok.shown{ filter:none; background:transparent; cursor:default; }
.p5x .chips.chipblur{ filter:blur(5px); cursor:pointer; transition:filter .25s ease; }
.p5x .chips.chipblur:hover{ filter:blur(3px); } .p5x .chips.chipblur > *{ pointer-events:none; }

.p5x .locked{ position:relative; flex:1; min-height:108px; display:grid; place-items:center; padding:14px;
  background:repeating-linear-gradient(135deg, var(--surf) 0 18px, var(--surf2) 18px 36px); }
.p5x .locked::after{ content:""; position:absolute; inset:0; pointer-events:none;
  background:linear-gradient(135deg, transparent 46%, var(--red) 46% 54%, transparent 54%); opacity:.16; }
.p5x .stamp{ text-align:center; }
.p5x .stamp .tag{ font-family:var(--fd); font-weight:800; font-style:italic; font-size:18px; letter-spacing:2px; text-transform:uppercase;
  color:var(--stamp); border:2.5px solid var(--stamp); padding:6px 14px; transform:rotate(-6deg); display:inline-block; }
.p5x .stamp .hint{ font-size:11px; color:var(--mut); margin-top:9px; }
.p5x .reveal{ margin-top:10px; font-family:var(--fd); font-weight:700; font-size:12px; letter-spacing:1.5px; text-transform:uppercase;
  background:var(--red); color:var(--whitecard); border:none; padding:8px 16px; border-radius:8px; cursor:pointer; transform:skewX(-9deg); }
.p5x .reveal:hover{ filter:brightness(1.12); }
.p5x .relock{ position:absolute; top:8px; right:10px; font-size:10px; letter-spacing:1px; text-transform:uppercase; color:var(--mut);
  background:transparent; border:1px solid var(--line); border-radius:5px; padding:2px 7px; cursor:pointer; }
.p5x .relock:hover{ color:var(--red); border-color:var(--red); }

.p5x .foot{ margin-top:26px; font-size:11.5px; color:var(--mut); line-height:1.6; border-top:1px solid var(--line); padding-top:14px; }
.p5x .foot b{ color:var(--ink); }

.p5x button:focus-visible, .p5x .check:focus-visible, .p5x .chip:focus-visible, .p5x .phase.hastip:focus-visible{ outline:2px solid var(--rose); outline-offset:2px; }
@media (max-width:560px){
  .p5x .day{ flex-direction:column; }
  .p5x .rail{ width:auto; flex:none; flex-direction:row; border-right:none; border-bottom:1px solid var(--line); }
  .p5x .month h2{ font-size:26px; } .p5x .logo{ font-size:24px; }
}
@media (prefers-reduced-motion:reduce){ .p5x .day{ animation:none; } .p5x .blurtok{ transition:none; } }
` + tipCss(".p5x");



const DAYS = CALENDAR;

function chipTip(c, day) {
  switch (c.k) {
    case "stat": return `${c.s} — ${STAT_DESC[c.s]}.`;
    case "rank": return `${ARC_NAME[c.a] ? ARC_NAME[c.a] + " · " : ""}${c.a}, Rank ${c.r}${c.auto ? " (automatic)" : ""}.`;
    case "trophy": return c.tip || `Trophy: ${c.t}.`;
    case "save": return "Make a backup save — rotate slots so you can always roll back.";
    case "seed": return c.tip || "Will Seeds — collect all 3 in a Palace to craft its accessory + a healing crystal.";
    case "deadline": return c.tip || "Point of no return — finish anything outstanding before this.";
    case "weather": return "Rain — study at the diner for extra Knowledge; the bathhouse boosts Charm/Guts.";
    case "match": {
      const arcs = (day.chips || []).filter((x) => x.k === "rank" && !x.auto).map((x) => x.a);
      const names = arcs.map((a) => ARC_NAME[a]).filter(Boolean);
      if (arcs.length) return `Equip a ${arcs.join(" or ")} Persona before today's hangout${names.length ? ` (${names.join(", ")})` : ""}.`;
      return "Equip a Persona matching today's Confidant before you hang out.";
    }
    case "romance":
    case "friendship":
    case "keydate": return c.tip || null;
    default: return null;
  }
}

const PHASE_TIP = {
  Free: "Free day — spend your time as you like: Confidants, stats, Mementos, shopping.",
  Story: "Story day — scripted events only; no free activities.",
  Palace: "Palace day — infiltration progress. Stock SP items and gear beforehand.",
  Exam: "Exam period — daytime is locked to exams; the correct answers are listed here.",
  Boss: "Boss day — a major fight. Prepare equipment, healing and SP first.",
};

function Chip({ c, day, tipApi }) {
  const tip = chipTip(c, day);
  const H = tipHandlers(tip, tipApi);
  let cls = "chip" + (tip ? " hastip" : "");
  let content = null;
  if (c.k === "stat") { content = <><span className="dot" style={{ background: STAT[c.s] }} />{c.s} +{c.v}</>; }
  else if (c.k === "rank") { cls += " rank cap"; content = <>{c.a} R{c.r}{c.auto ? " ·auto" : ""}</>; }
  else if (c.k === "trophy") { cls += " trophy"; content = <>🏆 {c.t}</>; }
  else if (c.k === "save") { cls += " save"; content = <>💾 Save point</>; }
  else if (c.k === "seed") { cls += " seed"; content = <>🌱 {c.t}</>; }
  else if (c.k === "match") { cls += " match cap"; content = <>⚠ Match Arcana</>; }
  else if (c.k === "deadline") { cls += " deadline cap"; content = <>⏳ {c.t}</>; }
  else if (c.k === "romance") { cls += " romance"; content = <>♥ {c.t}</>; }
  else if (c.k === "friendship") { cls += " friendship"; content = <>○ {c.t}</>; }
  else if (c.k === "keydate") { cls += " keydate cap"; content = <>★ {c.t}</>; }
  else if (c.k === "weather") { cls += " weather"; content = <>☂ {c.t}</>; }
  return <span className={cls} {...H}>{content}</span>;
}

function StoryBlur({ text }) {
  const [shown, setShown] = useState(false);
  return (
    <span className={"blurtok" + (shown ? " shown" : "")} onClick={() => setShown(true)}
      {...(!shown && { role: "button", tabIndex: 0, "aria-label": "Reveal hidden text",
        onKeyDown: (e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); setShown(true); } } })}>
      {text}
    </span>
  );
}
function Group({ label, lines, blur }) {
  if (!lines || !lines.length) return null;
  return (
    <div className="grp"><span className="gl">{label}</span>
      {lines.map(([type, text], i) => (
        <div key={i} className={"ln " + type}>{blur ? <StoryBlur text={text} /> : text}</div>
      ))}
    </div>
  );
}

function BlurChips({ chips, day, tipApi }) {
  const [shown, setShown] = useState(false);
  return (
    <div className={"chips" + (shown ? "" : " chipblur")} onClick={() => !shown && setShown(true)}
      {...(!shown && { role: "button", tabIndex: 0, "aria-label": "Reveal hidden chips",
        onKeyDown: (e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); setShown(true); } } })}>
      {chips.map((c, i) => <Chip key={i} c={c} day={day} tipApi={tipApi} />)}
    </div>
  );
}

function DayCard({ day, locked, blur, isActive, elapsed, checked, route, onCheck, onUnlock, onRelock, onSetActive, tipApi }) {
  const extra = [];
  if (day.romanceRank) {
    const selArc = routeOf(route).arcana;
    const who = ARC_NAME[day.romanceRank] || day.romanceRank;
    if (selArc === day.romanceRank)
      extra.push({ k: "romance", t: "Romance — pick “I love you”", tip: `You're romancing ${who}. The Lover line commits you; the Confidant still maxes either way.` });
    else
      extra.push({ k: "friendship", t: "Friendship — platonic line", tip: `Not romancing ${who} on this route — choose the friendship reply to stay friends.` });
  }
  if (day.christmas) {
    if (route !== "Platonic") {
      const nm = routeOf(route).name.split(" ")[0];
      extra.push({ k: "keydate", t: `Christmas · ${nm}`, tip: `Spend 12/24 with ${routeOf(route).name}; you receive a key item that boosts matching-Arcana XP and carries to NG+.` });
    } else {
      extra.push({ k: "keydate", t: "Christmas · solo", tip: "Platonic route: no romance partner on 12/24, so no XP-boost key item this run." });
    }
  }
  const allChips = [...day.chips, ...extra];
  const phaseTip = locked
    ? "Locked — beyond your active day. Set this day active or reveal it to view."
    : (PHASE_TIP[day.phase] || null);

  return (
    <div className={"day" + (isActive ? " active" : "") + (elapsed ? " elapsed" : "") + (day.wd === "Sun" ? " sun" : day.wd === "Sat" ? " sat" : "")}>
      <div className="rail">
        <div>
          <div className="dnum">
            {isActive && <span className="dia" aria-hidden="true" />}
            {day.date.split("/")[1]}
          </div>
          <div className="wd">{day.wd}</div>
        </div>
        <span className={"phase " + day.phase + (phaseTip ? " hastip" : "")} {...tipHandlers(phaseTip, tipApi)}>{locked ? "???" : day.phase}</span>
        {isActive
          ? <span className="setactive" style={{ color: "var(--red)", borderColor: "var(--red)" }}>You are here</span>
          : <button className="setactive" onClick={onSetActive}>Set active</button>}
      </div>

      {locked ? (
        <div className="locked">
          <div className="stamp">
            <div className="tag">Spoiler Locked</div>
            <div className="hint">Beyond your current day — story <em>and</em> mechanics hidden.</div>
            <button className="reveal" onClick={onUnlock}>Reveal anyway</button>
          </div>
        </div>
      ) : (
        <div className="body">
          {day._peeked && <button className="relock" onClick={onRelock}>Re-hide</button>}
          <Group label="Day" lines={day.d} blur={blur} />
          <Group label="Night" lines={day.n} blur={blur} />
          <Group label="Notes" lines={day.x} blur={blur} />
          {allChips.length > 0 && (blur
            ? <BlurChips chips={allChips} day={day} tipApi={tipApi} />
            : <div className="chips">{allChips.map((c, i) => <Chip key={i} c={c} day={day} tipApi={tipApi} />)}</div>)}
          <div className={"check" + (checked ? " on" : "")} role="checkbox" aria-checked={!!checked} tabIndex={0}
            onClick={onCheck} onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); onCheck(); } }}>
            <span className="box">{checked ? "✓" : ""}</span>
            <span className="ct">{checked ? "Day complete" : "Mark day complete"}</span>
          </div>
        </div>
      )}
    </div>
  );
}

export default function CalendarView({ theme = "royal", route = "Platonic", setRoute = () => {}, currentDay = "4/9", setCurrentDay = () => {} }) {
  const [mode, setMode] = usePersistentState("p5r_cal_mode", "safe");
  const [checked, setChecked] = usePersistentState("p5r_cal_checked", {});
  const [peeked, setPeeked] = usePersistentState("p5r_cal_peeked", {});
  const [pickerOpen, setPickerOpen] = useState(false);
  // Route-picker keyboard nav (v3.7.0): Arrow keys move focus among the
  // role="menuitemradio" options (wrapping; ArrowDown from the trigger enters
  // the list), Home/End jump, Escape closes and returns focus to the trigger.
  const routeBtnRef = useRef(null);
  const pickerRef = useRef(null);
  const onPickerKeys = (e) => {
    if (!pickerOpen) return;
    if (e.key === "Escape") {
      e.preventDefault();
      setPickerOpen(false);
      routeBtnRef.current?.focus();
      return;
    }
    const opts = pickerRef.current ? [...pickerRef.current.querySelectorAll(".popt")] : [];
    if (!opts.length) return;
    const i = opts.indexOf(document.activeElement);
    const focusAt = (j) => opts[(j + opts.length) % opts.length].focus();
    if (e.key === "ArrowDown") { e.preventDefault(); focusAt(i === -1 ? 0 : i + 1); }
    else if (e.key === "ArrowUp") { e.preventDefault(); focusAt(i === -1 ? opts.length - 1 : i - 1); }
    else if (e.key === "Home") { e.preventDefault(); focusAt(0); }
    else if (e.key === "End") { e.preventDefault(); focusAt(opts.length - 1); }
  };
  const { tip, tipApi, bubbleRef } = useTooltip();

  const months = useMemo(() => {
    const m = [];
    DAYS.forEach((day, idx) => {
      const last = m[m.length - 1];
      if (!last || last.name !== day.month) m.push({ name: day.month, items: [{ day, idx }] });
      else last.items.push({ day, idx });
    });
    return m;
  }, []);

  // The shared day may be a date the curated calendar skips (e.g. 12/26–29);
  // map it to the latest calendar day at or before it.
  const activeIdx = useMemo(() => {
    const target = DAY_INDEX[currentDay] ?? 0;
    let best = 0;
    for (let i = 0; i < DAYS.length; i++) {
      if ((DAY_INDEX[DAYS[i].date] ?? 0) <= target) best = i; else break;
    }
    return best;
  }, [currentDay]);
  const setActiveIdx = (v) => {
    const idx = typeof v === "function" ? v(activeIdx) : v;
    setCurrentDay(DAYS[Math.max(0, Math.min(DAYS.length - 1, idx))].date);
  };

  const active = DAYS[activeIdx];
  const R = routeOf(route);

  return (
    <div className="p5x" data-theme={theme}>
      <style>{CSS}</style>

      <div className="bar">
        <div className="logo">P5<b>R</b></div>
        <DatePlate currentDay={currentDay} />
        <div className="titlewrap">
          <div className="title">100% Phantom Chart</div>
          <div className="sub">Integrated Strategy Compendium</div>
        </div>
        <div className="spacer" />
        <div className="routewrap" onKeyDown={onPickerKeys}>
          <button ref={routeBtnRef} className="route" onClick={() => setPickerOpen((o) => !o)} aria-expanded={pickerOpen} aria-haspopup="menu">
            <span>♥ Route · {R.name.split(" ")[0]}</span>
          </button>
          {pickerOpen && (
            <>
              <div className="backdrop" onClick={() => setPickerOpen(false)} />
              <div ref={pickerRef} className="picker" role="menu">
                <div className="warn">⚠ Set this before your first romance rank-up. In game, a romance locks once you pick the Lover line — switching targets later (or dating several) triggers the Valentine's confrontation and can desync this tracker.</div>
                {ROMANCE.map((r) => (
                  <button key={r.key} role="menuitemradio" aria-checked={route === r.key}
                    className={"popt" + (route === r.key ? " on" : "")}
                    onClick={() => { setRoute(r.key); setPickerOpen(false); }}>
                    <span className="pdot">{route === r.key ? "●" : "○"}</span>
                    <span className="pname">{r.name}</span>
                    <span className="parc">{r.arcana || "—"}</span>
                  </button>
                ))}
              </div>
            </>
          )}
        </div>
      </div>

      <div className="controls">
        <div className="panel">
          <div className="lab">Spoiler mode</div>
          <div className="seg">
            <button aria-pressed={mode === "safe"} onClick={() => setMode("safe")}>Story-Safe</button>
            <button aria-pressed={mode === "free"} onClick={() => setMode("free")}>Spoiler-Free</button>
            <button aria-pressed={mode === "all"} onClick={() => setMode("all")}>Reveal All</button>
          </div>
        </div>
        <div className="panel scrub">
          <div className="lab">Your progress (active day)</div>
          <div className="row">
            <button className="nav" onClick={() => setActiveIdx((i) => Math.max(0, i - 1))} aria-label="Previous day">‹</button>
            <div className="at">{active.date}<small>{active.wd} · {active.month}</small></div>
            <input type="range" min={0} max={DAYS.length - 1} value={activeIdx} onChange={(e) => setActiveIdx(Number(e.target.value))} aria-label="Active day" />
            <button className="nav" onClick={() => setActiveIdx((i) => Math.min(DAYS.length - 1, i + 1))} aria-label="Next day">›</button>
          </div>
        </div>
      </div>

      <div className="summary">
        {route === "Platonic"
          ? <>Platonic route — you'll choose the <b>friendship</b> line with everyone, and spend 12/24 with no romance partner (no XP-boost item).</>
          : <>Romancing <b>{R.name}</b> ({R.arcana}). The Lover choice appears at <b>Rank 9</b>{R.note ? ` — ${R.note}` : ""}. Christmas 12/24 → <b>{R.name.split(" ")[0]}</b>.</>}
      </div>

      <div className="legend">
        <span><b>Story-Safe</b> locks every day after your active day (story + mechanics).</span>
        <span><b>Spoiler-Free</b> blurs every day after your active day (tap any line or chip to peek); past &amp; current days stay clear.</span>
        <span><b>Hover any chip</b> for details: which Arcana to equip, what a Trophy unlocks, etc.</span>
      </div>

      {months.map((mo) => (
        <section key={mo.name}>
          <div className="month"><h2>{mo.name}</h2><div className="rule" /></div>
          {mo.items.map(({ day, idx }) => {
            const locked = mode === "safe" && idx > activeIdx && !peeked[day.id];
            return (
              <DayCard key={day.id}
                day={{ ...day, _peeked: !!peeked[day.id] && idx > activeIdx }}
                locked={locked} blur={mode === "free" && idx > activeIdx} isActive={idx === activeIdx}
                elapsed={idx < activeIdx}
                checked={!!checked[day.id]} route={route}
                onCheck={() => setChecked((s) => ({ ...s, [day.id]: !s[day.id] }))}
                onUnlock={() => setPeeked((s) => ({ ...s, [day.id]: true }))}
                onRelock={() => setPeeked((s) => ({ ...s, [day.id]: false }))}
                onSetActive={() => setActiveIdx(idx)}
                tipApi={tipApi} />
            );
          })}
        </section>
      ))}

      <div className="foot">Daily walkthrough built from the allchart spine · {DAYS.length} days · JP-verified stat values. Will Seeds and the Fusion Path live in the <b>Metaverse</b> tab.</div>

      {tip && <div ref={bubbleRef} className="tipbubble" style={{ left: tip.x, top: tip.y }}>{tip.text}</div>}
    </div>
  );
}
