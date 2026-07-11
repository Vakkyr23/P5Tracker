import { usePersistentState } from "../hooks/usePersistentState";
import { FUSION_PATH as FUSION, PALACE_WINDOWS } from "../data/fusionPathData";
import { WILL_SEEDS as WILL } from "../data/willSeedData";
import { NGPLUS, ROMANCE_ROSTER as ROSTER } from "../data/ngplusData";
import { PERSONA_DATA } from "../data/personaData";
import { dateToIdx } from "../data/timeline";
import { useTooltip, tipHandlers, tipCss } from "../hooks/useTooltip";
/* P5R — METAVERSE AIDS + NG+: Fusion Path (with Compendium sync) · Will Seed Locator · NG+ Planner. */

// Palaces in Fusion-Path order (first appearance), for the "By palace" sort.
const PAL_ORDER = FUSION.reduce((a, f) => (a.includes(f.palace) ? a : [...a, f.palace]), []);

const CSS = `
.p5m *{box-sizing:border-box;}
.p5m{--fd:'Saira Condensed',Impact,sans-serif;--fb:'Inter',system-ui,sans-serif;font-family:var(--fb);min-height:100%;color:var(--ink);background:radial-gradient(120% 60% at 100% 0%,var(--glow) 0%,transparent 55%),linear-gradient(160deg,var(--bg2) 0%,var(--bg) 60%);padding:18px;}
.p5m[data-theme="royal"]{--bg:#08050a;--bg2:#15080c;--surf:#190b10;--surf2:#22101a;--line:#40161f;--red:#ff1733;--red2:#c00d1f;--rose:#ff587a;--ink:#f7eef1;--mut:#b58e98;--glow:rgba(255,23,51,.16);--shadow:0 12px 30px rgba(0,0,0,.6);--wc:#fff;--wi:#0a0508;--good:#7ee787;}
.p5m[data-theme="clinic"]{--bg:#090d15;--bg2:#0b1220;--surf:#0f1520;--surf2:#151d2b;--line:#243042;--red:#406aff;--red2:#284acd;--rose:#7e9cff;--ink:#e2ecf6;--mut:#8a9ab2;--glow:rgba(64,106,255,.12);--shadow:0 10px 24px rgba(0,0,0,.5);--wc:#fff;--wi:#0a1020;--good:#7ee787;}
.p5m .bar{display:flex;align-items:center;gap:14px;flex-wrap:wrap;margin-bottom:14px;}
.p5m .logo{font-family:var(--fd);font-weight:800;font-style:italic;font-size:30px;color:var(--wc);background:var(--red);padding:8px 14px 9px;transform:skewX(-9deg);box-shadow:var(--shadow);clip-path:polygon(0 0,100% 0,94% 100%,0 100%);}
.p5m .logo b{color:var(--wi);}
.p5m .title{font-family:var(--fd);font-weight:700;font-size:19px;letter-spacing:2px;text-transform:uppercase;}
.p5m .sub{font-size:11px;color:var(--mut);letter-spacing:3px;text-transform:uppercase;}
.p5m .spacer{flex:1;}
.p5m .toggle{display:inline-flex;gap:4px;}
.p5m .toggle button{font-family:var(--fd);font-weight:700;font-size:12px;letter-spacing:1px;text-transform:uppercase;border:1px solid var(--line);background:transparent;color:var(--mut);padding:7px 11px;border-radius:8px;cursor:pointer;}
.p5m .toggle button[aria-pressed="true"]{background:var(--red);color:var(--wc);border-color:var(--red);}
.p5m .tabs{display:flex;gap:6px;flex-wrap:wrap;margin-bottom:16px;}
.p5m .tabbtn{font-family:var(--fd);font-weight:700;font-size:13px;letter-spacing:1.5px;text-transform:uppercase;border:1px solid var(--line);background:var(--surf);color:var(--mut);padding:9px 16px;border-radius:10px;cursor:pointer;}
.p5m .tabbtn:hover{color:var(--ink);border-color:var(--red);}
.p5m .tabbtn[aria-pressed="true"]{background:var(--red);color:var(--wc);border-color:var(--red);box-shadow:0 5px 16px -5px var(--red);}
.p5m .note{font-size:12px;color:var(--mut);background:var(--surf);border-left:3px solid var(--rose);border-radius:0 8px 8px 0;padding:9px 12px;margin-bottom:14px;line-height:1.5;}
.p5m .note b{color:var(--ink);}
.p5m .box{width:19px;height:19px;border:2px solid var(--mut);border-radius:5px;display:grid;place-items:center;font-size:13px;color:var(--wc);cursor:pointer;flex:0 0 auto;}
.p5m .box.on{background:var(--red);border-color:var(--red);}
.p5m .grow{flex:1;min-width:0;}
.p5m .fus{display:flex;align-items:center;gap:11px;background:var(--surf);border:1px solid var(--line);border-radius:10px;padding:10px 12px;margin-bottom:7px;box-shadow:var(--shadow);}
.p5m .step{font-family:var(--fd);font-weight:800;font-size:18px;color:var(--mut);min-width:26px;text-align:center;}
.p5m .res{font-family:var(--fd);font-weight:800;font-size:16px;}
.p5m .achip{font-size:10px;font-weight:700;letter-spacing:.5px;text-transform:uppercase;border:1px solid var(--rose);color:var(--rose);border-radius:99px;padding:1px 8px;margin-left:8px;}
.p5m .rec{font-size:12px;color:var(--mut);margin-top:2px;}
.p5m .altb{font-size:9px;font-weight:700;text-transform:uppercase;color:#fbbf24;border:1px solid #7a5310;border-radius:5px;padding:1px 6px;margin-left:6px;}
.p5m .pal{margin-bottom:16px;}
.p5m .pal.away{opacity:.5;}
.p5m .palhd{display:flex;align-items:center;gap:10px;margin-bottom:8px;flex-wrap:wrap;}
.p5m .palhd h3{font-family:var(--fd);font-weight:800;font-style:italic;font-size:20px;text-transform:uppercase;margin:0;color:var(--wc);background:var(--red);padding:4px 13px 6px;transform:skewX(-9deg);clip-path:polygon(0 0,100% 0,95% 100%,0 100%);}
.p5m .logo,.p5m .palhd h3,.p5m .tabbtn[aria-pressed="true"],.p5m .toggle button[aria-pressed="true"]{text-shadow:0 1px 1px rgba(0,0,0,.55);}
.p5m .palct{font-family:var(--fd);font-size:12px;color:var(--mut);}
.p5m .nowtag{font-family:var(--fd);font-weight:800;font-size:10px;letter-spacing:1.5px;text-transform:uppercase;color:var(--wi);background:var(--good);padding:3px 8px;border-radius:6px;}
.p5m .seed{display:flex;align-items:flex-start;gap:11px;background:var(--surf);border:1px solid var(--line);border-radius:10px;padding:10px 12px;margin-bottom:7px;}
.p5m .seed .h{font-size:12.5px;line-height:1.45;}
.p5m .cols{display:flex;gap:12px;flex-wrap:wrap;margin-bottom:14px;}
.p5m .col{flex:1;min-width:240px;background:var(--surf);border:1px solid var(--line);border-radius:12px;padding:12px 14px;box-shadow:var(--shadow);}
.p5m .col h4{font-family:var(--fd);font-weight:800;font-style:italic;font-size:16px;text-transform:uppercase;margin:0 0 8px;}
.p5m .col.keep h4{color:#7ee787;} .p5m .col.reset h4{color:var(--red);}
.p5m .col li{font-size:12.5px;line-height:1.5;margin-bottom:6px;color:var(--ink);list-style:none;padding-left:16px;position:relative;}
.p5m .col li::before{content:"›";position:absolute;left:0;color:var(--mut);}
.p5m .tips{background:var(--surf);border:1px dashed var(--line);border-radius:10px;padding:11px 13px;margin-bottom:16px;list-style:none;}
.p5m .tips li{font-size:12px;color:var(--mut);line-height:1.5;margin-bottom:5px;}
.p5m .rrow{display:flex;align-items:center;gap:11px;background:var(--surf);border:1px solid var(--line);border-radius:10px;padding:10px 12px;margin-bottom:7px;box-shadow:var(--shadow);}
.p5m .rname{font-weight:600;font-size:13.5px;}
.p5m .rarc{font-family:var(--fd);font-size:11px;letter-spacing:1px;text-transform:uppercase;color:var(--mut);}
.p5m .rdate{font-family:var(--fd);font-weight:700;font-size:13px;color:var(--rose);min-width:48px;text-align:right;}
.p5m .st{font-family:var(--fd);font-weight:700;font-size:11px;letter-spacing:1px;text-transform:uppercase;border-radius:7px;padding:5px 10px;cursor:pointer;border:1px solid var(--line);min-width:84px;text-align:center;}
.p5m .st.none{color:var(--mut);} .p5m .st.done{color:#7ee787;border-color:#1f5a27;background:rgba(126,231,135,.08);}
.p5m .st.ngp{color:var(--rose);border-color:var(--rose);background:rgba(255,88,122,.08);} .p5m .st.vid{color:#93c5fd;border-color:#1e3a8a;}
.p5m .summary{font-family:var(--fd);font-size:13px;letter-spacing:1px;text-transform:uppercase;color:var(--mut);margin:0 0 12px;} .p5m .summary b{color:var(--rose);}
.p5m .foot{margin-top:24px;font-size:11.5px;color:var(--mut);line-height:1.6;border-top:1px solid var(--line);padding-top:14px;} .p5m .foot b{color:var(--ink);}
.p5m button:focus-visible,.p5m .box:focus-visible{outline:2px solid var(--rose);outline-offset:2px;}
/* --- Metaverse Sync additions --- */
.p5m .fbar{display:flex;align-items:center;gap:10px;flex-wrap:wrap;margin-bottom:13px;}
.p5m .flab{font-family:var(--fd);font-size:11px;letter-spacing:1.5px;text-transform:uppercase;color:var(--mut);}
.p5m .fseg{display:inline-flex;border:1px solid var(--line);border-radius:9px;overflow:hidden;}
.p5m .fseg button{font-family:var(--fd);font-weight:700;font-size:12px;letter-spacing:1px;text-transform:uppercase;background:var(--surf);color:var(--mut);padding:7px 13px;border:0;cursor:pointer;}
.p5m .fseg button[aria-pressed="true"]{background:var(--red);color:var(--wc);text-shadow:0 1px 1px rgba(0,0,0,.55);}
.p5m .fseg button:not(:last-child){border-right:1px solid var(--line);}
.p5m .compstrip{display:flex;align-items:center;gap:14px;flex-wrap:wrap;background:linear-gradient(160deg,var(--surf2),var(--surf));border:1px solid var(--line);border-radius:12px;padding:12px 16px;margin-bottom:13px;box-shadow:var(--shadow);}
.p5m .metric{display:flex;flex-direction:column;gap:1px;}
.p5m .metric .n{font-family:var(--fd);font-weight:800;font-size:23px;color:var(--wc);line-height:1;}
.p5m .metric .n b{color:var(--rose);}
.p5m .metric .kk{font-size:10px;letter-spacing:1.5px;text-transform:uppercase;color:var(--mut);}
.p5m .compstrip .vr{width:1px;align-self:stretch;background:var(--line);}
.p5m .compstrip .chint{flex:1;min-width:150px;font-size:11.5px;color:var(--mut);line-height:1.5;}
.p5m .stamp{flex:0 0 auto;display:grid;place-items:center;width:32px;height:28px;background:var(--good);clip-path:polygon(0 0,100% 0,86% 100%,0 100%);transform:skewX(-9deg);box-shadow:0 4px 12px -4px rgba(126,231,135,.55);}
.p5m .stamp span{transform:skewX(9deg);color:var(--wi);font-weight:900;font-size:17px;line-height:1;}
@media(max-width:560px){.p5m .logo{font-size:24px;}.p5m .palhd h3{font-size:17px;}.p5m .metric .n{font-size:20px;}}
` + tipCss(".p5m");

