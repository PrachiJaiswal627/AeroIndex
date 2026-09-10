// src/components/StatCard.jsx
// Reusable KPI card with icons, responsive formatting, and trend indicators

import React from 'react';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

/**
 * StatCard Component
 * @param {string} title - Card header label
 * @param {string|number} value - Metric value (formatted)
 * @param {React.ReactNode} icon - Lucide icon component
 * @param {number|string} change - Percentage or numerical delta
 * @param {string} changePeriod - Context (e.g. 'vs last month', 'vs base year')
 * @param {'positive'|'negative'|'neutral'} trendType - Sentiment of trend
 * @param {string} accentColor - Left border highlight color
 */
const StatCard = ({
  title,
  value,
  icon,
  change,
  changePeriod = 'MoM',
  trendType = 'positive', // 'positive', 'negative', 'neutral'
  accentColor
}) => {
  // Select icon based on trend
  const renderTrendIcon = () => {
    if (trendType === 'positive') return <TrendingUp size={14} />;
    if (trendType === 'negative') return <TrendingDown size={14} />;
    return <Minus size={14} />;
  };

  return (
    <div
      className="stat-card"
      style={{ '--card-accent': accentColor || '#0284c7' }}
    >
      <div className="stat-card-top">
        <span className="stat-card-title">{title}</span>
        {icon && <div className="stat-icon-wrapper">{icon}</div>}
      </div>

      <div className="stat-card-value">{value}</div>

      {change !== undefined && (
        <div className="stat-card-footer">
          <span className={`stat-trend-badge ${trendType}`}>
            {renderTrendIcon()}
            {change}
          </span>
          <span style={{ color: 'var(--text-muted)' }}>{changePeriod}</span>
        </div>
      )}
    </div>
  );
};

export default StatCard;
