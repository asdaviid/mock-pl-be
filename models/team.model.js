module.exports = (sequelize, Sequelize) => {
  const Team = sequelize.define('team', {
    name: Sequelize.STRING,
    website: Sequelize.STRING,
    founded: Sequelize.STRING,
    country: Sequelize.STRING
  });

  return Team;
}