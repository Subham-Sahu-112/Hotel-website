import React from 'react';
import './BookingsChart.css';

export default function BookingsChart() {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
  const bookingsData = [115, 140, 132, 168, 150, 182];
  const maxBookings = Math.max(...bookingsData);
  
  return (
    <div className="chart-container">
      <div className="chart-header">
        <h3>Monthly Bookings</h3>
      </div>
      <div className="chart">
        <div className="chart-y-axis">
          <span>180</span>
          <span>135</span>
          <span>90</span>
          <span>45</span>
          <span>0</span>
        </div>
        <div className="chart-area">
          <div className="bar-chart">
            {bookingsData.map((value, index) => (
              <div key={index} className="bar-container">
                <div 
                  className="bar"
                  style={{
                    height: `${(value / maxBookings) * 100}%`,
                    backgroundColor: '#10B981'
                  }}
                ></div>
                <span className="bar-label">{months[index]}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}