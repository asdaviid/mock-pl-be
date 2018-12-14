const appConfig = require('./app.config');
const Sequelize = require('sequelize');

const UserModel = require('../models/user.model');
const TeamModel = require('../models/team.model');

const sequelize = new Sequelize(appConfig.database, appConfig.username, appConfig.password, {
  host: appConfig.host,
  dialect: appConfig.dialect,
  operatorsAliases: false,
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Models/tables
db.user = UserModel(sequelize, Sequelize);
db.team = TeamModel(sequelize, Sequelize);

module.exports = db;