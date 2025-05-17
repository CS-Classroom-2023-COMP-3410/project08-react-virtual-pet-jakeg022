import React, { useEffect } from 'react';

export default function AchievementNotification({ notifications, setNotifications }) {
  useEffect(() => {
    if (notifications.length > 0) {
      const timer = setTimeout(() => setNotifications([]), 5000);
      return () => clearTimeout(timer);
    }
  }, [notifications]);

  return (
    <div className="notifications">
      {notifications.map((note, i) => (
        <div key={i} className="notification">{note}</div>
      ))}
    </div>
  );
}
