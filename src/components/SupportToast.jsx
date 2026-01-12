import React, { useEffect, useState } from 'react';
import { Heart, X, Coffee, Zap } from 'lucide-react';

const MESSAGES = {
  mission: {
    title: "Mission Update",
    text: "Another Palace secured! 🏰 If P5 Tracker helped your heist, consider fueling the dev.",
    icon: Zap,
    color: "text-red-500",
    btn: "bg-red-600 hover:bg-red-500"
  },
  casual: {
    title: "Take Your Time",
    text: "Thanks for making us your companion. 👋 Enjoying the app? Buying a coffee keeps us ad-free.",
    icon: Coffee,
    color: "text-yellow-500",
    btn: "bg-yellow-600 hover:bg-yellow-500"
  },
  value: {
    title: "Phantom Support",
    text: "You've been tracking a lot! 📝 If we saved you time today, a small tip goes a long way.",
    icon: Heart,
    color: "text-blue-500",
    btn: "bg-blue-600 hover:bg-blue-500"
  }
};

export function SupportToast({ show, type, onDismiss, onSupport }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (show) {
      const timer = setTimeout(() => setVisible(true), 100); // Small delay to allow mount
      return () => clearTimeout(timer);
    } else {
      setVisible(false);
    }
  }, [show]);

  // Keep it mounted while fading out
  if (!show && !visible) return null;

  const content = MESSAGES[type] || MESSAGES.mission;
  const Icon = content.icon;

  return (
    <div className={`fixed bottom-24 md:bottom-8 right-4 md:right-8 z-[60] max-w-xs md:max-w-sm transition-all duration-500 transform ${visible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0 pointer-events-none'}`}>
      <div className="bg-neutral-900/95 backdrop-blur-xl border border-neutral-800 shadow-2xl rounded-2xl p-4 flex gap-4 relative overflow-hidden">
        <div className={`absolute top-0 left-0 w-1 h-full ${content.btn.split(' ')[0]}`} />
        
        <div className={`p-3 rounded-xl bg-black/50 h-fit border border-neutral-800 ${content.color}`}>
          <Icon className="w-6 h-6" />
        </div>

        <div className="flex-1 pr-4">
          <h4 className="text-sm font-black text-white uppercase tracking-wider mb-1">{content.title}</h4>
          <p className="text-xs text-neutral-400 font-medium leading-relaxed mb-3">{content.text}</p>
          
          <button 
            onClick={onSupport}
            className={`px-4 py-2 rounded-lg text-[10px] font-black uppercase tracking-[0.2em] text-white shadow-lg transition-transform active:scale-95 flex items-center gap-2 ${content.btn}`}
          >
            <Heart className="w-3 h-3 fill-current" /> Support
          </button>
        </div>

        <button 
          onClick={onDismiss}
          className="absolute top-2 right-2 p-2 text-neutral-600 hover:text-white transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
