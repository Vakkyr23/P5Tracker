import { useState, useMemo } from 'react';
import {
  ChevronRight,
  Search,
  ChevronDown,
  Star,
  Square,
  Ghost,
  Gem,
  Lock,
  Eye,
  EyeOff,
  MapPin,
  Zap,
  Lightbulb
} from 'lucide-react';
import { PERSONA_DATA } from '../data/personaData';
import { PERSONA_DETAILS, AFFINITY_ORDER, AFFINITY_LABELS, AFFINITY_TOKENS } from '../data/personaDetailData';
import { usePersistentState } from '../hooks/usePersistentState';

/* =========================================================================
   Persona Registry — both sub-tabs (extracted from App.jsx in v3.7.0, markup
   unchanged): the 232-persona compendium checklist and the Treasure Demon
   tracker with its registration-keyed spoiler gate. Sticky controls (search,
   arcana filter, spoiler mode) live here; sub-tab and spoiler mode persist
   via usePersistentState in raw mode (same p5r_reg_subtab / p5r_td_mode keys
   and raw-string encoding as before the extraction).
   checkedItems/toggleItem stay owned by App — registration keys are
   `p_<name>` / `td_<name>` inside the shared p5r_checkedItems map.
   ========================================================================= */

// Treasure Demon weakness → comic element chip (solid fill, dark ink). One unique element per demon.
const TREASURE_WEAK = {
  Fire:    { bg: '#ff6a3d', fg: '#2a0e06' },
  Ice:     { bg: '#5cc6ff', fg: '#04293b' },
  Elec:    { bg: '#ffd23d', fg: '#3a2c00' },
  Wind:    { bg: '#5ad98a', fg: '#06311b' },
  Psi:     { bg: '#ff8ad4', fg: '#3d0e2b' },
  Nuclear: { bg: '#c8e85a', fg: '#2e3606' },
  Curse:   { bg: '#b07be6', fg: '#2b1147' },
  Gun:     { bg: '#b8c0cc', fg: '#1f242b' },
  Bless:   { bg: '#ffefad', fg: '#4a3800' }
};

// Spoiler mode for the Treasure Demon sub-tab — gated on registration (no day axis in the Registry).
const DEMON_MODES = ['safe', 'free', 'all'];
const DEMON_MODE_LABEL = { safe: 'Story-Safe', free: 'Spoiler-Free', all: 'Reveal All' };
const DEMON_MODE_HINT = {
  safe: 'Unregistered demons are sealed — level shown, the rest hidden. Tap Peek to reveal.',
  free: 'Locale & tips stay blurred until a demon is registered. Tap Peek to reveal.',
  all:  'Every demon fully revealed — nothing hidden.'
};


/* D10 — Compendium detail card (v4.1.0, mockup-approved). UNGATED by design:
   stats/affinities/skills are mechanics, not story, and the registry already
   lists every name and level. Token colors per the signed-off mockup:
   WEAK scarlet (white ink + edge-ink rim), RESIST slate, NULL dark-outline,
   REPEL inverted, DRAIN green. INNATE badge when a skill sits at base level. */
const AFF_CHIP = {
  // wk uses the PINNED danger token (--c-weak): danger stays warm under any
  // accent — bg-red-600 would remap to cobalt in Clinic. edge-ink rides along
  // on Royal; Clinic drops the rim by design (softer red, no vibration).
  wk: 'bg-[rgb(var(--c-weak))] text-white edge-ink ring-1 ring-inset ring-black/40',
  rs: 'bg-slate-500 text-black ring-1 ring-inset ring-black/30',
  nu: 'bg-transparent text-neutral-200 ring-1 ring-inset ring-neutral-400',
  rp: 'bg-neutral-100 text-black ring-1 ring-inset ring-black/40',
  dr: 'bg-green-500 text-black ring-1 ring-inset ring-black/30'
};

