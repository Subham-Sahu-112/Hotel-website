import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  MapPin, 
  Star, 
  Users, 
  Wifi, 
  Car, 
  Coffee, 
  Dumbbell, 
  UtensilsCrossed,
  Phone,
  Mail,
  Clock,
  Calendar,
  Heart,
  Share2
} from 'lucide-react';
import Loading from '../../components/Loading/Loading';
import './HotelView.css';

const HotelView = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [hotel, setHotel] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [error, setError] = useState(null);

  // Amenity icons mapping
  const amenityIcons = {
    'WiFi': <Wifi size={20} />,
    'Parking': <Car size={20} />,
    'Restaurant': <UtensilsCrossed size={20} />,
    'Gym': <Dumbbell size={20} />,
    'Breakfast': <Coffee size={20} />,
    'Free WiFi': <Wifi size={20} />,
    'Free Parking': <Car size={20} />,
  };

  useEffect(() => {
    const fetchHotelData = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(`http://localhost:1000/hotels/${id}`);
        
        if (!response.ok) {
          throw new Error('Hotel not found');
        }
        
        const data = await response.json();
        setHotel(data.hotel);
        
        // Set first room as selected by default
        if (data.hotel.roomTypes && data.hotel.roomTypes.length > 0) {
          setSelectedRoom(data.hotel.roomTypes[0]);
        }
      } catch (error) {
        console.error('Error fetching hotel:', error);
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    if (id) {
      fetchHotelData();
    }
  }, [id]);

  useEffect(() => {
    console.log(id);
  }, [id]);

  const handleBookRoom = () => {
    setIsBookingModalOpen(true);
  };

  const handleImageSelect = (index) => {
    setSelectedImageIndex(index);
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  if (isLoading) {
    return <Loading type="page" color="#ffd700" message="Loading Hotel Details..." />;
  }

  if (error) {
    return (
      <div className="error-container">
        <div className="error-content">
          <h2>Hotel Not Found</h2>
          <p>{error}</p>
          <button onClick={handleGoBack} className="back-btn">
            <ArrowLeft size={20} />
            Go Back
          </button>
        </div>
      </div>
    );
  }

  if (!hotel) {
    return (
      <div className="error-container">
        <div className="error-content">
          <h2>Hotel Not Found</h2>
          <p>The hotel you're looking for doesn't exist.</p>
          <button onClick={handleGoBack} className="back-btn">
            <ArrowLeft size={20} />
            Go Back
          </button>
        </div>
      </div>
    );
  }

  const allImages = [
    hotel.images.mainImage,
    ...(hotel.images.additionalImages || [])
  ].filter(Boolean);

  return (
    <div className="hotel-view">
      {/* Header */}
      <div className="hotel-header">
        <button onClick={handleGoBack} className="back-button">
          <ArrowLeft size={24} />
          Back to Properties
        </button>
        <div className="header-actions">
          <button className="action-btn">
            <Heart size={20} />
          </button>
          <button className="action-btn">
            <Share2 size={20} />
          </button>
        </div>
      </div>

      {/* Hero Section */}
      <div className="hotel-hero">
        <div className="image-gallery">
          <div className="main-image">
            <img 
              src={allImages[selectedImageIndex]} 
              alt={hotel.basicInfo.hotelName}
            />
          </div>
          {allImages.length > 1 && (
            <div className="image-thumbnails">
              {allImages.map((image, index) => (
                <div 
                  key={index}
                  className={`thumbnail ${index === selectedImageIndex ? 'active' : ''}`}
                  onClick={() => handleImageSelect(index)}
                >
                  <img src={image} alt={`${hotel.basicInfo.hotelName} ${index + 1}`} />
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="hotel-info">
          <div className="hotel-title-section">
            <h1 className="hotel-name">{hotel.basicInfo.hotelName}</h1>
            <div className="hotel-rating">
              <div className="stars">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={20}
                    fill={i < hotel.basicInfo.starRating ? "#ffd700" : "none"}
                    color={i < hotel.basicInfo.starRating ? "#ffd700" : "#ddd"}
                  />
                ))}
              </div>
              <span className="rating-text">{hotel.basicInfo.starRating} Star Hotel</span>
            </div>
            <div className="hotel-location">
              <MapPin size={18} color="#666" />
              <span>{hotel.basicInfo.address}, {hotel.basicInfo.city}, {hotel.basicInfo.country}</span>
            </div>
          </div>

          <div className="quick-book-card">
            <h3>Book Your Stay</h3>
            <div className="price-display">
              <span className="price">₹{selectedRoom?.pricePerNight || hotel.roomTypes[0]?.pricePerNight}</span>
              <span className="price-unit">/night</span>
            </div>
            <button className="book-now-btn" onClick={handleBookRoom}>
              Book Now
            </button>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="hotel-content">
        {/* Description */}
        <section className="hotel-description">
          <h2>About This Hotel</h2>
          <p>{hotel.basicInfo.description}</p>
        </section>

        {/* Amenities */}
        <section className="hotel-amenities">
          <h2>Amenities</h2>
          <div className="amenities-grid">
            {hotel.amenities.map((amenity, index) => (
              <div key={index} className="amenity-item">
                {amenityIcons[amenity] || <Coffee size={20} />}
                <span>{amenity}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Room Types */}
        <section className="hotel-rooms">
          <h2>Available Rooms</h2>
          <div className="rooms-grid">
            {hotel.roomTypes.map((room, index) => (
              <div 
                key={index} 
                className={`room-card ${selectedRoom?.roomType === room.roomType ? 'selected' : ''}`}
                onClick={() => setSelectedRoom(room)}
              >
                <div className="room-info">
                  <h3>{room.roomType}</h3>
                  <div className="room-details">
                    <div className="room-capacity">
                      <Users size={16} />
                      <span>Max {room.maxGuests} guests</span>
                    </div>
                    <div className="room-price">
                      <span className="price">₹{room.pricePerNight}</span>
                      <span className="price-unit">/night</span>
                    </div>
                  </div>
                </div>
                <button 
                  className="select-room-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedRoom(room);
                    handleBookRoom();
                  }}
                >
                  Select Room
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* Contact Information */}
        <section className="hotel-contact">
          <h2>Contact Information</h2>
          <div className="contact-grid">
            <div className="contact-item">
              <Phone size={20} />
              <div>
                <span className="contact-label">Phone</span>
                <span className="contact-value">{hotel.contactInfo.phone}</span>
              </div>
            </div>
            <div className="contact-item">
              <Mail size={20} />
              <div>
                <span className="contact-label">Email</span>
                <span className="contact-value">{hotel.contactInfo.email}</span>
              </div>
            </div>
            <div className="contact-item">
              <Clock size={20} />
              <div>
                <span className="contact-label">Check-in</span>
                <span className="contact-value">{hotel.contactInfo.checkInTime}</span>
              </div>
            </div>
            <div className="contact-item">
              <Clock size={20} />
              <div>
                <span className="contact-label">Check-out</span>
                <span className="contact-value">{hotel.contactInfo.checkOutTime}</span>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Booking Modal */}
      {isBookingModalOpen && (
        <div className="booking-modal-overlay" onClick={() => setIsBookingModalOpen(false)}>
          <div className="booking-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Book {hotel.basicInfo.hotelName}</h3>
              <button 
                className="close-modal-btn"
                onClick={() => setIsBookingModalOpen(false)}
              >
                ×
              </button>
            </div>
            <div className="modal-content">
              <div className="booking-summary">
                <h4>Booking Summary</h4>
                <div className="summary-item">
                  <span>Hotel:</span>
                  <span>{hotel.basicInfo.hotelName}</span>
                </div>
                <div className="summary-item">
                  <span>Room Type:</span>
                  <span>{selectedRoom?.roomType}</span>
                </div>
                <div className="summary-item">
                  <span>Price per night:</span>
                  <span>₹{selectedRoom?.pricePerNight}</span>
                </div>
                <div className="summary-item">
                  <span>Max Guests:</span>
                  <span>{selectedRoom?.maxGuests}</span>
                </div>
              </div>
              <div className="booking-form">
                <div className="form-group">
                  <label>Check-in Date</label>
                  <input type="date" className="booking-input" />
                </div>
                <div className="form-group">
                  <label>Check-out Date</label>
                  <input type="date" className="booking-input" />
                </div>
                <div className="form-group">
                  <label>Number of Guests</label>
                  <select className="booking-input">
                    {[...Array(selectedRoom?.maxGuests || 4)].map((_, i) => (
                      <option key={i + 1} value={i + 1}>{i + 1} Guest{i > 0 ? 's' : ''}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="modal-actions">
                <button 
                  className="cancel-btn"
                  onClick={() => setIsBookingModalOpen(false)}
                >
                  Cancel
                </button>
                <button className="confirm-booking-btn">
                  Confirm Booking
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HotelView;