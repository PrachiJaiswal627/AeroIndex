// src/data/dummyData.js
// Realistic domestic Indian aviation dataset for Smart India Hackathon (SIH)
// "Real-Time Airfare Price Index for India (CPI Augmentation)"

export const AIRPORTS = [
  { code: 'DEL', name: 'Indira Gandhi International Airport', city: 'New Delhi', state: 'Delhi', lat: 28.5562, lon: 77.1000 },
  { code: 'BOM', name: 'Chhatrapati Shivaji Maharaj Intl Airport', city: 'Mumbai', state: 'Maharashtra', lat: 19.0896, lon: 72.8656 },
  { code: 'BLR', name: 'Kempegowda International Airport', city: 'Bengaluru', state: 'Karnataka', lat: 13.1986, lon: 77.7066 },
  { code: 'HYD', name: 'Rajiv Gandhi International Airport', city: 'Hyderabad', state: 'Telangana', lat: 17.2403, lon: 78.4294 },
  { code: 'CCU', name: 'Netaji Subhash Chandra Bose Intl Airport', city: 'Kolkata', state: 'West Bengal', lat: 22.6547, lon: 88.4467 },
  { code: 'MAA', name: 'Chennai International Airport', city: 'Chennai', state: 'Tamil Nadu', lat: 12.9941, lon: 80.1709 },
  { code: 'AMD', name: 'Sardar Vallabhbhai Patel Intl Airport', city: 'Ahmedabad', state: 'Gujarat', lat: 23.0772, lon: 72.6347 },
  { code: 'PNQ', name: 'Pune International Airport', city: 'Pune', state: 'Maharashtra', lat: 18.5822, lon: 73.9197 },
  { code: 'GOI', name: 'Goa Dabolim / MOPA Airport', city: 'Goa', state: 'Goa', lat: 15.3808, lon: 73.8314 },
  { code: 'JAI', name: 'Jaipur International Airport', city: 'Jaipur', state: 'Rajasthan', lat: 26.8242, lon: 75.8122 },
  { code: 'COK', name: 'Cochin International Airport', city: 'Kochi', state: 'Kerala', lat: 10.1518, lon: 76.4019 },
  { code: 'GAU', name: 'Lokpriya Gopinath Bordoloi Intl Airport', city: 'Guwahati', state: 'Assam', lat: 26.1061, lon: 91.5859 }
];

/**
 * Real-world DGCA airway flight distance benchmarks (in km) between major Indian airport pairs
 */
export const AIRWAY_DISTANCES = {
  'DEL-BOM': 1148, 'BOM-DEL': 1148,
  'DEL-BLR': 1740, 'BLR-DEL': 1740,
  'BOM-BLR': 842,  'BLR-BOM': 842,
  'BOM-GOI': 435,  'GOI-BOM': 435,
  'DEL-CCU': 1305, 'CCU-DEL': 1305,
  'BLR-HYD': 500,  'HYD-BLR': 500,
  'DEL-HYD': 1253, 'HYD-DEL': 1253,
  'DEL-PNQ': 1173, 'PNQ-DEL': 1173,
  'DEL-JAI': 235,  'JAI-DEL': 235,
  'DEL-COK': 2045, 'COK-DEL': 2045,
  'DEL-AMD': 775,  'AMD-DEL': 775,
  'DEL-MAA': 1760, 'MAA-DEL': 1760,
  'DEL-GAU': 1460, 'GAU-DEL': 1460,
  'BOM-PNQ': 120,  'PNQ-BOM': 120,
  'BOM-MAA': 1032, 'MAA-BOM': 1032,
  'BOM-HYD': 620,  'HYD-BOM': 620,
  'BOM-CCU': 1655, 'CCU-BOM': 1655,
  'BOM-AMD': 440,  'AMD-BOM': 440,
  'BOM-COK': 1065, 'COK-BOM': 1065,
  'BLR-MAA': 290,  'MAA-BLR': 290,
  'BLR-GOI': 480,  'GOI-BLR': 480,
  'BLR-COK': 365,  'COK-BLR': 365,
  'BLR-CCU': 1560, 'CCU-BLR': 1560,
  'BLR-PNQ': 720,  'PNQ-BLR': 720,
  'HYD-GOI': 535,  'GOI-HYD': 535,
  'HYD-MAA': 510,  'MAA-HYD': 510,
  'HYD-CCU': 1180, 'CCU-HYD': 1180,
  'CCU-GAU': 500,  'GAU-CCU': 500,
  'AMD-GOI': 865,  'GOI-AMD': 865,
  'AMD-BLR': 1235, 'BLR-AMD': 1235,
  'MAA-COK': 560,  'COK-MAA': 560,
  'MAA-CCU': 1365, 'CCU-MAA': 1365
};