function DetailPanel({ detail, baseLevel, panelId }) {
  if (!detail) {
    return (
      <div id={panelId} className="mt-3 pt-3 border-t border-neutral-800 text-[10px] italic text-neutral-600" onClick={(e) => e.stopPropagation()}>
        No compendium data for this specimen.
      </div>
    );
  }
  return (
    <div id={panelId} className="mt-3 pt-3 border-t border-neutral-800 space-y-3 cursor-default text-left" onClick={(e) => e.stopPropagation()}>
      <div className="grid grid-cols-5 gap-1.5">
        {[['St', 'st'], ['Ma', 'ma'], ['En', 'en'], ['Ag', 'ag'], ['Lu', 'lu']].map(([lb, k]) => (
          <div key={k} className="bg-neutral-950/60 border border-neutral-800 px-1 py-1 text-center">
            <div className="text-[8px] font-black uppercase tracking-widest text-neutral-500">{lb}</div>
            <div className="text-sm font-black italic text-white leading-none">{detail.stats[k]}</div>
          </div>
        ))}
      </div>
      <div className="flex flex-wrap gap-1">
        {AFFINITY_ORDER.map((el) => {
          const t = detail.affinities[el];
          return t === '-'
            ? <span key={el} className="text-[8px] font-black uppercase px-1.5 py-0.5 text-neutral-600">{AFFINITY_LABELS[el]}</span>
            : <span key={el} className={`text-[8px] font-black uppercase px-1.5 py-0.5 ${AFF_CHIP[t]}`}>{AFFINITY_LABELS[el]} · {AFFINITY_TOKENS[t]}</span>;
        })}
      </div>
      <div>
        <div className="text-[8px] font-black uppercase tracking-[0.3em] text-red-500 mb-1">Skills</div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-3 gap-y-0.5">
          {detail.skills.map((s) => (
            <div key={s.name} className="flex items-center justify-between text-[11px] text-neutral-300 border-b border-neutral-800/60 py-0.5">
              <span className="truncate">{s.name}</span>
              {s.lvl === baseLevel
                ? <span className="text-[7px] font-black uppercase tracking-widest px-1.5 py-0.5 bg-neutral-800 ring-1 ring-inset ring-neutral-600 text-neutral-300 shrink-0 ml-2">Innate</span>
                : <span className="text-[10px] font-black text-neutral-500 shrink-0 ml-2">Lv {s.lvl}</span>}
            </div>
          ))}
        </div>
      </div>
      <div className="text-[11px]">
        <span className="text-[8px] font-black uppercase tracking-[0.3em] text-red-500 mr-2">Trait</span>
        <span className="font-bold italic text-neutral-200">{detail.trait}</span>
      </div>
    </div>
  );
}

