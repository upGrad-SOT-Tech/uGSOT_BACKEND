# Dynamic Route Configuration Guide

## 🚀 **Complete Dynamic URL System**

Your uGSOT Backend now has a complete dynamic URL configuration system that automatically adapts to different environments (local vs production).

## 📋 **What's Dynamic:**

### **1. All API Routes**
- ✅ Automatically switches between local and production URLs
- ✅ No hardcoded URLs anywhere in the code
- ✅ Environment-aware route generation

### **2. Email Links**
- ✅ Password reset links use correct environment URL
- ✅ Welcome email links use correct environment URL
- ✅ All email templates use dynamic URLs

### **3. Server Information**
- ✅ Startup messages show correct URLs
- ✅ Health check includes environment info
- ✅ API info endpoint shows all available routes

## 🔧 **How It Works:**

### **Environment Detection:**
```javascript
// Automatically detects environment
const isProduction = process.env.NODE_ENV === 'production';
const baseUrl = isProduction ? process.env.PROD_URL : process.env.LOCAL_URL;
```

### **Route Generation:**
```javascript
// All routes are generated dynamically
const routes = {
  auth: {
    register: `${apiBaseUrl}/api/auth/register`,
    login: `${apiBaseUrl}/api/auth/login`,
    // ... all auth routes
  }
};
```

## 📊 **Available Endpoints:**

### **System Endpoints:**
- `GET /` - Root endpoint with environment info
- `GET /health` - Health check with environment info
- `GET /api/info` - Complete API information with all routes

### **Authentication Endpoints:**
- `POST /api/auth/register` - User registration
- `POST /api/auth/verify-otp` - Email OTP verification
- `POST /api/auth/resend-otp` - Resend OTP
- `POST /api/auth/login` - User login
- `GET /api/auth/profile` - Get user profile
- `PUT /api/auth/profile` - Update user profile
- `POST /api/auth/logout` - User logout

## 🌍 **Environment Configuration:**

### **Local Development:**
```env
NODE_ENV=development
LOCAL_URL=http://localhost:3000
PROD_URL=https://your-vercel-app.vercel.app
```

### **Production (Vercel):**
```env
NODE_ENV=production
LOCAL_URL=http://localhost:3000
PROD_URL=https://your-vercel-app.vercel.app
```

## 🧪 **Testing Dynamic Routes:**

### **1. Check Environment Info:**
```bash
GET http://localhost:5000/api/info
```

**Response:**
```json
{
  "success": true,
  "data": {
    "apiName": "uGSOT Backend API",
    "version": "1.0.0",
    "environment": "development",
    "isProduction": false,
    "baseUrl": "http://localhost:3000",
    "apiBaseUrl": "http://localhost:5000",
    "routes": {
      "api": {
        "auth": {
          "register": "http://localhost:5000/api/auth/register",
          "login": "http://localhost:5000/api/auth/login"
        }
      },
      "frontend": {
        "home": "http://localhost:3000/",
        "login": "http://localhost:3000/login"
      },
      "email": {
        "resetPassword": "http://localhost:3000/reset-password"
      }
    }
  }
}
```

### **2. Check Health:**
```bash
GET http://localhost:5000/health
```

**Response:**
```json
{
  "status": "OK",
  "uptime": 123.456,
  "timestamp": "2024-01-15T10:30:00.000Z",
  "environment": "development",
  "baseUrl": "http://localhost:3000"
}
```

## 🎯 **Benefits:**

1. ✅ **No Hardcoded URLs** - Everything is dynamic
2. ✅ **Environment Aware** - Automatically switches between local/production
3. ✅ **Easy Deployment** - Just set environment variables
4. ✅ **Consistent Configuration** - Single source of truth
5. ✅ **Self-Documenting** - API info endpoint shows all routes
6. ✅ **Future Proof** - Easy to add new routes

## 🔍 **Server Startup Output:**

When you start the server, you'll see:
```
🚀 Server is running on port 5000
🌍 Environment: development
🔗 API Base URL: http://localhost:5000
🌐 Frontend URL: http://localhost:3000
📊 Health Check: http://localhost:5000/health
ℹ️  API Info: http://localhost:5000/api/info
```

## 🚀 **Vercel Deployment:**

### **1. Set Environment Variables in Vercel:**
- `NODE_ENV` = `production`
- `LOCAL_URL` = `http://localhost:3000`
- `PROD_URL` = `https://your-vercel-app.vercel.app`
- `MONGODB_URI` = Your MongoDB Atlas connection string
- `JWT_SECRET` = Your production JWT secret
- `EMAIL_USER` = Your production email
- `EMAIL_PASS` = Your production email password

### **2. Deploy:**
```bash
vercel --prod
```

### **3. Test Production:**
```bash
GET https://your-vercel-app.vercel.app/api/info
```

## 🎉 **Result:**

Your API now automatically:
- ✅ Uses correct URLs for local development
- ✅ Uses correct URLs for production
- ✅ Generates all routes dynamically
- ✅ Provides complete API documentation
- ✅ Shows environment information
- ✅ Works seamlessly with Vercel

No more hardcoded URLs anywhere! 🚀
