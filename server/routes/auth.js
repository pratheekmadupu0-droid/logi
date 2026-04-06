const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const nodemailer = require('nodemailer');

const USERS_FILE = path.join(__dirname, '../users.json');

// Helper to read users
const readUsers = () => {
    try {
        const data = fs.readFileSync(USERS_FILE, 'utf-8');
        return JSON.parse(data);
    } catch (err) { return []; }
};

// Helper to write users
const writeUsers = (users) => {
    fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2));
};

// --- OTP LOGIC ---
const otpStore = new Map();
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER || 'placeholder@gmail.com',
    pass: process.env.EMAIL_PASS || 'app-password'
  }
});
const generateOTP = () => Math.floor(100000 + Math.random() * 900000).toString();

// Route: Send OTP (POST /api/auth/send-otp)
router.post('/send-otp', async (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ success: false, message: 'Email required' });
  const otp = generateOTP();
  const expiresAt = Date.now() + 10 * 60 * 1000;
  otpStore.set(email, { otp, expiresAt });
  console.log(`[AUTH] OTP for ${email}: ${otp}`);
  if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
      try {
        await transporter.sendMail({
          from: `"Logi Nutritional" <${process.env.EMAIL_USER}>`,
          to: email, subject: 'Access Code',
          html: `<div style="background:#FDFCF6;padding:40px;text-align:center;"><h1 style="color:#8B5E3C;">LOGI Access Code</h1><h2 style="font-size:32px;letter-spacing:10px;">${otp}</h2></div>`
        });
      } catch (err) { console.error('Email failed:', err.message); }
  }
  res.json({ success: true, message: 'OTP sent' });
});

// Route: Verify OTP
router.post('/verify-otp', (req, res) => {
  const { email, otp } = req.body;
  const record = otpStore.get(email);
  if (!record || Date.now() > record.expiresAt) return res.status(400).json({ success: false, message: 'Expired/Invalid OTP' });
  if (record.otp === otp) { otpStore.delete(email); return res.json({ success: true }); }
  res.status(400).json({ success: false, message: 'Incorrect OTP' });
});

// --- USER REGISTRY LOGIC ---

// Save/Update User Profile (POST /api/auth/register)
router.post('/register', (req, res) => {
    try {
        const userData = req.body; // { email, name, photoURL, uid, loginMethod, lastLogin }
        let users = readUsers();
        
        const existingIdx = users.findIndex(u => u.email === userData.email);
        const newUser = {
            ...userData,
            lastLogin: new Date().toISOString()
        };

        if (existingIdx > -1) {
            users[existingIdx] = { ...users[existingIdx], ...newUser };
        } else {
            users.unshift({ ...newUser, createdAt: new Date().toISOString() });
        }

        writeUsers(users);
        res.json({ success: true, user: newUser });
    } catch (err) {
        res.status(500).json({ message: "Registry update failed" });
    }
});

// Get All Users (GET /api/auth/users)
router.get('/users', (req, res) => {
    res.json(readUsers());
});

module.exports = router;
