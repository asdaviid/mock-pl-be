const bcryptjs = require('bcryptjs');
const jwt = require('jwt-simple');
const { jwtSecret } = require('../config/app.config');
const User = require('../models/user.model');

const register = (req, res) => {
  const { firstname, lastname, username, email, password, role } = req.body;

  const user = new User({ firstname, lastname, username, email, password, role });

  bcryptjs.genSalt(10, (err, salt) => {
    bcryptjs.hash(user.password, salt, (error, hash) => {
      user.password = hash;

      user
        .save()
        .then(createdUser => {
          return res.status(201).json({
            message: 'user created',
            user: createdUser
          });
        })
        .catch(error => {
          return res.status(400).json({
            message: 'user could not be created'
          });
        });
    });
  });
}

const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({
    email: email
  });

  if (user) {
    User.comparePassword(password, user.password, (err, isMatch) => {
      if (err) throw err;

      if (isMatch) {
        const payload = { user };
        const token = jwt.encode(payload, jwtSecret);

        res.cookie('t', token, {
          expire: new Date() + 999
        });

        return res.status(200).json({
          message: 'user logged in',
          user,
          token
        });
      } else {
        return res.status(401).json({
          message: 'password incorrect'
        });
      }
    });
  } else {
    return res.status(404).json({
      message: 'user not found'
    });
  }
}

module.exports = {
  register,
  login
};