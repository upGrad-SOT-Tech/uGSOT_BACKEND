# 🔐 uGSOT Backend Authentication Flow

## 📊 Complete Authentication Flow Diagram

```
┌─────────────────────────────────────────────────────────────────────────────────┐
│                              CLIENT/Frontend                                    │
└─────────────────────────────────────────────────────────────────────────────────┘
                                        │
                                        ▼
┌─────────────────────────────────────────────────────────────────────────────────┐
│                              SERVER.JS                                          │
│  • Entry point of the application                                               │
│  • Sets up Express server, middleware, and routes                               │
│  • Connects to MongoDB database                                                 │
│  • Handles CORS, security, and error handling                                   │
└─────────────────────────────────────────────────────────────────────────────────┘
                                        │
                                        ▼
┌─────────────────────────────────────────────────────────────────────────────────┐
│                              ROUTES/AUTH.JS                                     │
│  • Defines all authentication endpoints                                         │
│  • Routes requests to appropriate controllers                                    │
│  • Applies validation and authentication middleware                             │
└─────────────────────────────────────────────────────────────────────────────────┘
                                        │
                                        ▼
┌─────────────────────────────────────────────────────────────────────────────────┐
│                           MIDDLEWARE/VALIDATION.JS                              │
│  • Validates request data before processing                                     │
│  • Checks email format, password strength, etc.                                 │
│  • Returns validation errors if data is invalid                                 │
└─────────────────────────────────────────────────────────────────────────────────┘
                                        │
                                        ▼
┌─────────────────────────────────────────────────────────────────────────────────┐
│                        CONTROLLERS/AUTHCONTROLLER.JS                           │
│  • Contains all authentication business logic                                  │
│  • Handles registration, login, OTP verification                               │
│  • Manages JWT token generation and validation                                 │
└─────────────────────────────────────────────────────────────────────────────────┘
                                        │
                                        ▼
┌─────────────────────────────────────────────────────────────────────────────────┐
│                           MODELS/UGSOTUSERS.JS                                 │
│  • Defines user data structure and schema                                       │
│  • Handles password hashing and OTP generation                                  │
│  • Contains database operations and validations                                 │
└─────────────────────────────────────────────────────────────────────────────────┘
                                        │
                                        ▼
┌─────────────────────────────────────────────────────────────────────────────────┐
│                              MONGODB DATABASE                                   │
│  • Stores user data, passwords (hashed), OTPs                                   │
│  • Maintains user sessions and verification status                              │
└─────────────────────────────────────────────────────────────────────────────────┘
```

## 🔄 Detailed Authentication Flow

### 1️⃣ **REGISTRATION FLOW**
```
Client → POST /api/v1/auth/register
    ↓
Routes/auth.js → validateRegistration middleware
    ↓
Controllers/authController.js → register()
    ↓
Models/ugsotusers.js → Create user + Generate OTP
    ↓
Utils/emailService.js → Send OTP email
    ↓
Response: User created, OTP sent
```

### 2️⃣ **OTP VERIFICATION FLOW**
```
Client → POST /api/v1/auth/verify-otp
    ↓
Routes/auth.js → validateOTPVerification middleware
    ↓
Controllers/authController.js → verifyOTP()
    ↓
Models/ugsotusers.js → Verify OTP + Mark email verified
    ↓
Utils/emailService.js → Send welcome email
    ↓
Response: JWT token + User data
```

### 3️⃣ **LOGIN FLOW**
```
Client → POST /api/v1/auth/login
    ↓
Routes/auth.js → validateLogin middleware
    ↓
Controllers/authController.js → login()
    ↓
Models/ugsotusers.js → Find user + Compare password
    ↓
Response: JWT token + User data
```

### 4️⃣ **PROTECTED ROUTES FLOW**
```
Client → GET/PUT /api/v1/auth/profile (with JWT token)
    ↓
Routes/auth.js → authenticateToken middleware
    ↓
Middleware/auth.js → Verify JWT + Check user exists
    ↓
Controllers/authController.js → getProfile()/updateProfile()
    ↓
Response: User profile data
```

### 5️⃣ **LOGOUT FLOW**
```
Client → POST /api/v1/auth/logout (with JWT token)
    ↓
Routes/auth.js → authenticateToken middleware
    ↓
Controllers/authController.js → logout()
    ↓
Response: Success message (client removes token)
```

## 📁 File Roles & Responsibilities

