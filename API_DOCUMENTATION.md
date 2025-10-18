# uGSOT Backend API

A Node.js backend API for user registration and authentication with email OTP verification.

## Features

- User registration with email OTP verification
- JWT-based authentication
- Password hashing with bcrypt
- Input validation
- Referral code system
- Account security features
- Email service integration with Nodemailer

## API Endpoints

### Authentication Routes (`/api/v1/auth`)

#### 1. Register User
**POST** `/api/v1/auth/register`

Register a new user with the following fields:

```json
{
  "fullName": "John Doe",
  "email": "john@example.com",
  "phone": "+1234567890",
  "password": "SecurePass123",
  "confirmPassword": "SecurePass123",
  "city": "New York",
  "referralCode": "ABC123" // optional
}
```

**Response:**
```json
{
  "success": true,
  "message": "User registered successfully. Please verify your email address with the OTP sent.",
  "data": {
    "userId": "user_id",
    "fullName": "John Doe",
    "email": "john@example.com",
    "phone": "+1234567890",
    "city": "New York",
    "isEmailVerified": false
  }
}
```

#### 2. Verify OTP
**POST** `/api/v1/auth/verify-otp`

Verify email address with OTP:

```json
{
  "email": "john@example.com",
  "otp": "123456"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Email verified successfully",
  "data": {
    "token": "jwt_token_here",
    "user": {
      "id": "user_id",
      "fullName": "John Doe",
      "email": "john@example.com",
      "phone": "+1234567890",
      "city": "New York",
      "isPhoneVerified": false,
      "isEmailVerified": true
    }
  }
}
```

#### 3. Resend OTP
**POST** `/api/v1/auth/resend-otp`

Resend OTP to email address:

```json
{
  "email": "john@example.com"
}
```

#### 4. Login
**POST** `/api/v1/auth/login`

Login with email/phone and password:

```json
{
  "identifier": "john@example.com", // or phone number
  "password": "SecurePass123"
}
```

#### 5. Get Profile
**GET** `/api/v1/auth/profile`

Get user profile (requires authentication):

**Headers:**
```
Authorization: Bearer jwt_token_here
```

#### 6. Update Profile
**PUT** `/api/v1/auth/profile`

Update user profile (requires authentication):

```json
{
  "fullName": "John Smith",
  "city": "Los Angeles"
}
```

#### 7. Logout
**POST** `/api/v1/auth/logout`

Logout user (requires authentication).

## Environment Variables

Create a `.env` file with the following variables:

```env
MONGODB_URI=mongodb://localhost:27017/ugsot
JWT_SECRET=your-super-secret-jwt-key
JWT_EXPIRE=7d
PORT=5000
NODE_ENV=development
```

## Installation

1. Install dependencies:
```bash
npm install
```

2. Create `.env` file with your configuration

3. Start the server:
```bash
npm run dev
```

## Validation Rules

### Registration Fields:
- **Full Name**: Required, 2-50 characters, letters and spaces only
- **Email**: Required, valid email format, unique
- **Phone**: Required, 10-15 characters, valid phone format, unique
- **Password**: Required, minimum 6 characters, must contain uppercase, lowercase, and number
- **Confirm Password**: Required, must match password
- **City**: Required, 2-50 characters, letters and spaces only
- **Referral Code**: Optional, 6-10 alphanumeric characters, uppercase

## Security Features

- Password hashing with bcrypt
- JWT token authentication
- Account lockout after 5 failed login attempts
- Input validation and sanitization
- CORS and security headers
- Phone number verification with OTP

## Database Schema

The User model includes:
- Personal information (name, email, phone, city)
- Authentication fields (password, verification status)
- Security fields (login attempts, account lock)
- Referral system
- Timestamps

## Error Handling

All API responses follow a consistent format:

**Success:**
```json
{
  "success": true,
  "message": "Operation successful",
  "data": { ... }
}
```

**Error:**
```json
{
  "success": false,
  "message": "Error description",
  "errors": [ ... ] // for validation errors
}
```

## Next Steps

1. Integrate with SMS service (Twilio, AWS SNS) for OTP delivery
2. Add email verification functionality
3. Implement password reset feature
4. Add rate limiting for API endpoints
5. Add comprehensive logging
6. Add unit and integration tests
