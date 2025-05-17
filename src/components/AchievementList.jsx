import React, { useState } from 'react';

const ACHIEVEMENTS = [
  { id: 'first_meal', icon: '🍽️', name: 'First Meal', desc: 'Feed your pet for the first time' },
  { id: 'well_rested', icon: '😴', name: 'Well Rested', desc: 'Let your pet sleep until fully energized' },
  { id: 'squeaky_clean', icon: '✨', name: 'Squeaky Clean', desc: 'Clean your pet 5 times' },
  { id: 'best_friends', icon: '❤️', name: 'Best Friends', desc: 'Reach 100 bond with your pet' },
  { id: 'growing_up', icon: '🧒', name: 'Growing Up', desc: 'Reach the teen stage' },
  { id: 'adulthood', icon: '🧑', name: 'Adulthood', desc: 'Reach the adult stage' },
  { id: 'balanced_diet', icon: '⚖️', name: 'Balanced Diet', desc: 'Keep all stats above 80 for a day' },
  { id: 'playful_pal', icon: '🎮', name: 'Playful Pal', desc: 'Play with your pet 10 times' }
];

export function getAchievements() {
  return ACHIEVEMENTS;
}

export default function AchievementList({ unlockedAchievements }) {
  const [show, setShow] = useState(false);

  return (
    <div className="achievement-box">
      <button
        className="toggle-achievements"
        onClick={() => setShow(prev => !prev)}
      >
        {show ? 'Hide' : 'Show'} Achievements ({Object.keys(unlockedAchievements).length}/{ACHIEVEMENTS.length})
      </button>

      {show && (
        <div className="achievement-list">
          {ACHIEVEMENTS.map(ach => {
            const unlockedDate = unlockedAchievements[ach.id];
            return (
              <div
                key={ach.id}
                className={`achievement ${unlockedDate ? 'unlocked' : 'locked'}`}
              >
                <div className="icon">{ach.icon}</div>
                <div className="details">
                  <strong>{ach.name}</strong>
                  <div>{ach.desc}</div>
                  {unlockedDate && (
                    <div className="date">
                      Unlocked: {new Date(unlockedDate).toLocaleDateString()}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}