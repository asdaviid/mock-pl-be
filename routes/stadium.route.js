const express = require('express');
const stadiumCtrl = require('../controllers/stadium.controller');
const auth = require('../auth')();
const { isAdmin } = require('../middlewares/roles');
const { cache } = require('../middlewares/utils');

const router = express.Router();

router.route('/stadia')
  .get(auth.authenticate(), cache(1), stadiumCtrl.listStadia)
  .post(auth.authenticate(), isAdmin, stadiumCtrl.createStadium);

router.route('/stadia/:stadium_id')
  .get(auth.authenticate(), cache(1), stadiumCtrl.getStadium)
  .put(auth.authenticate(), isAdmin, stadiumCtrl.updateStadium)
  .delete(auth.authenticate(), isAdmin, stadiumCtrl.deleteStadium);
  
module.exports = router;