const User = require("../models/User")

exports.createProfile = (req, res) => res.render('auth/profile')

exports.processProfiles =  async(req, res) => {
  const {day, month, year, hour, minutes, username, gender, plan } = req.body
  const logo = req.file.path
  await User.findByIdAndUpdate( req.user._id, {
      birthDate:{
      day: day,
      month:month,
      year:year,
      hour:hour,
      minutes:minutes,
      lat:123,
      long: 123,
      timeZone: 5.5,
      },
      username:username, 
      lati: 124,
      longi:444,
      gender:gender,
      version:plan,
      profilePicture:logo
    }, {new:true})
  res.redirect('/dashboard')
}

exports.profileDash = (req, res) => res.render('auth/dash')
