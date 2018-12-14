const express = require('express');
const fixtureCtrl = require('../controllers/fixture.controller');
const auth = require('../auth')();
const { isAdmin } = require('../middlewares/roles');

const router = express.Router();

router.route('/fixtures')
  .get(auth.authenticate(), fixtureCtrl.listFixtures)
  .post(auth.authenticate(), isAdmin, fixtureCtrl.createFixture);

router.route('/fixtures/:fixture_id')
  .get(auth.authenticate(), fixtureCtrl.getFixture)
  .put(auth.authenticate(), isAdmin, fixtureCtrl.updateFixture)
  .delete(auth.authenticate(), isAdmin, fixtureCtrl.deleteFixture);

module.exports = router;