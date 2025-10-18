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
app.use('/api/v1/auth', authRoutes);

// UI Route for root path
app.get('/', (req, res) => {
  const envInfo = getEnvironmentInfo();
  const routes = getAllRoutes();
  
  const html = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>uGSOT Backend API</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 20px;
        }
        
        .container {
            background: white;
            border-radius: 20px;
            box-shadow: 0 20px 40px rgba(0,0,0,0.1);
            padding: 40px;
            max-width: 800px;
            width: 100%;
        }
        
        .header {
            text-align: center;
            margin-bottom: 30px;
        }
        
        .logo {
            font-size: 2.5rem;
            font-weight: bold;
            background: linear-gradient(135deg, #667eea, #764ba2);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            margin-bottom: 10px;
        }
        
        .subtitle {
            color: #666;
            font-size: 1.1rem;
        }
        
        .status {
            display: inline-block;
            background: #4CAF50;
            color: white;
            padding: 8px 16px;
            border-radius: 20px;
            font-size: 0.9rem;
            margin: 20px 0;
        }
        
        .info-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 20px;
            margin: 30px 0;
        }
        
        .info-card {
            background: #f8f9fa;
            padding: 20px;
            border-radius: 10px;
            border-left: 4px solid #667eea;
        }
        
        .info-card h3 {
            color: #333;
            margin-bottom: 10px;
            font-size: 1.1rem;
        }
        
        .info-card p {
            color: #666;
            font-size: 0.9rem;
        }
        
        .endpoints {
            margin: 30px 0;
        }
        
        .endpoints h3 {
            color: #333;
            margin-bottom: 15px;
        }
        
        .endpoint {
            background: #f8f9fa;
            padding: 15px;
            margin: 10px 0;
            border-radius: 8px;
            border-left: 4px solid #28a745;
        }
        
        .endpoint-method {
            display: inline-block;
            background: #28a745;
            color: white;
            padding: 4px 8px;
            border-radius: 4px;
            font-size: 0.8rem;
            margin-right: 10px;
        }
        
        .endpoint-path {
            font-family: 'Courier New', monospace;
            color: #333;
        }
        
        .footer {
            text-align: center;
            margin-top: 30px;
            padding-top: 20px;
            border-top: 1px solid #eee;
            color: #666;
        }
        
        .timestamp {
            font-size: 0.8rem;
            color: #999;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <div class="logo">uGSOT</div>
            <div class="subtitle">Backend API Server</div>
            <div class="status">🟢 Online & Running</div>
        </div>
        
        <div class="info-grid">
            <div class="info-card">
                <h3>🌍 Environment</h3>
                <p>${envInfo.environment}</p>
            </div>
            <div class="info-card">
                <h3>📦 Version</h3>
                <p>1.0.0</p>
            </div>
            <div class="info-card">
                <h3>🔗 API Base URL (auto change based on environment)</h3>
                <p>${envInfo.apiBaseUrl}</p>
            </div>
            <div class="info-card">
                <h3>⚡ Status</h3>
                <p>Production Ready</p>
            </div>
        </div>
        
        <div class="endpoints">
            <h3>🚀 Available Endpoints</h3>
            <div class="endpoint">
                <span class="endpoint-method">GET</span>
                <span class="endpoint-path">/health</span>
                <span style="color: #666; margin-left: 10px;">- Health check</span>
            </div>
            <div class="endpoint">
                <span class="endpoint-method">GET</span>
                <span class="endpoint-path">/api/v1/info</span>
                <span style="color: #666; margin-left: 10px;">- API information</span>
            </div>
            <div class="endpoint">
                <span class="endpoint-method">POST</span>
                <span class="endpoint-path">/api/v1/auth/register</span>
                <span style="color: #666; margin-left: 10px;">- User registration</span>
            </div>
            <div class="endpoint">
                <span class="endpoint-method">POST</span>
                <span class="endpoint-path">/api/v1/auth/login</span>
                <span style="color: #666; margin-left: 10px;">- User login</span>
            </div>
            <div class="endpoint">
                <span class="endpoint-method">GET</span>
                <span class="endpoint-path">/api/v1/auth/profile</span>
                <span style="color: #666; margin-left: 10px;">- Get user profile</span>
            </div>
        </div>
        
        <div class="footer">
            <p>Powered by Node.js, Express & MongoDB</p>
            <p class="timestamp">Last updated: ${new Date().toLocaleString()}</p>
        </div>
    </div>
</body>
</html>
  `;
  
  res.send(html);
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
app.get('/api/v1/info', (req, res) => {
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
  console.log(`ℹ️  API Info: ${envInfo.apiBaseUrl}/api/v1/info`);
});

export default app;