function FusionRow({ f, idx, on, onToggle, registered, tipApi }) {
  return (
    <div className="fus">
      <div className={"box" + (on ? " on" : "")} role="checkbox" aria-checked={on} aria-label={"Fusion step " + (idx + 1) + ": " + f.result} tabIndex={0}
        onClick={() => onToggle(idx, f)}
        onKeyDown={e => (e.key === "Enter" || e.key === " ") && (e.preventDefault(), onToggle(idx, f))}>{on ? "\u2713" : ""}</div>
      <div className="step">{idx + 1}</div>
      <div className="grow">
        <span className="res">{f.result}</span><span className="achip">{f.arcana} {f.level}</span>{f.alt && <span className="altb hastip" {...tipHandlers("Off-path alternative — a substitute fusion if you've strayed from the recommended order.", tipApi)}>alt</span>}
        <div className="rec">&#8592; {f.recipe}</div>
      </div>
      {registered && <div className="stamp" role="img" aria-label="Registered in the Compendium"><span>&#10003;</span></div>}
    </div>
  );
}

function FusionPath({ checked, onToggle, checkedItems, currentDay, sort, setSort, tipApi }) {
  const isReg = name => !!checkedItems?.[`p_${name}`];
  const fusionDone = FUSION.filter((_, i) => checked["f" + i]).length;
  const pathReg = FUSION.filter(f => isReg(f.result)).length;
  const totalReg = PERSONA_DATA.registry.filter(p => isReg(p.name)).length;
  const regTotal = PERSONA_DATA.registry.length;

  // Which Fusion-Path Palace (if any) is open on the shared current day.
  const dayIdx = currentDay ? dateToIdx(currentDay) : -1;
  const activePalace = dayIdx < 0 ? null : PAL_ORDER.find(p => {
    const w = PALACE_WINDOWS[p];
    return w && dateToIdx(w.open) <= dayIdx && dayIdx <= dateToIdx(w.close);
  });

  const rows = items => items.map(({ f, i }) => (
    <FusionRow key={i} f={f} idx={i} on={!!checked["f" + i]} onToggle={onToggle} registered={isReg(f.result)} tipApi={tipApi} />
  ));
  const indexed = FUSION.map((f, i) => ({ f, i }));

  return (
    <div>
      <div className="compstrip">
        <div className="metric"><span className="n">{fusionDone}<b>/{FUSION.length}</b></span><span className="kk">Fusion Path</span></div>
        <div className="vr" />
        <div className="metric"><span className="n">{pathReg}<b>/{FUSION.length}</b></span><span className="kk">Registered</span></div>
        <div className="vr" />
        <div className="metric"><span className="n">{totalReg}<b>/{regTotal}</b></span><span className="kk">Compendium</span></div>
        <div className="chint">Checking a step registers its result Persona in the Compendium. The path reaches {FUSION.length} of {regTotal} &mdash; catch or fuse the rest, then tick them in the Persona Registry.</div>
      </div>

      <div className="fbar">
        <span className="flab">Sort</span>
        <div className="fseg">
          <button aria-pressed={sort === "flat"} onClick={() => setSort("flat")}>Path order</button>
          <button aria-pressed={sort === "palace"} onClick={() => setSort("palace")}>By palace</button>
        </div>
      </div>

      <div className="note">Follow these in order as you progress &mdash; they unlock the Confidant ultimate Personas and fill the Compendium efficiently. For anything <b>off-path</b> (skill inheritance, build-crafting), use a community fusion calculator.</div>

      {sort === "flat" && rows(indexed)}

      {sort === "palace" && PAL_ORDER.map(p => {
        const steps = indexed.filter(o => o.f.palace === p);
        const w = PALACE_WINDOWS[p];
        const isNow = activePalace === p;
        return (
          <div className={"pal" + (activePalace && !isNow ? " away" : "")} key={p}>
            <div className="palhd">
              <h3>{p.split(" (")[0]}</h3>
              {w && <span className="palct">{w.open} &ndash; {w.close} &middot; {steps.length} step{steps.length > 1 ? "s" : ""}</span>}
              {isNow && <span className="nowtag">Available now</span>}
            </div>
            {rows(steps)}
          </div>
        );
      })}
    </div>
  );
}

function WillSeeds({ checked, toggle }) {
  return (<div>
    <div className="note">All 24 Will Seeds, three per Palace. Each set fuses into a crystal &mdash; trade it to <b>Jose</b> in Mementos for that Palace's accessory. None are missable, and the 8th Palace has none.</div>
    {WILL.map((p, pi) => (
      <div className="pal" key={pi}>
        <div className="palhd"><h3>{p.palace}</h3><span className="palct">{p.month} &middot; {p.seeds.length} listed</span></div>
        {p.seeds.map((s, si) => { const id = "w" + pi + "_" + si; const on = !!checked[id]; return (
          <div className="seed" key={si}><div className={"box" + (on ? " on" : "")} role="checkbox" aria-checked={on} aria-label={s} tabIndex={0} onClick={() => toggle(id)} onKeyDown={e => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); toggle(id); } }}>{on ? "\u2713" : ""}</div><div className="h">{s}</div></div>); })}
      </div>))}
  </div>);
}

