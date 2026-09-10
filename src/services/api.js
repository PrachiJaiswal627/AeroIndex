// src/services/api.js
// Centralized Axios API Service Layer for AIROINDEX
// Provides resilient data fetching, error normalization, and fallback to simulation data

import axios from 'axios';
import {
  KPI_METRICS,
  INDEX_TREND_30_DAYS,
  ROUTE_WISE_COMPARISON,
  AIRLINE_COMPARISON_DATA,
  RECENT_PRICE_UPDATES,
  SCRAPER_NODES,
  CPI_INDEX_SERIES,
  HISTORICAL_TRENDS,
  getRouteAnalysis,
  AIRPORTS
} from '../data/dummyData';

// Configuration from Vite environment variables
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';
const API_TIMEOUT = Number(import.meta.env.VITE_API_TIMEOUT) || 8000;
const ENABLE_MOCK_FALLBACK = import.meta.env.VITE_ENABLE_MOCK_FALLBACK !== 'false';

/**
 * Pre-configured Axios instance
 */
export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: API_TIMEOUT,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json'
  }
});

/**
 * Standardized API error structure
 */
export class ApiError extends Error {
  constructor(message, status = null, data = null, isFallback = false) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.data = data;
    this.isFallback = isFallback;
  }
}

/**
 * Normalizes Axios error into a human-readable object
 */
export const normalizeError = (error) => {
  if (error.response) {
    // Backend returned an HTTP status outside 2xx
    const serverMessage = error.response.data?.message || error.response.statusText;
    return new ApiError(
      `Server Error (${error.response.status}): ${serverMessage}`,
      error.response.status,
      error.response.data
    );
  } else if (error.request) {
    // Request sent but no response received (network error / offline backend)
    return new ApiError(
      'Unable to connect to AIROINDEX backend server. Check network connection or proxy settings.',
      0,
      null
    );
  } else {
    // Error setting up the request
    return new ApiError(error.message || 'An unexpected error occurred.', null, null);
  }
};

/**
 * Execute request with graceful simulation fallback
 */
async function executeWithFallback(requestFn, fallbackDataFn, endpointName) {
  try {
    const response = await requestFn();
    return {
      ...response.data,
      _source: 'backend',
      _isFallback: false
    };
  } catch (rawError) {
    const normalized = normalizeError(rawError);
    console.warn(`[AIROINDEX API] ${endpointName} request failed: ${normalized.message}`);

    if (ENABLE_MOCK_FALLBACK && fallbackDataFn) {
      console.info(`[AIROINDEX API] Serving fallback simulation data for ${endpointName}.`);
      const fallbackResult = typeof fallbackDataFn === 'function' ? fallbackDataFn() : fallbackDataFn;
      return {
        ...fallbackResult,
        _source: 'fallback',
        _isFallback: true,
        _fallbackReason: normalized.message
      };
    }

    throw normalized;
  }
}

/**
 * 1. Fetch Dashboard Stats & Telemetry
 * Endpoints: GET /dashboard
 */
export const fetchDashboardStats = async () => {
  return executeWithFallback(
    () => apiClient.get('/dashboard'),
    () => ({
      kpi: KPI_METRICS,
      indexTrend: INDEX_TREND_30_DAYS,
      routeComparison: ROUTE_WISE_COMPARISON,
      airlineComparison: AIRLINE_COMPARISON_DATA,
      recentUpdates: RECENT_PRICE_UPDATES,
      scraperNodes: SCRAPER_NODES
    }),
    'fetchDashboardStats'
  );
};

// Backwards-compatible alias for existing components
export const fetchDashboardData = fetchDashboardStats;

/**
 * 2. Fetch Historical Trends
 * Endpoint: GET /trends/historical?route=&airline=
 * @param {Object|string} params - { route, airline } or legacy filterRoute string
 * @param {string} [legacyAirline] - optional legacy second argument
 */
export const fetchHistoricalTrends = async (params = {}, legacyAirline = 'ALL') => {
  let route = 'ALL';
  let airline = 'ALL';

  if (typeof params === 'string') {
    route = params;
    airline = legacyAirline || 'ALL';
  } else if (typeof params === 'object' && params !== null) {
    route = params.route || 'ALL';
    airline = params.airline || 'ALL';
  }

  return executeWithFallback(
    () => apiClient.get('/trends/historical', { params: { route, airline } }),
    () => HISTORICAL_TRENDS,
    'fetchHistoricalTrends'
  );
};

/**
 * 3. Fetch Price Index & CPI Augmentation Series
 * Endpoint: GET /price-index
 * @param {Object} [params] - Optional query params e.g. { baseYear }
 */
export const fetchPriceIndex = async (params = {}) => {
  return executeWithFallback(
    () => apiClient.get('/price-index', { params }),
    () => ({
      kpi: KPI_METRICS,
      cpiSeries: CPI_INDEX_SERIES,
      weightages: [
        { category: 'Metro - Metro High Density Corridors', weight: '48%', routes: 'DEL-BOM, BOM-BLR, etc.' },
        { category: 'Metro - Tier 2 Connecting Corridors', weight: '32%', routes: 'DEL-PNQ, BOM-GOI, etc.' },
        { category: 'Regional / UDAN Subsidized Sectors', weight: '20%', routes: 'Tier 2 & 3 Regional hubs' }
      ]
    }),
    'fetchPriceIndex'
  );
};

// Backwards-compatible alias
export const fetchPriceIndexData = fetchPriceIndex;

/**
 * 4. Fetch Corridor & Route Analysis
 * Endpoint: GET /routes/analyze?origin=&dest=&date=
 * Supports: fetchRouteAnalysis({ origin, dest, date }) OR fetchRouteAnalysis(origin, dest, date)
 */
export const fetchRouteAnalysis = async (param1, param2, param3) => {
  let origin = 'DEL';
  let dest = 'BOM';
  let date = '2026-09-15';

  if (typeof param1 === 'object' && param1 !== null) {
    origin = param1.origin || origin;
    dest = param1.dest || dest;
    date = param1.date || date;
  } else {
    origin = param1 || origin;
    dest = param2 || dest;
    date = param3 || date;
  }

  return executeWithFallback(
    () => apiClient.get('/routes/analyze', { params: { origin, dest, date } }),
    () => getRouteAnalysis(origin, dest, date),
    `fetchRouteAnalysis(${origin}->${dest})`
  );
};

/**
 * 5. Fetch Active Airport Hubs
 * Endpoint: GET /airports
 */
export const fetchAirports = async () => {
  return executeWithFallback(
    () => apiClient.get('/airports'),
    () => AIRPORTS,
    'fetchAirports'
  );
};

export default apiClient;
