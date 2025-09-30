import React from 'react';
import './BasicInformation.css';

export default function BasicInformation({ data, onChange }) {
  const handleChange = (field, value) => {
    onChange({
      ...data,
      [field]: value
    });
  };

  const starRatingOptions = [
    { value: '', label: 'Select star rating' },
    { value: '1', label: '1 Star' },
    { value: '2', label: '2 Stars' },
    { value: '3', label: '3 Stars' },
    { value: '4', label: '4 Stars' },
    { value: '5', label: '5 Stars' }
  ];

  return (
    <div className="basic-info-container">
      <div className="basic-info-header">
        <div className="blue-dot"></div>
        <h2 className="basic-section-title">Basic Information</h2>
      </div>

      <div className="basic-form-grid-2">
        <div className="basic-form-field">
          <label className="basic-form-label">
            Hotel Name
          </label>
          <input
            type="text"
            placeholder="Enter hotel name"
            value={data.hotelName}
            onChange={(e) => handleChange('hotelName', e.target.value)}
            className="basic-form-input"
          />
        </div>

        <div className="basic-form-field">
          <label className="basic-form-label">
            Star Rating
          </label>
          <select
            value={data.starRating}
            onChange={(e) => handleChange('starRating', e.target.value)}
            className="basic-form-select"
          >
            {starRatingOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="form-field-full">
        <label className="basic-form-label">
          Description
        </label>
        <textarea
          placeholder="Describe your hotel, its unique features, and what makes it special..."
          value={data.description}
          onChange={(e) => handleChange('description', e.target.value)}
          rows={4}
          className="basic-form-textarea"
        />
      </div>

      <div className="basic-form-grid-3">
        <div className="basic-form-field">
          <label className="basic-form-label">
            Address
          </label>
          <input
            type="text"
            placeholder="Street address"
            value={data.address}
            onChange={(e) => handleChange('address', e.target.value)}
            className="basic-form-input"
          />
        </div>

        <div className="basic-form-field">
          <label className="basic-form-label">
            City
          </label>
          <input
            type="text"
            placeholder="City"
            value={data.city}
            onChange={(e) => handleChange('city', e.target.value)}
            className="basic-form-input"
          />
        </div>

        <div className="basic-form-field">
          <label className="basic-form-label">
            Country
          </label>
          <input
            type="text"
            placeholder="Country"
            value={data.country}
            onChange={(e) => handleChange('country', e.target.value)}
            className="basic-form-input"
          />
        </div>
      </div>
    </div>
  );
}