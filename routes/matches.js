const express = require('express');
const router  = express.Router();
const routeGuard = require('../middlewares/route-guard')
const {
  getMatches,
  newMatch,
  matchDetails
} = require('../controllers/matches')

router.get('/matches', getMatches)

router.post('/matches', newMatch)

router.get('/matches/:id', matchDetails)

module.exports = router