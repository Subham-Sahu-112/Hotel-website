// API Configuration
// Automatically uses DEV or PROD based on environment

const isDevelopment = import.meta.env.MODE === 'development';
const devUri = import.meta.env.VITE_DEV_URI || 'http://localhost:1000';
const prodUri = import.meta.env.VITE_PROD_URI || 'https://hotel-booking-backend-z17o.onrender.com';

export const API_BASE_URL = isDevelopment ? devUri : prodUri;

// Helper function to construct API endpoints
export const getApiEndpoint = (path) => {
  const baseUrl = API_BASE_URL;
  // Remove leading slash if present to avoid double slashes
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  return `${baseUrl}${cleanPath}`;
};

export default {
  API_BASE_URL,
  getApiEndpoint
};
