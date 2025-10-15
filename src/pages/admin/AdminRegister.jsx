import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "./AdminRegister.css";

function AdminRegister() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isChecking, setIsChecking] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    checkAdminExists();
  }, []);

  const checkAdminExists = async () => {
    try {
      const response = await fetch("http://localhost:1000/admin/check-exists");
      const data = await response.json();

      if (data.success && data.exists) {
        toast.error("Admin already registered. Registration is closed.");
        setTimeout(() => {
          navigate("/admin/login");
        }, 2000);
      } else {
        setIsChecking(false);
      }
    } catch (error) {
      console.error("Error checking admin existence:", error);
      toast.error("Error checking admin status");
      setIsChecking(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    if (formData.password.length < 6) {
      toast.error("Password must be at least 6 characters long");
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch("http://localhost:1000/admin/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        localStorage.setItem("adminToken", data.token);
        localStorage.setItem("adminData", JSON.stringify(data.admin));
        toast.success("Registration successful! Welcome Admin!");
        navigate("/admin/dashboard");
      } else {
        toast.error(data.message || "Registration failed");
        
        // If admin already exists, redirect to login
        if (data.message.includes("already exists") || data.message.includes("closed")) {
          setTimeout(() => {
            navigate("/admin/login");
          }, 2000);
        }
      }
    } catch (error) {
      console.error("Registration error:", error);
      toast.error("An error occurred during registration");
    } finally {
      setIsLoading(false);
    }
  };

  if (isChecking) {
    return (
      <div className="admin-register-container">
        <div className="admin-register-box">
          <div className="checking-status">
            <div className="spinner"></div>
            <p>Checking registration status...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-register-container">
      <div className="admin-register-box">
        <div className="admin-register-header">
          <h1>Admin Registration</h1>
          <p>Create the first admin account</p>
          <div className="notice-badge">
            ⚠️ Only one admin can be registered
          </div>
        </div>
        <form onSubmit={handleSubmit} className="admin-register-form">
          <div className="form-group">
            <label htmlFor="username">Username *</label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Enter username"
              required
              minLength="3"
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email *</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter email"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password *</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter password (min 6 characters)"
              required
              minLength="6"
            />
          </div>
          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm Password *</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm password"
              required
              minLength="6"
            />
          </div>
          <button type="submit" className="register-btn" disabled={isLoading}>
            {isLoading ? "Registering..." : "Register Admin"}
          </button>
        </form>
        <div className="login-link">
          <p>
            Already have an account?{" "}
            <span onClick={() => navigate("/admin/login")}>Login here</span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default AdminRegister;
