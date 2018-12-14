const joi = require('joi');

module.exports.createFixtureDataSchema = joi.object().keys({
  home_team: joi.string().trim().required(),
  away_team: joi.string().trim().required(),
  competition: joi.string().trim().required(),
  kickoff: joi.string().trim().required(),
  venue: joi.string().trim().required(),
});

module.exports.updateFixtureDataSchema = joi.object().keys({
  home_team: joi.string().trim(),
  away_team: joi.string().trim(),
  competition: joi.string().trim(),
  kickoff: joi.string().trim(),
  venue: joi.string().trim(),
});