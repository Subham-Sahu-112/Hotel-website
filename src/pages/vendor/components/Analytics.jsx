import React from 'react';
import VendorLayout from './VendorLayout';

const Analytics = () => {
  const analyticsData = {
    revenue: {
      thisMonth: 45678,
      lastMonth: 42130,
      growth: 8.4
    },
    bookings: {
      thisMonth: 156,
      lastMonth: 142,
      growth: 9.9
    },
    occupancy: {
      current: 87.5,
      target: 85,
      status: 'above'
    }
  };

  const monthlyData = [
    { month: 'Jan', revenue: 32000, bookings: 120 },
    { month: 'Feb', revenue: 35000, bookings: 135 },
    { month: 'Mar', revenue: 42000, bookings: 142 },
    { month: 'Apr', revenue: 38000, bookings: 128 },
    { month: 'May', revenue: 45000, bookings: 156 },
    { month: 'Jun', revenue: 48000, bookings: 168 }
  ];

  return (
    <VendorLayout>
      <div style={{ padding: '0' }}>
        <div style={{ marginBottom: '32px' }}>
          <h1 style={{ fontSize: '2rem', fontWeight: '600', color: '#1f2937', margin: '0 0 8px 0' }}>
            Analytics & Reports
          </h1>
          <p style={{ color: '#6b7280', margin: '0', fontSize: '14px' }}>
            Track your business performance and insights
          </p>
        </div>

        {/* Key Metrics */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
          gap: '16px', 
          marginBottom: '32px' 
        }}>
          <div style={{ 
            background: 'white', 
            padding: '24px', 
            borderRadius: '12px', 
            boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)' 
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <div style={{ fontSize: '24px', marginBottom: '8px' }}>💰</div>
                <div style={{ fontSize: '1.75rem', fontWeight: '700', color: '#1f2937', marginBottom: '4px' }}>
                  ${analyticsData.revenue.thisMonth.toLocaleString()}
                </div>
                <div style={{ fontSize: '13px', color: '#6b7280' }}>Monthly Revenue</div>
              </div>
              <div style={{ 
                background: '#d1fae5', 
                color: '#065f46', 
                padding: '4px 8px', 
                borderRadius: '12px', 
                fontSize: '12px', 
                fontWeight: '500' 
              }}>
                +{analyticsData.revenue.growth}%
              </div>
            </div>
          </div>

          <div style={{ 
            background: 'white', 
            padding: '24px', 
            borderRadius: '12px', 
            boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)' 
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <div style={{ fontSize: '24px', marginBottom: '8px' }}>📅</div>
                <div style={{ fontSize: '1.75rem', fontWeight: '700', color: '#1f2937', marginBottom: '4px' }}>
                  {analyticsData.bookings.thisMonth}
                </div>
                <div style={{ fontSize: '13px', color: '#6b7280' }}>Total Bookings</div>
              </div>
              <div style={{ 
                background: '#d1fae5', 
                color: '#065f46', 
                padding: '4px 8px', 
                borderRadius: '12px', 
                fontSize: '12px', 
                fontWeight: '500' 
              }}>
                +{analyticsData.bookings.growth}%
              </div>
            </div>
          </div>

          <div style={{ 
            background: 'white', 
            padding: '24px', 
            borderRadius: '12px', 
            boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)' 
          }}>
            <div>
              <div style={{ fontSize: '24px', marginBottom: '8px' }}>📊</div>
              <div style={{ fontSize: '1.75rem', fontWeight: '700', color: '#1f2937', marginBottom: '4px' }}>
                {analyticsData.occupancy.current}%
              </div>
              <div style={{ fontSize: '13px', color: '#6b7280' }}>Occupancy Rate</div>
              <div style={{ 
                marginTop: '8px', 
                fontSize: '12px', 
                color: analyticsData.occupancy.status === 'above' ? '#065f46' : '#dc2626' 
              }}>
                Target: {analyticsData.occupancy.target}%
              </div>
            </div>
          </div>
        </div>

        {/* Charts Section */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', 
          gap: '24px', 
          marginBottom: '32px' 
        }}>
          {/* Revenue Chart */}
          <div style={{ 
            background: 'white', 
            padding: '24px', 
            borderRadius: '12px', 
            boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)' 
          }}>
            <h3 style={{ margin: '0 0 20px 0', color: '#1f2937' }}>Monthly Revenue Trend</h3>
            <div style={{ height: '200px', display: 'flex', alignItems: 'end', gap: '12px', padding: '20px 0' }}>
              {monthlyData.map((data, index) => (
                <div key={index} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <div 
                    style={{ 
                      width: '100%', 
                      background: '#3b82f6', 
                      borderRadius: '4px 4px 0 0',
                      height: `${(data.revenue / 50000) * 150}px`,
                      marginBottom: '8px',
                      transition: 'all 0.3s ease'
                    }}
                  ></div>
                  <div style={{ fontSize: '12px', color: '#6b7280' }}>{data.month}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Bookings Chart */}
          <div style={{ 
            background: 'white', 
            padding: '24px', 
            borderRadius: '12px', 
            boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)' 
          }}>
            <h3 style={{ margin: '0 0 20px 0', color: '#1f2937' }}>Monthly Bookings</h3>
            <div style={{ height: '200px', display: 'flex', alignItems: 'end', gap: '12px', padding: '20px 0' }}>
              {monthlyData.map((data, index) => (
                <div key={index} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <div 
                    style={{ 
                      width: '100%', 
                      background: '#10b981', 
                      borderRadius: '4px 4px 0 0',
                      height: `${(data.bookings / 200) * 150}px`,
                      marginBottom: '8px',
                      transition: 'all 0.3s ease'
                    }}
                  ></div>
                  <div style={{ fontSize: '12px', color: '#6b7280' }}>{data.month}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Property Performance */}
        <div style={{ 
          background: 'white', 
          padding: '24px', 
          borderRadius: '12px', 
          boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)' 
        }}>
          <h3 style={{ margin: '0 0 20px 0', color: '#1f2937' }}>Property Performance</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
            {[
              { name: 'Sunset Villa Resort', occupancy: 92, revenue: 18500 },
              { name: 'Ocean View Hotel', occupancy: 85, revenue: 15200 },
              { name: 'Mountain Lodge', occupancy: 78, revenue: 8900 },
              { name: 'City Center Suites', occupancy: 88, revenue: 13600 }
            ].map((property, index) => (
              <div key={index} style={{ 
                padding: '16px', 
                border: '1px solid #e5e7eb', 
                borderRadius: '8px' 
              }}>
                <h4 style={{ margin: '0 0 12px 0', fontSize: '14px', color: '#1f2937' }}>
                  {property.name}
                </h4>
                <div style={{ marginBottom: '8px' }}>
                  <div style={{ fontSize: '12px', color: '#6b7280', marginBottom: '4px' }}>
                    Occupancy: {property.occupancy}%
                  </div>
                  <div style={{ 
                    width: '100%', 
                    height: '6px', 
                    background: '#f3f4f6', 
                    borderRadius: '3px',
                    overflow: 'hidden'
                  }}>
                    <div style={{ 
                      width: `${property.occupancy}%`, 
                      height: '100%', 
                      background: '#3b82f6',
                      transition: 'width 0.3s ease'
                    }}></div>
                  </div>
                </div>
                <div style={{ fontSize: '14px', fontWeight: '600', color: '#1f2937' }}>
                  ${property.revenue.toLocaleString()}
                </div>
                <div style={{ fontSize: '12px', color: '#6b7280' }}>Monthly Revenue</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </VendorLayout>
  );
};

export default Analytics;