### **server.js**
- **Role**: Application entry point and server configuration
- **What it does**: Sets up Express server, connects to MongoDB, applies middleware, defines routes
- **Key functions**: Database connection, CORS setup, error handling, route mounting

### **routes/auth.js**
- **Role**: Authentication route definitions and middleware application
- **What it does**: Maps HTTP endpoints to controller functions, applies validation and auth middleware
- **Key functions**: Route definitions, middleware chaining, public/protected route separation

### **controllers/authController.js**
- **Role**: Authentication business logic and request handling
- **What it does**: Processes authentication requests, manages user sessions, handles JWT tokens
- **Key functions**: Registration, login, OTP verification, profile management, logout

### **models/ugsotusers.js**
- **Role**: User data model and database operations
- **What it does**: Defines user schema, handles password hashing, OTP generation, database queries
- **Key functions**: User creation, password comparison, OTP management, data validation

### **middleware/auth.js**
- **Role**: JWT token authentication and authorization
- **What it does**: Verifies JWT tokens, checks user permissions, protects routes
- **Key functions**: Token verification, user authentication, role-based access control

### **middleware/validation.js**
- **Role**: Request data validation and sanitization
- **What it does**: Validates incoming data, checks format and requirements, returns errors
- **Key functions**: Email validation, password strength, required field checks

### **utils/emailService.js**
- **Role**: Email sending functionality
- **What it does**: Sends OTP emails, welcome emails, handles email templates
- **Key functions**: OTP delivery, email templating, SMTP configuration

## 🔐 Security Features

1. **Password Hashing**: bcrypt with salt rounds
2. **JWT Tokens**: Secure token-based authentication
3. **OTP Verification**: Email verification with time-limited OTPs
4. **Account Locking**: Protection against brute force attacks
5. **Input Validation**: Comprehensive data validation
6. **CORS Protection**: Cross-origin request security
7. **Helmet Security**: HTTP header security

## 🚀 API Endpoints Summary

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/api/v1/auth/register` | Register new user | ❌ |
| POST | `/api/v1/auth/verify-otp` | Verify email OTP | ❌ |
| POST | `/api/v1/auth/resend-otp` | Resend OTP | ❌ |
| POST | `/api/v1/auth/login` | User login | ❌ |
| GET | `/api/v1/auth/profile` | Get user profile | ✅ |
| PUT | `/api/v1/auth/profile` | Update user profile | ✅ |
| POST | `/api/v1/auth/logout` | User logout | ✅ |

## 🔄 State Management

- **User States**: Active, Locked, Verified (Email/Phone)
- **Authentication States**: Logged in, Logged out, Token expired
- **Verification States**: Pending, Verified, Failed
- **Session Management**: JWT-based stateless authentication

---

# 📚 Complete API Documentation

## 🌐 Base URLs

### **Development**
- **Base URL**: `http://localhost:5000`
- **API Base URL**: `http://localhost:5000/api/v1`

### **Production (Vercel)**
- **Base URL**: `https://your-project-name.vercel.app`
- **API Base URL**: `https://your-project-name.vercel.app/api/v1`

---

## 🔐 Authentication Endpoints

### 1️⃣ **User Registration**

**Endpoint**: `POST /api/v1/auth/register`

**Full URL**: 
- Dev: `http://localhost:5000/api/v1/auth/register`
- Prod: `https://your-project-name.vercel.app/api/v1/auth/register`

**Request Body**:
```json
{
  "fullName": "John Doe",
  "email": "john.doe@example.com",
  "phone": "+1234567890",
  "password": "securePassword123",
  "city": "New York",
  "referralCode": "ABC123" // Optional
}
```

**Success Response** (201):
```json
{
  "success": true,
  "message": "User registered successfully. Please verify your email address with the OTP sent.",
  "data": {
    "userId": "64f8a1b2c3d4e5f6a7b8c9d0",
    "fullName": "John Doe",
    "email": "john.doe@example.com",
    "phone": "+1234567890",
    "city": "New York",
    "isEmailVerified": false
  }
}
```

**Error Response** (400):
```json
{
  "success": false,
  "message": "User with this email already exists"
}
```

---

### 2️⃣ **OTP Verification**

**Endpoint**: `POST /api/v1/auth/verify-otp`

**Full URL**: 
- Dev: `http://localhost:5000/api/v1/auth/verify-otp`
- Prod: `https://your-project-name.vercel.app/api/v1/auth/verify-otp`

