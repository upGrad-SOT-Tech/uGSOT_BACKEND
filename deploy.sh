#!/bin/bash

# uGSOT Backend - Quick Deployment Script
# This script helps you deploy to Vercel quickly

echo "🚀 uGSOT Backend Deployment Script"
echo "=================================="

# Check if vercel CLI is installed
if ! command -v vercel &> /dev/null; then
    echo "❌ Vercel CLI not found. Installing..."
    npm install -g vercel
fi

# Check if user is logged in to Vercel
if ! vercel whoami &> /dev/null; then
    echo "🔐 Please login to Vercel first:"
    vercel login
fi

echo "📦 Installing dependencies..."
npm install

echo "🧪 Running tests (if any)..."
# npm test

echo "🚀 Deploying to Vercel..."
vercel --prod

echo "✅ Deployment complete!"
echo "🌐 Your API is now live at: https://ugsot-backend.vercel.app"
echo "📊 Health check: https://ugsot-backend.vercel.app/health"
echo "ℹ️  API info: https://ugsot-backend.vercel.app/api/info"

echo ""
echo "🔧 Don't forget to set environment variables in Vercel dashboard:"
echo "   - NODE_ENV=production"
echo "   - MONGODB_URI=your-mongodb-connection-string"
echo "   - JWT_SECRET=your-jwt-secret"
echo "   - EMAIL_USER=your-email@gmail.com"
echo "   - EMAIL_PASS=your-app-password"
echo "   - LOCAL_URL=http://localhost:3000"
echo "   - PROD_URL=https://ugsot-backend.vercel.app"