function NGPlanner({ status, cycle }) {
  const ST = ["none", "done", "ngp", "vid"]; const LBL = { none: "Not yet", done: "Done", ngp: "Plan NG+", vid: "Watch vid" };
  const seen = ROSTER.filter(r => (status[r.name] || "none") !== "none").length;
  return (<div>
    <div className="cols">
      <div className="col keep"><h4>Carries to NG+</h4><ul style={{ margin: 0, padding: 0 }}>{NGPLUS.carries.map((c, i) => <li key={i}>{c}</li>)}</ul></div>
      <div className="col reset"><h4>Resets</h4><ul style={{ margin: 0, padding: 0 }}>{NGPLUS.resets.map((c, i) => <li key={i}>{c}</li>)}</ul></div>
    </div>
    <ul className="tips">{NGPLUS.tips.map((t, i) => <li key={i}>&bull; {t}</li>)}</ul>
    <p className="summary">Romance routes experienced: <b>{seen}/{ROSTER.length}</b> &middot; tap a status to cycle</p>
    {ROSTER.map((r, i) => { const s = status[r.name] || "none"; return (
      <div className="rrow" key={i}>
        <div className="grow"><span className="rname">{r.name}</span> <span className="rarc">{r.arcana}</span>{r.note && <div className="rec">{r.note}</div>}</div>
        <span className="rdate">{r.date}</span>
        <span className={"st " + s} role="button" aria-label={r.name + " carry-over: " + LBL[s] + " — activate to cycle"} tabIndex={0} onClick={() => cycle(r.name, ST)} onKeyDown={e => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); cycle(r.name, ST); } }}>{LBL[s]}</span>
      </div>); })}
  </div>);
}

