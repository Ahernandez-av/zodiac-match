const sdkClient = require('../sdk/sdk');
const User = require("../models/User")
const axios = require('axios')

exports.matchPage = async (req, res) => {

  const currentUserId = req.user._id
  const matches = []

  let users = await User.find( { _id: { $nin: [ currentUserId ] } } )
  let match = [...users]

  for (let i = match.length-1; i >= 0; i--) {
    console.log(match[i].zodiacSign)
    let report = await axios.post(`zodiac_compatibility/${req.user.zodiacSign}/${match[i].zodiacSign}`)
    console.log(report.data.compatibility_percentage, '🔥🔥🔥🔥')
    if (report.data.compatibility_percentage >= 75) {
      matches.push({
        user: users[i].email,
        id: users[i]._id,
        zodiacSign: users[i].zodiacSign,
        score: report.data.compatibility_percentage,
        report: report.data.compatibility_report
      })
    }
  }

  console.log(matches)
  res.render('make-a-match/match', {matches})
}