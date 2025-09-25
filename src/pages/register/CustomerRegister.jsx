import React, { useState, useEffect } from 'react';
import './CustomerRegister.css';
import { User, Mail, Lock, Phone, MapPin, Calendar, Shield } from 'lucide-react';

const CustomerRegister = () => {
  const [formData, setFormData] = useState({
    // Personal Information
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    dateOfBirth: '',
    gender: '',
    
    // Address Information
    address: '',
    city: '',
    country: '',
    postalCode: '',
    
    // Account Setup
    password: '',
    confirmPassword: '',
    
    // Preferences
    newsletter: false,
    notifications: true,
    
    // Terms & Conditions
    acceptTerms: false,
    acceptPrivacy: false
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [genderDropdownOpen, setGenderDropdownOpen] = useState(false);
  const [countryDropdownOpen, setCountryDropdownOpen] = useState(false);
  const [isMobile] = useState(window.innerWidth <= 768);

  const genderOptions = ['Male', 'Female', 'Other', 'Prefer not to say'];
  
  const countries = [
    'United States',
    'United Kingdom', 
    'Canada',
    'Australia',
    'Germany',
    'France',
    'Spain',
    'Italy',
    'Japan',
    'India',
    'Brazil',
    'Mexico',
    'Other'
  ];

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest('.cust-form-dropdown')) {
        setGenderDropdownOpen(false);
        setCountryDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleDropdownSelect = (name, value) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user selects
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
    
    // Close dropdowns
    if (name === 'gender') {
      setGenderDropdownOpen(false);
    } else if (name === 'country') {
      setCountryDropdownOpen(false);
    }
  };

  const validateForm = () => {
    const newErrors = {};

    // Personal Information validation
    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email address is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email address is invalid';
    }
    if (!formData.phoneNumber.trim()) newErrors.phoneNumber = 'Phone number is required';
    if (!formData.dateOfBirth) newErrors.dateOfBirth = 'Date of birth is required';
    if (!formData.gender) newErrors.gender = 'Gender is required';

    // Address Information validation
    if (!formData.address.trim()) newErrors.address = 'Address is required';
    if (!formData.city.trim()) newErrors.city = 'City is required';
    if (!formData.country) newErrors.country = 'Country is required';
    if (!formData.postalCode.trim()) newErrors.postalCode = 'Postal code is required';

    // Account Setup validation
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters long';
    }
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    // Terms & Conditions validation
    if (!formData.acceptTerms) newErrors.acceptTerms = 'You must accept the Terms and Conditions';
    if (!formData.acceptPrivacy) newErrors.acceptPrivacy = 'You must accept the Privacy Policy';

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
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Handle successful registration
      alert('Registration successful! Welcome to our platform.');
      console.log('Customer registration data:', formData);
      
      // Reset form or redirect to login/dashboard
      // window.location.href = '/login';
      
    } catch (error) {
      console.error('Registration failed:', error);
      alert('Registration failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="customer-register">
      <div className="cust-register-container">
        {/* Header */}
        <div className="cust-register-header">
          <h1 className="cust-register-title">Join Our Community</h1>
          <p className="cust-register-subtitle">
            Create your account to book amazing stays, discover new destinations, 
            and enjoy exclusive member benefits worldwide.
          </p>
        </div>

        {/* Registration Form */}
        <div className="cust-register-form-container">
          <div className="cust-form-header">
            <h2 className="cust-form-title">Customer Registration</h2>
            <p className="cust-form-subtitle">Fill out the form below to create your account</p>
          </div>

          <form onSubmit={handleSubmit} className="cust-register-form">
            {/* Personal Information Section */}
            <div className="cust-form-section">
              <div className="cust-section-header">
                <div className="cust-section-icon"><User size={isMobile ? 22 : 33} /></div>
                <h3 className="cust-section-title">Personal Information</h3>
              </div>

              <div className="cust-form-grid">
                <div className="cust-form-group">
                  <label htmlFor="firstName" className="cust-form-label">
                    First Name <span className="required">*</span>
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    placeholder="John"
                    className={`cust-form-input ${errors.firstName ? 'error' : ''}`}
                  />
                  {errors.firstName && <span className="cust-error-message">{errors.firstName}</span>}
                </div>

                <div className="cust-form-group">
                  <label htmlFor="lastName" className="cust-form-label">
                    Last Name <span className="required">*</span>
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    placeholder="Doe"
                    className={`cust-form-input ${errors.lastName ? 'error' : ''}`}
                  />
                  {errors.lastName && <span className="cust-error-message">{errors.lastName}</span>}
                </div>
              </div>

              <div className="cust-form-grid">
                <div className="cust-form-group">
                  <label htmlFor="email" className="cust-form-label">
                    Email Address <span className="required">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="john.doe@email.com"
                    className={`cust-form-input ${errors.email ? 'error' : ''}`}
                  />
                  {errors.email && <span className="cust-error-message">{errors.email}</span>}
                </div>

                <div className="cust-form-group">
                  <label htmlFor="phoneNumber" className="cust-form-label">
                    Phone Number <span className="required">*</span>
                  </label>
                  <input
                    type="tel"
                    id="phoneNumber"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleInputChange}
                    placeholder="+1 (555) 123-4567"
                    className={`cust-form-input ${errors.phoneNumber ? 'error' : ''}`}
                  />
                  {errors.phoneNumber && <span className="cust-error-message">{errors.phoneNumber}</span>}
                </div>
              </div>

              <div className="cust-form-grid">
                <div className="cust-form-group">
                  <label htmlFor="dateOfBirth" className="cust-form-label">
                    Date of Birth <span className="required">*</span>
                  </label>
                  <input
                    type="date"
                    id="dateOfBirth"
                    name="dateOfBirth"
                    value={formData.dateOfBirth}
                    onChange={handleInputChange}
                    className={`cust-form-input ${errors.dateOfBirth ? 'error' : ''}`}
                  />
                  {errors.dateOfBirth && <span className="cust-error-message">{errors.dateOfBirth}</span>}
                </div>

                <div className="cust-form-group">
                  <label htmlFor="gender" className="cust-form-label">
                    Gender <span className="required">*</span>
                  </label>
                  <div className={`cust-form-dropdown ${errors.gender ? 'error' : ''}`}>
                    <div 
                      className="cust-dropdown-toggle"
                      onClick={() => setGenderDropdownOpen(!genderDropdownOpen)}
                    >
                      <span className={formData.gender ? 'selected' : 'placeholder'}>
                        {formData.gender || 'Select gender'}
                      </span>
                      <span className={`dropdown-arrow ${genderDropdownOpen ? 'open' : ''}`}>▼</span>
                    </div>
                    {genderDropdownOpen && (
                      <div className="cust-dropdown-options">
                        {genderOptions.map((option) => (
                          <span
                            key={option}
                            className={`dropdown-option ${formData.gender === option ? 'selected' : ''}`}
                            onClick={() => handleDropdownSelect('gender', option)}
                          >
                            {option}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                  {errors.gender && <span className="cust-error-message">{errors.gender}</span>}
                </div>
              </div>
            </div>

            {/* Address Information Section */}
            <div className="cust-form-section">
              <div className="cust-section-header">
                <div className="cust-section-icon"><MapPin size={isMobile ? 22 : 33} /></div>
                <h3 className="cust-section-title">Address Information</h3>
              </div>

              <div className="cust-form-group">
                <label htmlFor="address" className="cust-form-label">
                  Street Address <span className="required">*</span>
                </label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  placeholder="123 Main Street, Apartment 4B"
                  className={`cust-form-input ${errors.address ? 'error' : ''}`}
                />
                {errors.address && <span className="cust-error-message">{errors.address}</span>}
              </div>

              <div className="cust-form-grid form-grid-3">
                <div className="cust-form-group">
                  <label htmlFor="city" className="cust-form-label">
                    City <span className="required">*</span>
                  </label>
                  <input
                    type="text"
                    id="city"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    placeholder="New York"
                    className={`cust-form-input ${errors.city ? 'error' : ''}`}
                  />
                  {errors.city && <span className="cust-error-message">{errors.city}</span>}
                </div>

                <div className="cust-form-group">
                  <label htmlFor="country" className="cust-form-label">
                    Country <span className="required">*</span>
                  </label>
                  <div className={`cust-form-dropdown ${errors.country ? 'error' : ''}`}>
                    <div 
                      className="cust-dropdown-toggle"
                      onClick={() => setCountryDropdownOpen(!countryDropdownOpen)}
                    >
                      <span className={formData.country ? 'selected' : 'placeholder'}>
                        {formData.country || 'Select country'}
                      </span>
                      <span className={`dropdown-arrow ${countryDropdownOpen ? 'open' : ''}`}>▼</span>
                    </div>
                    {countryDropdownOpen && (
                      <div className="cust-dropdown-options">
                        {countries.map((country) => (
                          <span
                            key={country}
                            className={`dropdown-option ${formData.country === country ? 'selected' : ''}`}
                            onClick={() => handleDropdownSelect('country', country)}
                          >
                            {country}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                  {errors.country && <span className="cust-error-message">{errors.country}</span>}
                </div>

                <div className="cust-form-group">
                  <label htmlFor="postalCode" className="cust-form-label">
                    Postal Code <span className="required">*</span>
                  </label>
                  <input
                    type="text"
                    id="postalCode"
                    name="postalCode"
                    value={formData.postalCode}
                    onChange={handleInputChange}
                    placeholder="10001"
                    className={`cust-form-input ${errors.postalCode ? 'error' : ''}`}
                  />
                  {errors.postalCode && <span className="cust-error-message">{errors.postalCode}</span>}
                </div>
              </div>
            </div>

            {/* Account Setup Section */}
            <div className="cust-form-section">
              <div className="cust-section-header">
                <div className="cust-section-icon"><Lock size={isMobile ? 22 : 33} /></div>
                <h3 className="cust-section-title">Account Setup</h3>
              </div>

              <div className="cust-form-grid">
                <div className="cust-form-group">
                  <label htmlFor="password" className="cust-form-label">
                    Password <span className="required">*</span>
                  </label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    placeholder="Create a strong password"
                    className={`cust-form-input ${errors.password ? 'error' : ''}`}
                  />
                  {errors.password && <span className="cust-error-message">{errors.password}</span>}
                </div>

                <div className="cust-form-group">
                  <label htmlFor="confirmPassword" className="cust-form-label">
                    Confirm Password <span className="required">*</span>
                  </label>
                  <input
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    placeholder="Confirm your password"
                    className={`cust-form-input ${errors.confirmPassword ? 'error' : ''}`}
                  />
                  {errors.confirmPassword && <span className="cust-error-message">{errors.confirmPassword}</span>}
                </div>
              </div>
            </div>

            {/* Preferences Section */}
            <div className="cust-form-section">
              <div className="cust-section-header">
                <div className="cust-section-icon"><Shield size={isMobile ? 22 : 33} /></div>
                <h3 className="cust-section-title">Preferences</h3>
              </div>

              <div className="cust-checkbox-group">
                <div className="cust-form-checkbox">
                  <input
                    type="checkbox"
                    id="newsletter"
                    name="newsletter"
                    checked={formData.newsletter}
                    onChange={handleInputChange}
                  />
                  <label htmlFor="newsletter" className="cust-checkbox-label">
                    Subscribe to our newsletter for travel deals and updates
                  </label>
                </div>

                <div className="cust-form-checkbox">
                  <input
                    type="checkbox"
                    id="notifications"
                    name="notifications"
                    checked={formData.notifications}
                    onChange={handleInputChange}
                  />
                  <label htmlFor="notifications" className="cust-checkbox-label">
                    Receive booking confirmations and important notifications
                  </label>
                </div>
              </div>
            </div>

            {/* Terms & Conditions Section */}
            <div className="cust-form-section">
              <div className="cust-section-header">
                <div className="cust-section-icon"><Calendar size={isMobile ? 22 : 33} /></div>
                <h3 className="cust-section-title">Terms & Conditions</h3>
              </div>

              <div className="cust-checkbox-group">
                <div className="cust-form-checkbox">
                  <input
                    type="checkbox"
                    id="acceptTerms"
                    name="acceptTerms"
                    checked={formData.acceptTerms}
                    onChange={handleInputChange}
                    className={errors.acceptTerms ? 'error' : ''}
                  />
                  <label htmlFor="acceptTerms" className="cust-checkbox-label">
                    I accept the <a href="#" className="cust-link">Terms and Conditions</a> <span className="required">*</span>
                  </label>
                  {errors.acceptTerms && <span className="cust-error-message">{errors.acceptTerms}</span>}
                </div>

                <div className="cust-form-checkbox">
                  <input
                    type="checkbox"
                    id="acceptPrivacy"
                    name="acceptPrivacy"
                    checked={formData.acceptPrivacy}
                    onChange={handleInputChange}
                    className={errors.acceptPrivacy ? 'error' : ''}
                  />
                  <label htmlFor="acceptPrivacy" className="cust-checkbox-label">
                    I accept the <a href="#" className="cust-link">Privacy Policy</a> <span className="required">*</span>
                  </label>
                  {errors.acceptPrivacy && <span className="cust-error-message">{errors.acceptPrivacy}</span>}
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="cust-form-submit">
              <button
                type="submit"
                disabled={isSubmitting}
                className={`cust-submit-button ${isSubmitting ? 'submitting' : ''}`}
              >
                {isSubmitting ? 'Creating Account...' : 'Create Account'}
              </button>
              <p className="cust-login-link">
                Already have an account? <a href="/login" className="cust-link">Sign in here</a>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CustomerRegister;