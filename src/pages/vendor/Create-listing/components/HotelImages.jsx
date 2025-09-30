import React, { useRef } from 'react';
import './HotelImages.css';

export default function HotelImages({ data, onChange }) {
  const mainImageRef = useRef(null);
  const additionalImagesRef = useRef(null);

  const handleMainImageChange = (e) => {
    const file = e.target.files[0];
    onChange({
      ...data,
      mainImage: file
    });
  };

  const handleAdditionalImagesChange = (e) => {
    const files = Array.from(e.target.files);
    onChange({
      ...data,
      additionalImages: [...data.additionalImages, ...files]
    });
  };

  const removeAdditionalImage = (index) => {
    const updatedImages = data.additionalImages.filter((_, i) => i !== index);
    onChange({
      ...data,
      additionalImages: updatedImages
    });
  };

  return (
    <div className="img-images-container">
      <h2 className="img-section-title">Hotel Images</h2>

      <div className="img-images-grid">
        {/* Main Image Upload */}
        <div className="img-upload-section">
          <div
            onClick={() => mainImageRef.current?.click()}
            className="img-upload-area"
          >
            <div className="img-upload-content">
              <svg className="img-upload-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
              </svg>
              <p className="img-upload-text">Upload main hotel image</p>
              <button
                type="button"
                className="img-upload-button"
              >
                Choose File
              </button>
            </div>
          </div>
          <input
            ref={mainImageRef}
            type="file"
            accept="image/*"
            onChange={handleMainImageChange}
            className="img-hidden-input"
          />
          {data.mainImage && (
            <p className="img-file-info">
              Selected: {data.mainImage.name}
            </p>
          )}
        </div>

        {/* Additional Images Upload */}
        <div className="img-upload-section">
          <div
            onClick={() => additionalImagesRef.current?.click()}
            className="img-upload-area"
          >
            <div className="img-upload-content">
              <svg className="img-upload-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
              </svg>
              <p className="img-upload-text">Upload additional images</p>
              <button
                type="button"
                className="img-upload-button"
              >
                Choose Files
              </button>
            </div>
          </div>
          <input
            ref={additionalImagesRef}
            type="file"
            accept="image/*"
            multiple
            onChange={handleAdditionalImagesChange}
            className="img-hidden-input"
          />
          {data.additionalImages.length > 0 && (
            <div className="img-files-info">
              <p className="img-files-count">{data.additionalImages.length} file(s) selected</p>
              <div className="img-files-list">
                {data.additionalImages.map((file, index) => (
                  <div key={index} className="img-file-item">
                    <span className="img-file-name">{file.name}</span>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        removeAdditionalImage(index);
                      }}
                      className="remove-file-button"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}