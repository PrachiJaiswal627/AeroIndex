// src/components/PriceChart.jsx
// Reusable Recharts wrapper supporting Line, Area, and Bar charts with custom tooltips

import React from 'react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from 'recharts';

/**
 * Custom Tooltip with Currency and Metric Formatting
 */
const CustomTooltip = ({ active, payload, label, unit = '₹' }) => {
  if (active && payload && payload.length) {
    return (
      <div
        style={{
          backgroundColor: '#0f172a',
          color: '#ffffff',
          padding: '0.75rem 1rem',
          borderRadius: '8px',
          boxShadow: '0 10px 20px rgba(0,0,0,0.25)',
          fontSize: '0.85rem',
          border: '1px solid #334155'
        }}
      >
        <p style={{ fontWeight: 700, marginBottom: '0.35rem', color: '#38bdf8' }}>{label}</p>
        {payload.map((item, index) => (
          <p key={index} style={{ margin: '0.2rem 0', color: item.color || '#f8fafc' }}>
            <span style={{ fontWeight: 600 }}>{item.name}: </span>
            {item.name?.toLowerCase().includes('fare') || item.name?.toLowerCase().includes('price')
              ? `₹${Number(item.value).toLocaleString('en-IN')}`
              : `${item.value} ${unit === '₹' && !item.name?.toLowerCase().includes('index') ? '' : ''}`}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

/**
 * PriceChart Component
 * @param {'line'|'area'|'bar'} type - Chart type
 * @param {Array} data - Dataset array
 * @param {string} xKey - Key for X-Axis (e.g. 'date', 'route', 'month')
 * @param {Array} series - Array of series configs [{ key: 'avgFare', name: 'Avg Fare', color: '#0284c7' }]
 * @param {number} height - Chart height in px (default 320)
 * @param {string} unit - Value unit for tooltip
 */
const PriceChart = ({
  type = 'line',
  data = [],
  xKey = 'date',
  series = [{ key: 'value', name: 'Value', color: '#0284c7' }],
  height = 320,
  unit = '₹',
  xInterval
}) => {
  if (!data || data.length === 0) {
    return (
      <div style={{ height, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#94a3b8' }}>
        No chart data available
      </div>
    );
  }

  const effectiveInterval = xInterval !== undefined ? xInterval : (type === 'bar' ? 0 : 'preserveEnd');

  return (
    <div style={{ width: '100%', height }}>
      <ResponsiveContainer width="100%" height="100%">
        {type === 'bar' ? (
          <BarChart data={data} margin={{ top: 10, right: 15, left: 10, bottom: 25 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
            <XAxis
              dataKey={xKey}
              stroke="#64748b"
              fontSize={11}
              tickLine={false}
              axisLine={{ stroke: '#cbd5e1' }}
              interval={effectiveInterval}
              tick={{ dy: 3 }}
            />
            <YAxis
              stroke="#64748b"
              fontSize={12}
              tickLine={false}
              axisLine={{ stroke: '#cbd5e1' }}
              tickFormatter={(val) => (val >= 1000 ? `₹${(val / 1000).toFixed(1)}k` : val)}
            />
            <Tooltip content={<CustomTooltip unit={unit} />} />
            <Legend wrapperStyle={{ paddingTop: 10, fontSize: '0.85rem' }} />
            {series.map((s) => (
              <Bar
                key={s.key}
                dataKey={s.key}
                name={s.name || s.key}
                fill={s.color || '#0284c7'}
                radius={[4, 4, 0, 0]}
              />
            ))}
          </BarChart>
        ) : type === 'area' ? (
          <AreaChart data={data} margin={{ top: 10, right: 20, left: 10, bottom: 20 }}>
            <defs>
              {series.map((s, idx) => (
                <linearGradient key={idx} id={`colorGrad-${s.key}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={s.color || '#0284c7'} stopOpacity={0.4} />
                  <stop offset="95%" stopColor={s.color || '#0284c7'} stopOpacity={0.0} />
                </linearGradient>
              ))}
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
            <XAxis
              dataKey={xKey}
              stroke="#64748b"
              fontSize={12}
              tickLine={false}
              axisLine={{ stroke: '#cbd5e1' }}
            />
            <YAxis
              stroke="#64748b"
              fontSize={12}
              tickLine={false}
              axisLine={{ stroke: '#cbd5e1' }}
              tickFormatter={(val) => (val >= 1000 ? `₹${(val / 1000).toFixed(1)}k` : val)}
            />
            <Tooltip content={<CustomTooltip unit={unit} />} />
            <Legend wrapperStyle={{ paddingTop: 10, fontSize: '0.85rem' }} />
            {series.map((s) => (
              <Area
                key={s.key}
                type="monotone"
                dataKey={s.key}
                name={s.name || s.key}
                stroke={s.color || '#0284c7'}
                strokeWidth={2.5}
                fillOpacity={1}
                fill={`url(#colorGrad-${s.key})`}
              />
            ))}
          </AreaChart>
        ) : (
          <LineChart data={data} margin={{ top: 10, right: 20, left: 10, bottom: 20 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
            <XAxis
              dataKey={xKey}
              stroke="#64748b"
              fontSize={12}
              tickLine={false}
              axisLine={{ stroke: '#cbd5e1' }}
            />
            <YAxis
              stroke="#64748b"
              fontSize={12}
              tickLine={false}
              axisLine={{ stroke: '#cbd5e1' }}
              tickFormatter={(val) => (val >= 1000 ? `₹${(val / 1000).toFixed(1)}k` : val)}
            />
            <Tooltip content={<CustomTooltip unit={unit} />} />
            <Legend wrapperStyle={{ paddingTop: 10, fontSize: '0.85rem' }} />
            {series.map((s) => (
              <Line
                key={s.key}
                type="monotone"
                dataKey={s.key}
                name={s.name || s.key}
                stroke={s.color || '#0284c7'}
                strokeWidth={2.5}
                dot={{ r: 3 }}
                activeDot={{ r: 6 }}
              />
            ))}
          </LineChart>
        )}
      </ResponsiveContainer>
    </div>
  );
};

export default PriceChart;
