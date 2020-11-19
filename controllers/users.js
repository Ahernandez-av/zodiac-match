const { default: Axios } = require("axios")
const User = require("../models/User")

exports.createProfile = (req, res) => res.render('auth/profile')

exports.processProfiles =  async(req, res) => {
    const { username, gender, interest, plan } = req.body
    const date = Number(req.body.date)
    const month = Number(req.body.month)
    const year = Number(req.body.year)
    const hour = Number(req.body.hour)
    const minute = Number(req.body.minute)
    const latitude = Number(req.body.latitude)
    const longitude = Number(req.body.longitude)
    const logo = req.file.path
    console.log(date, month, year, hour, minute, latitude, longitude)
    let astro = await Axios.post('basic_astro', {
      "day":date,
      "month":month,
      "year":year,
      "hour":hour,
      "min":minute,
      "lat":latitude,
      "lon":longitude,
      "tzone":5.5
    })

    let sign = astro.data.sign
    let planet = astro.data.naksahtra_lord

    await User.findByIdAndUpdate( req.user._id, {
        birthDate:{
          date: date,
          month:month,
          year:year,
          hour:hour,
          minute:minute,
          latitude:latitude,
          longitude: longitude,
          timeZone: 5.5,
        },
        zodiacSign:sign,
        planet:planet,
        first: false,
        username:username, 
        gender:gender,
        interest:interest,
        profilePicture:logo,
        version:plan,
      }, {new:true})

    res.redirect('/dashboard')
}

exports.updateAccount = async (req, res) => {
    const user= await User.findById(req.user._id)
    res.render(`auth/update`, {user})
}

exports.updatedProfiles =  async (req, res) => {
    const { username, gender, interest, plan } = req.body
    const logo = req.file.path

    await User.findByIdAndUpdate( req.user._id, {
      username:username, 
      gender:gender,
      interest:interest,
      profilePicture:logo,
      version:plan,
      }, {new:true})
    res.redirect('/dashboard')
}

exports.deleteAccount = async (req, res) => {
    const id = req.user._id
    req.logout();
    await User.findByIdAndDelete(id)
    res.redirect('/')
}