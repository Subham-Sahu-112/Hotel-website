import { useState, useEffect, useRef } from "react";
import { Car, Castle, ChevronDown } from "lucide-react";

import "./Navbar.css";

export default function Navbar() {
  const [isMobile] = useState(window.innerWidth <= 768);
  const [clickVal, setClickVal] = useState(false);
  const [activeTab, setActiveTab] = useState("Stays");
  const dropdownRef = useRef(null);

  const navigationTabs = [
    { name: "Stays", icon: <Castle size={30} /> },
    { name: "Car rental", icon: <Car size={30} /> },
  ];

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setClickVal(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <nav id="navbar">
      <div className="nav-container">
        {/* Logo */}
        <div className="nav-logo">
          <span className="nav-logo-text">Booking.com</span>
        </div>

        {/* Right side actions */}
        <div className="nav-actions">
          <div className="nav-links">
            <a href="#" className="nav-link-item">
              List your property
            </a>
            <div ref={dropdownRef} className="register-dropdown-container">
              <button
                className="register-btn"
                onClick={() => setClickVal(!clickVal)}
              >
                <p>Register</p>
                <span
                  className="down"
                  style={{ transform: clickVal ? "rotate(180deg)" : "" }}
                >
                  <ChevronDown size={isMobile ? 15 : 33} />
                </span>
              </button>
              {clickVal && (
                <div className="reg-dropdown-menu">
                  <a href="/vender-register" className="reg-dropdown-item">
                    Vender Register
                  </a>
                  <a href="/customer-register" className="reg-dropdown-item">
                    Customer Register
                  </a>
                </div>
              )}
            </div>
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
              className={`nav-tab ${activeTab === tab.name ? "active" : ""}`}
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
