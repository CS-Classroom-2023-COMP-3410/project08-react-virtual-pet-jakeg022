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

    if (saved) {
      try {
        const parsed = JSON.parse(saved);

        const isValidStats = parsed?.stats &&
          ['hunger', 'energy', 'happiness', 'health', 'cleanliness', 'bond']
            .every(key => typeof parsed.stats[key] === 'number');

        if (isValidStats) {
          return parsed;
        }
      } catch {
        // corrupted JSON — fall through to default
      }
    }

    return {
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
        Object.entries(prev.stats).map(([key, value]) => {
          const delta = changes[key] || 0;
          const newValue = Math.min(100, Math.max(0, value + delta));
          return [key, newValue];
        })
      ),
      lastInteraction: Date.now(),
      lastVisited: Date.now(),
    }));
  }

  function doActivity(name, statChanges) {
    if (petState.activity === 'sleeping') return;
    setPetState(prev => ({ ...prev, activity: name }));
    updateStats(statChanges);
    setTimeout(() => {
      setPetState(prev => ({ ...prev, activity: null }));
    }, 3000);
  }

  return { petState, setPetState, updateStats, doActivity };
}
