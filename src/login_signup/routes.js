const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('./modal');
const sendVerificationEmail = require('./mailer'); // Assuming you saved the mailer code in mailer.js

const JWT_SECRET = 'Vatsal0501';


//singup code
// Signup Route
// Signup Route
router.post('/signup', async (req, res) => {
  const { username, email, password } = req.body;

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).send({ error: 'A user with this email already exists. Please log in.' });
    }

    const user = new User({ username, email, password });
    const token = user.generateEmailVerificationToken();
    await user.save();

    // Send verification email
    await sendVerificationEmail(user, token);
    
    res.status(201).send({ message: 'User created successfully. Please check your email to verify your account.' });
  } catch (err) {
    if (err.code && err.code === 11000) { // Duplicate key error
      return res.status(400).send({ error: 'A user with this email already exists. Please log in.' });
    }
    console.log(err);
    res.status(400).send({ error: 'An error occurred. Please try again later.' });
  }
});
//verify emial
router.get('/verify-email', async (req, res) => {
  const { token } = req.query; // Ensure the token parameter matches

  try {
    const user = await User.findOne({
      emailVerificationToken: token,
      emailVerificationTokenExpiry: { $gt: Date.now() }
    });

    if (!user) {
      return res.status(400).send({ error: 'Invalid or expired token' });
    }

    user.isEmailVerified = true;
    user.emailVerificationToken = undefined;
    user.emailVerificationTokenExpiry = undefined;
    await user.save();

    // Respond with an HTML page
    res.send(`
      <html>
        <head><title>Email Verified</title></head>
        <body>
          <h1>Email successfully verified</h1>
          <p>You can now <a href="https://viscocard.netlify.app/login">log in here</a>.</p>
        </body>
      </html>
    `);
  } catch (err) {
    res.status(500).send({ error: 'Server error during email verification' });
  }
});


// Login Route
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).send({ error: 'No account found with this email. Please check your email or sign up.' });
    }

    if (!user.isEmailVerified) {
      return res.status(400).send({ error: 'Email not verified. Please check your email for verification instructions.' });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).send({ error: 'Incorrect password. Please try again.' });
    }

    const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '1h' }); // Adjust token expiration
    res.send({ token });
  } catch (err) {
    res.status(500).send({ error: 'Server error. Please try again later.' });
  }
});



router.get('/:id', async (req, res) => {
  const _id = req.params.id;
  try {
    const response  = await User.findById(_id);
    res.send(response)
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
});

module.exports = router;
