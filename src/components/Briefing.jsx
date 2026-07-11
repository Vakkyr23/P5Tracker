import { useState, useMemo } from 'react';
import {
  CheckCircle2,
  Calendar,
  Users,
  Sword,
  Trophy,
  Book,
  Search,
  Clock,
  Zap,
  CheckSquare,
  Square,
  Wrench,
  Heart,
  Sparkles
} from 'lucide-react';
import { APP_DATA } from '../data/gameData';
import { CROSSWORD_DATA } from '../data/crosswordData';
import { SOCIAL_STATS } from '../data/socialStats';
import { DAY_INDEX } from '../data/timeline';
import { CONFIDANT_SCHEDULE } from '../data/confidantScheduleData';

/* =========================================================================
   Briefing — the cheatsheet tab (extracted from App.jsx in v3.7.0, markup
   unchanged): protagonist dashboard, Royal Readiness, tips, School Answers,
   Crossword Answers, and zucram's SupportCard (HARD RULE: one of the two
   static Ko-fi links — never remove).
   Royal Readiness is derived here from the schedule + the shared currentDay
   prop — parseInt, never Number(): Kasumi's rank is the string "5/MAX".
   ========================================================================= */

const STAT_ICONS = {
  Knowledge: Book,
  Guts: Sword,
  Proficiency: Wrench,
  Kindness: Heart,
  Charm: Sparkles
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

export default function Briefing({ currentDay, socialStats, updateStat, checkedItems, toggleItem }) {
  // School Answers search — transient UI state, owned by the tab.
  const [searchTerm, setSearchTerm] = useState('');

  // Royal Readiness ranks, derived live from the Confidant schedule + the shared
  // current day (the old `p5r_confidantRanks` key had no writer, so the widget
  // was frozen at 0 — fixed 2026-07-02). parseInt, not Number(): Kasumi's rank
  // is the string "5/MAX" (Number() → NaN → 0 would re-freeze her gauge).
  const confidantRanks = useMemo(() => {
    const dayIdx = DAY_INDEX[currentDay] ?? 0;
    const out = {};
    CONFIDANT_SCHEDULE.forEach(c => {
      const reached = c.ranks.filter(r => (DAY_INDEX[r.date] ?? Infinity) <= dayIdx);
      const last = reached[reached.length - 1];
      out[c.arcana] = last ? (parseInt(last.rank, 10) || 0) : 0;
    });
    return out;
  }, [currentDay]);

  // All classroom answers for the School Answers card.
  const classroomAnswers = useMemo(() => {
    return APP_DATA.months.flatMap(m => 
      m.tasks
        .filter(t => t.text.includes('Answer:') || t.text.includes('Exam:') || t.text.includes('Crossword:'))
        .map(t => ({ ...t, month: m.name }))
    );
  }, []);

  return (
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

              <div className={`pc-cut pc-hard bg-red-700 border border-red-500 p-4 md:p-6 text-white edge-ink flex flex-col justify-between ${((confidantRanks['Councillor'] || 0) >= 9 && (confidantRanks['Justice'] || 0) >= 8 && (confidantRanks['Faith'] || 0) >= 5) ? 'pc-goldmax' : ''}`}>
                <div>
                  <div className="mb-4 flex items-start justify-between gap-2">
                    <h3 className="pc-plate edge-ink text-[10px] tracking-[0.25em]"><span><Trophy className="w-3 h-3" /> Royal Readiness</span></h3>
                    {((confidantRanks['Councillor'] || 0) >= 9 && (confidantRanks['Justice'] || 0) >= 8 && (confidantRanks['Faith'] || 0) >= 5) && (
                      <span className="pc-chip pc-goldchip text-[10px]"><span>MAX</span></span>
                    )}
                  </div>
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
                            <span className="pc-count">{current}/{check.target}</span>
                          </div>
                          <div className="h-1.5 bg-black/30 pc-gauge overflow-hidden">
                            <div 
                              className={`pc-fill h-full transition-all duration-1000 ${isDone ? 'bg-white' : 'bg-white/80'}`} 
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
  );
}
