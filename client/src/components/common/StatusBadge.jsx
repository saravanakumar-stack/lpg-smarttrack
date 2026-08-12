import React from 'react';

export default function StatusBadge({ children, tone = 'blue', live = false, className = '' }) {
  return (
    <span className={`status-badge status-badge-${tone} ${live ? 'is-live' : ''} ${className}`}>
      {live && <span className="live-dot warm-dot" />}
      {children}
    </span>
  );
}
