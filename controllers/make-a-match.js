const sdkClient = require('../sdk/sdk');
const User = require("../models/User")
const axios = require('axios')

exports.matchPage = async (req, res) => {

  const currentUserId = req.user._id
  const matches = []

  let users = await User.find( { _id: { $nin: [ currentUserId ] } } )
  let match = [...users]

  for (let i = match.length-1; i >= 0; i--) {

    let report = await axios.post(`zodiac_compatibility/${req.user.zodiacSign}/${match[i].zodiacSign}`)

    if (report.data.compatibility_percentage >= 75) {
      matches.push({
        matchId: users[i]._id,
        matchUser: users[i].username,
        matchZodiacSign: users[i].zodiacSign,
        owner: req.user.username,
        ownerZodiacSign: req.user.zodiacSign,
        report: report.data.compatibility_report,
        score: report.data.compatibility_percentage
      })
    }
  }

  if (matches.length == 0) {
    console.log('no match 😢')
    res.redirect('/dashboard')
  }

  console.log(matches)
  res.render('make-a-match/match', {matches})
}

exports.makeMatch = (req, res) => {
  res.redirect('/matches')
}