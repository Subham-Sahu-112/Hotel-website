import React, { useState } from 'react';
import VendorLayout from './VendorLayout';

const Reviews = () => {
  const [reviews] = useState([
    {
      id: 1,
      guest: 'John Doe',
      property: 'Sunset Villa Resort',
      rating: 5,
      title: 'Amazing stay!',
      comment: 'The villa was absolutely beautiful with stunning ocean views. Staff was incredibly helpful and friendly.',
      date: '2024-01-18',
      verified: true,
      response: null
    },
    {
      id: 2,
      guest: 'Sarah Johnson',
      property: 'Ocean View Hotel',
      rating: 4,
      title: 'Great location',
      comment: 'Perfect location near the beach. Room was clean and comfortable. Would definitely stay again.',
      date: '2024-01-16',
      verified: true,
      response: 'Thank you for your wonderful review! We look forward to hosting you again.'
    },
    {
      id: 3,
      guest: 'Michael Brown',
      property: 'Mountain Lodge',
      rating: 3,
      title: 'Good but could be better',
      comment: 'Nice lodge with great mountain views. However, the WiFi was slow and breakfast options were limited.',
      date: '2024-01-14',
      verified: true,
      response: null
    }
  ]);

  const averageRating = reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length;

  const getRatingStars = (rating) => {
    return '⭐'.repeat(rating) + '☆'.repeat(5 - rating);
  };

  return (
    <VendorLayout>
      <div style={{ padding: '2rem' }}>
        <div style={{ marginBottom: '32px' }}>
          <h1 style={{ fontSize: '2rem', fontWeight: '600', color: '#1f2937', margin: '0 0 8px 0' }}>
            Reviews & Ratings
          </h1>
          <p style={{ color: '#6b7280', margin: '0', fontSize: '14px' }}>
            Manage guest reviews and maintain your property reputation
          </p>
        </div>

        {/* Stats Cards */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
          gap: '16px', 
          marginBottom: '32px' 
        }}>
          <div style={{ 
            background: 'white', 
            padding: '20px', 
            borderRadius: '12px', 
            boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)' 
          }}>
            <div style={{ fontSize: '24px', marginBottom: '8px' }}>⭐</div>
            <div style={{ fontSize: '1.5rem', fontWeight: '700', color: '#1f2937' }}>
              {averageRating.toFixed(1)}
            </div>
            <div style={{ fontSize: '13px', color: '#6b7280' }}>Average Rating</div>
          </div>
          <div style={{ 
            background: 'white', 
            padding: '20px', 
            borderRadius: '12px', 
            boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)' 
          }}>
            <div style={{ fontSize: '24px', marginBottom: '8px' }}>📝</div>
            <div style={{ fontSize: '1.5rem', fontWeight: '700', color: '#1f2937' }}>
              {reviews.length}
            </div>
            <div style={{ fontSize: '13px', color: '#6b7280' }}>Total Reviews</div>
          </div>
          <div style={{ 
            background: 'white', 
            padding: '20px', 
            borderRadius: '12px', 
            boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)' 
          }}>
            <div style={{ fontSize: '24px', marginBottom: '8px' }}>💬</div>
            <div style={{ fontSize: '1.5rem', fontWeight: '700', color: '#1f2937' }}>
              {reviews.filter(r => !r.response).length}
            </div>
            <div style={{ fontSize: '13px', color: '#6b7280' }}>Pending Responses</div>
          </div>
        </div>

        {/* Reviews List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {reviews.map((review) => (
            <div key={review.id} style={{ 
              background: 'white', 
              padding: '24px', 
              borderRadius: '12px', 
              boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)' 
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                    <h3 style={{ margin: '0', color: '#1f2937', fontSize: '1.125rem' }}>{review.guest}</h3>
                    {review.verified && (
                      <span style={{ 
                        background: '#10b981', 
                        color: 'white', 
                        padding: '2px 8px', 
                        borderRadius: '12px', 
                        fontSize: '11px' 
                      }}>
                        Verified
                      </span>
                    )}
                  </div>
                  <div style={{ color: '#6b7280', fontSize: '14px', marginBottom: '4px' }}>
                    {review.property}
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ fontSize: '14px' }}>{getRatingStars(review.rating)}</span>
                    <span style={{ color: '#6b7280', fontSize: '13px' }}>
                      {new Date(review.date).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>
              
              <h4 style={{ margin: '0 0 8px 0', color: '#1f2937', fontSize: '1rem' }}>
                {review.title}
              </h4>
              <p style={{ margin: '0 0 16px 0', color: '#374151', lineHeight: '1.6' }}>
                {review.comment}
              </p>

              {review.response ? (
                <div style={{ 
                  background: '#f9fafb', 
                  padding: '16px', 
                  borderRadius: '8px', 
                  borderLeft: '3px solid #3b82f6' 
                }}>
                  <div style={{ fontSize: '13px', color: '#6b7280', marginBottom: '8px', fontWeight: '500' }}>
                    Your Response:
                  </div>
                  <p style={{ margin: '0', color: '#374151' }}>{review.response}</p>
                </div>
              ) : (
                <div style={{ display: 'flex', gap: '12px' }}>
                  <button style={{
                    background: '#3b82f6',
                    color: 'white',
                    border: 'none',
                    padding: '8px 16px',
                    borderRadius: '6px',
                    fontSize: '13px',
                    cursor: 'pointer'
                  }}>
                    Respond
                  </button>
                  <button style={{
                    background: '#f3f4f6',
                    color: '#374151',
                    border: 'none',
                    padding: '8px 16px',
                    borderRadius: '6px',
                    fontSize: '13px',
                    cursor: 'pointer'
                  }}>
                    Report
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </VendorLayout>
  );
};

export default Reviews;