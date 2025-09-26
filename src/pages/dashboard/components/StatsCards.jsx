import React from 'react';
import './StatsCards.css';

export default function StatsCards() {
  const stats = [
    {
      title: 'Total Suppliers',
      value: '107',
      subtitle: '5 pending approval',
      change: '+12%',
      changeType: 'positive',
      icon: '👥'
    },
    {
      title: 'Active Listings',
      value: '1,234',
      subtitle: '89 new this month',
      change: '+8%',
      changeType: 'positive',
      icon: '📋'
    },
    {
      title: 'Monthly Revenue',
      value: '$67,890',
      subtitle: 'from 180 bookings',
      change: '+15%',
      changeType: 'positive',
      icon: '💰'
    },
    {
      title: 'Occupancy Rate',
      value: '78%',
      subtitle: 'across all properties',
      change: '+3%',
      changeType: 'positive',
      icon: '📈'
    }
  ];

  return (
    <div className="stats-cards">
      {stats.map((stat, index) => (
        <div key={index} className="stat-card">
          <div className="stat-header">
            <div className="stat-info">
              <h3 className="stat-title">{stat.title}</h3>
              <div className="stat-icon">{stat.icon}</div>
            </div>
          </div>
          <div className="stat-value">{stat.value}</div>
          <div className="stat-footer">
            <span className="stat-subtitle">{stat.subtitle}</span>
            <span className={`stat-change ${stat.changeType}`}>
              {stat.change}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}