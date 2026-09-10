// src/pages/Dashboard.jsx
// Live Analytics Dashboard displaying real-time Airfare Price Index, charts, and telemetry feed

import React, { useState, useEffect, useCallback } from 'react';
import {
  TrendingUp,
  IndianRupee,
  Percent,
  GitFork,
  Radio,
  RefreshCw,
  Clock,
  CheckCircle2,
  WifiOff
} from 'lucide-react';
import StatCard from '../components/StatCard';
import PriceChart from '../components/PriceChart';
import Loading from '../components/Loading';
import { fetchDashboardStats } from '../services/api';

const Dashboard = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState(null);

  // Load dashboard data via service
  const loadData = useCallback(async (isManual = false) => {
    if (isManual) {
      setRefreshing(true);
    }
    setError(null);

    try {
      const result = await fetchDashboardStats();
      setData(result);
    } catch (err) {
      console.error('[Dashboard] Error loading telemetry data:', err);
      setError(err.message || 'Unable to retrieve dashboard metrics from server.');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    loadData();

    // Auto-refresh every 45 seconds to sync live scraping telemetry
    const interval = setInterval(() => {
      loadData(false);
    }, 45000);

    return () => clearInterval(interval);
  }, [loadData]);

  const handleManualRefresh = () => {
    loadData(true);
  };

  // Full-page loading state on initial mount
  if (loading && !data) {
    return <Loading message="Initializing live airfare scraping telemetry and calculating index..." />;
  }

  // Full-page error state when no data and fallback is disabled
  if (error && !data) {
    return (
      <div className="dashboard-page" style={{ padding: '3rem 1.5rem', textAlign: 'center' }}>
        <div
          style={{
            maxWidth: '500px',
            margin: '0 auto',
            backgroundColor: '#ffffff',
            borderRadius: '16px',
            padding: '2.5rem',
            boxShadow: 'var(--shadow-md)',
            border: '1px solid var(--border-color)'
          }}
        >
          <div
            style={{
              width: '56px',
              height: '56px',
              borderRadius: '50%',
              backgroundColor: '#fee2e2',
              color: '#dc2626',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 1.25rem'
            }}
          >
            <WifiOff size={28} />
          </div>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '0.5rem', color: 'var(--color-primary)' }}>
            Connection to Backend Failed
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '1.5rem', lineHeight: 1.5 }}>
            {error}
          </p>
          <button
            className="btn btn-primary"
            onClick={() => {
              setLoading(true);
              loadData(true);
            }}
            style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}
          >
            <RefreshCw size={15} />
            <span>Retry Connection</span>
          </button>
        </div>
      </div>
    );
  }

  const { kpi, indexTrend, routeComparison, airlineComparison, recentUpdates, scraperNodes } = data;

  return (
    <div className="dashboard-page">

      {/* Dashboard Top Header */}
      <div className="page-header">
        <div>
          <h1 className="page-title">Live Airfare Analytics Dashboard</h1>
          <p className="page-desc">
            Continuous real-time tracking across Indian domestic routes, automated aggregator scraping,
            and weighted Laspeyres Consumer Price Index (CPI) metrics.
          </p>
        </div>

        <div className="page-actions">
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
              fontSize: '0.82rem',
              color: 'var(--text-muted)',
              background: '#ffffff',
              padding: '0.45rem 0.85rem',
              borderRadius: '8px',
              border: '1px solid var(--border-color)'
            }}
          >
            <Clock size={14} color="#0284c7" />
            <span>Updated: <strong>{kpi.lastUpdated}</strong></span>
          </div>

          <button
            className="btn btn-secondary"
            onClick={handleManualRefresh}
            disabled={refreshing}
            style={{ fontSize: '0.85rem', padding: '0.45rem 0.85rem' }}
          >
            <RefreshCw size={14} className={refreshing ? 'animate-spin' : ''} />
            <span>{refreshing ? 'Syncing...' : 'Sync Scrapers'}</span>
          </button>
        </div>
      </div>

      {/* 5 KPI Stat Cards Grid */}
      <div className="stat-card-grid">
        <StatCard
          title="Current Airfare Index"
          value={`${kpi.currentIndex} pts`}
          icon={<TrendingUp size={22} />}
          change={`+${kpi.percentageChangeMoM}%`}
          changePeriod={`vs Base (${kpi.baseYear || '2026'}=100)`}
          trendType="positive"
          accentColor="#0284c7"
        />

        <StatCard
          title="Average Domestic Fare"
          value={`₹${kpi.averageDomesticAirfare.toLocaleString('en-IN')}`}
          icon={<IndianRupee size={22} />}
          change="+₹180"
          changePeriod="MoM Delta"
          trendType="positive"
          accentColor="#10b981"
        />

        <StatCard
          title="Percentage Change (YoY)"
          value={`+${kpi.percentageChangeYoY}%`}
          icon={<Percent size={22} />}
          change="+2.4% pts"
          changePeriod="vs Core CPI"
          trendType="positive"
          accentColor="#ea580c"
        />

        <StatCard
          title="Routes Monitored"
          value={kpi.routesMonitored}
          icon={<GitFork size={22} />}
          change="100% Coverage"
          changePeriod="Metro & Tier-2"
          trendType="neutral"
          accentColor="#6366f1"
        />

        <StatCard
          title="Airlines & OTAs Tracked"
          value={kpi.activeSources}
          icon={<Radio size={22} />}
          change="6 Airlines / 4 OTAs"
          changePeriod="24.5k quotes/day"
          trendType="neutral"
          accentColor="#0891b2"
        />
      </div>

      {/* Charts Grid Row 1: 30-Day Index Trend & Route-Wise Comparison */}
      <div className="charts-grid-2">
        {/* Airfare Price Trend Line Chart */}
        <div className="card">
          <div className="card-header">
            <div>
              <h2 className="card-title">Airfare Price Trend & CPI Benchmark (30 Days)</h2>
              <p className="card-subtitle">Daily movement of composite index vs MoSPI baseline transport indicator</p>
            </div>
            <span className="badge badge-blue">
              Real-time Series
            </span>
          </div>

          <PriceChart
            type="area"
            data={indexTrend}
            xKey="date"
            height={300}
            unit="pts"
            series={[
              { key: 'index', name: 'Airfare Price Index (AeroIndex)', color: '#0284c7' },
              { key: 'cpiTransportBase', name: 'MoSPI Transport Benchmark', color: '#94a3b8' }
            ]}
          />
        </div>

        {/* Route-Wise Airfare Comparison Bar Chart */}
        <div className="card">
          <div className="card-header">
            <div>
              <h2 className="card-title">Route-Wise Airfare Comparison (Top Corridors)</h2>
              <p className="card-subtitle">Average ticket pricing across highest-volume domestic trunk routes</p>
            </div>
            <span className="badge badge-green">High Density</span>
          </div>

          <PriceChart
            type="bar"
            data={routeComparison}
            xKey="route"
            height={300}
            unit="₹"
            xInterval={0}
            series={[
              { key: 'avgFare', name: 'Average Fare (₹)', color: '#0ea5e9' },
              { key: 'minFare', name: 'Minimum Available (₹)', color: '#10b981' }
            ]}
          />
        </div>
      </div>

      {/* Airline-Wise Price Comparison Section */}
      <div className="card" style={{ marginBottom: '2rem' }}>
        <div className="card-header">
          <div>
            <h2 className="card-title">Airline-Wise Market Price & Operational Comparison</h2>
            <p className="card-subtitle">Aggregated average fares, on-time performance, and capacity load factors</p>
          </div>
          <span className="badge badge-saffron">6 Scheduled Carriers</span>
        </div>

        <div className="table-container">
          <table className="data-table">
            <thead>
              <tr>
                <th>Airline Carrier</th>
                <th>Avg Domestic Fare</th>
                <th>On-Time Performance</th>
                <th>Passenger Load Factor</th>
                <th>Lowest Route Recorded</th>
                <th>Price Status</th>
              </tr>
            </thead>
            <tbody>
              {airlineComparison.map((item, index) => (
                <tr key={index}>
                  <td style={{ fontWeight: 600 }}>{item.airline}</td>
                  <td style={{ fontWeight: 700, color: 'var(--color-accent)' }}>
                    ₹{item.avgFare.toLocaleString('en-IN')}
                  </td>
                  <td>
                    <span className="badge badge-green">{item.onTimeRate}% OTP</span>
                  </td>
                  <td>{item.loadFactor}%</td>
                  <td style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>{item.lowestRoute}</td>
                  <td>
                    <span className={`badge ${item.avgFare > 5500 ? 'badge-yellow' : 'badge-blue'}`}>
                      {item.avgFare > 5500 ? 'Full-Service' : 'Budget / LCC'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Recent Price Updates Table (Live / Simulated Scraper Feed) */}
      <div className="charts-grid-2">
        <div className="card">
          <div className="card-header">
            <div>
              <h2 className="card-title">Live Scraped Price Feed (Recent Updates)</h2>
              <p className="card-subtitle">Real-time quotes captured across airline portals and OTAs</p>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <span className="pulse-dot"></span>
              <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#10b981' }}>
                STREAMING
              </span>
            </div>
          </div>

          <div className="table-container">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Feed ID</th>
                  <th>Route</th>
                  <th>Carrier</th>
                  <th>Scraped Price</th>
                  <th>Source</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {recentUpdates.map((quote) => (
                  <tr key={quote.id}>
                    <td style={{ fontFamily: 'monospace', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                      {quote.id}
                    </td>
                    <td style={{ fontWeight: 600 }}>{quote.route}</td>
                    <td>{quote.airline}</td>
                    <td style={{ fontWeight: 700, color: '#0f172a' }}>
                      ₹{quote.price.toLocaleString('en-IN')}
                    </td>
                    <td>
                      <span className="badge badge-gray">{quote.ota}</span>
                    </td>
                    <td>
                      <span
                        className={`badge ${
                          quote.status === 'Verified'
                            ? 'badge-green'
                            : quote.status === 'Live'
                            ? 'badge-blue'
                            : 'badge-yellow'
                        }`}
                      >
                        {quote.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Scraper Health & Telemetry Status */}
        <div className="card">
          <div className="card-header">
            <div>
              <h2 className="card-title">Scraping Node Health & Uptime</h2>
              <p className="card-subtitle">Distributed crawler performance and ingestion latency</p>
            </div>
            <span className="badge badge-green">99.5% Overall Uptime</span>
          </div>

          <div className="table-container">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Target Portal</th>
                  <th>Category</th>
                  <th>Status</th>
                  <th>Latency</th>
                  <th>Success Rate</th>
                </tr>
              </thead>
              <tbody>
                {scraperNodes.map((node, i) => (
                  <tr key={i}>
                    <td style={{ fontWeight: 600 }}>{node.portal}</td>
                    <td style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{node.type}</td>
                    <td>
                      <span className="badge badge-green" style={{ fontSize: '0.7rem' }}>
                        <CheckCircle2 size={10} /> {node.status}
                      </span>
                    </td>
                    <td style={{ fontFamily: 'monospace', fontSize: '0.82rem' }}>{node.latency}</td>
                    <td>
                      <span style={{ fontWeight: 600, color: '#047857' }}>{node.successRate}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
