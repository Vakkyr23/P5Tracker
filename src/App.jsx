import { useState, useEffect, useLayoutEffect, useMemo, useRef, lazy, Suspense } from 'react';
import { 
  Calendar, 
  Users, 
  Sword, 
  Info, 
  Save, 
  AlertTriangle, 
  Trophy,
  BookOpen,
  MapPin,
  Zap,
  ChevronDown,
  Heart,
  Library,
  Ghost,
  Menu,
} from 'lucide-react';

import { PERSONA_DATA } from './data/personaData';
import { APP_VERSION } from './data/version';
import { CROSSWORD_DATA } from './data/crosswordData';
import { RELEASE_NOTES } from './data/releaseNotes';
import { ROADMAP } from './data/roadmap';
import { SOURCES, THANKS } from './data/sourcesData';
import { CALENDAR } from './data/calendarData';
import { DAY_AXIS, GAME_START, isValidDay } from './data/timeline';
import { usePersistentState } from './hooks/usePersistentState';
import Modal from './components/Modal';
import SyncTerminal from './components/SyncTerminal';
import { migrateCrosswords } from './utils/migrateCrosswords';
// Tab components are code-split (v3.6.1): each loads on first visit and is
// precached by the service worker, so offline still works. The Calendar's
// *data* (calendarData) stays in the main chunk — App itself needs it for the
// legacy p5r_cal_activeIdx save migration in initCurrentDay.
const Briefing = lazy(() => import('./components/Briefing'));
const CalendarView = lazy(() => import('./components/CalendarView'));
const CommandSuite = lazy(() => import('./components/CommandSuite'));
const PersonaRegistry = lazy(() => import('./components/PersonaRegistry'));
const ReferenceHub = lazy(() => import('./components/ReferenceHub'));
const MetaverseAids = lazy(() => import('./components/MetaverseAids'));


// Resolve the shared "current day" (date string), migrating from the legacy
// per-tab indices on first run. The Command Suite axis (DAY_AXIS) is the superset.
// `saved` is the raw stored p5r_day handed in by usePersistentState (raw mode).
function initCurrentDay(saved) {
  if (saved && isValidDay(saved)) return saved;
  try {
    const cmd = localStorage.getItem('p5r_cmd_activeIdx');
    if (cmd != null) { const i = JSON.parse(cmd); if (Number.isInteger(i) && DAY_AXIS[i]) return DAY_AXIS[i]; }
  } catch { /* ignore */ }
  try {
    const cal = localStorage.getItem('p5r_cal_activeIdx');
    if (cal != null) { const i = JSON.parse(cal); if (Number.isInteger(i) && CALENDAR[i]) return CALENDAR[i].date; }
  } catch { /* ignore */ }
  return GAME_START;
}

