const express = require('express');
const router  = express.Router();
const sdkClient = require('../sdk/sdk');
const routeGuard = require('../middlewares/route-guard')
const {
  matchPage,
  makeMatch
} = require('../controllers/make-a-match')

router.get('/make-a-match', matchPage)

module.exports = router;