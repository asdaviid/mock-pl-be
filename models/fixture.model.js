const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const FixtureSchema = new Schema({
  home_team: {
    type: Schema.Types.ObjectId,
    ref: 'Team'
  },
  away_team: {
    type: Schema.Types.ObjectId,
    ref: 'Team'
  },
  competition: String,
  kickoff: Date,
  venue: {
    type: Schema.Types.ObjectId,
    ref: 'Stadium'
  }
}, { timestamps: true });

module.exports = mongoose.model('Fixture', FixtureSchema);