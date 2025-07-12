import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: false,
  auth: {
    user: process.env.EMAIL_USERNAME,
    pass: process.env.EMAIL_PASSWORD
  }
});
console.log("SMTP_HOST = ", process.env.SMTP_HOST);

export const sendEmail = async (to, subject, text) => {
  const mailOptions = {
    from:"Notes App📒",
    to,
    subject,
    text
  };
  return await transporter.sendMail(mailOptions);
};

export const sendResetPasswordEmail = async (to, resetToken) => {
  const subject = 'Reset Your Password';
  const text = `You requested a password reset. Click the link below to reset your password:\n\n` +
    `http://your-app.com/reset-password?token=${resetToken}\n\n` +
    `If you did not request this, please ignore this email.`;
  return sendEmail(to, subject, text);
};