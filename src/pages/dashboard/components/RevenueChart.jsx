import React from 'react';
import './RevenueChart.css';

export default function RevenueChart() {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
  const revenueData = [45000, 52000, 48000, 61000, 55000, 68000];
  const maxRevenue = Math.max(...revenueData);
  
  return (
    <div className="chart-container">
      <div className="chart-header">
        <h3>Revenue Overview</h3>
      </div>
      <div className="chart">
        <div className="chart-y-axis">
          <span>80000</span>
          <span>60000</span>
          <span>40000</span>
          <span>20000</span>
          <span>0</span>
        </div>
        <div className="chart-area">
          <svg className="line-chart" viewBox="0 0 400 200">
            <defs>
              <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.1"/>
                <stop offset="100%" stopColor="#3B82F6" stopOpacity="0"/>
              </linearGradient>
            </defs>
            
            {/* Chart line */}
            <polyline
              fill="none"
              stroke="#3B82F6"
              strokeWidth="3"
              points={revenueData.map((value, index) => 
                `${(index * 80) + 40},${200 - (value / maxRevenue * 160)}`
              ).join(' ')}
            />
            
            {/* Data points */}
            {revenueData.map((value, index) => (
              <circle
                key={index}
                cx={(index * 80) + 40}
                cy={200 - (value / maxRevenue * 160)}
                r="4"
                fill="#3B82F6"
              />
            ))}
            
            {/* Fill area under line */}
            <polygon
              fill="url(#gradient)"
              points={`40,200 ${revenueData.map((value, index) => 
                `${(index * 80) + 40},${200 - (value / maxRevenue * 160)}`
              ).join(' ')} 440,200`}
            />
          </svg>
          
          <div className="chart-x-axis">
            {months.map((month, index) => (
              <span key={index} className="x-axis-label">{month}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}