import { useState } from 'react';

const INITIAL_STATS = {
  hunger: 80,
  energy: 75,
  happiness: 90,
  health: 85,
  cleanliness: 70,
  bond: 50,
};

export default function usePet() {
  const [petState, setPetState] = useState(() => {
    const saved = localStorage.getItem('petState');
    return saved
      ? JSON.parse(saved)
      : {
          stats: { ...INITIAL_STATS },
          birthDate: Date.now(),
          activity: null,
          lastInteraction: Date.now(),
          lastVisited: Date.now(),
          sleepCount: 0,
        };
  });

  function updateStats(changes) {
    setPetState(prev => ({
      ...prev,
      stats: Object.fromEntries(
        Object.entries(prev.stats).map(([k, v]) => [k, Math.min(100, Math.max(0, v + (changes[k] || 0)))])
      ),
      lastInteraction: Date.now(),
      lastVisited: Date.now(),
    }));
  }

  function doActivity(name, statChanges) {
    if (petState.activity === 'sleeping') return;
    setPetState(prev => {
      const updated = { ...prev, activity: name };
      if (name === 'cleaning') updated.cleanCount = (prev.cleanCount || 0) + 1;
      if (name === 'playing') updated.playCount = (prev.playCount || 0) + 1;
      return updated;
    });
    updateStats(statChanges);
    setTimeout(() => setPetState(prev => ({ ...prev, activity: null })), 3000);
  }

  return { petState, setPetState, updateStats, doActivity };
}
