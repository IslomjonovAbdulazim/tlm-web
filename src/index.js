import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import App from './App';
import Mockup from './Mockup';

function Navigation() {
  const navStyle = {
    position: 'fixed',
    top: '10px',
    left: '10px',
    zIndex: 1000,
    display: 'flex',
    gap: '10px'
  };

  const linkStyle = {
    padding: '10px 20px',
    background: 'rgba(255,255,255,0.9)',
    textDecoration: 'none',
    color: '#333',
    borderRadius: '5px',
    fontWeight: 'bold',
    boxShadow: '0 2px 10px rgba(0,0,0,0.2)'
  };

  return (
    <nav style={navStyle}>
      <Link to="/" style={linkStyle}>3D Viewer</Link>
      <Link to="/mockup" style={linkStyle}>Lift Mockup</Link>
    </nav>
  );
}

function AppRouter() {
  return (
    <Router>
      <Navigation />
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/mockup" element={<Mockup />} />
      </Routes>
    </Router>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<AppRouter />);