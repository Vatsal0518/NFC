const jwt = require('jsonwebtoken');
const User = require('./modal');

const JWT_SECRET = 'Vatsal0501';

const auth = async (req, res, next) => {
  const token = req.header('Authorization').replace('Bearer ', '');

  if (!token) {
    return res.status(401).send({ error: 'No token provided' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    const user = await User.findById(decoded.userId);

    if (!user || !user.isEmailVerified) {
      return res.status(401).send({ error: 'User not found or email not verified' });
    }

    req.user = user;
    next();
  } catch (err) {
    res.status(401).send({ error: 'User not logged in' });
  }
};

module.exports = auth;
