const appConfig = require('./app.config');
const Sequelize = require('sequelize');

const sequelize = new Sequelize(appConfig.database, appConfig.username, appConfig.password, {
  host: appConfig.host,
  dialect: appConfig.dialect,
  operatorsAliases: false,
});

const User = require('../models/user.model')(sequelize, Sequelize);
const Team = require('../models/team.model')(sequelize, Sequelize);
const Stadium = require('../models/stadium.model')(sequelize, Sequelize);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Models/tables
db.user = User;
db.team = Team;
db.stadium = Stadium;

module.exports = db;