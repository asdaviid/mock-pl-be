const express = require('express');
const teamCtrl = require('../controllers/team.controller');

const router = express.Router();

router.route('/teams')
  .get(teamCtrl.listTeams) // GET /teams
  .post(teamCtrl.createTeam); // POST /teams

router.route('/teams/:team_id')
  .get(teamCtrl.getTeam) // GET /teams/1
  .put(teamCtrl.updateTeam) // PUT /teams/1
  .delete(teamCtrl.deleteTeam) // DELETE /teams/1
module.exports = router;