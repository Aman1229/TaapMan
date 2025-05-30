//controller/auth.controller.js
const { User } = require('../models');
const jwt = require('jsonwebtoken');

exports.sendOTP = async (req, res) => {
  const { phone } = req.body;
  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  
  // Store in database instead of Redis
  const [user] = await User.upsert({
    phone,
    otp,
    otp_expiry: new Date(Date.now() + 300000) // 5 minutes
  });

  // Send OTP via DLT (your actual SMS sending code)
  console.log(`OTP for ${phone}: ${otp}`); // For testing

  res.json({ success: true });
};

exports.verifyOTP = async (req, res) => {
  const { phone, otp } = req.body;
  
  const user = await User.findOne({
    where: { phone }
  });

  if (user && user.otp === otp && user.otp_expiry > new Date()) {
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET);
    await user.update({ verified: true, otp: null });
    return res.json({ token });
  }

  res.status(401).json({ error: "Invalid OTP" });
};