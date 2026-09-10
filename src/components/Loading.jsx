// src/components/Loading.jsx
// Reusable loading spinner component with clean animation

import React from 'react';

/**
 * Loading Component
 * Displays a lightweight animated spinner and customizable status message
 */
const Loading = ({ message = 'Fetching real-time airfare telemetry...' }) => {
  return (
    <div className="loading-container" role="status" aria-live="polite">
      <div className="spinner"></div>
      <p className="loading-text">{message}</p>
    </div>
  );
};

export default Loading;
