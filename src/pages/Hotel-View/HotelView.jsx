import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
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
  Share2,
} from "lucide-react";
import "./HotelView.css";

const HotelView = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [hotel, setHotel] = useState(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bookingData, setBookingData] = useState({
    checkInDate: "",
    checkOutDate: "",
    numberOfGuests: 1,
    specialRequests: "",
  });

  // Amenity icons mapping
  const amenityIcons = {
    WiFi: <Wifi size={20} />,
    Parking: <Car size={20} />,
    Restaurant: <UtensilsCrossed size={20} />,
    Gym: <Dumbbell size={20} />,
    Breakfast: <Coffee size={20} />,
    "Free WiFi": <Wifi size={20} />,
    "Free Parking": <Car size={20} />,
  };

  useEffect(() => {
    const fetchHotelData = async () => {
      try {
        const response = await fetch(`http://localhost:1000/hotels/${id}`);

        if (!response.ok) {
          throw new Error("Hotel not found");
        }

        const data = await response.json();
        setHotel(data.hotel);

        // Set first room as selected by default
        if (data.hotel.roomTypes && data.hotel.roomTypes.length > 0) {
          setSelectedRoom(data.hotel.roomTypes[0]);
        }
      } catch (error) {
        console.error("Error fetching hotel:", error);
        setError(error.message);
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
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Please login to book a room");
      navigate("/login");
      return;
    }
    setIsBookingModalOpen(true);
  };

  const handleBookingInputChange = (e) => {
    const { name, value } = e.target;
    setBookingData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleConfirmBooking = async () => {
    // Validate booking data
    if (!bookingData.checkInDate || !bookingData.checkOutDate) {
      toast.error("Please select check-in and check-out dates");
      return;
    }

    const checkIn = new Date(bookingData.checkInDate);
    const checkOut = new Date(bookingData.checkOutDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (checkIn < today) {
      toast.error("Check-in date cannot be in the past");
      return;
    }

    if (checkOut <= checkIn) {
      toast.error("Check-out date must be after check-in date");
      return;
    }

    if (!bookingData.numberOfGuests || bookingData.numberOfGuests < 1) {
      toast.error("Please select number of guests");
      return;
    }

    setIsSubmitting(true);

    try {
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:1000/bookings", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          hotelId: hotel._id,
          roomType: selectedRoom.roomType,
          numberOfRooms: 1,
          checkInDate: bookingData.checkInDate,
          checkOutDate: bookingData.checkOutDate,
          numberOfGuests: parseInt(bookingData.numberOfGuests),
          guestDetails: {
            adults: parseInt(bookingData.numberOfGuests),
            children: 0,
          },
          specialRequests: bookingData.specialRequests,
          paymentMethod: "credit_card",
        }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        toast.success("Booking confirmed successfully!");
        setIsBookingModalOpen(false);
        // Reset booking data
        setBookingData({
          checkInDate: "",
          checkOutDate: "",
          numberOfGuests: 1,
          specialRequests: "",
        });
        // Navigate to bookings page
        setTimeout(() => {
          navigate("/my-bookings");
        }, 1500);
      } else {
        if (response.status === 401) {
          toast.error("Session expired. Please login again.");
          navigate("/login");
        } else {
          toast.error(data.message || "Failed to create booking");
        }
      }
    } catch (error) {
      console.error("Error creating booking:", error);
      toast.error("Unable to create booking. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleImageSelect = (index) => {
    setSelectedImageIndex(index);
  };

  const handleGoBack = () => {
    navigate(-1);
  };

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
    ...(hotel.images.additionalImages || []),
  ].filter(Boolean);

  return (
    <div className="land-hotel-view">
      {/* Header */}
      <div className="land-hotel-header">
        <button onClick={handleGoBack} className="back-button">
          <ArrowLeft size={24} />
          Back to Properties
        </button>
      </div>

      {/* Hero Section */}
      <div className="land-hotel-hero">
        <div className="land-image-gallery">
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
                  className={`thumbnail ${
                    index === selectedImageIndex ? "active" : ""
                  }`}
                  onClick={() => handleImageSelect(index)}
                >
                  <img
                    src={image}
                    alt={`${hotel.basicInfo.hotelName} ${index + 1}`}
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="land-hotel-info">
          <div className="hotel-title-section">
            <div className="hero-section-i">
              <h1 className="land-hotel-name">{hotel.basicInfo.hotelName}</h1>
              <div className="land-hotel-rating">
                <div className="stars">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={20}
                      fill={i < hotel.basicInfo.starRating ? "#ffd700" : "none"}
                      color={
                        i < hotel.basicInfo.starRating ? "#ffd700" : "#ddd"
                      }
                    />
                  ))}
                </div>
                <span className="rating-text">
                  {hotel.basicInfo.starRating} Star Hotel
                </span>
              </div>
            </div>
            <div className="hotel-location">
              <MapPin size={18} color="#666" />
              <span>
                {hotel.basicInfo.address}, {hotel.basicInfo.city},{" "}
                {hotel.basicInfo.country}
              </span>
            </div>
          </div>

          <div className="quick-book-card">
            <div className="book-section-i">
              <h3>Book Your Stay</h3>
              <div className="price-display">
                <span className="price">
                  ₹
                  {selectedRoom?.pricePerNight ||
                    hotel.roomTypes[0]?.pricePerNight}
                </span>
                <span className="price-unit">/night</span>
              </div>
            </div>
            <button className="book-now-btn" onClick={handleBookRoom}>
              Book Now
            </button>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="hotel-content">
        {/* Three Column Section */}
        <div className="hotel-info-row">
          {/* Description */}
          <section id="section" className="hotel-description">
            <h2>About This Hotel</h2>
            <p>{hotel.basicInfo.description}</p>
          </section>

          {/* Amenities */}
          <section id="section" className="land-hotel-amenities">
            <h2>Amenities</h2>
            <div className="land-amenities-grid">
              {hotel.amenities.map((amenity, index) => (
                <div key={index} className="land-amenity-item">
                  {amenityIcons[amenity] || <Coffee size={20} />}
                  <span>{amenity}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Room Types */}
          <section id="section" className="hotel-rooms">
            <h2>Available Rooms</h2>
            <div className="rooms-grid">
              {hotel.roomTypes.map((room, index) => (
                <div
                  key={index}
                  className={`room-card ${
                    selectedRoom?.roomType === room.roomType ? "selected" : ""
                  }`}
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
        </div>

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
                <span className="contact-value">
                  {hotel.contactInfo.checkInTime}
                </span>
              </div>
            </div>
            <div className="contact-item">
              <Clock size={20} />
              <div>
                <span className="contact-label">Check-out</span>
                <span className="contact-value">
                  {hotel.contactInfo.checkOutTime}
                </span>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Booking Modal */}
      {isBookingModalOpen && (
        <div
          className="booking-modal-overlay"
          onClick={() => setIsBookingModalOpen(false)}
        >
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
            <div className="book-modal-content">
              <div className="booking-summary">
                <h4>Booking Summary</h4>
                <div className="book-summary-item">
                  <span>Hotel:</span>
                  <span>{hotel.basicInfo.hotelName}</span>
                </div>
                <div className="book-summary-item">
                  <span>Room Type:</span>
                  <span>{selectedRoom?.roomType}</span>
                </div>
                <div className="book-summary-item">
                  <span>Price per night:</span>
                  <span>₹{selectedRoom?.pricePerNight}</span>
                </div>
                <div className="book-summary-item">
                  <span>Max Guests:</span>
                  <span>{selectedRoom?.maxGuests}</span>
                </div>
              </div>
              <div className="booking-form">
                <div className="book-form-group">
                  <label>Check-in Date</label>
                  <input
                    type="date"
                    name="checkInDate"
                    className="booking-input"
                    value={bookingData.checkInDate}
                    onChange={handleBookingInputChange}
                    min={new Date().toISOString().split("T")[0]}
                    required
                  />
                </div>
                <div className="book-form-group">
                  <label>Check-out Date</label>
                  <input
                    type="date"
                    name="checkOutDate"
                    className="booking-input"
                    value={bookingData.checkOutDate}
                    onChange={handleBookingInputChange}
                    min={
                      bookingData.checkInDate ||
                      new Date().toISOString().split("T")[0]
                    }
                    required
                  />
                </div>
                <div className="book-form-group">
                  <label>Number of Guests</label>
                  <select
                    name="numberOfGuests"
                    className="booking-input"
                    value={bookingData.numberOfGuests}
                    onChange={handleBookingInputChange}
                    required
                  >
                    {[...Array(selectedRoom?.maxGuests || 4)].map((_, i) => (
                      <option key={i + 1} value={i + 1}>
                        {i + 1} Guest{i > 0 ? "s" : ""}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="book-form-group">
                  <label>Special Requests (Optional)</label>
                  <textarea
                    name="specialRequests"
                    className="booking-input booking-textarea"
                    placeholder="Any special requests or preferences..."
                    value={bookingData.specialRequests}
                    onChange={handleBookingInputChange}
                    rows="3"
                  />
                </div>
              </div>
              <div className="book-modal-actions">
                <button
                  className="cancel-btn"
                  onClick={() => setIsBookingModalOpen(false)}
                  disabled={isSubmitting}
                >
                  Cancel
                </button>
                <button
                  className="confirm-booking-btn"
                  onClick={handleConfirmBooking}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Booking..." : "Confirm Booking"}
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
