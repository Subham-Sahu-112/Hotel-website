# Commands & Testing Guide

## 🚀 Running the Application

### Development Mode (uses localhost:1000)
```bash
cd hotel-booking
npm install          # If needed
npm run dev          # Starts Vite dev server
```
- Opens on: `http://localhost:3000` or `http://localhost:5173`
- Backend: `http://localhost:1000`
- Hot reload: ✅ Enabled

### Production Mode (uses Render backend)
```bash
cd hotel-booking
npm run build        # Creates optimized build
npm run preview      # Preview production build locally
```
- Generates: `dist/` folder
- Backend: `https://hotel-booking-backend-z17o.onrender.com`
- Environment: Production

## 🧪 Testing API Endpoints

### 1. Browser DevTools Testing

#### In Development
```bash
npm run dev
# Open DevTools → Network tab
# Make a login request
# Should see: http://localhost:1000/customer/login
```

#### In Production
```bash
npm run build
npm run preview
# Open DevTools → Network tab
# Make a login request
# Should see: https://hotel-booking-backend-z17o.onrender.com/customer/login
```

### 2. Console Testing

In any component, you can check:
```javascript
// Open browser console
import { API_BASE_URL, getApiEndpoint } from '../config/apiConfig';

console.log('Base URL:', API_BASE_URL);
console.log('Login endpoint:', getApiEndpoint('/customer/login'));
```

### 3. Command Line Testing (Linux/Mac)

```bash
# Test development endpoint
curl http://localhost:1000/customer/login \
  -X POST \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"test123"}'

# Test production endpoint
curl https://hotel-booking-backend-z17o.onrender.com/customer/login \
  -X POST \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"test123"}'
```

### 4. Verification Script

Create `verify-api-config.js` in project root:
```javascript
import { API_BASE_URL, getApiEndpoint } from './src/config/apiConfig.js';

console.log('Current Environment:', import.meta.env.MODE);
console.log('API Base URL:', API_BASE_URL);
console.log('Sample Endpoints:');
console.log('  - Login:', getApiEndpoint('/customer/login'));
console.log('  - Register:', getApiEndpoint('/customer/register'));
console.log('  - Hotels:', getApiEndpoint('/all-hotels'));
```

Run with:
```bash
node --input-type=module verify-api-config.js
```

## 📋 Common Tasks

### Adding New API Endpoint

1. Use in component:
```jsx
import { getApiEndpoint } from '../../config/apiConfig';

const response = await fetch(getApiEndpoint('/new-endpoint'), options);
```

2. That's it! No .env changes needed.

### Changing Backend URL

1. Edit `.env`:
```properties
VITE_DEV_URI=http://localhost:5000      # Change from 1000 to 5000
VITE_PROD_URI=https://...               # Or update production URL
```

2. Restart dev server or rebuild production

### Debugging API Issues

```bash
# Check all files still using hardcoded URLs
grep -r "localhost:1000" src/
# Should return 0 results

# Check all imports of apiConfig
grep -r "from.*apiConfig" src/
# Shows all components using the config

# View current .env values
cat .env
```

## 🔍 Troubleshooting

### Issue: API calls failing in development
**Check:**
- Backend is running on `http://localhost:1000`
- No CORS errors in console
- Network tab shows correct URL format

**Fix:**
```bash
# Restart dev server
npm run dev

# Clear browser cache
# Ctrl+Shift+Delete (or Cmd+Shift+Delete on Mac)
```

### Issue: Production deployment showing wrong URL
**Check:**
- Build process completed: `npm run build`
- `.env` has correct `VITE_PROD_URI`
- Backend server is running and accessible

**Verify:**
```bash
npm run build
npm run preview
# Check Network tab for correct production URLs
```

### Issue: Environment variables not loading
**Check:**
- Variables in .env start with `VITE_`
- No spaces around `=` in .env
- Dev server restarted after .env changes

**Fix:**
```bash
# Stop dev server (Ctrl+C)
npm run dev
# Start fresh
```

## 📊 Performance Tips

### Optimize API Calls
```javascript
// Good: Batch related requests
const [hotels, bookings] = await Promise.all([
  fetch(getApiEndpoint('/all-hotels')).then(r => r.json()),
  fetch(getApiEndpoint('/bookings')).then(r => r.json())
]);

// Good: Use AbortController for cancellation
const controller = new AbortController();
fetch(getApiEndpoint('/hotels'), { 
  signal: controller.signal 
});
```

### Caching Strategy
```javascript
// Implement client-side caching
const cache = new Map();

const fetchCached = async (endpoint) => {
  if (cache.has(endpoint)) return cache.get(endpoint);
  
  const data = await fetch(getApiEndpoint(endpoint)).then(r => r.json());
  cache.set(endpoint, data);
  return data;
};
```

## 🚢 Deployment Checklist

Before deploying to production:

```bash
# 1. Build the project
npm run build

# 2. Check for errors
# (Check dist/ folder created successfully)

# 3. Test production build locally
npm run preview

# 4. Verify production URLs in Network tab
# Should show: https://hotel-booking-backend-z17o.onrender.com/...

# 5. Commit changes
git add -A
git commit -m "chore: configure environment-aware API endpoints"

# 6. Deploy
# Push to main branch (Vercel auto-deploys)
git push origin main
```

## 📞 Support Commands

```bash
# View environment mode
echo "Mode: $(npm run env-info)"

# Check Node version
node --version

# Check npm version
npm --version

# List scripts available
npm run

# Check for outdated packages
npm outdated

# Run development with verbose logging
npm run dev -- --debug
```

## 🔐 Security Notes

✅ Never commit `.env` with real credentials
✅ Use `.env.example` for team reference
✅ Rotate API keys regularly
✅ Keep environment variables in hosting platform settings

```bash
# Example .env.example (safe to commit)
VITE_DEV_URI=http://localhost:1000
VITE_PROD_URI=https://your-backend-url.onrender.com

# Example .env (NEVER commit with real values)
# VITE_DEV_URI=http://localhost:1000
# VITE_PROD_URI=https://actual-production-url.onrender.com
```

---

## Quick Reference Table

| Task | Command | Result |
|------|---------|--------|
| Development | `npm run dev` | Dev mode with localhost:1000 |
| Production Build | `npm run build` | Creates optimized build |
| Preview Prod | `npm run preview` | Test production build locally |
| Check URLs | `grep -r "localhost" src/` | Should return 0 results |
| View Config | `cat .env` | Shows current environment settings |
| Verify Setup | Read `API_QUICK_REFERENCE.md` | How to use in components |

---

**Last Updated**: October 17, 2025
**Status**: ✅ All Commands Ready
