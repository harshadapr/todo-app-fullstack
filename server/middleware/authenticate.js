// middleware/authenticate.js

const jwt = require('jsonwebtoken');
const User = require('../models/User');

const JWT_SECRET = "your_jwt_secret";  // Reminder: Store this securely.

module.exports = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, JWT_SECRET);
    
    const user = await User.findById(decoded.id);
    if (!user) {
      return res.status(401).json({ error: 'Authentication failed.' });
    }

    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ error: 'Authentication failed.' });
  }
};
