const nodemailer = require('nodemailer');

// Configure your SMTP transport (e.g., using Gmail)
const transporter = nodemailer.createTransport({

  host: 'smtp.gmail.com',
    port: 465,
    auth: {
        user: 'vatsalchauhan009@gmail.com',
        pass: 'jptkzekhfxormxfs'
    }
});

// Function to send verification email
const sendVerificationEmail = async (user, token) => {
  const verificationUrl = `https://nfc-1.onrender.com/verify-email?token=${token}`;

  const mailOptions = {
    from: 'vatsalchauhan0009@gmail.com',
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
