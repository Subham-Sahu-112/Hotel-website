import React from 'react';
import VendorSidebar from './VendorSidebar';
import './VendorLayout.css';

const VendorLayout = ({ children }) => {
  return (
    <div className="vendor-layout">
      <VendorSidebar />
      <div className="vendor-main-content">
        <div className="content-wrapper">
          {children}
        </div>
      </div>
    </div>
  );
};

export default VendorLayout;