export default function App() {
    const [activeTab, setActiveTab] = usePersistentState('p5r_activeTab', (stored) => {
      // 1. Try URL Hash first
      const hash = window.location.hash.replace('#', '');
      const hashMap = {
        'briefing': 'cheatsheet',
        'calendar': 'months',
        'confidants': 'confidants',
        'metaverse': 'metaverse',
        'more': 'more',
        'registry': 'registry_view',
        'reference': 'library_view'
      };
      if (hash && hashMap[hash]) return hashMap[hash];

      // 2. Fallback to the stored tab (legacy value mapping preserved)
      const saved = stored || 'cheatsheet';
      if (saved === 'library') return 'library_view';
      if (saved === 'registry') return 'registry_view';
      if (saved === 'palaces' || saved === 'mementos') return 'metaverse';
      return saved;
    }, { raw: true });
  
    // Sync state to URL hash
    useEffect(() => {
      const stateToHash = {
        'cheatsheet': 'briefing',
        'months': 'calendar',
        'confidants': 'confidants',
        'metaverse': 'metaverse',
        'more': 'more',
        'registry_view': 'registry',
        'library_view': 'reference'
      };
      if (stateToHash[activeTab]) {
        window.location.hash = stateToHash[activeTab];
      }
      // Storage write is handled by usePersistentState (raw mode).
    }, [activeTab]);

    // Global theme (Royal/Clinic) + romance route — shared across all tabs,
    // persisted via the hook (raw-string keys, unchanged encoding). v4.0.0:
    // Clinic replaces Night; legacy stored 'night' maps forward here (old
    // save files that restore 'night' remap on the post-import reload).
    const [theme, setTheme] = usePersistentState('p5r_theme', (s) => (s === 'night' ? 'clinic' : (s || 'royal')), { raw: true });
    const [route, setRoute] = usePersistentState('p5r_route', (s) => s || 'Platonic', { raw: true });
    // Reflect the theme onto <html>; storage is handled by the hook.
    useEffect(() => {
      document.documentElement.setAttribute('data-theme', theme);
    }, [theme]);

    // Motion preference (v4.0.0, D14): 'system' follows prefers-reduced-motion;
    // 'full'/'reduced' override it. Reflected as data-motion on <html> — every
    // Phantom animation/transition is opt-in behind [data-motion="full"].
    const [motionPref, setMotionPref] = usePersistentState('p5r_motion', (s) => (s === 'full' || s === 'reduced' ? s : 'system'), { raw: true });
    useEffect(() => {
      const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
      const apply = () => {
        const eff = motionPref === 'system' ? (mq.matches ? 'reduced' : 'full') : motionPref;
        document.documentElement.setAttribute('data-motion', eff);
      };
      apply();
      mq.addEventListener('change', apply);
      return () => mq.removeEventListener('change', apply);
    }, [motionPref]);

    // Tab-switch wipe (D5): 200 ms sweep, view swap at the midpoint; skipped
    // entirely under reduced motion. Hash navigation keeps the instant path.
    const [wiping, setWiping] = useState(false);
    const wipeTimers = useRef({});
    const switchTab = (id) => {
      if (id === activeTab) return;
      if (document.documentElement.getAttribute('data-motion') !== 'full') { setActiveTab(id); return; }
      clearTimeout(wipeTimers.current.swap); clearTimeout(wipeTimers.current.done);
      setWiping(true);
      wipeTimers.current.swap = setTimeout(() => setActiveTab(id), 100);
      wipeTimers.current.done = setTimeout(() => setWiping(false), 210);
    };
    useEffect(() => {
      const t = wipeTimers.current;
      return () => { clearTimeout(t.swap); clearTimeout(t.done); };
    }, []);

    // Traveling tab selector (D1/D17): one absolutely-positioned indicator is
    // measured onto the active TabButton — direct DOM writes via refs, no
    // per-frame React state (same discipline as the tooltip hook).
    const railRef = useRef(null);
    const indRef = useRef(null);
    useLayoutEffect(() => {
      const move = () => {
        const rail = railRef.current, ind = indRef.current;
        if (!rail || !ind) return;
        const btn = rail.querySelector('[data-on]');
        if (!btn) { ind.style.opacity = '0'; return; }
        ind.style.opacity = '1';
        ind.style.left = btn.offsetLeft + 'px';
        ind.style.top = btn.offsetTop + 'px';
        ind.style.width = btn.offsetWidth + 'px';
        ind.style.height = btn.offsetHeight + 'px';
      };
      move();
      window.addEventListener('resize', move);
      return () => window.removeEventListener('resize', move);
    }, [activeTab]);
  
    // Sync URL hash to state (Back/Forward support)
    useEffect(() => {
      const handleHashChange = () => {
        const hash = window.location.hash.replace('#', '');
        const hashMap = {
          'briefing': 'cheatsheet',
          'calendar': 'months',
          'confidants': 'confidants',
          'metaverse': 'metaverse',
          'more': 'more',
          'registry': 'registry_view',
          'reference': 'library_view'
        };
        if (hash && hashMap[hash]) {
          setActiveTab(hashMap[hash]);
        }
      };
  
          window.addEventListener('hashchange', handleHashChange);
          return () => window.removeEventListener('hashchange', handleHashChange);
        // setActiveTab is usePersistentState's setter — the useState setter
        // passed through, so it's referentially stable and this runs once.
        }, [setActiveTab]);
      
        // Shared "current day" across the Calendar and Command Suite (date string).
        // (Vestigial anchoredMonth state removed in v3.7.0 — nothing read it; the
        // Sync Terminal keeps the legacy-import mapping for old save files.)
        const [currentDay, setCurrentDay] = usePersistentState('p5r_day', initCurrentDay, { raw: true });
        useEffect(() => {
          // One-time: retire the legacy per-tab day keys now that the day is shared.
          localStorage.removeItem('p5r_cmd_activeIdx');
          localStorage.removeItem('p5r_cal_activeIdx');
        }, []);
        
        // Data State
        const [checkedItems, setCheckedItems] = useState(() => {
          try {
            const saved = localStorage.getItem('p5r_checkedItems');
            return saved ? JSON.parse(saved) : {};
          } catch { return {}; }
        });
      
        const [socialStats, setSocialStats] = useState(() => {
          try {
            const saved = localStorage.getItem('p5r_socialStats');
            return saved ? JSON.parse(saved) : { Knowledge: 1, Guts: 1, Proficiency: 1, Kindness: 1, Charm: 1 };
          } catch { return { Knowledge: 1, Guts: 1, Proficiency: 1, Kindness: 1, Charm: 1 }; }
        });

      
        // Sync Terminal open/close — all save-system internals live in
        // src/components/SyncTerminal.jsx (extracted v3.7.0).
        const [saveModal, setSaveModal] = useState(false);
      
      
  useEffect(() => {
    localStorage.setItem('p5r_checkedItems', JSON.stringify(checkedItems));
  }, [checkedItems]);

  useEffect(() => {
    localStorage.setItem('p5r_socialStats', JSON.stringify(socialStats));
  }, [socialStats]);

  // --- Legacy Crossword Migration (On Mount) ---
  useEffect(() => {
    setCheckedItems(prev => migrateCrosswords(prev));
  }, []);

  const [showChangelog, setShowChangelog] = useState(false);
  const [changelogFullHistory, setChangelogFullHistory] = useState(false);
  const [showRoadmap, setShowRoadmap] = useState(false);
  const [showSources, setShowSources] = useState(false);
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [lastSeenVersion] = useState(() => localStorage.getItem('p5r_lastSeenVersion'));

  // Version Comparison Helper
  const isVersionNewer = (current, last) => {
    if (!last) return true;
    const c = current.split('.').map(Number);
    const l = last.split('.').map(Number);
    for (let i = 0; i < 3; i++) {
      if (c[i] > l[i]) return true;
      if (c[i] < l[i]) return false;
    }
    return false;
  };

  // Check version for changelog
  useEffect(() => {
    const lastSeen = lastSeenVersion;
    const latestNotesVersion = RELEASE_NOTES[0]?.version;
    
    if (!lastSeen) {
      localStorage.setItem('p5r_lastSeenVersion', latestNotesVersion);
      return;
    }

    if (isVersionNewer(latestNotesVersion, lastSeen)) {
      setChangelogFullHistory(false);
      setShowChangelog(true);
      localStorage.setItem('p5r_lastSeenVersion', latestNotesVersion);
    }
  }, [lastSeenVersion]);

  // Show onboarding for new users
  useEffect(() => {
    if (!localStorage.getItem('p5r_onboardingComplete')) {
      setShowOnboarding(true);
    }
  }, []);

  const completeOnboarding = () => {
    setShowOnboarding(false);
    localStorage.setItem('p5r_onboardingComplete', 'true');
  };

  const updateStat = (stat, val) => {
    setSocialStats(prev => ({ ...prev, [stat]: Math.min(5, Math.max(1, parseInt(val) || 1)) }));
  };

  const toggleItem = (id) => {
    // Crossword Opportunity Logic (Calendar)
    if (id.startsWith('cw_opp_')) {
      const isChecking = !checkedItems[id];
      
      setCheckedItems(prev => {
        const next = { ...prev };
        if (isChecking) {
          next[id] = true;
          // Find next unchecked answer and check it
          const nextAns = CROSSWORD_DATA.find(cw => !prev[cw.id] && !next[cw.id]);
          if (nextAns) next[nextAns.id] = true;
        } else {
          delete next[id];
          // Find latest checked answer and uncheck it
          const lastAns = [...CROSSWORD_DATA].reverse().find(cw => prev[cw.id] && next[cw.id]);
          if (lastAns) delete next[lastAns.id];
        }
        return next;
      });
      return;
    }

    setCheckedItems(prev => ({ ...prev, [id]: !prev[id] }));
  };


  // --- Smart Backlog Logic ---

  // Registry completion % for the More-menu card. The full stats live inside
  // PersonaRegistry — a static import from that lazy module would pull it back
  // into the main chunk, so this tiny duplicate computation stays here.
  const registryPercent = useMemo(() => {
    const total = PERSONA_DATA.registry.length;
    const completed = PERSONA_DATA.registry.filter(p => checkedItems[`p_${p.name}`]).length;
    return total > 0 ? Math.round((completed / total) * 100) : 0;
  }, [checkedItems]);

  return (
    <div className="min-h-screen text-neutral-100 p-2 md:p-8">
      <header className="relative max-w-6xl mx-auto mb-4 md:mb-8 pb-6 md:pb-10 flex flex-col lg:flex-row items-center justify-between gap-4 md:gap-6">
        <div className="text-center lg:text-left">
          <h1 className="text-2xl md:text-6xl font-black text-red-600 tracking-tighter italic uppercase flex items-baseline justify-center lg:justify-start flex-wrap gap-2">
            <span className="pc-p5">P5</span>
            <span className="pc-plate edge-ink text-sm md:text-xl tracking-normal"><span>Tracker</span></span>
            <span className="pc-chip text-[10px] md:text-[11px] tracking-tighter align-middle ml-1 md:ml-2">
              <span>v{APP_VERSION}</span>
            </span>
          </h1>
          <p className="text-neutral-500 mt-1 md:mt-2 font-mono text-[8px] md:text-[10px] tracking-[0.25em] hidden md:block">Integrated Strategy Compendium</p>
        </div>
        <div className="flex gap-2 md:gap-4 flex-wrap justify-center items-center">
            <div className="flex items-center pc-navcut overflow-hidden border border-neutral-700 bg-neutral-900/60">
              <button onClick={() => setTheme('royal')} aria-pressed={theme === 'royal'} className={`px-2.5 py-1.5 md:px-3 md:py-2 text-[9px] md:text-[10px] font-black uppercase italic tracking-wider transition-colors ${theme === 'royal' ? 'bg-red-600 pc-onaccent' : 'text-neutral-400 hover:text-white'}`}>Royal</button>
              <button onClick={() => setTheme('clinic')} aria-pressed={theme === 'clinic'} className={`px-2.5 py-1.5 md:px-3 md:py-2 text-[9px] md:text-[10px] font-black uppercase italic tracking-wider transition-colors ${theme === 'clinic' ? 'bg-red-600 pc-onaccent' : 'text-neutral-400 hover:text-white'}`}>Clinic</button>
            </div>
            <button 
              onClick={() => setSaveModal(true)} 
              className="pc-skew pc-hard flex items-center bg-red-600 pc-onaccent px-3 py-1.5 md:px-6 md:py-3 font-black uppercase text-[10px] md:text-xs italic hover:brightness-110 active:scale-95"
            >
              <span className="pc-unskew flex items-center gap-2"><Save className="w-3 md:w-4 h-3 md:h-4" /> <span className="hidden md:inline">Sync Terminal</span><span className="md:hidden">Sync</span></span>
            </button>
        </div>
        <span className="pc-seam" aria-hidden="true" />
      </header>

      <nav ref={railRef} className="pc-navcut fixed bottom-0 left-0 right-0 z-50 md:relative md:bottom-auto md:left-auto md:right-auto md:mb-8 flex justify-between gap-1 bg-neutral-900/90 backdrop-blur-xl p-1 pb-[calc(0.25rem+env(safe-area-inset-bottom))] border-t border-neutral-800 md:bg-neutral-900 md:p-1 md:border md:shadow-2xl">
        <span ref={indRef} className="pc-ind" aria-hidden="true" />
        <TabButton active={activeTab === 'cheatsheet'} onClick={() => switchTab('cheatsheet')} label="Briefing" icon={BookOpen} />
        <TabButton active={activeTab === 'months'} onClick={() => switchTab('months')} label="Calendar" icon={Calendar} />
        <TabButton active={activeTab === 'confidants'} onClick={() => switchTab('confidants')} label="Confidants" icon={Users} />
        <TabButton active={activeTab === 'metaverse'} onClick={() => switchTab('metaverse')} label="Metaverse" icon={Sword} />
        <TabButton active={activeTab === 'more' || activeTab === 'registry_view' || activeTab === 'library_view'} onClick={() => switchTab('more')} label="More" icon={Menu} />
      </nav>

      <main className="pc-stage max-w-6xl mx-auto pb-48 md:pb-24">
        <span className="pc-wiper" data-wiping={wiping || undefined} aria-hidden="true" />
        
        {/* CHEATSHEET VIEW */}
        <Suspense fallback={
          <div className="min-h-[60vh] flex items-center justify-center">
            <div className="flex flex-col items-center gap-3">
              <svg className="pc-star w-12 h-12" viewBox="0 0 64 64" aria-hidden="true"><polygon fill="rgb(var(--c-red-600))" points="32,2 39,20 58,14 46,30 62,40 42,42 46,62 32,48 18,62 22,42 2,40 18,30 6,14 25,20" /></svg>
              <span className="pc-plate edge-ink text-xs tracking-[0.25em]"><span>Infiltrating…</span></span>
            </div>
          </div>
        }>
          {activeTab === 'cheatsheet' && <Briefing currentDay={currentDay} socialStats={socialStats} updateStat={updateStat} checkedItems={checkedItems} toggleItem={toggleItem} />}
          {activeTab === 'months' && <CalendarView theme={theme} route={route} setRoute={setRoute} currentDay={currentDay} setCurrentDay={setCurrentDay} />}
          {activeTab === 'confidants' && <CommandSuite theme={theme} route={route} currentDay={currentDay} setCurrentDay={setCurrentDay} />}
          {activeTab === 'library_view' && <ReferenceHub onBack={() => setActiveTab('more')} />}
          {activeTab === 'registry_view' && <PersonaRegistry checkedItems={checkedItems} toggleItem={toggleItem} onBack={() => setActiveTab('more')} />}
          {activeTab === 'metaverse' && <MetaverseAids theme={theme} currentDay={currentDay} checkedItems={checkedItems} toggleItem={toggleItem} />}
        </Suspense>
        {/* Calendar Header Navigation */}
        
        {/* ROADMAP VIEW */}

        {/* CONFIDANTS VIEW */}

        {/* METAVERSE VIEW */}

        {/* PALACES CONTENT */}

        {/* MEMENTOS CONTENT */}

        {/* MORE VIEW (System Menu) */}
        {activeTab === 'more' && (
          <div className="space-y-4 md:space-y-6 animate-in fade-in duration-500">
            {/* Mobile List / Desktop Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-6">
              
              {/* Registry Access */}
              <button 
                onClick={() => setActiveTab('registry_view')}
                className="group bg-neutral-900 border border-neutral-800 p-4 md:p-8 pc-cut text-left hover:border-red-600 transition-all relative overflow-hidden flex md:block items-center gap-4"
              >
                <div className="absolute top-0 right-0 p-4 opacity-5 md:opacity-10 group-hover:opacity-20 transition-opacity hidden md:block">
                  <Ghost className="w-24 h-24" />
                </div>
                <div className="p-3 bg-neutral-800 md:bg-transparent md:p-0">
                  <Ghost className="w-5 h-5 md:w-8 md:h-8 text-red-600 md:mb-4" />
                </div>
                <div>
                  <h3 className="text-sm md:text-xl font-black uppercase italic text-white md:mb-2">Persona Registry</h3>
                  <p className="text-[10px] md:text-xs text-neutral-500 font-bold uppercase tracking-widest leading-snug">
                    Captured Specimens & Demons
                    <span className="hidden md:block mt-2 text-red-600">{registryPercent}% Completed</span>
                  </p>
                </div>
              </button>

              {/* Reference Hub Access */}
              <button 
                onClick={() => setActiveTab('library_view')}
                className="group bg-neutral-900 border border-neutral-800 p-4 md:p-8 pc-cut text-left hover:border-blue-600 transition-all relative overflow-hidden flex md:block items-center gap-4"
              >
                <div className="absolute top-0 right-0 p-4 opacity-5 md:opacity-10 group-hover:opacity-20 transition-opacity hidden md:block">
                  <Library className="w-24 h-24" />
                </div>
                <div className="p-3 bg-neutral-800 md:bg-transparent md:p-0">
                  <Library className="w-5 h-5 md:w-8 md:h-8 text-blue-500 md:mb-4" />
                </div>
                <div>
                  <h3 className="text-sm md:text-xl font-black uppercase italic text-white md:mb-2">Reference Hub</h3>
                  <p className="text-[10px] md:text-xs text-neutral-500 font-bold uppercase tracking-widest leading-snug">
                    Answers, Calculators, & Guides
                  </p>
                </div>
              </button>

              {/* Motion setting (v4.0.0, D14) */}
              <button
                onClick={() => setMotionPref(motionPref === 'system' ? 'full' : motionPref === 'full' ? 'reduced' : 'system')}
                className="group bg-neutral-900 border border-neutral-800 p-4 md:p-8 pc-cut text-left hover:border-red-600 transition-all relative overflow-hidden flex md:block items-center gap-4"
              >
                <div className="absolute top-0 right-0 p-4 opacity-5 md:opacity-10 group-hover:opacity-20 transition-opacity hidden md:block">
                  <Zap className="w-24 h-24" />
                </div>
                <div className="p-3 bg-neutral-800 md:bg-transparent md:p-0">
                  <Zap className="w-5 h-5 md:w-8 md:h-8 text-red-600 md:mb-4" />
                </div>
                <div>
                  <h3 className="text-sm md:text-xl font-black uppercase italic text-white md:mb-2">Motion</h3>
                  <p className="text-[10px] md:text-xs text-neutral-500 font-bold uppercase tracking-widest leading-snug">
                    Wipes, stamps & the traveling selector
                    <span className="hidden md:block mt-2 text-red-600">{motionPref === 'system' ? 'System default' : motionPref === 'full' ? 'Always full' : 'Always reduced'}</span>
                  </p>
                </div>
              </button>

              {/* What's New */}
              <button 
                onClick={() => { setChangelogFullHistory(true); setShowChangelog(true); }}
                className="group bg-neutral-900 border border-neutral-800 p-4 md:p-8 pc-cut text-left hover:border-yellow-600 transition-all relative overflow-hidden flex md:block items-center gap-4"
              >
                <div className="absolute top-0 right-0 p-4 opacity-5 md:opacity-10 group-hover:opacity-20 transition-opacity hidden md:block">
                  <Zap className="w-24 h-24" />
                </div>
                <div className="p-3 bg-neutral-800 md:bg-transparent md:p-0">
                  <Zap className="w-5 h-5 md:w-8 md:h-8 text-yellow-500 md:mb-4" />
                </div>
                <div>
                  <h3 className="text-sm md:text-xl font-black uppercase italic text-white md:mb-2">What's New</h3>
                  <p className="text-[10px] md:text-xs text-neutral-500 font-bold uppercase tracking-widest leading-snug">
                    Update History & Notes
                  </p>
                </div>
              </button>

              {/* Roadmap */}
              <button 
                onClick={() => setShowRoadmap(true)}
                className="group bg-neutral-900 border border-neutral-800 p-4 md:p-8 pc-cut text-left hover:border-blue-500 transition-all relative overflow-hidden flex md:block items-center gap-4"
              >
                <div className="absolute top-0 right-0 p-4 opacity-5 md:opacity-10 group-hover:opacity-20 transition-opacity hidden md:block">
                  <Trophy className="w-24 h-24" />
                </div>
                <div className="p-3 bg-neutral-800 md:bg-transparent md:p-0">
                  <Trophy className="w-5 h-5 md:w-8 md:h-8 text-blue-500 md:mb-4" />
                </div>
                <div>
                  <h3 className="text-sm md:text-xl font-black uppercase italic text-white md:mb-2">Roadmap</h3>
                  <p className="text-[10px] md:text-xs text-neutral-500 font-bold uppercase tracking-widest leading-snug">
                    Future Features & Plans
                  </p>
                </div>
              </button>

              {/* Help */}
              <button 
                onClick={() => setShowOnboarding(true)}
                className="group bg-neutral-900 border border-neutral-800 p-4 md:p-8 pc-cut text-left hover:border-neutral-400 transition-all relative overflow-hidden flex md:block items-center gap-4"
              >
                <div className="absolute top-0 right-0 p-4 opacity-5 md:opacity-10 group-hover:opacity-20 transition-opacity hidden md:block">
                  <Info className="w-24 h-24" />
                </div>
                <div className="p-3 bg-neutral-800 md:bg-transparent md:p-0">
                  <Info className="w-5 h-5 md:w-8 md:h-8 text-neutral-400 md:mb-4" />
                </div>
                <div>
                  <h3 className="text-sm md:text-xl font-black uppercase italic text-white md:mb-2">Help Guide</h3>
                  <p className="text-[10px] md:text-xs text-neutral-500 font-bold uppercase tracking-widest leading-snug">
                    Manual & Onboarding Tips
                  </p>
                </div>
              </button>
              {/* Sources & Special Thanks */}
              <button 
                onClick={() => setShowSources(true)}
                className="group bg-neutral-900 border border-neutral-800 p-4 md:p-8 pc-cut text-left hover:border-amber-500 transition-all relative overflow-hidden flex md:block items-center gap-4"
              >
                <div className="absolute top-0 right-0 p-4 opacity-5 md:opacity-10 group-hover:opacity-20 transition-opacity hidden md:block">
                  <Heart className="w-24 h-24" />
                </div>
                <div className="p-3 bg-neutral-800 md:bg-transparent md:p-0">
                  <Heart className="w-5 h-5 md:w-8 md:h-8 text-amber-500 md:mb-4" />
                </div>
                <div>
                  <h3 className="text-sm md:text-xl font-black uppercase italic text-white md:mb-2">Sources & Thanks</h3>
                  <p className="text-[10px] md:text-xs text-neutral-500 font-bold uppercase tracking-widest leading-snug">
                    Credits & Attributions
                  </p>
                </div>
              </button>

            </div>
          </div>
        )}

        {/* SUB-VIEW: REGISTRY */}
        {/* SUB-VIEW: REFERENCE */}
        {/* Footer */}
        <div className="mt-20 pt-10 border-t border-neutral-800 text-center opacity-60 hover:opacity-100 transition-opacity">
          <p className="text-[10px] tracking-[0.2em] text-neutral-500 mb-4 flex items-center justify-center gap-2">
            <span>v{APP_VERSION}</span>
            <span>•</span>
            <button onClick={() => { setChangelogFullHistory(true); setShowChangelog(true); }} className="hover:text-white underline decoration-red-600 underline-offset-4 transition-colors font-bold tracking-widest uppercase">What's New</button>
            <span>•</span>
            <button onClick={() => setShowRoadmap(true)} className="hover:text-white underline decoration-blue-600 underline-offset-4 transition-colors font-bold tracking-widest uppercase">Roadmap</button>
            <span>•</span>
            <button onClick={() => setShowOnboarding(true)} className="hover:text-white underline decoration-yellow-500 underline-offset-4 transition-colors font-bold tracking-widest uppercase">Help</button>
            <span>•</span>
            <a 
              href="https://github.com/Vakkyr23/P5Tracker/issues" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:text-white underline decoration-neutral-600 underline-offset-4 transition-colors font-bold tracking-widest uppercase"
            >
              Feedback
            </a>
          </p>
          <a 
            href="https://ko-fi.com/K3K11RWTSL" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-[#FF5E5B] hover:bg-[#FF5E5B]/90 text-white px-6 py-2 rounded-full text-xs font-black uppercase tracking-widest transition-transform hover:scale-105 shadow-lg"
          >
            <Heart className="w-3 h-3 fill-current" />
            Support on Ko-fi
          </a>
        </div>

      </main>

      {/* SAVE/LOAD MODAL — extracted to components/SyncTerminal.jsx (v3.7.0) */}
      <SyncTerminal isOpen={saveModal} onClose={() => setSaveModal(false)} />
      {/* CHANGELOG MODAL */}
      <Modal isOpen={showChangelog} onClose={() => setShowChangelog(false)} className="max-w-lg border-red-600 shadow-[0_0_50px_rgba(220,38,38,0.2)] max-h-[80vh]">
           <div className="p-6 md:p-10 overflow-y-auto custom-scrollbar max-h-[80vh]">
              <div className="flex justify-between items-start mb-8 border-b-2 border-red-600 pb-4">
                <div>
                  <h2 className="text-3xl font-black text-white italic uppercase tracking-tighter">Mission Intel</h2>
                  <div className="text-neutral-500 font-bold font-mono text-xs mt-1 uppercase tracking-widest">Update History</div>
                </div>
                <button onClick={() => setShowChangelog(false)} className="p-2 bg-neutral-800 rounded-full hover:bg-red-600 transition-colors"><ChevronDown className="w-6 h-6 rotate-180" /></button>
              </div>
              
              <div className="space-y-12">
                {RELEASE_NOTES
                  .filter(r => changelogFullHistory || isVersionNewer(r.version, lastSeenVersion))
                  .map((release, releaseIdx) => (
                  <div key={release.version} className={`relative ${releaseIdx !== 0 ? 'opacity-60 grayscale-[50%] hover:opacity-100 hover:grayscale-0 transition-all pt-8 border-t border-neutral-800' : ''}`}>
                    {releaseIdx === 0 && (
                      <div className="absolute -top-4 -left-2 bg-red-600 text-black text-[8px] font-black px-2 py-0.5 uppercase rotate-[-2deg] shadow-lg">New Deployment</div>
                    )}
                    <div className="flex justify-between items-baseline mb-4">
                      <h3 className="text-xl font-black text-white italic uppercase tracking-tight">{release.title}</h3>
                      <span className="text-red-600 font-bold font-mono text-xs">v{release.version}</span>
                    </div>
                    
                    <p className="text-sm text-neutral-400 italic mb-6">"{release.description}"</p>
                    
                    <div className="space-y-6">
                      {release.sections.map((section, i) => (
                        <div key={i}>
                          <h4 className="text-xs font-black text-red-500 uppercase tracking-widest mb-3 border-b border-red-900/30 pb-1">{section.title}</h4>
                          <ul className="space-y-2">
                            {section.items.map((item, j) => (
                              <li key={j} className="text-sm text-neutral-300 flex items-start gap-2">
                                <span className="text-red-600 mt-0.5">›</span>
                                <span dangerouslySetInnerHTML={{ __html: item.replace(/\*\*(.*?)\*\*/g, '<strong class="text-white font-bold">$1</strong>') }} />
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              <button onClick={() => setShowChangelog(false)} className="w-full mt-12 bg-white text-black p-4 rounded-lg text-xs font-bold tracking-widest hover:bg-red-600 hover:text-white transition-colors">
                Acknowledged
              </button>
           </div>
      </Modal>
      {/* ROADMAP MODAL */}
      <Modal isOpen={showRoadmap} onClose={() => setShowRoadmap(false)} className="max-w-lg border-blue-600 shadow-[0_0_50px_rgba(37,99,235,0.2)] max-h-[80vh]">
           <div className="p-6 md:p-10 overflow-y-auto custom-scrollbar max-h-[80vh]">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h2 className="text-3xl font-black text-white italic uppercase tracking-tighter text-blue-500">The Path Ahead</h2>
                  <div className="text-neutral-500 font-bold font-mono text-xs mt-1 uppercase tracking-widest">Feature Roadmap</div>
                </div>
                <button onClick={() => setShowRoadmap(false)} className="p-2 bg-neutral-800 rounded-full hover:bg-blue-600 transition-colors"><ChevronDown className="w-6 h-6 rotate-180" /></button>
              </div>
              
              <div className="space-y-8">
                {ROADMAP.map((section, i) => (
                  <div key={i}>
                    <div className="flex justify-between items-center mb-3 border-b border-neutral-800 pb-1">
                      <h4 className="text-xs font-black text-white uppercase tracking-widest">{section.title}</h4>
                      <span className={`text-[8px] font-black px-1.5 py-0.5 rounded uppercase ${section.status === 'Active' ? 'bg-blue-600 text-white animate-pulse' : 'bg-neutral-800 text-neutral-500'}`}>
                        {section.status}
                      </span>
                    </div>
                    <ul className="space-y-2">
                      {section.items.map((item, j) => (
                        <li key={j} className="text-xs text-neutral-400 flex items-start gap-2">
                          <span className="text-blue-600 mt-0.5">›</span>
                          <span dangerouslySetInnerHTML={{ __html: item.replace(/\*\*(.*?)\*\*/g, '<strong class="text-neutral-200">$1</strong>') }} />
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>

              <button onClick={() => setShowRoadmap(false)} className="w-full mt-8 bg-blue-600 text-white p-4 rounded-lg text-xs font-bold tracking-widest hover:bg-white hover:text-black transition-colors">
                Close Roadmap
              </button>
           </div>
      </Modal>

      {/* ONBOARDING MODAL */}
      <Modal isOpen={showOnboarding} onClose={completeOnboarding} className="max-w-md border-red-600 shadow-[0_0_60px_rgba(220,38,38,0.3)] max-h-[85vh]">
           <div className="p-4 md:p-8 overflow-y-auto custom-scrollbar">
              <div className="flex flex-col items-center text-center mb-6 md:mb-8">
                <div className="w-12 h-12 md:w-16 md:h-16 bg-red-600 rounded-xl flex items-center justify-center mb-4 rotate-3 shadow-xl shadow-red-900/40">
                  <Zap className="w-6 h-6 md:w-8 md:h-8 text-white fill-current" />
                </div>
                <h2 className="text-2xl md:text-3xl font-black text-white uppercase italic tracking-tighter">Mission Briefing</h2>
                <p className="text-[10px] md:text-xs text-neutral-500 uppercase font-bold tracking-widest mt-1">Tactical Guide v{APP_VERSION}</p>
              </div>

              <div className="space-y-3 md:space-y-4">
                <OnboardingItem icon={Calendar} color="text-red-500" title="Anchor Your Day" text="Open Calendar and set your current in-game date. Spoilers stay hidden on days you haven't reached yet." />
                <OnboardingItem icon={Heart} color="text-rose-400" title="Pick Your Route" text="Choose a romance (or stay Platonic) and the calendar flags the right decision days. Nothing is preselected \u2014 it's your call." />
                <OnboardingItem icon={AlertTriangle} color="text-red-500" title="Watch Deadlines" text="The Command Suite counts down every Palace and Confidant deadline from your active day." />
                <OnboardingItem icon={Users} color="text-red-500" title="Track Confidants" text="See the exact date each Confidant reaches every rank, plus the full Thieves' Den / P-Medal checklist." />
                <OnboardingItem icon={MapPin} color="text-red-500" title="Metaverse Aids" text="Follow the recommended fusion path, find all 24 Will Seeds, and plan your NG+ romance rotation." />
                <OnboardingItem icon={Save} color="text-white" title="Sync Your Progress" text="Everything saves to your device. Use the Sync Terminal to back up or import your run." />
              </div>

              <button 
                onClick={completeOnboarding}
                className="w-full mt-8 md:mt-10 py-3 md:py-4 rounded-xl bg-red-600 text-black font-bold text-xs hover:bg-white transition-all shadow-lg shadow-red-900/20"
              >
                Understood
              </button>
           </div>
      </Modal>

      {/* SOURCES MODAL */}
      <Modal isOpen={showSources} onClose={() => setShowSources(false)} className="max-w-lg border-amber-500 shadow-[0_0_50px_rgba(245,158,11,0.2)] max-h-[80vh]">
           <div className="p-6 md:p-10 overflow-y-auto custom-scrollbar max-h-[80vh]">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h2 className="text-3xl font-black text-white italic uppercase tracking-tighter text-amber-500">Sources & Thanks</h2>
                  <div className="text-neutral-500 font-bold font-mono text-xs mt-1 uppercase tracking-widest">Credit Where It's Due</div>
                </div>
                <button onClick={() => setShowSources(false)} className="p-2 bg-neutral-800 rounded-full hover:bg-amber-500 transition-colors"><ChevronDown className="w-6 h-6 rotate-180" /></button>
              </div>
              <p className="text-xs md:text-sm text-neutral-400 leading-relaxed mb-6">{THANKS}</p>
              <div className="space-y-4">
                {SOURCES.map((src, i) => (
                  <div key={i} className="border-b border-neutral-800 pb-3">
                    <div className="flex items-start gap-2 mb-1">
                      <Heart className="w-3.5 h-3.5 text-amber-500 flex-shrink-0 mt-0.5" />
                      {src.url
                        ? <a href={src.url} target="_blank" rel="noopener noreferrer" className="text-xs font-black text-white uppercase tracking-wide hover:text-amber-400 underline decoration-amber-500/40 underline-offset-2">{src.name}</a>
                        : <span className="text-xs font-black text-white uppercase tracking-wide">{src.name}</span>}
                    </div>
                    <p className="text-xs text-neutral-500 leading-snug pl-5">{src.what}</p>
                  </div>
                ))}
              </div>
              <button onClick={() => setShowSources(false)} className="w-full mt-8 bg-amber-500 text-black p-4 rounded-lg text-xs font-bold tracking-widest hover:bg-white transition-colors">
                Close
              </button>
           </div>
      </Modal>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: var(--scrollbar-thumb); border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: var(--scrollbar-thumb-hover); }
      `}</style>
    </div>
  );
}

function TabButton({ active, onClick, label, icon: Icon }) {
  const isSpecial = label.includes('✨');
  return (
    <button onClick={onClick} data-on={active || undefined} className={`pc-tab relative z-[1] flex-1 py-2 md:py-4 px-1 md:px-2 font-black uppercase italic text-[8px] md:text-xs tracking-tighter flex items-center justify-center ${
      active ? '' : (isSpecial ? 'text-blue-500 hover:text-blue-400' : 'text-neutral-500 hover:text-white')
    }`}>
      <span className="pc-unskew flex flex-col md:flex-row items-center justify-center gap-0.5 md:gap-2">
        {Icon && <Icon className="w-4 h-4 md:w-4 md:h-4" />}
        <span className="scale-90 md:scale-100">{label.replace(' ✨', '')}</span>
        {isSpecial && <span className="md:hidden">✨</span>}
      </span>
    </button>
  );
}

 
function OnboardingItem({ icon: Icon, color, title, text }) {
  return (
    <div className="flex gap-4 p-3 bg-neutral-800/30 rounded-xl border border-neutral-800/50">
      <div className={`p-2 bg-neutral-900 rounded-lg h-fit border border-neutral-800 ${color}`}>
        <Icon className="w-4 h-4" />
      </div>
      <div className="text-left">
        <div className="font-black text-white uppercase text-xs tracking-widest">{title}</div>
        <div className="text-sm text-neutral-500 leading-tight mt-1">{text}</div>
      </div>
    </div>
  );
}