export default function MetaverseAids({ theme = "royal", currentDay, checkedItems = {}, toggleItem }) {
  const [tab, setTab] = usePersistentState("p5r_meta_tab", "fusion");
  const [checked, setChecked] = usePersistentState("p5r_meta_checked", {});
  const [status, setStatus] = usePersistentState("p5r_meta_status", {});
  const [fsort, setFsort] = usePersistentState("p5r_meta_fsort", "flat");
  const toggle = id => setChecked(s => ({ ...s, [id]: !s[id] }));
  const cycle = (k, a) => setStatus(s => { const cur = s[k] || "none"; return { ...s, [k]: a[(a.indexOf(cur) + 1) % a.length] }; });
  // Fusion-Path step toggle, with a one-way bridge: checking a step registers its
  // result Persona in the Compendium (p_<name>); unchecking never un-registers.
  const onFusionToggle = (i, f) => {
    const turningOn = !checked["f" + i];
    setChecked(s => ({ ...s, ["f" + i]: !s["f" + i] }));
    if (turningOn && toggleItem && !checkedItems[`p_${f.result}`]) toggleItem(`p_${f.result}`);
  };
  const { tip, tipApi, bubbleRef } = useTooltip();
  return (<div className="p5m" data-theme={theme}>
    <style>{CSS}</style>
    <div className="bar">
      <div className="logo">P5<b>R</b></div>
      <div><div className="title">Metaverse Aids + NG&#43;</div><div className="sub">Integrated Strategy Compendium</div></div>
      <div className="spacer" />
    </div>
    <div className="tabs">
      <button className="tabbtn" aria-pressed={tab === "fusion"} onClick={() => setTab("fusion")}>Fusion Path</button>
      <button className="tabbtn" aria-pressed={tab === "seeds"} onClick={() => setTab("seeds")}>Will Seeds</button>
      <button className="tabbtn" aria-pressed={tab === "ngplus"} onClick={() => setTab("ngplus")}>NG&#43; Planner</button>
    </div>
    {tab === "fusion" && <FusionPath checked={checked} onToggle={onFusionToggle} checkedItems={checkedItems} currentDay={currentDay} sort={fsort} setSort={setFsort} tipApi={tipApi} />}
    {tab === "seeds" && <WillSeeds checked={checked} toggle={toggle} />}
    {tab === "ngplus" && <NGPlanner status={status} cycle={cycle} />}
    <div className="foot"><b>Metaverse Aids</b> on live data: {FUSION.length} fusion steps (synced to the Compendium), Will Seeds across {WILL.length} Palaces, NG+ carry-over + a {ROSTER.length}-route romance planner.</div>
    {tip && <div ref={bubbleRef} className="tipbubble" style={{ left: tip.x, top: tip.y }}>{tip.text}</div>}
  </div>);
}
