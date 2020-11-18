const { Schema, model } = require('mongoose')

const matchSchema = new Schema(
  {
    id: {
      type: Schema.Types.ObjectId,
      ref:'User'
    },
    user: String,
    zodiacSign: String,
    report: String,
    score: Number,
    chat: []
  }
)

module.exports = model('Match', matchSchema);