**Request Body**:
```json
{
  "email": "john.doe@example.com",
  "otp": "123456"
}
```

**Success Response** (200):
```json
{
  "success": true,
  "message": "Email verified successfully",
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "user": {
      "id": "64f8a1b2c3d4e5f6a7b8c9d0",
      "fullName": "John Doe",
      "email": "john.doe@example.com",
      "phone": "+1234567890",
      "city": "New York",
      "isPhoneVerified": false,
      "isEmailVerified": true
    }
  }
}
```

**Error Response** (400):
```json
{
  "success": false,
  "message": "Invalid or expired OTP"
}
```

---

### 3️⃣ **Resend OTP**

**Endpoint**: `POST /api/v1/auth/resend-otp`

**Full URL**: 
- Dev: `http://localhost:5000/api/v1/auth/resend-otp`
- Prod: `https://your-project-name.vercel.app/api/v1/auth/resend-otp`

**Request Body**:
```json
{
  "email": "john.doe@example.com"
}
```

**Success Response** (200):
```json
{
  "success": true,
  "message": "OTP resent successfully"
}
```

---

### 4️⃣ **User Login**

**Endpoint**: `POST /api/v1/auth/login`

**Full URL**: 
- Dev: `http://localhost:5000/api/v1/auth/login`
- Prod: `https://your-project-name.vercel.app/api/v1/auth/login`

**Request Body**:
```json
{
  "identifier": "john.doe@example.com", // Can be email or phone
  "password": "securePassword123"
}
```

**Success Response** (200):
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "user": {
      "id": "64f8a1b2c3d4e5f6a7b8c9d0",
      "fullName": "John Doe",
      "email": "john.doe@example.com",
      "phone": "+1234567890",
      "city": "New York",
      "isPhoneVerified": false,
      "isEmailVerified": true,
      "role": "user"
    }
  }
}
```

**Error Response** (401):
```json
{
  "success": false,
  "message": "Invalid credentials"
}
```

**Account Locked Response** (423):
```json
{
  "success": false,
  "message": "Account is temporarily locked due to too many failed login attempts"
}
```

---

### 5️⃣ **Get User Profile**

**Endpoint**: `GET /api/v1/auth/profile`

**Full URL**: 
- Dev: `http://localhost:5000/api/v1/auth/profile`
- Prod: `https://your-project-name.vercel.app/api/v1/auth/profile`

**Headers**:
```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Success Response** (200):
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "64f8a1b2c3d4e5f6a7b8c9d0",
      "fullName": "John Doe",
      "email": "john.doe@example.com",
      "phone": "+1234567890",
      "city": "New York",
      "referralCode": "ABC123",
      "isPhoneVerified": false,
      "isEmailVerified": true,
      "role": "user",
      "createdAt": "2023-09-05T10:30:00.000Z"
    }
  }
}
```

**Error Response** (401):
```json
{
  "success": false,
  "message": "Access token is required"
}
```

---

### 6️⃣ **Update User Profile**

**Endpoint**: `PUT /api/v1/auth/profile`

**Full URL**: 
- Dev: `http://localhost:5000/api/v1/auth/profile`
- Prod: `https://your-project-name.vercel.app/api/v1/auth/profile`

**Headers**:
```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
Content-Type: application/json
```

**Request Body**:
```json
{
  "fullName": "John Smith",
  "city": "Los Angeles"
}
```

**Success Response** (200):
```json
{
  "success": true,
  "message": "Profile updated successfully",
  "data": {
    "user": {
      "id": "64f8a1b2c3d4e5f6a7b8c9d0",
      "fullName": "John Smith",
      "email": "john.doe@example.com",
      "phone": "+1234567890",
      "city": "Los Angeles",
      "referralCode": "ABC123",
      "isPhoneVerified": false,
      "isEmailVerified": true,
      "role": "user"
    }
  }
}
```

---

### 7️⃣ **User Logout**

**Endpoint**: `POST /api/v1/auth/logout`

**Full URL**: 
- Dev: `http://localhost:5000/api/v1/auth/logout`
- Prod: `https://your-project-name.vercel.app/api/v1/auth/logout`

**Headers**:
```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Success Response** (200):
```json
{
  "success": true,
  "message": "Logged out successfully"
}
```

---

## 🌐 General API Endpoints

### 8️⃣ **API Health Check**

**Endpoint**: `GET /health`

**Full URL**: 
- Dev: `http://localhost:5000/health`
- Prod: `https://your-project-name.vercel.app/health`

