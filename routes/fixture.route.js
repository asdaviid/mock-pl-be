const express = require('express');
const fixtureCtrl = require('../controllers/fixture.controller');
const auth = require('../auth')();

const router = express.Router();

router.route('/fixtures')
  .get(auth.authenticate(), fixtureCtrl.listFixtures)
  .post(auth.authenticate(), fixtureCtrl.createFixture);

router.route('/fixtures/:fixture_id')
  .get(auth.authenticate(), fixtureCtrl.getFixture)
  .put(auth.authenticate(), fixtureCtrl.updateFixture)
  .delete(auth.authenticate(), fixtureCtrl.deleteFixture);

module.exports = router;