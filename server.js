import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.js';
import { getEnvironmentInfo, getApiBaseUrl } from './utils/urlConfig.js';
import { getAllRoutes } from './utils/routeConfig.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(helmet());
app.use(cors());
app.use(morgan('combined'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// MongoDB Connection
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error('Database connection error:', error);
    process.exit(1);
  }
};

// Connect to database
connectDB();

// Routes
app.use('/api/auth', authRoutes);

// Basic route
app.get('/', (req, res) => {
  const envInfo = getEnvironmentInfo();
  res.json({
    message: 'uGSOT Backend API is running!',
    status: 'success',
    timestamp: new Date().toISOString(),
    environment: envInfo.environment,
    apiBaseUrl: envInfo.apiBaseUrl,
    version: '1.0.0'
  });
});

// Health check route
app.get('/health', (req, res) => {
  const envInfo = getEnvironmentInfo();
  res.json({
    status: 'OK',
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
    environment: envInfo.environment,
    baseUrl: envInfo.baseUrl
  });
});

// API Info route
app.get('/api/info', (req, res) => {
  const envInfo = getEnvironmentInfo();
  const routes = getAllRoutes();
  res.json({
    success: true,
    data: {
      apiName: 'uGSOT Backend API',
      version: '1.0.0',
      environment: envInfo.environment,
      isProduction: envInfo.isProduction,
      baseUrl: envInfo.baseUrl,
      apiBaseUrl: envInfo.apiBaseUrl,
      port: envInfo.port,
      routes: routes,
      documentation: `${envInfo.baseUrl}/api-docs`
    }
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    message: 'Something went wrong!',
    error: process.env.NODE_ENV === 'development' ? err.message : 'Internal server error'
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    message: 'Route not found',
    status: 'error'
  });
});

// Start server
app.listen(PORT, () => {
  const envInfo = getEnvironmentInfo();
  console.log(`🚀 Server is running on port ${PORT}`);
  console.log(`🌍 Environment: ${envInfo.environment}`);
  console.log(`🔗 API Base URL: ${envInfo.apiBaseUrl}`);
  console.log(`🌐 Frontend URL: ${envInfo.baseUrl}`);
  console.log(`📊 Health Check: ${envInfo.apiBaseUrl}/health`);
  console.log(`ℹ️  API Info: ${envInfo.apiBaseUrl}/api/info`);
});

export default app;
