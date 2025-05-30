//route/auth.js
const express = require('express');
const router = express.Router();
const otpService = require('../services/otp.service');

router.post('/send-otp', async (req, res) => {
  const { phone } = req.body;
  try {
    console.log('Phone:', phone);
    const otpResponse = await otpService.sendOTP(phone);
    console.log('OTP Response:', otpResponse);
    res.json({ success: true, message: 'OTP sent', otp: otpResponse.otp });
  } catch (err) {
    console.error('Error in send-otp:', err);
    res.status(500).json({ success: false, message: 'Failed to send OTP' });
  }
});

// Verify OTP route (mocked)
router.post('/verify-otp', async (req, res) => {
  const { phone, otp } = req.body;
  try {
    const verificationResponse = await otpService.verifyOTP(phone, otp);
    res.json(verificationResponse);
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Failed to verify OTP' });
  }
});

module.exports = router;