/**
 * Calculates exact real-world flight distance (in km) between any two airport codes
 */
export const calculateDistanceKm = (originCode, destCode) => {
  if (originCode === destCode) return 0;

  const key = `${originCode}-${destCode}`;
  if (AIRWAY_DISTANCES[key]) {
    return AIRWAY_DISTANCES[key];
  }

  const origin = AIRPORTS.find(a => a.code === originCode);
  const dest = AIRPORTS.find(a => a.code === destCode);
  if (!origin || !dest || !origin.lat || !dest.lat) return 850;

  // Great-circle Haversine formula
  const R = 6371; // Earth radius in km
  const dLat = (dest.lat - origin.lat) * (Math.PI / 180);
  const dLon = (dest.lon - origin.lon) * (Math.PI / 180);
  const lat1 = origin.lat * (Math.PI / 180);
  const lat2 = dest.lat * (Math.PI / 180);

  const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(lat1) * Math.cos(lat2) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  // Add 3% buffer for standard commercial airway routing
  return Math.round(R * c * 1.03);
};

export const AIRLINES = [
  { code: '6E', name: 'IndiGo', color: '#0052cc', share: '62.4%', avgFare: 5120 },
  { code: 'AI', name: 'Air India', color: '#b91c1c', share: '18.2%', avgFare: 5850 },
  { code: '9I', name: 'Alliance Air', color: '#7c3aed', share: '5.8%', avgFare: 5450 },
  { code: 'QP', name: 'Akasa Air', color: '#ea580c', share: '5.6%', avgFare: 4980 },
  { code: 'SG', name: 'SpiceJet', color: '#d97706', share: '4.3%', avgFare: 4890 },
  { code: 'IX', name: 'Air India Express', color: '#059669', share: '3.7%', avgFare: 4720 }
];

export const OTAS = ['MakeMyTrip', 'EaseMyTrip', 'Yatra', 'Cleartrip', 'Airline Direct'];

export const KPI_METRICS = {
  currentIndex: 124.8,
  baseIndex: 100.0,
  baseYear: '2026',
  percentageChangeMoM: 3.42,
  percentageChangeYoY: 11.2,
  averageDomesticAirfare: 5480,
  routesMonitored: 168,
  activeSources: 10,
  dailyQuotesScraped: 24500,
  lastUpdated: new Date().toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
};

// 30-day Airfare Price Index & Average Fare movement
export const INDEX_TREND_30_DAYS = [
  { date: 'Day 1', index: 121.2, avgFare: 5280, cpiTransportBase: 115.4 },
  { date: 'Day 3', index: 121.8, avgFare: 5310, cpiTransportBase: 115.5 },
  { date: 'Day 6', index: 122.5, avgFare: 5350, cpiTransportBase: 115.7 },
  { date: 'Day 9', index: 123.1, avgFare: 5390, cpiTransportBase: 115.8 },
  { date: 'Day 12', index: 122.7, avgFare: 5370, cpiTransportBase: 115.9 },
  { date: 'Day 15', index: 124.2, avgFare: 5440, cpiTransportBase: 116.1 },
  { date: 'Day 18', index: 125.8, avgFare: 5530, cpiTransportBase: 116.3 },
  { date: 'Day 21', index: 126.4, avgFare: 5580, cpiTransportBase: 116.5 },
  { date: 'Day 24', index: 125.1, avgFare: 5500, cpiTransportBase: 116.7 },
  { date: 'Day 27', index: 124.3, avgFare: 5460, cpiTransportBase: 116.8 },
  { date: 'Day 30', index: 124.8, avgFare: 5480, cpiTransportBase: 117.0 }
];

