const Fixture = require('../models/fixture.model');
const errorHandler = require('../helpers/dbErrorHandler');
const { createFixtureDataSchema, updateFixtureDataSchema } = require('../validators/fixture.validator');

const listFixtures = (req, res) => {
  Fixture.find({}, '-__v -createdAt -updatedAt')
  .populate('home_team', 'name country')
  .populate('away_team', 'name country')
  .populate('venue', 'name city capacity')
  .exec((err, fixtures) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler.getErrorMessage(err)
      });
    };

    return res.status(200).json(fixtures);
  });
}

const createFixture = (req, res) => {
  createFixtureDataSchema.validate(req.body, { abortEarly: false })
    .then(() => {
      const fixture = new Fixture(req.body);

      fixture.save((err, fixture) => {
        if (err) {
          return res.status(400).json({
            error: errorHandler.getErrorMessage(err)
          });
        };

        res.status(201).json({
          message: 'fixture added'
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

const updateFixture = (req, res) => {
  updateFixtureDataSchema.validate(req.body, { abortEarly: false })
    .then(() => {
      const newKickoffDateTime = req.body;

      Fixture.findOneAndUpdate({
        _id: req.params.fixture_id
      }, { $set: newKickoffDateTime }, (err, fixture) => {
        if (err) {
          return res.status(400).json({
            error: errorHandler.getErrorMessage(err)
          });
        };

        if (fixture) {
          return res.status(200).json({
            message: 'fixture updated.'
          });
        } else {
          return res.status(404).json({
            message: 'fixture not found.'
          });
        }
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

const getFixture = (req, res) => {
  Fixture
    .findById(req.params.fixture_id, '-__v -createdAt -updatedAt')
    .populate('home_team', 'name country')
    .populate('away_team', 'name country')
    .populate('venue', 'name city capacity')
    .exec((err, fixture) => {
      if (err) {
        return res.status(400).json({
          error: errorHandler.getErrorMessage(err)
        });
      }

      return res.status(200).json(fixture);
    });
}

const deleteFixture = (req, res) => {
  Fixture.findOneAndDelete({
    _id: req.params.fixture_id
  }, (err) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler.getErrorMessage(err)
      });
    };
    
    return res.status(200).json({
      message: 'fixture deleted.'
    });
  });
}

module.exports = {
  listFixtures,
  createFixture,
  getFixture,
  deleteFixture,
  updateFixture
}