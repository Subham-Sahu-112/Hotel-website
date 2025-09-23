import React, { useState } from 'react';
import VendorLayout from './VendorLayout';

const Settings = () => {
  const [activeTab, setActiveTab] = useState('account');
  const [settings, setSettings] = useState({
    profile: {
      businessName: 'HotelHub Properties',
      contactEmail: 'vendor@hotelhub.com',
      phone: '+1 234 567 8900',
      address: '123 Business St, City, State 12345',
      taxId: 'TX123456789'
    },
    notifications: {
      newBookings: true,
      cancellations: true,
      paymentUpdates: true,
      reviews: true,
      emailReports: false,
      smsAlerts: true
    },
    preferences: {
      currency: 'USD',
      timezone: 'America/New_York',
      dateFormat: 'MM/DD/YYYY',
      language: 'English'
    }
  });

  const handleInputChange = (section, field, value) => {
    setSettings(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
  };

  const tabs = [
    { id: 'account', label: 'Account Info', icon: '👤' },
    { id: 'notifications', label: 'Notifications', icon: '🔔' },
    { id: 'preferences', label: 'Preferences', icon: '⚙️' },
    { id: 'security', label: 'Security', icon: '🔒' }
  ];

  return (
    <VendorLayout>
      <div style={{ padding: '0' }}>
        <div style={{ marginBottom: '32px' }}>
          <h1 style={{ fontSize: '2rem', fontWeight: '600', color: '#1f2937', margin: '0 0 8px 0' }}>
            Settings
          </h1>
          <p style={{ color: '#6b7280', margin: '0', fontSize: '14px' }}>
            Manage your account settings and preferences
          </p>
        </div>

        {/* Tabs */}
        <div style={{ 
          background: 'white', 
          borderRadius: '12px', 
          boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
          overflow: 'hidden'
        }}>
          <div style={{ display: 'flex', borderBottom: '1px solid #e5e7eb' }}>
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                style={{
                  flex: 1,
                  padding: '16px 20px',
                  border: 'none',
                  background: activeTab === tab.id ? '#f9fafb' : 'white',
                  color: activeTab === tab.id ? '#3b82f6' : '#6b7280',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  fontSize: '14px',
                  fontWeight: '500',
                  borderBottom: activeTab === tab.id ? '2px solid #3b82f6' : '2px solid transparent',
                  transition: 'all 0.2s ease'
                }}
              >
                <span>{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </div>

          <div style={{ padding: '24px' }}>
            {/* Account Info Tab */}
            {activeTab === 'account' && (
              <div>
                <h3 style={{ margin: '0 0 20px 0', color: '#1f2937' }}>Business Information</h3>
                <div style={{ display: 'grid', gap: '20px', maxWidth: '600px' }}>
                  <div>
                    <label style={{ display: 'block', marginBottom: '6px', fontWeight: '500', color: '#374151' }}>
                      Business Name
                    </label>
                    <input
                      type="text"
                      value={settings.profile.businessName}
                      onChange={(e) => handleInputChange('profile', 'businessName', e.target.value)}
                      style={{
                        width: '100%',
                        padding: '12px 16px',
                        border: '1px solid #e5e7eb',
                        borderRadius: '8px',
                        fontSize: '14px'
                      }}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', marginBottom: '6px', fontWeight: '500', color: '#374151' }}>
                      Contact Email
                    </label>
                    <input
                      type="email"
                      value={settings.profile.contactEmail}
                      onChange={(e) => handleInputChange('profile', 'contactEmail', e.target.value)}
                      style={{
                        width: '100%',
                        padding: '12px 16px',
                        border: '1px solid #e5e7eb',
                        borderRadius: '8px',
                        fontSize: '14px'
                      }}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', marginBottom: '6px', fontWeight: '500', color: '#374151' }}>
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      value={settings.profile.phone}
                      onChange={(e) => handleInputChange('profile', 'phone', e.target.value)}
                      style={{
                        width: '100%',
                        padding: '12px 16px',
                        border: '1px solid #e5e7eb',
                        borderRadius: '8px',
                        fontSize: '14px'
                      }}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', marginBottom: '6px', fontWeight: '500', color: '#374151' }}>
                      Business Address
                    </label>
                    <textarea
                      value={settings.profile.address}
                      onChange={(e) => handleInputChange('profile', 'address', e.target.value)}
                      style={{
                        width: '100%',
                        padding: '12px 16px',
                        border: '1px solid #e5e7eb',
                        borderRadius: '8px',
                        fontSize: '14px',
                        rows: 3,
                        resize: 'vertical'
                      }}
                    />
                  </div>
                  <button style={{
                    background: '#3b82f6',
                    color: 'white',
                    border: 'none',
                    padding: '12px 24px',
                    borderRadius: '8px',
                    fontSize: '14px',
                    fontWeight: '500',
                    cursor: 'pointer',
                    width: 'fit-content'
                  }}>
                    Save Changes
                  </button>
                </div>
              </div>
            )}

            {/* Notifications Tab */}
            {activeTab === 'notifications' && (
              <div>
                <h3 style={{ margin: '0 0 20px 0', color: '#1f2937' }}>Notification Preferences</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '600px' }}>
                  {Object.entries(settings.notifications).map(([key, value]) => (
                    <div key={key} style={{ 
                      display: 'flex', 
                      justifyContent: 'space-between', 
                      alignItems: 'center',
                      padding: '12px 0',
                      borderBottom: '1px solid #f3f4f6'
                    }}>
                      <div>
                        <div style={{ fontWeight: '500', color: '#374151', marginBottom: '4px' }}>
                          {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                        </div>
                        <div style={{ fontSize: '13px', color: '#6b7280' }}>
                          {key === 'newBookings' && 'Get notified when you receive new bookings'}
                          {key === 'cancellations' && 'Get notified when bookings are cancelled'}
                          {key === 'paymentUpdates' && 'Get notified about payment status changes'}
                          {key === 'reviews' && 'Get notified when guests leave reviews'}
                          {key === 'emailReports' && 'Receive weekly performance reports via email'}
                          {key === 'smsAlerts' && 'Receive urgent notifications via SMS'}
                        </div>
                      </div>
                      <label style={{ position: 'relative', display: 'inline-block', width: '48px', height: '24px' }}>
                        <input
                          type="checkbox"
                          checked={value}
                          onChange={(e) => handleInputChange('notifications', key, e.target.checked)}
                          style={{ opacity: 0, width: 0, height: 0 }}
                        />
                        <span style={{
                          position: 'absolute',
                          cursor: 'pointer',
                          top: 0,
                          left: 0,
                          right: 0,
                          bottom: 0,
                          backgroundColor: value ? '#3b82f6' : '#ccc',
                          transition: '.4s',
                          borderRadius: '24px'
                        }}>
                          <span style={{
                            position: 'absolute',
                            content: '',
                            height: '18px',
                            width: '18px',
                            left: value ? '27px' : '3px',
                            bottom: '3px',
                            backgroundColor: 'white',
                            transition: '.4s',
                            borderRadius: '50%'
                          }} />
                        </span>
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Preferences Tab */}
            {activeTab === 'preferences' && (
              <div>
                <h3 style={{ margin: '0 0 20px 0', color: '#1f2937' }}>System Preferences</h3>
                <div style={{ display: 'grid', gap: '20px', maxWidth: '600px' }}>
                  <div>
                    <label style={{ display: 'block', marginBottom: '6px', fontWeight: '500', color: '#374151' }}>
                      Currency
                    </label>
                    <select
                      value={settings.preferences.currency}
                      onChange={(e) => handleInputChange('preferences', 'currency', e.target.value)}
                      style={{
                        width: '100%',
                        padding: '12px 16px',
                        border: '1px solid #e5e7eb',
                        borderRadius: '8px',
                        fontSize: '14px'
                      }}
                    >
                      <option value="USD">USD - US Dollar</option>
                      <option value="EUR">EUR - Euro</option>
                      <option value="GBP">GBP - British Pound</option>
                      <option value="CAD">CAD - Canadian Dollar</option>
                    </select>
                  </div>
                  <div>
                    <label style={{ display: 'block', marginBottom: '6px', fontWeight: '500', color: '#374151' }}>
                      Timezone
                    </label>
                    <select
                      value={settings.preferences.timezone}
                      onChange={(e) => handleInputChange('preferences', 'timezone', e.target.value)}
                      style={{
                        width: '100%',
                        padding: '12px 16px',
                        border: '1px solid #e5e7eb',
                        borderRadius: '8px',
                        fontSize: '14px'
                      }}
                    >
                      <option value="America/New_York">Eastern Time</option>
                      <option value="America/Chicago">Central Time</option>
                      <option value="America/Denver">Mountain Time</option>
                      <option value="America/Los_Angeles">Pacific Time</option>
                    </select>
                  </div>
                  <div>
                    <label style={{ display: 'block', marginBottom: '6px', fontWeight: '500', color: '#374151' }}>
                      Date Format
                    </label>
                    <select
                      value={settings.preferences.dateFormat}
                      onChange={(e) => handleInputChange('preferences', 'dateFormat', e.target.value)}
                      style={{
                        width: '100%',
                        padding: '12px 16px',
                        border: '1px solid #e5e7eb',
                        borderRadius: '8px',
                        fontSize: '14px'
                      }}
                    >
                      <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                      <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                      <option value="YYYY-MM-DD">YYYY-MM-DD</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            {/* Security Tab */}
            {activeTab === 'security' && (
              <div>
                <h3 style={{ margin: '0 0 20px 0', color: '#1f2937' }}>Security Settings</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', maxWidth: '600px' }}>
                  <div style={{ 
                    padding: '20px', 
                    border: '1px solid #e5e7eb', 
                    borderRadius: '8px' 
                  }}>
                    <h4 style={{ margin: '0 0 12px 0', color: '#1f2937' }}>Change Password</h4>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                      <input
                        type="password"
                        placeholder="Current Password"
                        style={{
                          padding: '12px 16px',
                          border: '1px solid #e5e7eb',
                          borderRadius: '8px',
                          fontSize: '14px'
                        }}
                      />
                      <input
                        type="password"
                        placeholder="New Password"
                        style={{
                          padding: '12px 16px',
                          border: '1px solid #e5e7eb',
                          borderRadius: '8px',
                          fontSize: '14px'
                        }}
                      />
                      <input
                        type="password"
                        placeholder="Confirm New Password"
                        style={{
                          padding: '12px 16px',
                          border: '1px solid #e5e7eb',
                          borderRadius: '8px',
                          fontSize: '14px'
                        }}
                      />
                      <button style={{
                        background: '#3b82f6',
                        color: 'white',
                        border: 'none',
                        padding: '12px 24px',
                        borderRadius: '8px',
                        fontSize: '14px',
                        fontWeight: '500',
                        cursor: 'pointer',
                        width: 'fit-content'
                      }}>
                        Update Password
                      </button>
                    </div>
                  </div>

                  <div style={{ 
                    padding: '20px', 
                    border: '1px solid #e5e7eb', 
                    borderRadius: '8px' 
                  }}>
                    <h4 style={{ margin: '0 0 12px 0', color: '#1f2937' }}>Two-Factor Authentication</h4>
                    <p style={{ margin: '0 0 16px 0', color: '#6b7280', fontSize: '14px' }}>
                      Add an extra layer of security to your account
                    </p>
                    <button style={{
                      background: '#10b981',
                      color: 'white',
                      border: 'none',
                      padding: '12px 24px',
                      borderRadius: '8px',
                      fontSize: '14px',
                      fontWeight: '500',
                      cursor: 'pointer'
                    }}>
                      Enable 2FA
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </VendorLayout>
  );
};

export default Settings;