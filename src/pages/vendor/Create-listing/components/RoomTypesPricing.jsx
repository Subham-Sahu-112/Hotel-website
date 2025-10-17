import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import './RoomTypesPricing.css';
import { getApiEndpoint } from '../../../../config/apiConfig';

export default function RoomTypesPricing({ data, onChange }) {
  const [categories, setCategories] = useState([]);
  const [loadingCategories, setLoadingCategories] = useState(true);

  // Fetch categories from admin panel
  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await fetch(getApiEndpoint('/categories/active'));
      const result = await response.json();

      if (result.success) {
        setCategories(result.data);
      } else {
        toast.error('Failed to load room categories');
        console.error('Error loading categories:', result.message);
      }
    } catch (error) {
      console.error('Error fetching categories:', error);
      toast.error('Unable to load room categories');
    } finally {
      setLoadingCategories(false);
    }
  };

  // Build room type options from fetched categories
  const roomTypeOptions = [
    { value: '', label: loadingCategories ? 'Loading categories...' : 'Select room type' },
    ...categories.map(cat => ({
      value: cat.name.toLowerCase().replace(/\s+/g, '-'), // Convert "Deluxe Room" to "deluxe-room"
      label: cat.name
    }))
  ];

  const handleRoomChange = (index, field, value) => {
    const updatedRooms = data.map((room, i) => 
      i === index ? { ...room, [field]: value } : room
    );
    onChange(updatedRooms);
  };

  const addNewRoomType = () => {
    const newRoom = {
      id: Date.now(),
      roomType: '',
      pricePerNight: '',
      maxGuests: ''
    };
    onChange([...data, newRoom]);
  };

  const removeRoomType = (index) => {
    if (data.length > 1) {
      const updatedRooms = data.filter((_, i) => i !== index);
      onChange(updatedRooms);
    }
  };

  return (
    <div className="room-pricing-container">
      <h2 className="section-title">Room Types & Pricing</h2>

      {data.map((room, index) => (
        <div key={room.id} className="room-item">
          <div className="room-header">
            <h3 className="room-title">Room Type {index + 1}</h3>
            {data.length > 1 && (
              <button
                type="button"
                onClick={() => removeRoomType(index)}
                className="remove-button"
              >
                Remove
              </button>
            )}
          </div>

          <div className="room-grid">
            <div className="form-field">
              <label className="form-label">
                Room Type
              </label>
              <select
                value={room.roomType}
                onChange={(e) => handleRoomChange(index, 'roomType', e.target.value)}
                className="form-select"
                disabled={loadingCategories}
              >
                {roomTypeOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              {categories.length === 0 && !loadingCategories && (
                <p className="helper-text" style={{ color: '#f59e0b', fontSize: '12px', marginTop: '4px' }}>
                  No categories available. Contact admin to add room categories.
                </p>
              )}
            </div>

            <div className="form-field">
              <label className="form-label">
                Price per Night ($)
              </label>
              <input
                type="number"
                placeholder="99"
                value={room.pricePerNight}
                onChange={(e) => handleRoomChange(index, 'pricePerNight', e.target.value)}
                className="form-input"
              />
            </div>

            <div className="form-field">
              <label className="form-label">
                Max Guests
              </label>
              <input
                type="number"
                placeholder="2"
                value={room.maxGuests}
                onChange={(e) => handleRoomChange(index, 'maxGuests', e.target.value)}
                className="form-input"
              />
            </div>
          </div>

          {index < data.length - 1 && (
            <hr className="room-divider" />
          )}
        </div>
      ))}

      <button
        type="button"
        onClick={addNewRoomType}
        className="add-room-button"
      >
        <span className="plus-icon">+</span>
        Add Another Room Type
      </button>
    </div>
  );
}