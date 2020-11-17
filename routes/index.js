const express = require('express');
const router  = express.Router();
const routeGuard = require('../middlewares/route-guard')

/* GET home page */
router.get('/', (req, res, next) => res.render('index'));

router.get('/dashboard', routeGuard, (req, res) => {
  res.render('dashboard')
})


module.exports = router;
