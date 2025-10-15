import { Calendar, MapPin, User, Users, ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "./HeroSection.css";

export default function HeroSection() {
  const navigate = useNavigate();
  const [location, setLocation] = useState("");
  const [checkInDate, setCheckInDate] = useState(null);
  const [checkOutDate, setCheckOutDate] = useState(null);
  const [guestCount, setGuestCount] = useState(2);
  const [showCheckInPicker, setShowCheckInPicker] = useState(false);
  const [showCheckOutPicker, setShowCheckOutPicker] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  
  const checkInRef = useRef(null);
  const checkOutRef = useRef(null);
  
  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  
  const weekdays = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
  
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (checkInRef.current && !checkInRef.current.contains(event.target)) {
        setShowCheckInPicker(false);
      }
      if (checkOutRef.current && !checkOutRef.current.contains(event.target)) {
        setShowCheckOutPicker(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);
  
  const formatDate = (date) => {
    if (!date) return "Pick the Date";
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };
  
  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();
    
    const days = [];
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }
    
    // Add all days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(new Date(year, month, day));
    }
    
    return days;
  };
  
  const handleDateSelect = (date, type) => {
    if (type === 'checkin') {
      setCheckInDate(date);
      setShowCheckInPicker(false);
      // If check-out date is before check-in, clear it
      if (checkOutDate && date > checkOutDate) {
        setCheckOutDate(null);
      }
    } else {
      setCheckOutDate(date);
      setShowCheckOutPicker(false);
    }
  };
  
  const navigateMonth = (direction) => {
    const newMonth = new Date(currentMonth);
    newMonth.setMonth(currentMonth.getMonth() + direction);
    setCurrentMonth(newMonth);
  };
  
  const isDateDisabled = (date, type) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    if (date < today) return true;
    
    if (type === 'checkout' && checkInDate) {
      return date <= checkInDate;
    }
    
    return false;
  };
  
  const isDateSelected = (date) => {
    if (!date) return false;
    const dateStr = date.toDateString();
    return (
      (checkInDate && checkInDate.toDateString() === dateStr) ||
      (checkOutDate && checkOutDate.toDateString() === dateStr)
    );
  };
  
  const isDateInRange = (date) => {
    if (!date || !checkInDate || !checkOutDate) return false;
    return date > checkInDate && date < checkOutDate;
  };

  const handleSearch = () => {
    // Validate search inputs
    if (!location.trim()) {
      toast.error("Please enter a destination");
      return;
    }

    if (!checkInDate) {
      toast.error("Please select check-in date");
      return;
    }

    if (!checkOutDate) {
      toast.error("Please select check-out date");
      return;
    }

    // Create search params
    const searchParams = new URLSearchParams({
      location: location.trim(),
      checkIn: checkInDate.toISOString(),
      checkOut: checkOutDate.toISOString(),
      guests: guestCount.toString()
    });

    // Navigate to all-hotels page with search parameters
    navigate(`/all-hotels?${searchParams.toString()}`);
    toast.success("Searching hotels...");
  };

  return (
    <div className="hero">
      <div className="land-hero-container">
        <div className="land-hero-content">
          <h1 className="land-hero-title">
            Find Your Perfect <span className="highlight">Stay</span>
          </h1>
          <p className="land-hero-subtitle">
            Discover amazing hotels, resorts, and unique accommodations around
            the world
          </p>

          <div className="search-card">
            <div className="search-card-content">
              <div className="search-fields-grid">
                <div className="search-field-group">
                  <label className="field-label">Where</label>
                  <div className="icon-input-wrapper">
                    <MapPin className="input-icon" size={20} />
                    <input
                      placeholder="Search destinations"
                      className="input-field"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                    />
                  </div>
                </div>
                <div className="search-field-group" ref={checkInRef}>
                  <label className="field-label">Check-in</label>
                  <div className="icon-input-wrapper" onClick={() => setShowCheckInPicker(!showCheckInPicker)}>
                    <Calendar className="input-icon" size={20} />
                    <div className="input-field date-field">
                      {formatDate(checkInDate)}
                    </div>
                  </div>
                  {showCheckInPicker && (
                    <div className="date-picker">
                      <div className="date-picker-header">
                        <button 
                          className="nav-btn" 
                          onClick={() => navigateMonth(-1)}
                          type="button"
                        >
                          <ChevronLeft size={16} />
                        </button>
                        <span className="month-year">
                          {months[currentMonth.getMonth()]} {currentMonth.getFullYear()}
                        </span>
                        <button 
                          className="nav-btn" 
                          onClick={() => navigateMonth(1)}
                          type="button"
                        >
                          <ChevronRight size={16} />
                        </button>
                      </div>
                      <div className="weekdays-grid">
                        {weekdays.map(day => (
                          <div key={day} className="weekday">{day}</div>
                        ))}
                      </div>
                      <div className="days-grid">
                        {getDaysInMonth(currentMonth).map((date, index) => (
                          <button
                            key={index}
                            className={`day-cell ${
                              !date ? 'empty' : ''
                            } ${
                              date && isDateDisabled(date, 'checkin') ? 'disabled' : ''
                            } ${
                              date && isDateSelected(date) ? 'selected' : ''
                            } ${
                              date && isDateInRange(date) ? 'in-range' : ''
                            }`}
                            onClick={() => date && !isDateDisabled(date, 'checkin') && handleDateSelect(date, 'checkin')}
                            disabled={!date || isDateDisabled(date, 'checkin')}
                            type="button"
                          >
                            {date ? date.getDate() : ''}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
                <div className="search-field-group" ref={checkOutRef}>
                  <label className="field-label">Check-out</label>
                  <div className="icon-input-wrapper" onClick={() => setShowCheckOutPicker(!showCheckOutPicker)}>
                    <Calendar className="input-icon" size={20} />
                    <div className="input-field date-field">
                      {formatDate(checkOutDate)}
                    </div>
                  </div>
                  {showCheckOutPicker && (
                    <div className="date-picker">
                      <div className="date-picker-header">
                        <button 
                          className="nav-btn" 
                          onClick={() => navigateMonth(-1)}
                          type="button"
                        >
                          <ChevronLeft size={16} />
                        </button>
                        <span className="month-year">
                          {months[currentMonth.getMonth()]} {currentMonth.getFullYear()}
                        </span>
                        <button 
                          className="nav-btn" 
                          onClick={() => navigateMonth(1)}
                          type="button"
                        >
                          <ChevronRight size={16} />
                        </button>
                      </div>
                      <div className="weekdays-grid">
                        {weekdays.map(day => (
                          <div key={day} className="weekday">{day}</div>
                        ))}
                      </div>
                      <div className="days-grid">
                        {getDaysInMonth(currentMonth).map((date, index) => (
                          <button
                            key={index}
                            className={`day-cell ${
                              !date ? 'empty' : ''
                            } ${
                              date && isDateDisabled(date, 'checkout') ? 'disabled' : ''
                            } ${
                              date && isDateSelected(date) ? 'selected' : ''
                            } ${
                              date && isDateInRange(date) ? 'in-range' : ''
                            }`}
                            onClick={() => date && !isDateDisabled(date, 'checkout') && handleDateSelect(date, 'checkout')}
                            disabled={!date || isDateDisabled(date, 'checkout')}
                            type="button"
                          >
                            {date ? date.getDate() : ''}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
                <div className="search-field-group">
                  <label className="field-label">Guests</label>
                  <div className="icon-input-wrapper">
                    <Users className="input-icon" size={20} />
                    <input 
                      type="number"
                      min="1"
                      max="20"
                      placeholder="2 guests" 
                      className="input-field"
                      value={guestCount}
                      onChange={(e) => setGuestCount(parseInt(e.target.value) || 1)}
                    />
                  </div>
                </div>
              </div>
              <div className="search-btn-row">
                <button 
                  className="hero-search-btn" 
                  onClick={handleSearch}
                >
                  Search Hotels
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
