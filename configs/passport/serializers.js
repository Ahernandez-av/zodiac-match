const passport = require('passport');
const User = require('../../models/User');

passport.serializeUser((loggedInUser, cb) => {
  cb(null, loggedInUser._id);
});

passport.deserializeUser((userIdFromSession, cb) => {
  User.findById(userIdFromSession)
  .then(userDocument => {
    const user = userDocument
    cb(null, user);
  })
  .catch(err => {
    cb(err);
  })
});
