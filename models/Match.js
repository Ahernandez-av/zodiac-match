const { Schema, model } = require('mongoose')

const matchSchema = new Schema(
  {
    matchId: {
      type: Schema.Types.ObjectId,
      ref:'User'
    },
    matchUser: String,
    matchZodiacSign: String,
    owner: String,
    ownerZodiacSign: String,
    report: String,
    score: Number,
    chat: []
  }
)

module.exports = model('Match', matchSchema);