// Top High-Density Routes & Average Prices
export const ROUTE_WISE_COMPARISON = [
  { route: 'DEL - BOM', avgFare: 5850, minFare: 4200, maxFare: 9800, volume: 'High', index: 128.4 },
  { route: 'BOM - GOI', avgFare: 4100, minFare: 2800, maxFare: 7200, volume: 'Seasonal', index: 132.6 },
  { route: 'BOM - BLR', avgFare: 4650, minFare: 3400, maxFare: 7600, volume: 'High', index: 119.2 },
  { route: 'DEL - BLR', avgFare: 6200, minFare: 4500, maxFare: 11200, volume: 'High', index: 126.1 },
  { route: 'DEL - CCU', avgFare: 5400, minFare: 3900, maxFare: 8900, volume: 'Medium', index: 122.8 },
  { route: 'BLR - HYD', avgFare: 3850, minFare: 2600, maxFare: 6400, volume: 'Medium', index: 114.5 },
  { route: 'DEL - HYD', avgFare: 5100, minFare: 3700, maxFare: 8500, volume: 'Medium', index: 121.0 },
  { route: 'DEL - PNQ', avgFare: 5750, minFare: 4100, maxFare: 9300, volume: 'Medium', index: 125.3 }
];

// Airline Price Variance Data
export const AIRLINE_COMPARISON_DATA = [
  { airline: 'IndiGo (6E)', avgFare: 5120, onTimeRate: 88.5, loadFactor: 86.2, lowestRoute: 'BLR-HYD (₹2,600)' },
  { airline: 'Air India (AI)', avgFare: 5850, onTimeRate: 79.2, loadFactor: 82.4, lowestRoute: 'BOM-GOI (₹3,100)' },
  { airline: 'Alliance Air (9I)', avgFare: 5450, onTimeRate: 85.2, loadFactor: 83.4, lowestRoute: 'DEL-JAI (₹2,800)' },
  { airline: 'Akasa Air (QP)', avgFare: 4980, onTimeRate: 86.4, loadFactor: 81.0, lowestRoute: 'BOM-BLR (₹3,200)' },
  { airline: 'SpiceJet (SG)', avgFare: 4890, onTimeRate: 72.8, loadFactor: 79.4, lowestRoute: 'DEL-JAI (₹2,400)' },
  { airline: 'AIX Connect (IX)', avgFare: 4720, onTimeRate: 83.2, loadFactor: 84.1, lowestRoute: 'BLR-COK (₹2,500)' }
];

// Live Scraped Feed (Simulated Web Scraper Telemetry)
export const RECENT_PRICE_UPDATES = [
  { id: 'SC-10491', route: 'DEL → BOM', airline: 'IndiGo', flightNo: '6E-2051', price: 5199, ota: 'MakeMyTrip', time: '1 min ago', status: 'Verified' },
  { id: 'SC-10490', route: 'BOM → BLR', airline: 'Akasa Air', flightNo: 'QP-1342', price: 3499, ota: 'EaseMyTrip', time: '3 mins ago', status: 'Live' },
  { id: 'SC-10489', route: 'DEL → BLR', airline: 'Alliance Air', flightNo: '9I-811', price: 5490, ota: 'Airline Direct', time: '4 mins ago', status: 'Verified' },
  { id: 'SC-10488', route: 'BLR → HYD', airline: 'IndiGo', flightNo: '6E-429', price: 2799, ota: 'Cleartrip', time: '6 mins ago', status: 'Live' },
  { id: 'SC-10487', route: 'DEL → CCU', airline: 'Air India', flightNo: 'AI-764', price: 5420, ota: 'Yatra', time: '8 mins ago', status: 'Verified' },
  { id: 'SC-10486', route: 'BOM → GOI', airline: 'SpiceJet', flightNo: 'SG-298', price: 3890, ota: 'MakeMyTrip', time: '11 mins ago', status: 'Cached' },
  { id: 'SC-10485', route: 'DEL → PNQ', airline: 'IndiGo', flightNo: '6E-241', price: 5650, ota: 'EaseMyTrip', time: '14 mins ago', status: 'Verified' },
  { id: 'SC-10484', route: 'AMD → DEL', airline: 'Air India Express', flightNo: 'IX-114', price: 3620, ota: 'Airline Direct', time: '18 mins ago', status: 'Live' }
];

// Scraper Engine Health for SIH Judges presentation
export const SCRAPER_NODES = [
  { portal: 'IndiGo Official Portal', type: 'Direct Portal', status: 'Active', latency: '420ms', successRate: '99.4%', lastScrape: '42s ago' },
  { portal: 'Air India Booking Engine', type: 'Direct Portal', status: 'Active', latency: '610ms', successRate: '98.8%', lastScrape: '1m ago' },
  { portal: 'MakeMyTrip OTA API', type: 'Aggregator', status: 'Active', latency: '350ms', successRate: '99.9%', lastScrape: '18s ago' },
  { portal: 'EaseMyTrip Live Stream', type: 'Aggregator', status: 'Active', latency: '480ms', successRate: '99.2%', lastScrape: '1m ago' },
  { portal: 'Yatra OTA Aggregator', type: 'Aggregator', status: 'Active', latency: '540ms', successRate: '97.9%', lastScrape: '3m ago' },
  { portal: 'Cleartrip Flight Feed', type: 'Aggregator', status: 'Active', latency: '390ms', successRate: '99.5%', lastScrape: '2m ago' }
];

