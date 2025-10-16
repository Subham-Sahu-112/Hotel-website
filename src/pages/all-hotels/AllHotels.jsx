import React, { useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import "./AllHotels.css";
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
  const [searchParams] = useSearchParams();
  const [hotelData, setHotelData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  
  // Get search parameters from URL
  const locationParam = searchParams.get("location") || "";
  const checkInParam = searchParams.get("checkIn") || "";
  const checkOutParam = searchParams.get("checkOut") || "";
  const guestsParam = searchParams.get("guests") || "";

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
          maxGuests: Math.max(...hotel.roomTypes.map(room => room.maxGuests || 2)),
        }));

        setHotelData(mappedData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchProperties();
  }, []);

  // Update searchQuery when locationParam changes
  useEffect(() => {
    if (locationParam) {
      setSearchQuery(locationParam);
    }
  }, [locationParam]);

  const filteredProperties = hotelData.filter((property) => {
    // Location search filter
    const matchesSearch =
      property.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      property.location?.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Status filter
    const matchesFilter =
      filterStatus === "all" || property.status === filterStatus;
    
    // Guest count filter (if provided in search params)
    const matchesGuests = !guestsParam || property.maxGuests >= parseInt(guestsParam);
    
    return matchesSearch && matchesFilter && matchesGuests;
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

          {/* Search Summary */}
          {locationParam && (
            <div className="search-summary">
              <h3 className="search-summary-title">
                Search Results for "{locationParam}"
              </h3>
              <div className="search-summary-details">
                {checkInParam && checkOutParam && (
                  <div className="search-detail-item">
                    <Calendar size={16} />
                    <span>
                      {new Date(checkInParam).toLocaleDateString()} - {new Date(checkOutParam).toLocaleDateString()}
                    </span>
                  </div>
                )}
                {guestsParam && (
                  <div className="search-detail-item">
                    <Users size={16} />
                    <span>{guestsParam} {parseInt(guestsParam) === 1 ? 'guest' : 'guests'}</span>
                  </div>
                )}
                <div className="search-detail-item">
                  <MapPin size={16} />
                  <span>{filteredProperties.length} {filteredProperties.length === 1 ? 'hotel' : 'hotels'} found</span>
                </div>
              </div>
            </div>
          )}

          {/* Hotels Section */}
          <section className="hotels-section">
            <div className="hot-section-header">
              <div className="header-1">
                <h2 className="hot-section-title">
                  {locationParam ? `Hotels in ${locationParam}` : 'Last-minute hotels near you'}
                </h2>
                <p className="hot-section-subtitle">
                  {locationParam 
                    ? `Showing ${filteredProperties.length} available properties`
                    : 'Find a great deal on a hotel for tonight or an upcoming trip'
                  }
                </p>
              </div>
            </div>

            {/* Properties Grid */}
            <div className="hot-properties-grid">
              {filteredProperties.length > 0 ? (
                filteredProperties.map((property) => (
                  <div
                    key={property.id}
                    className="hot-property-card"
                    onClick={() => handleViewHotel(property.id)}
                  >
                    <div className="hot-property-image">
                      <img src={property.image} alt={property.name} />
                      <div className="hot-property-status">
                        <span
                          className="hot-status-badge"
                          style={{
                            backgroundColor: getStatusColor(property.status),
                          }}
                        >
                          {property.status}
                        </span>
                      </div>
                    </div>
                    <div className="hot-property-content">
                      <div className="hot-property-heading">
                        <h3 className="prop-property-name">{property.name}</h3>
                        <div className="hot-property-rating">
                          ⭐ {property.rating}
                        </div>
                      </div>
                      <p className="hot-property-location">
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
