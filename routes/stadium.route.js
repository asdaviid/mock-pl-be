const express = require('express');
const stadiumCtrl = require('../controllers/stadium.controller');

const router = express.Router();

router.route('/stadia')
  .get(stadiumCtrl.listStadia) // GET /stadia
  .post(stadiumCtrl.createStadium); // POST /stadia

router.route('/stadia/:stadium_id')
  .get(stadiumCtrl.getStadium) // GET /stadia/1
  .put(stadiumCtrl.updateStadium) // PUT /stadia/1
  .delete(stadiumCtrl.deleteStadium) // DELETE /stadia/1
module.exports = router;