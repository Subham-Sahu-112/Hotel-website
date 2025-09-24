import React, { useState } from "react";
import VendorLayout from "./VendorLayout";
import "./Pricing.css";

const Pricing = () => {
  const [selectedProperty, setSelectedProperty] = useState("all");
  const [activeTab, setActiveTab] = useState("rates");
  const [isAddRateModalOpen, setIsAddRateModalOpen] = useState(false);

  const properties = [
    { id: 1, name: "Sunset Villa Resort" },
    { id: 2, name: "Ocean View Hotel" },
    { id: 3, name: "Mountain Lodge" },
    { id: 4, name: "City Center Suites" },
  ];

  const roomRates = [
    {
      id: 1,
      property: "Sunset Villa Resort",
      roomType: "Deluxe Ocean View",
      baseRate: 450,
      weekendRate: 550,
      seasonalRate: 650,
      currency: "USD",
      occupancy: 2,
      lastUpdated: "2024-01-15",
    },
    {
      id: 2,
      property: "Ocean View Hotel",
      roomType: "Standard Room",
      baseRate: 320,
      weekendRate: 380,
      seasonalRate: 420,
      currency: "USD",
      occupancy: 2,
      lastUpdated: "2024-01-10",
    },
    {
      id: 3,
      property: "Mountain Lodge",
      roomType: "Family Suite",
      baseRate: 280,
      weekendRate: 320,
      seasonalRate: 380,
      currency: "USD",
      occupancy: 4,
      lastUpdated: "2024-01-12",
    },
    {
      id: 4,
      property: "City Center Suites",
      roomType: "Executive Suite",
      baseRate: 380,
      weekendRate: 450,
      seasonalRate: 520,
      currency: "USD",
      occupancy: 2,
      lastUpdated: "2024-01-18",
    },
  ];

  const specialOffers = [
    {
      id: 1,
      title: "Early Bird Special",
      description: "Book 30 days in advance and save 20%",
      discount: 20,
      discountType: "percentage",
      validFrom: "2024-01-01",
      validTo: "2024-12-31",
      properties: ["Sunset Villa Resort", "Ocean View Hotel"],
      status: "active",
    },
    {
      id: 2,
      title: "Weekend Getaway",
      description: "Special weekend package with breakfast included",
      discount: 50,
      discountType: "fixed",
      validFrom: "2024-01-15",
      validTo: "2024-03-15",
      properties: ["Mountain Lodge"],
      status: "active",
    },
    {
      id: 3,
      title: "Long Stay Discount",
      description: "Stay 7+ nights and get 15% off",
      discount: 15,
      discountType: "percentage",
      validFrom: "2024-02-01",
      validTo: "2024-06-30",
      properties: ["City Center Suites"],
      status: "inactive",
    },
  ];

  const seasonalPricing = [
    {
      id: 1,
      name: "Peak Season",
      startDate: "2024-06-01",
      endDate: "2024-08-31",
      multiplier: 1.5,
      description: "Summer peak season rates",
    },
    {
      id: 2,
      name: "Holiday Season",
      startDate: "2024-12-20",
      endDate: "2025-01-05",
      multiplier: 1.8,
      description: "Holiday and New Year rates",
    },
    {
      id: 3,
      name: "Off Season",
      startDate: "2024-01-15",
      endDate: "2024-03-15",
      multiplier: 0.8,
      description: "Winter off-season discount",
    },
  ];

  const filteredRates =
    selectedProperty === "all"
      ? roomRates
      : roomRates.filter((rate) => rate.property === selectedProperty);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const getStatusColor = (status) => {
    return status === "active" ? "#10b981" : "#6b7280";
  };

  return (
    <VendorLayout>
      <div className="pricing">
        {/* Header */}
        <div className="pricing-header">
          <div className="header-left">
            <h1 className="pricing-title">Pricing Management</h1>
            <p className="pricing-subtitle">
              Manage room rates, seasonal pricing, and special offers
            </p>
          </div>
          <div className="header-actions">
            <button
              className="add-rate-btn"
              onClick={() => setIsAddRateModalOpen(true)}
            >
              + Add Rate
            </button>
          </div>
        </div>

        {/* Property Filter */}
        <div className="property-filter">
          <select
            value={selectedProperty}
            onChange={(e) => setSelectedProperty(e.target.value)}
            className="property-select"
          >
            <option value="all">All Properties</option>
            {properties.map((property) => (
              <option key={property.id} value={property.name}>
                {property.name}
              </option>
            ))}
          </select>
        </div>

        {/* Summary Stats */}
        <div className="pricing-stats">
          <div className="stat-card">
            <div className="stat-icon">💰</div>
            <div className="stat-info">
              <div className="stat-number">
                $
                {Math.round(
                  roomRates.reduce((sum, rate) => sum + rate.baseRate, 0) /
                    roomRates.length
                )}
              </div>
              <div className="stat-label">Avg. Base Rate</div>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">📊</div>
            <div className="stat-info">
              <div className="stat-number">{roomRates.length}</div>
              <div className="stat-label">Room Types</div>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">🎯</div>
            <div className="stat-info">
              <div className="stat-number">
                {specialOffers.filter((o) => o.status === "active").length}
              </div>
              <div className="stat-label">Active Offers</div>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">📅</div>
            <div className="stat-info">
              <div className="stat-number">{seasonalPricing.length}</div>
              <div className="stat-label">Seasonal Rules</div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="pricing-tabs">
          <button
            className={`tab ${activeTab === "rates" ? "active" : ""}`}
            onClick={() => setActiveTab("rates")}
          >
            Room Rates
          </button>
          <button
            className={`tab ${activeTab === "seasonal" ? "active" : ""}`}
            onClick={() => setActiveTab("seasonal")}
          >
            Seasonal Pricing
          </button>
          <button
            className={`tab ${activeTab === "offers" ? "active" : ""}`}
            onClick={() => setActiveTab("offers")}
          >
            Special Offers
          </button>
        </div>

        {/* Tab Content */}
        {activeTab === "rates" && (
          <div className="tab-content">
            <div className="rates-grid">
              {filteredRates.map((rate) => (
                <div key={rate.id} className="rate-card">
                  <div className="rate-header">
                    <div className="rate-info">
                      <h3 className="room-type">{rate.roomType}</h3>
                      <p className="property-name">{rate.property}</p>
                    </div>
                    <div className="occupancy-info">
                      👥 {rate.occupancy} guests
                    </div>
                  </div>

                  <div className="rate-pricing">
                    <div className="price-item">
                      <span className="price-label">Base Rate</span>
                      <span className="price-value">
                        ${rate.baseRate}/night
                      </span>
                    </div>
                    <div className="price-item">
                      <span className="price-label">Weekend</span>
                      <span className="price-value">
                        ${rate.weekendRate}/night
                      </span>
                    </div>
                    <div className="price-item">
                      <span className="price-label">Peak Season</span>
                      <span className="price-value">
                        ${rate.seasonalRate}/night
                      </span>
                    </div>
                  </div>

                  <div className="rate-footer">
                    <span className="last-updated">
                      Updated: {formatDate(rate.lastUpdated)}
                    </span>
                    <div className="rate-actions">
                      <button className="action-btn edit-btn">Edit</button>
                      <button className="action-btn copy-btn">Copy</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "seasonal" && (
          <div className="tab-content">
            <div className="seasonal-header">
              <h2>Seasonal Pricing Rules</h2>
              <button className="add-season-btn">+ Add Season</button>
            </div>
            <div className="seasonal-list">
              {seasonalPricing.map((season) => (
                <div key={season.id} className="seasonal-card">
                  <div className="seasonal-info">
                    <h3 className="season-name">{season.name}</h3>
                    <p className="season-description">{season.description}</p>
                    <div className="season-dates">
                      📅 {formatDate(season.startDate)} -{" "}
                      {formatDate(season.endDate)}
                    </div>
                  </div>
                  <div className="seasonal-multiplier">
                    <span className="multiplier-label">Rate Multiplier</span>
                    <span className="multiplier-value">
                      {season.multiplier}x
                      <span className="multiplier-percentage">
                        ({((season.multiplier - 1) * 100).toFixed(0)}%)
                      </span>
                    </span>
                  </div>
                  <div className="seasonal-actions">
                    <button className="action-btn edit-btn">Edit</button>
                    <button className="action-btn delete-btn">Delete</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "offers" && (
          <div className="tab-content">
            <div className="offers-header">
              <h2>Special Offers & Promotions</h2>
              <button className="add-offer-btn">+ Create Offer</button>
            </div>
            <div className="offers-grid">
              {specialOffers.map((offer) => (
                <div key={offer.id} className="offer-card">
                  <div className="offer-header">
                    <div className="offer-title-section">
                      <h3 className="offer-title">{offer.title}</h3>
                      <span
                        className="offer-status"
                        style={{
                          backgroundColor: getStatusColor(offer.status),
                        }}
                      >
                        {offer.status}
                      </span>
                    </div>
                  </div>

                  <p className="offer-description">{offer.description}</p>

                  <div className="offer-details">
                    <div className="discount-info">
                      <span className="discount-value">
                        {offer.discountType === "percentage"
                          ? `${offer.discount}%`
                          : `$${offer.discount}`}
                      </span>
                      <span className="discount-label">
                        {offer.discountType === "percentage"
                          ? "OFF"
                          : "DISCOUNT"}
                      </span>
                    </div>

                    <div className="offer-validity">
                      <div className="validity-item">
                        <span className="validity-label">Valid From:</span>
                        <span>{formatDate(offer.validFrom)}</span>
                      </div>
                      <div className="validity-item">
                        <span className="validity-label">Valid To:</span>
                        <span>{formatDate(offer.validTo)}</span>
                      </div>
                    </div>

                    <div className="applicable-properties">
                      <span className="properties-label">Applicable to:</span>
                      <div className="properties-list">
                        {offer.properties.map((property, index) => (
                          <span key={index} className="property-tag">
                            {property}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="offer-actions">
                    <button className="action-btn edit-btn">Edit</button>
                    <button className="action-btn duplicate-btn">
                      Duplicate
                    </button>
                    <button className="action-btn delete-btn">Delete</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Add Rate Modal */}
      {isAddRateModalOpen && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h2>Add New Room Rate</h2>
              <button
                className="modal-close"
                onClick={() => setIsAddRateModalOpen(false)}
              >
                ✕
              </button>
            </div>
            <div className="modal-content">
              <form className="rate-form">
                <div className="form-row">
                  <div className="form-group">
                    <label>Property</label>
                    <select>
                      {properties.map((property) => (
                        <option key={property.id} value={property.name}>
                          {property.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Room Type</label>
                    <input type="text" placeholder="Enter room type" />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Base Rate ($)</label>
                    <input type="number" placeholder="0" />
                  </div>
                  <div className="form-group">
                    <label>Weekend Rate ($)</label>
                    <input type="number" placeholder="0" />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Seasonal Rate ($)</label>
                    <input type="number" placeholder="0" />
                  </div>
                  <div className="form-group">
                    <label>Max Occupancy</label>
                    <input type="number" placeholder="2" />
                  </div>
                </div>

                <div className="form-actions">
                  <button
                    type="button"
                    className="cancel-btn"
                    onClick={() => setIsAddRateModalOpen(false)}
                  >
                    Cancel
                  </button>
                  <button type="submit" className="submit-btn">
                    Add Rate
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

export default Pricing;
