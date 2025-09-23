import React, { useState } from 'react';
import VendorLayout from './VendorLayout';
import './Dashboard.css';

const Dashboard = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const dashboardStats = [
    {
      id: 1,
      title: 'Total Bookings',
      value: '1,234',
      change: '+12.3% from last month',
      changeType: 'positive',
      icon: '📅',
      color: 'blue'
    },
    {
      id: 2,
      title: 'Monthly Revenue',
      value: '$45,678',
      change: '+8.7% from last month',
      changeType: 'positive',
      icon: '💵',
      color: 'green'
    },
    {
      id: 3,
      title: 'Active Listings',
      value: '24',
      change: '+2 from last month',
      changeType: 'positive',
      icon: '🏨',
      color: 'orange'
    },
    {
      id: 4,
      title: 'Occupancy Rate',
      value: '87.5%',
      change: '+5.2% from last month',
      changeType: 'positive',
      icon: '📈',
      color: 'purple'
    }
  ];

  const recentBookings = [
    {
      id: 'BK001',
      guest: 'John Doe',
      property: 'Sunset Villa',
      dates: '2024-01-15 - 2024-01-18',
      amount: '$450',
      status: 'confirmed'
    },
    {
      id: 'BK002',
      guest: 'Sarah Wilson',
      property: 'Ocean View Suite',
      dates: '2024-01-20 - 2024-01-25',
      amount: '$875',
      status: 'pending'
    },
    {
      id: 'BK003',
      guest: 'Mike Johnson',
      property: 'Mountain Retreat',
      dates: '2024-01-12 - 2024-01-15',
      amount: '$320',
      status: 'completed'
    }
  ];

  const recentActivity = [
    {
      id: 1,
      type: 'booking',
      message: 'New booking received for Ocean View Suite',
      time: '2 minutes ago',
      icon: '📅'
    },
    {
      id: 2,
      type: 'payment',
      message: 'Payment of $450 received from John Doe',
      time: '1 hour ago',
      icon: '💵'
    },
    {
      id: 3,
      type: 'review',
      message: 'New 5-star review for Sunset Villa',
      time: '3 hours ago',
      icon: '👤'
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'confirmed':
        return '#10b981';
      case 'pending':
        return '#f59e0b';
      case 'completed':
        return '#6b7280';
      default:
        return '#6b7280';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'confirmed':
        return '✓ confirmed';
      case 'pending':
        return '⏳ pending';
      case 'completed':
        return '✓ completed';
      default:
        return status;
    }
  };

  return (
    <VendorLayout>
      <div className="dashboard">
        {/* Header */}
        <div className="dashboard-header">
          <h1 className="dashboard-title">Dashboard</h1>
          <div className="dashboard-search">
            <input
              type="text"
              placeholder="Search properties, bookings..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
            />
            <div className="notification-icon">
              🔔
            </div>
          </div>
        </div>

      {/* Stats Cards */}
      <div className="stats-grid">
        {dashboardStats.map((stat) => (
          <div key={stat.id} className={`stat-card ${stat.color}`}>
            <div className="stat-header">
              <span className="stat-title">{stat.title}</span>
              <span className="stat-icon">{stat.icon}</span>
            </div>
            <div className="stat-value">{stat.value}</div>
            <div className={`stat-change ${stat.changeType}`}>
              {stat.change}
            </div>
          </div>
        ))}
      </div>

      {/* Main Content */}
      <div className="dashboard-content">
        {/* Recent Bookings */}
        <div className="content-section">
          <div className="section-header">
            <h2 className="section-title">Recent Bookings</h2>
            <button className="view-all-btn">
              👁️ View All
            </button>
          </div>
          
          <div className="bookings-list">
            {recentBookings.map((booking) => (
              <div key={booking.id} className="booking-item">
                <div className="booking-info">
                  <div className="guest-info">
                    <span className="guest-name">{booking.guest}</span>
                    <span 
                      className="booking-status"
                      style={{ 
                        backgroundColor: getStatusColor(booking.status),
                        color: 'white'
                      }}
                    >
                      {getStatusText(booking.status)}
                    </span>
                  </div>
                  <div className="property-name">{booking.property}</div>
                  <div className="booking-dates">{booking.dates}</div>
                </div>
                <div className="booking-amount">
                  <div className="amount">{booking.amount}</div>
                  <div className="booking-id">#{booking.id}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="activity-section">
          <h2 className="section-title">Recent Activity</h2>
          
          <div className="activity-list">
            {recentActivity.map((activity) => (
              <div key={activity.id} className="activity-item">
                <div className="activity-icon">{activity.icon}</div>
                <div className="activity-content">
                  <div className="activity-message">{activity.message}</div>
                  <div className="activity-time">{activity.time}</div>
                </div>
              </div>
            ))}
          </div>
          
          <button className="view-all-notifications">
            View All Notifications
          </button>
        </div>
      </div>
    </div>
    </VendorLayout>
  );
};

export default Dashboard;