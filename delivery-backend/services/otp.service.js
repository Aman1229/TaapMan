//services/otp.service.js
const twilio = require('twilio');

let client = null;

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;

if (accountSid && authToken && accountSid.startsWith('AC')) {
  client = twilio(accountSid, authToken);
} else {
  console.warn('⚠️ Twilio not initialized: Missing or invalid credentials');
}

const sendOTP = async (phone) => {
  if (!phone) {
    throw new Error('Phone number is required');
  }
  // Simulate sending OTP
  console.log(`Sending OTP to ${phone}`);
  return { otp: '123456' }; // Mocked OTP
};

const verifyOTP = async (phone, otp) => {
  if (!phone || !otp) {
    throw new Error('Phone and OTP are required');
  }
  // Simulate OTP verification
  console.log(`Verifying OTP ${otp} for phone ${phone}`);
  return { success: otp === '123456' }; // Mocked verification
};

module.exports = { sendOTP, verifyOTP };
