// src/App.jsx
// Main Application Component with React Router DOM navigation and Layout architecture

import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Pages
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import RouteAnalysis from './pages/RouteAnalysis';
import About from './pages/About';

/**
 * Layout Wrapper
 * Renders Navbar, full-width main content area, and Footer.
 */
const AppLayout = () => {
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  return (
    <div className="app-layout">
      {/* Top Navbar */}
      <Navbar />

      {/* Main Body Area */}
      <div className="main-body">
        {/* Dynamic Route Content */}
        <main className="main-content" style={isHomePage ? { padding: 0, maxWidth: '100%' } : {}}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/route-analysis" element={<RouteAnalysis />} />
            <Route path="/about" element={<About />} />
            {/* Fallback to Home */}
            <Route path="*" element={<Home />} />
          </Routes>
        </main>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

function App() {
  return (
    <Router>
      <AppLayout />
    </Router>
  );
}

export default App;
