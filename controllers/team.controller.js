const Team = require('../models/team.model');
const errorHandler = require('../helpers/dbErrorHandler');

const listTeams = (req, res) => {
  Team.find({}, '-_id -__v').exec((err, teams) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler.getErrorMessage(err)
      });
    };

    return res.status(200).json(teams);
  });
}

const createTeam = (req, res) => {
  const team = new Team(req.body);

  team.save((err, team) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler.getErrorMessage(err)
      });
    };

    res.status(201).json({
      message: 'team added',
      team
    });
  });
}

const updateTeam = async (req, res) => {
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
}

const getTeam = (req, res) => {
  Team
    .findById(req.params.team_id, '-_id -__v')
    .populate('home_stadium', '-_id -__v')
    .exec((err, team) => {
      if (err) {
        return res.status(400).json({
          error: errorHandler.getErrorMessage(err)
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