const User = require("../models/User")
const Match = require('../models/Match')
const Notification = require('../models/Notification')
const axios = require('axios')

exports.getMatches = async (req, res) => {
  const user = await User.findById(req.user._id).populate("notifications").populate("matches")
  console.log(user)
  res.render('matches/index', user)
}

exports.newMatch = async (req, res) => {
  const result = {...req.body}
  const newMatch = await Match.create(result)
  const newNotification = await Notification.create({
    id: newMatch._id,
    match: req.user.username,
    score: newMatch.score,
    profilePicture: req.user.profilePicture
  })
  console.log(newNotification)
  
  await User.findByIdAndUpdate(req.user._id, { $push: { matches: newMatch._id } })
  await User.findByIdAndUpdate(newMatch.matchId, { $push: { notifications: newNotification._id } })
  res.redirect('/matches')
}

exports.matchDetails = async (req, res) => {
  const match = await Match.findById(req.params.id)
  console.log(match)
  res.render('matches/details', { match: match, user: req.user })
}

exports.acceptMatch = async (req, res) => {
  let matchId = req.params.match_id
  let notificationId = req.params.notification_id

  const newMatch = await User.findByIdAndUpdate(req.user._id, { $push: { matches: matchId } })
  console.log("🔥 match added", newMatch)
  await Notification.findOneAndDelete(notificationId)
  res.redirect('/matches')
}