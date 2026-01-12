import { useState, useEffect, useRef } from 'react';

// Analytics Helper
const trackEvent = (eventName, eventData = {}) => {
  if (window.umami) {
    window.umami.track(eventName, eventData);
  }
};

export function useUserStats(checkedItems, confidantRanks) {
  const [stats, setStats] = useState(() => {
    try {
      const saved = localStorage.getItem('p5r_userStats');
      return saved ? JSON.parse(saved) : {
        totalTicks: 0,
        palacesCleared: [], // List of IDs
        confidantsMaxed: 0,
        sessions: 0,
        lastSession: 0,
        firstSeen: Date.now()
      };
    } catch {
      return { totalTicks: 0, palacesCleared: [], confidantsMaxed: 0, sessions: 0, lastSession: 0, firstSeen: Date.now() };
    }
  });

  // 1. Track Session (1h cooldown)
  useEffect(() => {
    const now = Date.now();
    // If > 1 hour since last session, count as new
    if (now - stats.lastSession > 3600000) {
      setStats(prev => {
        const newSessions = prev.sessions + 1;
        trackEvent('session_start', { count: newSessions });
        return { ...prev, sessions: newSessions, lastSession: now };
      });
    } else {
      // Just update timestamp to keep session alive
      setStats(prev => ({ ...prev, lastSession: now }));
    }
  }, []);

  // 2. Track Ticks & Palace Clears
  const prevCheckedRef = useRef(checkedItems);
  
  useEffect(() => {
    const prev = prevCheckedRef.current;
    const currentCount = Object.keys(checkedItems).filter(k => checkedItems[k]).length;
    const prevCount = Object.keys(prev).filter(k => prev[k]).length;

    // Only fire on INCREASE
    if (currentCount > prevCount) {
      setStats(s => {
        let newPalaces = [...s.palacesCleared];
        let hasNewPalace = false;

        // Find exactly what was checked
        const newlyChecked = Object.keys(checkedItems).filter(k => checkedItems[k] && !prev[k]);
        
        newlyChecked.forEach(id => {
           // Detect Palace Completions (IDs typically contain 'pal' and 'dead'/'sec')
           if ((id.includes('pal') && (id.includes('dead') || id.includes('sec'))) || id === 'may_pal_clear') {
             if (!newPalaces.includes(id)) {
               newPalaces.push(id);
               hasNewPalace = true;
               trackEvent('milestone_palace_clear', { task: id });
             }
           }
        });

        // Fire Milestone Events for ticks
        if (s.totalTicks < 10 && currentCount >= 10) trackEvent('milestone_ticks', { count: 10 });
        if (s.totalTicks < 50 && currentCount >= 50) trackEvent('milestone_ticks', { count: 50 });
        if (s.totalTicks < 100 && currentCount >= 100) trackEvent('milestone_ticks', { count: 100 });

        return { 
          ...s, 
          totalTicks: currentCount, 
          palacesCleared: newPalaces,
          // We attach a temporary 'trigger' flag for the UI to react to
          lastAction: hasNewPalace ? 'palace_clear' : 'tick'
        };
      });
    }
    prevCheckedRef.current = checkedItems;
  }, [checkedItems]);

  // 3. Track Confidant Maxing
  const prevRanksRef = useRef(confidantRanks);
  useEffect(() => {
    const currentMaxed = Object.values(confidantRanks).filter(r => r === 10).length;
    const prevMaxed = Object.values(prevRanksRef.current).filter(r => r === 10).length;

    if (currentMaxed > prevMaxed) {
      setStats(s => {
        trackEvent('milestone_confidant_max', { count: currentMaxed });
        return { ...s, confidantsMaxed: currentMaxed, lastAction: 'confidant_max' };
      });
    }
    prevRanksRef.current = confidantRanks;
  }, [confidantRanks]);

  // Persist
  useEffect(() => {
    localStorage.setItem('p5r_userStats', JSON.stringify(stats));
  }, [stats]);

  return stats;
}
