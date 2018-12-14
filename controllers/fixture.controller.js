const Fixture = require('../models/fixture.model');
const errorHandler = require('../helpers/dbErrorHandler');

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
}

const updateFixture = (req, res) => {
  const newKickoffDateTime = req.body;

  // return res.status(200).json(newKickoffDateTime);

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