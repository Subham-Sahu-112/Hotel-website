import React, { useState, useEffect } from "react";
import VendorLayout from "./VendorLayout";
import "./Properties.css";
import { useNavigate } from "react-router-dom";

const Properties = () => {
  const navigate = useNavigate();
  const [propertiesData, setPropertiesData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const res = await fetch("http://localhost:1000/all-hotels");
        if (!res.ok) throw new Error("Failed to fetch properties");
        const data = await res.json();
        console.log("Fetched data:", data);

        // Map backend data to frontend-friendly structure
        const mappedData = data.map((hotel) => ({
          id: hotel._id,
          name: hotel.basicInfo.hotelName,
          location: hotel.basicInfo.city,
          status: "active", // default if not stored in DB
          amenities: hotel.amenities || [],
          image: hotel.images.mainImage,
          rooms: hotel.roomTypes,
          price: hotel.roomTypes[0]?.pricePerNight || 0,
          bookings: 0, // if you track bookings later
          type: hotel.roomTypes[0]?.roomType || "standard",
          rating: hotel.basicInfo.starRating || 0,
        }));

        setPropertiesData(mappedData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchProperties();
  }, []);

  useEffect(() => {
    console.log("Properties Data:", propertiesData);
  }, [propertiesData]);

  const filteredProperties = propertiesData.filter((property) => {
    const matchesSearch =
      property.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      property.location?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter =
      filterStatus === "all" || property.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case "active":
        return "#10b981";
      case "inactive":
        return "#f59e0b";
      default:
        return "#6b7280";
    }
  };

  return (
    <VendorLayout>
      <div className="properties">
        {/* Header */}
        <div className="properties-header">
          <div className="header-left">
            <h1 className="properties-title">Properties</h1>
            <p className="properties-subtitle">
              Manage your hotel properties and listings
            </p>
          </div>
          <button
            className="add-property-btn"
            onClick={() => navigate("/add-listings")}
          >
            + Add Property
          </button>
        </div>

        {/* Filters */}
        <div className="properties-filters">
          <input
            type="text"
            placeholder="Search properties..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="prop-search-input"
          />
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="prop-filter-select"
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>

        {/* Stats */}
        <div className="properties-stats">
          <div className="prop-stat-card">
            <div className="prop-stat-icon">🏨</div>
            <div className="prop-stat-info">
              <div className="prop-stat-number">{propertiesData.length}</div>
              <div className="prop-stat-label">Total Properties</div>
            </div>
          </div>
        </div>

        {/* Properties Grid */}
        <div className="properties-grid">
          {filteredProperties.length > 0 ? (
            filteredProperties.map((property) => (
              <div key={property.id} className="property-card">
                <div className="property-image">
                  <img src={property.image} alt={property.name} />
                  <div className="property-status">
                    <span
                      className="status-badge"
                      style={{
                        backgroundColor: getStatusColor(property.status),
                      }}
                    >
                      {property.status}
                    </span>
                  </div>
                </div>
                <div className="property-content">
                  <div className="property-heading">
                    <h3 className="prop-property-name">{property.name}</h3>
                    <div className="property-rating">⭐ {property.rating}</div>
                  </div>
                  <p className="property-location">📍 {property.location}</p>
                  {property.rooms.map((room) => (
                    <p className="property-room-type">
                      {room.roomType} - ₹{property.price}/night
                    </p>
                  ))}
                  {property.rooms.map((room) => (
                    <p className="property-rooms">
                      {property.rooms.length} {room.roomType}{" "}
                      {property.rooms.length === 1 ? "room" : "rooms"}
                    </p>
                  ))}

                  <div className="property-amenities">
                    {(property.amenities || []).map((amenity, index) => (
                      <span key={index} className="amenity-badge">
                        {amenity}
                      </span>
                    ))}
                  </div>

                  <div className="property-actions">
                    <button className="prop-action-btn view-btn">View</button>
                    <button className="prop-action-btn edit-btn">Edit</button>
                    <button className="prop-action-btn delete-btn">
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="empty-state">
              <div className="empty-icon">🏨</div>
              <h3>No properties found</h3>
              <p>Try adjusting your search or filters</p>
            </div>
          )}
        </div>
      </div>
    </VendorLayout>
  );
};

export default Properties;
