import User from '../models/User.js';
import expressAsyncHandler from 'express-async-handler';
import jwt from 'jsonwebtoken';
import crypto from'crypto';
import { sendResetPasswordEmail } from '../util/mailer.js'
import ApiError from '../util/ApiError.js'; 

export const register = expressAsyncHandler(async (req, res, next) => {
    const { username, password ,email} = req.body;
    // Check if username already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
        return next(new ApiError(400, 'Username already exists'));
    }
    //Check if the email is exists
    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
        return next(new ApiError(400, 'Email already exists'));
    }
    // Create a new user
    const newUser = new User({
        username,
        password,
        email
    });
    await newUser.save();
    res.status(201).send('User created successfully');

});

export const login = expressAsyncHandler(async (req, res, next) => {
    const { username, password } = req.body;
    // Check if user exists and password matches
    const user = await User.findOne({ username });
    if (!user) {
        return next(new ApiError(400, 'Invalid username or password'));
    }
    // Compare the provided password with the stored hashed password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
        return next(new ApiError(400, 'Invalid username or password'));
    }
    // Here you would typically generate a token and send it back
    const token = jwt.sign({ id: user._id, email: user.email, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.status(200).send({ message: 'Login successful', token });
});

export const requestResetPassword = expressAsyncHandler(async (req, res, next) => { 
    const { email } = req.body;

    if (!email) {
        return next(new ApiError(400, 'Email is required'));
    }
    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
        return next(new ApiError(400, 'User not found'));
    }
    // Here you would typically generate a reset token and send it to the user's email
    const resetToken = crypto.randomBytes(32).toString('hex');
    // Hash the reset token for security
    const hashedToken = crypto.createHash('sha256').update(resetToken).digest('hex');
    // Save the reset token and its expiration time in the user document
    user.resetPasswordToken = hashedToken;
    user.resetPasswordExpires = Date.now() + 3600000; // 1 hour
    await user.save();
    // Send resetToken to user's email (not implemented here)
    await sendResetPasswordEmail(user.email, resetToken);   
    res.status(200).send({ message: 'Reset password link sent to your email', resetToken: resetToken });
});

export const resetPassword = expressAsyncHandler(async (req, res, next) => {
    const { resetToken, newPassword } = req.body;

    // Hash the token
    const hashedToken = crypto.createHash('sha256').update(resetToken).digest('hex');
    // Find user by reset token
    const user = await User.findOne({ resetPasswordToken: hashedToken, resetPasswordExpires: { $gt: Date.now() } });
    if (!user) {
        return next(new ApiError(400, 'Invalid or expired reset token'));
    }
    // Update user's password
    user.password = newPassword;
    user.resetPasswordToken = undefined; // Clear the reset token
    user.resetPasswordExpires = undefined; // Clear the expiration time
    await user.save();
    res.status(200).send('Password has been reset successfully');
})