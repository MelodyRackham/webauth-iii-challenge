const router = require('express').Router();
const bcrypt = require('bcryptjs');
const { validateUser, restricted } = require('../auth/restricted-middleware');
const Users = require('./user-model');

router.post('/register', validateUser, (req, res) => {
  const userData = req.body;
  const hash = bcrypt.hashSync(userData.password, 12);
  userData.password = hash;

  Users.add(userData)
    .then(user => {
      res.status(201).json(user);
    })
    .catch(() => {
      res.status(500).json({ error: 'unable to create new user at this time' });
    });
});

router.get('/', restricted, (req, res) => {
  Users.find()
    .then(users => {
      res.status(200).json(users);
    })
    .catch(() => {
      res.status(500).json({ error: 'unable to fetch all users at this time' });
    });
});

module.exports = router;
