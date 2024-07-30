const nodemailer = require('nodemailer');

// Configure your SMTP transport (e.g., using Gmail)
const transporter = nodemailer.createTransport({
  service: 'Gmail', // or another email service
  auth: {
    user: 'your-email@gmail.com',
    pass: 'your-email-password'
  }
});

// Function to send verification email
const sendVerificationEmail = async (user, token) => {
  const verificationUrl = `http://yourdomain.com/verify-email?token=${token}`;

  const mailOptions = {
    from: 'no-reply@yourdomain.com',
    to: user.email,
    subject: 'Email Verification',
    html: `
      <h1>Email Verification</h1>
      <p>Please verify your email by clicking on the following link:</p>
      <a href="${verificationUrl}">Verify Email</a>
    `
  };

  await transporter.sendMail(mailOptions);
};

module.exports = sendVerificationEmail;
