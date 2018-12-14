const joi = require('joi');

module.exports.createUserDataSchema = joi.object().keys({
  firstname: joi.string().trim().required(),
  lastname: joi.string().trim().required(),
  username: joi.string().trim().required(),
  email: joi.string().email().trim().regex(/.+\@.+\..+/).required(),
  password: joi.string().trim().required(),
  role: joi.string().trim().required()
});

module.exports.loginUserDataSchema = joi.object().keys({
  email: joi.string().email().trim().regex(/.+\@.+\..+/).required(),
  password: joi.string().trim().required()
});