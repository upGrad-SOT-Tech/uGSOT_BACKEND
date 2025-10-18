// Dynamic Route Configuration Utility
// This utility provides dynamic route URLs based on environment

import { getApiBaseUrl, getBaseUrl } from './urlConfig.js';

// API Routes Configuration
export const getApiRoutes = () => {
  const apiBaseUrl = getApiBaseUrl();
  
  return {
    auth: {
      register: `${apiBaseUrl}/api/v1/auth/register`,
      verifyOTP: `${apiBaseUrl}/api/v1/auth/verify-otp`,
      resendOTP: `${apiBaseUrl}/api/v1/auth/resend-otp`,
      login: `${apiBaseUrl}/api/v1/auth/login`,
      profile: `${apiBaseUrl}/api/v1/auth/profile`,
      updateProfile: `${apiBaseUrl}/api/v1/auth/profile`,
      logout: `${apiBaseUrl}/api/v1/auth/logout`
    },
    system: {
      health: `${apiBaseUrl}/health`,
      info: `${apiBaseUrl}/api/v1/info`,
      root: `${apiBaseUrl}/`
    }
  };
};

// Frontend Routes Configuration
export const getFrontendRoutes = () => {
  const baseUrl = getBaseUrl();
  
  return {
    home: `${baseUrl}/`,
    login: `${baseUrl}/login`,
    register: `${baseUrl}/register`,
    profile: `${baseUrl}/profile`,
    resetPassword: `${baseUrl}/reset-password`,
    dashboard: `${baseUrl}/dashboard`
  };
};

// Email Link Routes
export const getEmailRoutes = () => {
  const baseUrl = getBaseUrl();
  
  return {
    verifyEmail: `${baseUrl}/verify-email`,
    resetPassword: `${baseUrl}/reset-password`,
    welcome: `${baseUrl}/welcome`
  };
};

// Complete Route Configuration
export const getAllRoutes = () => {
  return {
    api: getApiRoutes(),
    frontend: getFrontendRoutes(),
    email: getEmailRoutes(),
    environment: {
      isProduction: process.env.NODE_ENV === 'production',
      environment: process.env.NODE_ENV || 'development'
    }
  };
};

// Route Builder Helper
export const buildRoute = (basePath, ...segments) => {
  const cleanSegments = segments.filter(segment => segment && segment.trim());
  const path = [basePath, ...cleanSegments].join('/').replace(/\/+/g, '/');
  return `${getApiBaseUrl()}${path}`;
};

// Frontend Route Builder Helper
export const buildFrontendRoute = (basePath, ...segments) => {
  const cleanSegments = segments.filter(segment => segment && segment.trim());
  const path = [basePath, ...cleanSegments].join('/').replace(/\/+/g, '/');
  return `${getBaseUrl()}${path}`;
};
