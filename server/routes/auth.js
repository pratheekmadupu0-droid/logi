const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');

// In-memory OTP storage (for production, use Redis or a database)
const otpStore = new Map();

// Nodemailer transporter (Placeholder - User should update with real SMTP credentials)
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER || 'placeholder@gmail.com',
    pass: process.env.EMAIL_PASS || 'app-password'
  }
});

// Generate 6-digit OTP
const generateOTP = () => Math.floor(100000 + Math.random() * 900000).toString();

// Route: Send OTP (POST /api/auth/send-otp)
router.post('/send-otp', async (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ success: false, message: 'Email required' });

  const otp = generateOTP();
  const expiresAt = Date.now() + 10 * 60 * 1000; // 10 minutes expiry

  // Store OTP
  otpStore.set(email, { otp, expiresAt });

  // For testing/demo: Always success and console log OTP
  console.log(`[AUTH] OTP for ${email}: ${otp}`);

  // Send Email (Only if credentials provided)
  if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
      try {
        await transporter.sendMail({
          from: `"Logi Nutritional" <${process.env.EMAIL_USER}>`,
          to: email,
          subject: 'Your Access Code - Logi Nutritional',
          html: `
            <div style="font-family: Arial, sans-serif; padding: 40px; background-color: #FDFCF6; text-align: center;">
              <h1 style="color: #8B5E3C; margin-bottom: 20px;">LOGI</h1>
              <p style="font-size: 18px; color: #555;">Use the following code to access your member portal:</p>
              <div style="font-size: 40px; font-weight: bold; letter-spacing: 12px; color: #8B5E3C; margin: 40px 0; padding: 20px; border: 2px solid #EADDCA; display: inline-block; background-color: #fff;">
                ${otp}
              </div>
              <p style="color: #999; font-size: 14px;">This code will expire in 10 minutes.</p>
              <hr style="border: 0; border-top: 1px solid #EADDCA; margin-top: 40px;">
              <p style="color: #666; font-size: 12px;">Logi Nutritional Products - Purity in every grain.</p>
            </div>
          `
        });
      } catch (err) {
        console.error('Email sending failed:', err.message);
        // We still return success for demo purposes so they can use the console logged OTP
      }
  }

  res.json({ success: true, message: 'OTP sent to email (Check console if SMTP was not configured)' });
});

// Route: Verify OTP (POST /api/auth/verify-otp)
router.post('/verify-otp', (req, res) => {
  const { email, otp } = req.body;
  if (!email || !otp) return res.status(400).json({ success: false, message: 'Email and OTP required' });

  const record = otpStore.get(email);

  if (!record) {
    return res.status(400).json({ success: false, message: 'OTP not requested for this email' });
  }

  if (Date.now() > record.expiresAt) {
    otpStore.delete(email);
    return res.status(400).json({ success: false, message: 'OTP expired' });
  }

  if (record.otp === otp) {
    otpStore.delete(email); // One-time use
    return res.json({ success: true, message: 'OTP verified' });
  } else {
    return res.status(400).json({ success: false, message: 'Incorrect OTP code' });
  }
});

module.exports = router;
