import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Heart, User } from "lucide-react";

import "./Navbar.css";

export default function Navbar() {
  const navigate = useNavigate();
  const [activeLink, setActiveLink] = useState("Stays");

  const navigationLinks = [
    "Stays", 
    "Flights", 
    "Car Rentals", 
    "Attractions", 
    "Airport Taxis"
  ];

  return (
    <nav id="navbar">
      <div className="nav-container">
        {/* Logo */}
        <Link to="/" className="nav-logo">
          <img src="/hotel-logo.png" alt="logo" />
        </Link>

        {/* Center Navigation Links */}
        <div className="nav-center">
          {navigationLinks.map((link) => (
            <a
              key={link}
              href="#"
              className={`land-nav-link ${activeLink === link ? "active" : ""}`}
              onClick={(e) => {
                e.preventDefault();
                setActiveLink(link);
              }}
            >
              {link}
            </a>
          ))}
        </div>

        {/* Right side actions */}
        <div className="nav-actions">
          <div className="nav-links">
            <button className="wishlist-btn">
              <Heart size={18} />
              <span>Wishlist</span>
            </button>
            <a
              href="/sign-in"
              className="land-signin-btn"
              onClick={(e) => {
                e.preventDefault();
                navigate("/sign-in");
              }}
            >
              <User size={18} />
              <span>Sign In</span>
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}
