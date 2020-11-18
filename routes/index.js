const express = require('express');
const router  = express.Router();
const routeGuard = require('../middlewares/route-guard')
const profileCheck = require('../middlewares/profile-check')

/* GET home page */
router.get('/', (req, res, next) => res.render('index'));

router.get('/dashboard', routeGuard, profileCheck, (req, res) => {
  res.render('dashboard', req.user)
})


module.exports = router;
