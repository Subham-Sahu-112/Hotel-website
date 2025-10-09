import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import "./Login.css";
import Loading from "../../components/Loading";
import { Lock, Mail, Eye, EyeOff } from "lucide-react";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    userType: "customer",
    email: "",
    password: "",
    rememberMe: false
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isPageLoading, setIsPageLoading] = useState(true);

  // Page loading effect
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsPageLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Basic validation
    if (!formData.email || !formData.password) {
      toast.error("Please fill in all required fields");
      setIsLoading(false);
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast.error("Please enter a valid email address");
      setIsLoading(false);
      return;
    }

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Mock successful login
      toast.success("Login successful! Welcome back!");
      
      // Redirect to dashboard or previous page
      navigate("/dashboard");
    } catch (error) {
      toast.error("Login failed. Please check your credentials.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {isPageLoading && (
        <Loading 
          type="page" 
          text="Preparing login..." 
          overlay={true} 
        />
      )}
      <div className="login">
      <div className="login-container">
        {/* Header */}
        <div className="login-header">
          <h1 className="login-title">Welcome Back</h1>
          <p className="login-subtitle">
            Sign in to access your hotel booking dashboard
          </p>
        </div>

        {/* Login Form */}
        <div className="login-card">
          <div className="login-form-header">
            <Lock className="login-icon" />
            <h2>Sign In</h2>
          </div>

          <form onSubmit={handleSubmit} className="login-form">
            {/* User Type Selector */}
            <div className="user-type-selector">
              <label className="selector-label">Login as:</label>
              <div className="user-type-options">
                <label className={`user-type-option ${formData.userType === 'customer' ? 'active' : ''}`}>
                  <input
                    type="radio"
                    name="userType"
                    value="customer"
                    checked={formData.userType === 'customer'}
                    onChange={handleChange}
                    className="radio-input"
                  />
                  <span className="radio-custom"></span>
                  Customer
                </label>
                <label className={`user-type-option ${formData.userType === 'supplier' ? 'active' : ''}`}>
                  <input
                    type="radio"
                    name="userType"
                    value="supplier"
                    checked={formData.userType === 'supplier'}
                    onChange={handleChange}
                    className="radio-input"
                  />
                  <span className="radio-custom"></span>
                  Supplier
                </label>
              </div>
            </div>

            {/* Email Field */}
            <div className="form-group">
              <label htmlFor="email" className="form-label">
                <Mail size={16} />
                Email Address *
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email address"
                className="form-input"
                required
              />
            </div>

            {/* Password Field */}
            <div className="form-group">
              <label htmlFor="password" className="form-label">
                <Lock size={16} />
                Password *
              </label>
              <div className="password-input-container">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  className="form-input password-input"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="password-toggle"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="form-options">
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  name="rememberMe"
                  checked={formData.rememberMe}
                  onChange={handleChange}
                  className="checkbox-input"
                />
                <span className="checkbox-custom"></span>
                Remember me
              </label>
              <Link to="/forgot-password" className="forgot-password-link">
                Forgot Password?
              </Link>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className={`login-submit-btn ${isLoading ? 'loading' : ''}`}
              disabled={isLoading}
            >
              {isLoading ? (
                <Loading type="button" size="small" color="white" text="Signing in..." />
              ) : (
                "Sign In"
              )}
            </button>
          </form>

          {/* Register Links */}
          <div className="login-footer">
            <p>Don't have an account?</p>
            <div className="register-links">
              <Link to="/customer-register" className="register-link customer">
                Sign up as Customer
              </Link>
              <Link to="/vender-register" className="register-link vendor">
                Sign up as Vendor
              </Link>
            </div>
          </div>
        </div>
      </div>
      </div>
    </>
  );
};

export default Login;