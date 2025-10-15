import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import './VendorSidebar.css';
import { toast } from 'react-toastify';

const VendorSidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const menuItems = [
    {
      icon: '📊',
      label: 'Dashboard',
      path: '/vender/dashboard'
    },
    {
      icon: '🏨',
      label: 'Properties',
      path: '/vender/properties'
    },
    {
      icon: '📅',
      label: 'Bookings',
      path: '/vender/bookings'
    },
    {
      icon: '💰',
      label: 'Pricing',
      path: '/vender/pricing'
    },
    {
      icon: '💳',
      label: 'Payments',
      path: '/vender/payments'
    },
    {
      icon: '⭐',
      label: 'Reviews',
      path: '/vender/reviews'
    },
    {
      icon: '📈',
      label: 'Analytics',
      path: '/vender/analytics'
    },
    {
      icon: '⚙️',
      label: 'Settings',
      path: '/vender/settings'
    }
  ];

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('userType');
    navigate('/login');
    toast.success('Logged out successfully');
  }

  return (
    <>
      {/* Mobile Menu Toggle */}
      <button 
        className="sidebar-toggle"
        onClick={toggleSidebar}
        aria-label="Toggle sidebar"
      >
        ☰
      </button>

      {/* Sidebar */}
      <div className={`vendor-sidebar ${isSidebarOpen ? 'sidebar-open' : ''}`}>
        {/* Header */}
        <div className="sidebar-header">
          <div className="logo-container">
            <div className="logo-icon">🏨</div>
            <h2 className="logo-text">HotelHub</h2>
          </div>
        </div>

        {/* Main Menu */}
        <div className="sidebar-content">
          <div className="menu-section">
            <h3 className="menu-title">Main Menu</h3>
            <nav className="sidebar-nav">
              {menuItems.map((item, index) => (
                <Link
                  key={index}
                  to={item.path}
                  className={`nav-item ${location.pathname === item.path ? 'active' : ''}`}
                  onClick={() => setIsSidebarOpen(false)}
                >
                  <span className="nav-icon">{item.icon}</span>
                  <span className="nav-label">{item.label}</span>
                </Link>
              ))}
            </nav>
          </div>
        </div>

        {/* User Profile */}
        <div className="sidebar-footer">
          <div className="user-profile">
            <div className="user-avatar">
              <span>👤</span>
            </div>
            <div className="user-info">
              <div className="user-name">Hotel Manager</div>
              <div className="user-email">vendor@hotel.com</div>
            </div>
          </div>
          <button className="ven-logout-btn" onClick={handleLogout}>Logout</button>
        </div>

        {/* Close button for mobile */}
        <button 
          className="sidebar-close"
          onClick={toggleSidebar}
          aria-label="Close sidebar"
        >
          ✕
        </button>
      </div>

      {/* Overlay for mobile */}
      {isSidebarOpen && (
        <div 
          className="sidebar-overlay"
          onClick={toggleSidebar}
        ></div>
      )}
    </>
  );
};

export default VendorSidebar;