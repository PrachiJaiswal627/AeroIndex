// src/pages/About.jsx
// About Page for Smart India Hackathon (SIH) judges: Problem Statement, Objectives, Pipeline, & Team

import React from 'react';
import {
  Target,
  Lightbulb,
  Cpu,
  Users,
  Layers,
  CheckCircle2,
  Database,
  Globe2,
  TrendingUp,
  FileCheck2
} from 'lucide-react';
import { TEAM_MEMBERS } from '../data/dummyData';

const About = () => {
  return (
    <div className="about-page">
      {/* Header */}
      <div className="page-header">
        <div>
          <h1 className="page-title">About AeroIndex & Project Architecture</h1>
          <p className="page-desc">
            Technical blueprint, econometric framework, and team details developed for the Smart India Hackathon (SIH).
          </p>
        </div>

        <div className="page-actions">
          <span className="badge badge-saffron" style={{ padding: '0.5rem 1rem', fontSize: '0.85rem' }}>
            SIH Problem Statement
          </span>
        </div>
      </div>

      {/* Problem Statement Card */}
      <div className="card" style={{ marginBottom: '2rem', borderLeft: '4px solid #ea580c' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.75rem' }}>
          <div style={{ padding: '0.4rem', background: '#ffedd5', color: '#ea580c', borderRadius: '8px' }}>
            <Target size={20} />
          </div>
          <h2 style={{ fontSize: '1.25rem', color: 'var(--color-primary)' }}>Official Problem Statement</h2>
        </div>
        <blockquote
          style={{
            fontSize: '1.15rem',
            fontStyle: 'italic',
            color: '#1e293b',
            lineHeight: 1.6,
            background: 'var(--bg-app)',
            padding: '1.25rem 1.5rem',
            borderRadius: '10px',
            border: '1px solid var(--border-color)',
            margin: '0.75rem 0'
          }}
        >
          “Development of a Real-time Airfare Price Index for India through Automated Web Scraping of Airline
          and Online Travel Aggregator Portals for Augmentation of the Consumer Price Index (CPI).”
        </blockquote>
        <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginTop: '0.75rem' }}>
          Submitted under the <strong>Smart India Hackathon (SIH)</strong> to solve critical data latency issues
          faced by statistical authorities in tracking dynamic aviation prices.
        </p>
      </div>

      {/* Objectives & Proposed Solution Grid */}
      <div className="charts-grid-2">
        {/* Project Objectives */}
        <div className="card">
          <div className="card-header">
            <h2 className="card-title">
              <Target size={20} color="#0284c7" />
              Core Objectives
            </h2>
          </div>

          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '1rem', fontSize: '0.92rem', color: '#334155' }}>
            <li style={{ display: 'flex', gap: '0.75rem' }}>
              <CheckCircle2 size={18} color="#0284c7" style={{ flexShrink: 0, marginTop: 2 }} />
              <div>
                <strong>High-Frequency Automated Ingestion:</strong> Replace manual price inquiries with continuous
                scraping across scheduled carriers (IndiGo, Air India, Akasa, SpiceJet) and OTAs (MakeMyTrip, EaseMyTrip).
              </div>
            </li>
            <li style={{ display: 'flex', gap: '0.75rem' }}>
              <CheckCircle2 size={18} color="#0284c7" style={{ flexShrink: 0, marginTop: 2 }} />
              <div>
                <strong>Statistically Sound Indexation:</strong> Formulate a robust Laspeyres Airfare Index
                calibrated with DGCA passenger capacity and route density matrices.
              </div>
            </li>
            <li style={{ display: 'flex', gap: '0.75rem' }}>
              <CheckCircle2 size={18} color="#0284c7" style={{ flexShrink: 0, marginTop: 2 }} />
              <div>
                <strong>Outlier & Surge Filtering:</strong> Screen for promotional flash sales, ancillary add-ons,
                and abnormal single-seat surges using Median Absolute Deviation (MAD).
              </div>
            </li>
            <li style={{ display: 'flex', gap: '0.75rem' }}>
              <CheckCircle2 size={18} color="#0284c7" style={{ flexShrink: 0, marginTop: 2 }} />
              <div>
                <strong>Nowcasting for MoSPI & RBI:</strong> Deliver near-real-time inflation indicators to empower
                monetary policy and consumer welfare monitoring.
              </div>
            </li>
          </ul>
        </div>

        {/* Proposed Solution */}
        <div className="card">
          <div className="card-header">
            <h2 className="card-title">
              <Lightbulb size={20} color="#ea580c" />
              Proposed Solution
            </h2>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', fontSize: '0.92rem', color: '#334155', lineHeight: 1.6 }}>
            <p>
              AeroIndex introduces an end-to-end automated platform that bridges web-scale data collection
              and government-grade econometrics.
            </p>
            <p>
              By monitoring over <strong>168 domestic corridors</strong> and scraping more than <strong>24,000 fare quotes daily</strong>,
              our platform captures dynamic yield management shifts across diverse advance purchase windows
              (same-day up to 30+ days).
            </p>
            <div
              style={{
                backgroundColor: 'var(--bg-card-subtle)',
                padding: '0.85rem 1rem',
                borderRadius: '8px',
                borderLeft: '4px solid #10b981'
              }}
            >
              <strong>Outcome:</strong> A sub-monthly, reliable, and verifiable Airfare Price Index that seamlessly
              plugs into the <em>Transport (Services)</em> sub-component of the national CPI basket.
            </div>
          </div>
        </div>
      </div>

      {/* How the System Works - Architecture Pipeline */}
      <div className="card" style={{ margin: '2rem 0' }}>
        <div className="card-header">
          <div>
            <h2 className="card-title">
              <Layers size={20} color="#0284c7" />
              How the System Works: End-to-End Pipeline
            </h2>
            <p className="card-subtitle">5-Stage data ingestion, cleansing, indexing, and visualization flow</p>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', paddingTop: '0.75rem' }}>
          {/* Step 1 */}
          <div style={{ backgroundColor: 'var(--bg-card-subtle)', padding: '1.25rem', borderRadius: '10px', position: 'relative' }}>
            <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#0284c7', marginBottom: '0.35rem' }}>STAGE 1</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
              <Globe2 size={18} color="#0284c7" />
              <h4 style={{ fontSize: '0.95rem' }}>Distributed Crawlers</h4>
            </div>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
              Headless browser agents scrape airline engines and OTA search APIs at scheduled intervals.
            </p>
          </div>

          {/* Step 2 */}
          <div style={{ backgroundColor: 'var(--bg-card-subtle)', padding: '1.25rem', borderRadius: '10px' }}>
            <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#ea580c', marginBottom: '0.35rem' }}>STAGE 2</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
              <FileCheck2 size={18} color="#ea580c" />
              <h4 style={{ fontSize: '0.95rem' }}>Cleansing & Dedup</h4>
            </div>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
              Filters baggage fees, convenience charges, and detects fare anomalies via Tukey fences.
            </p>
          </div>

          {/* Step 3 */}
          <div style={{ backgroundColor: 'var(--bg-card-subtle)', padding: '1.25rem', borderRadius: '10px' }}>
            <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#10b981', marginBottom: '0.35rem' }}>STAGE 3</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
              <Database size={18} color="#10b981" />
              <h4 style={{ fontSize: '0.95rem' }}>Time-Series Storage</h4>
            </div>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
              Normalized flight data stored with corridor, airline, departure time, and booking date tags.
            </p>
          </div>

          {/* Step 4 */}
          <div style={{ backgroundColor: 'var(--bg-card-subtle)', padding: '1.25rem', borderRadius: '10px' }}>
            <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#6366f1', marginBottom: '0.35rem' }}>STAGE 4</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
              <TrendingUp size={18} color="#6366f1" />
              <h4 style={{ fontSize: '0.95rem' }}>Laspeyres Indexing</h4>
            </div>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
              Computes daily price relatives weighted by DGCA route seat capacity coefficients.
            </p>
          </div>

          {/* Step 5 */}
          <div style={{ backgroundColor: 'var(--bg-card-subtle)', padding: '1.25rem', borderRadius: '10px' }}>
            <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#0891b2', marginBottom: '0.35rem' }}>STAGE 5</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
              <Cpu size={18} color="#0891b2" />
              <h4 style={{ fontSize: '0.95rem' }}>API & Dashboard</h4>
            </div>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
              Exposes real-time dashboards and secure REST API endpoints for MoSPI, RBI, and researchers.
            </p>
          </div>
        </div>
      </div>

      {/* Technologies Used Grid */}
      <div className="card" style={{ marginBottom: '2rem' }}>
        <div className="card-header">
          <div>
            <h2 className="card-title">
              <Cpu size={20} color="#0284c7" />
              Technologies Used
            </h2>
            <p className="card-subtitle">Full-stack modern architecture powering the solution</p>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.25rem', paddingTop: '0.5rem' }}>
          <div style={{ padding: '1rem', border: '1px solid var(--border-color)', borderRadius: '8px' }}>
            <h4 style={{ color: 'var(--color-primary)', marginBottom: '0.25rem' }}>Frontend Framework</h4>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
              React 19, Vite, JavaScript (JSX), and React Router DOM for routing.
            </p>
          </div>

          <div style={{ padding: '1rem', border: '1px solid var(--border-color)', borderRadius: '8px' }}>
            <h4 style={{ color: 'var(--color-primary)', marginBottom: '0.25rem' }}>Data Visualization</h4>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
              Recharts engine for interactive SVG time-series, line, area, and bar charts.
            </p>
          </div>

          <div style={{ padding: '1rem', border: '1px solid var(--border-color)', borderRadius: '8px' }}>
            <h4 style={{ color: 'var(--color-primary)', marginBottom: '0.25rem' }}>API Client & Icons</h4>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
              Axios HTTP client with mock fallback; Lucide React for modern vector icons.
            </p>
          </div>

          <div style={{ padding: '1rem', border: '1px solid var(--border-color)', borderRadius: '8px' }}>
            <h4 style={{ color: 'var(--color-primary)', marginBottom: '0.25rem' }}>Econometric Algorithms</h4>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
              Laspeyres and Jevons price relative formulas; DGCA capacity weighting matrices.
            </p>
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div className="card">
        <div className="card-header">
          <div>
            <h2 className="card-title">
              <Users size={20} color="#ea580c" />
              Smart India Hackathon Team
            </h2>
            <p className="card-subtitle">Multidisciplinary team collaborating on the project</p>
          </div>
          <span className="badge badge-saffron">SIH 2026 Finalist Team</span>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem', paddingTop: '0.75rem' }}>
          {TEAM_MEMBERS.map((member, index) => (
            <div
              key={index}
              style={{
                backgroundColor: 'var(--bg-app)',
                border: '1px solid var(--border-color)',
                borderRadius: '10px',
                padding: '1.25rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.4rem'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <h4 style={{ fontSize: '1.05rem', color: 'var(--color-primary)' }}>{member.name}</h4>
                <span className="badge badge-blue" style={{ fontSize: '0.72rem' }}>Member #{index + 1}</span>
              </div>
              <div style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--color-accent)' }}>
                {member.role}
              </div>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-light)' }}>
                {member.college}
              </div>
              <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginTop: '0.35rem', lineHeight: 1.5 }}>
                {member.bio}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default About;
