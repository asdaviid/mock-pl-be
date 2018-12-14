const express = require('express');
const stadiumCtrl = require('../controllers/stadium.controller');
const auth = require('../auth')();
const { isAdmin } = require('../middlewares/roles');

const router = express.Router();

router.route('/stadia')
  .get(auth.authenticate(), stadiumCtrl.listStadia)
  .post(auth.authenticate(), isAdmin, stadiumCtrl.createStadium);

router.route('/stadia/:stadium_id')
  .get(auth.authenticate(), stadiumCtrl.getStadium)
  .put(auth.authenticate(), isAdmin, stadiumCtrl.updateStadium)
  .delete(auth.authenticate(), isAdmin, stadiumCtrl.deleteStadium);
  
module.exports = router;