import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Heart, User, UserPlus, Users, Calendar, LogOut, Menu, X } from "lucide-react";

import "./Navbar.css";
import { toast } from "react-toastify";

export default function Navbar() {
  const navigate = useNavigate();
  const [activeLink, setActiveLink] = useState("Stays");
  const [clicked, setClicked] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userType, setUserType] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navigationLinks = [
    { label: "Stays", link: "/all-hotels" },
    { label: "Car Rentals", link: "/car-rentals" },
  ];

  // Check if user is logged in
  useEffect(() => {
    const token = localStorage.getItem("token");
    const storedUserType = localStorage.getItem("userType");
    setIsLoggedIn(!!token);
    setUserType(storedUserType);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userType");
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    setUserType(null);
    navigate("/");
    toast.success("Logged out successfully");
  };

  // Scroll to change Logo size
  useEffect(() => {
    const handleScroll = () => {
      const logo = document.querySelector(".nav-logo img");
      const nav = document.getElementById("navbar");
      if (window.scrollY > 10) {
        logo.style.height = "70px";
        nav.style.height = "80px";
      } else {
        logo.style.height = "90px";
        nav.style.height = "90px";
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav id="navbar">
      <div className="nav-container">
        {/* Logo */}
        <Link to="/" className="nav-logo">
          <img src="/hotel-logo.png" alt="logo" />
        </Link>

        {/* Center Navigation Links - Desktop */}
        <div className="nav-center">
          {navigationLinks.map((link, idx) => (
            <a
              key={idx}
              href={link.link}
              className={`land-nav-link ${activeLink === link ? "active" : ""}`}
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Right side actions - Desktop */}
        <div className="nav-actions">
          <div className="nav-links">
            {isLoggedIn ? (
              <>
                {userType === "customer" && (
                  <button
                    className="land-bookings-btn"
                    onClick={() => navigate("/my-bookings")}
                  >
                    <Calendar size={18} />
                    <span>My Bookings</span>
                  </button>
                )}
                {userType === "supplier" && (
                  <button
                    className="land-bookings-btn"
                    onClick={() => navigate("/vender/properties")}
                  >
                    <Calendar size={18} />
                    <span>Properties</span>
                  </button>
                )}
                <button className="land-logout-btn" onClick={handleLogout}>
                  <LogOut size={18} />
                  <span>Logout</span>
                </button>
              </>
            ) : (
              <>
                <button
                  className="land-register-btn"
                  onClick={() => setClicked(!clicked)}
                >
                  <Users size={18} />
                  <span>Register</span>
                </button>
                {clicked && (
                  <div className="other-opt">
                    <button
                      className="vender"
                      onClick={() => navigate("/vender-register")}
                    >
                      <UserPlus size={18} />
                      <span>Vender Register</span>
                    </button>
                    <button
                      className="customer"
                      onClick={() => navigate("/customer-register")}
                    >
                      <UserPlus size={18} />
                      <span>Customer Register</span>
                    </button>
                  </div>
                )}
                <a
                  href="/login"
                  className="land-signin-btn"
                  onClick={(e) => {
                    e.preventDefault();
                    navigate("/login");
                  }}
                >
                  <User size={18} />
                  <span>Sign In</span>
                </a>
              </>
            )}
          </div>
        </div>

        {/* Hamburger Menu Button - Mobile */}
        <button 
          className="hamburger-menu"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="mobile-menu">
          {/* Navigation Links */}
          <div className="mobile-menu-links">
            {navigationLinks.map((link, idx) => (
              <a
                key={idx}
                href={link.link}
                className="mobile-nav-link"
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="mobile-menu-actions">
            {isLoggedIn ? (
              <>
                {userType === "customer" && (
                  <button
                    className="mobile-action-btn bookings-btn"
                    onClick={() => {
                      navigate("/my-bookings");
                      setMobileMenuOpen(false);
                    }}
                  >
                    <Calendar size={18} />
                    <span>My Bookings</span>
                  </button>
                )}
                {userType === "supplier" && (
                  <button
                    className="mobile-action-btn bookings-btn"
                    onClick={() => {
                      navigate("/vender/properties");
                      setMobileMenuOpen(false);
                    }}
                  >
                    <Calendar size={18} />
                    <span>Properties</span>
                  </button>
                )}
                <button 
                  className="mobile-action-btn logout-btn" 
                  onClick={() => {
                    handleLogout();
                    setMobileMenuOpen(false);
                  }}
                >
                  <LogOut size={18} />
                  <span>Logout</span>
                </button>
              </>
            ) : (
              <>
                <button
                  className="mobile-action-btn land-register-btn"
                  onClick={() => setClicked(!clicked)}
                >
                  <Users size={18} />
                  <span>Register</span>
                </button>
                {clicked && (
                  <div className="mobile-register-options">
                    <button
                      className="mobile-register-option"
                      onClick={() => {
                        navigate("/vender-register");
                        setMobileMenuOpen(false);
                        setClicked(false);
                      }}
                    >
                      <UserPlus size={18} />
                      <span>Vender Register</span>
                    </button>
                    <button
                      className="mobile-register-option"
                      onClick={() => {
                        navigate("/customer-register");
                        setMobileMenuOpen(false);
                        setClicked(false);
                      }}
                    >
                      <UserPlus size={18} />
                      <span>Customer Register</span>
                    </button>
                  </div>
                )}
                <button
                  className="mobile-action-btn signin-btn"
                  onClick={() => {
                    navigate("/login");
                    setMobileMenuOpen(false);
                  }}
                >
                  <User size={18} />
                  <span>Sign In</span>
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
