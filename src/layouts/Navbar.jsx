import { useState } from 'react';
import { Car, Castle } from 'lucide-react';

import './Navbar.css';

export default function Navbar() {
  const [activeTab, setActiveTab] = useState('Stays');

  const navigationTabs = [
    { name: 'Stays', icon: <Castle size={30} /> },
    { name: 'Car rental', icon: <Car size={30} /> },
  ];

  return (
    <nav id="navbar">
      <div className="nav-container">
        {/* Logo */}
        <div className="logo">
          <span className="logo-text">Booking.com</span>
        </div>

        {/* Right side actions */}
        <div className="nav-actions">
          <div className="nav-links">
            <a href="#" className="nav-link-item">List your property</a>
            <button className="register-btn">Register</button>
            <button className="sign-in-btn">Sign in</button>
          </div>
        </div>
      </div>
      
      {/* Navigation Tabs */}
      <div className="nav-tabs">
        <div className="tabs-container">
          {navigationTabs.map((tab) => (
            <button
              key={tab.name}
              className={`nav-tab ${activeTab === tab.name ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.name)}
            >
              <span className="tab-icon">{tab.icon}</span>
              <span className="tab-text">{tab.name}</span>
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
}
