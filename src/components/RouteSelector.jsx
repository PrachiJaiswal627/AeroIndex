// src/components/RouteSelector.jsx
// Form component allowing origin, destination, and travel date selection

import React, { useState } from 'react';
import { ArrowRightLeft, Search, Calendar, MapPin } from 'lucide-react';
import { AIRPORTS } from '../data/dummyData';

/**
 * RouteSelector Component
 * @param {string} initialOrigin - Default origin airport code
 * @param {string} initialDest - Default destination airport code
 * @param {string} initialDate - Default date string
 * @param {Function} onAnalyze - Callback invoked with { origin, dest, date }
 * @param {boolean} isLoading - Spinner state when analyzing
 */
const RouteSelector = ({
  initialOrigin = 'DEL',
  initialDest = 'BOM',
  initialDate = '2026-09-15',
  onAnalyze,
  isLoading = false
}) => {
  const [origin, setOrigin] = useState(initialOrigin);
  const [dest, setDest] = useState(initialDest);
  const [date, setDate] = useState(initialDate);
  const [error, setError] = useState('');

  // Swap origin and destination
  const handleSwap = () => {
    const temp = origin;
    setOrigin(dest);
    setDest(temp);
    setError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (origin === dest) {
      setError('Origin and Destination airports cannot be the same.');
      return;
    }
    setError('');
    if (onAnalyze) {
      onAnalyze({ origin, dest, date });
    }
  };

  return (
    <div>
      <form className="route-selector-bar" onSubmit={handleSubmit}>
        {/* Origin Dropdown */}
        <div className="form-group">
          <label className="form-label">
            <MapPin size={14} style={{ display: 'inline', marginRight: 4 }} />
            Origin Airport
          </label>
          <select
            className="form-select"
            value={origin}
            onChange={(e) => {
              setOrigin(e.target.value);
              setError('');
            }}
          >
            {AIRPORTS.map((airport) => (
              <option key={airport.code} value={airport.code}>
                {airport.city} ({airport.code}) - {airport.name}
              </option>
            ))}
          </select>
        </div>

        {/* Destination Dropdown */}
        <div className="form-group">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <label className="form-label">
              <MapPin size={14} style={{ display: 'inline', marginRight: 4 }} />
              Destination Airport
            </label>
            <button
              type="button"
              onClick={handleSwap}
              title="Swap Origin & Destination"
              style={{
                background: 'none',
                border: 'none',
                color: 'var(--color-accent)',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: 2,
                fontSize: '0.75rem',
                fontWeight: 600
              }}
            >
              <ArrowRightLeft size={12} /> Swap
            </button>
          </div>
          <select
            className="form-select"
            value={dest}
            onChange={(e) => {
              setDest(e.target.value);
              setError('');
            }}
          >
            {AIRPORTS.map((airport) => (
              <option key={airport.code} value={airport.code}>
                {airport.city} ({airport.code}) - {airport.name}
              </option>
            ))}
          </select>
        </div>

        {/* Travel Date */}
        <div className="form-group">
          <label className="form-label">
            <Calendar size={14} style={{ display: 'inline', marginRight: 4 }} />
            Travel Date
          </label>
          <input
            type="date"
            className="form-input"
            value={date}
            min={new Date().toISOString().split('T')[0]}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>

        {/* Action Button */}
        <button
          type="submit"
          className="btn btn-primary"
          disabled={isLoading}
          style={{ height: '44px' }}
        >
          <Search size={16} />
          {isLoading ? 'Analyzing...' : 'Analyze Route'}
        </button>
      </form>

      {error && (
        <div
          style={{
            backgroundColor: 'var(--color-danger-light)',
            color: 'var(--color-danger)',
            padding: '0.65rem 1rem',
            borderRadius: '8px',
            fontSize: '0.85rem',
            marginBottom: '1.25rem',
            fontWeight: 600
          }}
        >
          {error}
        </div>
      )}
    </div>
  );
};

export default RouteSelector;
