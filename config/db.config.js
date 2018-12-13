const appConfig = require('./app.config');

const Sequelize = require('sequelize');
const sequelize = new Sequelize(appConfig.database, appConfig.username, appConfig.password, {
  host: appConfig.host,
  dialect: appConfig.dialect,
  operatorsAliases: false,
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Models/tables
// models go here

module.exports = db;