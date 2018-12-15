const Stadium = require('../models/stadium.model');
const Fixture = require('../models/fixture.model');
const Team = require('../models/team.model');

const search = (req, res) => {
  const { collection, query } = req.query;

  switch (collection) {
    case 'fixture':
      Fixture.find({ 
        "$or": [
          { 'competition': { '$regex': query, '$options': 'i' } }
        ]
      })
      .populate('home_team')
      .populate('away_team')
      .exec((err, fixtures) => {
        if (err) {
          throw err;
        }

        return res.status(200).json({
          fixtures
        });
      });
      break;
    case 'team':
      Team.find({ 
        "$or": [
          { 'name': { '$regex': query, '$options': 'i' } },
          { 'website': { '$regex': query, '$options': 'i' } },
          { 'founded': { '$regex': query, '$options': 'i' } },
          { 'country': { '$regex': query, '$options': 'i' } }
        ]
      })
      .exec((err, teams) => {
        if (err) {
          throw err;
        }

        return res.status(200).json({
          teams
        });
      });
      break;
    case 'stadium':
      Stadium.find({
        "$or": [
          { 'name': { '$regex': query, '$options': 'i' } },
          { 'city': { '$regex': query, '$options': 'i' } },
          { 'capacity': { '$regex': query, '$options': 'i' } }
        ]
      }).exec((err, stadia) => {
        if (err) {
          throw err;
        }

        return res.status(200).json({
          stadia
        });
      });
      break;
    default:
      return res.status(400).json({
        message: 'Invalid collection queried'
      });
  }
}

module.exports = {
  search
}