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
  Edit3,
  Save,
  X,
  Plus,
  Trash2,
  Upload
} from 'lucide-react';
import { toast } from 'react-toastify';
import './HotelView.css';
import { getApiEndpoint } from '../../config/apiConfig';

const VendorHotelView = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [hotel, setHotel] = useState(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [editFormData, setEditFormData] = useState({});

  // Amenity icons mapping
  const amenityIcons = {
    'WiFi': <Wifi size={20} />,
    'Parking': <Car size={20} />,
    'Restaurant': <UtensilsCrossed size={20} />,
    'Swimming Pool': <Dumbbell size={20} />,
    'Gym': <Dumbbell size={20} />,
    'Breakfast': <Coffee size={20} />,
    'Free WiFi': <Wifi size={20} />,
    'Free Parking': <Car size={20} />,
  };

  const availableAmenities = [
    'WiFi', 'Free WiFi', 'Parking', 'Free Parking', 'Restaurant', 
    'Swimming Pool', 'Gym', 'Breakfast', 'Room Service', 'Spa',
    'Air Conditioning', 'Laundry Service', 'Concierge', 'Bar'
  ];

  useEffect(() => {
    const fetchHotelData = async () => {
      try {
        const response = await fetch(getApiEndpoint(`/hotels/${id}`));
        
        if (!response.ok) {
          throw new Error('Hotel not found');
        }
        
        const data = await response.json();
        setHotel(data.hotel);
        setEditFormData({
          basicInfo: { ...data.hotel.basicInfo },
          contactInfo: { ...data.hotel.contactInfo },
          amenities: [...data.hotel.amenities],
          roomTypes: [...data.hotel.roomTypes]
        });
      } catch (error) {
        console.error('Error fetching hotel:', error);
        setError(error.message);
      }
    };

    if (id) {
      fetchHotelData();
    }
  }, [id]);

  const handleImageSelect = (index) => {
    setSelectedImageIndex(index);
  };

  const handleGoBack = () => {
    navigate('/vender/properties');
  };

  const handleEditToggle = () => {
    if (isEditing) {
      // Reset form data when cancelling
      setEditFormData({
        basicInfo: { ...hotel.basicInfo },
        contactInfo: { ...hotel.contactInfo },
        amenities: [...hotel.amenities],
        roomTypes: [...hotel.roomTypes]
      });
    }
    setIsEditing(!isEditing);
  };

  const handleInputChange = (section, field, value) => {
    setEditFormData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
  };

  const handleAmenityToggle = (amenity) => {
    setEditFormData(prev => ({
      ...prev,
      amenities: prev.amenities.includes(amenity)
        ? prev.amenities.filter(a => a !== amenity)
        : [...prev.amenities, amenity]
    }));
  };

  const handleRoomTypeChange = (index, field, value) => {
    setEditFormData(prev => ({
      ...prev,
      roomTypes: prev.roomTypes.map((room, i) => 
        i === index ? { ...room, [field]: value } : room
      )
    }));
  };

  const handleAddRoomType = () => {
    setEditFormData(prev => ({
      ...prev,
      roomTypes: [...prev.roomTypes, {
        roomType: '',
        pricePerNight: '',
        maxGuests: ''
      }]
    }));
  };

  const handleRemoveRoomType = (index) => {
    if (editFormData.roomTypes.length > 1) {
      setEditFormData(prev => ({
        ...prev,
        roomTypes: prev.roomTypes.filter((_, i) => i !== index)
      }));
    }
  };

  const handleSaveChanges = async () => {
    try {
      setIsSaving(true);
      
      const response = await fetch(getApiEndpoint(`/hotels/${id}`), {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editFormData)
      });

      if (!response.ok) {
        throw new Error('Failed to update hotel');
      }

      const updatedData = await response.json();
      setHotel(updatedData.hotel);
      setIsEditing(false);
      toast.success('Hotel updated successfully!');
    } catch (error) {
      console.error('Error updating hotel:', error);
      toast.error('Failed to update hotel. Please try again.');
    } finally {
      setIsSaving(false);
    }
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
    ...(hotel.images.additionalImages || [])
  ].filter(Boolean);

  const displayData = isEditing ? editFormData : hotel;

  return (
    <div className="hotel-view vendor-hotel-view">
      {/* Header */}
      <div className="hotel-header">
        <button onClick={handleGoBack} className="back-button">
          <ArrowLeft size={24} />
          Back to Properties
        </button>
        <div className="header-actions">
          {!isEditing ? (
            <button className="edit-btn" onClick={handleEditToggle}>
              <Edit3 size={20} />
              Edit Hotel
            </button>
          ) : (
            <div className="edit-actions">
              <button 
                className="cancel-edit-btn" 
                onClick={handleEditToggle}
                disabled={isSaving}
              >
                <X size={20} />
                Cancel
              </button>
              <button 
                className="save-edit-btn" 
                onClick={handleSaveChanges}
                disabled={isSaving}
              >
                {isSaving ? (
                  "Saving..."
                ) : (
                  <>
                    <Save size={20} />
                    Save Changes
                  </>
                )}
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Hero Section */}
      <div className="hotel-hero">
        <div className="image-gallery">
          <div className="main-image">
            <img 
              src={allImages[selectedImageIndex]} 
              alt={displayData.basicInfo?.hotelName || hotel.basicInfo.hotelName}
            />
            {isEditing && (
              <div className="image-edit-overlay">
                <button className="upload-image-btn">
                  <Upload size={20} />
                  Change Image
                </button>
              </div>
            )}
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
                  {isEditing && (
                    <div className="thumbnail-edit">
                      <Trash2 size={12} />
                    </div>
                  )}
                </div>
              ))}
              {isEditing && (
                <div className="add-image-thumbnail">
                  <Plus size={20} />
                </div>
              )}
            </div>
          )}
        </div>

        <div className="hotel-info">
          <div className="hotel-title-section">
            {isEditing ? (
              <input
                type="text"
                className="edit-hotel-name"
                value={editFormData.basicInfo?.hotelName || ''}
                onChange={(e) => handleInputChange('basicInfo', 'hotelName', e.target.value)}
                placeholder="Hotel Name"
              />
            ) : (
              <h1 className="hotel-name">{hotel.basicInfo.hotelName}</h1>
            )}

            <div className="hotel-rating">
              <div className="stars">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={20}
                    fill={i < (displayData.basicInfo?.starRating || hotel.basicInfo.starRating) ? "#ffd700" : "none"}
                    color={i < (displayData.basicInfo?.starRating || hotel.basicInfo.starRating) ? "#ffd700" : "#ddd"}
                    style={{ cursor: isEditing ? 'pointer' : 'default' }}
                    onClick={() => isEditing && handleInputChange('basicInfo', 'starRating', i + 1)}
                  />
                ))}
              </div>
              <span className="rating-text">
                {displayData.basicInfo?.starRating || hotel.basicInfo.starRating} Star Hotel
              </span>
            </div>

            <div className="hotel-location">
              <MapPin size={18} color="#666" />
              {isEditing ? (
                <div className="location-edit-group">
                  <input
                    type="text"
                    className="edit-address"
                    value={editFormData.basicInfo?.address || ''}
                    onChange={(e) => handleInputChange('basicInfo', 'address', e.target.value)}
                    placeholder="Address"
                  />
                  <input
                    type="text"
                    className="edit-city"
                    value={editFormData.basicInfo?.city || ''}
                    onChange={(e) => handleInputChange('basicInfo', 'city', e.target.value)}
                    placeholder="City"
                  />
                  <input
                    type="text"
                    className="edit-country"
                    value={editFormData.basicInfo?.country || ''}
                    onChange={(e) => handleInputChange('basicInfo', 'country', e.target.value)}
                    placeholder="Country"
                  />
                </div>
              ) : (
                <span>{hotel.basicInfo.address}, {hotel.basicInfo.city}, {hotel.basicInfo.country}</span>
              )}
            </div>
          </div>

          <div className="vendor-stats-card">
            <h3>Property Statistics</h3>
            <div className="stats-grid">
              <div className="stat-item">
                <span className="stat-label">Room Types</span>
                <span className="stat-value">{hotel.roomTypes.length}</span>
              </div>
              <div className="stat-item">
                <span className="stat-label">Amenities</span>
                <span className="stat-value">{hotel.amenities.length}</span>
              </div>
              <div className="stat-item">
                <span className="stat-label">Rating</span>
                <span className="stat-value">{hotel.basicInfo.starRating}⭐</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="hotel-content">
        {/* Description */}
        <section className="hotel-description">
          <h2>About This Hotel</h2>
          {isEditing ? (
            <textarea
              className="edit-description"
              value={editFormData.basicInfo?.description || ''}
              onChange={(e) => handleInputChange('basicInfo', 'description', e.target.value)}
              placeholder="Hotel description..."
              rows={4}
            />
          ) : (
            <p>{hotel.basicInfo.description}</p>
          )}
        </section>

        {/* Amenities */}
        <section className="hotel-amenities">
          <h2>Amenities</h2>
          {isEditing ? (
            <div className="amenities-edit-grid">
              {availableAmenities.map((amenity) => (
                <label key={amenity} className="amenity-checkbox">
                  <input
                    type="checkbox"
                    checked={editFormData.amenities?.includes(amenity)}
                    onChange={() => handleAmenityToggle(amenity)}
                  />
                  <span className="checkmark"></span>
                  <div className="amenity-item">
                    {amenityIcons[amenity] || <Coffee size={20} />}
                    <span>{amenity}</span>
                  </div>
                </label>
              ))}
            </div>
          ) : (
            <div className="amenities-grid">
              {hotel.amenities.map((amenity, index) => (
                <div key={index} className="amenity-item">
                  {amenityIcons[amenity] || <Coffee size={20} />}
                  <span>{amenity}</span>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Room Types */}
        <section className="hotel-rooms">
          <div className="section-header-with-action">
            <h2>Room Types & Pricing</h2>
            {isEditing && (
              <button className="add-room-btn" onClick={handleAddRoomType}>
                <Plus size={20} />
                Add Room Type
              </button>
            )}
          </div>
          <div className="rooms-grid">
            {(isEditing ? editFormData.roomTypes : hotel.roomTypes).map((room, index) => (
              <div key={index} className="room-card">
                {isEditing ? (
                  <div className="room-edit-form">
                    <div className="room-edit-header">
                      <input
                        type="text"
                        className="edit-room-type"
                        value={room.roomType}
                        onChange={(e) => handleRoomTypeChange(index, 'roomType', e.target.value)}
                        placeholder="Room Type"
                      />
                      {editFormData.roomTypes.length > 1 && (
                        <button 
                          className="remove-room-btn"
                          onClick={() => handleRemoveRoomType(index)}
                        >
                          <Trash2 size={16} />
                        </button>
                      )}
                    </div>
                    <div className="room-edit-details">
                      <div className="edit-group">
                        <label>Price per night (₹)</label>
                        <input
                          type="number"
                          value={room.pricePerNight}
                          onChange={(e) => handleRoomTypeChange(index, 'pricePerNight', e.target.value)}
                          placeholder="Price"
                        />
                      </div>
                      <div className="edit-group">
                        <label>Max Guests</label>
                        <input
                          type="number"
                          value={room.maxGuests}
                          onChange={(e) => handleRoomTypeChange(index, 'maxGuests', e.target.value)}
                          placeholder="Max guests"
                        />
                      </div>
                    </div>
                  </div>
                ) : (
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
                )}
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
                {isEditing ? (
                  <input
                    type="tel"
                    className="edit-contact"
                    value={editFormData.contactInfo?.phone || ''}
                    onChange={(e) => handleInputChange('contactInfo', 'phone', e.target.value)}
                    placeholder="Phone number"
                  />
                ) : (
                  <span className="contact-value">{hotel.contactInfo.phone}</span>
                )}
              </div>
            </div>
            <div className="contact-item">
              <Mail size={20} />
              <div>
                <span className="contact-label">Email</span>
                {isEditing ? (
                  <input
                    type="email"
                    className="edit-contact"
                    value={editFormData.contactInfo?.email || ''}
                    onChange={(e) => handleInputChange('contactInfo', 'email', e.target.value)}
                    placeholder="Email address"
                  />
                ) : (
                  <span className="contact-value">{hotel.contactInfo.email}</span>
                )}
              </div>
            </div>
            <div className="contact-item">
              <Clock size={20} />
              <div>
                <span className="contact-label">Check-in</span>
                {isEditing ? (
                  <input
                    type="time"
                    className="edit-contact"
                    value={editFormData.contactInfo?.checkInTime || ''}
                    onChange={(e) => handleInputChange('contactInfo', 'checkInTime', e.target.value)}
                  />
                ) : (
                  <span className="contact-value">{hotel.contactInfo.checkInTime}</span>
                )}
              </div>
            </div>
            <div className="contact-item">
              <Clock size={20} />
              <div>
                <span className="contact-label">Check-out</span>
                {isEditing ? (
                  <input
                    type="time"
                    className="edit-contact"
                    value={editFormData.contactInfo?.checkOutTime || ''}
                    onChange={(e) => handleInputChange('contactInfo', 'checkOutTime', e.target.value)}
                  />
                ) : (
                  <span className="contact-value">{hotel.contactInfo.checkOutTime}</span>
                )}
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default VendorHotelView;