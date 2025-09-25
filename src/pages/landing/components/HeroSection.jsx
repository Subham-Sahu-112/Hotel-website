import { Calendar, LocateFixed, User } from "lucide-react";
import { useEffect, useState } from "react";
import "./HeroSection.css";

export default function HeroSection() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("2 travellers, 1 room");
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  const [checkInDate, setCheckInDate] = useState(null);
  const [checkOutDate, setCheckOutDate] = useState(null);
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const travelerOptions = [
    "1 traveller, 1 room",
    "2 travellers, 1 room", 
    "3 travellers, 1 room",
    "4 travellers, 1 room",
    "2 travellers, 2 rooms",
    "3 travellers, 2 rooms",
    "4 travellers, 2 rooms",
    "5 travellers, 2 rooms",
    "6 travellers, 3 rooms"
  ];

  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  useEffect(() => {
    const handleClickOutside = (event) => {
      // Close person dropdown if clicking outside
      if (!event.target.closest('.person-dropdown')) {
        setIsDropdownOpen(false);
      }
      
      // Close date picker if clicking outside
      if (!event.target.closest('.date-picker')) {
        setIsDatePickerOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    
    // Cleanup function to remove event listener
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
    setIsDropdownOpen(false);
  };

  const formatDate = (date) => {
    if (!date) return null;
    const day = date.getDate();
    const month = months[date.getMonth()].substring(0, 3);
    return `${day} ${month}`;
  };

  const getDateDisplayText = () => {
    if (checkInDate && checkOutDate) {
      return `${formatDate(checkInDate)} - ${formatDate(checkOutDate)}`;
    } else if (checkInDate) {
      return `${formatDate(checkInDate)} - Select checkout`;
    }
    return "21 Sept - 25 Sept";
  };

  const handleDateSelect = (date) => {
    if (!checkInDate || (checkInDate && checkOutDate)) {
      // Set check-in date
      setCheckInDate(date);
      setCheckOutDate(null);
    } else if (date > checkInDate) {
      // Set check-out date
      setCheckOutDate(date);
      setIsDatePickerOpen(false);
    } else {
      // If selected date is before check-in, reset and set as new check-in
      setCheckInDate(date);
      setCheckOutDate(null);
    }
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

  const isDateInRange = (date) => {
    if (!checkInDate || !date) return false;
    if (checkOutDate) {
      return date >= checkInDate && date <= checkOutDate;
    }
    return date.getTime() === checkInDate.getTime();
  };

  const isDateSelected = (date) => {
    if (!date) return false;
    return (checkInDate && date.getTime() === checkInDate.getTime()) ||
           (checkOutDate && date.getTime() === checkOutDate.getTime());
  };

  const navigateMonth = (direction) => {
    const newMonth = new Date(currentMonth);
    newMonth.setMonth(currentMonth.getMonth() + direction);
    setCurrentMonth(newMonth);
  };

  return (
    <div className="hero">
      <div className="hero-container">
        <div className="hero-content">
          <h1 className="hero-title">Find your next stay</h1>
          <p className="hero-subtitle">Search deals on hotels, homes, and much more...</p>
          
          <div className="search-form">
            <div className="location-field search-field">
              <span className="field-icon">
                <LocateFixed size={20} />
              </span>
              <input
                type="text"
                name="location"
                id="location"
                placeholder="Where are you going?"
                className="search-input"
              />
            </div>

            <div className="date-field search-field">
              <span className="field-icon">
                <Calendar size={20} />
              </span>
              <div className="date-picker">
                <div 
                  className="date-selected"
                  onClick={() => setIsDatePickerOpen(!isDatePickerOpen)}
                >
                  <div className="date-display">
                    <span className="date-range">{getDateDisplayText()}</span>
                  </div>
                  <span className={`dropdown-arrow ${isDatePickerOpen ? 'open' : ''}`}>
                    ▼
                  </span>
                </div>
                {isDatePickerOpen && (
                  <div className="date-picker-menu">
                    <div className="calendar-header">
                      <button 
                        className="month-nav"
                        onClick={() => navigateMonth(-1)}
                      >
                        ‹
                      </button>
                      <span className="current-month">
                        {months[currentMonth.getMonth()]} {currentMonth.getFullYear()}
                      </span>
                      <button 
                        className="month-nav"
                        onClick={() => navigateMonth(1)}
                      >
                        ›
                      </button>
                    </div>
                    <div className="calendar-grid">
                      <div className="weekdays">
                        {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(day => (
                          <span key={day} className="weekday">{day}</span>
                        ))}
                      </div>
                      <div className="days-grid">
                        {getDaysInMonth(currentMonth).map((date, index) => (
                          <div
                            key={index}
                            className={`calendar-day ${
                              date ? 'available' : 'empty'
                            } ${
                              isDateSelected(date) ? 'selected' : ''
                            } ${
                              isDateInRange(date) ? 'in-range' : ''
                            }`}
                            onClick={() => date && handleDateSelect(date)}
                          >
                            {date ? date.getDate() : ''}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="person-field search-field">
              <span className="field-icon">
                <User size={20} />
              </span>
              <div className="person-dropdown">
                <div 
                  className="person-selected"
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                >
                  <span>{selectedOption}</span>
                  <span className={`dropdown-arrow ${isDropdownOpen ? 'open' : ''}`}>
                    ▼
                  </span>
                </div>
                {isDropdownOpen && (
                  <div className="person-dropdown-menu">
                    {travelerOptions.map((option, index) => (
                      <div 
                        key={index}
                        className={`dropdown-option ${option === selectedOption ? 'selected' : ''}`}
                        onClick={() => handleOptionSelect(option)}
                      >
                        <span>{option}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <button className="search-button">Search</button>
          </div>
        </div>
      </div>
    </div>
  );
}
