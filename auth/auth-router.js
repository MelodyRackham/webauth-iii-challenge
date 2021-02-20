const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Users = require('../users/user-model');

router.post('/login', (req, res) => {
  const { username, password } = req.body;
  console.log(username);

  Users.findBy({ username: username })
    .then(user => {
      if (user) {
        console.log(username, user);
        if (bcrypt.compareSync(password, user.password, 12)) {
          const token = signToken(user);
          res.status(200).json({
            message: 'Login successful',
            token,
          });
        } else {
          res.status(401).json({ message: 'Invalid credentials' });
        }
      } else {
        res.status(401).json({ message: 'Invalid credentials' });
      }
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({ error: 'unable to login at this time' });
    });
});

function signToken(user) {
  const payload = { username: user.username };
  const secret = process.env.JWT_SECRET || 'secret';
  const options = { expiresIn: '1h' };

  return jwt.sign(payload, secret, options);
}

module.exports = router;
