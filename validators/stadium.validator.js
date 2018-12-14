const joi = require('joi');

module.exports.createStadiumDataSchema = joi.object().keys({
  name: joi.string().trim().required(),
  city: joi.string().trim().required(),
  capacity: joi.string().trim().required()
});

module.exports.updateStadiumDataSchema = joi.object().keys({
  name: joi.string().trim().required(),
  city: joi.string().trim().required(),
  capacity: joi.string().trim().required()
});