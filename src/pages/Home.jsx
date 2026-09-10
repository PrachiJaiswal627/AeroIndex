// src/pages/Home.jsx
// Home / Landing Page for AeroIndex - SIH Project

import React from 'react';
import { Link } from 'react-router-dom';
import {
  TrendingUp,
  BarChart3,
  ShieldCheck,
  Zap,
  Layers,
  Database,
  ArrowRight,
  RefreshCw,
  Globe2,
  Compass,
  CheckCircle2
} from 'lucide-react';
import { KPI_METRICS } from '../data/dummyData';

const Home = () => {
  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-container">
          <h1 className="hero-title">
            Real-Time Airfare <span>Price Index</span> for India
          </h1>

          <p className="hero-subtitle">
            An automated high-frequency price monitoring platform continuously scraping
            commercial airlines and Online Travel Aggregators (OTAs) to produce a dynamic,
            empirically grounded Airfare Price Index for augmenting India's Consumer Price Index (CPI).
          </p>

          <div className="hero-cta-group">
            <Link to="/dashboard" className="btn btn-primary" style={{ padding: '0.85rem 1.75rem', fontSize: '1rem' }}>
              <span>Explore Live Dashboard</span>
              <ArrowRight size={18} />
            </Link>
            <Link to="/route-analysis" className="btn btn-secondary" style={{ padding: '0.85rem 1.75rem', fontSize: '1rem' }}>
              <Compass size={18} color="#0284c7" />
              <span>Route Analysis</span>
            </Link>
          </div>

          {/* Quick Metrics Banner */}
          <div className="hero-stats-banner">
            <div className="hero-stat-item">
              <div className="hero-stat-num">{KPI_METRICS.currentIndex}</div>
              <div className="hero-stat-label">Airfare Index (Base 100)</div>
            </div>
            <div className="hero-stat-item">
              <div className="hero-stat-num">₹{KPI_METRICS.averageDomesticAirfare.toLocaleString('en-IN')}</div>
              <div className="hero-stat-label">Avg Domestic Fare</div>
            </div>
            <div className="hero-stat-item">
              <div className="hero-stat-num">{KPI_METRICS.routesMonitored}+</div>
              <div className="hero-stat-label">Routes Monitored</div>
            </div>
            <div className="hero-stat-item">
              <div className="hero-stat-num">{KPI_METRICS.activeSources}</div>
              <div className="hero-stat-label">Airlines & OTAs Tracked</div>
            </div>
          </div>
        </div>
      </section>

      {/* Purpose / Why CPI Needs Dynamic Airfare Section */}
      <section className="section section-alt">
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div className="section-header">
            <span className="section-tag">National Economic Imperative</span>
            <h2 className="section-title">Why Traditional CPI Lags Behind Dynamic Aviation</h2>
            <p className="section-desc">
              Aviation ticket pricing changes by the minute due to dynamic revenue management algorithms.
              AeroIndex bridges the gap between static monthly surveys and digital reality.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem' }}>
            {/* Traditional Method */}
            <div
              style={{
                backgroundColor: '#fff',
                border: '1px solid #fee2e2',
                borderRadius: '16px',
                padding: '2rem',
                boxShadow: '0 4px 6px -1px rgba(239, 68, 68, 0.05)'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
                <div style={{ padding: '0.5rem', background: '#fee2e2', borderRadius: '8px', color: '#dc2626' }}>
                  <RefreshCw size={20} />
                </div>
                <h3 style={{ fontSize: '1.2rem', color: '#991b1b' }}>Traditional CPI Collection</h3>
              </div>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.85rem', color: '#64748b', fontSize: '0.92rem' }}>
                <li style={{ display: 'flex', gap: '0.5rem' }}>
                  <span style={{ color: '#ef4444', fontWeight: 700 }}>✕</span>
                  <span><strong>Monthly Latency:</strong> Manual survey sampling causes a 30 to 45 day lag in official statistics.</span>
                </li>
                <li style={{ display: 'flex', gap: '0.5rem' }}>
                  <span style={{ color: '#ef4444', fontWeight: 700 }}>✕</span>
                  <span><strong>Misses Surge Peaks:</strong> Fails to capture short-term festive surges (Diwali, Chhath, holiday seasons).</span>
                </li>
                <li style={{ display: 'flex', gap: '0.5rem' }}>
                  <span style={{ color: '#ef4444', fontWeight: 700 }}>✕</span>
                  <span><strong>Limited Sample Space:</strong> Only covers limited ticket classes and fixed metro routes manually.</span>
                </li>
              </ul>
            </div>

            {/* AeroIndex Automated Engine */}
            <div
              style={{
                backgroundColor: '#fff',
                border: '1px solid #bae6fd',
                borderRadius: '16px',
                padding: '2rem',
                boxShadow: '0 4px 6px -1px rgba(2, 132, 199, 0.08)'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
                <div style={{ padding: '0.5rem', background: '#e0f2fe', borderRadius: '8px', color: '#0284c7' }}>
                  <Zap size={20} />
                </div>
                <h3 style={{ fontSize: '1.2rem', color: '#0369a1' }}>AeroIndex Real-Time Augmentation</h3>
              </div>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.85rem', color: '#334155', fontSize: '0.92rem' }}>
                <li style={{ display: 'flex', gap: '0.5rem' }}>
                  <CheckCircle2 size={18} color="#10b981" style={{ flexShrink: 0 }} />
                  <span><strong>High-Frequency Ingestion:</strong> Continuous automated scraping across airlines and OTAs 24/7.</span>
                </li>
                <li style={{ display: 'flex', gap: '0.5rem' }}>
                  <CheckCircle2 size={18} color="#10b981" style={{ flexShrink: 0 }} />
                  <span><strong>Laspeyres Econometric Index:</strong> Weighted by passenger seat kilometers and route densities.</span>
                </li>
                <li style={{ display: 'flex', gap: '0.5rem' }}>
                  <CheckCircle2 size={18} color="#10b981" style={{ flexShrink: 0 }} />
                  <span><strong>MoSPI API Readiness:</strong> Readily pluggable into National Statistical Office (NSO) pipelines.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Core Platform Features */}
      <section className="section">
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <div className="section-header">
            <span className="section-tag">Platform Architecture</span>
            <h2 className="section-title">Key Capabilities & Features</h2>
            <p className="section-desc">
              Built with precision for econometric rigor, high-load ingestion, and public policy utility.
            </p>
          </div>

          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon-box">
                <Globe2 size={26} />
              </div>
              <h4>Automated Multi-Portal Scraping</h4>
              <p>
                Asynchronously scrapes scheduled carrier portals (IndiGo, Air India, Alliance Air, Akasa)
                and top OTAs (MakeMyTrip, EaseMyTrip, Cleartrip) with anti-bot resilience.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon-box">
                <TrendingUp size={26} />
              </div>
              <h4>CPI Augmentation Engine</h4>
              <p>
                Calculates daily price relatives using Jevons and Laspeyres formulations,
                incorporating seat capacities and route-importance weights aligned with DGCA statistics.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon-box">
                <BarChart3 size={26} />
              </div>
              <h4>Route-Level Dispersion Analysis</h4>
              <p>
                Interactive analytics for 168+ domestic routes, providing min, max, median,
                and variance distributions across departure timing buckets.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon-box">
                <ShieldCheck size={26} />
              </div>
              <h4>Data Cleansing & Outlier Filtering</h4>
              <p>
                Automated filtering of promotional anomalies, cancelled flight artifacts,
                and surge price spikes using Tukey fences and median absolute deviation.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon-box">
                <Layers size={26} />
              </div>
              <h4>Carrier & OTA Arbitrage</h4>
              <p>
                Monitors fare discrepancies between direct airline portals and OTA platforms,
                identifying platform-specific convenience fee variances.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon-box">
                <Database size={26} />
              </div>
              <h4>Policy & Regulatory Dashboard</h4>
              <p>
                Provides DGCA, Ministry of Civil Aviation, and Reserve Bank of India (RBI)
                actionable inflation forecasting signals weeks ahead of official CPI publications.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
