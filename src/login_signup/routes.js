const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('./modal')

const JWT_SECRET = 'Vatsal0501';

// Signup Route
router.post('/signup', async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const user = new User({ username, email, password });
    await user.save();
    res.status(201).send({ message: 'User created successfully' });
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
});

// Login Route
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).send({ error: 'Invalid email or password' });
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