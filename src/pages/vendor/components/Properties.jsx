import React, { useState } from 'react';
import VendorLayout from './VendorLayout';
import './Properties.css';

const Properties = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const properties = [
    {
      id: 1,
      name: 'Sunset Villa Resort',
      type: 'Villa',
      location: 'Maldives',
      status: 'active',
      rooms: 12,
      price: '$450/night',
      rating: 4.8,
      bookings: 156,
      image: '/property1.jpg'
    },
    {
      id: 2,
      name: 'Ocean View Hotel',
      type: 'Hotel',
      location: 'Miami Beach',
      status: 'active',
      rooms: 45,
      price: '$320/night',
      rating: 4.6,
      bookings: 89,
      image: '/property2.jpg'
    },
    {
      id: 3,
      name: 'Mountain Lodge',
      type: 'Lodge',
      location: 'Colorado',
      status: 'inactive',
      rooms: 8,
      price: '$280/night',
      rating: 4.5,
      bookings: 34,
      image: '/property3.jpg'
    },
    {
      id: 4,
      name: 'City Center Suites',
      type: 'Apartment',
      location: 'New York',
      status: 'active',
      rooms: 24,
      price: '$380/night',
      rating: 4.7,
      bookings: 112,
      image: '/property4.jpg'
    }
  ];

  const filteredProperties = properties.filter(property => {
    const matchesSearch = property.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         property.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filterStatus === 'all' || property.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'active':
        return '#10b981';
      case 'inactive':
        return '#f59e0b';
      default:
        return '#6b7280';
    }
  };

  return (
    <VendorLayout>
      <div className="properties">
        {/* Header */}
        <div className="properties-header">
          <div className="header-left">
            <h1 className="properties-title">Properties</h1>
            <p className="properties-subtitle">Manage your hotel properties and listings</p>
          </div>
          <button 
            className="add-property-btn"
            onClick={() => setIsAddModalOpen(true)}
          >
            + Add Property
          </button>
        </div>

        {/* Filters and Search */}
        <div className="properties-filters">
          <div className="search-container">
            <input
              type="text"
              placeholder="Search properties..."
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
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
        </div>

        {/* Properties Grid */}
        <div className="properties-grid">
          {filteredProperties.map((property) => (
            <div key={property.id} className="property-card">
              <div className="property-image">
                <img src={property.image} alt={property.name} />
                <div className="property-status">
                  <span 
                    className="status-badge"
                    style={{ backgroundColor: getStatusColor(property.status) }}
                  >
                    {property.status}
                  </span>
                </div>
              </div>
              
              <div className="property-content">
                <div className="property-header">
                  <h3 className="property-name">{property.name}</h3>
                  <div className="property-rating">
                    ⭐ {property.rating}
                  </div>
                </div>
                
                <div className="property-details">
                  <div className="property-type">{property.type}</div>
                  <div className="property-location">📍 {property.location}</div>
                  <div className="property-rooms">🛏️ {property.rooms} rooms</div>
                  <div className="property-price">{property.price}</div>
                </div>
                
                <div className="property-stats">
                  <div className="stat">
                    <span className="stat-label">Total Bookings</span>
                    <span className="stat-value">{property.bookings}</span>
                  </div>
                </div>
                
                <div className="property-actions">
                  <button className="action-btn view-btn">View</button>
                  <button className="action-btn edit-btn">Edit</button>
                  <button className="action-btn delete-btn">Delete</button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredProperties.length === 0 && (
          <div className="empty-state">
            <div className="empty-icon">🏨</div>
            <h3>No properties found</h3>
            <p>Try adjusting your search or filters</p>
          </div>
        )}

        {/* Stats Summary */}
        <div className="properties-stats">
          <div className="stat-card">
            <div className="stat-icon">🏨</div>
            <div className="stat-info">
              <div className="stat-number">{properties.length}</div>
              <div className="stat-label">Total Properties</div>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">✅</div>
            <div className="stat-info">
              <div className="stat-number">{properties.filter(p => p.status === 'active').length}</div>
              <div className="stat-label">Active Properties</div>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">🛏️</div>
            <div className="stat-info">
              <div className="stat-number">{properties.reduce((sum, p) => sum + p.rooms, 0)}</div>
              <div className="stat-label">Total Rooms</div>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">📊</div>
            <div className="stat-info">
              <div className="stat-number">{properties.reduce((sum, p) => sum + p.bookings, 0)}</div>
              <div className="stat-label">Total Bookings</div>
            </div>
          </div>
        </div>
      </div>

      {/* Add Property Modal */}
      {isAddModalOpen && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h2>Add New Property</h2>
              <button 
                className="modal-close"
                onClick={() => setIsAddModalOpen(false)}
              >
                ✕
              </button>
            </div>
            <div className="modal-content">
              <form className="property-form">
                <div className="form-group">
                  <label>Property Name</label>
                  <input type="text" placeholder="Enter property name" />
                </div>
                <div className="form-group">
                  <label>Property Type</label>
                  <select>
                    <option>Hotel</option>
                    <option>Villa</option>
                    <option>Lodge</option>
                    <option>Apartment</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Location</label>
                  <input type="text" placeholder="Enter location" />
                </div>
                <div className="form-group">
                  <label>Number of Rooms</label>
                  <input type="number" placeholder="Enter number of rooms" />
                </div>
                <div className="form-group">
                  <label>Price per Night</label>
                  <input type="text" placeholder="$0" />
                </div>
                <div className="form-actions">
                  <button type="button" className="cancel-btn" onClick={() => setIsAddModalOpen(false)}>
                    Cancel
                  </button>
                  <button type="submit" className="submit-btn">
                    Add Property
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </VendorLayout>
  );
};

export default Properties;