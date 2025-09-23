import React, { useState } from 'react';
import VendorLayout from './VendorLayout';

const Payments = () => {
  const [transactions] = useState([
    {
      id: 'TXN001',
      booking: 'BK001',
      guest: 'John Doe',
      amount: 1350,
      method: 'Credit Card',
      status: 'completed',
      date: '2024-01-15',
      type: 'payment'
    },
    {
      id: 'TXN002',
      booking: 'BK002',
      guest: 'Sarah Johnson',
      amount: 1600,
      method: 'Bank Transfer',
      status: 'pending',
      date: '2024-01-18',
      type: 'payment'
    },
    {
      id: 'TXN003',
      booking: 'BK004',
      guest: 'Emily Davis',
      amount: 760,
      method: 'Credit Card',
      status: 'refunded',
      date: '2024-01-20',
      type: 'refund'
    }
  ]);

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return '#10b981';
      case 'pending': return '#f59e0b';
      case 'refunded': return '#6b7280';
      default: return '#ef4444';
    }
  };

  const totalRevenue = transactions
    .filter(t => t.status === 'completed' && t.type === 'payment')
    .reduce((sum, t) => sum + t.amount, 0);

  return (
    <VendorLayout>
      <div style={{ padding: '0' }}>
        <div style={{ marginBottom: '32px' }}>
          <h1 style={{ fontSize: '2rem', fontWeight: '600', color: '#1f2937', margin: '0 0 8px 0' }}>
            Payments & Transactions
          </h1>
          <p style={{ color: '#6b7280', margin: '0', fontSize: '14px' }}>
            Manage your payments, transactions, and financial records
          </p>
        </div>

        {/* Stats Cards */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
          gap: '16px', 
          marginBottom: '32px' 
        }}>
          <div style={{ 
            background: 'white', 
            padding: '20px', 
            borderRadius: '12px', 
            boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)' 
          }}>
            <div style={{ fontSize: '24px', marginBottom: '8px' }}>💰</div>
            <div style={{ fontSize: '1.5rem', fontWeight: '700', color: '#1f2937' }}>
              ${totalRevenue.toLocaleString()}
            </div>
            <div style={{ fontSize: '13px', color: '#6b7280' }}>Total Revenue</div>
          </div>
          <div style={{ 
            background: 'white', 
            padding: '20px', 
            borderRadius: '12px', 
            boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)' 
          }}>
            <div style={{ fontSize: '24px', marginBottom: '8px' }}>📊</div>
            <div style={{ fontSize: '1.5rem', fontWeight: '700', color: '#1f2937' }}>
              {transactions.length}
            </div>
            <div style={{ fontSize: '13px', color: '#6b7280' }}>Total Transactions</div>
          </div>
          <div style={{ 
            background: 'white', 
            padding: '20px', 
            borderRadius: '12px', 
            boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)' 
          }}>
            <div style={{ fontSize: '24px', marginBottom: '8px' }}>⏳</div>
            <div style={{ fontSize: '1.5rem', fontWeight: '700', color: '#1f2937' }}>
              {transactions.filter(t => t.status === 'pending').length}
            </div>
            <div style={{ fontSize: '13px', color: '#6b7280' }}>Pending Payments</div>
          </div>
        </div>

        {/* Transactions Table */}
        <div style={{ 
          background: 'white', 
          borderRadius: '12px', 
          overflow: 'hidden', 
          boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)' 
        }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ background: '#f9fafb' }}>
                <th style={{ padding: '16px 12px', textAlign: 'left', fontWeight: '600', color: '#374151' }}>
                  Transaction ID
                </th>
                <th style={{ padding: '16px 12px', textAlign: 'left', fontWeight: '600', color: '#374151' }}>
                  Booking
                </th>
                <th style={{ padding: '16px 12px', textAlign: 'left', fontWeight: '600', color: '#374151' }}>
                  Guest
                </th>
                <th style={{ padding: '16px 12px', textAlign: 'left', fontWeight: '600', color: '#374151' }}>
                  Amount
                </th>
                <th style={{ padding: '16px 12px', textAlign: 'left', fontWeight: '600', color: '#374151' }}>
                  Method
                </th>
                <th style={{ padding: '16px 12px', textAlign: 'left', fontWeight: '600', color: '#374151' }}>
                  Status
                </th>
                <th style={{ padding: '16px 12px', textAlign: 'left', fontWeight: '600', color: '#374151' }}>
                  Date
                </th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((transaction) => (
                <tr key={transaction.id} style={{ borderBottom: '1px solid #f3f4f6' }}>
                  <td style={{ padding: '16px 12px', fontFamily: 'monospace', color: '#3b82f6' }}>
                    {transaction.id}
                  </td>
                  <td style={{ padding: '16px 12px' }}>{transaction.booking}</td>
                  <td style={{ padding: '16px 12px' }}>{transaction.guest}</td>
                  <td style={{ padding: '16px 12px', fontWeight: '600' }}>
                    ${transaction.amount.toLocaleString()}
                  </td>
                  <td style={{ padding: '16px 12px' }}>{transaction.method}</td>
                  <td style={{ padding: '16px 12px' }}>
                    <span style={{
                      padding: '4px 8px',
                      borderRadius: '12px',
                      fontSize: '11px',
                      fontWeight: '500',
                      color: 'white',
                      backgroundColor: getStatusColor(transaction.status)
                    }}>
                      {transaction.status}
                    </span>
                  </td>
                  <td style={{ padding: '16px 12px' }}>
                    {new Date(transaction.date).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </VendorLayout>
  );
};

export default Payments;