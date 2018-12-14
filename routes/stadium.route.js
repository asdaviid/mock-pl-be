const express = require('express');
const stadiumCtrl = require('../controllers/stadium.controller');
const auth = require('../auth')();

const router = express.Router();

router.route('/stadia')
  .get(auth.authenticate(), stadiumCtrl.listStadia)
  .post(auth.authenticate(), stadiumCtrl.createStadium);

router.route('/stadia/:stadium_id')
  .get(auth.authenticate(), stadiumCtrl.getStadium)
  .put(auth.authenticate(), stadiumCtrl.updateStadium)
  .delete(auth.authenticate(), stadiumCtrl.deleteStadium);
  
module.exports = router;