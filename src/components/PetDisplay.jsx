import React from 'react';

export default function PetDisplay({ stage, activity }) {
  const stages = {
    baby: '🥚',
    child: '🐣',
    teen: '🐥',
    adult: '🐤',
  };

  const activityEmoji = {
    eating: '🍝',
    playing: '🏀',
    cleaning: '🧼',
    sleeping: '😴',
  };

  return (
    <div style={{ fontSize: '5rem' }}>
      {stages[stage]} {activity ? activityEmoji[activity] : ''}
    </div>
  );
}

