const express = require('express');
const fixtureCtrl = require('../controllers/fixture.controller');

const router = express.Router();

router.route('/fixtures')
  .get(fixtureCtrl.listFixtures) // GET /stadia
  .post(fixtureCtrl.createFixture); // POST /stadia

router.route('/fixtures/:fixture_id')
  .get(fixtureCtrl.getFixture) // GET /stadia/1
  .put(fixtureCtrl.updateFixture) // PUT /stadia/1
  .delete(fixtureCtrl.deleteFixture) // DELETE /stadia/1
module.exports = router;