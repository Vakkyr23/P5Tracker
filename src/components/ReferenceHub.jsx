import {
  Info,
  ChevronRight,
  ExternalLink,
  Star,
  Cpu,
  BookOpen,
  Sword,
  Trophy,
  Sparkles,
  Users,
  Zap,
  PlayCircle,
  Wrench,
  FileText,
  MessageSquare
} from 'lucide-react';
import { RESOURCE_DATA } from '../data/resourceData';

/* =========================================================================
   Reference Hub — the library view (extracted from App.jsx in v3.7.0, markup
   unchanged): curated external tools and community guides, including the
   linked-out fusion calculator (HARD RULE: no built-in calculator — link out).
   ========================================================================= */

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


export default function ReferenceHub({ onBack }) {
  return (
          <div className="space-y-4 md:space-y-8 animate-in fade-in duration-500">
            <button onClick={onBack} className="flex items-center gap-2 text-neutral-500 hover:text-white transition-colors mb-2 md:mb-4 font-bold text-[10px] md:text-xs uppercase tracking-widest">
                <ChevronRight className="w-4 h-4 rotate-180" /> Back to System Menu
            </button>
            <div className="text-center max-w-2xl mx-auto mb-6 md:mb-12">
              <h2 className="mb-2 md:mb-4"><span className="pc-plate edge-ink text-xl md:text-4xl tracking-tighter"><span>Command Center</span></span></h2>
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
  );
}
