const express = require('express');
const teamCtrl = require('../controllers/team.controller');
const auth = require('../auth')();
const { isAdmin } = require('../middlewares/roles');
const { cache } = require('../middlewares/utils');

const router = express.Router();

router.route('/teams')
  .get(auth.authenticate(), cache(1), teamCtrl.listTeams)
  .post(auth.authenticate(), isAdmin, teamCtrl.createTeam);

router.route('/teams/:team_id')
  .get(auth.authenticate(), cache(1), teamCtrl.getTeam)
  .put(auth.authenticate(), isAdmin, teamCtrl.updateTeam)
  .delete(auth.authenticate(), isAdmin, teamCtrl.deleteTeam);
  
module.exports = router;