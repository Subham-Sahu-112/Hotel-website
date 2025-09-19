import { useState } from "react";
import "./OffersSection.css";

export default function OffersSection() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const offers = [
    {
      type: "quick-escape",
      title: "Quick escape, quality time",
      description: "Save up to 20% with a Getaway Deal",
      buttonText: "Save on stays",
      image: "/api/placeholder/200/150"
    },
    {
      type: "late-escape",
      badge: "Late Escape Deals",
      title: "Go for a good time, not a long time",
      description: "Squeeze out the last bit of sun with at least 15% off",
      buttonText: "Find deals",
      backgroundImage: "/api/placeholder/400/200"
    }
  ];

  const handleDotClick = (index) => {
    setCurrentSlide(index);
  };

  return (
    <section className="offers-section">
      <div className="offers-container">
        <div className="offers-header">
          <h2 className="offers-title">Offers</h2>
          <p className="offers-subtitle">Promotions, deals, and special offers for you</p>
        </div>
        
        <div className="offers-cards">
          <div className="offer-card quick-escape">
            <div className="offer-content">
              <h3 className="offer-title">Quick escape, quality time</h3>
              <p className="offer-description">Save up to 20% with a Getaway Deal</p>
              <button className="offer-button">Save on stays</button>
            </div>
            <div className="offer-image">
              <img src="/api/placeholder/200/150" alt="Couple enjoying vacation" />
            </div>
          </div>
          
          <div className="offer-card late-escape">
            <div className="offer-content">
              <div className="offer-badge">Late Escape Deals</div>
              <h3 className="offer-title">Go for a good time, not a long time</h3>
              <p className="offer-description">
                Squeeze out the last bit of sun with at least <span className="highlight">15% off</span>
              </p>
              <button className="offer-button">Find deals</button>
            </div>
            <div className="offer-background"></div>
          </div>
        </div>
        
        <div className="offers-navigation">
          <span 
            className={`nav-dot ${currentSlide === 0 ? 'active' : ''}`}
            onClick={() => handleDotClick(0)}
          ></span>
          <span 
            className={`nav-dot ${currentSlide === 1 ? 'active' : ''}`}
            onClick={() => handleDotClick(1)}
          ></span>
        </div>
      </div>
    </section>
  );
}