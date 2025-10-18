# Complete Vercel Deployment Guide for uGSOT Backend

## 🚀 **Step-by-Step Deployment Process**

### **Phase 1: Git Setup & Repository**

#### **Step 1: Initialize Git Repository**
```bash
# Navigate to your project directory
cd /Users/administrator/Desktop/uGSOT-Backend

# Initialize git repository
git init

# Add all files to git
git add .

# Create initial commit
git commit -m "Initial commit: uGSOT Backend API with dynamic routes"
```

#### **Step 2: Create GitHub Repository**
1. Go to [GitHub.com](https://github.com)
2. Click **"New repository"**
3. Repository name: `ugsot-backend`
4. Description: `uGSOT Backend API with authentication and email OTP`
5. Set to **Public** or **Private** (your choice)
6. **Don't** initialize with README (you already have files)
7. Click **"Create repository"**

#### **Step 3: Connect Local Repository to GitHub**
```bash
# Add remote origin (replace YOUR_USERNAME with your GitHub username)
git remote add origin https://github.com/YOUR_USERNAME/ugsot-backend.git

# Push to GitHub
git push -u origin main
```

### **Phase 2: Vercel Setup**

#### **Step 4: Install Vercel CLI**
```bash
# Install Vercel CLI globally
npm install -g vercel

# Verify installation
vercel --version
```

#### **Step 5: Login to Vercel**
```bash
# Login to Vercel
vercel login

# Follow the prompts to authenticate
```

#### **Step 6: Configure Vercel for Your Project**
```bash
# Navigate to your project directory
cd /Users/administrator/Desktop/uGSOT-Backend

# Initialize Vercel project
vercel

# Follow the prompts:
# ? Set up and deploy "~/Desktop/uGSOT-Backend"? [Y/n] Y
# ? Which scope do you want to deploy to? [Your Account]
# ? Link to existing project? [y/N] N
# ? What's your project's name? ugsot-backend
# ? In which directory is your code located? ./
```

### **Phase 3: Environment Variables Setup**

#### **Step 7: Set Environment Variables in Vercel Dashboard**

1. **Go to Vercel Dashboard:**
   - Visit [vercel.com/dashboard](https://vercel.com/dashboard)
   - Click on your `ugsot-backend` project

2. **Navigate to Settings:**
   - Click on **"Settings"** tab
   - Click on **"Environment Variables"**

3. **Add All Required Variables:**
   ```
   NODE_ENV = production
   MONGODB_URI = mongodb+srv://username:password@cluster.mongodb.net/ugsot
   JWT_SECRET = your-super-secret-production-jwt-key
   JWT_EXPIRE = 7d
   PORT = 5000
   EMAIL_USER = your-production-email@gmail.com
   EMAIL_PASS = your-production-app-password
   LOCAL_URL = http://localhost:3000
   PROD_URL = https://ugsot-backend.vercel.app
   ```

#### **Step 8: MongoDB Atlas Setup (if not already done)**

1. **Create MongoDB Atlas Account:**
   - Go to [mongodb.com/atlas](https://mongodb.com/atlas)
   - Sign up for free account

2. **Create Cluster:**
   - Click **"Build a Database"**
   - Choose **"FREE"** tier
   - Select region closest to you
   - Click **"Create"**

3. **Create Database User:**
   - Go to **"Database Access"**
   - Click **"Add New Database User"**
   - Username: `ugsot-user`
   - Password: Generate secure password
   - Click **"Add User"**

4. **Whitelist IP Address:**
   - Go to **"Network Access"**
   - Click **"Add IP Address"**
   - Click **"Allow Access from Anywhere"** (for development)
   - Click **"Confirm"**

5. **Get Connection String:**
   - Go to **"Clusters"**
   - Click **"Connect"**
   - Choose **"Connect your application"**
   - Copy the connection string
   - Replace `<password>` with your database user password

### **Phase 4: Email Service Setup**

#### **Step 9: Gmail App Password Setup**

1. **Enable 2-Factor Authentication:**
   - Go to [myaccount.google.com](https://myaccount.google.com)
   - Security → 2-Step Verification → Turn on

2. **Generate App Password:**
   - Go to [myaccount.google.com/apppasswords](https://myaccount.google.com/apppasswords)
   - Select app: **"Mail"**
   - Select device: **"Other"** → Name: **"uGSOT Backend"**
   - Click **"Generate"**
   - Copy the 16-character password

3. **Update Environment Variables:**
   - `EMAIL_USER` = your Gmail address
   - `EMAIL_PASS` = the 16-character app password

### **Phase 5: Deployment**

#### **Step 10: Deploy to Vercel**
```bash
# Deploy to production
vercel --prod

# Or deploy to preview
vercel
```

#### **Step 11: Verify Deployment**

1. **Check Deployment Status:**
   - Go to Vercel dashboard
   - Click on your project
   - Check deployment status

2. **Test Your API:**
   ```bash
   # Test health endpoint
   curl https://ugsot-backend.vercel.app/health
   
   # Test API info
   curl https://ugsot-backend.vercel.app/api/v1/info
   ```

### **Phase 6: Testing Production API**

#### **Step 12: Test Registration Flow**

1. **Register User:**
   ```bash
   curl -X POST https://ugsot-backend.vercel.app/api/v1/auth/register \
     -H "Content-Type: application/json" \
     -d '{
       "fullName": "Test User",
       "email": "test@example.com",
       "phone": "+1234567890",
       "password": "TestPass123",
       "confirmPassword": "TestPass123",
       "city": "Test City"
     }'
   ```

2. **Check Email for OTP**

3. **Verify OTP:**
   ```bash
   curl -X POST https://ugsot-backend.vercel.app/api/v1/auth/verify-otp \
     -H "Content-Type: application/json" \
     -d '{
       "email": "test@example.com",
       "otp": "123456"
     }'
   ```

### **Phase 7: Custom Domain (Optional)**

#### **Step 13: Add Custom Domain**

1. **In Vercel Dashboard:**
   - Go to your project
   - Click **"Settings"** → **"Domains"**
   - Add your domain: `api.yourdomain.com`
   - Follow DNS setup instructions

2. **Update Environment Variables:**
   ```
   PROD_URL = https://api.yourdomain.com
   ```

### **Phase 8: Monitoring & Maintenance**

#### **Step 14: Set Up Monitoring**

1. **Vercel Analytics:**
   - Enable in Vercel dashboard
   - Monitor API performance

2. **Error Tracking:**
   - Check Vercel function logs
   - Monitor deployment status

#### **Step 15: Continuous Deployment**

1. **Automatic Deployments:**
   - Every push to `main` branch triggers deployment
   - Preview deployments for pull requests

2. **Update Code:**
   ```bash
   # Make changes to your code
   git add .
   git commit -m "Update: Add new feature"
   git push origin main
   # Vercel automatically deploys
   ```

## 🔧 **Troubleshooting Common Issues**

### **Issue 1: Environment Variables Not Working**
**Solution:**
- Check variable names are exact (case-sensitive)
- Ensure all variables are set in Vercel dashboard
- Redeploy after adding variables

### **Issue 2: MongoDB Connection Failed**
**Solution:**
- Verify MongoDB Atlas cluster is running
- Check connection string format
- Ensure IP is whitelisted
- Verify database user credentials

### **Issue 3: Email Not Sending**
**Solution:**
- Verify Gmail app password is correct
- Check 2FA is enabled
- Ensure EMAIL_USER and EMAIL_PASS are set correctly

### **Issue 4: Build Errors**
**Solution:**
- Check Vercel build logs
- Ensure all dependencies are in package.json
- Verify Node.js version compatibility

## 📊 **Production Checklist**

- [ ] Git repository created and pushed
- [ ] Vercel project initialized
- [ ] All environment variables set
- [ ] MongoDB Atlas configured
- [ ] Gmail app password generated
- [ ] Initial deployment successful
- [ ] Health endpoint working
- [ ] Registration flow tested
- [ ] Email OTP working
- [ ] Custom domain configured (optional)
- [ ] Monitoring enabled

## 🎯 **Final Production URLs**

After successful deployment:

- **API Base URL:** `https://ugsot-backend.vercel.app`
- **Health Check:** `https://ugsot-backend.vercel.app/health`
- **API Info:** `https://ugsot-backend.vercel.app/api/v1/info`
- **Registration:** `https://ugsot-backend.vercel.app/api/v1/auth/register`

## 🚀 **Success!**

Your uGSOT Backend is now live on Vercel with:
- ✅ Dynamic URL configuration
- ✅ Email OTP verification
- ✅ MongoDB Atlas database
- ✅ Production-ready authentication
- ✅ Automatic deployments
- ✅ Environment-specific configuration

Your API is now ready for production use! 🎉
