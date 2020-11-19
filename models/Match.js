const { Schema, model } = require('mongoose')

const matchSchema = new Schema(
  {
    matchId: {
      type: Schema.Types.ObjectId,
      ref:'User'
    },
    matchUsername: String,
    matchZodiacSign: String,
    matchProfilePicture: String,
    ownerUsername: String,
    ownerZodiacSign: String,
    ownerProfilePicture: String,
    report: String,
    score: Number,
    chat: []
  }
)

module.exports = model('Match', matchSchema);