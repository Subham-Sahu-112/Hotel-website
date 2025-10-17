import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import VendorLayout from "./VendorLayout";
import "./Dashboard.css";
import {
  Banknote,
  Calendar,
  ChartNoAxesCombined,
  File,
  House,
  Plus,
} from "lucide-react";
import { getApiEndpoint } from "../../../config/apiConfig";

const Dashboard = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        toast.error('Please login to view dashboard');
        navigate('/login');
        return;
      }

      const response = await fetch(getApiEndpoint('/vendor/bookings/dashboard/stats'), {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setDashboardData(data.data);
      } else {
        if (response.status === 401) {
          toast.error('Session expired. Please login again.');
          navigate('/login');
        } else {
          toast.error(data.message || 'Failed to fetch dashboard data');
        }
      }
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      toast.error('Unable to fetch dashboard data. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const dashboardStats = dashboardData ? [
    {
      id: 1,
      title: "Total Bookings",
      value: dashboardData.totalBookings.toString(),
      change: "All time bookings",
      changeType: "positive",
      icon: <Calendar />,
      color: "blue",
    },
    {
      id: 2,
      title: "Monthly Revenue",
      value: `₹${dashboardData.monthlyRevenue.toLocaleString()}`,
      change: "Current month",
      changeType: "positive",
      icon: <Banknote />,
      color: "green",
    },
    {
      id: 3,
      title: "Active Listings",
      value: dashboardData.activeListings.toString(),
      change: "Your properties",
      changeType: "positive",
      icon: <House />,
      color: "orange",
    },
    {
      id: 4,
      title: "Occupancy Rate",
      value: `${dashboardData.occupancyRate}%`,
      change: "Current occupancy",
      changeType: "positive",
      icon: <ChartNoAxesCombined />,
      color: "purple",
    },
  ] : [];

  const recentBookings = dashboardData?.recentBookings || [];
  const recentActivity = dashboardData?.recentActivity || [];

  const getStatusColor = (status) => {
    switch (status) {
      case "confirmed":
        return "#10b981";
      case "pending":
        return "#f59e0b";
      case "completed":
        return "#6b7280";
      default:
        return "#6b7280";
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case "confirmed":
        return "✓ confirmed";
      case "pending":
        return "⏳ pending";
      case "completed":
        return "✓ completed";
      default:
        return status;
    }
  };

  if (loading) {
    return (
      <VendorLayout>
        <div className="vender-dashboard">
          <div style={{ textAlign: 'center', padding: '60px 20px' }}>
            <div style={{ fontSize: '48px', marginBottom: '20px' }}>⏳</div>
            <h2>Loading Dashboard...</h2>
          </div>
        </div>
      </VendorLayout>
    );
  }

  return (
    <VendorLayout>
      <div className="vender-dashboard">
        {/* Header */}
        <div className="ven-dashboard-header">
          <h1 className="ven-dashboard-title">Dashboard</h1>
          <div className="ven-dashboard-search">
            <input
              type="text"
              placeholder="Search properties, bookings..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="ven-search-input"
            />
            <div className="notification-icon">🔔</div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="vender-dash-stats-grid">
          {dashboardStats.map((stat) => (
            <div
              key={stat.id}
              className={`vender-dash-stat-card ${stat.color}`}
            >
              <div className="vender-dash-stat-header">
                <span className="vender-dash-stat-icon">{stat.icon}</span>
                <span className="vender-dash-stat-title">{stat.title}</span>
              </div>
              <div className="vender-dash-stat-value">{stat.value}</div>
              <div className={`vender-dash-stat-change ${stat.changeType}`}>
                {stat.change}
              </div>
            </div>
          ))}
        </div>

        {/* Main Content */}
        <div className="ven-dashboard-content">
          {/* Recent Bookings */}
          <div className="ven-content-section">
            <div className="ven-section-header">
              <h2 className="ven-section-title">Recent Bookings</h2>
              <button className="view-all-btn">👁️ View All</button>
            </div>

            <div className="bookings-list">
              {recentBookings.map((booking) => (
                <div key={booking.id} className="booking-item">
                  <div className="booking-info">
                    <div className="guest-info">
                      <span className="guest-name">{booking.guest}</span>
                      <span
                        className="booking-status"
                        style={{
                          backgroundColor: getStatusColor(booking.status),
                          color: "white",
                        }}
                      >
                        {getStatusText(booking.status)}
                      </span>
                    </div>
                    <div className="property-name">{booking.property}</div>
                    <div className="booking-dates">{booking.dates}</div>
                  </div>
                  <div className="booking-amount">
                    <div className="amount">{booking.amount}</div>
                    <div className="booking-id">#{booking.id}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Activity */}
          <div className="ven-activity-section">
            <h2 className="ven-section-title">Recent Activity</h2>

            <div className="activity-list">
              {recentActivity.map((activity) => (
                <div key={activity.id} className="activity-item">
                  <div className="activity-icon">{activity.icon}</div>
                  <div className="activity-content">
                    <div className="activity-message">{activity.message}</div>
                    <div className="activity-time">{activity.time}</div>
                  </div>
                </div>
              ))}
            </div>

            <button className="view-all-notifications">
              View All Notifications
            </button>
          </div>
        </div>

        <div className="ven-dashboard-footer">
          <h2>Quick Actions</h2>
          <div className="dash-action-buttons">
            <button className="dash-action-btn">
              <span>
                <Plus size={25} />
              </span>
              <p>Add New Property</p>
            </button>
            <button className="dash-action-btn">
              <span>
                <Calendar size={25} />
              </span>
              <p>Manage Bookings</p>
            </button>
            <button className="dash-action-btn">
              <span>
                <Banknote size={25} />
              </span>
              <p>View Payments</p>
            </button>
            <button className="dash-action-btn">
              <span>
                <File size={25} />
              </span>
              <p>Read Reviews</p>
            </button>
          </div>
        </div>
      </div>
    </VendorLayout>
  );
};

export default Dashboard;
