import React, { useState } from 'react';
import VendorLayout from './VendorLayout';
import './Bookings.css';

const Bookings = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [selectedBooking, setSelectedBooking] = useState(null);

  const bookings = [
    {
      id: 'BK001',
      guest: {
        name: 'John Doe',
        email: 'john.doe@email.com',
        phone: '+1 234 567 8900',
        avatar: '👨'
      },
      property: 'Sunset Villa Resort',
      roomType: 'Deluxe Ocean View',
      checkIn: '2024-01-15',
      checkOut: '2024-01-18',
      nights: 3,
      guests: 2,
      amount: 1350,
      status: 'confirmed',
      paymentStatus: 'paid',
      bookingDate: '2024-01-10',
      specialRequests: 'Late check-in, Extra towels'
    },
    {
      id: 'BK002',
      guest: {
        name: 'Sarah Johnson',
        email: 'sarah.j@email.com',
        phone: '+1 345 678 9012',
        avatar: '👩'
      },
      property: 'Ocean View Hotel',
      roomType: 'Standard Room',
      checkIn: '2024-01-20',
      checkOut: '2024-01-25',
      nights: 5,
      guests: 1,
      amount: 1600,
      status: 'pending',
      paymentStatus: 'pending',
      bookingDate: '2024-01-18',
      specialRequests: 'Ground floor room'
    },
    {
      id: 'BK003',
      guest: {
        name: 'Michael Brown',
        email: 'michael.b@email.com',
        phone: '+1 456 789 0123',
        avatar: '👨'
      },
      property: 'Mountain Lodge',
      roomType: 'Family Suite',
      checkIn: '2024-01-25',
      checkOut: '2024-01-28',
      nights: 3,
      guests: 4,
      amount: 840,
      status: 'completed',
      paymentStatus: 'paid',
      bookingDate: '2024-01-15',
      specialRequests: 'Crib for baby'
    },
    {
      id: 'BK004',
      guest: {
        name: 'Emily Davis',
        email: 'emily.d@email.com',
        phone: '+1 567 890 1234',
        avatar: '👩'
      },
      property: 'City Center Suites',
      roomType: 'Executive Suite',
      checkIn: '2024-02-01',
      checkOut: '2024-02-03',
      nights: 2,
      guests: 2,
      amount: 760,
      status: 'cancelled',
      paymentStatus: 'refunded',
      bookingDate: '2024-01-20',
      specialRequests: 'None'
    }
  ];

  const filteredBookings = bookings.filter(booking => {
    const matchesSearch = booking.guest.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         booking.property.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         booking.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filterStatus === 'all' || booking.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'confirmed':
        return '#10b981';
      case 'pending':
        return '#f59e0b';
      case 'completed':
        return '#3b82f6';
      case 'cancelled':
        return '#ef4444';
      default:
        return '#6b7280';
    }
  };

  const getPaymentStatusColor = (status) => {
    switch (status) {
      case 'paid':
        return '#10b981';
      case 'pending':
        return '#f59e0b';
      case 'refunded':
        return '#6b7280';
      default:
        return '#ef4444';
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const totalRevenue = bookings
    .filter(b => b.paymentStatus === 'paid')
    .reduce((sum, b) => sum + b.amount, 0);

  return (
    <VendorLayout>
      <div className="bookings">
        {/* Header */}
        <div className="bookings-header">
          <div className="header-left">
            <h1 className="bookings-title">Bookings</h1>
            <p className="bookings-subtitle">Manage your hotel reservations and guest information</p>
          </div>
          <div className="header-stats">
            <div className="stat-item">
              <span className="stat-number">{bookings.length}</span>
              <span className="stat-label">Total Bookings</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">${totalRevenue.toLocaleString()}</span>
              <span className="stat-label">Revenue</span>
            </div>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="bookings-filters">
          <div className="search-container">
            <input
              type="text"
              placeholder="Search bookings, guests, properties..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
            />
          </div>
          <div className="filter-container">
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="filter-select"
            >
              <option value="all">All Status</option>
              <option value="confirmed">Confirmed</option>
              <option value="pending">Pending</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>
        </div>

        {/* Status Cards */}
        <div className="status-cards">
          <div className="status-card">
            <div className="status-icon confirmed">📅</div>
            <div className="status-info">
              <div className="status-number">{bookings.filter(b => b.status === 'confirmed').length}</div>
              <div className="status-label">Confirmed</div>
            </div>
          </div>
          <div className="status-card">
            <div className="status-icon pending">⏳</div>
            <div className="status-info">
              <div className="status-number">{bookings.filter(b => b.status === 'pending').length}</div>
              <div className="status-label">Pending</div>
            </div>
          </div>
          <div className="status-card">
            <div className="status-icon completed">✅</div>
            <div className="status-info">
              <div className="status-number">{bookings.filter(b => b.status === 'completed').length}</div>
              <div className="status-label">Completed</div>
            </div>
          </div>
          <div className="status-card">
            <div className="status-icon cancelled">❌</div>
            <div className="status-info">
              <div className="status-number">{bookings.filter(b => b.status === 'cancelled').length}</div>
              <div className="status-label">Cancelled</div>
            </div>
          </div>
        </div>

        {/* Bookings Table */}
        <div className="bookings-table-container">
          <table className="bookings-table">
            <thead>
              <tr>
                <th>Booking ID</th>
                <th>Guest</th>
                <th>Property</th>
                <th>Check-in/Check-out</th>
                <th>Nights</th>
                <th>Amount</th>
                <th>Status</th>
                <th>Payment</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredBookings.map((booking) => (
                <tr key={booking.id}>
                  <td>
                    <span className="booking-id">{booking.id}</span>
                  </td>
                  <td>
                    <div className="guest-info">
                      <span className="guest-avatar">{booking.guest.avatar}</span>
                      <div className="guest-details">
                        <div className="guest-name">{booking.guest.name}</div>
                        <div className="guest-email">{booking.guest.email}</div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className="property-info">
                      <div className="property-name">{booking.property}</div>
                      <div className="room-type">{booking.roomType}</div>
                    </div>
                  </td>
                  <td>
                    <div className="date-info">
                      <div className="check-dates">
                        {formatDate(booking.checkIn)} - {formatDate(booking.checkOut)}
                      </div>
                      <div className="guests-count">{booking.guests} guest{booking.guests > 1 ? 's' : ''}</div>
                    </div>
                  </td>
                  <td>
                    <span className="nights">{booking.nights}</span>
                  </td>
                  <td>
                    <span className="amount">${booking.amount.toLocaleString()}</span>
                  </td>
                  <td>
                    <span 
                      className="status-badge"
                      style={{ backgroundColor: getStatusColor(booking.status) }}
                    >
                      {booking.status}
                    </span>
                  </td>
                  <td>
                    <span 
                      className="payment-badge"
                      style={{ backgroundColor: getPaymentStatusColor(booking.paymentStatus) }}
                    >
                      {booking.paymentStatus}
                    </span>
                  </td>
                  <td>
                    <div className="table-actions">
                      <button 
                        className="action-btn view-btn"
                        onClick={() => setSelectedBooking(booking)}
                      >
                        View
                      </button>
                      <button className="action-btn edit-btn">Edit</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Empty State */}
        {filteredBookings.length === 0 && (
          <div className="empty-state">
            <div className="empty-icon">📅</div>
            <h3>No bookings found</h3>
            <p>Try adjusting your search or filters</p>
          </div>
        )}
      </div>

      {/* Booking Details Modal */}
      {selectedBooking && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h2>Booking Details - {selectedBooking.id}</h2>
              <button 
                className="modal-close"
                onClick={() => setSelectedBooking(null)}
              >
                ✕
              </button>
            </div>
            <div className="modal-content">
              <div className="booking-details">
                <div className="detail-section">
                  <h3>Guest Information</h3>
                  <div className="detail-grid">
                    <div className="detail-item">
                      <label>Name:</label>
                      <span>{selectedBooking.guest.name}</span>
                    </div>
                    <div className="detail-item">
                      <label>Email:</label>
                      <span>{selectedBooking.guest.email}</span>
                    </div>
                    <div className="detail-item">
                      <label>Phone:</label>
                      <span>{selectedBooking.guest.phone}</span>
                    </div>
                  </div>
                </div>

                <div className="detail-section">
                  <h3>Booking Information</h3>
                  <div className="detail-grid">
                    <div className="detail-item">
                      <label>Property:</label>
                      <span>{selectedBooking.property}</span>
                    </div>
                    <div className="detail-item">
                      <label>Room Type:</label>
                      <span>{selectedBooking.roomType}</span>
                    </div>
                    <div className="detail-item">
                      <label>Check-in:</label>
                      <span>{formatDate(selectedBooking.checkIn)}</span>
                    </div>
                    <div className="detail-item">
                      <label>Check-out:</label>
                      <span>{formatDate(selectedBooking.checkOut)}</span>
                    </div>
                    <div className="detail-item">
                      <label>Nights:</label>
                      <span>{selectedBooking.nights}</span>
                    </div>
                    <div className="detail-item">
                      <label>Guests:</label>
                      <span>{selectedBooking.guests}</span>
                    </div>
                    <div className="detail-item">
                      <label>Total Amount:</label>
                      <span className="amount-highlight">${selectedBooking.amount.toLocaleString()}</span>
                    </div>
                    <div className="detail-item">
                      <label>Booking Date:</label>
                      <span>{formatDate(selectedBooking.bookingDate)}</span>
                    </div>
                  </div>
                </div>

                <div className="detail-section">
                  <h3>Status & Payment</h3>
                  <div className="detail-grid">
                    <div className="detail-item">
                      <label>Booking Status:</label>
                      <span 
                        className="status-badge"
                        style={{ backgroundColor: getStatusColor(selectedBooking.status) }}
                      >
                        {selectedBooking.status}
                      </span>
                    </div>
                    <div className="detail-item">
                      <label>Payment Status:</label>
                      <span 
                        className="payment-badge"
                        style={{ backgroundColor: getPaymentStatusColor(selectedBooking.paymentStatus) }}
                      >
                        {selectedBooking.paymentStatus}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="detail-section">
                  <h3>Special Requests</h3>
                  <p className="special-requests">
                    {selectedBooking.specialRequests || 'No special requests'}
                  </p>
                </div>

                <div className="modal-actions">
                  <button className="action-btn edit-btn">Edit Booking</button>
                  <button className="action-btn cancel-btn">Cancel Booking</button>
                  <button 
                    className="action-btn primary-btn"
                    onClick={() => setSelectedBooking(null)}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </VendorLayout>
  );
};

export default Bookings;