import React, { useState, useEffect, useMemo, useRef } from 'react';
import { CONFIDANT_INTERACTIONS } from './data/confidantData';
import { 
  CheckCircle2, 
  Circle, 
  Calendar, 
  Users, 
  Sword, 
  Info, 
  Save, 
  AlertTriangle, 
  Trophy,
  ChevronRight,
  BookOpen,
  Coffee,
  Star,
  Search,
  Target,
  MapPin,
  Clock,
  Zap,
  Download,
  Copy,
  ClipboardCheck,
  CheckSquare,
  Square,
  Gift,
  MessageCircle,
  ChevronDown,
  Wrench,
  Heart,
  Book,
  Sparkles,
  Lightbulb,
  Library,
  ExternalLink,
  Cpu,
  PlayCircle,
  FileText,
  MessageSquare,
  Ghost,
  Menu
} from 'lucide-react';

import { APP_DATA } from './data/gameData';
import { PERSONA_DATA } from './data/personaData';
import { APP_VERSION } from './data/version';
import { RESOURCE_DATA } from './data/resourceData';
import { CROSSWORD_DATA } from './data/crosswordData';
import { CONFIDANT_STAT_GATES, SOCIAL_STATS } from './data/socialStats';
import { RELEASE_NOTES } from './data/releaseNotes';
import { ROADMAP } from './data/roadmap';
import { SOURCES, THANKS } from './data/sourcesData';
import CalendarView from './components/CalendarView';
import CommandSuite from './components/CommandSuite';
import MetaverseAids from './components/MetaverseAids';

const STAT_ICONS = {
  Knowledge: Book,
  Guts: Sword,
  Proficiency: Wrench,
  Kindness: Heart,
  Charm: Sparkles
};

const RESOURCE_ICONS = {
  Cpu,
  BookOpen,
  Sword,
  Trophy,
  Sparkles,
  Users,
  Zap
};

const FORMAT_ICONS = {
  video: PlayCircle,
  tool: Wrench,
  guide: FileText,
  community: MessageSquare
};


