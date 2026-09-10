// src/components/Navbar.jsx
// Modern Government / Analytics Top Navigation Bar

import React, { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { Activity, Menu, X, Compass, Info } from 'lucide-react';

/**
 * Navbar Component
 */
const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen((prev) => !prev);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <header className="navbar">
      <div className="navbar-inner">
        {/* Brand Logo */}
        <Link to="/" className="navbar-brand" onClick={closeMobileMenu}>
          <img src="/logo.png" alt="AeroIndex Logo" className="brand-logo-img" />
          <div className="brand-text">
            <div className="brand-title">Aero<span>Index</span></div>
            <span className="brand-subtitle">National Airfare CPI Monitor</span>
          </div>
        </Link>

        {/* Navigation Links (Desktop & Mobile Dropdown) */}
        <nav>
          <ul className={`nav-links ${mobileMenuOpen ? 'mobile-open' : ''}`}>
            <li>
              <NavLink
                to="/"
                onClick={closeMobileMenu}
                className={({ isActive }) => (isActive ? 'nav-link-item active' : 'nav-link-item')}
                end
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/dashboard"
                onClick={closeMobileMenu}
                className={({ isActive }) => (isActive ? 'nav-link-item active' : 'nav-link-item')}
              >
                <Activity size={16} />
                Live Dashboard
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/route-analysis"
                onClick={closeMobileMenu}
                className={({ isActive }) => (isActive ? 'nav-link-item active' : 'nav-link-item')}
              >
                <Compass size={16} />
                Route Analysis
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/about"
                onClick={closeMobileMenu}
                className={({ isActive }) => (isActive ? 'nav-link-item active' : 'nav-link-item')}
              >
                <Info size={16} />
                About
              </NavLink>
            </li>
          </ul>
        </nav>

        {/* Right Status & Mobile Toggle */}
        <div className="nav-right-actions">
          <div className="live-telemetry-badge">
            <span className="pulse-dot"></span>
            <span>Live Scraping Active</span>
          </div>

          <button
            className="mobile-menu-btn"
            onClick={toggleMobileMenu}
            aria-label="Toggle Navigation Menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
