# 🚀 Render Deployment Guide - AurreX

Complete checklist to deploy both frontend and backend on Render.

---

## 📋 Pre-Deployment Checklist

### ✅ Code Quality
- [x] Remove all `console.log()` statements (except in error handlers)
- [x] Check for hardcoded passwords/secrets (use environment variables)
- [x] Verify all API endpoints use `process.env.API_URL` or relative paths
- [x] Test production build locally: `npm run build`
- [x] Check CORS configuration for production domain

### ✅ Environment Variables
- [x] Backend `.env` has no sensitive data exposed in repo
- [x] Frontend `.env.production` configured correctly
- [x] Database connection strings in backend `.env`

### ✅ Database
- [x] MongoDB Atlas cluster active
- [x] IP whitelist includes Render IPs (0.0.0.0/0 for testing, restrict later)
- [x] Database name and collection names finalized

---

## 🔧 Backend Deployment (Render)

### Step 1: Create Render Account
1. Go to [render.com](https://render.com)
2. Sign up with GitHub account
3. Authorize GitHub access

### Step 2: Configure Backend Service
1. Click **+ New** → **Web Service**
2. Connect your GitHub repository
3. Fill in details:
   - **Name**: `aurrex-backend`
   - **Environment**: `Node`
   - **Build Command**: `cd backend && npm install`
   - **Start Command**: `cd backend && node server.js`
   - **Plan**: Free tier (or Starter for production)

### Step 3: Set Environment Variables
Add in Render dashboard under **Environment**:
```env
PORT=10000
MONGO_URI=mongodb+srv://adityaji0022_db_user:Aditya0011%26@cluster0.sey4wrn.mongodb.net/?appName=Cluster0
JWT_SECRET=your_random_secret_here_change_this
JWT_REFRESH_SECRET=aurrex_refresh_secret_change_this
CLIENT_URL=https://your-frontend-render-url.onrender.com
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password
NODE_ENV=production
```

### Step 4: Deploy
1. Click **Create Web Service**
2. Render will automatically build and deploy
3. Wait for green checkmark (5-10 minutes)
4. Copy the service URL: `https://aurrex-backend.onrender.com`

---

## 🎨 Frontend Deployment (Render)

### Step 1: Create Static Site Service
1. Click **+ New** → **Static Site**
2. Connect your GitHub repository
3. Fill in details:
   - **Name**: `aurrex-frontend`
   - **Build Command**: `cd frontend && npm install && npm run build`
   - **Publish Directory**: `frontend/dist`

### Step 2: Configure Environment Variables (if needed)
Add environment variables if your frontend has `.env` requirements:
```env
VITE_API_URL=https://aurrex-backend.onrender.com
```

### Step 3: Deploy
1. Click **Create Static Site**
2. Render builds and deploys automatically
3. Copy frontend URL: `https://aurrex-frontend.onrender.com`

### Step 4: Update Backend
Go back to **Backend Service** → **Environment** and update:
```env
CLIENT_URL=https://aurrex-frontend.onrender.com
```
(This allows CORS requests from your frontend)

---

## ✅ Post-Deployment Checks

### 1. Test Backend Health
```bash
curl https://aurrex-backend.onrender.com/api/health
```
Expected response:
```json
{ "status": "ok", "app": "AurreX" }
```

### 2. Test Login
- Navigate to frontend URL
- Try login with demo credentials:
  - Username: `demo`
  - Password: `Demo@1234`

### 3. Check Console Logs
- Backend: Render dashboard → **Logs** tab
- Frontend: Browser DevTools (F12)

### 4. Monitor Database Connection
- Backend logs should show: `✅ MongoDB connected`
- Check MongoDB Atlas → Metrics for connection activity

---

## 🔒 Security Checklist

- [x] Change `JWT_SECRET` and `JWT_REFRESH_SECRET` to strong random values
- [x] Restrict MongoDB IP whitelist to Render IPs only (after testing)
- [x] Enable HTTPS (Render provides free SSL)
- [x] Set `NODE_ENV=production`
- [x] Remove debug routes/endpoints
- [x] Validate all user inputs on backend
- [x] Use rate limiting (already configured: 500 requests/15 min)

---

## 📊 Monitoring & Troubleshooting

### Common Issues:

**Issue**: "Cannot POST /api/auth/login"
- ✅ Verify backend is running (`/api/health` returns 200)
- ✅ Check CORS: `CLIENT_URL` environment variable matches frontend domain
- ✅ Restart backend service

**Issue**: "MongoDB connection timeout"
- ✅ Check MongoDB Atlas IP whitelist includes Render IPs
- ✅ Verify `MONGO_URI` is correct
- ✅ Test connection locally before deploying

**Issue**: Frontend returns "Network Error"
- ✅ Check browser console (F12) for error message
- ✅ Verify backend URL in frontend proxy/API call
- ✅ Check CORS headers in backend response

### Logs Location:
- **Backend Logs**: Render Dashboard → Service → Logs
- **Frontend Build Logs**: Render Dashboard → Static Site → Logs
- **Browser Logs**: Press F12 → Console tab

---

## 🚀 Deployment Success Indicators

✅ Backend service shows "Live" (green)
✅ `/api/health` returns 200 OK
✅ Frontend loads without 404 errors
✅ Login page renders correctly
✅ Can submit login form
✅ MongoDB logs show successful connection
✅ JWT token received after login
✅ Redirected to dashboard after login

---

## 📞 Support Resources

- **Render Docs**: https://render.com/docs
- **MongoDB Atlas Help**: https://docs.atlas.mongodb.com/
- **CORS Issues**: https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS
- **React/Vite**: https://vitejs.dev/guide/

---

## 📝 Notes

- Render free tier: Service spins down after 15 minutes of inactivity
- For production: Upgrade to paid plan for always-on service
- First deployment takes 10-15 minutes
- Subsequent deployments are faster (~2-5 minutes)