// Price Index vs Official MoSPI CPI 12-Month Series
export const CPI_INDEX_SERIES = [
  { month: 'Oct 2025', airfareIndex: 111.4, officialCpiTransport: 112.1, coreCpi: 108.5 },
  { month: 'Nov 2025 (Diwali Surge)', airfareIndex: 128.6, officialCpiTransport: 113.8, coreCpi: 108.9 },
  { month: 'Dec 2025 (Holidays)', airfareIndex: 134.2, officialCpiTransport: 114.2, coreCpi: 109.3 },
  { month: 'Jan 2026', airfareIndex: 115.8, officialCpiTransport: 114.5, coreCpi: 109.6 },
  { month: 'Feb 2026', airfareIndex: 117.2, officialCpiTransport: 114.8, coreCpi: 109.9 },
  { month: 'Mar 2026', airfareIndex: 119.5, officialCpiTransport: 115.1, coreCpi: 110.2 },
  { month: 'Apr 2026 (Summer Rush)', airfareIndex: 126.3, officialCpiTransport: 115.6, coreCpi: 110.7 },
  { month: 'May 2026 (Peak Vacations)', airfareIndex: 131.0, officialCpiTransport: 116.0, coreCpi: 111.1 },
  { month: 'Jun 2026 (Monsoon Dip)', airfareIndex: 118.9, officialCpiTransport: 116.2, coreCpi: 111.4 },
  { month: 'Jul 2026', airfareIndex: 119.4, officialCpiTransport: 116.4, coreCpi: 111.8 },
  { month: 'Aug 2026', airfareIndex: 122.1, officialCpiTransport: 116.7, coreCpi: 112.2 },
  { month: 'Sep 2026 (Current)', airfareIndex: 124.8, officialCpiTransport: 117.0, coreCpi: 112.5 }
];

// Historical Trends breakdown (Daily, Weekly, Monthly)
export const HISTORICAL_TRENDS = {
  daily: [
    { label: 'Mon', avgFare: 5200, index: 120.4, bookings: 4200 },
    { label: 'Tue', avgFare: 4850, index: 116.8, bookings: 3800 },
    { label: 'Wed', avgFare: 4900, index: 117.2, bookings: 3950 },
    { label: 'Thu', avgFare: 5350, index: 122.1, bookings: 4600 },
    { label: 'Fri', avgFare: 6100, index: 132.5, bookings: 6100 },
    { label: 'Sat', avgFare: 5800, index: 128.0, bookings: 5400 },
    { label: 'Sun', avgFare: 6350, index: 135.2, bookings: 6400 }
  ],
  weekly: [
    { label: 'Wk 1', avgFare: 5250, index: 121.0, variance: '± 8%' },
    { label: 'Wk 2', avgFare: 5380, index: 122.8, variance: '± 11%' },
    { label: 'Wk 3', avgFare: 5600, index: 126.1, variance: '± 14%' },
    { label: 'Wk 4', avgFare: 5480, index: 124.8, variance: '± 10%' },
    { label: 'Wk 5', avgFare: 5410, index: 123.5, variance: '± 9%' },
    { label: 'Wk 6', avgFare: 5590, index: 125.9, variance: '± 12%' },
    { label: 'Wk 7', avgFare: 5750, index: 128.4, variance: '± 15%' },
    { label: 'Wk 8', avgFare: 5480, index: 124.8, variance: '± 10%' }
  ],
  monthly: [
    { label: 'Oct', avgFare: 5050, index: 111.4 },
    { label: 'Nov', avgFare: 5950, index: 128.6 },
    { label: 'Dec', avgFare: 6200, index: 134.2 },
    { label: 'Jan', avgFare: 5250, index: 115.8 },
    { label: 'Feb', avgFare: 5300, index: 117.2 },
    { label: 'Mar', avgFare: 5410, index: 119.5 },
    { label: 'Apr', avgFare: 5720, index: 126.3 },
    { label: 'May', avgFare: 5980, index: 131.0 },
    { label: 'Jun', avgFare: 5350, index: 118.9 },
    { label: 'Jul', avgFare: 5390, index: 119.4 },
    { label: 'Aug', avgFare: 5450, index: 122.1 },
    { label: 'Sep', avgFare: 5480, index: 124.8 }
  ],
  bookingWindow: [
    { window: '0-3 Days (Last Minute)', avgFare: 8400, multiplier: '1.65x' },
    { window: '4-7 Days', avgFare: 6250, multiplier: '1.22x' },
    { window: '8-14 Days', avgFare: 5350, multiplier: '1.05x' },
    { window: '15-30 Days (Optimal)', avgFare: 4800, multiplier: '0.94x' },
    { window: '30+ Days (Early Bird)', avgFare: 4450, multiplier: '0.87x' }
  ]
};

