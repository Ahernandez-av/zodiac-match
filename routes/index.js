const express = require('express');
const router  = express.Router();
const sdkClient = require('../sdk/sdk');
const routeGuard = require('../middlewares/route-guard')

/* GET home page */
router.get('/', (req, res, next) => {

// make some dummy data in order to call vedic rishi api
// var data = {
//     'date': 10,
//     'month': 12,
//     'year': 1993,
//     'hour': 1,
//     'minute': 25,
//     'latitude': 25,
//     'longitude': 82,
//     'timezone': 5.5
// };

// api name which is to be called

// var resource = "astro_details";

// call horoscope apis
// sdkClient.call(resource, data.date, data.month, data.year, data.hour, data.minute, data.latitude, data.longitude, data.timezone, function(error, result){

//     if(error)
//     {
//         console.log("Error returned!!");
//     }
//     else
//     {
//         console.log('Response has arrived from API server --');
//         const response = JSON.parse(result);
//         res.render('index', response);
//     }
// });

res.render('index')

});

router.get('/dashboard', routeGuard, (req, res) => {
  res.render('dashboard')
})


module.exports = router;
