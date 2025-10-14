// URL Configuration Utility
// This utility handles environment-specific URL configuration

export const getBaseUrl = () => {
  // Check if we're in production environment
  const isProduction = process.env.NODE_ENV === 'production';
  
  // Return appropriate URL based on environment
  if (isProduction) {
    return process.env.PROD_URL;
  } else {
    return process.env.LOCAL_URL;
  }
};

// Get API base URL (for internal API calls)
export const getApiBaseUrl = () => {
  const isProduction = process.env.NODE_ENV === 'production';
  
  if (isProduction) {
    return process.env.PROD_URL;
  } else {
    return `http://localhost:${process.env.PORT || 5000}`;
  }
};

// Get frontend URL (for email links, redirects, etc.)
export const getFrontendUrl = () => {
  return getBaseUrl();
};

// Get full URL for specific routes
export const getFullUrl = (path = '') => {
  const baseUrl = getBaseUrl();
  return `${baseUrl}${path.startsWith('/') ? path : `/${path}`}`;
};

// Environment info
export const getEnvironmentInfo = () => {
  return {
    environment: process.env.NODE_ENV || 'development',
    isProduction: process.env.NODE_ENV === 'production',
    baseUrl: getBaseUrl(),
    apiBaseUrl: getApiBaseUrl(),
    port: process.env.PORT || 5000
  };
};
