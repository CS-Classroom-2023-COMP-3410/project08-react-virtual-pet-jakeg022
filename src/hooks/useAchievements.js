import { useState, useEffect } from 'react';
import { getAchievements } from '../components/AchievementList';

export default function useAchievements(petState, growthStage) {
  const [notifications, setNotifications] = useState([]);
  const [unlockedAchievements, setUnlockedAchievements] = useState(() => {
    const saved = localStorage.getItem("achievements");
    return saved ? JSON.parse(saved) : {};
  });

  useEffect(() => {
    localStorage.setItem("achievements", JSON.stringify(unlockedAchievements));
  }, [unlockedAchievements]);

  useEffect(() => {
    const now = new Date().toISOString();
    const newUnlocks = {};
    const ACHIEVEMENTS = getAchievements();

    ACHIEVEMENTS.forEach(ach => {
      if (!unlockedAchievements[ach.id]) {
        if (
          (ach.id === 'first_meal' && petState.activity === 'eating') ||
          (ach.id === 'well_rested' && petState.stats.energy === 100 && petState.activity === 'sleeping') ||
          (ach.id === 'squeaky_clean' && petState.cleanCount >= 5) ||
          (ach.id === 'best_friends' && petState.stats.bond === 100) ||
          (ach.id === 'growing_up' && growthStage === 'teen') ||
          (ach.id === 'adulthood' && growthStage === 'adult') ||
          (ach.id === 'balanced_diet' && Object.values(petState.stats).every(v => v >= 80)) ||
          (ach.id === 'playful_pal' && petState.playCount >= 10)
        ) {
          newUnlocks[ach.id] = now;
        }
      }
    });

    if (Object.keys(newUnlocks).length > 0) {
      setUnlockedAchievements(prev => ({ ...prev, ...newUnlocks }));
      const newMessages = getAchievements().filter(a => newUnlocks[a.id])
        .map(a => `Achievement Unlocked: ${a.name}`);
      setNotifications(prev => [...prev, ...newMessages]);
    }
  }, [petState, growthStage]);

  useEffect(() => {
    if (notifications.length > 0) {
      const timer = setTimeout(() => setNotifications([]), 5000);
      return () => clearTimeout(timer);
    }
  }, [notifications]);

  return { unlockedAchievements, notifications, setNotifications };
}
