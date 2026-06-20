import React, { useState } from "react";
import { usePersistentState } from "../hooks/usePersistentState";
import { DEADLINES } from "../data/deadlineData";
import { CONFIDANT_SCHEDULE as CONFIDANTS } from "../data/confidantScheduleData";
import { THIEVES_DEN } from "../data/thievesDenData";
import { routeOf } from "../data/routeData";

/* P5R — COMMAND SUITE (preview): Deadline Dashboard · Confidant Command Center · Thieves' Den.
   Authentic data from the project's modules. In-memory state (full app persists via localStorage). */


const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Saira+Condensed:wght@600;700;800&family=Inter:wght@400;500;600;700&display=swap');
.p5s *{box-sizing:border-box;}
.p5s{--fd:'Saira Condensed',Impact,sans-serif;--fb:'Inter',system-ui,sans-serif;font-family:var(--fb);min-height:100%;color:var(--ink);
  background:radial-gradient(120% 60% at 100% 0%,var(--glow) 0%,transparent 55%),linear-gradient(160deg,var(--bg2) 0%,var(--bg) 60%);padding:18px;}
.p5s[data-theme="royal"]{--bg:#08050a;--bg2:#15080c;--surf:#190b10;--surf2:#22101a;--line:#40161f;--red:#ff1733;--red2:#c00d1f;--rose:#ff587a;--ink:#f7eef1;--mut:#b58e98;--glow:rgba(255,23,51,.16);--shadow:0 12px 30px rgba(0,0,0,.6);--wc:#fff;--wi:#0a0508;}
.p5s[data-theme="night"]{--bg:#12151b;--bg2:#171b22;--surf:#1d232c;--surf2:#232b35;--line:#323c48;--red:#d96b75;--red2:#b1545d;--rose:#dd909c;--ink:#e4e8ee;--mut:#8d97a4;--glow:rgba(217,107,117,.1);--shadow:0 10px 24px rgba(0,0,0,.45);--wc:#e9ecf1;--wi:#10141a;}
.p5s .bar{display:flex;align-items:center;gap:14px;flex-wrap:wrap;margin-bottom:14px;}
.p5s .logo{font-family:var(--fd);font-weight:800;font-style:italic;font-size:30px;color:var(--wc);background:var(--red);padding:8px 14px 9px;transform:skewX(-9deg);box-shadow:var(--shadow);clip-path:polygon(0 0,100% 0,94% 100%,0 100%);}
.p5s .logo b{color:var(--wi);}
.p5s .title{font-family:var(--fd);font-weight:700;font-size:19px;letter-spacing:2px;text-transform:uppercase;}
.p5s .sub{font-size:11px;color:var(--mut);letter-spacing:3px;text-transform:uppercase;}
.p5s .proto{font-family:var(--fd);font-size:10px;letter-spacing:2px;color:var(--wi);background:var(--rose);padding:2px 7px;transform:skewX(-9deg);align-self:center;}
.p5s .spacer{flex:1;}
.p5s .route{display:inline-flex;align-items:center;gap:6px;font-family:var(--fd);font-weight:700;font-size:13px;letter-spacing:1.5px;text-transform:uppercase;padding:7px 12px;border:1.5px solid var(--rose);color:var(--rose);transform:skewX(-9deg);}
.p5s .route span{transform:skewX(9deg);}
.p5s .toggle{display:inline-flex;gap:4px;}
.p5s .toggle button{font-family:var(--fd);font-weight:700;font-size:12px;letter-spacing:1px;text-transform:uppercase;border:1px solid var(--line);background:transparent;color:var(--mut);padding:7px 11px;border-radius:8px;cursor:pointer;}
.p5s .toggle button[aria-pressed="true"]{background:var(--red);color:var(--wc);border-color:var(--red);}
.p5s .tabs{display:flex;gap:6px;flex-wrap:wrap;margin-bottom:14px;}
.p5s .tabbtn{font-family:var(--fd);font-weight:700;font-size:13px;letter-spacing:1.5px;text-transform:uppercase;border:1px solid var(--line);background:var(--surf);color:var(--mut);padding:9px 16px;border-radius:10px;cursor:pointer;transition:all .15s;}
.p5s .tabbtn:hover{color:var(--ink);border-color:var(--red);}
.p5s .tabbtn[aria-pressed="true"]{background:var(--red);color:var(--wc);border-color:var(--red);box-shadow:0 5px 16px -5px var(--red);}
.p5s .scrub{display:flex;align-items:center;gap:10px;background:var(--surf);border:1px solid var(--line);border-radius:12px;padding:10px 12px;margin-bottom:16px;flex-wrap:wrap;}
.p5s .scrub .lab{font-size:10px;letter-spacing:2px;text-transform:uppercase;color:var(--mut);font-weight:700;}
.p5s .scrub .at{font-family:var(--fd);font-weight:800;font-size:20px;white-space:nowrap;}
.p5s .scrub input[type=range]{flex:1;min-width:160px;accent-color:var(--red);}
.p5s .nav{border:1px solid var(--line);background:var(--surf2);color:var(--ink);width:28px;height:28px;border-radius:7px;cursor:pointer;}
.p5s .summary{font-family:var(--fd);font-size:13px;letter-spacing:1px;text-transform:uppercase;color:var(--mut);margin:0 0 12px;}
.p5s .summary b{color:var(--rose);}
/* cards / rows */
.p5s .row{display:flex;align-items:center;gap:12px;background:var(--surf);border:1px solid var(--line);border-radius:10px;padding:11px 13px;margin-bottom:9px;box-shadow:var(--shadow);}
.p5s .due{font-family:var(--fd);font-weight:800;font-size:20px;min-width:54px;text-align:center;line-height:1;}
.p5s .due small{display:block;font-size:9px;letter-spacing:1px;color:var(--mut);font-weight:600;}
.p5s .grow{flex:1;min-width:0;}
.p5s .item{font-size:13.5px;line-height:1.4;}
.p5s .cat{font-family:var(--fd);font-size:10px;font-weight:700;letter-spacing:1px;text-transform:uppercase;padding:2px 7px;border-radius:5px;color:#fff;display:inline-block;margin-bottom:4px;}
.p5s .cat.Palace{background:#6d28d9;}.p5s .cat.Confidant{background:#0e7490;}.p5s .cat.Endgame{background:var(--red2);}.p5s .cat.Other{background:#57534e;}
.p5s .cd{font-family:var(--fd);font-weight:700;font-size:12px;letter-spacing:1px;text-transform:uppercase;padding:4px 9px;border-radius:999px;white-space:nowrap;}
.p5s .cd.soon{color:#fbbf24;border:1px solid #7a5310;background:rgba(251,191,36,.08);}
.p5s .cd.far{color:var(--mut);border:1px solid var(--line);}
.p5s .cd.past{color:#fff;background:var(--red2);}
.p5s .cd.done{color:#7ee787;border:1px solid #1f5a27;}
.p5s .box{width:19px;height:19px;border:2px solid var(--mut);border-radius:5px;display:grid;place-items:center;font-size:13px;color:var(--wc);cursor:pointer;flex:0 0 auto;}
.p5s .box.on{background:var(--red);border-color:var(--red);}
/* confidant */
.p5s .conf{background:var(--surf);border:1px solid var(--line);border-radius:10px;margin-bottom:9px;box-shadow:var(--shadow);overflow:hidden;}
.p5s .conf .head{display:flex;align-items:center;gap:12px;padding:11px 13px;cursor:pointer;}
.p5s .arc{font-family:var(--fd);font-weight:800;font-size:13px;letter-spacing:1px;text-transform:uppercase;color:var(--rose);min-width:96px;}
.p5s .cname{font-size:13.5px;flex:1;}
.p5s .rkbadge{font-family:var(--fd);font-weight:800;font-size:14px;}
.p5s .bar2{height:6px;background:var(--surf2);border-radius:99px;overflow:hidden;min-width:90px;flex:0 0 90px;}
.p5s .bar2 i{display:block;height:100%;background:var(--red);}
.p5s .sched{padding:4px 13px 12px;display:flex;flex-wrap:wrap;gap:6px;}
.p5s .rk{font-size:11px;border:1px solid var(--line);border-radius:7px;padding:3px 8px;color:var(--mut);}
.p5s .rk.hit{color:var(--ink);border-color:var(--rose);}
.p5s .rk.rom{color:var(--rose);border-color:var(--rose);background:rgba(255,88,122,.08);}
.p5s .rk b{font-family:var(--fd);}
/* thieves den */
.p5s .catsec{margin-bottom:18px;}
.p5s .cathd{display:flex;align-items:center;gap:12px;margin-bottom:9px;}
.p5s .cathd h3{font-family:var(--fd);font-weight:800;font-style:italic;font-size:22px;text-transform:uppercase;margin:0;color:var(--wc);background:var(--red);padding:4px 14px 6px;transform:skewX(-9deg);clip-path:polygon(0 0,100% 0,95% 100%,0 100%);}
.p5s .logo,.p5s .cathd h3,.p5s .tabbtn[aria-pressed="true"],.p5s .toggle button[aria-pressed="true"]{text-shadow:0 1px 1px rgba(0,0,0,.55);}
.p5s .bar3{flex:1;height:8px;background:var(--surf2);border-radius:99px;overflow:hidden;}
.p5s .bar3 i{display:block;height:100%;background:linear-gradient(90deg,var(--rose),var(--red));}
.p5s .medals{font-family:var(--fd);font-weight:700;font-size:12px;color:var(--mut);white-space:nowrap;}
.p5s .award{display:flex;align-items:flex-start;gap:11px;background:var(--surf);border:1px solid var(--line);border-radius:10px;padding:10px 12px;margin-bottom:7px;}
.p5s .award .nm{font-weight:600;font-size:13px;}
.p5s .award .pm{font-family:var(--fd);font-weight:700;font-size:11px;color:#f5c542;border:1px solid #7a5e15;border-radius:99px;padding:1px 8px;margin-left:8px;white-space:nowrap;}
.p5s .award .how{font-size:11.5px;color:var(--mut);line-height:1.4;margin-top:3px;}
.p5s .foot{margin-top:24px;font-size:11.5px;color:var(--mut);line-height:1.6;border-top:1px solid var(--line);padding-top:14px;}
.p5s .foot b{color:var(--ink);}
.p5s button:focus-visible,.p5s .box:focus-visible{outline:2px solid var(--rose);outline-offset:2px;}
@media (max-width:560px){.p5s .arc{min-width:70px;}.p5s .logo{font-size:24px;}.p5s .cathd h3{font-size:18px;}}
`;

function buildAxis(){
  const ML=[[4,30],[5,31],[6,30],[7,31],[8,31],[9,30],[10,31],[11,30],[12,31],[1,31],[2,3]];
  const ax=[]; ML.forEach(([m,len],i)=>{for(let d=(i===0?9:1);d<=len;d++)ax.push(m+"/"+d);}); return ax;
}
const AXIS=buildAxis();
const AXI={}; AXIS.forEach((d,i)=>AXI[d]=i);

function Deadlines({activeIdx,checked,toggle}){
  const rows=[...DEADLINES].sort((a,b)=>(AXI[a.due]??999)-(AXI[b.due]??999));
  const done=rows.filter(r=>checked["d:"+r.due+r.item.slice(0,8)]).length;
  return (<div>
    <p className="summary">Deadlines cleared: <b>{done}/{rows.length}</b></p>
    {rows.map((r,i)=>{
      const id="d:"+r.due+r.item.slice(0,8); const on=!!checked[id];
      const di=AXI[r.due]??999; const diff=di-activeIdx;
      let cd,cls; if(on){cd="Done";cls="done";}
        else if(diff<0){cd="Passed";cls="past";}
        else if(diff<=10){cd="in "+diff+"d";cls="soon";}
        else {cd="in "+diff+"d";cls="far";}
      return (<div className="row" key={i}>
        <div className={"box"+(on?" on":"")} role="button" tabIndex={0} onClick={()=>toggle(id)} onKeyDown={e=>(e.key==="Enter"||e.key===" ")&&toggle(id)}>{on?"✓":""}</div>
        <div className="due">{r.due.split("/")[1]}<small>{["","JAN","FEB","MAR","APR","MAY","JUN","JUL","AUG","SEP","OCT","NOV","DEC"][parseInt(r.due.split("/")[0])]}</small></div>
        <div className="grow"><span className={"cat "+r.category}>{r.category}</span><div className="item">{r.item}</div></div>
        <span className={"cd "+cls}>{cd}</span>
      </div>);
    })}
  </div>);
}

function Confidants({activeIdx,expanded,setExpanded,romArcana,romName}){
  const maxed=CONFIDANTS.filter(c=>{const last=c.ranks.filter(r=>(AXI[r.date]??999)<=activeIdx).pop();return last&&/10|11|MAX|EX/.test(String(last.rank));}).length;
  return (<div>
    <p className="summary">Confidants maxed by your day: <b>{maxed}/{CONFIDANTS.length}</b> &nbsp;·&nbsp; Romance: <b>{romName}</b></p>
    {CONFIDANTS.map(c=>{
      const reached=c.ranks.filter(r=>(AXI[r.date]??999)<=activeIdx);
      const cur=reached.length?reached[reached.length-1].rank:"—";
      const pct=Math.round(reached.length/c.ranks.length*100);
      const open=expanded===c.arcana;
      return (<div className="conf" key={c.arcana}>
        <div className="head" onClick={()=>setExpanded(open?null:c.arcana)}>
          <span className="arc">{c.arcana}</span>
          <span className="cname">{c.name}</span>
          <div className="bar2"><i style={{width:pct+"%"}}/></div>
          <span className="rkbadge">{cur==="—"?"—":"R"+cur}</span>
        </div>
        {open&&<div className="sched">{c.ranks.map((r,i)=>{
          const hit=(AXI[r.date]??999)<=activeIdx;
          const rom=String(r.rank)==="9"&&romArcana&&c.arcana===romArcana;
          const ann=[r.auto?"·a = automatic rank, granted by the story":null,rom?"♥ = romance rank — choose the Lover reply here":null].filter(Boolean).join(" · ");
          return <span title={ann||undefined} className={"rk"+(hit?" hit":"")+(rom?" rom":"")} key={i}>{r.date} <b>R{r.rank}</b>{r.auto?" ·a":""}{rom?" ♥":""}</span>;
        })}</div>}
      </div>);
    })}
  </div>);
}

function ThievesDen({checked,toggle}){
  return (<div>
    {THIEVES_DEN.map(cat=>{
      const ids=cat.awards.map((a,i)=>"t:"+cat.category+i);
      const got=cat.awards.filter((a,i)=>checked[ids[i]]).length;
      const totalM=cat.awards.reduce((s,a)=>s+(parseInt((a.pMedals||"").replace(/\D/g,""))||0),0);
      const gotM=cat.awards.reduce((s,a,i)=>s+(checked[ids[i]]?(parseInt((a.pMedals||"").replace(/\D/g,""))||0):0),0);
      return (<div className="catsec" key={cat.category}>
        <div className="cathd"><h3>{cat.category}</h3><div className="bar3"><i style={{width:(got/cat.awards.length*100)+"%"}}/></div><span className="medals" title="Awards completed / total · P-Medals earned / available in this category">{got}/{cat.awards.length} · {gotM}/{totalM}P</span></div>
        {cat.awards.map((a,i)=>{const on=!!checked[ids[i]];return (
          <div className="award" key={i}>
            <div className={"box"+(on?" on":"")} role="button" tabIndex={0} onClick={()=>toggle(ids[i])} onKeyDown={e=>(e.key==="Enter"||e.key===" ")&&toggle(ids[i])}>{on?"✓":""}</div>
            <div className="grow"><span className="nm">{a.award}</span>{a.pMedals&&<span className="pm" title="P-Medals reward — Thieves' Den currency spent on hideout features.">{a.pMedals}</span>}{a.how&&<div className="how">{a.how}{a.notes?" — "+a.notes:""}</div>}</div>
          </div>);})}
      </div>);
    })}
  </div>);
}

export default function CommandSuite({ theme = "royal", route = "Platonic" }){
  const [tab,setTab]=usePersistentState("p5r_cmd_tab","deadlines");
  const [activeIdx,setActiveIdx]=usePersistentState("p5r_cmd_activeIdx",0);
  const [checked,setChecked]=usePersistentState("p5r_cmd_checked",{});
  const [expanded,setExpanded]=useState(null);
  const toggle=id=>setChecked(s=>({...s,[id]:!s[id]}));
  const at=AXIS[activeIdx];
  const R=routeOf(route);
  const romArcana=R.arcana;
  const romName=route==="Platonic"?"None":R.name.split(" ")[0];
  return (<div className="p5s" data-theme={theme}>
    <style>{CSS}</style>
    <div className="bar">
      <div className="logo">P5<b>R</b></div>
      <div><div className="title">Command Suite</div><div className="sub">Integrated Strategy Compendium</div></div>
      <span className="proto">PREVIEW</span>
      <div className="spacer"/>
      <div className="route"><span>♥ Route · {R.name.split(" ")[0]}</span></div>
    </div>
    <div className="tabs">
      <button className="tabbtn" aria-pressed={tab==="deadlines"} onClick={()=>setTab("deadlines")}>Deadlines</button>
      <button className="tabbtn" aria-pressed={tab==="confidants"} onClick={()=>setTab("confidants")}>Confidants</button>
      <button className="tabbtn" aria-pressed={tab==="thievesden"} onClick={()=>setTab("thievesden")}>Thieves' Den</button>
    </div>
    {tab!=="thievesden"&&<div className="scrub">
      <span className="lab">Your day</span>
      <button className="nav" onClick={()=>setActiveIdx(i=>Math.max(0,i-1))}>‹</button>
      <div className="at">{at}</div>
      <input type="range" min={0} max={AXIS.length-1} value={activeIdx} onChange={e=>setActiveIdx(+e.target.value)}/>
      <button className="nav" onClick={()=>setActiveIdx(i=>Math.min(AXIS.length-1,i+1))}>›</button>
    </div>}
    {tab==="deadlines"&&<Deadlines activeIdx={activeIdx} checked={checked} toggle={toggle}/>}
    {tab==="confidants"&&<Confidants activeIdx={activeIdx} expanded={expanded} setExpanded={setExpanded} romArcana={romArcana} romName={romName}/>}
    {tab==="thievesden"&&<ThievesDen checked={checked} toggle={toggle}/>}
    <div className="foot"><b>Preview</b> of three tabs on real project data: {DEADLINES.length} deadlines, {CONFIDANTS.length} confidants, {THIEVES_DEN.reduce((s,c)=>s+c.awards.length,0)} Thieves' Den awards. Slide <b>Your day</b> to watch deadlines count down and confidant ranks fill in. Fusion Path, Will-Seed locator and NG+ planner tabs come next.</div>
  </div>);
}
