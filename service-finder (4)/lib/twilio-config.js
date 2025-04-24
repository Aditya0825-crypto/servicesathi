// Twilio Configuration
export const twilioConfig = {
  accountSid: process.env.TWILIO_ACCOUNT_SID,
  authToken: process.env.TWILIO_AUTH_TOKEN,
  phoneNumber: process.env.TWILIO_PHONE_NUMBER, // Your Twilio phone number
  adminPhone: process.env.ADMIN_PHONE_NUMBER // Admin's phone number
} 