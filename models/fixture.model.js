const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const FixtureSchema = new Schema({
  home_team: {
    type: Schema.Types.ObjectId,
    ref: 'Team',
    required: true
  },
  away_team: {
    type: Schema.Types.ObjectId,
    ref: 'Team',
    required: true
  },
  competition: String,
  kickoff:{
    type: Date,
    required: true
  },
  venue: {
    type: Schema.Types.ObjectId,
    ref: 'Stadium',
    required: true
  }
}, { timestamps: true });

module.exports = mongoose.model('Fixture', FixtureSchema);