import { useEffect } from 'react';

export default function useTimePassage(petState, setPetState) {
  useEffect(() => {
    const interval = setInterval(() => {
      setPetState(prev => {
        const { hunger, energy, happiness, health, cleanliness, bond } = prev.stats;
        const isSleeping = prev.activity === 'sleeping';
        const allStatsAbove50 = [hunger, energy, happiness, health, cleanliness].every(val => val > 50);
        const newBond = allStatsAbove50 ? Math.min(100, bond + 1) : bond;

        return {
          ...prev,
          stats: {
            hunger: isSleeping ? hunger : Math.max(0, hunger - 2),
            energy: isSleeping ? Math.min(100, energy + 2) : Math.max(0, energy - 1),
            happiness: isSleeping ? happiness : Math.max(0, happiness - 1),
            cleanliness: isSleeping ? cleanliness : Math.max(0, cleanliness - 2),
            health: isSleeping ? Math.min(100, health + 1) : Math.max(0, health - 1),
            bond: newBond,
          },
          sleepCount: isSleeping ? (prev.sleepCount || 0) + 1 : 0,
          lastVisited: Date.now(),
        };
      });
    }, 2000);

    return () => clearInterval(interval);
  }, [setPetState]);
}