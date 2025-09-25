import "./Footer.css";

export default function Footer() {
  const footerSections = {
    "Quick Links": [
      "Home",
      "About Us", 
      "Contact Us",
      "Privacy Policy",
      "Terms of Service"
    ],
    "For Partners": [
      "List Your Property",
      "Partner Login",
      "Become an Affiliate"
    ],
    "Support": [
      "Help Center",
      "Customer Service",
      "Safety & Security"
    ]
  };

  const partnerLogos = [
    { name: "HotelHub", logo: "hotelhub" },
    { name: "TravelMax", logo: "travelmax" },
    { name: "StayFinder", logo: "stayfinder" }
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
              Your trusted partner for finding the perfect accommodation worldwide. Book with confidence.
            </p>
            <p className="footer-copyright">
              Copyright © 2025 HotelHub™. All rights reserved.
            </p>
          </div>
        </div>

      </div>
    </footer>
  );
}