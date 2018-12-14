const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TeamSchema = new Schema({
  name: { type: String, required: true },
  website: { type: String, required: true },
  founded: { type: String, required: true },
  country: { type: String, required: true },
  home_stadium: {
    type: Schema.Types.ObjectId,
    ref: 'Stadium',
    required: true
  }
}, { timestamps: true });

module.exports = mongoose.model('Team', TeamSchema);