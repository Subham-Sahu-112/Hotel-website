import React, { useState, useEffect } from 'react';
import './Dashboard.css';
import Sidebar from './components/Sidebar';
import StatsCards from './components/StatsCards';
import RevenueChart from './components/RevenueChart';
import BookingsChart from './components/BookingsChart';
import SearchBar from './components/SearchBar';

export default function Dashboard() {
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