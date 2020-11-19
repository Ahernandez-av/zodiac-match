const express = require('express');
const router  = express.Router();
const User = require("../models/User")
const axios = require('axios')
const routeGuard = require('../middlewares/route-guard')
const profileCheck = require('../middlewares/profile-check')

/* GET home page */
router.get('/', (req, res, next) => res.render('index'));

router.get('/dashboard', routeGuard, profileCheck, async (req, res) => {

  let astro = await axios.post(`sun_sign_prediction/daily/${req.user.zodiacSign}`)

  res.render('dashboard', astro.data.prediction)
})


module.exports = router;
