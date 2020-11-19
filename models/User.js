const { Schema, model } = require('mongoose')

const userSchema = new Schema({
  googleId: String,
  facebookId: String,
  email: String,
  password: String,
  birthDate: {
    date: Number,
    month: {
      type: Number,
      enum: [1,2,3,4,5,6,7,8,9,10,11,12]
    },
    year: Number,
    hour: Number,
    minute: Number,
    latitude: Number,
    longitude: Number,
    timeZone: Number
  },
  first: {
    type: Boolean,
    default: true
  },
  lati: Number,
  longi: Number,
  username:String,
  gender: {
    type: String,
    enum: ['male', 'female']
  },
  interest:{
    type: String,
    enum: ['male', 'female']
  },
  profilePicture: String,
  matches: [{
    type: Schema.Types.ObjectId,
    ref:'Match'
  }],
  zodiacSign: String,
  planet: String,
  post: [{
    type: Schema.Types.ObjectId,
    ref:'Post'
  }]

}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

module.exports = model('User', userSchema);


