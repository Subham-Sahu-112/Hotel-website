import React from 'react';
import './Loading.css';

const Loading = ({ 
  type = 'page', 
  size = 'medium', 
  color = 'primary', 
  text = '', 
  overlay = false,
  className = '' 
}) => {
  
  // Spinner component for various loading states
  const Spinner = ({ spinnerSize, spinnerColor }) => (
    <div className={`loading-spinner ${spinnerSize} ${spinnerColor}`}>
      <div className="spinner-ring">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );

  // Dots loading animation
  const DotsLoader = ({ dotsSize, dotsColor }) => (
    <div className={`loading-dots ${dotsSize} ${dotsColor}`}>
      <div className="dot"></div>
      <div className="dot"></div>
      <div className="dot"></div>
    </div>
  );

  // Pulse animation
  const PulseLoader = ({ pulseSize, pulseColor }) => (
    <div className={`loading-pulse ${pulseSize} ${pulseColor}`}>
      <div className="pulse-circle"></div>
      <div className="pulse-circle"></div>
      <div className="pulse-circle"></div>
    </div>
  );

  // Bars loading animation
  const BarsLoader = ({ barsSize, barsColor }) => (
    <div className={`loading-bars ${barsSize} ${barsColor}`}>
      <div className="bar"></div>
      <div className="bar"></div>
      <div className="bar"></div>
      <div className="bar"></div>
      <div className="bar"></div>
    </div>
  );

  // Hotel specific loading animation
  const HotelLoader = () => (
    <div className="hotel-loader">
      <div className="hotel-icon">
        🏨
      </div>
      <div className="hotel-loader-text">Finding perfect stays...</div>
    </div>
  );

  // Card skeleton loader
  const SkeletonCard = () => (
    <div className="skeleton-card">
      <div className="skeleton-image"></div>
      <div className="skeleton-content">
        <div className="skeleton-line skeleton-title"></div>
        <div className="skeleton-line skeleton-subtitle"></div>
        <div className="skeleton-line skeleton-text"></div>
      </div>
    </div>
  );

  // Button loading content
  const ButtonLoader = () => (
    <span className="button-loading">
      <Spinner spinnerSize="small" spinnerColor={color} />
      {text && <span className="button-loading-text">{text}</span>}
    </span>
  );

  // Page loading content
  const PageLoader = () => (
    <div className={`page-loading ${overlay ? 'with-overlay' : ''}`}>
      <div className="page-loading-content">
        <HotelLoader />
        {text && <div className="page-loading-text">{text}</div>}
      </div>
    </div>
  );

  // Inline loading content
  const InlineLoader = () => (
    <div className="inline-loading">
      <DotsLoader dotsSize={size} dotsColor={color} />
      {text && <span className="inline-loading-text">{text}</span>}
    </div>
  );

  // Card loading content
  const CardLoader = () => (
    <div className="card-loading">
      <SkeletonCard />
    </div>
  );

  // Form loading content
  const FormLoader = () => (
    <div className="form-loading">
      <PulseLoader pulseSize={size} pulseColor={color} />
      {text && <div className="form-loading-text">{text}</div>}
    </div>
  );

  // Search loading content
  const SearchLoader = () => (
    <div className="search-loading">
      <BarsLoader barsSize={size} barsColor={color} />
      {text && <div className="search-loading-text">{text}</div>}
    </div>
  );

  // Render appropriate loading type
  const renderLoader = () => {
    switch (type) {
      case 'page':
        return <PageLoader />;
      case 'button':
        return <ButtonLoader />;
      case 'inline':
        return <InlineLoader />;
      case 'card':
        return <CardLoader />;
      case 'form':
        return <FormLoader />;
      case 'search':
        return <SearchLoader />;
      case 'spinner':
        return <Spinner spinnerSize={size} spinnerColor={color} />;
      case 'dots':
        return <DotsLoader dotsSize={size} dotsColor={color} />;
      case 'pulse':
        return <PulseLoader pulseSize={size} pulseColor={color} />;
      case 'bars':
        return <BarsLoader barsSize={size} barsColor={color} />;
      case 'hotel':
        return <HotelLoader />;
      case 'skeleton':
        return <SkeletonCard />;
      default:
        return <Spinner spinnerSize={size} spinnerColor={color} />;
    }
  };

  return (
    <div className={`loading-component ${type} ${className}`}>
      {renderLoader()}
    </div>
  );
};

export default Loading;