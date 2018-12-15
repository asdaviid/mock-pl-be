const Stadium = require('../models/stadium.model');
const Fixture = require('../models/fixture.model');
const Team = require('../models/team.model');

const search = async (req, res) => {
  const { query } = req.query;

  const fixtures = await Fixture.find({ 
    "$or": [
      { 'competition': { '$regex': query, '$options': 'i' } }
    ]
  }, '_id competition kickoff venue')
  .populate('home_team', '_id name website founded country')
  .populate('away_team', '_id name website founded country').exec();

  const teams = await Team.find({ 
    "$or": [
      { 'name': { '$regex': query, '$options': 'i' } },
      { 'website': { '$regex': query, '$options': 'i' } },
      { 'founded': { '$regex': query, '$options': 'i' } },
      { 'country': { '$regex': query, '$options': 'i' } }
    ]
  }, '_id name website founded country')
  .populate('home_stadium', '_id name city capacity').exec();

  const stadia = await Stadium.find({
    "$or": [
      { 'name': { '$regex': query, '$options': 'i' } },
      { 'city': { '$regex': query, '$options': 'i' } },
      { 'capacity': { '$regex': query, '$options': 'i' } }
    ]
  }, '_id name city capacity').exec();

  return res.status(200).json({
    teams,
    fixtures,
    stadia
  });
}

module.exports = {
  search
}