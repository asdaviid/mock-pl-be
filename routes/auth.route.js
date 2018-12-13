const express = require('express');
const authCtrl = require('../controllers/auth.controller');

const router = express.Router();

router.route('/auth/register')
  .post(authCtrl.register);

router.route('/auth/login')
  .post(authCtrl.login);

module.exports = router;