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
  Lightbulb
} from 'lucide-react';

import { APP_DATA } from './data/gameData';
import { CONFIDANT_STAT_GATES, SOCIAL_STATS } from './data/socialStats';
import { RELEASE_NOTES } from './data/releaseNotes';
import { ROADMAP } from './data/roadmap';
import { APP_VERSION } from './data/version';

import { useUserStats } from './hooks/useUserStats';
import { useSmartSupport } from './hooks/useSmartSupport';
import { SupportToast } from './components/SupportToast';

const STAT_ICONS = {
  Knowledge: Book,
  Guts: Sword,
  Proficiency: Wrench,
  Kindness: Heart,
  Charm: Sparkles
};

// Analytics Helper
const trackEvent = (eventName, eventData = {}) => {
  if (import.meta.env.PROD && window.umami) {
    window.umami.track(eventName, eventData);
  }
};

export default function App() {
  const [activeTab, setActiveTab] = useState(() => localStorage.getItem('p5r_activeTab') || 'cheatsheet');
  const [anchoredMonth, setAnchoredMonth] = useState(() => localStorage.getItem('p5r_anchoredMonth') || 'april');
  const [currentMonth, setCurrentMonth] = useState(() => localStorage.getItem('p5r_anchoredMonth') || 'april');
  
  // Data State
  const [checkedItems, setCheckedItems] = useState(() => {
    try {
      const saved = localStorage.getItem('p5r_checkedItems');
      return saved ? JSON.parse(saved) : {};
    } catch (e) { return {}; }
  });

  const [socialStats, setSocialStats] = useState(() => {
    try {
      const saved = localStorage.getItem('p5r_socialStats');
      return saved ? JSON.parse(saved) : { Knowledge: 1, Guts: 1, Proficiency: 1, Kindness: 1, Charm: 1 };
    } catch (e) { return { Knowledge: 1, Guts: 1, Proficiency: 1, Kindness: 1, Charm: 1 }; }
  });
  
  const [confidantRanks, setConfidantRanks] = useState(() => {
    try {
      const saved = localStorage.getItem('p5r_confidantRanks');
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    
    const initial = {};
    APP_DATA.confidants.forEach(c => initial[c.arcana] = 0);
    return initial;
  });

  // --- Smart Support & Analytics ---
  const userStats = useUserStats(checkedItems, confidantRanks);
  const { showToast, toastType, handleDismiss, handleSupport } = useSmartSupport(userStats);

  const [expandedGuides, setExpandedGuides] = useState({});

  useEffect(() => {
    if (import.meta.env.DEV) {
      document.title = 'P5Tracker - DEV';
    } else {
      document.title = 'P5 Tracker';
    }
  }, []);

  const toggleGuide = (arcana) => {
    setExpandedGuides(prev => ({ ...prev, [arcana]: !prev[arcana] }));
  };

  // Persist State to Local Storage
  useEffect(() => {
    localStorage.setItem('p5r_activeTab', activeTab);
  }, [activeTab]);

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

  const [expandedPalace, setExpandedPalace] = useState(null);
  const [expandedMementos, setExpandedMementos] = useState(null);
  const [showArchived, setShowArchived] = useState(false);
  const [saveModal, setSaveModal] = useState(false);
  const [showChangelog, setShowChangelog] = useState(false);
  const [showRoadmap, setShowRoadmap] = useState(false);
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [importText, setImportText] = useState('');
  const [copied, setCopied] = useState(false);
  const hiddenInputRef = useRef(null);

  // Check version for changelog
  useEffect(() => {
    const lastSeen = localStorage.getItem('p5r_lastSeenVersion');
    
    // If first visit, just record the version and don't show changelog
    if (!lastSeen) {
      localStorage.setItem('p5r_lastSeenVersion', APP_VERSION);
      return;
    }

    // Only show for Major.Minor changes (e.g. 2.1.0 -> 2.2.0), not patches
    const getMinor = (v) => v ? v.split('.').slice(0, 2).join('.') : null;
    
    if (getMinor(lastSeen) !== getMinor(APP_VERSION)) {
      setShowChangelog(true);
      localStorage.setItem('p5r_lastSeenVersion', APP_VERSION);
    }
  }, []);

  // Show onboarding for new users
  useEffect(() => {
    if (!localStorage.getItem('p5r_onboardingComplete')) {
      setShowOnboarding(true);
    }
  }, []);

  const completeOnboarding = () => {
    setShowOnboarding(false);
    localStorage.setItem('p5r_onboardingComplete', 'true');
    trackEvent('onboarding-complete');
  };


  const updateRank = (arcana, val) => {
    setConfidantRanks(prev => ({ ...prev, [arcana]: Math.min(10, Math.max(0, parseInt(val) || 0)) }));
  };

  const updateStat = (stat, val) => {
    setSocialStats(prev => ({ ...prev, [stat]: Math.min(5, Math.max(1, parseInt(val) || 1)) }));
  };

  const isGateBlocked = (arcana, currentRank) => {
    const nextRank = currentRank + 1;
    const gate = CONFIDANT_STAT_GATES[arcana]?.[nextRank];
    if (!gate) return false;
    return socialStats[gate.stat] < gate.lvl ? gate : false;
  };

  const toggleItem = (id) => {
    setCheckedItems(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const handleCopy = () => {
    const data = JSON.stringify({ checkedItems, confidantRanks, anchoredMonth, socialStats });
    if (hiddenInputRef.current) {
      hiddenInputRef.current.value = data;
      hiddenInputRef.current.select();
      document.execCommand('copy');
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const exportFile = () => {
    const data = JSON.stringify({ checkedItems, confidantRanks, anchoredMonth, socialStats });
    const blob = new Blob([data], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `p5r_tactician_save.txt`;
    a.click();
  };

  const handleImport = () => {
    try {
      const parsed = JSON.parse(importText);
      if (parsed.checkedItems) setCheckedItems(parsed.checkedItems);
      if (parsed.confidantRanks) setConfidantRanks(parsed.confidantRanks);
      if (parsed.socialStats) setSocialStats(parsed.socialStats);
      if (parsed.anchoredMonth) {
        setAnchoredMonth(parsed.anchoredMonth);
        setCurrentMonth(parsed.anchoredMonth);
      }
      setSaveModal(false);
      setImportText('');
      alert("Data synchronized.");
    } catch (e) {
      alert("Invalid format.");
    }
  };

  // --- Smart Backlog Logic ---
  const getSmartMonthData = (monthId) => {
    const viewingMonthIndex = APP_DATA.months.findIndex(m => m.id === monthId);
    const anchoredMonthIndex = APP_DATA.months.findIndex(m => m.id === anchoredMonth);
    
    if (viewingMonthIndex === -1) return null;

    const viewingMonthData = APP_DATA.months[viewingMonthIndex];
    
    // 1. Aggregate Backlog
    const backlogTasks = [];
    
    if (viewingMonthIndex === anchoredMonthIndex) {
      for (let i = 0; i < viewingMonthIndex; i++) {
        APP_DATA.months[i].tasks.forEach(task => {
          if (!checkedItems[task.id] && !task.isMissable) {
            backlogTasks.push({ ...task, sourceMonth: APP_DATA.months[i].name, isOverdue: true });
          }
        });
      }
    }

    // 2. Calculate Effective Targets
    const effectiveTargets = {};
    
    APP_DATA.confidants.forEach(confidant => {
      if (!confidant.monthlyTargets) return;

      for (let i = 0; i <= viewingMonthIndex; i++) {
        const m = APP_DATA.months[i];
        const targetForMonth = confidant.monthlyTargets[m.id];
        
        if (targetForMonth !== undefined) {
          if (!effectiveTargets[confidant.arcana] || targetForMonth > effectiveTargets[confidant.arcana].r) {
            effectiveTargets[confidant.arcana] = { 
              arc: `${confidant.arcana} (${confidant.name})`, 
              r: targetForMonth,
              sourceMonth: m.name,
              isCurrent: i === viewingMonthIndex 
            };
          }
        }
      }
    });

    const activeTargets = Object.values(effectiveTargets).filter(t => {
      const arcanaKey = t.arc.split(' (')[0]; 
      const currentRank = confidantRanks[arcanaKey] || 0;
      if (t.isCurrent) return true;
      if (currentRank < t.r) return true;
      return false;
    }).sort((a, b) => {
      const aDeficit = (confidantRanks[a.arc.split(' (')[0]] || 0) < a.r;
      const bDeficit = (confidantRanks[b.arc.split(' (')[0]] || 0) < b.r;
      if (aDeficit && !bDeficit) return -1;
      if (!aDeficit && bDeficit) return 1;
      return b.r - a.r;
    });

    return {
      ...viewingMonthData,
      tasks: [...backlogTasks, ...viewingMonthData.tasks],
      smartTargets: activeTargets,
      status: viewingMonthIndex < anchoredMonthIndex ? 'HISTORY' : viewingMonthIndex === anchoredMonthIndex ? 'ACTIVE' : 'PREVIEW'
    };
  };

  const activeMonthData = getSmartMonthData(currentMonth);

  // --- Bottleneck detection ---
  const bottleneckStats = useMemo(() => {
    const stats = new Set();
    APP_DATA.confidants.forEach(c => {
      const gate = isGateBlocked(c.arcana, confidantRanks[c.arcana]);
      if (gate) stats.add(gate.stat);
    });
    return stats;
  }, [socialStats, confidantRanks]);

  const isTaskStatBuilding = (taskText) => {
    const text = taskText.toLowerCase();
    for (const stat of SOCIAL_STATS) {
      if (text.includes(stat.id.toLowerCase()) && bottleneckStats.has(stat.id)) {
        return stat.id;
      }
    }
    return null;
  };

  // Get all classroom answers for Reference tab
  const classroomAnswers = useMemo(() => {
    return APP_DATA.months.flatMap(m => 
      m.tasks
        .filter(t => t.text.includes('Answer:') || t.text.includes('Exam:') || t.text.includes('Crossword:'))
        .map(t => ({ ...t, month: m.name }))
    );
  }, []);

  // Auto-expand relevant palace
  useEffect(() => {
    const anchoredMonthIdx = APP_DATA.months.findIndex(m => m.id === anchoredMonth);
    const palaceIdx = APP_DATA.palaces.findIndex(p => {
      const startIdx = APP_DATA.months.findIndex(m => m.id === p.monthId);
      const endIdx = p.deadlineMonth ? APP_DATA.months.findIndex(m => m.id === p.deadlineMonth) : startIdx;
      return anchoredMonthIdx >= startIdx && anchoredMonthIdx <= endIdx;
    });
    if (palaceIdx !== -1) setExpandedPalace(palaceIdx);
  }, [anchoredMonth]);

  // Auto-expand relevant mementos
  useEffect(() => {
    const anchoredMonthIdx = APP_DATA.months.findIndex(m => m.id === anchoredMonth);
    const memIdx = APP_DATA.mementos.findIndex(mem => {
      // Find all months that match the timing string (e.g. "May/June")
      const monthIndices = APP_DATA.months
        .map((m, i) => mem.timing.toLowerCase().includes(m.name.toLowerCase()) ? i : -1)
        .filter(i => i !== -1);
      
      if (monthIndices.length === 0) return false;
      const startIdx = Math.min(...monthIndices);
      const endIdx = Math.max(...monthIndices);
      return anchoredMonthIdx >= startIdx && anchoredMonthIdx <= endIdx;
    });
    if (memIdx !== -1) setExpandedMementos(memIdx);
  }, [anchoredMonth]);

  // Group Mementos logic
  const mementosGroups = useMemo(() => {
    const anchoredMonthIdx = APP_DATA.months.findIndex(m => m.id === anchoredMonth);
    const history = [];
    const active = [];

    APP_DATA.mementos.forEach((mem, index) => {
      const memMonthIdx = APP_DATA.months.findIndex(m => mem.timing.toLowerCase().includes(m.name.toLowerCase()));
      const isHistory = memMonthIdx !== -1 && memMonthIdx < anchoredMonthIdx - 1;
      const memWithIdx = { ...mem, originalIdx: index };
      if (isHistory) history.push(memWithIdx);
      else active.push(memWithIdx);
    });
    return { history, active };
  }, [anchoredMonth]);

  // Group Roadmap Tasks
  const groupedTasks = useMemo(() => {
    if (!activeMonthData) return null;
    
    const groups = {
      critical: [],
      timeline: [],
      strategy: []
    };

    activeMonthData.tasks.forEach(task => {
      const t = task.text;
      
      // 1. Strategies (Non-actionable tips)
      if (t.startsWith('Strategy:') || t.startsWith('Focus:') || t.startsWith('Optimization:') || t.startsWith('Boss Strategy:')) {
        groups.strategy.push(task);
        return;
      }

      // 2. Strict Critical: Deadlines, Rank Requirements, Palace Milestones
      if (t.includes('DEADLINE') || t.includes('MUST be') || t.includes('Secure Route') || t.includes('Calling Card') || t.includes('CRITICAL')) {
        groups.critical.push(task);
      } 
      // 3. Standard Timeline
      else {
        groups.timeline.push(task);
      }
    });

    // Helper to sort by date (Academic Year: April=4 ... Jan=13, Feb=14, Mar=15)
    const getDateValue = (text) => {
      const match = text.match(/^(\d{1,2})\/(\d{1,2})/);
      if (match) {
        let m = parseInt(match[1]);
        const d = parseInt(match[2]);
        if (m < 4) m += 12; // Treat Jan-Mar as next year
        return m * 100 + d;
      }
      return 99999; // Undated items at the bottom
    };

    groups.timeline.sort((a, b) => getDateValue(a.text) - getDateValue(b.text));
    
    return groups;
  }, [activeMonthData]);

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 font-sans p-2 md:p-8">
      <header className="max-w-6xl mx-auto mb-4 md:mb-8 border-b-4 md:border-b-8 border-red-600 pb-4 md:pb-8 flex flex-col lg:flex-row items-center justify-between gap-4 md:gap-6">
        <div className="text-center lg:text-left">
          <h1 className="text-2xl md:text-6xl font-black text-red-600 tracking-tighter italic uppercase flex items-baseline justify-center lg:justify-start flex-wrap gap-2">
            <span>P5</span>
            <span className="text-white not-italic text-lg md:text-2xl font-bold tracking-normal uppercase">Tracker</span>
            <span className="bg-red-600 text-black px-1.5 py-0.5 md:px-2 md:py-0.5 rounded not-italic text-[10px] md:text-[11px] font-black tracking-tighter align-middle ml-1 md:ml-2 border border-red-900 shadow-sm">
              v{APP_VERSION}
            </span>
          </h1>
          <p className="text-neutral-500 mt-1 md:mt-2 font-mono uppercase text-[8px] md:text-[10px] tracking-[0.4em] hidden md:block">Integrated Strategy Compendium</p>
        </div>
        <div className="flex gap-2 md:gap-4 flex-wrap justify-center items-center">
            <a 
              href="https://ko-fi.com/K3K11RWTSL" 
              target="_blank" 
              rel="noopener noreferrer"
              onClick={() => trackEvent('support-link-click')}
              className="flex items-center gap-2 bg-[#FF5E5B] hover:bg-white text-white hover:text-black px-3 py-1.5 md:px-6 md:py-3 font-black uppercase text-[10px] md:text-xs transition-all italic shadow-xl shadow-red-900/20 border-b-2 md:border-b-4 border-[#c44040] hover:border-neutral-300 group"
              title="Support the Dev"
            >
              <Heart className="w-3 md:w-4 h-3 md:h-4 fill-current group-hover:text-red-500 transition-colors" /> 
              <span className="hidden md:inline">Support</span>
            </a>
            <button 
              onClick={() => { setSaveModal(true); trackEvent('sync-terminal-open'); }} 
              className="flex items-center gap-2 bg-red-600 hover:bg-white text-black px-3 py-1.5 md:px-6 md:py-3 font-black uppercase text-[10px] md:text-xs transition-all italic shadow-xl shadow-red-900/20 active:scale-95 border-b-2 md:border-b-4 border-red-900"
            >
              <Save className="w-3 md:w-4 h-3 md:h-4" /> <span className="hidden md:inline">Sync Terminal</span><span className="md:hidden">Sync</span>
            </button>
        </div>
      </header>

      <nav className="fixed bottom-0 left-0 right-0 z-50 md:relative md:bottom-auto md:left-auto md:right-auto md:mb-8 flex justify-between gap-1 bg-neutral-900/90 backdrop-blur-xl p-1 pb-[calc(0.25rem+env(safe-area-inset-bottom))] border-t border-neutral-800 md:bg-neutral-900 md:p-1 md:border md:rounded-2xl md:shadow-2xl">
        <TabButton active={activeTab === 'cheatsheet'} onClick={() => setActiveTab('cheatsheet')} label="Guide" icon={BookOpen} />
        <TabButton active={activeTab === 'months'} onClick={() => setActiveTab('months')} label="Roadmap" icon={Calendar} />
        <TabButton active={activeTab === 'confidants'} onClick={() => setActiveTab('confidants')} label="Confidants" icon={Users} />
        <TabButton active={activeTab === 'palaces'} onClick={() => setActiveTab('palaces')} label="Palaces" icon={MapPin} />
        <TabButton active={activeTab === 'mementos'} onClick={() => setActiveTab('mementos')} label="Mementos" icon={Target} />
      </nav>

      <main className="max-w-6xl mx-auto pb-48 md:pb-24">
        
        {/* CHEATSHEET VIEW */}
        {activeTab === 'cheatsheet' && (
          <div className="space-y-6 md:space-y-12 animate-in fade-in duration-500">
            {/* Protagonist Dashboard */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              <div className="lg:col-span-2 bg-neutral-900 border border-neutral-800 rounded-3xl p-4 md:p-6 shadow-xl">
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
                            <Icon className="w-3 h-3 text-neutral-400" />
                            <span className="text-[10px] font-bold text-white uppercase tracking-tighter">{stat.id}</span>
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

              <div className="bg-red-600 border border-red-500 rounded-3xl p-4 md:p-6 shadow-xl shadow-red-900/20 text-black flex flex-col justify-between">
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
                          <div className="h-1.5 bg-black/20 rounded-full overflow-hidden">
                            <div 
                              className={`h-full transition-all duration-1000 ${isDone ? 'bg-white' : 'bg-black'}`} 
                              style={{ width: `${progress}%` }} 
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
                <p className="text-[8px] font-bold uppercase mt-4 opacity-60">System: Mandatory for 3rd Semester Access</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-8">
             <div className="space-y-3 md:space-y-8">
                <div className="bg-neutral-900 border border-neutral-800 rounded-3xl overflow-hidden shadow-2xl p-3 md:p-6">
                   <h3 className="text-lg md:text-2xl font-black italic text-red-600 uppercase mb-3 md:mb-6 flex items-center gap-2">
                     <Clock className="w-4 h-4 md:w-6 md:h-6" /> Daily Routine
                   </h3>
                   <div className="space-y-2 md:space-y-4">
                     {APP_DATA.tips.daily.map((tip, i) => (
                       <div key={i} className="flex gap-2 md:gap-4 p-2 md:p-4 bg-neutral-800/50 rounded-xl md:rounded-2xl border border-neutral-800">
                          <div className="p-1.5 md:p-3 bg-neutral-900 rounded-lg md:rounded-xl h-fit border border-neutral-700">
                             <CheckCircle2 className="w-3.5 h-3.5 md:w-5 md:h-5 text-red-500" />
                          </div>
                          <div>
                             <div className="font-black text-white uppercase tracking-tight text-[11px] md:text-base leading-tight">{tip.text}</div>
                             <div className="text-[9px] md:text-xs text-neutral-400 mt-0.5">{tip.note}</div>
                          </div>
                       </div>
                     ))}
                   </div>
                </div>

                <div className="bg-neutral-900 border border-neutral-800 rounded-3xl overflow-hidden shadow-2xl p-3 md:p-6">
                   <h3 className="text-lg md:text-2xl font-black italic text-blue-500 uppercase mb-3 md:mb-6 flex items-center gap-2">
                     <Calendar className="w-4 h-4 md:w-6 md:h-6" /> Weekly / Time Specific
                   </h3>
                   <div className="space-y-2 md:space-y-4">
                     {APP_DATA.tips.weekly.map((tip, i) => (
                       <div key={i} className="flex gap-2 md:gap-4 p-2 md:p-4 bg-neutral-800/50 rounded-xl md:rounded-2xl border border-neutral-800">
                          <div className="p-1.5 md:p-3 bg-neutral-900 rounded-lg md:rounded-xl h-fit border border-neutral-700">
                             <Calendar className="w-3.5 h-3.5 md:w-5 md:h-5 text-blue-500" />
                          </div>
                          <div>
                             <div className="font-black text-white uppercase tracking-tight text-[11px] md:text-base leading-tight">{tip.text}</div>
                             <div className="text-[9px] md:text-xs text-neutral-400 mt-0.5">{tip.note}</div>
                          </div>
                       </div>
                     ))}
                   </div>
                </div>
             </div>

             <div className="space-y-3 md:space-y-8">
                <div className="bg-neutral-900 border border-neutral-800 rounded-3xl overflow-hidden shadow-2xl p-3 md:p-6">
                   <h3 className="text-lg md:text-2xl font-black italic text-yellow-500 uppercase mb-3 md:mb-6 flex items-center gap-2">
                     <Sword className="w-4 h-4 md:w-6 md:h-6" /> Combat & Systems
                   </h3>
                   <div className="space-y-2 md:space-y-4">
                     {APP_DATA.tips.combat.map((tip, i) => (
                       <div key={i} className="flex gap-2 md:gap-4 p-2 md:p-4 bg-neutral-800/50 rounded-xl md:rounded-2xl border border-neutral-800">
                          <div className="p-1.5 md:p-3 bg-neutral-900 rounded-lg md:rounded-xl h-fit border border-neutral-700">
                             <Sword className="w-3.5 h-3.5 md:w-5 md:h-5 text-yellow-500" />
                          </div>
                          <div>
                             <div className="font-black text-white uppercase tracking-tight text-[11px] md:text-base leading-tight">{tip.text}</div>
                             <div className="text-[9px] md:text-xs text-neutral-400 mt-0.5">{tip.note}</div>
                          </div>
                       </div>
                     ))}
                   </div>
                </div>

                <div className="bg-neutral-900 border border-neutral-800 rounded-3xl overflow-hidden shadow-2xl p-3 md:p-6">
                   <h3 className="text-lg md:text-2xl font-black italic text-neutral-400 uppercase mb-3 md:mb-6 flex items-center gap-2">
                     <Users className="w-4 h-4 md:w-6 md:h-6" /> Weather & Environment
                   </h3>
                   <div className="space-y-2 md:space-y-4">
                     {APP_DATA.tips.weather.map((tip, i) => (
                       <div key={i} className="flex gap-2 md:gap-4 p-2 md:p-4 bg-neutral-800/50 rounded-xl md:rounded-2xl border border-neutral-800">
                          <div className="p-1.5 md:p-3 bg-neutral-900 rounded-lg md:rounded-xl h-fit border border-neutral-700">
                             <Users className="w-3.5 h-3.5 md:w-5 md:h-5 text-neutral-400" />
                          </div>
                          <div>
                             <div className="font-black text-white uppercase tracking-tight text-[11px] md:text-base leading-tight">{tip.text}</div>
                             <div className="text-[9px] md:text-xs text-neutral-400 mt-0.5">{tip.note}</div>
                          </div>
                       </div>
                     ))}
                   </div>
                </div>
             </div>
            </div>

            {/* SCHOOL ARCHIVES */}
            <div className="bg-neutral-900 border border-neutral-800 rounded-3xl overflow-hidden shadow-2xl p-3 md:p-6">
               <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4 md:mb-6">
                 <h3 className="text-lg md:text-2xl font-black italic text-white uppercase flex items-center gap-2">
                   <Book className="w-4 h-4 md:w-6 md:h-6 text-neutral-500" /> School Archives
                 </h3>
                 <div className="relative w-full md:w-64">
                   <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
                   <input 
                     type="text" 
                     placeholder="Search answers..." 
                     value={searchTerm}
                     onChange={(e) => setSearchTerm(e.target.value)}
                     className="w-full bg-black border border-neutral-800 rounded-xl py-2 pl-10 pr-4 text-xs font-bold text-white focus:border-red-600 outline-none transition-colors"
                   />
                 </div>
               </div>
               
               <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-4 max-h-64 md:max-h-96 overflow-y-auto custom-scrollbar pr-1 md:pr-2">
                 {classroomAnswers
                   .filter(t => t.text.toLowerCase().includes(searchTerm.toLowerCase()) || t.month.toLowerCase().includes(searchTerm.toLowerCase()))
                   .map((t, i) => (
                   <div key={i} className="flex gap-3 p-3 bg-neutral-800/30 rounded-xl border border-neutral-800/50 hover:border-neutral-600 transition-colors">
                      <div className="text-[10px] font-black text-neutral-500 uppercase w-12 md:w-16 shrink-0 pt-0.5">{t.month}</div>
                      <div className="text-[10px] md:text-xs text-neutral-300 font-bold leading-snug">{t.text}</div>
                   </div>
                 ))}
               </div>
            </div>
          </div>
        )}

        {/* Calendar Header Navigation (Applicable to Roadmap) */}
        {activeTab === 'months' && (
          <div className="mb-4 md:mb-8 bg-neutral-900 border border-neutral-800 rounded-3xl p-3 md:p-6 flex flex-col md:flex-row items-center justify-between gap-3 md:gap-6 shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
              <Calendar className="w-20 h-20 md:w-32 md:h-32" />
            </div>

            <div className="flex items-center gap-4 md:gap-6 z-10 w-full md:w-auto justify-between">
              <button 
                onClick={() => {
                  const idx = APP_DATA.months.findIndex(m => m.id === currentMonth);
                  if (idx > 0) setCurrentMonth(APP_DATA.months[idx - 1].id);
                }}
                disabled={APP_DATA.months.findIndex(m => m.id === currentMonth) === 0}
                className="p-2 md:p-3 rounded-full hover:bg-neutral-800 disabled:opacity-30 transition-colors"
              >
                <ChevronDown className="w-5 h-5 md:w-6 md:h-6 rotate-90" />
              </button>

              <div className="text-center">
                <h2 className="text-2xl md:text-4xl font-black italic text-white uppercase tracking-tighter">{activeMonthData?.name}</h2>
                {anchoredMonth === currentMonth ? (
                  <div className="flex items-center justify-center gap-1.5 md:gap-2 mt-1 text-red-500 animate-pulse">
                    <Zap className="w-2.5 h-2.5 md:w-3 md:h-3 fill-current" />
                    <span className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.3em]">Current Location</span>
                  </div>
                ) : (
                  <div className="flex flex-col items-center gap-1.5 md:gap-2 mt-1 md:mt-2">
                    <button 
                      onClick={() => setAnchoredMonth(currentMonth)}
                      className="text-[9px] md:text-[10px] font-black uppercase tracking-widest text-white bg-red-600 hover:bg-red-500 transition-colors flex items-center justify-center gap-1.5 md:gap-2 px-3 py-1 md:px-4 md:py-1.5 rounded-full shadow-lg shadow-red-900/20"
                    >
                      <Target className="w-2.5 h-2.5 md:w-3 md:h-3" /> Set as Active
                    </button>
                    <button 
                      onClick={() => setCurrentMonth(anchoredMonth)}
                      className="text-[8px] md:text-[9px] font-bold uppercase tracking-wider text-neutral-500 hover:text-neutral-300 transition-colors flex items-center gap-1"
                    >
                      <Zap className="w-2 h-2" /> Return to {anchoredMonth}
                    </button>
                  </div>
                )}
              </div>

              <button 
                onClick={() => {
                  const idx = APP_DATA.months.findIndex(m => m.id === currentMonth);
                  if (idx < APP_DATA.months.length - 1) setCurrentMonth(APP_DATA.months[idx + 1].id);
                }}
                disabled={APP_DATA.months.findIndex(m => m.id === currentMonth) === APP_DATA.months.length - 1}
                className="p-2 md:p-3 rounded-full hover:bg-neutral-800 disabled:opacity-30 transition-colors"
              >
                <ChevronDown className="w-5 h-5 md:w-6 md:h-6 -rotate-90" />
              </button>
            </div>

            <div className="flex gap-8 text-right z-10 hidden md:flex">
               <div>
                  <div className="text-[10px] text-neutral-500 font-bold uppercase tracking-widest">Confidant Targets</div>
                  <div className="text-2xl font-black text-white">{activeMonthData?.smartTargets.length}</div>
               </div>
               <div>
                  <div className="text-[10px] text-neutral-500 font-bold uppercase tracking-widest">Total Tasks</div>
                  <div className="text-2xl font-black text-white">{activeMonthData?.tasks.length}</div>
               </div>
            </div>
          </div>
        )}
        
        {/* ROADMAP VIEW */}
        {activeTab === 'months' && activeMonthData && (
          <div className="space-y-8 animate-in fade-in duration-500">
            <div className="bg-neutral-900 border border-neutral-800 rounded-3xl overflow-hidden shadow-2xl flex flex-col border-t-4 border-t-red-600">
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-3xl font-black italic text-red-600 uppercase">{activeMonthData.name} Protocol</h3>
                </div>
                
                {/* Tasks Section */}
                <div className="space-y-6 mb-8">
                  {/* Mission Critical */}
                  {groupedTasks.critical.length > 0 && (
                    <div className="bg-red-950/20 border border-red-900/50 rounded-2xl overflow-hidden">
                      <div className="flex items-center gap-2 p-3 bg-red-900/20 border-b border-red-900/30">
                        <AlertTriangle className="w-4 h-4 text-red-500" />
                        <h4 className="text-xs font-black text-red-500 uppercase tracking-widest">Mission Critical</h4>
                      </div>
                      <div className="p-2 space-y-2">
                        {groupedTasks.critical.map((task, idx) => (
                          <div 
                            key={`crit-${idx}`}
                            onClick={() => toggleItem(task.id)}
                            className={`flex items-center gap-3 p-3 rounded-xl border transition-all cursor-pointer ${
                              checkedItems[task.id] 
                                ? 'bg-red-950/10 border-red-900/10 opacity-50' 
                                : 'bg-red-900/10 border-red-900/30 hover:bg-red-900/20'
                            }`}
                          >
                            {checkedItems[task.id] ? <CheckSquare className="w-5 h-5 text-red-600/50" /> : <Square className="w-5 h-5 text-red-500" />}
                            <span className={`text-[11px] md:text-xs font-bold text-red-200 ${checkedItems[task.id] ? 'line-through' : ''}`}>{task.text}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Standard Timeline */}
                  <div className="space-y-2">
                    <h4 className="text-xs font-black text-neutral-500 uppercase tracking-widest ml-1">Timeline</h4>
                    {groupedTasks.timeline.map((task, idx) => {
                      const getStyle = (t) => {
                        if (t.includes('Answer:') || t.includes('Exam:') || t.includes('Crossword:')) 
                          return { icon: Book, color: 'text-yellow-500', bg: 'bg-yellow-900/5', border: 'border-yellow-900/20' };
                        if (t.includes('Mementos') || t.includes('Palace') || t.includes('Mission') || t.includes('Infiltration'))
                          return { icon: Target, color: 'text-purple-500', bg: 'bg-purple-900/5', border: 'border-purple-900/20' };
                        if (t.match(/^\d{1,2}\/\d{1,2}/))
                          return { icon: Calendar, color: 'text-blue-500', bg: 'bg-blue-900/5', border: 'border-blue-900/20' };
                        return { icon: Circle, color: 'text-neutral-500', bg: 'bg-neutral-800/20', border: 'border-neutral-800' };
                      };
                      
                      const style = getStyle(task.text);
                      const StyleIcon = style.icon;

                      return (
                        <div 
                          key={`time-${idx}`} 
                          onClick={() => toggleItem(task.id)} 
                          className={`p-3 md:p-4 rounded-xl border flex items-center gap-3 md:gap-4 cursor-pointer transition-all ${
                            checkedItems[task.id] 
                              ? 'opacity-30 border-neutral-800 bg-transparent' 
                              : `${style.bg} ${style.border} hover:border-neutral-600`
                          }`}
                        >
                          {checkedItems[task.id] ? <CheckSquare className="w-5 h-5 text-green-500 shrink-0" /> : <Square className={`w-5 h-5 shrink-0 ${style.color}`} />}
                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              <span className={`text-[11px] md:text-xs font-bold leading-tight ${checkedItems[task.id] ? 'text-neutral-500 line-through' : 'text-neutral-200'}`}>{task.text}</span>
                              {!checkedItems[task.id] && !style.icon.name?.includes('Circle') && <StyleIcon className={`w-3 h-3 ${style.color} opacity-50`} />}
                            </div>
                            {task.isOverdue && <div className="text-[9px] font-bold text-red-500 mt-1 uppercase tracking-widest flex items-center gap-1"><AlertTriangle className="w-2 h-2" /> Overdue from {task.sourceMonth}</div>}
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Strategic Briefing (Non-actionable) */}
                  {groupedTasks.strategy.length > 0 && (
                    <div className="mt-8 bg-blue-900/20 border border-blue-800/50 rounded-2xl overflow-hidden">
                       <div className="flex items-center gap-2 p-4 bg-blue-800/20 border-b border-blue-800/30">
                          <Lightbulb className="w-5 h-5 text-blue-400" />
                          <h4 className="text-xs font-black text-blue-400 uppercase tracking-widest">Strategic Briefing</h4>
                       </div>
                       <div className="p-4 space-y-3">
                          {groupedTasks.strategy.map((task, idx) => (
                             <div key={`strat-${idx}`} className="flex gap-4 items-start">
                                <div className="mt-2 w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0 shadow-[0_0_8px_rgba(59,130,246,0.5)]" />
                                <span className="text-xs md:text-sm text-blue-100 font-bold leading-relaxed">
                                  {task.text}
                                </span>
                             </div>
                          ))}
                       </div>
                    </div>
                  )}
                </div>

                {/* Targets Section */}
                <div className="pt-6 border-t border-neutral-800">
                  <h4 className="text-[10px] font-black text-red-500 mb-4 uppercase tracking-[0.3em]">Critical Ranks</h4>
                  <div className="grid grid-cols-2 gap-2">
                    {activeMonthData.smartTargets.map((target, idx) => {
                      const arcanaKey = target.arc.split(' (')[0];
                      const currentRank = confidantRanks[arcanaKey] || 0;
                      const isBehind = currentRank < target.r;
                      
                      return (
                        <div 
                          key={`${target.arc}-${idx}`} 
                          className={`p-3 rounded-xl text-[10px] font-bold border transition-all ${
                            !isBehind 
                              ? 'bg-green-950/20 border-green-900/40 text-green-500' 
                              : 'bg-red-950/20 border-red-900/40 text-red-500 shadow-inner'
                          }`}
                        >
                          <div className="flex justify-between items-start">
                            <span>{target.arc}</span>
                            {isBehind && !target.isCurrent && (
                              <span className="bg-red-600 text-black px-1.5 py-0.5 rounded-[4px] text-[8px] font-black uppercase">Catch Up</span>
                            )}
                          </div>
                          <div className="mt-1 flex items-baseline gap-1">
                            <span className="text-sm font-black italic">Target: {target.r}</span>
                            <span className="opacity-50">(Curr: {currentRank})</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* CONFIDANTS VIEW */}
        {activeTab === 'confidants' && (
          <div className="animate-in fade-in duration-500">
            {/* Mobile Compact List View */}
            <div className="flex flex-col gap-2 md:hidden">
              {APP_DATA.confidants.map(c => {
                const isExpanded = expandedGuides[c.arcana];
                const rank = confidantRanks[c.arcana] || 0;
                const gate = isGateBlocked(c.arcana, rank);
                const isMax = rank >= c.target;

                return (
                  <div key={c.arcana} className={`bg-neutral-900 border ${isExpanded ? 'border-red-600' : 'border-neutral-800'} rounded-xl overflow-hidden shadow-lg transition-all`}>
                    {/* Compact Header */}
                    <div 
                      onClick={() => toggleGuide(c.arcana)}
                      className="p-3 flex items-center justify-between cursor-pointer active:bg-neutral-800"
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center font-black text-xs shrink-0 ${isMax ? 'bg-red-600 text-black' : 'bg-neutral-800 text-neutral-400'}`}>
                          {rank}
                        </div>
                        
                        {/* Rank Controls (Inline) */}
                        <div className="flex items-center gap-1">
                           <button 
                             onClick={(e) => { e.stopPropagation(); updateRank(c.arcana, rank - 1); }} 
                             className="w-8 h-8 flex items-center justify-center bg-neutral-800 hover:bg-red-600 rounded text-neutral-400 hover:text-white font-bold text-lg active:scale-90 transition-transform"
                           >-</button>
                           <button 
                             onClick={(e) => { e.stopPropagation(); updateRank(c.arcana, rank + 1); }} 
                             className="w-8 h-8 flex items-center justify-center bg-neutral-800 hover:bg-red-600 rounded text-neutral-400 hover:text-white font-bold text-lg active:scale-90 transition-transform"
                           >+</button>
                        </div>

                        <div className="min-w-0">
                          <div className="font-black text-white uppercase text-sm leading-none truncate">{c.arcana}</div>
                          <div className="text-[10px] text-neutral-500 font-bold uppercase tracking-wider truncate">{c.name}</div>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2 shrink-0">
                        {gate && <AlertTriangle className="w-4 h-4 text-red-500 animate-pulse" />}
                        <ChevronDown className={`w-4 h-4 text-neutral-600 transition-transform ${isExpanded ? 'rotate-180 text-red-500' : ''}`} />
                      </div>
                    </div>

                    {/* Expanded Detail View */}
                    {isExpanded && (
                      <div className="bg-black/20 border-t border-neutral-800 p-4 space-y-4 animate-in slide-in-from-top-2 duration-200">
                        {/* Notes & Warnings */}
                        <div className="space-y-2">
                           {gate && (
                              <div className="flex items-center gap-2 text-[10px] font-black text-red-500 bg-red-950/20 p-2 rounded border border-red-900/30">
                                <AlertTriangle className="w-3 h-3" />
                                <span>LOCKED: Requires {gate.stat} Lv.{gate.lvl}</span>
                              </div>
                           )}
                           <p className="text-xs text-neutral-400 italic leading-relaxed">{c.notes}</p>
                           {c.deadline && <div className="text-[10px] font-black text-red-500 uppercase tracking-widest">⚠️ Deadline: {c.deadline}</div>}
                        </div>

                        {/* Interaction Guide Data */}
                        {CONFIDANT_INTERACTIONS[c.arcana] && (
                          <div className="pt-4 border-t border-neutral-800 space-y-3">
                             {/* Best Gifts */}
                             <div>
                                <h5 className="text-[9px] font-black text-blue-500 uppercase mb-2 flex items-center gap-1"><Gift className="w-3 h-3" /> Best Gifts</h5>
                                <div className="flex flex-wrap gap-1">
                                  {CONFIDANT_INTERACTIONS[c.arcana].bestGifts.map(g => (
                                    <span key={g} className="px-2 py-1 bg-neutral-800 rounded text-[9px] text-neutral-300 border border-neutral-700">{g}</span>
                                  ))}
                                </div>
                             </div>

                             {/* Best Responses */}
                             <div>
                                <h5 className="text-[9px] font-black text-red-500 uppercase mb-2 flex items-center gap-1"><MessageCircle className="w-3 h-3" /> Best Responses (Rank {rank + 1})</h5>
                                <div className="bg-neutral-900 p-3 rounded-lg border border-neutral-800 space-y-2">
                                  {Array.isArray(CONFIDANT_INTERACTIONS[c.arcana].ranks[rank + 1]) 
                                    ? CONFIDANT_INTERACTIONS[c.arcana].ranks[rank + 1].map((step, idx) => (
                                        <p key={idx} className="text-[10px] text-neutral-300 border-b border-neutral-800 last:border-0 pb-1 last:pb-0">{step}</p>
                                      ))
                                    : <p className="text-[10px] text-neutral-500 italic">No dialogue data for this rank.</p>
                                  }
                                </div>
                             </div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Desktop Table View */}
            <div className="hidden md:block bg-neutral-900 border border-neutral-800 rounded-3xl overflow-hidden shadow-2xl">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-black border-b border-neutral-800">
                    <th className="p-8 text-[10px] font-black text-neutral-500 uppercase italic tracking-[0.2em]">Entity</th>
                    <th className="p-8 text-[10px] font-black text-neutral-500 uppercase italic tracking-[0.2em] text-center">Current Rank</th>
                    <th className="p-8 text-[10px] font-black text-neutral-500 uppercase italic tracking-[0.2em]">Notes</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-800/50">
                  {APP_DATA.confidants.map(c => (
                    <React.Fragment key={c.arcana}>
                      <tr 
                        className={`hover:bg-neutral-800/30 group cursor-pointer ${expandedGuides[c.arcana] ? 'bg-neutral-800/20' : ''}`}
                        onClick={() => toggleGuide(c.arcana)}
                      >
                        <td className="p-8">
                          <div className="flex items-center gap-4">
                            <div>
                              <div className="font-black text-red-600 italic text-2xl tracking-tighter group-hover:translate-x-2 transition-transform">{c.arcana}</div>
                              <div className="text-[10px] text-neutral-400 font-bold uppercase tracking-widest mt-1">{c.name}</div>
                              
                              {/* Stat Gate Warning (Desktop) */}
                              {(() => {
                                const gate = isGateBlocked(c.arcana, confidantRanks[c.arcana]);
                                if (gate) {
                                  return (
                                    <div className="mt-2 inline-flex items-center gap-1.5 bg-red-950/30 border border-red-900/50 px-2 py-1 rounded-lg">
                                      <AlertTriangle className="w-3 h-3 text-red-500" />
                                      <span className="text-[8px] font-black uppercase text-red-500 tracking-wider">Blocked: {gate.stat} Lv.{gate.lvl} Required</span>
                                    </div>
                                  );
                                }
                                return null;
                              })()}
                            </div>
                            {CONFIDANT_INTERACTIONS[c.arcana] && <ChevronRight className={`w-4 h-4 text-neutral-700 transition-transform ${expandedGuides[c.arcana] ? 'rotate-90' : ''}`} />}
                          </div>
                        </td>
                        <td className="p-8 flex justify-center">
                          <div className="flex items-center justify-center gap-2" onClick={(e) => e.stopPropagation()}>
                            <button 
                              onClick={() => updateRank(c.arcana, (confidantRanks[c.arcana] || 0) - 1)} 
                              className="p-2 bg-neutral-800 rounded-lg text-neutral-400 hover:text-red-500 text-3xl font-black transition-colors"
                            >
                              -
                            </button>
                            <span className="p-2 text-4xl font-black text-center text-red-600 w-24">{confidantRanks[c.arcana] || 0}</span>
                            <button 
                              onClick={() => updateRank(c.arcana, (confidantRanks[c.arcana] || 0) + 1)} 
                              className="p-2 bg-neutral-800 rounded-lg text-neutral-400 hover:text-red-500 text-3xl font-black transition-colors"
                            >
                              +
                            </button>
                          </div>
                        </td>
                        <td className="p-8 text-xs text-neutral-400 max-w-md italic leading-relaxed">
                          {c.notes}
                          {c.deadline && <div className="text-red-500 font-black mt-3 uppercase text-[9px] border-t border-red-900/20 pt-3 tracking-widest">DEADLINE: {c.deadline}</div>}
                        </td>
                      </tr>
                      {expandedGuides[c.arcana] && CONFIDANT_INTERACTIONS[c.arcana] && (
                        <tr className="bg-neutral-950/50">
                          <td colSpan="3" className="p-8 pt-0">
                            <div className="grid grid-cols-2 gap-8 border-t border-neutral-800 pt-8 animate-in slide-in-from-top-2 duration-300">
                               <div>
                                  <h5 className="text-xs font-black text-blue-500 uppercase mb-4 flex items-center gap-2"><Gift className="w-4 h-4" /> Recommended Gifts</h5>
                                  <div className="flex flex-wrap gap-2 mb-6">
                                     {CONFIDANT_INTERACTIONS[c.arcana].bestGifts.map(g => (
                                       <span key={g} className="px-3 py-1.5 bg-neutral-900 border border-neutral-800 rounded-xl text-[10px] text-neutral-300">{g}</span>
                                     ))}
                                  </div>

                                  {/* Strategic Roadmap Section (Desktop) */}
                                  {c.monthlyTargets && Object.keys(c.monthlyTargets).length > 0 && (
                                    <div className="pt-6 border-t border-neutral-800/50">
                                       <h5 className="text-xs font-black text-yellow-500 uppercase mb-4 flex items-center gap-2"><Trophy className="w-4 h-4" /> Strategic Roadmap</h5>
                                       <div className="flex flex-wrap gap-2">
                                          {Object.entries(c.monthlyTargets).map(([mId, rank]) => {
                                            const monthName = APP_DATA.months.find(m => m.id === mId)?.name || mId;
                                            const isMet = (confidantRanks[c.arcana] || 0) >= rank;
                                            const isSelected = currentMonth === mId;
                                            return (
                                              <div key={mId} className={`flex items-center gap-3 px-4 py-2 rounded-xl border transition-all ${isSelected ? 'border-yellow-500 bg-yellow-500/10' : 'border-neutral-800 bg-neutral-900/50 opacity-60'}`}>
                                                <span className={`text-[10px] uppercase font-black ${isSelected ? 'text-yellow-500' : 'text-neutral-500'}`}>{monthName}</span>
                                                <div className="flex items-center gap-2">
                                                  <span className="text-xs font-black italic">Rank {rank}</span>
                                                  {isMet ? <CheckCircle2 className="w-4 h-4 text-green-500" /> : <Circle className="w-2 h-2 text-neutral-700" />}
                                                </div>
                                              </div>
                                            );
                                          })}
                                       </div>
                                    </div>
                                  )}
                               </div>
                               <div>
                                  <h5 className="text-xs font-black text-red-500 uppercase mb-4 flex items-center gap-2"><MessageCircle className="w-4 h-4" /> Next Rank Interaction: {confidantRanks[c.arcana] + 1}</h5>
                                  <div className="space-y-2 bg-neutral-900/50 p-4 rounded-2xl border border-neutral-800">
                                     {Array.isArray(CONFIDANT_INTERACTIONS[c.arcana].ranks[confidantRanks[c.arcana] + 1]) 
                                       ? CONFIDANT_INTERACTIONS[c.arcana].ranks[confidantRanks[c.arcana] + 1].map((step, idx) => (
                                           <p key={idx} className="text-xs text-neutral-400 leading-relaxed border-b border-neutral-800 last:border-0 pb-2 mb-2 last:pb-0 last:mb-0">
                                              {step}
                                           </p>
                                         ))
                                       : <p className="text-xs text-neutral-400 italic">No data for this rank or max rank reached.</p>
                                     }
                                  </div>
                                  <p className="text-[10px] text-neutral-600 italic mt-4">{CONFIDANT_INTERACTIONS[c.arcana].tips}</p>
                               </div>
                            </div>
                          </td>
                        </tr>
                      )}
                    </React.Fragment>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* PALACES VIEW */}
        {activeTab === 'palaces' && (
          <div className="space-y-6 animate-in fade-in duration-500">
             {(() => {
               const anchoredMonthIdx = APP_DATA.months.findIndex(m => m.id === anchoredMonth);
               
               const historyPalaces = [];
               const activePalaces = [];

               APP_DATA.palaces.forEach((p, idx) => {
                 const palaceStartMonthIdx = APP_DATA.months.findIndex(m => m.id === p.monthId);
                 const palaceEndMonthIdx = p.deadlineMonth 
                   ? APP_DATA.months.findIndex(m => m.id === p.deadlineMonth)
                   : palaceStartMonthIdx;
                 
                 const isHistory = palaceEndMonthIdx < anchoredMonthIdx;
                 if (isHistory) historyPalaces.push({ ...p, originalIdx: idx });
                 else activePalaces.push({ ...p, originalIdx: idx });
               });

               return (
                 <>
                   {historyPalaces.length > 0 && (
                     <button 
                       onClick={() => { setShowArchived(!showArchived); trackEvent('palace-history-toggle', { state: !showArchived }); }}
                       className="w-full py-3 border border-dashed border-neutral-800 rounded-2xl text-neutral-500 text-xs font-bold uppercase tracking-widest hover:bg-neutral-900 transition-colors flex items-center justify-center gap-2"
                     >
                       {showArchived ? 'Hide' : 'Show'} {historyPalaces.length} Completed {historyPalaces.length === 1 ? 'Palace' : 'Palaces'}
                       <ChevronDown className={`w-4 h-4 transition-transform ${showArchived ? 'rotate-180' : ''}`} />
                     </button>
                   )}

                   {(showArchived ? [...historyPalaces, ...activePalaces] : activePalaces).map((p) => {
                     const idx = p.originalIdx;
                     const palaceStartMonthIdx = APP_DATA.months.findIndex(m => m.id === p.monthId);
                     const palaceEndMonthIdx = p.deadlineMonth 
                       ? APP_DATA.months.findIndex(m => m.id === p.deadlineMonth)
                       : palaceStartMonthIdx;
                     
                     const isHistory = palaceEndMonthIdx < anchoredMonthIdx;
                     const isCurrent = anchoredMonthIdx >= palaceStartMonthIdx && anchoredMonthIdx <= palaceEndMonthIdx;
               
                     return (
                       <div key={p.id} className={`bg-neutral-900 border border-neutral-800 rounded-3xl overflow-hidden shadow-xl transition-all ${isHistory ? 'opacity-60 grayscale' : ''}`}>
                         <div className="p-4 md:p-8 cursor-pointer hover:bg-neutral-800 transition-all flex justify-between items-center" onClick={() => setExpandedPalace(expandedPalace === idx ? null : idx)}>
                           <div className="flex items-center gap-3 md:gap-8">
                             <span className={`text-2xl md:text-5xl font-black italic opacity-20 ${isCurrent ? 'text-red-600' : 'text-neutral-500'}`}>0{idx+1}</span>
                             <div>
                               <div className="flex items-center gap-2 md:gap-3">
                                 <h3 className="text-lg md:text-3xl font-black uppercase text-white tracking-tighter leading-tight">{p.name}</h3>
                                 {isCurrent && <span className="px-1.5 py-0.5 bg-red-600 text-white text-[8px] font-black rounded uppercase animate-pulse">Active</span>}
                               </div>
                               <div className="flex gap-2 md:gap-4 mt-1 md:mt-2">
                                  <span className="text-[9px] md:text-[10px] bg-red-900 text-black px-2 py-0.5 rounded-full font-black uppercase tracking-widest">Lvl: {p.lvl}</span>
                                  <span className="text-[9px] md:text-[10px] text-neutral-500 font-black uppercase tracking-widest">{p.threat}</span>
                               </div>
                             </div>
                           </div>
                           <ChevronRight className={`transition-transform w-8 h-8 md:w-10 md:h-10 ${expandedPalace === idx ? 'rotate-90 text-red-600' : 'text-neutral-700'}`} />
                         </div>
                         
                         {expandedPalace === idx && (
                           <div className="p-4 md:p-8 pt-0 grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-12 bg-black/40 border-t border-neutral-800 animate-in zoom-in-95 duration-300">
                             <div className="mt-4 md:mt-8 space-y-4 md:space-y-6">
                                <h4 className="text-[9px] md:text-[10px] font-black text-red-600 uppercase tracking-[0.4em] flex items-center gap-2"><MapPin className="w-4 h-4 md:w-5 md:h-5" /> Will Seed Coords</h4>
                                <div className="space-y-2 md:space-y-3">
                                  {p.seeds.map((s, si) => (
                                    <div key={si} onClick={() => toggleItem(s.id)} className={`p-3 md:p-4 rounded-xl border flex items-center gap-3 md:gap-4 cursor-pointer transition-all ${checkedItems[s.id] ? 'opacity-30 border-neutral-800 bg-black/20' : 'bg-neutral-900/80 border-l-4 border-l-red-600 border-neutral-800 hover:bg-neutral-800'}`}>
                                       {checkedItems[s.id] ? <CheckSquare className="w-3.5 h-3.5 md:w-4 md:h-4 text-green-500 flex-shrink-0" /> : <Square className="w-3.5 h-3.5 md:w-4 md:h-4 text-neutral-600 flex-shrink-0" />}
                                       <div className="text-[10px] md:text-[11px] text-neutral-300 leading-tight">{s.text}</div>
                                    </div>
                                  ))}
                                </div>
                             </div>
                             <div className="mt-4 md:mt-8 space-y-4 md:space-y-6">
                                <h4 className="text-[9px] md:text-[10px] font-black text-red-600 uppercase tracking-[0.4em] flex items-center gap-2"><Target className="w-4 h-4 md:w-5 md:h-5" /> Palace Personas</h4>
                                <div className="grid gap-2">
                                   {p.personas.map(pers => (
                                     <div key={pers.id} onClick={() => toggleItem(pers.id)} className={`p-2 md:p-3 border rounded-xl text-[10px] md:text-xs font-bold cursor-pointer transition-all flex items-center gap-2 md:gap-3 ${checkedItems[pers.id] ? 'opacity-30 bg-black/20 border-neutral-800 text-green-500' : 'bg-neutral-800 border-neutral-700 hover:border-red-600 text-neutral-200'}`}>
                                        {checkedItems[pers.id] ? <CheckSquare className="w-3.5 h-3.5 md:w-4 md:h-4" /> : <Square className="w-3.5 h-3.5 md:w-4 md:h-4" />}
                                        {pers.name}
                                     </div>
                                   ))}
                                </div>
                             </div>
                             <div className="mt-4 md:mt-8 space-y-4 md:space-y-6">
                                <h4 className="text-[9px] md:text-[10px] font-black text-red-600 uppercase tracking-[0.4em] flex items-center gap-2"><Search className="w-4 h-4 md:w-5 md:h-5" /> Field Intel</h4>
                                <p className="text-[10px] md:text-sm italic text-neutral-400 leading-relaxed bg-red-950/10 p-4 md:p-6 border border-red-900/20 rounded-2xl ring-1 ring-red-500/10">"{p.tips}"</p>
                             </div>
                           </div>
                         )}
                       </div>
                     );
                   })}
                 </>
               );
             })()}
          </div>
        )}

        {/* MEMENTOS VIEW */}
        {activeTab === 'mementos' && (
          <div className="space-y-4 md:space-y-8 animate-in fade-in duration-500">
            {(() => {
              const { history: historyMem, active: activeMem } = mementosGroups;

              return (
                <>
                  {historyMem.length > 0 && (
                    <div className="bg-neutral-900 border border-dashed border-neutral-800 rounded-3xl overflow-hidden">
                      <button 
                        onClick={() => { setShowArchived(!showArchived); trackEvent('mementos-history-toggle', { state: !showArchived }); }}
                        className="w-full p-4 flex items-center justify-between text-neutral-500 text-xs font-bold uppercase tracking-widest hover:bg-neutral-800 transition-colors"
                      >
                        <span>Previous Paths ({historyMem.length})</span>
                        <ChevronDown className={`w-4 h-4 transition-transform ${showArchived ? 'rotate-180' : ''}`} />
                      </button>
                      
                      {showArchived && (
                        <div className="border-t border-neutral-800 p-2 space-y-4">
                          {historyMem.map((mem) => {
                            const idx = mem.originalIdx;
                            return (
                            <div key={mem.id} className="opacity-60 grayscale hover:opacity-100 hover:grayscale-0 transition-all">
                                <div className={`bg-neutral-950 border-l-[8px] border-red-900 rounded-2xl overflow-hidden shadow-lg`}>
                                  <div 
                                    className="p-3 cursor-pointer hover:bg-neutral-900 transition-all flex justify-between items-center"
                                    onClick={() => setExpandedMementos(expandedMementos === `hist-${idx}` ? null : `hist-${idx}`)}
                                  >
                                    <div className="flex items-center justify-between w-full pr-4">
                                      <div>
                                        <h3 className="text-sm font-black italic uppercase text-neutral-400 tracking-tighter">{mem.path}</h3>
                                      </div>
                                      <div className="text-[10px] font-black text-neutral-600 border border-neutral-800 px-2 py-0.5 rounded">LVL {mem.targetLvl}</div>
                                    </div>
                                    <ChevronRight className={`transition-transform w-4 h-4 text-neutral-600 ${expandedMementos === `hist-${idx}` ? 'rotate-90' : ''}`} />
                                  </div>

                                  {expandedMementos === `hist-${idx}` && (
                                    <div className="p-3 pt-0 space-y-3 bg-black/20 border-t border-neutral-900">
                                      <div className="mt-3">
                                        <div className="grid grid-cols-1 gap-2">
                                          {mem.requests.map(req => (
                                            <div key={req.id} onClick={() => toggleItem(req.id)} className={`bg-black/50 p-3 border rounded-xl cursor-pointer ${checkedItems[req.id] ? 'opacity-30 border-neutral-800' : 'border-neutral-800'}`}>
                                              <div className="flex items-center gap-2 italic mb-1">
                                                  {checkedItems[req.id] ? <CheckSquare className="w-3 h-3 text-green-500" /> : <Square className="w-3 h-3 text-neutral-700" />}
                                                  <span className="text-xs font-black text-white uppercase tracking-tighter">{req.name}</span>
                                              </div>
                                              <div className="text-[9px] font-black text-red-600 uppercase ml-5">Reward: {req.reward}</div>
                                            </div>
                                          ))}
                                        </div>
                                      </div>
                                    </div>
                                  )}
                                </div>
                            </div>
                          )})}
                        </div>
                      )}
                    </div>
                  )}

                  {activeMem.map((mem) => {
                    const idx = mem.originalIdx;
                    return (
                    <div key={mem.id} className={`bg-neutral-900 border-l-[12px] border-red-600 rounded-3xl overflow-hidden shadow-2xl`}>
                      <div 
                        className="p-4 md:p-8 cursor-pointer hover:bg-neutral-800 transition-all flex justify-between items-center"
                        onClick={() => setExpandedMementos(expandedMementos === idx ? null : idx)}
                      >
                        <div className="flex items-center justify-between w-full pr-4 md:pr-8">
                          <div>
                            <h3 className="text-lg md:text-4xl font-black italic uppercase text-red-600 tracking-tighter">{mem.path}</h3>
                            <p className="text-neutral-500 text-[9px] md:text-[10px] font-black mt-1 uppercase tracking-widest">Timing: {mem.timing}</p>
                          </div>
                          <div className="bg-black px-3 py-1 md:px-6 md:py-3 rounded-xl md:rounded-2xl text-xs md:text-2xl font-black border border-red-900 text-red-500 shadow-[2px_2px_0px_0px_rgba(153,27,27,1)] md:shadow-[4px_4px_0px_0px_rgba(153,27,27,1)]">LVL {mem.targetLvl}</div>
                        </div>
                        <ChevronRight className={`transition-transform w-6 h-6 md:w-10 md:h-10 text-neutral-500 ${expandedMementos === idx ? 'rotate-90 text-red-600' : ''}`} />
                      </div>

                      {expandedMementos === idx && (
                        <div className="p-4 md:p-8 pt-0 space-y-4 md:space-y-6 bg-black/20 border-t border-neutral-800 animate-in zoom-in-95 duration-300">
                          <div className="mt-4 md:mt-6">
                            <h4 className="text-[9px] md:text-xs font-black text-neutral-400 uppercase tracking-[0.4em] flex items-center gap-2 md:gap-3 mb-4 md:mb-6"><Target className="w-4 h-4 md:w-5 md:h-5 text-red-600" /> Key Missions</h4>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                              {mem.requests.map(req => (
                                <div key={req.id} onClick={() => toggleItem(req.id)} className={`bg-black/50 p-4 md:p-6 border rounded-3xl transition-all cursor-pointer group ${checkedItems[req.id] ? 'opacity-30 border-neutral-800' : 'border-neutral-800 hover:border-red-600'}`}>
                                  <div className="flex justify-between items-center mb-2 md:mb-4">
                                     <div className="flex items-center gap-2 md:gap-3 italic">
                                        {checkedItems[req.id] ? <CheckSquare className="w-4 h-4 md:w-5 md:h-5 text-green-500" /> : <Square className="w-4 h-4 md:w-5 md:h-5 text-neutral-700" />}
                                        <span className="text-sm md:text-xl font-black text-white group-hover:text-red-500 transition-colors uppercase tracking-tighter">{req.name}</span>
                                     </div>
                                  </div>
                                  <p className="text-[10px] md:text-xs text-neutral-500 mb-4 md:mb-6 italic leading-relaxed ml-6 md:ml-8">"{req.tip}"</p>
                                  <div className="text-[9px] md:text-[10px] font-black text-red-600 uppercase ml-6 md:ml-8">Reward: {req.reward}</div>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  )})}
                </>
              );
            })()}
          </div>
        )}

        {/* Footer */}
        <div className="mt-20 pt-10 border-t border-neutral-800 text-center opacity-60 hover:opacity-100 transition-opacity">
          <p className="text-[10px] uppercase tracking-[0.2em] text-neutral-500 mb-4 flex items-center justify-center gap-2">
            <span>v{APP_VERSION}</span>
            <span>•</span>
            <button onClick={() => { setShowChangelog(true); trackEvent('changelog-open'); }} className="hover:text-white underline decoration-red-600 underline-offset-4 transition-colors">What's New</button>
            <span>•</span>
            <button onClick={() => setShowRoadmap(true)} className="hover:text-white underline decoration-blue-600 underline-offset-4 transition-colors">Roadmap</button>
            <span>•</span>
            <button onClick={() => { setShowOnboarding(true); trackEvent('help-open'); }} className="hover:text-white underline decoration-yellow-500 underline-offset-4 transition-colors">Help</button>
            <span>•</span>
            <a 
              href="https://github.com/zucram/P5Tracker#support--feedback" 
              target="_blank" 
              rel="noopener noreferrer"
              onClick={() => trackEvent('support-feedback-click')}
              className="hover:text-white underline decoration-neutral-600 underline-offset-4 transition-colors"
            >
              Support & Feedback
            </a>
            {import.meta.env.DEV && (
              <>
                <span>•</span>
                <button 
                  onClick={() => { localStorage.clear(); window.location.reload(); }}
                  className="text-red-500 font-black hover:text-white transition-colors"
                >
                  [DEV: RESET]
                </button>
              </>
            )}
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
      {saveModal && (
        <div className="fixed inset-0 bg-black/98 backdrop-blur-2xl flex items-center justify-center p-4 z-50">
           <div className="bg-neutral-900 border-2 border-red-600 rounded-[3rem] w-full max-w-2xl p-10 shadow-[0_0_50px_rgba(220,38,38,0.2)]">
              <h2 className="text-4xl font-black text-red-600 italic uppercase mb-2 tracking-tighter">Sync Terminal</h2>
              <p className="text-neutral-400 text-sm mb-8 font-mono">Backup your tactical data before exiting.</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                 <button onClick={exportFile} className="p-8 bg-red-600 hover:bg-white text-black font-black rounded-3xl transition-all flex flex-col items-center gap-3 shadow-xl group">
                    <Download className="w-10 h-10" />
                    <span className="uppercase text-xs tracking-widest">Download Save</span>
                 </button>
                 <div className="flex flex-col gap-3">
                    <button onClick={handleCopy} className="p-4 bg-neutral-800 hover:bg-neutral-700 text-white font-black rounded-2xl transition-all flex items-center justify-center gap-3 uppercase text-xs tracking-widest">
                       {copied ? <ClipboardCheck className="text-green-500" /> : <Copy />}
                       {copied ? "Memory Synced!" : "Copy Data String"}
                    </button>
                    <textarea placeholder="Paste save data here..." value={importText} onChange={(e) => setImportText(e.target.value)} className="w-full h-32 bg-black border border-neutral-800 rounded-2xl p-4 font-mono text-[10px] text-red-500 outline-none focus:border-red-600 mb-6" />
                    <button onClick={handleImport} className="w-full bg-white text-black p-4 rounded-2xl text-xs font-black uppercase tracking-widest">Apply Import</button>
                 </div>
              </div>
              <input type="text" ref={hiddenInputRef} className="opacity-0 absolute pointer-events-none" />
              <button onClick={() => setSaveModal(false)} className="w-full text-neutral-600 hover:text-red-500 uppercase text-[10px] font-black tracking-[0.5em] transition-colors">Close Terminal</button>
           </div>
        </div>
      )}
      {/* CHANGELOG MODAL */}
      {showChangelog && (
        <div className="fixed inset-0 bg-black/98 backdrop-blur-2xl flex items-center justify-center p-4 z-50 animate-in fade-in duration-300">
           <div className="bg-neutral-900 border-2 border-red-600 rounded-[2rem] w-full max-w-lg p-6 md:p-10 shadow-[0_0_50px_rgba(220,38,38,0.2)] max-h-[80vh] overflow-y-auto custom-scrollbar">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h2 className="text-3xl font-black text-white italic uppercase tracking-tighter">New Intel</h2>
                  <div className="text-red-600 font-bold font-mono text-xs mt-1">PATCH v{RELEASE_NOTES[0].version}</div>
                </div>
                <button onClick={() => setShowChangelog(false)} className="p-2 bg-neutral-800 rounded-full hover:bg-red-600 transition-colors"><ChevronDown className="w-6 h-6 rotate-180" /></button>
              </div>
              
              <div className="space-y-6">
                <p className="text-sm text-neutral-400 italic">"{RELEASE_NOTES[0].description}"</p>
                
                {RELEASE_NOTES[0].sections.map((section, i) => (
                  <div key={i}>
                    <h4 className="text-xs font-black text-red-500 uppercase tracking-widest mb-3 border-b border-red-900/30 pb-1">{section.title}</h4>
                    <ul className="space-y-2">
                      {section.items.map((item, j) => (
                        <li key={j} className="text-xs text-neutral-300 flex items-start gap-2">
                          <span className="text-red-600 mt-0.5">›</span>
                          <span dangerouslySetInnerHTML={{ __html: item.replace(/\*\*(.*?)\*\*/g, '<strong class="text-white">$1</strong>') }} />
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>

              <button onClick={() => setShowChangelog(false)} className="w-full mt-8 bg-white text-black p-4 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-red-600 hover:text-white transition-colors">
                Acknowledged
              </button>
           </div>
        </div>
      )}
      {/* ROADMAP MODAL */}
      {showRoadmap && (
        <div className="fixed inset-0 bg-black/98 backdrop-blur-2xl flex items-center justify-center p-4 z-50 animate-in fade-in duration-300">
           <div className="bg-neutral-900 border-2 border-blue-600 rounded-[2rem] w-full max-w-lg p-6 md:p-10 shadow-[0_0_50px_rgba(37,99,235,0.2)] max-h-[80vh] overflow-y-auto custom-scrollbar">
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

              <button onClick={() => setShowRoadmap(false)} className="w-full mt-8 bg-blue-600 text-white p-4 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-white hover:text-black transition-colors">
                Close Roadmap
              </button>
           </div>
        </div>
      )}

      {/* ONBOARDING MODAL */}
      {showOnboarding && (
        <div className="fixed inset-0 bg-black/98 backdrop-blur-3xl flex items-center justify-center p-4 z-[60] animate-in fade-in duration-500">
           <div className="bg-neutral-900 border-2 border-red-600 rounded-[2.5rem] w-full max-w-lg p-8 shadow-[0_0_60px_rgba(220,38,38,0.3)] relative overflow-hidden">
              <div className="flex flex-col items-center text-center mb-8">
                <div className="w-16 h-16 bg-red-600 rounded-2xl flex items-center justify-center mb-4 rotate-3 shadow-xl shadow-red-900/40">
                  <Zap className="w-8 h-8 text-white fill-current" />
                </div>
                <h2 className="text-3xl font-black text-white uppercase italic tracking-tighter">Mission Briefing</h2>
                <p className="text-xs text-neutral-500 uppercase font-bold tracking-widest mt-1">Tactical Guide v{APP_VERSION}</p>
              </div>

              <div className="space-y-4">
                <OnboardingItem icon={Calendar} color="text-blue-500" title="Anchor Your Timeline" text="Go to Roadmap, select your month, and tap 'Set as Active' to focus the tracker." />
                <OnboardingItem icon={CheckSquare} color="text-red-500" title="Check Your Tasks" text="Tap tasks to complete them. Important ones follow you to next month if missed." />
                <OnboardingItem icon={Users} color="text-red-500" title="Level Confidants" text="Tap a name to see the best dialogue choices and gifts for your next rank up." />
                <OnboardingItem icon={Zap} color="text-yellow-500" title="Manage Stats" text="Update your Social Stats in the Guide tab to see if a Confidant is 'Blocked'." />
                <OnboardingItem icon={MapPin} color="text-red-500" title="Palace Intel" text="Find Will Seeds and boss strategies. Past Palaces are hidden automatically." />
                <OnboardingItem icon={Save} color="text-white" title="Sync Your Progress" text="Use the Sync Terminal to backup or import your data (it lives on your device)." />
              </div>

              <button 
                onClick={completeOnboarding}
                className="w-full mt-10 py-4 rounded-2xl bg-red-600 text-black font-black uppercase text-xs hover:bg-white transition-all shadow-lg shadow-red-900/20"
              >
                Understood
              </button>
           </div>
        </div>
      )}

      {/* SMART SUPPORT TOAST */}
      <SupportToast 
        show={showToast} 
        type={toastType} 
        onDismiss={handleDismiss} 
        onSupport={handleSupport} 
      />

      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #333; border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #444; }
      `}</style>
    </div>
  );
}

function TabButton({ active, onClick, label, icon: Icon }) {
  const isSpecial = label.includes('✨');
  return (
    <button onClick={onClick} className={`flex-1 py-2 md:py-4 px-1 md:px-2 rounded-xl font-black uppercase italic text-[8px] md:text-xs tracking-tighter transition-all duration-300 flex flex-col md:flex-row items-center justify-center gap-0.5 md:gap-2 ${
      active 
        ? (isSpecial ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/40' : 'bg-red-600 text-black shadow-lg shadow-red-900/40') 
        : (isSpecial ? 'text-blue-500 hover:text-blue-400' : 'text-neutral-500 hover:text-white')
    }`}>
      {Icon && <Icon className="w-4 h-4 md:w-4 md:h-4" />}
      <span className="scale-90 md:scale-100">{label.replace(' ✨', '')}</span>
      {isSpecial && <span className="md:hidden">✨</span>}
    </button>
  );
}

function OnboardingItem({ icon: Icon, color, title, text }) {
  return (
    <div className="flex gap-4 p-3 bg-neutral-800/30 rounded-2xl border border-neutral-800/50">
      <div className={`p-2 bg-neutral-900 rounded-xl h-fit border border-neutral-800 ${color}`}>
        <Icon className="w-4 h-4" />
      </div>
      <div className="text-left">
        <div className="font-black text-white uppercase text-[10px] tracking-widest">{title}</div>
        <div className="text-[10px] text-neutral-500 leading-tight mt-0.5">{text}</div>
      </div>
    </div>
  );
}