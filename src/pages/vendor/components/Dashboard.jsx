import React, { useState } from "react";
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

const Dashboard = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const dashboardStats = [
    {
      id: 1,
      title: "Total Bookings",
      value: "1,234",
      change: "+12.3% from last month",
      changeType: "positive",
      icon: <Calendar />,
      color: "blue",
    },
    {
      id: 2,
      title: "Monthly Revenue",
      value: "$45,678",
      change: "+8.7% from last month",
      changeType: "positive",
      icon: <Banknote />,
      color: "green",
    },
    {
      id: 3,
      title: "Active Listings",
      value: "24",
      change: "+2 from last month",
      changeType: "positive",
      icon: <House />,
      color: "orange",
    },
    {
      id: 4,
      title: "Occupancy Rate",
      value: "87.5%",
      change: "+5.2% from last month",
      changeType: "positive",
      icon: <ChartNoAxesCombined />,
      color: "purple",
    },
  ];

  const recentBookings = [
    {
      id: "BK001",
      guest: "John Doe",
      property: "Sunset Villa",
      dates: "2024-01-15 - 2024-01-18",
      amount: "$450",
      status: "confirmed",
    },
    {
      id: "BK002",
      guest: "Sarah Wilson",
      property: "Ocean View Suite",
      dates: "2024-01-20 - 2024-01-25",
      amount: "$875",
      status: "pending",
    },
    {
      id: "BK003",
      guest: "Mike Johnson",
      property: "Mountain Retreat",
      dates: "2024-01-12 - 2024-01-15",
      amount: "$320",
      status: "completed",
    },
  ];

  const recentActivity = [
    {
      id: 1,
      type: "booking",
      message: "New booking received for Ocean View Suite",
      time: "2 minutes ago",
      icon: "📅",
    },
    {
      id: 2,
      type: "payment",
      message: "Payment of $450 received from John Doe",
      time: "1 hour ago",
      icon: "💵",
    },
    {
      id: 3,
      type: "review",
      message: "New 5-star review for Sunset Villa",
      time: "3 hours ago",
      icon: "👤",
    },
  ];

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
