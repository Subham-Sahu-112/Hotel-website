import React from 'react';
import './SearchBar.css';

export default function SearchBar() {
  return (
    <div className="search-bar">
      <div className="search-input-container">
        <span className="search-icon">🔍</span>
        <input
          type="text"
          placeholder="Search suppliers, listings, or bookings..."
          className="search-input"
        />
      </div>
    </div>
  );
}