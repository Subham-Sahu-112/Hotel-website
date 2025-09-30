import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "./VendorRegister.css";
import {
  Building,
  Contact,
  Files,
  Handshake,
  Landmark,
  Lock,
  MapPinHouse,
} from "lucide-react";

const VendorRegister = () => {
  const Navigate = useNavigate();
  const [formData, setFormData] = useState({
    // Business Information
    businessName: "",
    businessType: "",
    businessDescription: "",

    // Contact Information
    contactName: "",
    emailAddress: "",
    phoneNumber: "",

    // Property Address
    streetAddress: "",
    city: "",
    country: "",
    postalCode: "",

    // Business Registration
    businessRegistrationNumber: "",
    taxId: "",

    // Account Setup
    password: "",
    confirmPassword: "",

    // Terms & Conditions
    acceptTerms: false,
    acceptPrivacy: false,
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [businessTypeDropdownOpen, setBusinessTypeDropdownOpen] =
    useState(false);
  const [countryDropdownOpen, setCountryDropdownOpen] = useState(false);
  const [isMobile] = useState(window.innerWidth <= 768);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest(".ven-form-dropdown")) {
        setBusinessTypeDropdownOpen(false);
        setCountryDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const businessTypes = [
    "Hotel",
    "Resort",
    "Motel",
    "Villa",
    "Apartment",
    "Hostel",
    "Guest House",
    "Lodge",
    "Boutique Hotel",
    "Other",
  ];

  const countries = [
    "United States",
    "United Kingdom",
    "Canada",
    "Australia",
    "Germany",
    "France",
    "Spain",
    "Italy",
    "Japan",
    "Other",
  ];

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleDropdownSelect = (name, value) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error when user selects
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }

    // Close dropdowns
    if (name === "businessType") {
      setBusinessTypeDropdownOpen(false);
    } else if (name === "country") {
      setCountryDropdownOpen(false);
    }
  };

  const validateForm = () => {
    const newErrors = {};

    // Business Information validation
    if (!formData.businessName.trim())
      newErrors.businessName = "Business name is required";
    if (!formData.businessType)
      newErrors.businessType = "Business type is required";
    if (!formData.businessDescription.trim())
      newErrors.businessDescription = "Business description is required";

    // Contact Information validation
    if (!formData.contactName.trim())
      newErrors.contactName = "Contact name is required";
    if (!formData.emailAddress.trim()) {
      newErrors.emailAddress = "Email address is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.emailAddress)) {
      newErrors.emailAddress = "Email address is invalid";
    }
    if (!formData.phoneNumber.trim())
      newErrors.phoneNumber = "Phone number is required";

    // Property Address validation
    if (!formData.streetAddress.trim())
      newErrors.streetAddress = "Street address is required";
    if (!formData.city.trim()) newErrors.city = "City is required";
    if (!formData.country) newErrors.country = "Country is required";
    if (!formData.postalCode.trim())
      newErrors.postalCode = "Postal code is required";

    // Business Registration validation
    if (!formData.businessRegistrationNumber.trim())
      newErrors.businessRegistrationNumber =
        "Business registration number is required";
    if (!formData.taxId.trim()) newErrors.taxId = "Tax ID is required";

    // Account Setup validation
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters long";
    }
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    // Terms & Conditions validation
    if (!formData.acceptTerms)
      newErrors.acceptTerms = "You must accept the Terms and Conditions";
    if (!formData.acceptPrivacy)
      newErrors.acceptPrivacy = "You must accept the Privacy Policy";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("http://localhost:1000/vender/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success("Registration successful! Redirecting to dashboard...");
        console.log("Saved Vendor:", data.vendor);

        // Reset form
        setFormData({
          businessName: "",
          businessType: "",
          businessDescription: "",
          contactName: "",
          emailAddress: "",
          phoneNumber: "",
          streetAddress: "",
          city: "",
          country: "",
          postalCode: "",
          businessRegistrationNumber: "",
          taxId: "",
          password: "",
          confirmPassword: "",
          acceptTerms: false,
          acceptPrivacy: false,
        });
        Navigate("/vender/dashboard");
      } else {
        alert(data.message || "Registration failed. Please try again.");
      }
    } catch (error) {
      console.error("Registration failed:", error);
      alert("Server error. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="vendor-register">
      <div className="ven-register-container">
        {/* Header */}
        <div className="ven-register-header">
          <h1 className="ven-register-title">Partner with Us</h1>
          <p className="ven-register-subtitle">
            Join thousands of hotel partners worldwide and start earning more
            revenue by listing your property on our platform.
          </p>
        </div>

        {/* Registration Form */}
        <div className="ven-register-form-container">
          <div className="ven-form-header">
            <h2 className="ven-form-title">Vendor Registration</h2>
            <p className="ven-form-subtitle">
              Fill out the form below to get started with your hotel listing
            </p>
          </div>

          <form onSubmit={handleSubmit} className="ven-register-form">
            {/* Business Information Section */}
            <div className="ven-form-section">
              <div className="ven-section-header">
                <div className="ven-section-icon">
                  <Landmark size={isMobile ? 22 : 33} />
                </div>
                <h3 className="ven-section-title">Business Information</h3>
              </div>

              <div className="ven-form-grid">
                <div className="ven-form-group">
                  <label htmlFor="businessName" className="ven-form-label">
                    Business Name <span className="required">*</span>
                  </label>
                  <input
                    type="text"
                    id="businessName"
                    name="businessName"
                    value={formData.businessName}
                    onChange={handleInputChange}
                    placeholder="Your Hotel Name"
                    className={`ven-form-input ${
                      errors.businessName ? "error" : ""
                    }`}
                  />
                  {errors.businessName && (
                    <span className="ven-error-message">
                      {errors.businessName}
                    </span>
                  )}
                </div>

                <div className="ven-form-group">
                  <label htmlFor="businessType" className="ven-form-label">
                    Business Type <span className="required">*</span>
                  </label>
                  <div
                    className={`ven-form-dropdown ${
                      errors.businessType ? "error" : ""
                    }`}
                  >
                    <div
                      className="ven-dropdown-toggle"
                      onClick={() =>
                        setBusinessTypeDropdownOpen(!businessTypeDropdownOpen)
                      }
                    >
                      <span
                        className={
                          formData.businessType ? "selected" : "placeholder"
                        }
                      >
                        {formData.businessType || "Select business type"}
                      </span>
                      <span
                        className={`dropdown-arrow ${
                          businessTypeDropdownOpen ? "open" : ""
                        }`}
                      >
                        ▼
                      </span>
                    </div>
                    {businessTypeDropdownOpen && (
                      <div className="ven-dropdown-options">
                        {businessTypes.map((type) => (
                          <span
                            key={type}
                            className={`dropdown-option ${
                              formData.businessType === type ? "selected" : ""
                            }`}
                            onClick={() =>
                              handleDropdownSelect("businessType", type)
                            }
                          >
                            {type}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                  {errors.businessType && (
                    <span className="ven-error-message">
                      {errors.businessType}
                    </span>
                  )}
                </div>
              </div>

              <div className="ven-form-group">
                <label htmlFor="businessDescription" className="ven-form-label">
                  Business Description <span className="required">*</span>
                </label>
                <textarea
                  id="businessDescription"
                  name="businessDescription"
                  value={formData.businessDescription}
                  onChange={handleInputChange}
                  placeholder="Describe your property, amenities, and unique features..."
                  className={`ven-form-textarea ${
                    errors.businessDescription ? "error" : ""
                  }`}
                  rows="4"
                />
                {errors.businessDescription && (
                  <span className="ven-error-message">
                    {errors.businessDescription}
                  </span>
                )}
              </div>
            </div>

            {/* Contact Information Section */}
            <div className="ven-form-section">
              <div className="ven-section-header">
                <div className="ven-section-icon">
                  <Contact size={isMobile ? 22 : 33} />
                </div>
                <h3 className="ven-section-title">Contact Information</h3>
              </div>

              <div className="ven-form-grid">
                <div className="ven-form-group">
                  <label htmlFor="contactName" className="ven-form-label">
                    Contact Name <span className="required">*</span>
                  </label>
                  <input
                    type="text"
                    id="contactName"
                    name="contactName"
                    value={formData.contactName}
                    onChange={handleInputChange}
                    placeholder="Your full name"
                    className={`ven-form-input ${
                      errors.contactName ? "error" : ""
                    }`}
                  />
                  {errors.contactName && (
                    <span className="ven-error-message">
                      {errors.contactName}
                    </span>
                  )}
                </div>

                <div className="ven-form-group">
                  <label htmlFor="emailAddress" className="ven-form-label">
                    Email Address <span className="required">*</span>
                  </label>
                  <input
                    type="email"
                    id="emailAddress"
                    name="emailAddress"
                    value={formData.emailAddress}
                    onChange={handleInputChange}
                    placeholder="your@email.com"
                    className={`ven-form-input ${
                      errors.emailAddress ? "error" : ""
                    }`}
                  />
                  {errors.emailAddress && (
                    <span className="ven-error-message">
                      {errors.emailAddress}
                    </span>
                  )}
                </div>
              </div>

              <div className="ven-form-group">
                <label htmlFor="phoneNumber" className="ven-form-label">
                  Phone Number <span className="required">*</span>
                </label>
                <input
                  type="tel"
                  id="phoneNumber"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleInputChange}
                  placeholder="+1 (555) 123-4567"
                  className={`ven-form-input ${
                    errors.phoneNumber ? "error" : ""
                  }`}
                />
                {errors.phoneNumber && (
                  <span className="ven-error-message">
                    {errors.phoneNumber}
                  </span>
                )}
              </div>
            </div>

            {/* Property Address Section */}
            <div className="ven-form-section">
              <div className="ven-section-header">
                <div className="ven-section-icon">
                  <MapPinHouse size={isMobile ? 22 : 33} />
                </div>
                <h3 className="ven-section-title">Property Address</h3>
              </div>

              <div className="ven-form-group">
                <label htmlFor="streetAddress" className="ven-form-label">
                  Street Address <span className="required">*</span>
                </label>
                <input
                  type="text"
                  id="streetAddress"
                  name="streetAddress"
                  value={formData.streetAddress}
                  onChange={handleInputChange}
                  placeholder="123 Main Street"
                  className={`ven-form-input ${
                    errors.streetAddress ? "error" : ""
                  }`}
                />
                {errors.streetAddress && (
                  <span className="ven-error-message">
                    {errors.streetAddress}
                  </span>
                )}
              </div>

              <div className="ven-form-grid form-grid-3">
                <div className="ven-form-group">
                  <label htmlFor="city" className="ven-form-label">
                    City <span className="required">*</span>
                  </label>
                  <input
                    type="text"
                    id="city"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    placeholder="City"
                    className={`ven-form-input ${errors.city ? "error" : ""}`}
                  />
                  {errors.city && (
                    <span className="ven-error-message">{errors.city}</span>
                  )}
                </div>

                <div className="ven-form-group">
                  <label htmlFor="country" className="ven-form-label">
                    Country <span className="required">*</span>
                  </label>
                  <div
                    className={`ven-form-dropdown ${
                      errors.country ? "error" : ""
                    }`}
                  >
                    <div
                      className="ven-dropdown-toggle"
                      onClick={() =>
                        setCountryDropdownOpen(!countryDropdownOpen)
                      }
                    >
                      <span
                        className={
                          formData.country ? "selected" : "placeholder"
                        }
                      >
                        {formData.country || "Select country"}
                      </span>
                      <span
                        className={`dropdown-arrow ${
                          countryDropdownOpen ? "open" : ""
                        }`}
                      >
                        ▼
                      </span>
                    </div>
                    {countryDropdownOpen && (
                      <div className="ven-dropdown-options">
                        {countries.map((country) => (
                          <span
                            key={country}
                            className={`dropdown-option ${
                              formData.country === country ? "selected" : ""
                            }`}
                            onClick={() =>
                              handleDropdownSelect("country", country)
                            }
                          >
                            {country}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                  {errors.country && (
                    <span className="ven-error-message">{errors.country}</span>
                  )}
                </div>

                <div className="ven-form-group">
                  <label htmlFor="postalCode" className="ven-form-label">
                    Postal Code <span className="required">*</span>
                  </label>
                  <input
                    type="text"
                    id="postalCode"
                    name="postalCode"
                    value={formData.postalCode}
                    onChange={handleInputChange}
                    placeholder="12345"
                    className={`ven-form-input ${
                      errors.postalCode ? "error" : ""
                    }`}
                  />
                  {errors.postalCode && (
                    <span className="ven-error-message">
                      {errors.postalCode}
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Business Registration Section */}
            <div className="ven-form-section">
              <div className="ven-section-header">
                <div className="ven-section-icon">
                  <Handshake size={isMobile ? 22 : 33} />
                </div>
                <h3 className="ven-section-title">Business Registration</h3>
              </div>

              <div className="ven-form-grid">
                <div className="ven-form-group">
                  <label
                    htmlFor="businessRegistrationNumber"
                    className="ven-form-label"
                  >
                    Business Registration Number{" "}
                    <span className="required">*</span>
                  </label>
                  <input
                    type="text"
                    id="businessRegistrationNumber"
                    name="businessRegistrationNumber"
                    value={formData.businessRegistrationNumber}
                    onChange={handleInputChange}
                    placeholder="BRN123456789"
                    className={`ven-form-input ${
                      errors.businessRegistrationNumber ? "error" : ""
                    }`}
                  />
                  {errors.businessRegistrationNumber && (
                    <span className="error-message">
                      {errors.businessRegistrationNumber}
                    </span>
                  )}
                </div>

                <div className="ven-form-group">
                  <label htmlFor="taxId" className="ven-form-label">
                    Tax ID <span className="required">*</span>
                  </label>
                  <input
                    type="text"
                    id="taxId"
                    name="taxId"
                    value={formData.taxId}
                    onChange={handleInputChange}
                    placeholder="TAX123456789"
                    className={`ven-form-input ${errors.taxId ? "error" : ""}`}
                  />
                  {errors.taxId && (
                    <span className="ven-error-message">{errors.taxId}</span>
                  )}
                </div>
              </div>
            </div>

            {/* Account Setup Section */}
            <div className="ven-form-section">
              <div className="ven-section-header">
                <div className="ven-section-icon">
                  <Lock size={isMobile ? 22 : 33} />
                </div>
                <h3 className="ven-section-title">Account Setup</h3>
              </div>

              <div className="ven-form-grid">
                <div className="ven-form-group">
                  <label htmlFor="password" className="ven-form-label">
                    Password <span className="required">*</span>
                  </label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    placeholder="Create a strong password"
                    className={`ven-form-input ${
                      errors.password ? "error" : ""
                    }`}
                  />
                  {errors.password && (
                    <span className="ven-error-message">{errors.password}</span>
                  )}
                </div>

                <div className="ven-form-group">
                  <label htmlFor="confirmPassword" className="ven-form-label">
                    Confirm Password <span className="required">*</span>
                  </label>
                  <input
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    placeholder="Confirm your password"
                    className={`ven-form-input ${
                      errors.confirmPassword ? "error" : ""
                    }`}
                  />
                  {errors.confirmPassword && (
                    <span className="ven-error-message">
                      {errors.confirmPassword}
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Terms & Conditions Section */}
            <div className="ven-form-section">
              <div className="ven-section-header">
                <div className="ven-section-icon">
                  <Files size={isMobile ? 22 : 33} />
                </div>
                <h3 className="ven-section-title">Terms & Conditions</h3>
              </div>

              <div className="checkbox-group">
                <div className="form-checkbox">
                  <input
                    type="checkbox"
                    id="acceptTerms"
                    name="acceptTerms"
                    checked={formData.acceptTerms}
                    onChange={handleInputChange}
                    className={errors.acceptTerms ? "error" : ""}
                  />
                  <label htmlFor="acceptTerms" className="checkbox-label">
                    I accept the{" "}
                    <a href="#" className="link">
                      Terms and Conditions
                    </a>{" "}
                    <span className="required">*</span>
                  </label>
                  {errors.acceptTerms && (
                    <span className="error-message">{errors.acceptTerms}</span>
                  )}
                </div>

                <div className="form-checkbox">
                  <input
                    type="checkbox"
                    id="acceptPrivacy"
                    name="acceptPrivacy"
                    checked={formData.acceptPrivacy}
                    onChange={handleInputChange}
                    className={errors.acceptPrivacy ? "error" : ""}
                  />
                  <label htmlFor="acceptPrivacy" className="checkbox-label">
                    I accept the{" "}
                    <a href="#" className="link">
                      Privacy Policy
                    </a>{" "}
                    <span className="required">*</span>
                  </label>
                  {errors.acceptPrivacy && (
                    <span className="error-message">
                      {errors.acceptPrivacy}
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="form-submit">
              <button
                type="submit"
                disabled={isSubmitting}
                className={`submit-button ${isSubmitting ? "submitting" : ""}`}
              >
                {isSubmitting
                  ? "Completing Registration..."
                  : "Complete Registration"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default VendorRegister;
