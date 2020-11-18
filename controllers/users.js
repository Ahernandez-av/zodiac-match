const User = require("../models/User")

exports.createProfile = (req, res) => res.render('auth/profile')
exports. dashi= (req, res) => res.render('auth/dash')

exports.processProfiles =  async(req, res) => {
    const { day, month, year, hour, minutes,latitude, longitude, username, gender, interest,  plan} = req.body
    const logo = req.file.path
    let profile= await User.findByIdAndUpdate( req.user._id, {
        birthDate:{
        date: day,
        month:month,
        year:year,
        hour:hour,
        minutes:minutes,
        latitude:latitude,
        longitude: longitude,
        timezone: 5.5,

        },
        first: false,
        username:username, 
        gender:gender,
        interest:interest,
        profilePicture:logo,
        version:plan,
      }, {new:true})
    res.redirect('/dashboard', profile )
}

exports.profileDash = async (req, res) => {
    const  id = req.user._id;
    const user = await User.findById(req.user._id)
    res.render(`dashboard`, user)
}


exports.updateAccount = async (req, res) => {
    const id= req.params
    console.log(req.user)
     const user= await User.findById(req.user._id)
    res.render(`auth/update`, {user})
}

exports.updatedProfiles =  async (req, res) => {
    const id= req.params
    const {day, month, year, hour, minutes,latitude, longitude, username, lati, longi, gender, interest, plan} = req.body
    const logo = req.file.path
    await User.findByIdAndUpdate( req.user._id, {
        email,
        password,
        birthDate:{
        date: day,
        month:month,
        year:year,
        hour:hour,
        minutes:minutes,
        latitude:latitude,
        longitude: longitude,
        timezone: 5.5,

        },
        username:username, 
        lati: lati,
        longi:longi,
        gender:gender,
        interest:interest,
        version:plan,
        profilePicture:logo
      }, {new:true})
    res.redirect('/dashboard', req.user )
}


exports.deleteAccount = async (req, res) => {
    const id= req.params 
    await User.findByIdAndDelete(id)
    res.render('/')
}

