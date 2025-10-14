import express from 'express';
import {
  register,
  verifyOTP,
  resendOTP,
  login,
  getProfile,
  updateProfile,
  logout
} from '../controllers/authController.js';
import {
  validateRegistration,
  validateOTPVerification,
  validateResendOTP,
  validateLogin
} from '../middleware/validation.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

// Public routes
router.post('/register', validateRegistration, register);
router.post('/verify-otp', validateOTPVerification, verifyOTP);
router.post('/resend-otp', validateResendOTP, resendOTP);
router.post('/login', validateLogin, login);

// Protected routes (require authentication)
router.get('/profile', authenticateToken, getProfile);
router.put('/profile', authenticateToken, updateProfile);
router.post('/logout', authenticateToken, logout);

export default router;
