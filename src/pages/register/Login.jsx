import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import "./Login.css";
import { Lock, Mail, Eye, EyeOff } from "lucide-react";
import { getApiEndpoint } from "../../config/apiConfig";

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

  // User details
  useEffect(() => {
    console.log(formData);
  }, [formData]);

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
      // Determine the API endpoint based on user type
      const endpoint = formData.userType === 'customer' 
        ? getApiEndpoint('/customer/login')
        : getApiEndpoint('/vender/login');

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password
        })
      });

      const data = await response.json();

      if (response.ok && data.success) {
        // Store token and user info in localStorage
        localStorage.setItem('token', data.data.token);
        localStorage.setItem('userType', formData.userType);
        localStorage.setItem('user', JSON.stringify(formData.userType === 'customer' ? data.data.customer : data.data.vender));

        toast.success("Login successful! Welcome back!");
        
        // Redirect based on user type
        if (formData.userType === 'customer') {
          navigate("/all-hotels");
        } else {
          navigate("/vender/dashboard");
        }
      } else {
        toast.error(data.message || "Login failed. Please check your credentials.");
      }
    } catch (error) {
      console.error('Login error:', error);
      toast.error("Unable to connect to server. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
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
              {isLoading ? "Signing in..." : "Sign In"}
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