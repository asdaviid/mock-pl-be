const Stadium = require('../models/stadium.model');
const errorHandler = require('../helpers/dbErrorHandler');
const { createStadiumDataSchema, updateStadiumDataSchema } = require('../validators/stadium.validator');

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
  createStadiumDataSchema.validate(req.body, { abortEarly: false })
    .then(() => {
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

const updateStadium = (req, res) => {
  updateStadiumDataSchema.validate(req.body, { abortEarly: false })
    .then(() => {
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

const getStadium = (req, res) => {
  Stadium
    .findById(req.params.stadium_id, '-_id -__v')
    .exec((err, stadium) => {
      if (err) {
        return res.status(400).json({
          error: errorHandler.getErrorMessage(err)
        });
      }

      if (!stadium) {
        return res.status(404).json({
          message: 'stadium not found.'
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