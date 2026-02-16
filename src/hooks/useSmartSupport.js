import { useState, useEffect } from 'react';

const COOLDOWN_MS = 259200000; // 3 days

// Analytics Helper
const trackEvent = (eventName, eventData = {}) => {
  if (import.meta.env.PROD && window.umami) {
    window.umami.track(eventName, eventData);
  }
};

export function useSmartSupport(stats) {
  const [showToast, setShowToast] = useState(false);
  const [toastType, setToastType] = useState('mission');

  // Track Views
  useEffect(() => {
    if (showToast) {
      trackEvent('support_toast_view', { type: toastType, location: 'toast' });
    }
  }, [showToast, toastType]);

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
      localStorage.setItem('p5r_lastSupportAsk', Date.now().toString());
      return;
    }

    // Trigger: Session Milestones (Habit)
    if ([5, 12, 25, 50].includes(stats.sessions)) {
        setToastType(stats.sessions === 5 ? 'casual' : 'value');
        setShowToast(true);
        localStorage.setItem('p5r_lastSupportAsk', Date.now().toString());
        return;
    }

    // Trigger: Heavy Usage (Ticks)
    if (stats.totalTicks > 0 && stats.totalTicks % 50 === 0 && stats.lastAction === 'tick') {
        setToastType('value');
        setShowToast(true);
        localStorage.setItem('p5r_lastSupportAsk', Date.now().toString());
        return;
    }

  }, [stats]);

  const handleDismiss = () => {
    setShowToast(false);
    // Timestamp already set on trigger
  };

  const handleSupport = () => {
    setShowToast(false);
    // Timestamp already set on trigger
    if (window.umami) window.umami.track('support_toast_click', { type: toastType, location: 'toast' });
    window.open('https://ko-fi.com/K3K11RWTSL', '_blank');
  };

  return { showToast, toastType, handleDismiss, handleSupport };
}
