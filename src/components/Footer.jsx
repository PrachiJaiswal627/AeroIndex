// src/components/Footer.jsx
// Professional Footer with platform links and mission

import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-inner">
        {/* Brand & Mission */}
        <div className="footer-brand">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem' }}>
            <img
              src="/logo.png"
              alt="AeroIndex Logo"
              style={{
                width: 36,
                height: 36,
                borderRadius: 8,
                objectFit: 'contain',
                backgroundColor: '#ffffff',
                padding: '2px',
                boxShadow: '0 2px 6px rgba(0, 0, 0, 0.2)'
              }}
            />
            <h4>AeroIndex</h4>
          </div>
          <p>
            An automated real-time price monitoring and econometric indexing platform
            to augment the Transport sub-group of the Consumer Price Index (CPI).
          </p>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '1rem', color: '#38bdf8', fontSize: '0.8rem' }}>
            <ShieldCheck size={16} />
            <span>Compliant with MoSPI Statistical Indexing Standards</span>
          </div>
        </div>

        {/* Navigation */}
        <div className="footer-col">
          <h5>Platform Pages</h5>
          <ul className="footer-links">
            <li><Link to="/">Home Overview</Link></li>
            <li><Link to="/dashboard">Live Analytics Dashboard</Link></li>
            <li><Link to="/route-analysis">Route Fare Analysis</Link></li>
            <li><Link to="/about">About & Methodology</Link></li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
