const { Schema, model } = require('mongoose')

const notificationSchema = new Schema(
  {
    id: {
      type: Schema.Types.ObjectId,
      ref:'Match'
    },
    match: String,
    score: Number,
    profilePicture: String
  }
)

module.exports = model('Notification', notificationSchema);