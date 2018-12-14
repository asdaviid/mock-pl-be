const joi = require('joi');

module.exports.createFixtureDataSchema = joi.object().keys({
  name: joi.string().trim().required(),
  website: joi.string().trim().required(),
  founded: joi.string().trim().required(),
  country: joi.string().trim().required(),
  home_stadium: joi.string().trim().required(),
});

module.exports.updateFixtureDataSchema = joi.object().keys({
  name: joi.string().trim(),
  website: joi.string().trim(),
  founded: joi.string().trim(),
  country: joi.string().trim(),
  home_stadium: joi.string().trim(),
});