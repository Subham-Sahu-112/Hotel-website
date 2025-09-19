import './PromotionalCards.css';

export default function PromotionalCards() {
  const promoCards = [
    {
      id: 1,
      title: "Stay 10 nights, get 1 reward night",
      description: "Search stays",
      image: "🏨",
      bgColor: "#f8e8d6",
      buttonText: "Search stays",
      arrow: "→"
    },
    {
      id: 2,
      title: "Plans change. Book a stay with flexibility to cancel at any time",
      description: "Book now",
      image: "🏪",
      bgColor: "#e8f4f8",
      buttonText: "Book now",
      arrow: "→"
    },
    {
      id: 3,
      title: "Compare hotels side-by-side to find the right one for you",
      description: "Compare hotels",
      image: "🏖️",
      bgColor: "#e8f8e8",
      buttonText: "Compare hotels",
      arrow: "→"
    }
  ];

  return (
    <section className="promotional-cards">
      <div className="cards-container">
        {promoCards.map((card) => (
          <div key={card.id} className="promo-card" style={{ backgroundColor: card.bgColor }}>
            <div className="card-content">
              <div className="card-text">
                <h3 className="card-title">{card.title}</h3>
                <button className="card-button">
                  {card.buttonText} {card.arrow}
                </button>
              </div>
              <div className="card-image">
                <div className="image-placeholder">
                  <span className="image-icon">{card.image}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}