// Helper to compute realistic flight arrival times based on duration
const addMinutesToTime = (timeStr, minsToAdd) => {
  const [timePart, ampm] = timeStr.split(' ');
  let [hours, minutes] = timePart.split(':').map(Number);
  if (ampm === 'PM' && hours < 12) hours += 12;
  if (ampm === 'AM' && hours === 12) hours = 0;
  const totalMins = ((hours * 60 + minutes + minsToAdd) % 1440 + 1440) % 1440;
  const newH = Math.floor(totalMins / 60);
  const newM = totalMins % 60;
  const newAmpm = newH >= 12 ? 'PM' : 'AM';
  const displayH = newH % 12 || 12;
  return `${String(displayH).padStart(2, '0')}:${String(newM).padStart(2, '0')} ${newAmpm}`;
};

// Detailed Route Simulator
export const getRouteAnalysis = (originCode, destCode, travelDate = '2026-09-15') => {
  const origin = AIRPORTS.find(a => a.code === originCode) || AIRPORTS[0];
  const dest = AIRPORTS.find(a => a.code === destCode) || AIRPORTS[1];

  // Accurate real-world airway flight distance (in km)
  const distanceKm = calculateDistanceKm(origin.code, dest.code);

  // Deterministic seed based on route codes
  const charCodeSum = (origin.code.charCodeAt(0) + dest.code.charCodeAt(0)) % 10;

  // Realistic commercial jet flight duration (cruise ~720 km/h + taxi/approach buffer)
  const flightMins = Math.max(35, Math.round(30 + (distanceKm / 720) * 60));
  const durHours = Math.floor(flightMins / 60);
  const durMins = flightMins % 60;
  const duration = durHours > 0 ? `${durHours}h ${String(durMins).padStart(2, '0')}m` : `${durMins}m`;

  // Canonical or distance-scaled pricing
  const topCorridor = ROUTE_WISE_COMPARISON.find(
    r => (r.route === `${origin.code} - ${dest.code}` || r.route === `${dest.code} - ${origin.code}`)
  );

  const minFare = topCorridor
    ? topCorridor.minFare
    : Math.max(2200, Math.round(1600 + distanceKm * 2.2));
  const avgFare = topCorridor
    ? topCorridor.avgFare
    : Math.max(3400, Math.round(2500 + distanceKm * 3.1));
  const maxFare = topCorridor
    ? topCorridor.maxFare
    : Math.max(5800, Math.round(avgFare * 1.7));

  const airlinesData = [
    {
      airline: 'IndiGo',
      flightNo: `6E-${200 + charCodeSum * 12}`,
      departure: '06:15 AM',
      arrival: addMinutesToTime('06:15 AM', flightMins),
      duration,
      direct: true,
      price: Math.round(minFare * 1.05),
      otaPrices: { MakeMyTrip: Math.round(minFare * 1.05), EaseMyTrip: Math.round(minFare * 1.02), Direct: Math.round(minFare * 1.07) },
      seatsLeft: 7,
      status: 'On-Schedule'
    },
    {
      airline: 'Akasa Air',
      flightNo: `QP-${110 + charCodeSum * 8}`,
      departure: '09:40 AM',
      arrival: addMinutesToTime('09:40 AM', flightMins),
      duration,
      direct: true,
      price: minFare,
      otaPrices: { MakeMyTrip: minFare + 50, EaseMyTrip: minFare, Direct: minFare + 80 },
      seatsLeft: 4,
      status: 'Cheapest Direct'
    },
    {
      airline: 'Air India',
      flightNo: `AI-${500 + charCodeSum * 15}`,
      departure: '02:30 PM',
      arrival: addMinutesToTime('02:30 PM', flightMins),
      duration,
      direct: true,
      price: Math.round(avgFare * 1.08),
      otaPrices: { MakeMyTrip: Math.round(avgFare * 1.08), EaseMyTrip: Math.round(avgFare * 1.06), Direct: Math.round(avgFare * 1.05) },
      seatsLeft: 12,
      status: 'Full Service'
    },
    {
      airline: 'Alliance Air',
      flightNo: `9I-${800 + charCodeSum * 7}`,
      departure: '06:45 PM',
      arrival: addMinutesToTime('06:45 PM', flightMins),
      duration,
      direct: true,
      price: Math.round(avgFare * 0.96),
      otaPrices: { MakeMyTrip: Math.round(avgFare * 0.98), EaseMyTrip: Math.round(avgFare * 0.95), Direct: Math.round(avgFare * 0.96) },
      seatsLeft: 9,
      status: 'Regional Prime'
    },
    {
      airline: 'SpiceJet',
      flightNo: `SG-${340 + charCodeSum * 9}`,
      departure: '08:20 PM',
      arrival: addMinutesToTime('08:20 PM', flightMins),
      duration,
      direct: true,
      price: Math.round(minFare * 1.08),
      otaPrices: { MakeMyTrip: Math.round(minFare * 1.09), EaseMyTrip: Math.round(minFare * 1.07), Direct: Math.round(minFare * 1.08) },
      seatsLeft: 5,
      status: 'Standard'
    }
  ];

  const historical14Days = [
    { day: '-14d', fare: Math.round(avgFare * 0.88), otaMin: Math.round(minFare * 0.85) },
    { day: '-12d', fare: Math.round(avgFare * 0.90), otaMin: Math.round(minFare * 0.88) },
    { day: '-10d', fare: Math.round(avgFare * 0.91), otaMin: Math.round(minFare * 0.89) },
    { day: '-8d', fare: Math.round(avgFare * 0.95), otaMin: Math.round(minFare * 0.93) },
    { day: '-6d', fare: Math.round(avgFare * 0.98), otaMin: Math.round(minFare * 0.96) },
    { day: '-4d', fare: Math.round(avgFare * 1.03), otaMin: Math.round(minFare * 1.01) },
    { day: '-2d', fare: Math.round(avgFare * 1.09), otaMin: Math.round(minFare * 1.06) },
    { day: 'Today', fare: avgFare, otaMin: minFare }
  ];

  return {
    origin,
    dest,
    travelDate,
    distanceKm,
    minFare,
    maxFare,
    avgFare,
    cheapestCarrier: 'Akasa Air',
    airlinesAvailable: ['IndiGo', 'Akasa Air', 'Air India', 'Alliance Air', 'SpiceJet'],
    flights: airlinesData,
    historicalTrend: historical14Days
  };
};