export default function PersonaRegistry({ checkedItems, toggleItem, onBack }) {
  // Transient UI state, owned by the tab.
  const [registrySearch, setRegistrySearch] = useState('');
  const [registryFilter, setRegistryFilter] = useState('All');
  const [demonPeek, setDemonPeek] = useState({});
  // D10: which persona card's detail panel is open (single-open; transient,
  // resets on tab leave like search/filter — the views unmount on switch).
  const [expandedCard, setExpandedCard] = useState(null);
  // Persisted sub-tab + spoiler mode (raw-string keys, unchanged encoding).
  const [registrySubtab, setRegistrySubtab] = usePersistentState('p5r_reg_subtab', (s) => s || 'personas', { raw: true });
  const [demonMode, setDemonMode] = usePersistentState('p5r_td_mode', (m) => (DEMON_MODES.includes(m) ? m : 'safe'), { raw: true });

  const filteredPersonas = useMemo(() => {
    return PERSONA_DATA.registry.filter(p => {
      const matchesSearch = p.name.toLowerCase().includes(registrySearch.toLowerCase()) || 
                            p.arcana.toLowerCase().includes(registrySearch.toLowerCase());
      const matchesFilter = registryFilter === 'All' || p.arcana === registryFilter;
      return matchesSearch && matchesFilter;
    });
  }, [registrySearch, registryFilter]);

  const personasByArcana = useMemo(() => {
    const groups = {};
    const sortedArcanas = [...new Set(PERSONA_DATA.registry.map(p => p.arcana))].sort();
    
    sortedArcanas.forEach(arc => {
      const items = filteredPersonas.filter(p => p.arcana === arc);
      if (items.length > 0) groups[arc] = items;
    });
    return groups;
  }, [filteredPersonas]);

  const registryStats = useMemo(() => {
    const total = PERSONA_DATA.registry.length;
    const completed = PERSONA_DATA.registry.filter(p => checkedItems[`p_${p.name}`]).length;
    return { 
      total, 
      completed, 
      percent: total > 0 ? Math.round((completed / total) * 100) : 0 
    };
  }, [checkedItems]);

  const demonStats = useMemo(() => {
    const total = PERSONA_DATA.treasureDemons.length;
    const completed = PERSONA_DATA.treasureDemons.filter(d => checkedItems[`td_${d.name}`]).length;
    return {
      total,
      completed,
      percent: total > 0 ? Math.round((completed / total) * 100) : 0
    };
  }, [checkedItems]);

  // Stats shown in the Registry header pill follow the active sub-tab.
  const activeRegStats = registrySubtab === 'demons' ? demonStats : registryStats;

  return (
          <div className="space-y-4 md:space-y-6 animate-in fade-in duration-500 min-h-screen">
             {/* Header Section */}
             <div className="flex justify-between items-center gap-4 px-1 md:px-0">
               <button onClick={onBack} className="flex items-center gap-2 text-neutral-500 hover:text-white transition-colors font-bold text-xs uppercase tracking-widest py-2">
                  <ChevronRight className="w-5 h-5 rotate-180" /> <span className="hidden md:inline">Back to System Menu</span><span className="md:hidden">Back</span>
               </button>
               
               <div className="bg-neutral-900 border border-neutral-800 px-3 py-1.5 md:px-4 md:py-2 rounded-lg md:rounded-xl flex items-center gap-3 md:gap-4 shadow-sm">
                  <div className="flex flex-col items-end">
                    <span className="text-[8px] md:text-[10px] font-black text-neutral-500 uppercase tracking-widest">{registrySubtab === 'demons' ? `${activeRegStats.completed}/${activeRegStats.total}` : 'Progress'}</span>
                    <span className="text-lg md:text-xl font-black text-red-600 italic leading-none">{activeRegStats.percent}%</span>
                  </div>
                  <div className="w-16 md:w-24 h-1.5 md:h-2 bg-neutral-800 rounded-full overflow-hidden border border-neutral-700">
                    <div className="h-full bg-red-600 transition-all duration-1000" style={{ width: `${activeRegStats.percent}%` }} />
                  </div>
               </div>
             </div>

             <div className="bg-neutral-900 border border-neutral-800 rounded-xl shadow-2xl relative">
                {/* Background Decor */}
                <div className="absolute inset-0 rounded-xl overflow-hidden pointer-events-none">
                   <div className="absolute top-0 right-0 p-8 opacity-5">
                     <Ghost className="w-32 h-32 md:w-64 md:h-64" />
                   </div>
                </div>

                <div className="relative z-10">
                  {/* Sticky Controls */}
                  <div className="sticky top-0 z-30 bg-neutral-900/95 backdrop-blur-xl border-b border-neutral-800 p-4 md:p-6 space-y-4 rounded-t-xl shadow-sm">
                      {/* Sub-tabs: Personas | Treasure Demons */}
                      <div className="flex gap-2">
                        <button
                          onClick={() => setRegistrySubtab('personas')}
                          className={`flex items-center gap-2 px-3 md:px-4 py-2 rounded-lg border text-[10px] md:text-xs font-black uppercase tracking-widest transition-all ${
                            registrySubtab === 'personas'
                              ? 'bg-red-600 text-black border-red-600 ring-1 ring-inset ring-black/40'
                              : 'bg-neutral-800 text-neutral-400 border-neutral-700 hover:text-white hover:border-red-600'
                          }`}
                        >
                          <Ghost className="w-3.5 h-3.5 md:w-4 md:h-4" /> Personas
                        </button>
                        <button
                          onClick={() => setRegistrySubtab('demons')}
                          className={`flex items-center gap-2 px-3 md:px-4 py-2 rounded-lg border text-[10px] md:text-xs font-black uppercase tracking-widest transition-all ${
                            registrySubtab === 'demons'
                              ? 'bg-red-600 text-black border-red-600 ring-1 ring-inset ring-black/40'
                              : 'bg-neutral-800 text-neutral-400 border-neutral-700 hover:text-white hover:border-red-600'
                          }`}
                        >
                          <Gem className="w-3.5 h-3.5 md:w-4 md:h-4" /> Treasure Demons
                        </button>
                      </div>

                      {registrySubtab === 'personas' && (
                        <>
                          <div className="flex flex-col md:flex-row gap-3">
                            <div className="relative flex-1">
                              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
                              <input 
                                type="text" 
                                placeholder="Search specimens..." 
                                value={registrySearch}
                                onChange={(e) => setRegistrySearch(e.target.value)}
                                className="w-full bg-black border border-neutral-800 rounded-lg py-3 pl-10 pr-4 text-sm font-bold text-white focus:border-red-600 outline-none transition-colors shadow-inner"
                              />
                            </div>
                            <div className="relative">
                              <select 
                                value={registryFilter}
                                onChange={(e) => setRegistryFilter(e.target.value)}
                                className="w-full md:w-auto md:min-w-[200px] bg-neutral-800 border border-neutral-700 rounded-lg pl-4 pr-10 py-3 text-xs font-black uppercase tracking-widest text-white outline-none focus:border-red-600 appearance-none shadow-sm"
                              >
                                <option value="All">All Arcanas</option>
                                {[...new Set(PERSONA_DATA.registry.map(p => p.arcana))].sort().map(arc => (
                                  <option key={arc} value={arc}>{arc}</option>
                                ))}
                              </select>
                              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500 pointer-events-none" />
                            </div>
                          </div>

                          {/* Legend */}
                          <div className="flex flex-wrap gap-2 justify-start">
                            <div className="flex items-center gap-1.5 opacity-80">
                              <span className="text-[8px] font-black uppercase text-yellow-500 tracking-tighter bg-yellow-900/20 px-1.5 py-0.5 rounded border border-yellow-900/50">Special</span>
                            </div>
                            <div className="flex items-center gap-1.5 opacity-80">
                              <span className="text-[8px] font-black uppercase text-blue-500 tracking-tighter bg-blue-900/20 px-1.5 py-0.5 rounded border border-blue-900/50">DLC</span>
                            </div>
                            <div className="flex items-center gap-1.5 opacity-80">
                              <span className="text-[8px] font-black uppercase text-purple-500 tracking-tighter bg-purple-900/20 px-1.5 py-0.5 rounded border border-purple-900/50">Rare</span>
                            </div>
                          </div>
                        </>
                      )}

                      {registrySubtab === 'demons' && (
                        <div className="space-y-3">
                          <div className="flex flex-wrap gap-2 items-center">
                            <span className="text-[9px] md:text-[10px] font-black text-neutral-500 uppercase tracking-widest mr-1">Spoiler</span>
                            {DEMON_MODES.map(m => (
                              <button
                                key={m}
                                onClick={() => { setDemonMode(m); setDemonPeek({}); }}
                                className={`px-3 py-1.5 rounded-lg border text-[10px] md:text-xs font-black uppercase tracking-widest transition-all ${
                                  demonMode === m
                                    ? 'bg-red-400 text-black border-red-400'
                                    : 'bg-neutral-800 text-neutral-400 border-neutral-700 hover:text-white hover:border-red-600'
                                }`}
                              >
                                {DEMON_MODE_LABEL[m]}
                              </button>
                            ))}
                          </div>
                          <p className="text-[10px] md:text-xs text-neutral-500 italic leading-snug">{DEMON_MODE_HINT[demonMode]}</p>
                        </div>
                      )}
                  </div>

                  {/* List */}
                  <div className="p-4 md:p-6 space-y-8 min-h-[50vh]">
                    {registrySubtab === 'personas' && (<>
                    {Object.entries(personasByArcana).map(([arc, personas]) => (
                      <div key={arc} className="space-y-3">
                        <h4 className="text-xs font-black text-red-600 uppercase tracking-[0.4em] flex items-center gap-2 border-b border-neutral-800 pb-2">
                          <Star className="w-3 h-3 fill-current" /> {arc}
                        </h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 items-start">
                          {personas.map(p => {
                            const isChecked = checkedItems[`p_${p.name}`];
                            const detail = PERSONA_DETAILS[p.name];
                            const open = expandedCard === p.name;
                            const panelId = `pd-${p.name.replace(/[^\w-]/g, '_')}`;
                            return (
                              <div 
                                key={p.name}
                                onClick={() => toggleItem(`p_${p.name}`)}
                                role="checkbox"
                                aria-checked={!!isChecked}
                                aria-label={`${p.name} registered`}
                                tabIndex={0}
                                onKeyDown={(e) => { if (e.target !== e.currentTarget) return; if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggleItem(`p_${p.name}`); } }}
                                className={`pc-cut p-3 md:p-3 border transition-all cursor-pointer group active:scale-[0.98] ${
                                  isChecked 
                                    ? 'bg-neutral-800/30 border-neutral-800 hover:border-neutral-600' 
                                    : 'bg-neutral-800/30 border-neutral-800 hover:border-neutral-600 hover:bg-neutral-800/50'
                                }`}
                              >
                                <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3 min-w-0">
                                  <div className="pc-skew pc-keyline w-8 h-8 flex items-center justify-center font-black text-[10px] shrink-0 bg-red-600 pc-onaccent">
                                    <span className="pc-unskew">{p.level}</span>
                                  </div>
                                  <div className="min-w-0">
                                    <div className="text-sm font-black italic truncate text-white">{p.name}</div>
                                    <div className="flex gap-2">
                                      {p.special && <span className="text-[8px] font-black uppercase text-yellow-500 tracking-tighter">Special</span>}
                                      {p.dlc && <span className="text-[8px] font-black uppercase text-blue-500 tracking-tighter">DLC</span>}
                                      {p.rare && <span className="text-[8px] font-black uppercase text-purple-500 tracking-tighter">Rare</span>}
                                    </div>
                                  </div>
                                </div>
                                <div className="flex items-center gap-1 shrink-0">
                                  <button
                                    onClick={(e) => { e.stopPropagation(); setExpandedCard(open ? null : p.name); }}
                                    onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') e.stopPropagation(); }}
                                    aria-expanded={open}
                                    aria-controls={panelId}
                                    aria-label={`${p.name} details`}
                                    className="p-1 text-neutral-500 hover:text-white transition-colors"
                                  >
                                    <ChevronDown className={`w-4 h-4 transition-transform ${open ? 'rotate-180' : ''}`} />
                                  </button>
                                  {isChecked ? <span className="pc-stamp shrink-0" aria-hidden="true"><span>✓</span></span> : <Square className="w-5 h-5 text-neutral-700 group-hover:text-neutral-500 shrink-0" />}
                                </div>
                                </div>
                                {open && <DetailPanel detail={detail} baseLevel={p.level} panelId={panelId} />}
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    ))}

                    {Object.keys(personasByArcana).length === 0 && (
                      <div className="text-center py-20">
                        <Ghost className="w-12 h-12 text-neutral-800 mx-auto mb-4" />
                        <p className="text-neutral-500 font-bold uppercase tracking-widest text-xs">No specimens found.</p>
                      </div>
                    )}
                    </>)}

                    {registrySubtab === 'demons' && (
                      <div className="space-y-3">
                        <h4 className="text-xs font-black text-red-600 uppercase tracking-[0.4em] flex items-center gap-2 border-b border-neutral-800 pb-2">
                          <Gem className="w-3 h-3" /> Treasure Demons <span className="text-neutral-300">· {demonStats.completed}/{demonStats.total}</span>
                        </h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 md:gap-3">
                          {PERSONA_DATA.treasureDemons.map(d => {
                            const isReg = !!checkedItems[`td_${d.name}`];
                            const isPeek = !!demonPeek[d.name];
                            const revealed = isReg || isPeek || demonMode === 'all';
                            const sealed = demonMode === 'safe' && !revealed;
                            const blurDetail = demonMode === 'free' && !revealed;
                            const wk = TREASURE_WEAK[d.weakness] || { bg: '#b8c0cc', fg: '#1f242b' };
                            return (
                              <div
                                key={d.name}
                                className="pc-cut border p-3 md:p-4 transition-all bg-neutral-800/30 border-neutral-800 hover:border-neutral-600"
                              >
                                {/* Top row: level spine + identity + register */}
                                <div className="flex items-start gap-3">
                                  <div className={`pc-skew pc-keyline w-10 h-10 flex flex-col items-center justify-center shrink-0 leading-none ${
                                    sealed ? 'bg-neutral-800 text-neutral-500' : 'bg-red-600 pc-onaccent'
                                  }`}>
                                    <span className="pc-unskew flex flex-col items-center leading-none"><span className="text-[7px] font-black tracking-widest opacity-80">LV</span><span className="text-sm font-black italic">{d.lvl}</span></span>
                                  </div>
                                  <div className="min-w-0 flex-1">
                                    <div className={`text-sm font-black italic truncate ${sealed ? 'text-neutral-500' : 'text-white'}`}>
                                      {sealed ? '???' : d.name}
                                    </div>
                                    <div className="text-[9px] font-black uppercase tracking-[0.18em] text-red-400 mt-0.5">
                                      {sealed ? 'Sealed Specimen' : `${d.arcana} Arcana`}
                                    </div>
                                  </div>
                                  {sealed
                                    ? <Lock className="w-5 h-5 text-neutral-700 shrink-0" />
                                    : (
                                      <button
                                        onClick={() => toggleItem(`td_${d.name}`)}
                                        className="shrink-0"
                                        aria-pressed={!!isReg}
                                        aria-label={`${d.name} registered`}
                                      >
                                        {isReg
                                          ? <span className="pc-stamp" aria-hidden="true"><span>✓</span></span>
                                          : <Square className="w-5 h-5 text-neutral-700 hover:text-neutral-500" />}
                                      </button>
                                    )}
                                </div>

                                {/* Sealed (Story-Safe) */}
                                {sealed && (
                                  <div className="mt-3 flex items-center gap-2.5 bg-neutral-950/40 border border-dashed border-neutral-800 rounded-md px-3 py-2.5">
                                    <EyeOff className="w-4 h-4 text-neutral-600 shrink-0" />
                                    <span className="text-[10px] text-neutral-500 leading-snug flex-1">Locale, weakness &amp; tips hidden until registered.</span>
                                    <button
                                      onClick={() => setDemonPeek(s => ({ ...s, [d.name]: true }))}
                                      className="flex items-center gap-1 text-[9px] font-black uppercase tracking-widest text-red-400 border border-red-900/60 rounded px-2 py-1 hover:bg-red-900/20"
                                    >
                                      <Eye className="w-3 h-3" /> Peek
                                    </button>
                                  </div>
                                )}

                                {/* Revealed / blurred detail */}
                                {!sealed && (
                                  <div className="mt-3 space-y-1.5">
                                    <div className="flex items-center gap-2 text-[11px] text-neutral-400">
                                      <MapPin className="w-3.5 h-3.5 shrink-0 opacity-80" />
                                      <span className={blurDetail ? 'blur-[5px] select-none' : ''}>{d.location}</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-[11px] text-neutral-400">
                                      <Zap className="w-3.5 h-3.5 shrink-0 opacity-80" />
                                      <span className="text-[9px] font-black uppercase tracking-widest text-neutral-500">Weak</span>
                                      <span className="text-[10px] font-black uppercase tracking-wide px-2 py-0.5 rounded" style={{ backgroundColor: wk.bg, color: wk.fg }}>{d.weakness}</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-[11px] text-neutral-500 italic">
                                      <Lightbulb className="w-3.5 h-3.5 shrink-0 opacity-80" />
                                      <span className={blurDetail ? 'blur-[5px] select-none' : ''}>{d.tips}</span>
                                    </div>
                                    {!isReg && demonMode !== 'all' && (blurDetail || isPeek) && (
                                      <button
                                        onClick={() => setDemonPeek(s => ({ ...s, [d.name]: !s[d.name] }))}
                                        className="flex items-center gap-1 text-[9px] font-black uppercase tracking-widest text-red-400 border border-red-900/60 rounded px-2 py-1 hover:bg-red-900/20 mt-1"
                                      >
                                        {isPeek ? <><EyeOff className="w-3 h-3" /> Re-hide</> : <><Eye className="w-3 h-3" /> Peek locale &amp; tip</>}
                                      </button>
                                    )}
                                  </div>
                                )}
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
             </div>
          </div>
  );
}
