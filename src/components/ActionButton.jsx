import React from 'react';

export default function ActionButton({ emoji, label, onClick, disabled }) {
  return (
    <button className="action-btn" onClick={onClick} disabled={disabled}>
      {emoji} {label}
    </button>
  );
}