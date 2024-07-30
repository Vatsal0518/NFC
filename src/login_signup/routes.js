const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('./modal');
const sendVerificationEmail = require('./mailer'); // Assuming you saved the mailer code in mailer.js

const JWT_SECRET = 'Vatsal0501';



// Signup Route
router.post('/signup', async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const user = new User({ username, email, password });
    const token1 = user.generateEmailVerificationToken();
    await user.save();

    // Send verification email
    await sendVerificationEmail(user, token);
    

    res.status(201).send({ message: 'User created successfully. Please check your email to verify your account.' });
  } catch (err) {
    console.log(err)
    
    res.status(400).send({ error: err.message });
  }
});

// Email Verification Route
// Email Verification Route
router.get('/verify-email', async (req, res) => {
  const { token1 } = req.query;

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
    res.status(400).send({ error: err.message });
  }
});

// Login Route
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user || !user.isEmailVerified) {
      return res.status(400).send({ error: 'Invalid email or password or email not verified' });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).send({ error: 'Invalid email or password' });
    }

    const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '30000000' });
    res.send({ token });
  } catch (err) {
    res.status(500).send({ error: 'Server error' });
  }
});
router.get('/admin', async (req, res) => {
  
  try {
    const response  = await User.find();
    res.send(response)
  } catch (err) {
    res.status(400).send({ error: err.message });
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
