import React from 'react';
import './ContactInformation.css';

export default function ContactInformation({ data, onChange }) {
  const handleChange = (field, value) => {
    onChange({
      ...data,
      [field]: value
    });
  };

  return (
    <div className="contact-container">
      <h2 className="cont-section-title">Contact Information & Policies</h2>

      <div className="contact-grid-2">
        <div className="cont-form-field">
          <label className="cont-form-label">
            Contact Email
          </label>
          <input
            type="email"
            placeholder="hotel@example.com"
            value={data.email}
            onChange={(e) => handleChange('email', e.target.value)}
            className="cont-form-input"
          />
        </div>

        <div className="cont-form-field">
          <label className="cont-form-label">
            Contact Phone
          </label>
          <input
            type="tel"
            placeholder="+1 (555) 123-4567"
            value={data.phone}
            onChange={(e) => handleChange('phone', e.target.value)}
            className="cont-form-input"
          />
        </div>
      </div>

      <div className="cont-time-grid">
        <div className="cont-form-field">
          <label className="cont-form-label">
            Check-in Time
          </label>
          <div className="time-input-container">
            <input
              type="time"
              value={data.checkInTime}
              onChange={(e) => handleChange('checkInTime', e.target.value)}
              className="cont-time-input"
            />
            <div className="cont-time-icon">
              <svg className="cont-clock-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
        </div>

        <div className="cont-form-field">
          <label className="cont-form-label">
            Check-out Time
          </label>
          <div className="time-input-container">
            <input
              type="time"
              value={data.checkOutTime}
              onChange={(e) => handleChange('checkOutTime', e.target.value)}
              className="cont-time-input"
            />
            <div className="cont-time-icon">
              <svg className="cont-clock-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}