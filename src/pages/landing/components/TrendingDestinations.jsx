import "./TrendingDestinations.css";

export default function TrendingDestinations() {
  const destinations = [
    {
      id: 1,
      name: "New Delhi",
      flag: "🇮🇳",
      image: "/delhi.jpg",
      size: "large",
    },
    {
      id: 2,
      name: "Bangalore",
      flag: "🇮🇳",
      image: "/banglore.jpg",
      size: "large",
    },
    {
      id: 3,
      name: "Mumbai",
      flag: "🇮🇳",
      image: "/mumbai.jpg",
      size: "medium",
    },
    {
      id: 4,
      name: "Chennai",
      flag: "🇮🇳",
      image: "/chennai.jpg",
      size: "medium",
    },
    {
      id: 5,
      name: "Hyderabad",
      flag: "🇮🇳",
      image: "/hyderabad.jpg",
      size: "medium",
    },
  ];

  return (
    <section className="trending-destinations">
      <div className="trending-container">
        <div className="trending-header">
          <h2 className="trending-title">Trending destinations</h2>
          <p className="trending-subtitle">
            Most popular choices for travelers from India
          </p>
        </div>

        <div className="destinations-grid">
          {/* Large destination cards - Top row */}
          <div className="destination-row large-row">
            {destinations
              .filter((dest) => dest.size === "large")
              .map((destination) => (
                <div
                  key={destination.id}
                  className="destination-card large-card"
                >
                  <img
                    src={destination.image}
                    alt={destination.name}
                    className="destination-image"
                  />
                  <div className="destination-overlay">
                    <div className="destination-info">
                      <h3 className="destination-name">
                        {destination.name}{" "}
                        <span className="destination-flag">
                          {destination.flag}
                        </span>
                      </h3>
                    </div>
                  </div>
                </div>
              ))}
          </div>

          {/* Medium destination cards - Bottom row */}
          <div className="destination-row medium-row">
            {destinations
              .filter((dest) => dest.size === "medium")
              .map((destination) => (
                <div
                  key={destination.id}
                  className="destination-card medium-card"
                >
                  <img
                    src={destination.image}
                    alt={destination.name}
                    className="destination-image"
                  />
                  <div className="destination-overlay">
                    <div className="destination-info">
                      <h3 className="destination-name">
                        {destination.name}{" "}
                        <span className="destination-flag">
                          {destination.flag}
                        </span>
                      </h3>
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
