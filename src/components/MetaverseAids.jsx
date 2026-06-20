import React from "react";
import { usePersistentState } from "../hooks/usePersistentState";
import { FUSION_PATH as FUSION } from "../data/fusionPathData";
import { WILL_SEEDS as WILL } from "../data/willSeedData";
import { NGPLUS, ROMANCE_ROSTER as ROSTER } from "../data/ngplusData";
/* P5R — METAVERSE AIDS + NG+ (preview): Fusion Path · Will Seed Locator · NG+ Planner. Real data; in-memory. */
const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Saira+Condensed:wght@600;700;800&family=Inter:wght@400;500;600;700&display=swap');
.p5m *{box-sizing:border-box;}
.p5m{--fd:'Saira Condensed',Impact,sans-serif;--fb:'Inter',system-ui,sans-serif;font-family:var(--fb);min-height:100%;color:var(--ink);background:radial-gradient(120% 60% at 100% 0%,var(--glow) 0%,transparent 55%),linear-gradient(160deg,var(--bg2) 0%,var(--bg) 60%);padding:18px;}
.p5m[data-theme="royal"]{--bg:#08050a;--bg2:#15080c;--surf:#190b10;--surf2:#22101a;--line:#40161f;--red:#ff1733;--red2:#c00d1f;--rose:#ff587a;--ink:#f7eef1;--mut:#b58e98;--glow:rgba(255,23,51,.16);--shadow:0 12px 30px rgba(0,0,0,.6);--wc:#fff;--wi:#0a0508;}
.p5m[data-theme="night"]{--bg:#12151b;--bg2:#171b22;--surf:#1d232c;--surf2:#232b35;--line:#323c48;--red:#d96b75;--red2:#b1545d;--rose:#dd909c;--ink:#e4e8ee;--mut:#8d97a4;--glow:rgba(217,107,117,.1);--shadow:0 10px 24px rgba(0,0,0,.45);--wc:#e9ecf1;--wi:#10141a;}
.p5m .bar{display:flex;align-items:center;gap:14px;flex-wrap:wrap;margin-bottom:14px;}
.p5m .logo{font-family:var(--fd);font-weight:800;font-style:italic;font-size:30px;color:var(--wc);background:var(--red);padding:8px 14px 9px;transform:skewX(-9deg);box-shadow:var(--shadow);clip-path:polygon(0 0,100% 0,94% 100%,0 100%);}
.p5m .logo b{color:var(--wi);}
.p5m .title{font-family:var(--fd);font-weight:700;font-size:19px;letter-spacing:2px;text-transform:uppercase;}
.p5m .sub{font-size:11px;color:var(--mut);letter-spacing:3px;text-transform:uppercase;}
.p5m .proto{font-family:var(--fd);font-size:10px;letter-spacing:2px;color:var(--wi);background:var(--rose);padding:2px 7px;transform:skewX(-9deg);align-self:center;}
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
.p5m .palhd{display:flex;align-items:center;gap:10px;margin-bottom:8px;}
.p5m .palhd h3{font-family:var(--fd);font-weight:800;font-style:italic;font-size:20px;text-transform:uppercase;margin:0;color:var(--wc);background:var(--red);padding:4px 13px 6px;transform:skewX(-9deg);clip-path:polygon(0 0,100% 0,95% 100%,0 100%);}
.p5m .logo,.p5m .palhd h3,.p5m .tabbtn[aria-pressed="true"],.p5m .toggle button[aria-pressed="true"]{text-shadow:0 1px 1px rgba(0,0,0,.55);}
.p5m .palct{font-family:var(--fd);font-size:12px;color:var(--mut);}
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
@media(max-width:560px){.p5m .logo{font-size:24px;}.p5m .palhd h3{font-size:17px;}}
`;
function FusionPath({checked,toggle}){
  return (<div>
    <div className="note">Follow these in order as you progress — they unlock the Confidant ultimate Personas and fill the Compendium efficiently. For anything <b>off-path</b> (skill inheritance, build-crafting), use a community fusion calculator.</div>
    {FUSION.map((f,i)=>{const id="f"+i;const on=!!checked[id];return (
      <div className="fus" key={i}>
        <div className={"box"+(on?" on":"")} role="button" tabIndex={0} onClick={()=>toggle(id)} onKeyDown={e=>(e.key==="Enter"||e.key===" ")&&toggle(id)}>{on?"\u2713":""}</div>
        <div className="step">{i+1}</div>
        <div className="grow"><span className="res">{f.result}</span><span className="achip" title={`Result Persona — ${f.arcana} Arcana, base level ${f.level}`}>{f.arcana} {f.level}</span>{f.alt&&<span className="altb" title="Off-path alternative — a substitute fusion if you've strayed from the recommended order.">alt</span>}<div className="rec">&#8592; {f.recipe}</div></div>
      </div>);})}
  </div>);
}
function WillSeeds({checked,toggle}){
  return (<div>
    <div className="note">All 24 Will Seeds, three per Palace. Each set fuses into a crystal — trade it to <b>Jose</b> in Mementos for that Palace's accessory. None are missable, and the 8th Palace has none.</div>
    {WILL.map((p,pi)=>(
      <div className="pal" key={pi}>
        <div className="palhd"><h3>{p.palace}</h3><span className="palct">{p.month} &middot; {p.seeds.length} listed</span></div>
        {p.seeds.map((s,si)=>{const id="w"+pi+"_"+si;const on=!!checked[id];return (
          <div className="seed" key={si}><div className={"box"+(on?" on":"")} role="button" tabIndex={0} onClick={()=>toggle(id)} onKeyDown={e=>(e.key==="Enter"||e.key===" ")&&toggle(id)}>{on?"\u2713":""}</div><div className="h">{s}</div></div>);})}
      </div>))}
  </div>);
}
function NGPlanner({status,cycle}){
  const ST=["none","done","ngp","vid"]; const LBL={none:"Not yet",done:"Done",ngp:"Plan NG+",vid:"Watch vid"};
  const seen=ROSTER.filter(r=>(status[r.name]||"none")!=="none").length;
  return (<div>
    <div className="cols">
      <div className="col keep"><h4>Carries to NG+</h4><ul style={{margin:0,padding:0}}>{NGPLUS.carries.map((c,i)=><li key={i}>{c}</li>)}</ul></div>
      <div className="col reset"><h4>Resets</h4><ul style={{margin:0,padding:0}}>{NGPLUS.resets.map((c,i)=><li key={i}>{c}</li>)}</ul></div>
    </div>
    <ul className="tips">{NGPLUS.tips.map((t,i)=><li key={i}>&bull; {t}</li>)}</ul>
    <p className="summary">Romance routes experienced: <b>{seen}/{ROSTER.length}</b> &middot; tap a status to cycle</p>
    {ROSTER.map((r,i)=>{const s=status[r.name]||"none";return (
      <div className="rrow" key={i}>
        <div className="grow"><span className="rname">{r.name}</span> <span className="rarc">{r.arcana}</span>{r.note&&<div className="rec">{r.note}</div>}</div>
        <span className="rdate">{r.date}</span>
        <span className={"st "+s} role="button" tabIndex={0} onClick={()=>cycle(r.name,ST)} onKeyDown={e=>(e.key==="Enter"||e.key===" ")&&cycle(r.name,ST)}>{LBL[s]}</span>
      </div>);})}
  </div>);
}
export default function MetaverseAids({ theme = "royal" }){
  const [tab,setTab]=usePersistentState("p5r_meta_tab","fusion");
  const [checked,setChecked]=usePersistentState("p5r_meta_checked",{});
  const [status,setStatus]=usePersistentState("p5r_meta_status",{});
  const toggle=id=>setChecked(s=>({...s,[id]:!s[id]}));
  const cycle=(k,a)=>setStatus(s=>{const cur=s[k]||"none";return {...s,[k]:a[(a.indexOf(cur)+1)%a.length]};});
  return (<div className="p5m" data-theme={theme}>
    <style>{CSS}</style>
    <div className="bar">
      <div className="logo">P5<b>R</b></div>
      <div><div className="title">Metaverse Aids + NG&#43;</div><div className="sub">Integrated Strategy Compendium</div></div>
      <span className="proto">PREVIEW</span><div className="spacer"/>
    </div>
    <div className="tabs">
      <button className="tabbtn" aria-pressed={tab==="fusion"} onClick={()=>setTab("fusion")}>Fusion Path</button>
      <button className="tabbtn" aria-pressed={tab==="seeds"} onClick={()=>setTab("seeds")}>Will Seeds</button>
      <button className="tabbtn" aria-pressed={tab==="ngplus"} onClick={()=>setTab("ngplus")}>NG&#43; Planner</button>
    </div>
    {tab==="fusion"&&<FusionPath checked={checked} toggle={toggle}/>}
    {tab==="seeds"&&<WillSeeds checked={checked} toggle={toggle}/>}
    {tab==="ngplus"&&<NGPlanner status={status} cycle={cycle}/>}
    <div className="foot"><b>Preview</b> of the final three tabs on real data: {FUSION.length} fusion steps, Will Seeds across {WILL.length} Palaces, NG+ carry-over + {ROSTER.length}-route romance planner.</div>
  </div>);
}