// Team Members (Smart India Hackathon Team)
export const TEAM_MEMBERS = [
  {
    name: 'Team Leader',
    role: 'Full Stack & Data Engineering Lead',
    college: 'Smart India Hackathon 2026',
    bio: 'Oversees architecture, data scraping pipeline, and Laspeyres price indexing implementation.'
  },
  {
    name: 'Frontend Engineer',
    role: 'UI/UX & Analytics Dashboard Developer',
    college: 'Smart India Hackathon 2026',
    bio: 'Specializes in responsive React dashboards, Recharts data visualization, and accessibility.'
  },
  {
    name: 'Web Scraping Specialist',
    role: 'Automated Crawling & Anti-Bot Engineer',
    college: 'Smart India Hackathon 2026',
    bio: 'Designs distributed headless crawlers for airline booking portals and OTA aggregators.'
  },
  {
    name: 'Data Scientist & Econometrician',
    role: 'CPI Augmentation & Index Modeling',
    college: 'Smart India Hackathon 2026',
    bio: 'Formulates consumer price index weightage models following MoSPI statistical standards.'
  },
  {
    name: 'Backend & Cloud Architect',
    role: 'API Integration & Pipeline Reliability',
    college: 'Smart India Hackathon 2026',
    bio: 'Builds fault-tolerant caching, ETL pipelines, and high-concurrency REST APIs.'
  },
  {
    name: 'Quality Assurance & Research',
    role: 'Statistical Verification & Documentation',
    college: 'Smart India Hackathon 2026',
    bio: 'Verifies price anomaly detection, outlier filtering, and SIH pitch documentation.'
  }
];
