const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TeamSchema = new Schema({
  name: String,
  website: String,
  founded: String,
  country: String,
  home_stadium: {
    type: Schema.Types.ObjectId,
    ref: 'Stadium'
  }
}, { timestamps: true });

module.exports = mongoose.model('Team', TeamSchema);