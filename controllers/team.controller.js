const Team = require('../models/team.model');
const errorHandler = require('../helpers/dbErrorHandler');
const { createFixtureDataSchema, updateFixtureDataSchema } = require('../validators/team.validator');

const listTeams = (req, res) => {
  Team.find({}, '_id name website founded country')
    .populate('home_stadium', '_id name city capacity')
    .exec((err, teams) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler.getErrorMessage(err)
      });
    };

    return res.status(200).json(teams);
  });
}

const createTeam = (req, res) => {
  createFixtureDataSchema.validate(req.body, { abortEarly: false })
    .then(() => {
      const team = new Team(req.body);

        team.save((err, team) => {
          if (err) {
            return res.status(400).json({
              error: errorHandler.getErrorMessage(err)
            });
          };

          res.status(201).json({
            message: 'team added'
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

const updateTeam = async (req, res) => {
  updateFixtureDataSchema.validate(req.body, { abortEarly: false })
    .then(() => {
      const updatedTeam = req.body;

      Team.findOneAndUpdate({
        _id: req.params.team_id
      }, { $set: updatedTeam }, (err, team) => {
        if (err) {
          return res.status(400).json({
            error: errorHandler.getErrorMessage(err)
          });
        };

        if (team) {
          return res.status(200).json({
            message: 'team updated.'
          });
        } else {
          return res.status(404).json({
            message: 'team not found.'
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

const getTeam = (req, res) => {
  Team
    .findById(req.params.team_id, '_id name website founded country')
    .populate('home_stadium', '_id name city capacity')
    .exec((err, team) => {
      if (err) {
        return res.status(400).json({
          error: errorHandler.getErrorMessage(err)
        });
      }

      if (!team) {
        return res.status(404).json({
          message: 'team not found.'
        });
      }

      return res.status(200).json(team);
    });
}

const deleteTeam = (req, res) => {
  Team.findOneAndDelete({
    _id: req.params.team_id
  }, (err) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler.getErrorMessage(err)
      });
    };
    
    return res.status(200).json({
      message: 'team deleted.'
    });
  });
}

module.exports = {
  listTeams,
  createTeam,
  getTeam,
  deleteTeam,
  updateTeam
}