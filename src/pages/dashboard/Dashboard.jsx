import React, { useState, useEffect } from 'react';
import './Dashboard.css';
import Sidebar from './components/Sidebar';
import StatsCards from './components/StatsCards';
import RevenueChart from './components/RevenueChart';
import BookingsChart from './components/BookingsChart';
import SearchBar from './components/SearchBar';
import Loading from '../../components/Loading/Loading';

export default function Dashboard() {
  const [isPageLoading, setIsPageLoading] = useState(true);
  const [isDataLoading, setIsDataLoading] = useState(false);

  useEffect(() => {
    // Simulate page load time
    const timer = setTimeout(() => {
      setIsPageLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  if (isPageLoading) {
    return <Loading type="page" color="#ffd700" message="Loading Dashboard..." />;
  }
  return (
    <div className="dashboard">
      <Sidebar />
      <div className="dashboard-main">
        <div className="dashboard-header">
          <SearchBar />
          <div className="header-actions">
            <div className="notification-icon">
              <span className="notification-dot"></span>
            </div>
            <div className="user-avatar">AD</div>
          </div>
        </div>
        
        <div className="dashboard-content">
          <div className="dashboard-title">
            <h1>Dashboard</h1>
            <p>Welcome back! Here's what's happening with your hotel booking platform.</p>
          </div>
          
          <StatsCards />
          
          <div className="dashboard-charts">
            <RevenueChart />
            <BookingsChart />
          </div>
        </div>
      </div>
    </div>
  );
}