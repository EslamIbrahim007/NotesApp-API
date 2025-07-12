import express from 'express';
const router = express.Router();
import {
    register,
    login,
    requestResetPassword,
    resetPassword
} from '../controllers/auth.controller.js';
import { validateRequest } from '../middlewares/validate.js';
import { loginLimiter, forgotPasswordLimiter } from '../middlewares/rateLimiter.js';

router.post('/register', loginLimiter,validateRequest, register);
router.post('/login', validateRequest, login);
router.post('/forgot-password', forgotPasswordLimiter,requestResetPassword);
router.post('/reset-password', validateRequest, resetPassword);

export default router;