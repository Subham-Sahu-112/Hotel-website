import "./Footer.css";

export default function Footer() {
  const footerSections = {
    Support: [
      "Coronavirus (COVID-19) FAQs",
      "Manage your trips", 
      "Contact Customer Service",
      "Safety Resource Center"
    ],
    Discover: [
      "Genius loyalty program",
      "Seasonal and holiday deals",
      "Travel articles",
      "Booking.com for Business",
      "Traveller Review Awards",
      "Car rental",
      "Flight finder",
      "Restaurant reservations",
      "Booking.com for Travel Agents"
    ],
    "Terms and settings": [
      "Privacy & cookies",
      "Terms of Service", 
      "Accessibility Statement",
      "Grievance officer",
      "Modern Slavery Statement",
      "Human Rights Statement"
    ],
    Partners: [
      "Extranet login",
      "Partner help",
      "List your property",
      "Become an affiliate"
    ],
    About: [
      "About Booking.com",
      "How We Work",
      "Sustainability",
      "Press center",
      "Careers",
      "Investor relations",
      "Corporate contact"
    ]
  };

  const partnerLogos = [
    { name: "Booking.com", logo: "booking" },
    { name: "Priceline", logo: "priceline" },
    { name: "Kayak", logo: "kayak" },
    { name: "Agoda", logo: "agoda" },
    { name: "OpenTable", logo: "opentable" }
  ];

  return (
    <footer className="footer">
      <div className="footer-container">
        
        {/* Footer Links Grid */}
        <div className="footer-grid">
          {Object.entries(footerSections).map(([sectionTitle, links]) => (
            <div key={sectionTitle} className="footer-section">
              <h3 className="footer-section-title">{sectionTitle}</h3>
              <ul className="footer-links">
                {links.map((link, index) => (
                  <li key={index} className="footer-link-item">
                    <a href="#" className="footer-link">{link}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Currency Section */}
        <div className="currency-section">
          <div className="currency-selector">
            <span className="currency-flag">🇮🇳</span>
            <span className="currency-code">INR</span>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="footer-bottom">
          <div className="footer-info">
            <p className="footer-description">
              Booking.com is part of Booking Holdings Inc., the world leader in online travel and related services.
            </p>
            <p className="footer-copyright">
              Copyright © 1996–2025 Booking.com™. All rights reserved.
            </p>
          </div>
          
          <div className="partner-logos">
            {partnerLogos.map((partner, index) => (
              <div key={index} className="partner-logo">
                <span className={`logo ${partner.logo}-logo`}>
                  {partner.name}
                </span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </footer>
  );
}