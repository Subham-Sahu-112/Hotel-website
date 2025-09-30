import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./BrowseAndExplore.css";

export default function BrowseAndExplore() {
  const navigate = useNavigate();
  const [currentPropertySlide, setCurrentPropertySlide] = useState(0);
  const [currentExploreSlide, setCurrentExploreSlide] = useState(0);

  const propertyTypes = [
    {
      id: 1,
      name: "Hotels",
      image: "/hotel-1.jpeg"
    },
    {
      id: 2,
      name: "Apartments",
      image: "/hotel-2.jpeg"
    },
    {
      id: 3,
      name: "Resorts",
      image: "/hotel-3.jpeg"
    },
    {
      id: 4,
      name: "Villas",
      image: "/hotel-4.jpeg"
    }
  ];

  const exploreDestinations = [
    {
      id: 1,
      name: "New Delhi",
      properties: "3,879 properties",
      image: "/delhi.jpg"
    },
    {
      id: 2,
      name: "Bangalore",
      properties: "3,188 properties",
      image: "/banglore.jpg"
    },
    {
      id: 3,
      name: "Mumbai",
      properties: "1,930 properties",
      image: "/mumbai.jpg"
    },
    {
      id: 4,
      name: "Chennai",
      properties: "1,332 properties",
      image: "/chennai.jpg"
    },
    {
      id: 5,
      name: "Hyderabad",
      properties: "1,815 properties",
      image: "/hyderabad.jpg"
    },
  ];

  const handlePropertyNext = () => {
    setCurrentPropertySlide((prev) => 
      prev + 1 >= Math.ceil(propertyTypes.length / 4) ? 0 : prev + 1
    );
  };

  const handlePropertyPrev = () => {
    setCurrentPropertySlide((prev) => 
      prev - 1 < 0 ? Math.ceil(propertyTypes.length / 4) - 1 : prev - 1
    );
  };

  const handleExploreNext = () => {
    setCurrentExploreSlide((prev) => 
      prev + 1 >= Math.ceil(exploreDestinations.length / 6) ? 0 : prev + 1
    );
  };

  const handleExplorePrev = () => {
    setCurrentExploreSlide((prev) => 
      prev - 1 < 0 ? Math.ceil(exploreDestinations.length / 6) - 1 : prev - 1
    );
  };

  const handlePropertyClick = (propertyName) => {
    if (propertyName === 'Hotels') {
      navigate('/all-hotels');
    }
  };

  return (
    <section className="browse-and-explore">
      <div className="browse-explore-container">
        
        {/* Browse by Property Type Section */}
        <div className="property-type-section">
          <div className="section-header">
            <h2 className="section-title">Browse by property type</h2>
            <div className="carousel-controls">
              <button 
                className="carousel-btn prev-btn" 
                onClick={handlePropertyPrev}
                aria-label="Previous properties"
              > 
                ‹
              </button>
              <button 
                className="carousel-btn next-btn" 
                onClick={handlePropertyNext}
                aria-label="Next properties"
              >
                ›
              </button>
            </div>
          </div>
          
          <div className="property-types-grid">
            {propertyTypes.map((property) => (
              <div 
                key={property.id} 
                className="property-type-card"
                onClick={() => handlePropertyClick(property.name)}
                style={{ cursor: 'pointer' }}
              >
                <img 
                  src={property.image} 
                  alt={property.name} 
                  className="property-type-image" 
                />
                <div className="property-type-info">
                  <h3 className="property-type-name">{property.name}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Explore India Section */}
        <div className="explore-section">
          <div className="section-header">
            <div className="section-header-text">
              <h2 className="section-title">Explore India</h2>
              <p className="section-subtitle">These popular destinations have a lot to offer</p>
            </div>
            <div className="carousel-controls">
              <button 
                className="carousel-btn prev-btn" 
                onClick={handleExplorePrev}
                aria-label="Previous destinations"
              >
                ‹
              </button>
              <button 
                className="carousel-btn next-btn" 
                onClick={handleExploreNext}
                aria-label="Next destinations"
              >
                ›
              </button>
            </div>
          </div>
          
          <div className="explore-destinations-grid">
            {exploreDestinations.map((destination) => (
              <div key={destination.id} className="explore-destination-card">
                <img 
                  src={destination.image} 
                  alt={destination.name} 
                  className="explore-destination-image" 
                />
                <div className="explore-destination-info">
                  <h3 className="explore-destination-name">{destination.name}</h3>
                  <p className="explore-destination-properties">{destination.properties}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        
      </div>
    </section>
  );
}