**Success Response** (200):
```json
{
  "status": "OK",
  "uptime": 3600.5,
  "timestamp": "2023-09-05T10:30:00.000Z",
  "environment": "production",
  "baseUrl": "https://your-project-name.vercel.app"
}
```

---

### 9️⃣ **API Information**

**Endpoint**: `GET /api/v1/info`

**Full URL**: 
- Dev: `http://localhost:5000/api/v1/info`
- Prod: `https://your-project-name.vercel.app/api/v1/info`

**Success Response** (200):
```json
{
  "success": true,
  "data": {
    "apiName": "uGSOT Backend API",
    "version": "1.0.0",
    "environment": "production",
    "isProduction": true,
    "baseUrl": "https://your-project-name.vercel.app",
    "apiBaseUrl": "https://your-project-name.vercel.app/api/v1",
    "port": 5000,
    "routes": [
      {
        "method": "POST",
        "path": "/api/v1/auth/register",
        "description": "Register new user"
      },
      {
        "method": "POST",
        "path": "/api/v1/auth/login",
        "description": "User login"
      }
    ],
    "documentation": "https://your-project-name.vercel.app/api-docs"
  }
}
```

---

### 🔟 **Root UI Dashboard**

**Endpoint**: `GET /`

**Full URL**: 
- Dev: `http://localhost:5000/`
- Prod: `https://your-project-name.vercel.app/`

**Response**: HTML page with beautiful UI showing API status and endpoints

---

## 🔧 Request/Response Headers

### **Common Request Headers**
```
Content-Type: application/json
Authorization: Bearer <jwt_token>  // For protected routes
Accept: application/json
```

### **Common Response Headers**
```
Content-Type: application/json
X-Powered-By: Express
Access-Control-Allow-Origin: *
Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS
Access-Control-Allow-Headers: Content-Type, Authorization
```

---

## 📝 Error Response Format

All error responses follow this format:

```json
{
  "success": false,
  "message": "Error description",
  "error": "Detailed error message (development only)"
}
```

### **Common HTTP Status Codes**

| Code | Description | Usage |
|------|-------------|-------|
| 200 | OK | Successful GET, PUT requests |
| 201 | Created | Successful POST requests |
| 400 | Bad Request | Validation errors, invalid data |
| 401 | Unauthorized | Missing/invalid authentication |
| 403 | Forbidden | Insufficient permissions |
| 404 | Not Found | Resource not found |
| 423 | Locked | Account temporarily locked |
| 500 | Internal Server Error | Server-side errors |

---

## 🔐 Authentication Flow Examples

### **Complete Registration Flow**

```bash
# 1. Register user
curl -X POST https://your-project-name.vercel.app/api/v1/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "fullName": "John Doe",
    "email": "john@example.com",
    "phone": "+1234567890",
    "password": "password123",
    "city": "New York"
  }'

# 2. Verify OTP (check email for OTP)
curl -X POST https://your-project-name.vercel.app/api/v1/auth/verify-otp \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "otp": "123456"
  }'
```

### **Complete Login Flow**

```bash
# 1. Login
curl -X POST https://your-project-name.vercel.app/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "identifier": "john@example.com",
    "password": "password123"
  }'

# 2. Use token for protected routes
curl -X GET https://your-project-name.vercel.app/api/v1/auth/profile \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

---

## 🛠️ Environment Variables Required

```bash
# Database
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/database

# JWT
JWT_SECRET=your-super-secret-jwt-key
JWT_EXPIRE=7d

# Email Service (Optional)
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
EMAIL_SERVICE=gmail

# Environment
NODE_ENV=production
```

---

## 📊 Rate Limiting & Security

- **Login Attempts**: 5 failed attempts = 2-hour lock
- **OTP Expiry**: 10 minutes
- **JWT Expiry**: 7 days (configurable)
- **Password Requirements**: Minimum 6 characters
- **Email Validation**: RFC compliant regex
- **Phone Validation**: International format support

---

## 🚀 Deployment URLs

After deploying to Vercel, your API will be available at:
- **Production URL**: `https://your-project-name.vercel.app`
- **API Base**: `https://your-project-name.vercel.app/api/v1`
- **Health Check**: `https://your-project-name.vercel.app/health`
- **API Info**: `https://your-project-name.vercel.app/api/v1/info`
- **UI Dashboard**: `https://your-project-name.vercel.app/`
