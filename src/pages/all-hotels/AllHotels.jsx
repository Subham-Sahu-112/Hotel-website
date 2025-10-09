import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./AllHotels.css";
import Loading from "../../components/Loading";
import {
  Search,
  Calendar,
  Users,
  MapPin,
  Star,
  Heart,
  Wifi,
  Car,
  Coffee,
} from "lucide-react";
import Navbar from "../../layouts/Navbar";
import HeroSection from "../landing/components/HeroSection";

const AllHotels = () => {
  const navigate = useNavigate();
  const [hotelData, setHotelData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [isLoading, setIsLoading] = useState(true);
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    const fetchProperties = async () => {
      setIsLoading(true);
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

        setHotelData(mappedData);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProperties();
  }, []);

  const filteredProperties = hotelData.filter((property) => {
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

  const handleViewHotel = (hotelId) => {
    navigate(`/hotel/${hotelId}`);
  };

  return (
    <div className="all-hotels">
      <Navbar />
      {/* Hero Section */}
      <HeroSection />

      {/* Main Content */}
      <main className="hotels-main">
        <div className="hotels-container">
          {/* Breadcrumb */}
          <div className="breadcrumb">
            <Link to="/" className="breadcrumb-link">
              Back
            </Link>
          </div>

          {/* Hotels Section */}
          <section className="hotels-section">
            <div className="section-header">
              <div className="header-1">
                <h2 className="section-title">Last-minute hotels near you</h2>
                <p className="section-subtitle">
                  Find a great deal on a hotel for tonight or an upcoming trip
                </p>
              </div>
              <div className="time-filters">
                <button className="time-filter-btn active">
                  Hotels for tonight
                </button>
                <button className="time-filter-btn">
                  Hotels for this weekend
                </button>
              </div>
            </div>

            {/* Properties Grid */}
            <div className="properties-grid">
              {filteredProperties.length > 0 ? (
                filteredProperties.map((property) => (
                  <div
                    key={property.id}
                    className="property-card"
                    onClick={() => handleViewHotel(property.id)}
                  >
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
                        <div className="property-rating">
                          ⭐ {property.rating}
                        </div>
                      </div>
                      <p className="property-location">
                        📍 {property.location}
                      </p>
                      {property.rooms.map((room, idx) => (
                        <p key={idx} className="property-room-type">
                          {room.roomType} - ₹{property.price}/night
                        </p>
                      ))}
                      {property.rooms.map((room, idx) => (
                        <p key={idx} className="property-rooms">
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
                        <button 
                          className="prop-action-btn view-btn"
                          onClick={() => handleViewHotel(property.id)}
                        >
                          View
                        </button>
                        <button className="prop-action-btn edit-btn">
                          Edit
                        </button>
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
          </section>
        </div>
      </main>
    </div>
  );
};

export default AllHotels;
