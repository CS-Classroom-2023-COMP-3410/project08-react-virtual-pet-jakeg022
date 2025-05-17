import React from 'react';
import PetDisplay from './components/PetDisplay';
import StatusBar from './components/StatusBar';
import ActionButton from './components/ActionButton';
import AchievementList from './components/AchievementList';
import AchievementNotification from './components/AchievementNotification';
import usePet from './hooks/usePet';
import useTimePassage from './hooks/useTimePassage';
import useAchievements from './hooks/useAchievements';

export default function App() {
  const { petState, setPetState, doActivity } = usePet();
  const age = Math.floor((Date.now() - petState.birthDate) / 60000);
  const growthStage =
    age <= 5 ? 'baby' :
    age <= 10 ? 'child' :
    age <= 20 ? 'teen' : 'adult';

  useTimePassage(petState, setPetState);

  const {
    unlockedAchievements,
    notifications,
    setNotifications
  } = useAchievements(petState, growthStage);

  const mood = (() => {
    const { hunger, energy, happiness, health, cleanliness } = petState.stats;
    const minStat = Math.min(hunger, energy, happiness, health, cleanliness);
    if (minStat >= 80) return "😁 Happy";
    if (minStat >= 50) return "😐 Content";
    if (minStat >= 25) return "😢 Sad";
    return "💀 Miserable";
  })();

  return (
    <div className="app">
      <h1>My Virtual Pet</h1>
      <p>Age: {age} days</p>
      <p>Mood: {mood}</p>
      <PetDisplay stage={growthStage} activity={petState.activity} />

      <div className="stats">
        {Object.entries(petState.stats).map(([key, val]) => (
          <StatusBar
            key={key}
            label={key.charAt(0).toUpperCase() + key.slice(1)}
            value={val}
          />
        ))}
      </div>

      <div className="actions">
        <ActionButton
          emoji="🍝"
          label="Feed"
          onClick={() => doActivity('eating', { hunger: 20, energy: 5, health: 6 })}
          disabled={petState.activity === 'sleeping'}
        />
        <ActionButton
          emoji="🏀"
          label="Play"
          onClick={() => doActivity('playing', { happiness: 15, energy: -10, hunger: -5, health: 1 })}
          disabled={petState.activity === 'sleeping'}
        />
        <ActionButton
          emoji="🧼"
          label="Clean"
          onClick={() => doActivity('cleaning', { cleanliness: 30, happiness: -5, health: 6 })}
          disabled={petState.activity === 'sleeping'}
        />
        <ActionButton
          emoji="😴"
          label="Sleep"
          onClick={() =>
            setPetState(prev => ({
              ...prev,
              activity: prev.activity === 'sleeping' ? null : 'sleeping'
            }))
          }
        />
      </div>

      <AchievementNotification
        notifications={notifications}
        setNotifications={setNotifications}
      />

      <AchievementList unlockedAchievements={unlockedAchievements} />
    </div>
  );
}
