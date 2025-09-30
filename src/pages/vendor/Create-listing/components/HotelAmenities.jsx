import React from 'react';
import './HotelAmenities.css';

export default function HotelAmenities({ data, onChange }) {
  const amenitiesList = [
    { id: 'wifi', label: 'Free WiFi', icon: '📶' },
    { id: 'parking', label: 'Free Parking', icon: '🚗' },
    { id: 'breakfast', label: 'Breakfast Included', icon: '🍳' },
    { id: 'restaurant', label: 'Restaurant', icon: '🍽️' },
    { id: 'pool', label: 'Swimming Pool', icon: '🏊' },
    { id: 'fitness', label: 'Fitness Center', icon: '💪' }
  ];

  const handleAmenityChange = (amenityId) => {
    const updatedAmenities = data.includes(amenityId)
      ? data.filter(id => id !== amenityId)
      : [...data, amenityId];
    onChange(updatedAmenities);
  };

  return (
    <div className="amenities-container">
      <h2 className="section-title">Hotel Amenities</h2>

      <div className="amenities-grid">
        {amenitiesList.map((amenity) => (
          <div key={amenity.id} className="amenity-item">
            <input
              type="checkbox"
              id={amenity.id}
              checked={data.includes(amenity.id)}
              onChange={() => handleAmenityChange(amenity.id)}
              className="amenity-checkbox"
            />
            <label
              htmlFor={amenity.id}
              className="amenity-label"
            >
              <span className="amenity-icon">{amenity.icon}</span>
              {amenity.label}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
}