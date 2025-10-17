import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Calendar, 
  MapPin, 
  Users, 
  Clock, 
  CreditCard,
  CheckCircle,
  XCircle,
  AlertCircle,
  Eye,
  X as CloseIcon
} from 'lucide-react';
import { toast } from 'react-toastify';
import Navbar from '../../layouts/Navbar';
import './MyBookings.css';
import { getApiEndpoint } from '../../config/apiConfig';

const MyBookings = () => {
  const navigate = useNavigate();
  const [bookings, setBookings] = useState([]);
  const [filteredBookings, setFilteredBookings] = useState([]);
  const [filterStatus, setFilterStatus] = useState('all');
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [cancellingId, setCancellingId] = useState(null);

  useEffect(() => {
    fetchBookings();
  }, []);

  useEffect(() => {
    filterBookingsByStatus();
  }, [filterStatus, bookings]);

  const fetchBookings = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        toast.error('Please login to view your bookings');
        navigate('/login');
        return;
      }

      const response = await fetch(getApiEndpoint('/bookings'), {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setBookings(data.data.bookings);
      } else {
        if (response.status === 401) {
          toast.error('Session expired. Please login again.');
          navigate('/login');
        } else {
          toast.error(data.message || 'Failed to fetch bookings');
        }
      }
    } catch (error) {
      console.error('Error fetching bookings:', error);
      toast.error('Unable to fetch bookings. Please try again.');
    }
  };

  const filterBookingsByStatus = () => {
    if (filterStatus === 'all') {
      setFilteredBookings(bookings);
    } else {
      setFilteredBookings(bookings.filter(booking => booking.bookingStatus === filterStatus));
    }
  };

  const handleViewBooking = (booking) => {
    setSelectedBooking(booking);
    setShowModal(true);
  };

  const handleCancelBooking = async (bookingId) => {
    if (!window.confirm('Are you sure you want to cancel this booking?')) {
      return;
    }

    setCancellingId(bookingId);
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(getApiEndpoint(`/bookings/${bookingId}/cancel`), {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          reason: 'Cancelled by customer'
        })
      });

      const data = await response.json();

      if (response.ok && data.success) {
        toast.success('Booking cancelled successfully');
        fetchBookings(); // Refresh bookings
      } else {
        toast.error(data.message || 'Failed to cancel booking');
      }
    } catch (error) {
      console.error('Error cancelling booking:', error);
      toast.error('Unable to cancel booking. Please try again.');
    } finally {
      setCancellingId(null);
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'confirmed':
        return <CheckCircle size={20} className="status-icon confirmed" />;
      case 'pending':
        return <Clock size={20} className="status-icon pending" />;
      case 'cancelled':
        return <XCircle size={20} className="status-icon cancelled" />;
      case 'completed':
        return <CheckCircle size={20} className="status-icon completed" />;
      default:
        return <AlertCircle size={20} className="status-icon" />;
    }
  };

  const getStatusClass = (status) => {
    return `status-badge ${status}`;
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const canCancelBooking = (booking) => {
    if (booking.bookingStatus === 'cancelled' || booking.bookingStatus === 'completed') {
      return false;
    }
    const hoursUntilCheckIn = (new Date(booking.checkInDate).getTime() - Date.now()) / (1000 * 3600);
    return hoursUntilCheckIn > 24;
  };

  return (
    <div className="my-bookings">
      <Navbar />
      
      <div className="bookings-container">
        {/* Header */}
        <div className="bookings-header">
          <div>
            <h1 className="bookings-title">My Bookings</h1>
            <p className="bookings-subtitle">
              Manage and view all your hotel reservations
            </p>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="filter-tabs">
          <button
            className={`filter-tab ${filterStatus === 'all' ? 'active' : ''}`}
            onClick={() => setFilterStatus('all')}
          >
            All Bookings ({bookings.length})
          </button>
          <button
            className={`filter-tab ${filterStatus === 'confirmed' ? 'active' : ''}`}
            onClick={() => setFilterStatus('confirmed')}
          >
            Confirmed ({bookings.filter(b => b.bookingStatus === 'confirmed').length})
          </button>
          <button
            className={`filter-tab ${filterStatus === 'pending' ? 'active' : ''}`}
            onClick={() => setFilterStatus('pending')}
          >
            Pending ({bookings.filter(b => b.bookingStatus === 'pending').length})
          </button>
          <button
            className={`filter-tab ${filterStatus === 'cancelled' ? 'active' : ''}`}
            onClick={() => setFilterStatus('cancelled')}
          >
            Cancelled ({bookings.filter(b => b.bookingStatus === 'cancelled').length})
          </button>
        </div>

        {/* Bookings List */}
        <div className="bookings-list">
          {filteredBookings.length === 0 ? (
            <div className="empty-state">
              <div className="empty-icon">📅</div>
              <h3>No bookings found</h3>
              <p>You haven't made any bookings yet.</p>
              <button 
                className="browse-hotels-btn"
                onClick={() => navigate('/all-hotels')}
              >
                Browse Hotels
              </button>
            </div>
          ) : (
            filteredBookings.map((booking) => (
              <div key={booking._id} className="booking-card">
                <div className="booking-card-header">
                  <div className="hotel-info">
                    <h3 className="hotel-name">{booking.hotelName}</h3>
                    <p className="hotel-location">
                      <MapPin size={16} />
                      {booking.hotelCity}
                    </p>
                  </div>
                  <div className="booking-status">
                    {getStatusIcon(booking.bookingStatus)}
                    <span className={getStatusClass(booking.bookingStatus)}>
                      {booking.bookingStatus}
                    </span>
                  </div>
                </div>

                <div className="booking-card-body">
                  <div className="booking-details">
                    <div className="detail-item">
                      <Calendar size={18} />
                      <div>
                        <p className="detail-label">Check-in</p>
                        <p className="detail-value">{formatDate(booking.checkInDate)}</p>
                      </div>
                    </div>
                    <div className="detail-item">
                      <Calendar size={18} />
                      <div>
                        <p className="detail-label">Check-out</p>
                        <p className="detail-value">{formatDate(booking.checkOutDate)}</p>
                      </div>
                    </div>
                    <div className="detail-item">
                      <Clock size={18} />
                      <div>
                        <p className="detail-label">Duration</p>
                        <p className="detail-value">{booking.numberOfNights} nights</p>
                      </div>
                    </div>
                    <div className="detail-item">
                      <Users size={18} />
                      <div>
                        <p className="detail-label">Guests</p>
                        <p className="detail-value">{booking.numberOfGuests} guests</p>
                      </div>
                    </div>
                  </div>

                  <div className="booking-meta">
                    <div className="room-type">
                      <strong>Room:</strong> {booking.roomType}
                    </div>
                    <div className="booking-reference">
                      <strong>Ref:</strong> {booking.bookingReference}
                    </div>
                  </div>

                  <div className="booking-amount">
                    <CreditCard size={18} />
                    <span className="amount-label">Total Amount:</span>
                    <span className="amount-value">₹{booking.totalAmount.toLocaleString()}</span>
                  </div>
                </div>

                <div className="booking-card-footer">
                  <button 
                    className="view-details-btn"
                    onClick={() => handleViewBooking(booking)}
                  >
                    <Eye size={18} />
                    View Details
                  </button>
                  {canCancelBooking(booking) && (
                    <button 
                      className="cancel-booking-btn"
                      onClick={() => handleCancelBooking(booking._id)}
                      disabled={cancellingId === booking._id}
                    >
                      {cancellingId === booking._id ? 'Cancelling...' : 'Cancel Booking'}
                    </button>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Booking Details Modal */}
      {showModal && selectedBooking && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Booking Details</h2>
              <button 
                className="close-modal-btn"
                onClick={() => setShowModal(false)}
              >
                <CloseIcon size={24} />
              </button>
            </div>
            <div className="modal-body">
              <div className="modal-section">
                <h3>Hotel Information</h3>
                <p><strong>Name:</strong> {selectedBooking.hotelName}</p>
                <p><strong>Address:</strong> {selectedBooking.hotelAddress}</p>
                <p><strong>City:</strong> {selectedBooking.hotelCity}</p>
              </div>
              <div className="modal-section">
                <h3>Booking Information</h3>
                <p><strong>Reference:</strong> {selectedBooking.bookingReference}</p>
                <p><strong>Status:</strong> {selectedBooking.bookingStatus}</p>
                <p><strong>Room Type:</strong> {selectedBooking.roomType}</p>
                <p><strong>Number of Rooms:</strong> {selectedBooking.numberOfRooms}</p>
                <p><strong>Guests:</strong> {selectedBooking.numberOfGuests}</p>
                <p><strong>Check-in:</strong> {formatDate(selectedBooking.checkInDate)}</p>
                <p><strong>Check-out:</strong> {formatDate(selectedBooking.checkOutDate)}</p>
                <p><strong>Nights:</strong> {selectedBooking.numberOfNights}</p>
              </div>
              <div className="modal-section">
                <h3>Payment Information</h3>
                <p><strong>Total Amount:</strong> ₹{selectedBooking.totalAmount.toLocaleString()}</p>
                <p><strong>Payment Status:</strong> {selectedBooking.paymentStatus}</p>
                <p><strong>Payment Method:</strong> {selectedBooking.paymentMethod}</p>
              </div>
              {selectedBooking.specialRequests && (
                <div className="modal-section">
                  <h3>Special Requests</h3>
                  <p>{selectedBooking.specialRequests}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyBookings;
