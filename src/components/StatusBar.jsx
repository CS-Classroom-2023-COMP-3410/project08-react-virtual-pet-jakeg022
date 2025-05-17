import React from 'react';

export default function StatusBar({ label, value }) {
  const barColor = value > 70 ? 'green' : value > 40 ? 'orange' : 'red';

  return (
    <div className="status-bar">
      <span>{label}: {Math.round(value)}</span>
      <div className="bar-bg">
        <div className="bar-fill" style={{ width: `${value}%`, background: barColor }}></div>
      </div>
    </div>
  );
}