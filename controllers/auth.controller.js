const bcryptjs = require('bcryptjs');
const jwt = require('jwt-simple');
const { jwtSecret } = require('../config/app.config');
const User = require('../models/user.model');
const errorHandler = require('../helpers/dbErrorHandler');

const { createUserDataSchema, loginUserDataSchema } = require('../validators/user.validator');

const register = (req, res) => {
  createUserDataSchema.validate(req.body, { abortEarly: false })
    .then(() => {
      const { firstname, lastname, username, email, password, role } = req.body;

      const user = new User({ firstname, lastname, username, email, password, role });

      bcryptjs.genSalt(10, (err, salt) => {
        bcryptjs.hash(user.password, salt, (error, hash) => {
          user.password = hash;

          user.save((err, user) => {
            if (err) {
              return res.status(400).json({
                error: errorHandler.getErrorMessage(err)
              });
            };
        
            res.status(201).json({
              message: 'user created',
              user
            });
          });
        });
      });
    })
    .catch(validationError => {
      const errorMessage = validationError
        .details
        .map(({message, type}) => ({
          message: message.replace(/['"]/g, ''),
          type
        }));
      return res.status(400).send(errorMessage);
    });
}

const login = (req, res) => {
  loginUserDataSchema.validate(req.body, { abortEarly: false })
    .then(async () => {
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
    })
    .catch(validationError => {
      const errorMessage = validationError
        .details
        .map(({message, type}) => ({
          message: message.replace(/['"]/g, ''),
          type
        }));
      return res.status(400).send(errorMessage);
    });
}

module.exports = {
  register,
  login
};