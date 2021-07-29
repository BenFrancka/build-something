const twilio = require('twilio');

const twilioClient = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

const sendText = (to, message) => {
  console.log('IM INVISIBLE!!!!');
  return twilioClient.messages.create({
    body: message,
    from: process.env.TWILIO_NUMBER,
    to: process.env.RECIPIENT_NUMBER,
  });
};

module.exports = { sendText };
