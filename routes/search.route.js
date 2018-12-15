const express = require('express');
const searchCtrl = require('../controllers/search.controller');

const auth = require('../auth')();
const { cache } = require('../middlewares/utils');

const router = express.Router();

router.route('/search')
  .get(auth.authenticate(), cache(1), searchCtrl.search);

module.exports = router;