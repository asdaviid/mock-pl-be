const db = require('../config/db.config');
const Team = db.team;

const listTeams = async (req, res) => {
  const teams = await Team.findAll();

  return res.status(200)
    .json(teams);
}

const createTeam = (req, res) => {
  const { 
    name,
    website,
    founded,
    country,
    home_stadium,
    home_stadium_capacity
   } = req.body;

  Team.create({
    name,
    website,
    founded,
    country,
    home_stadium,
    home_stadium_capacity
  })
  .then(team => {
    res.status(201).json({
      message: 'team added',
      team
    })
  })
  .catch(error => {
    res.status(400).json({
      lmessage: 'unable to add team'
    });
  });

  return res.status(200)
}

const updateTeam = async (req, res) => {
  const team = await Team.findById(req.params.team_id);

  if (team) {
    const { 
      name,
      website,
      founded,
      country,
      home_stadium,
      home_stadium_capacity
     } = req.body;
  
    Team.update({
      name,
      website,
      founded,
      country,
      home_stadium,
      home_stadium_capacity
    }, { where: { id: req.params.team_id }})
    .then(() => {
      res.status(201).json({
        message: 'team updated',
        team
      })
    })
    .catch(error => {
      res.status(400).json({
        message: 'unable to update team'
      });
    });
  } else {
    return res.status(404).json({
      message: 'team not found'
    });
  }
}

const getTeam = async (req, res) => {
  const team = await Team.findById(req.params.team_id);

  if (team) {
    return res.status(200).json(team);
  } else {
    return res.status(404).json({
      message: 'team not found'
    });
  }
}

const deleteTeam = async (req, res) => {
  const team = await Team.findById(req.params.team_id);

  if (team) {
    Team.destroy({
      where: {
        id: req.params.team_id
      }
    })
    .then(() => {
      return res.status(200).json({
        message: 'team deleted'
      });
    })
    .catch(() => {
      return res.status(400).json({
        message: 'team could not be deleted'
      });
    });
  } else {
    return res.status(404).json({
      message: 'team not found'
    });
  }
}

module.exports = {
  listTeams,
  createTeam,
  getTeam,
  deleteTeam,
  updateTeam
}