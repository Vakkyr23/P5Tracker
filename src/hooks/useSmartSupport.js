import { useState, useEffect } from 'react';

const COOLDOWN_MS = 259200000; // 3 days

export function useSmartSupport(stats) {
  const [showToast, setShowToast] = useState(false);
  const [toastType, setToastType] = useState('mission');

  useEffect(() => {
    // 1. Check Cooldown
    const lastAsk = parseInt(localStorage.getItem('p5r_lastSupportAsk') || '0');
    const now = Date.now();
    if (now - lastAsk < COOLDOWN_MS) return;

    // 2. Evaluate Triggers (Priority Order)
    
    // Trigger: Just cleared a Palace (High Delight)
    if (stats.lastAction === 'palace_clear') {
      setToastType('mission');
      setShowToast(true);
      return;
    }

    // Trigger: Session Milestones (Habit)
    // We check if we *just* hit this session count (requires state tracking or just reliance on it being "current")
    // Since 'stats.sessions' updates only once per hour, checking equality is safe enough for a session-based trigger
    if ([5, 12, 25, 50].includes(stats.sessions)) {
        // Prevent re-triggering on same session reload if already shown? 
        // The cooldown handles this generally, but if they close and reopen within 3 days, they miss it?
        // Actually, if cooldown is active, they miss it. That's fine. 
        // We only want to ask if they haven't been asked recently.
        setToastType(stats.sessions === 5 ? 'casual' : 'value');
        setShowToast(true);
        return;
    }

    // Trigger: Heavy Usage (Ticks)
    if (stats.totalTicks > 0 && stats.totalTicks % 50 === 0 && stats.lastAction === 'tick') {
        setToastType('value');
        setShowToast(true);
        return;
    }

  }, [stats]);

  const handleDismiss = () => {
    setShowToast(false);
    localStorage.setItem('p5r_lastSupportAsk', Date.now().toString());
  };

  const handleSupport = () => {
    setShowToast(false);
    localStorage.setItem('p5r_lastSupportAsk', Date.now().toString());
    if (window.umami) window.umami.track('support_toast_click', { type: toastType });
    window.open('https://ko-fi.com/K3K11RWTSL', '_blank');
  };

  return { showToast, toastType, handleDismiss, handleSupport };
}
