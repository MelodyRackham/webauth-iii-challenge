const jwt = require('jsonwebtoken');

module.exports = {
  validateUser,
  restricted,
};

function validateUser(req, res, next) {
  const userData = req.body;
  if (!Object.entries(userData).length) {
    return res.status(400).json({ message: 'No user data in request body' });
  }

  if (!('username' in userData) || !('password' in userData) || !('department' in userData)) {
    return res.status(400).json({ message: 'request body must include username, password, and department' });
  }

  next();
}

function restricted(req, res, next) {
  const { authorization } = req.headers;
  if (!Object.entries(authorization).length) {
    return res.status(400).json({ message: 'No authorized token in headers' });
  }
  const secret = process.env.JWT_SECRET || 'secret';

  jwt.verify(authorization, secret, (err, decoded) => {
    if (err) {
      res.status(401).json({ message: 'Invalid token' });
    } else {
      req.headers.token = decoded;
      next();
    }
  });
}
