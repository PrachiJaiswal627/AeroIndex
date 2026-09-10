// src/components/Sidebar.jsx
// Sidebar navigation for analytics pages with route indicators

import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  Compass,
  TrendingUp,
  History,
  Info,
  ShieldCheck,
  Server
} from 'lucide-react';

/**
 * Sidebar Component
 * @param {boolean} isOpen - Mobile open state
 * @param {Function} onClose - Close handler for mobile clicks
 */
const Sidebar = ({ isOpen, onClose }) => {
  return (
    <aside className={`sidebar ${isOpen ? 'open' : ''}`}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        <div>
          <span className="sidebar-nav-heading">Analytics Portal</span>
          <ul className="sidebar-nav-list">
            <li>
              <NavLink
                to="/dashboard"
                onClick={onClose}
                className={({ isActive }) => (isActive ? 'sidebar-nav-item active' : 'sidebar-nav-item')}
              >
                <LayoutDashboard size={18} />
                <span>Live Dashboard</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/route-analysis"
                onClick={onClose}
                className={({ isActive }) => (isActive ? 'sidebar-nav-item active' : 'sidebar-nav-item')}
              >
                <Compass size={18} />
                <span>Route Analysis</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/price-index"
                onClick={onClose}
                className={({ isActive }) => (isActive ? 'sidebar-nav-item active' : 'sidebar-nav-item')}
              >
                <TrendingUp size={18} />
                <span>Price Index (CPI)</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/historical-trends"
                onClick={onClose}
                className={({ isActive }) => (isActive ? 'sidebar-nav-item active' : 'sidebar-nav-item')}
              >
                <History size={18} />
                <span>Historical Trends</span>
              </NavLink>
            </li>
          </ul>
        </div>

        <div>
          <span className="sidebar-nav-heading">Documentation</span>
          <ul className="sidebar-nav-list">
            <li>
              <NavLink
                to="/about"
                onClick={onClose}
                className={({ isActive }) => (isActive ? 'sidebar-nav-item active' : 'sidebar-nav-item')}
              >
                <Info size={18} />
                <span>About & Problem</span>
              </NavLink>
            </li>
          </ul>
        </div>
      </div>

      {/* System Status Card */}
      <div className="sidebar-footer-card">
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.35rem' }}>
          <Server size={14} color="#38bdf8" />
          <h5>MoSPI CPI Ingestion</h5>
        </div>
        <p>Laspeyres Weighted Model</p>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', marginTop: '0.5rem', color: '#10b981', fontSize: '0.72rem', fontWeight: 600 }}>
          <ShieldCheck size={13} />
          <span>Base Year 2026 = 100</span>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
