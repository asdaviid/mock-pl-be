const Stadium = require('../models/stadium.model');
const errorHandler = require('../helpers/dbErrorHandler');

const listStadia = (req, res) => {
  Stadium.find({}, '-_id -__v').exec((err, stadia) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler.getErrorMessage(err)
      });
    };

    return res.status(200).json(stadia);
  });
}

const createStadium = (req, res) => {
  const stadium = new Stadium(req.body);

  stadium.save((err, stadium) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler.getErrorMessage(err)
      });
    };

    res.status(201).json({
      message: 'stadium added'
    });
  });
}

const updateStadium = (req, res) => {
  const updatedStadium = req.body;

  Stadium.findOneAndUpdate({
    _id: req.params.stadium_id
  }, { $set: updatedStadium }, (err, stadium) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler.getErrorMessage(err)
      });
    };

    if (stadium) {
      return res.status(200).json({
        message: 'stadium updated.'
      });
    } else {
      return res.status(404).json({
        message: 'stadium not found.'
      });
    }
  });
}

const getStadium = (req, res) => {
  Stadium
    .findById(req.params.stadium_id, '-_id -__v')
    .exec((err, stadium) => {
      if (err) {
        return res.status(400).json({
          error: errorHandler.getErrorMessage(err)
        });
      }

      return res.status(200).json(stadium);
    });
}

const deleteStadium = (req, res) => {
  Stadium.findOneAndDelete({
    _id: req.params.stadium_id
  }, (err) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler.getErrorMessage(err)
      });
    };
    
    return res.status(200).json({
      message: 'stadium deleted.'
    });
  });
}

module.exports = {
  listStadia,
  createStadium,
  getStadium,
  deleteStadium,
  updateStadium
}