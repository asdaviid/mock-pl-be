const appConfig = require('./app.config');
const Sequelize = require('sequelize');

const User = require('../models/user.model');
const Team = require('../models/team.model');
const Stadium = require('../models/stadium.model');

const sequelize = new Sequelize(appConfig.database, appConfig.username, appConfig.password, {
  host: appConfig.host,
  dialect: appConfig.dialect,
  operatorsAliases: false,
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Models/tables
db.user = User(sequelize, Sequelize);
db.team = Team(sequelize, Sequelize);
db.stadium = Stadium(sequelize, Sequelize);

module.exports = db;