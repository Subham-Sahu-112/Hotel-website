import { useState } from "react";
import "./TripPlannerAndDeals.css";

export default function TripPlannerAndDeals() {
  const [activeTab, setActiveTab] = useState("Cultural Exploration");
  const [currentTripSlide, setCurrentTripSlide] = useState(0);
  const [currentDealsSlide, setCurrentDealsSlide] = useState(0);

  const tripCategories = [
    "Cultural Exploration",
    "Food & Culinary",
    "Historical Tours", 
    "Festivals",
    "Yoga & Wellness",
    "Hill Stations",
    "Beach Holidays",
    "Adventure & Wildlife"
  ];

  const weekendDeals = [
    {
      id: 1,
      name: "Swarn Hotel",
      location: "Kolkata, India",
      rating: 9.4,
      ratingText: "Wonderful",
      reviews: "15 reviews",
      badge: "Genius",
      image: "/interior-1.jpg"
    },
    {
      id: 2,
      name: "Super Townhouse MVP Sector With Kailasagiri Hill View",
      location: "Visakhapatnam, India", 
      rating: 8.7,
      ratingText: "Excellent",
      reviews: "",
      badge: "Genius",
      image: "/interior-2.jpg"
    },
    {
      id: 3,
      name: "Collection O Manikarnika Sahi Near Jagannath Temple",
      location: "Puri, India",
      rating: 8.4,
      ratingText: "Very Good",
      reviews: "",
      badge: "Genius",
      image: "/interior-3.jpg"
    },
    {
      id: 4,
      name: "Super Hotel O Hiland Park Formerly Ayush Villa",
      location: "Kolkata, India",
      rating: 8.3,
      ratingText: "Review score",
      reviews: "",
      badge: "Genius",
      image: "/interior-4.jpg"
    }
  ];

  const handleDealsNext = () => {
    setCurrentDealsSlide((prev) => 
      prev + 1 >= Math.ceil(weekendDeals.length / 4) ? 0 : prev + 1
    );
  };

  const handleDealsPrev = () => {
    setCurrentDealsSlide((prev) => 
      prev - 1 < 0 ? Math.ceil(weekendDeals.length / 4) - 1 : prev - 1
    );
  };

  return (
    <section className="trip-planner-deals">
      <div className="trip-deals-container">

        {/* Weekend Deals Section */}
        <div className="weekend-deals-section">
          <div className="section-header">
            <div className="section-header-text">
              <h2 className="section-title">Deals for the weekend</h2>
              <p className="section-subtitle">Save on stays for September 26 - September 28</p>
            </div>
            <div className="carousel-controls">
              <button 
                className="carousel-btn prev-btn" 
                onClick={handleDealsPrev}
                aria-label="Previous deals"
              >
                ‹
              </button>
              <button 
                className="carousel-btn next-btn" 
                onClick={handleDealsNext}
                aria-label="Next deals"
              >
                ›
              </button>
            </div>
          </div>
          
          <div className="weekend-deals-grid">
            {weekendDeals.map((deal) => (
              <div key={deal.id} className="weekend-deal-card">
                <div className="deal-image-container">
                  <img 
                    src={deal.image} 
                    alt={deal.name} 
                    className="deal-image" 
                  />
                  <button className="favorite-btn" aria-label="Add to favorites">
                    ♡
                  </button>
                  <div className="deal-badge">{deal.badge}</div>
                </div>
                <div className="deal-info">
                  <h3 className="deal-name">{deal.name}</h3>
                  <p className="deal-location">{deal.location}</p>
                  <div className="deal-rating">
                    <span className="rating-score">{deal.rating}</span>
                    <div className="rating-details">
                      <span className="rating-text">{deal.ratingText}</span>
                      {deal.reviews && <span className="rating-reviews">{deal.reviews}</span>}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
      </div>
    </section>
  );
}