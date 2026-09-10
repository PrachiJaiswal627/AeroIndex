// src/pages/RouteAnalysis.jsx
// Detailed Route-Specific Airfare Analysis, Airline comparisons, and Historical Corridor Trends

import React, { useState, useEffect } from 'react';
import {
  Compass,
  TrendingDown,
  IndianRupee,
  Layers,
  Sparkles,
  PlaneTakeoff,
  PlaneLanding
} from 'lucide-react';
import RouteSelector from '../components/RouteSelector';
import StatCard from '../components/StatCard';
import PriceChart from '../components/PriceChart';
import Loading from '../components/Loading';
import { fetchRouteAnalysis } from '../services/api';

const RouteAnalysis = () => {
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(false);
  const [currentRoute, setCurrentRoute] = useState({
    origin: 'DEL',
    dest: 'BOM',
    date: '2026-09-15'
  });

  const performAnalysis = async (origin, dest, date) => {
    setLoading(true);
    try {
      const data = await fetchRouteAnalysis(origin, dest, date);
      setAnalysis(data);
      setCurrentRoute({ origin, dest, date });
    } catch (err) {
      console.error('Error in route analysis', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Initial analysis for default route
    performAnalysis('DEL', 'BOM', '2026-09-15');
  }, []);

  const handleAnalyze = ({ origin, dest, date }) => {
    performAnalysis(origin, dest, date);
  };

  return (
    <div className="route-analysis-page">
      {/* Header */}
      <div className="page-header">
        <div>
          <h1 className="page-title">Corridor & Route-Level Fare Analysis</h1>
          <p className="page-desc">
            Select origin, destination, and target travel date to inspect live fare dispersion,
            inter-airline price competition, and 14-day booking window movements.
          </p>
        </div>
      </div>

      {/* Route Selector Controls */}
      <RouteSelector
        initialOrigin={currentRoute.origin}
        initialDest={currentRoute.dest}
        initialDate={currentRoute.date}
        onAnalyze={handleAnalyze}
        isLoading={loading}
      />

      {loading ? (
        <Loading message={`Analyzing corridor pricing for ${currentRoute.origin} → ${currentRoute.dest}...`} />
      ) : analysis ? (
        <>
          {/* Active Route Overview Banner */}
          <div
            style={{
              backgroundColor: '#ffffff',
              border: '1px solid var(--border-color)',
              borderRadius: '14px',
              padding: '1.25rem 1.5rem',
              marginBottom: '1.5rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '1rem',
              boxShadow: 'var(--shadow-xs)'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <div
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: 10,
                  backgroundColor: 'var(--color-accent-light)',
                  color: 'var(--color-accent)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <Compass size={24} />
              </div>
              <div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--color-primary)' }}>
                  {analysis.origin.city} ({analysis.origin.code})
                  <span style={{ color: 'var(--color-accent)', margin: '0 0.5rem' }}>→</span>
                  {analysis.dest.city} ({analysis.dest.code})
                </h3>
                <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
                  Estimated Distance: <strong>{analysis.distanceKm.toLocaleString('en-IN')} km</strong> • Travel Date:{' '}
                  <strong>{analysis.travelDate}</strong>
                </p>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <span className="badge badge-blue">
                <Sparkles size={12} /> Cheapest Carrier: {analysis.cheapestCarrier}
              </span>
              <span className="badge badge-green">
                {analysis.airlinesAvailable.length} Carriers Operating
              </span>
            </div>
          </div>

          {/* Key Fare Metrics: Min, Max, Avg, Cheapest Carrier */}
          <div className="stat-card-grid">
            <StatCard
              title="Minimum Airfare"
              value={`₹${analysis.minFare.toLocaleString('en-IN')}`}
              icon={<TrendingDown size={22} />}
              change={`Best: ${analysis.cheapestCarrier}`}
              changePeriod="Lowest Quote"
              trendType="negative"
              accentColor="#10b981"
            />

            <StatCard
              title="Average Route Airfare"
              value={`₹${analysis.avgFare.toLocaleString('en-IN')}`}
              icon={<IndianRupee size={22} />}
              change="Mean Fare"
              changePeriod="Across all airlines"
              trendType="neutral"
              accentColor="#0284c7"
            />

            <StatCard
              title="Maximum Airfare"
              value={`₹${analysis.maxFare.toLocaleString('en-IN')}`}
              icon={<IndianRupee size={22} />}
              change="Peak Fare"
              changePeriod="Full service/Flexi"
              trendType="positive"
              accentColor="#ea580c"
            />

            <StatCard
              title="Available Airlines"
              value={analysis.airlinesAvailable.length}
              icon={<Layers size={22} />}
              change="Active Carriers"
              changePeriod="Direct flights"
              trendType="neutral"
              accentColor="#6366f1"
            />
          </div>

          {/* Charts Row: Price Comparison by Airline & 14-Day Route Historical Trend */}
          <div className="charts-grid-2">
            {/* Airline Price Comparison Chart */}
            <div className="card">
              <div className="card-header">
                <div>
                  <h2 className="card-title">Inter-Airline Price Comparison</h2>
                  <p className="card-subtitle">Fare variation across competing carriers for this route</p>
                </div>
                <span className="badge badge-blue">Direct Flights</span>
              </div>

              <PriceChart
                type="bar"
                data={analysis.flights.map((f) => ({
                  airline: f.airline,
                  fare: f.price,
                  mmtFare: f.otaPrices.MakeMyTrip,
                  emtFare: f.otaPrices.EaseMyTrip
                }))}
                xKey="airline"
                height={290}
                unit="₹"
                series={[
                  { key: 'fare', name: 'Direct Fare (₹)', color: '#0284c7' },
                  { key: 'emtFare', name: 'EaseMyTrip (₹)', color: '#10b981' }
                ]}
              />
            </div>

            {/* Historical Trend Chart */}
            <div className="card">
              <div className="card-header">
                <div>
                  <h2 className="card-title">Historical Booking Window Trend (Past 14 Days)</h2>
                  <p className="card-subtitle">How average route fare evolved leading up to travel date</p>
                </div>
                <span className="badge badge-saffron">Dynamic Pricing</span>
              </div>

              <PriceChart
                type="line"
                data={analysis.historicalTrend}
                xKey="day"
                height={290}
                unit="₹"
                series={[
                  { key: 'fare', name: 'Average Route Fare', color: '#ea580c' },
                  { key: 'otaMin', name: 'Lowest OTA Quote', color: '#10b981' }
                ]}
              />
            </div>
          </div>

          {/* Detailed Available Flights & OTA Comparison Table */}
          <div className="card">
            <div className="card-header">
              <div>
                <h2 className="card-title">Available Flights & OTA Rate Discrepancy</h2>
                <p className="card-subtitle">
                  Comparing prices across direct airline portals, MakeMyTrip, and EaseMyTrip
                </p>
              </div>
              <span className="badge badge-green">Real-time Telemetry</span>
            </div>

            <div className="table-container">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Flight / Airline</th>
                    <th>Schedule</th>
                    <th>Duration</th>
                    <th>Direct Airline Fare</th>
                    <th>MakeMyTrip</th>
                    <th>EaseMyTrip</th>
                    <th>Seats Available</th>
                    <th>Pricing Tier</th>
                  </tr>
                </thead>
                <tbody>
                  {analysis.flights.map((flight, idx) => (
                    <tr key={idx}>
                      <td>
                        <div style={{ fontWeight: 700, color: 'var(--color-primary)' }}>
                          {flight.airline}
                        </div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                          {flight.flightNo}
                        </div>
                      </td>
                      <td>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.85rem' }}>
                          <PlaneTakeoff size={13} color="#0284c7" />
                          <span>{flight.departure}</span>
                          <span style={{ color: 'var(--text-light)' }}>→</span>
                          <PlaneLanding size={13} color="#10b981" />
                          <span>{flight.arrival}</span>
                        </div>
                      </td>
                      <td style={{ fontSize: '0.85rem' }}>{flight.duration}</td>
                      <td style={{ fontWeight: 700, color: 'var(--color-primary)' }}>
                        ₹{flight.price.toLocaleString('en-IN')}
                      </td>
                      <td>₹{flight.otaPrices.MakeMyTrip.toLocaleString('en-IN')}</td>
                      <td style={{ color: '#047857', fontWeight: 600 }}>
                        ₹{flight.otaPrices.EaseMyTrip.toLocaleString('en-IN')}
                      </td>
                      <td>
                        <span
                          className={`badge ${
                            flight.seatsLeft <= 4 ? 'badge-yellow' : 'badge-gray'
                          }`}
                        >
                          {flight.seatsLeft} left
                        </span>
                      </td>
                      <td>
                        <span
                          className={`badge ${
                            flight.status.includes('Cheapest')
                              ? 'badge-green'
                              : flight.status.includes('Premium')
                              ? 'badge-saffron'
                              : 'badge-blue'
                          }`}
                        >
                          {flight.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      ) : null}
    </div>
  );
};

export default RouteAnalysis;
