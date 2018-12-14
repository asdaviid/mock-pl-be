const express = require('express');
const teamCtrl = require('../controllers/team.controller');
const auth = require('../auth')();

const router = express.Router();

router.route('/teams')
  .get(auth.authenticate(), teamCtrl.listTeams)
  .post(auth.authenticate(), teamCtrl.createTeam);

router.route('/teams/:team_id')
  .get(auth.authenticate(), teamCtrl.getTeam)
  .put(auth.authenticate(), teamCtrl.updateTeam)
  .delete(auth.authenticate(), teamCtrl.deleteTeam);
  
module.exports = router;