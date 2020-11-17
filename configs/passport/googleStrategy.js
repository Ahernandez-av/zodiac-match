const passport      = require('passport');
const GoogleStrategy = require('passport-google-oauth20')
const User          = require('../../models/User');

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
      callbackURL: "/auth/google/callback"
    },
    async (_, __, profile, done) => {
      const user = await User.findOne({ googleId: profile.id })

      if (user) {
        return done(null, user)
      }

      const newUser = await User.create({
        googleId: profile.id,
        email: profile.emails[0].value
      })

      done(null, newUser)
    }
  )
)