function SupportCard() {
  return (
    <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-4 md:p-6 shadow-xl">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-start gap-3">
          <div className="p-2.5 rounded-lg bg-red-600/10 border border-red-900/30">
            <Heart className="w-5 h-5 text-red-500" />
          </div>
          <div>
            <h4 className="text-sm md:text-base font-black uppercase tracking-wider text-white">
              Support the Original Dev
            </h4>
            <p className="text-[11px] md:text-xs text-neutral-400 leading-relaxed max-w-xl">
              This is a personal fork of zucram's open-source P5 Tracker. If it saves you time, consider supporting zucram's original work on Ko-fi.
            </p>
          </div>
        </div>
        <a
          href="https://ko-fi.com/K3K11RWTSL"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-[#FF5E5B] hover:bg-white text-white hover:text-black px-4 py-2 rounded-lg text-xs font-black uppercase tracking-widest transition-all border-b-2 border-[#c44040] hover:border-neutral-300"
        >
          <Heart className="w-3.5 h-3.5 fill-current" />
          Support on Ko-fi
        </a>
      </div>
    </div>
  );
}

export default function App() {
    const [activeTab, setActiveTab] = useState(() => {
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
  
      // 2. Fallback to Local Storage
      const saved = localStorage.getItem('p5r_activeTab') || 'cheatsheet';
      if (saved === 'library') return 'library_view';
      if (saved === 'registry') return 'registry_view';
      if (saved === 'palaces' || saved === 'mementos') return 'metaverse';
      return saved;
    });
  
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
      localStorage.setItem('p5r_activeTab', activeTab);
    }, [activeTab]);

    // Global theme (Royal/Night) + romance route — shared across all tabs, persisted
    const [theme, setTheme] = useState(() => localStorage.getItem('p5r_theme') || 'royal');
    const [route, setRoute] = useState(() => localStorage.getItem('p5r_route') || 'Platonic');
    useEffect(() => {
      localStorage.setItem('p5r_theme', theme);
      document.documentElement.setAttribute('data-theme', theme);
    }, [theme]);
    useEffect(() => { localStorage.setItem('p5r_route', route); }, [route]);
  
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
        }, []);
      
        const [anchoredMonth] = useState(() => localStorage.getItem('p5r_anchoredMonth') || 'april');
        const [searchTerm, setSearchTerm] = useState('');
        const [registrySearch, setRegistrySearch] = useState('');
        const [registryFilter, setRegistryFilter] = useState('All');
        
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
        
        const [confidantRanks] = useState(() => {
          try {
            const saved = localStorage.getItem('p5r_confidantRanks');
            if (saved) return JSON.parse(saved);
          } catch { /* best-effort: ignore */ }
          
          const initial = {};
          APP_DATA.confidants.forEach(c => initial[c.arcana] = 0);
          return initial;
        });
      
        const [saveModal, setSaveModal] = useState(false);
        const [importText, setImportText] = useState('');
        const [copied, setCopied] = useState(false);
        const [syncStatus, setSyncStatus] = useState(null);
        const hiddenInputRef = useRef(null);
      
        useEffect(() => {
          if (import.meta.env.DEV) {
            document.title = 'P5Tracker - DEV';
          } else {
            document.title = 'P5 Tracker';
          }
        }, []);
      
  useEffect(() => {
    localStorage.setItem('p5r_anchoredMonth', anchoredMonth);
  }, [anchoredMonth]);

  useEffect(() => {
    localStorage.setItem('p5r_checkedItems', JSON.stringify(checkedItems));
  }, [checkedItems]);

  useEffect(() => {
    localStorage.setItem('p5r_socialStats', JSON.stringify(socialStats));
  }, [socialStats]);

  useEffect(() => {
    localStorage.setItem('p5r_confidantRanks', JSON.stringify(confidantRanks));
  }, [confidantRanks]);

  const migrateCrosswords = (items) => {
    const allKeys = Object.keys(items);
    
    // Count different types of legacy indicators
    const legacyDateCount = allKeys.filter(k => k.includes('_cw') && !k.startsWith('cw_')).length;
    const failedMigrationCount = allKeys.filter(k => k.match(/^cw\d+$/)).length;
    const oldAttemptCount = allKeys.filter(k => k.startsWith('cw_') && !k.startsWith('cw_ans_') && !k.startsWith('cw_slot_')).length;
    const oldAugCount = allKeys.filter(k => k.startsWith('aug_q')).length;

    // We take the HIGHEST count found to determine progress
    const maxProgress = Math.max(legacyDateCount + oldAugCount, failedMigrationCount, oldAttemptCount);

    // Check if we already have the new format
    const hasNewFormat = allKeys.some(k => k.startsWith('cw_slot_') || k.startsWith('cw_ans_'));

    if (maxProgress > 0 && !hasNewFormat) {
      const next = { ...items };
      
      // 1. Enforce the correct sequence for BOTH slots and answers
      for (let i = 1; i <= maxProgress; i++) {
        next[`cw_slot_${i}`] = true; // Calendar checkboxes
        next[`cw_ans_${i}`] = true;  // Briefing checkboxes
      }

      // 2. Nuke all non-standard keys
      allKeys.forEach(k => {
        if (
          (k.includes('_cw') && !k.startsWith('cw_slot_') && !k.startsWith('cw_ans_')) || 
          k.startsWith('aug_q') || 
          k.match(/^cw\d+$/) ||
          (k.startsWith('cw_') && !k.startsWith('cw_slot_') && !k.startsWith('cw_ans_'))
        ) {
          delete next[k];
        }
      });
      
      return next;
    }
    return items;
  };

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

  // ---- Save system -------------------------------------------------------
  // The whole app persists under the `p5r_` prefix (App shell + each tab's own
  // checklists). We back up that entire namespace as raw strings so the save is
  // opaque to value encoding and stays complete even as keys are added later —
  // no hand-maintained key list to drift out of sync.
  const SAVE_PREFIX = 'p5r_';
  const SAVE_FORMAT = 'p5r-tactician-save';

  const listSaveKeys = () => {
    const keys = [];
    for (let i = 0; i < localStorage.length; i++) {
      const k = localStorage.key(i);
      if (k && k.startsWith(SAVE_PREFIX)) keys.push(k);
    }
    return keys;
  };

  const collectSave = () => {
    const keys = {};
    listSaveKeys().forEach(k => { keys[k] = localStorage.getItem(k); });
    return { format: SAVE_FORMAT, schema: 2, version: APP_VERSION, exportedAt: new Date().toISOString(), keys };
  };

  // Returns the key/value map to write, or null if `parsed` isn't a save.
  const normalizeSave = (parsed) => {
    if (parsed && parsed.format === SAVE_FORMAT && parsed.keys && typeof parsed.keys === 'object') {
      return parsed.keys; // schema 2 — full namespace
    }
    // Legacy flat format ({ checkedItems, confidantRanks, anchoredMonth, socialStats }).
    if (parsed && (parsed.checkedItems || parsed.confidantRanks || parsed.socialStats || parsed.anchoredMonth)) {
      const keys = {};
      if (parsed.checkedItems) keys.p5r_checkedItems = JSON.stringify(migrateCrosswords(parsed.checkedItems));
      if (parsed.confidantRanks) keys.p5r_confidantRanks = JSON.stringify(parsed.confidantRanks);
      if (parsed.socialStats) keys.p5r_socialStats = JSON.stringify(parsed.socialStats);
      if (parsed.anchoredMonth) keys.p5r_anchoredMonth = parsed.anchoredMonth;
      return keys;
    }
    return null;
  };

  const handleCopy = async () => {
    const text = JSON.stringify(collectSave());
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(text);
      } else if (hiddenInputRef.current) {
        hiddenInputRef.current.value = text;
        hiddenInputRef.current.select();
        document.execCommand('copy');
      }
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setSyncStatus({ ok: false, msg: 'Copy blocked — use Download Save instead.' });
    }
  };

  const exportFile = () => {
    const blob = new Blob([JSON.stringify(collectSave(), null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `p5r-save-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
    setSyncStatus({ ok: true, msg: 'Full save downloaded — keep this file safe.' });
  };

  const handleImport = () => {
    let parsed;
    try {
      parsed = JSON.parse(importText);
    } catch {
      setSyncStatus({ ok: false, msg: 'Invalid format — that text is not readable save data.' });
      return;
    }
    const keys = normalizeSave(parsed);
    if (!keys) {
      setSyncStatus({ ok: false, msg: 'Invalid format — no recognizable save data found.' });
      return;
    }
    // Destructive replace — guard it.
    if (!window.confirm('Restore this save? Your current in-browser progress will be replaced.')) return;
    listSaveKeys().forEach(k => localStorage.removeItem(k));
    Object.entries(keys).forEach(([k, v]) => { if (typeof v === 'string') localStorage.setItem(k, v); });
    // Reload so every tab and component rehydrates from the restored storage.
    window.location.reload();
  };

  // --- Smart Backlog Logic ---

  // Get all classroom answers for Reference tab
  const classroomAnswers = useMemo(() => {
    return APP_DATA.months.flatMap(m => 
      m.tasks
        .filter(t => t.text.includes('Answer:') || t.text.includes('Exam:') || t.text.includes('Crossword:'))
        .map(t => ({ ...t, month: m.name }))
    );
  }, []);

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

  return (
    <div className="min-h-screen text-neutral-100 p-2 md:p-8">
      <header className="max-w-6xl mx-auto mb-4 md:mb-8 border-b-4 md:border-b-8 border-red-600 pb-4 md:pb-8 flex flex-col lg:flex-row items-center justify-between gap-4 md:gap-6">
        <div className="text-center lg:text-left">
          <h1 className="text-2xl md:text-6xl font-black text-red-600 tracking-tighter italic uppercase flex items-baseline justify-center lg:justify-start flex-wrap gap-2">
            <span>P5</span>
            <span className="text-white not-italic text-lg md:text-2xl font-bold tracking-normal uppercase">Tracker</span>
            <span className="bg-red-600 text-black px-1.5 py-0.5 md:px-2 md:py-0.5 rounded not-italic text-[10px] md:text-[11px] font-black tracking-tighter align-middle ml-1 md:ml-2 border border-red-900 shadow-sm">
              v{APP_VERSION}
            </span>
          </h1>
          <p className="text-neutral-500 mt-1 md:mt-2 font-mono text-[8px] md:text-[10px] tracking-[0.25em] hidden md:block">Integrated Strategy Compendium</p>
        </div>
        <div className="flex gap-2 md:gap-4 flex-wrap justify-center items-center">
            <div className="flex items-center rounded-lg overflow-hidden border border-neutral-700 bg-neutral-900/60">
              <button onClick={() => setTheme('royal')} aria-pressed={theme === 'royal'} className={`px-2.5 py-1.5 md:px-3 md:py-2 text-[9px] md:text-[10px] font-black uppercase italic tracking-wider transition-colors ${theme === 'royal' ? 'bg-red-600 text-black' : 'text-neutral-400 hover:text-white'}`}>Royal</button>
              <button onClick={() => setTheme('night')} aria-pressed={theme === 'night'} className={`px-2.5 py-1.5 md:px-3 md:py-2 text-[9px] md:text-[10px] font-black uppercase italic tracking-wider transition-colors ${theme === 'night' ? 'bg-red-600 text-black' : 'text-neutral-400 hover:text-white'}`}>Night</button>
            </div>
            <button 
              onClick={() => setSaveModal(true)} 
              className="flex items-center gap-2 bg-red-600 hover:bg-white text-black px-3 py-1.5 md:px-6 md:py-3 font-black uppercase text-[10px] md:text-xs transition-all italic shadow-xl shadow-red-900/20 active:scale-95 border-b-2 md:border-b-4 border-red-900"
            >
              <Save className="w-3 md:w-4 h-3 md:h-4" /> <span className="hidden md:inline">Sync Terminal</span><span className="md:hidden">Sync</span>
            </button>
        </div>
      </header>

      <nav className="fixed bottom-0 left-0 right-0 z-50 md:relative md:bottom-auto md:left-auto md:right-auto md:mb-8 flex justify-between gap-1 bg-neutral-900/90 backdrop-blur-xl p-1 pb-[calc(0.25rem+env(safe-area-inset-bottom))] border-t border-neutral-800 md:bg-neutral-900 md:p-1 md:border md:rounded-xl md:shadow-2xl">
        <TabButton active={activeTab === 'cheatsheet'} onClick={() => setActiveTab('cheatsheet')} label="Briefing" icon={BookOpen} />
        <TabButton active={activeTab === 'months'} onClick={() => setActiveTab('months')} label="Calendar" icon={Calendar} />
        <TabButton active={activeTab === 'confidants'} onClick={() => setActiveTab('confidants')} label="Confidants" icon={Users} />
        <TabButton active={activeTab === 'metaverse'} onClick={() => setActiveTab('metaverse')} label="Metaverse" icon={Sword} />
        <TabButton active={activeTab === 'more' || activeTab === 'registry_view' || activeTab === 'library_view'} onClick={() => setActiveTab('more')} label="More" icon={Menu} />
      </nav>

      <main className="max-w-6xl mx-auto pb-48 md:pb-24">
        
        {/* CHEATSHEET VIEW */}
        {activeTab === 'months' && <CalendarView theme={theme} route={route} setRoute={setRoute} />}
        {activeTab === 'confidants' && <CommandSuite theme={theme} route={route} />}
        {activeTab === 'metaverse' && <MetaverseAids theme={theme} />}
        {activeTab === 'cheatsheet' && (
          <div className="space-y-6 md:space-y-12 animate-in fade-in duration-500">
            {/* Protagonist Dashboard */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              <div className="lg:col-span-2 bg-neutral-900 border border-neutral-800 rounded-xl p-4 md:p-6 shadow-xl">
                <h3 className="text-[10px] font-black text-neutral-500 uppercase tracking-[0.3em] mb-4 md:mb-6 flex items-center gap-2">
                  <Zap className="w-3 h-3 text-red-500" /> Protagonist Social Stats
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-5 gap-4 md:gap-6">
                  {SOCIAL_STATS.map(stat => {
                    const Icon = STAT_ICONS[stat.id];
                    const currentLvl = socialStats[stat.id];
                    return (
                      <div key={stat.id} className="flex flex-col gap-2 md:gap-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Icon className="w-3 h-3 text-neutral-500" />
                            <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-tighter">{stat.id}</span>
                          </div>
                          <span className="text-xs font-black text-red-500 italic">Lv.{currentLvl}</span>
                        </div>
                        <div className="flex gap-1">
                          {[1, 2, 3, 4, 5].map(lvl => (
                            <button
                              key={lvl}
                              onClick={() => updateStat(stat.id, lvl)}
                              className={`h-2 flex-1 rounded-full transition-all ${
                                lvl <= currentLvl ? stat.color : 'bg-neutral-800 hover:bg-neutral-700'
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="bg-red-700 border border-red-500 rounded-xl p-4 md:p-6 shadow-xl shadow-red-900/30 text-white edge-ink flex flex-col justify-between">
                <div>
                  <h3 className="text-[10px] font-black uppercase tracking-[0.3em] mb-4 flex items-center gap-2">
                    <Trophy className="w-3 h-3" /> Royal Readiness
                  </h3>
                  <div className="space-y-3">
                    {[
                      { arc: 'Councillor', target: 9, name: 'Maruki' },
                      { arc: 'Justice', target: 8, name: 'Akechi' },
                      { arc: 'Faith', target: 5, name: 'Kasumi' }
                    ].map(check => {
                      const current = confidantRanks[check.arc] || 0;
                      const progress = Math.min(100, (current / check.target) * 100);
                      const isDone = current >= check.target;
                      return (
                        <div key={check.arc} className="space-y-1">
                          <div className="flex justify-between text-[10px] font-black uppercase italic">
                            <span>{check.name}</span>
                            <span>{current}/{check.target}</span>
                          </div>
                          <div className="h-1.5 bg-black/30 rounded-full overflow-hidden">
                            <div 
                              className={`h-full transition-all duration-1000 ${isDone ? 'bg-white' : 'bg-white/80'}`} 
                              style={{ width: `${progress}%` }} 
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
                <p className="text-[8px] font-bold mt-4 text-white/70">System: Mandatory for 3rd Semester Access</p>
              </div>
            </div>

            <SupportCard />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-8">
             <div className="space-y-3 md:space-y-8">
                <div className="bg-neutral-900 border border-neutral-800 rounded-xl overflow-hidden shadow-2xl p-3 md:p-6">
                   <h3 className="text-lg md:text-2xl font-black italic text-red-600 uppercase mb-3 md:mb-6 flex items-center gap-2">
                     <Clock className="w-4 h-4 md:w-6 md:h-6" /> Daily Routine
                   </h3>
                   <div className="space-y-2 md:space-y-4">
                     {APP_DATA.tips.daily.map((tip, i) => (
                       <div key={i} className="flex gap-2 md:gap-4 p-2 md:p-4 bg-neutral-800/50 rounded-lg md:rounded-xl border border-neutral-800">
                          <div className="p-1.5 md:p-3 bg-neutral-900 rounded-md md:rounded-lg h-fit border border-neutral-700">
                             <CheckCircle2 className="w-3.5 h-3.5 md:w-5 md:h-5 text-red-500" />
                          </div>
                          <div>
                             <div className="font-bold text-white tracking-tight text-sm md:text-base leading-tight">{tip.text}</div>
                             <div className="text-xs text-neutral-500 mt-1 leading-relaxed">{tip.note}</div>
                          </div>
                       </div>
                     ))}
                   </div>
                </div>

                <div className="bg-neutral-900 border border-neutral-800 rounded-xl overflow-hidden shadow-2xl p-3 md:p-6">
                   <h3 className="text-lg md:text-2xl font-black italic text-blue-500 uppercase mb-3 md:mb-6 flex items-center gap-2">
                     <Calendar className="w-4 h-4 md:w-6 md:h-6" /> Weekly / Time Specific
                   </h3>
                   <div className="space-y-2 md:space-y-4">
                     {APP_DATA.tips.weekly.map((tip, i) => (
                       <div key={i} className="flex gap-2 md:gap-4 p-2 md:p-4 bg-neutral-800/50 rounded-lg md:rounded-xl border border-neutral-800">
                          <div className="p-1.5 md:p-3 bg-neutral-900 rounded-md md:rounded-lg h-fit border border-neutral-700">
                             <Calendar className="w-3.5 h-3.5 md:w-5 md:h-5 text-blue-500" />
                          </div>
                          <div>
                             <div className="font-bold text-white tracking-tight text-sm md:text-base leading-tight">{tip.text}</div>
                             <div className="text-xs text-neutral-500 mt-1 leading-relaxed">{tip.note}</div>
                          </div>
                       </div>
                     ))}
                   </div>
                </div>
             </div>

             <div className="space-y-3 md:space-y-8">
                <div className="bg-neutral-900 border border-neutral-800 rounded-xl overflow-hidden shadow-2xl p-3 md:p-6">
                   <h3 className="text-lg md:text-2xl font-black italic text-yellow-500 uppercase mb-3 md:mb-6 flex items-center gap-2">
                     <Sword className="w-4 h-4 md:w-6 md:h-6" /> Combat & Systems
                   </h3>
                   <div className="space-y-2 md:space-y-4">
                     {APP_DATA.tips.combat.map((tip, i) => (
                       <div key={i} className="flex gap-2 md:gap-4 p-2 md:p-4 bg-neutral-800/50 rounded-lg md:rounded-xl border border-neutral-800">
                          <div className="p-1.5 md:p-3 bg-neutral-900 rounded-md md:rounded-lg h-fit border border-neutral-700">
                             <Sword className="w-3.5 h-3.5 md:w-5 md:h-5 text-yellow-500" />
                          </div>
                          <div>
                             <div className="font-bold text-white tracking-tight text-sm md:text-base leading-tight">{tip.text}</div>
                             <div className="text-xs text-neutral-500 mt-1 leading-relaxed">{tip.note}</div>
                          </div>
                       </div>
                     ))}
                   </div>
                </div>

                <div className="bg-neutral-900 border border-neutral-800 rounded-xl overflow-hidden shadow-2xl p-3 md:p-6">
                   <h3 className="text-lg md:text-2xl font-black italic text-neutral-400 uppercase mb-3 md:mb-6 flex items-center gap-2">
                     <Users className="w-4 h-4 md:w-6 md:h-6" /> Weather & Environment
                   </h3>
                   <div className="space-y-2 md:space-y-4">
                     {APP_DATA.tips.weather.map((tip, i) => (
                       <div key={i} className="flex gap-2 md:gap-4 p-2 md:p-4 bg-neutral-800/50 rounded-lg md:rounded-xl border border-neutral-800">
                          <div className="p-1.5 md:p-3 bg-neutral-900 rounded-md md:rounded-lg h-fit border border-neutral-700">
                             <Users className="w-3.5 h-3.5 md:w-5 md:h-5 text-neutral-400" />
                          </div>
                          <div>
                             <div className="font-bold text-white tracking-tight text-sm md:text-base leading-tight">{tip.text}</div>
                             <div className="text-xs text-neutral-500 mt-1 leading-relaxed">{tip.note}</div>
                          </div>
                       </div>
                     ))}
                   </div>
                </div>
             </div>
            </div>

            {/* SCHOOL ANSWERS */}
            <div className="bg-neutral-900 border border-neutral-800 rounded-xl overflow-hidden shadow-2xl p-3 md:p-6">
               <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4 md:mb-6">
                 <h3 className="text-lg md:text-2xl font-black italic text-white uppercase flex items-center gap-2">
                   <Book className="w-4 h-4 md:w-6 md:h-6 text-neutral-500" /> School Answers
                 </h3>
                 <div className="relative w-full md:w-64">
                   <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
                   <input 
                     type="text" 
                     placeholder="Search answers..." 
                     value={searchTerm}
                     onChange={(e) => setSearchTerm(e.target.value)}
                     className="w-full bg-black border border-neutral-800 rounded-lg py-2 pl-10 pr-4 text-xs font-bold text-white focus:border-red-600 outline-none transition-colors"
                   />
                 </div>
               </div>
               
               <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-4 max-h-64 md:max-h-96 overflow-y-auto custom-scrollbar pr-1 md:pr-2">
                 {classroomAnswers
                   .filter(t => t.text.toLowerCase().includes(searchTerm.toLowerCase()) || t.month.toLowerCase().includes(searchTerm.toLowerCase()))
                   .map((t, i) => (
                   <div key={i} className="flex gap-3 p-3 bg-neutral-800/30 rounded-lg border border-neutral-800/50 hover:border-neutral-600 transition-colors">
                      <div className="text-xs font-black text-neutral-500 w-12 md:w-16 shrink-0 pt-0.5">{t.month}</div>
                      <div className="text-sm text-neutral-300 font-bold leading-snug">{t.text}</div>
                   </div>
                 ))}
               </div>
            </div>

            {/* CROSSWORD ANSWERS */}
            <div className="bg-neutral-900 border border-neutral-800 rounded-xl overflow-hidden shadow-2xl flex flex-col border-t-4 border-t-yellow-600">
              <div className="p-4 md:p-8 border-b border-neutral-800 bg-black/20">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-neutral-800 border border-neutral-800 text-yellow-500">
                      <Book className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-xl md:text-3xl font-black uppercase text-white tracking-tight italic">Crossword Answers</h3>
                      <p className="text-xs md:text-sm text-neutral-500 font-semibold mt-1 tracking-wider uppercase">Sequential Progression Tracking</p>
                    </div>
                  </div>
                  <div className="bg-neutral-800 px-4 py-2 rounded-xl border border-neutral-700">
                    <span className="text-xs font-black text-white italic">Puzzles Completed: {Object.keys(checkedItems).filter(k => k.startsWith('cw_ans_')).length} / 38</span>
                  </div>
                </div>
                <p className="text-xs md:text-sm text-neutral-400 mt-4 leading-relaxed max-w-3xl">
                  Crosswords in Royal are sequential. They always appear in this order, regardless of the calendar date. Check them off here to update your Calendar hints.
                </p>
              </div>

              <div className="p-4 md:p-8 max-h-[400px] overflow-y-auto custom-scrollbar bg-black/10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                  {Array.isArray(CROSSWORD_DATA) && CROSSWORD_DATA.map((cw, idx) => (
                    <div 
                      key={cw.id}
                      onClick={() => toggleItem(cw.id)}
                      className={`flex items-center gap-3 p-3 rounded-xl border transition-all cursor-pointer ${
                        checkedItems[cw.id] 
                          ? 'bg-neutral-950/50 border-neutral-800 opacity-40' 
                          : 'bg-neutral-800/30 border-neutral-800 hover:bg-neutral-800/50 hover:border-yellow-900/50'
                      }`}
                    >
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center font-black text-[10px] shrink-0 ${checkedItems[cw.id] ? 'bg-neutral-800 text-neutral-500' : 'bg-yellow-600 text-black'}`}>
                        {idx + 1}
                      </div>
                                              <div className="flex-1 min-w-0">
                                                <div className={`text-xs font-bold truncate ${checkedItems[cw.id] ? 'text-neutral-500 line-through' : 'text-neutral-300'}`}>{cw.q}</div>
                                                <div className={`text-sm font-black italic ${checkedItems[cw.id] ? 'text-neutral-600' : 'text-white'}`}>{cw.a}</div>
                                              </div>                      {checkedItems[cw.id] ? <CheckSquare className="w-4 h-4 text-green-500" /> : <Square className="w-4 h-4 text-neutral-700" />}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

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
                className="group bg-neutral-900 border border-neutral-800 p-4 md:p-8 rounded-xl md:rounded-xl text-left hover:border-red-600 transition-all shadow-xl relative overflow-hidden flex md:block items-center gap-4"
              >
                <div className="absolute top-0 right-0 p-4 opacity-5 md:opacity-10 group-hover:opacity-20 transition-opacity hidden md:block">
                  <Ghost className="w-24 h-24" />
                </div>
                <div className="p-3 bg-neutral-800 rounded-lg md:bg-transparent md:p-0">
                  <Ghost className="w-5 h-5 md:w-8 md:h-8 text-red-600 md:mb-4" />
                </div>
                <div>
                  <h3 className="text-sm md:text-xl font-black uppercase italic text-white md:mb-2">Persona Registry</h3>
                  <p className="text-[10px] md:text-xs text-neutral-500 font-bold uppercase tracking-widest leading-snug">
                    Captured Specimens & Demons
                    <span className="hidden md:block mt-2 text-red-600">{registryStats.percent}% Completed</span>
                  </p>
                </div>
              </button>

              {/* Reference Hub Access */}
              <button 
                onClick={() => setActiveTab('library_view')}
                className="group bg-neutral-900 border border-neutral-800 p-4 md:p-8 rounded-xl md:rounded-xl text-left hover:border-blue-600 transition-all shadow-xl relative overflow-hidden flex md:block items-center gap-4"
              >
                <div className="absolute top-0 right-0 p-4 opacity-5 md:opacity-10 group-hover:opacity-20 transition-opacity hidden md:block">
                  <Library className="w-24 h-24" />
                </div>
                <div className="p-3 bg-neutral-800 rounded-lg md:bg-transparent md:p-0">
                  <Library className="w-5 h-5 md:w-8 md:h-8 text-blue-500 md:mb-4" />
                </div>
                <div>
                  <h3 className="text-sm md:text-xl font-black uppercase italic text-white md:mb-2">Reference Hub</h3>
                  <p className="text-[10px] md:text-xs text-neutral-500 font-bold uppercase tracking-widest leading-snug">
                    Answers, Calculators, & Guides
                  </p>
                </div>
              </button>

              {/* What's New */}
              <button 
                onClick={() => { setChangelogFullHistory(true); setShowChangelog(true); }}
                className="group bg-neutral-900 border border-neutral-800 p-4 md:p-8 rounded-xl md:rounded-xl text-left hover:border-yellow-600 transition-all shadow-xl relative overflow-hidden flex md:block items-center gap-4"
              >
                <div className="absolute top-0 right-0 p-4 opacity-5 md:opacity-10 group-hover:opacity-20 transition-opacity hidden md:block">
                  <Zap className="w-24 h-24" />
                </div>
                <div className="p-3 bg-neutral-800 rounded-lg md:bg-transparent md:p-0">
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
                className="group bg-neutral-900 border border-neutral-800 p-4 md:p-8 rounded-xl md:rounded-xl text-left hover:border-blue-500 transition-all shadow-xl relative overflow-hidden flex md:block items-center gap-4"
              >
                <div className="absolute top-0 right-0 p-4 opacity-5 md:opacity-10 group-hover:opacity-20 transition-opacity hidden md:block">
                  <Trophy className="w-24 h-24" />
                </div>
                <div className="p-3 bg-neutral-800 rounded-lg md:bg-transparent md:p-0">
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
                className="group bg-neutral-900 border border-neutral-800 p-4 md:p-8 rounded-xl md:rounded-xl text-left hover:border-neutral-400 transition-all shadow-xl relative overflow-hidden flex md:block items-center gap-4"
              >
                <div className="absolute top-0 right-0 p-4 opacity-5 md:opacity-10 group-hover:opacity-20 transition-opacity hidden md:block">
                  <Info className="w-24 h-24" />
                </div>
                <div className="p-3 bg-neutral-800 rounded-lg md:bg-transparent md:p-0">
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
                className="group bg-neutral-900 border border-neutral-800 p-4 md:p-8 rounded-xl md:rounded-xl text-left hover:border-amber-500 transition-all shadow-xl relative overflow-hidden flex md:block items-center gap-4"
              >
                <div className="absolute top-0 right-0 p-4 opacity-5 md:opacity-10 group-hover:opacity-20 transition-opacity hidden md:block">
                  <Heart className="w-24 h-24" />
                </div>
                <div className="p-3 bg-neutral-800 rounded-lg md:bg-transparent md:p-0">
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
        {activeTab === 'registry_view' && (
          <div className="space-y-4 md:space-y-6 animate-in fade-in duration-500 min-h-screen">
             {/* Header Section */}
             <div className="flex justify-between items-center gap-4 px-1 md:px-0">
               <button onClick={() => setActiveTab('more')} className="flex items-center gap-2 text-neutral-500 hover:text-white transition-colors font-bold text-xs uppercase tracking-widest py-2">
                  <ChevronRight className="w-5 h-5 rotate-180" /> <span className="hidden md:inline">Back to System Menu</span><span className="md:hidden">Back</span>
               </button>
               
               <div className="bg-neutral-900 border border-neutral-800 px-3 py-1.5 md:px-4 md:py-2 rounded-lg md:rounded-xl flex items-center gap-3 md:gap-4 shadow-sm">
                  <div className="flex flex-col items-end">
                    <span className="text-[8px] md:text-[10px] font-black text-neutral-500 uppercase tracking-widest">Progress</span>
                    <span className="text-lg md:text-xl font-black text-red-600 italic leading-none">{registryStats.percent}%</span>
                  </div>
                  <div className="w-16 md:w-24 h-1.5 md:h-2 bg-neutral-800 rounded-full overflow-hidden border border-neutral-700">
                    <div className="h-full bg-red-600 transition-all duration-1000" style={{ width: `${registryStats.percent}%` }} />
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
                            className="w-full md:w-auto bg-neutral-800 border border-neutral-700 rounded-lg pl-4 pr-10 py-3 text-xs font-black uppercase tracking-widest text-white outline-none focus:border-red-600 appearance-none shadow-sm"
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
                  </div>

                  {/* List */}
                  <div className="p-4 md:p-6 space-y-8 min-h-[50vh]">
                    {Object.entries(personasByArcana).map(([arc, personas]) => (
                      <div key={arc} className="space-y-3">
                        <h4 className="text-xs font-black text-red-600 uppercase tracking-[0.4em] flex items-center gap-2 border-b border-neutral-800 pb-2">
                          <Star className="w-3 h-3 fill-current" /> {arc}
                        </h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                          {personas.map(p => {
                            const isChecked = checkedItems[`p_${p.name}`];
                            return (
                              <div 
                                key={p.name}
                                onClick={() => toggleItem(`p_${p.name}`)}
                                className={`flex items-center justify-between p-3 md:p-3 rounded-lg border transition-all cursor-pointer group active:scale-[0.98] ${
                                  isChecked 
                                    ? 'bg-neutral-950/50 border-neutral-800 opacity-40' 
                                    : 'bg-neutral-800/30 border-neutral-800 hover:border-neutral-600 hover:bg-neutral-800/50'
                                }`}
                              >
                                <div className="flex items-center gap-3 min-w-0">
                                  <div className={`w-8 h-8 rounded-md flex items-center justify-center font-black text-[10px] shrink-0 ${isChecked ? 'bg-neutral-800 text-neutral-500' : 'bg-red-600 text-black'}`}>
                                    {p.level}
                                  </div>
                                  <div className="min-w-0">
                                    <div className={`text-sm font-black italic truncate ${isChecked ? 'text-neutral-500 line-through' : 'text-white'}`}>{p.name}</div>
                                    <div className="flex gap-2">
                                      {p.special && <span className="text-[8px] font-black uppercase text-yellow-500 tracking-tighter">Special</span>}
                                      {p.dlc && <span className="text-[8px] font-black uppercase text-blue-500 tracking-tighter">DLC</span>}
                                      {p.rare && <span className="text-[8px] font-black uppercase text-purple-500 tracking-tighter">Rare</span>}
                                    </div>
                                  </div>
                                </div>
                                {isChecked ? <CheckSquare className="w-5 h-5 text-green-500 shrink-0" /> : <Square className="w-5 h-5 text-neutral-700 group-hover:text-neutral-500 shrink-0" />}
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
                  </div>
                </div>
             </div>
          </div>
        )}

        {/* SUB-VIEW: REFERENCE */}
        {activeTab === 'library_view' && (
          <div className="space-y-4 md:space-y-8 animate-in fade-in duration-500">
            <button onClick={() => setActiveTab('more')} className="flex items-center gap-2 text-neutral-500 hover:text-white transition-colors mb-2 md:mb-4 font-bold text-[10px] md:text-xs uppercase tracking-widest">
                <ChevronRight className="w-4 h-4 rotate-180" /> Back to System Menu
            </button>
            <div className="text-center max-w-2xl mx-auto mb-6 md:mb-12">
              <h2 className="text-2xl md:text-5xl font-black italic text-white uppercase tracking-tighter mb-2 md:mb-4">Command Center</h2>
              <p className="text-[10px] md:text-sm text-neutral-500 font-bold uppercase tracking-widest leading-relaxed px-4">
                External tools and curated community intelligence.
              </p>
            </div>

            <div className="space-y-8 md:space-y-12">
              {Array.isArray(RESOURCE_DATA) && RESOURCE_DATA.map((section) => {
                const SectionIcon = RESOURCE_ICONS[section.icon] || Info;
                return (
                  <div key={section.id} className="space-y-4 md:space-y-6">
                    {/* Section Header - Vertical Stack */}
                    <div className="flex items-center gap-3 border-b border-neutral-800 pb-3 md:pb-4 mx-2 md:mx-0">
                      <div className={`p-1.5 md:p-2 rounded-md md:rounded-lg bg-neutral-900 border border-neutral-800 ${section.color}`}>
                        <SectionIcon className="w-4 h-4 md:w-5 md:h-5" />
                      </div>
                      <div>
                        <h3 className="text-base md:text-2xl font-black uppercase text-white tracking-tight leading-none">{section.title}</h3>
                        <p className="text-[10px] md:text-sm text-neutral-500 font-semibold mt-1 tracking-wider">{section.description}</p>
                      </div>
                    </div>

                    {/* Items Grid - Horizontal layout within section */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6 px-2 md:px-0">
                      {section.items.map((item, idx) => {
                        const FormatIcon = FORMAT_ICONS[item.format] || Info;
                        let hostname = 'EXTERNAL';
                        try {
                           if (item.isLocked) {
                             hostname = 'COMING SOON';
                           } else if (item.url) {
                             hostname = new URL(item.url).hostname.replace('www.', '');
                           }
                        } catch {
                           console.warn('Invalid URL:', item.url);
                        }
                        
                        return (
                          <a 
                            key={idx}
                            href={item.isLocked ? undefined : item.url}
                            target={item.isLocked ? undefined : "_blank"}
                            rel={item.isLocked ? undefined : "noopener noreferrer"}
                            className={`group bg-neutral-900 border border-neutral-800 rounded-xl md:rounded-xl p-4 md:p-6 transition-all flex flex-col justify-between ${
                              item.isLocked 
                                ? 'cursor-not-allowed border-neutral-800' 
                                : item.isGold 
                                  ? 'bg-red-600/5 border-red-600/30 hover:bg-red-600/10 hover:border-red-500' 
                                  : 'bg-neutral-800/30 border-neutral-800 hover:bg-neutral-800 hover:border-neutral-600'
                            }`}
                          >
                            <div>
                              <div className="flex items-center justify-between mb-3 md:mb-4">
                              <div className="flex items-center gap-2">
                                  <FormatIcon className={`w-3.5 h-3.5 md:w-4 md:h-4 ${item.isLocked ? 'text-neutral-600' : 'text-neutral-500 group-hover:text-red-500'} transition-colors`} />
                                  <span className="text-[10px] font-black tracking-widest text-neutral-600">{item.format}</span>
                                </div>
                                {item.isLocked ? (
                                  <div className="px-1.5 py-0.5 bg-neutral-800 border border-neutral-700 rounded text-[9px] font-black uppercase text-neutral-600">Upcoming</div>
                                ) : (
                                  <ExternalLink className="w-3.5 h-3.5 md:w-4 md:h-4 text-neutral-700 group-hover:text-white transition-colors" />
                                )}
                              </div>
                              <h4 className={`text-sm md:text-lg font-black uppercase mb-1 md:mb-2 leading-tight transition-colors ${
                                item.isLocked ? 'text-white' : 'text-white group-hover:text-red-500'
                              }`}>
                                {item.title}
                              </h4>
                              <p className={`text-[11px] md:text-sm font-medium leading-relaxed ${
                                item.isLocked ? 'text-neutral-500' : 'text-neutral-400'
                              }`}>
                                {item.desc}
                              </p>
                            </div>
                            
                            <div className="mt-4 md:mt-6 pt-3 md:pt-4 border-t border-neutral-800/50 flex items-center justify-between">
                              <span className="text-[9px] md:text-xs font-bold uppercase tracking-[0.2em] text-neutral-600 group-hover:text-neutral-400 transition-colors flex items-center gap-2">
                                {hostname}
                              </span>
                              {item.isGold && !item.isLocked && <Star className="w-3.5 h-3.5 md:w-4 md:h-4 text-red-500 fill-current" />}
                            </div>
                          </a>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

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

      {/* SAVE/LOAD MODAL */}
      <Modal isOpen={saveModal} onClose={() => { setSaveModal(false); setSyncStatus(null); }} className="max-w-2xl border-red-600 shadow-[0_0_50px_rgba(220,38,38,0.2)] rounded-[3rem]">
           <div className="p-10">
              <h2 className="text-4xl font-black text-red-600 italic uppercase mb-2 tracking-tighter">Sync Terminal</h2>
              <p className="text-neutral-400 text-sm mb-8 font-mono">Full backup — all progress, every checklist, route &amp; theme. If your browser clears on exit, keep this file: importing it restores everything.</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
                 <button onClick={exportFile} className="p-8 bg-red-600 hover:bg-white text-black font-black rounded-xl transition-all flex flex-col items-center gap-3 shadow-xl group">
                    <Download className="w-10 h-10" />
                    <span className="text-xs tracking-widest font-bold">Download Save</span>
                 </button>
                 <div className="flex flex-col gap-3">
                    <button onClick={handleCopy} className="p-4 bg-neutral-800 hover:bg-neutral-700 text-white font-black rounded-xl transition-all flex items-center justify-center gap-3 text-xs tracking-widest font-bold">
                       {copied ? <ClipboardCheck className="text-green-500" /> : <Copy />}
                       {copied ? "Memory Synced!" : "Copy Data String"}
                    </button>
                    <textarea placeholder="Paste save data here..." value={importText} onChange={(e) => setImportText(e.target.value)} className="w-full h-32 bg-black border border-neutral-800 rounded-xl p-4 font-mono text-[10px] text-red-500 outline-none focus:border-red-600 mb-2" />
                    <button onClick={handleImport} className="w-full bg-white text-black p-4 rounded-xl text-xs font-bold tracking-widest">Apply Import</button>
                 </div>
              </div>
              {syncStatus && (
                <p className={`text-center text-[11px] font-bold tracking-widest mb-4 ${syncStatus.ok ? 'text-green-500' : 'text-red-500'}`}>{syncStatus.msg}</p>
              )}
              <input type="text" ref={hiddenInputRef} className="opacity-0 absolute pointer-events-none" />
              <button onClick={() => { setSaveModal(false); setSyncStatus(null); }} className="w-full text-neutral-600 hover:text-red-500 text-[10px] font-black tracking-[0.5em] transition-colors uppercase">Close Terminal</button>
           </div>
      </Modal>
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
    <button onClick={onClick} className={`flex-1 py-2 md:py-4 px-1 md:px-2 rounded-lg font-black uppercase italic text-[8px] md:text-xs tracking-tighter transition-all duration-300 flex flex-col md:flex-row items-center justify-center gap-0.5 md:gap-2 ${
      active 
        ? (isSpecial ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/40' : 'bg-red-600 text-black shadow-lg shadow-red-900/40 ring-1 ring-inset ring-black/40') 
        : (isSpecial ? 'text-blue-500 hover:text-blue-400' : 'text-neutral-500 hover:text-white')
    }`}>
      {Icon && <Icon className="w-4 h-4 md:w-4 md:h-4" />}
      <span className="scale-90 md:scale-100">{label.replace(' ✨', '')}</span>
      {isSpecial && <span className="md:hidden">✨</span>}
    </button>
  );
}

// eslint-disable-next-line no-unused-vars -- Icon is rendered as a JSX element below
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

function Modal({ isOpen, onClose, children, className = "max-w-lg" }) {
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleEsc);
      document.body.style.overflow = 'hidden'; // Prevent background scrolling
    }
    return () => {
      window.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/95 backdrop-blur-md flex items-center justify-center p-2 md:p-4 z-[100] animate-in fade-in duration-200">
      <div 
        className="absolute inset-0 cursor-pointer" 
        onClick={onClose} 
        aria-label="Close modal"
      />
      <div className={`relative bg-neutral-900 border-2 border-neutral-800 rounded-[2.5rem] md:rounded-[3rem] w-full ${className} shadow-2xl z-10 flex flex-col max-h-[95vh] md:max-h-[90vh] overflow-hidden`}>
        <div className="overflow-y-auto custom-scrollbar flex-1">
          {children}
        </div>
      </div>
    </div>
  );
}
