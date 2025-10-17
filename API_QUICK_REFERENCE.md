# Quick Reference: API Configuration

## Environment Variables (.env)

```properties
VITE_DEV_URI=http://localhost:1000          # Development backend
VITE_PROD_URI=https://hotel-booking-backend-z17o.onrender.com  # Production backend
```

## Using API Endpoints in Components

### Step 1: Import the helper function
```jsx
import { getApiEndpoint } from '../../config/apiConfig';
// Adjust path based on file location depth
```

### Step 2: Use getApiEndpoint() instead of hardcoded URLs
```jsx
// ❌ OLD WAY
fetch('http://localhost:1000/customer/login', options)

// ✅ NEW WAY
fetch(getApiEndpoint('/customer/login'), options)
```

## Available Functions

```javascript
import { API_BASE_URL, getApiEndpoint } from '../../config/apiConfig';

// Get the base URL directly (if needed)
console.log(API_BASE_URL);  // Returns current environment's base URL

// Get a complete endpoint
const endpoint = getApiEndpoint('/customer/login');
// Returns: http://localhost:1000/customer/login (dev)
//     or: https://hotel-booking-backend-z17o.onrender.com/customer/login (prod)
```

## Common Endpoints

```javascript
// Authentication
getApiEndpoint('/customer/login')
getApiEndpoint('/customer/register')
getApiEndpoint('/vender/login')
getApiEndpoint('/vender/register')
getApiEndpoint('/admin/login')
getApiEndpoint('/admin/register')

// Hotels
getApiEndpoint('/all-hotels')
getApiEndpoint('/hotels')
getApiEndpoint(`/hotels/${id}`)

// Bookings
getApiEndpoint('/bookings')
getApiEndpoint(`/bookings/${bookingId}/cancel`)

// Vendor Dashboard
getApiEndpoint('/vendor/bookings')
getApiEndpoint('/vendor/bookings/dashboard/stats')

// Admin Categories
getApiEndpoint('/categories')
getApiEndpoint('/categories/active')
getApiEndpoint(`/categories/${id}`)
getApiEndpoint(`/categories/${id}/toggle-status`)
```

## Environment Detection

The configuration automatically detects the environment:

- **Development**: When running `npm run dev` (Vite dev server)
- **Production**: When running built files from `npm run build`

No manual environment switching needed!

## Troubleshooting

### Issue: API calls going to wrong URL
**Solution**: Check that your import path depth is correct
```jsx
// If in src/pages/Hotel-View/HotelView.jsx
import { getApiEndpoint } from '../../config/apiConfig';  // ✅ Correct

// If in src/pages/vendor/Create-listing/CreateListing.jsx
import { getApiEndpoint } from '../../../config/apiConfig';  // ✅ Correct
```

### Issue: Variables showing as undefined
**Solution**: Ensure .env file has `VITE_` prefix for Vite to expose them
```properties
VITE_DEV_URI=...     # ✅ Will be accessible
DEV_URI=...          # ❌ Won't be accessible
```

## Reference Files
- Configuration: `src/config/apiConfig.js`
- Environment: `.env`
- Documentation: `API_CONFIG_MIGRATION.md`
