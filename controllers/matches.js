const User = require("../models/User")
const Match = require('../models/Match')
const axios = require('axios')

exports.getMatches = async (req, res) => {
  const user = await User.findById(req.user._id, { matches : 1, _id : 0 }).populate("matches")
  res.render('matches/index', user)
}

exports.newMatch = async (req, res) => {
  const result = {...req.body}
  const newMatch = await Match.create(result)
  
  await User.findByIdAndUpdate(req.user._id, { $push: { matches: newMatch._id } })
  res.redirect('/matches')
}

exports.matchDetails = async (req, res) => {
  const match = await Match.findById(req.params.id)
  console.log(match)
  res.render('matches/details', match)
}