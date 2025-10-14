# Environment Configuration Guide

## 📋 **Environment Variables Setup**

### **Local Development (.env)**
```env
# Database
MONGODB_URI=mongodb://localhost:27017/ugsot

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
JWT_EXPIRE=7d

# Server Configuration
PORT=5000
NODE_ENV=development

# Email Configuration
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password

# URL Configuration
LOCAL_URL=http://localhost:3000
PROD_URL=https://your-vercel-app.vercel.app
```

### **Production (Vercel Environment Variables)**
```env
# Database
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/ugsot

# JWT Configuration
JWT_SECRET=your-production-jwt-secret-key
JWT_EXPIRE=7d

# Server Configuration
PORT=5000
NODE_ENV=production

# Email Configuration
EMAIL_USER=your-production-email@gmail.com
EMAIL_PASS=your-production-app-password

# URL Configuration
LOCAL_URL=http://localhost:3000
PROD_URL=https://your-vercel-app.vercel.app
```

## 🚀 **Vercel Deployment Setup**

### **1. Install Vercel CLI**
```bash
npm install -g vercel
```

### **2. Login to Vercel**
```bash
vercel login
```

### **3. Deploy**
```bash
vercel
```

### **4. Set Environment Variables in Vercel Dashboard**
1. Go to your project in Vercel dashboard
2. Click on "Settings" tab
3. Click on "Environment Variables"
4. Add all production environment variables

## 🔧 **URL Configuration Usage**

### **In your code:**
```javascript
import { getBaseUrl, getFullUrl, getEnvironmentInfo } from './utils/urlConfig.js';

// Get base URL
const baseUrl = getBaseUrl();

// Get full URL for specific route
const resetUrl = getFullUrl('/reset-password?token=123');

// Get environment info
const envInfo = getEnvironmentInfo();
console.log(envInfo);
```

### **Environment Detection:**
- **Development:** Uses `LOCAL_URL`
- **Production:** Uses `PROD_URL`

## 📊 **Environment Variables Reference**

| Variable | Development | Production | Description |
|----------|-------------|------------|-------------|
| `NODE_ENV` | `development` | `production` | Environment mode |
| `LOCAL_URL` | `http://localhost:3000` | `http://localhost:3000` | Local frontend URL |
| `PROD_URL` | `https://your-app.vercel.app` | `https://your-app.vercel.app` | Production frontend URL |
| `MONGODB_URI` | Local MongoDB | MongoDB Atlas | Database connection |
| `EMAIL_USER` | Dev email | Production email | Email service user |
| `EMAIL_PASS` | Dev app password | Production app password | Email service password |

## 🎯 **Benefits of This Setup**

1. ✅ **Environment-specific URLs** - No hardcoded URLs
2. ✅ **Easy deployment** - Just set environment variables
3. ✅ **Consistent configuration** - Single source of truth
4. ✅ **Flexible** - Easy to change URLs without code changes
5. ✅ **Production ready** - Works seamlessly with Vercel

## 🔍 **Testing URLs**

### **Local Testing:**
- API: `http://localhost:5000`
- Frontend: `http://localhost:3000`

### **Production Testing:**
- API: `https://your-vercel-app.vercel.app`
- Frontend: `https://your-vercel-app.vercel.app`

## 🚨 **Important Notes**

1. **Never commit `.env` file** - It's already in `.gitignore`
2. **Use different JWT secrets** for dev and production
3. **Use different email accounts** for dev and production
4. **Set all environment variables** in Vercel dashboard
5. **Test both environments** before going live
