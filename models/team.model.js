module.exports = (sequelize, Sequelize) => {
  const Team = sequelize.define('team', {
    name: Sequelize.STRING,
    website: Sequelize.STRING,
    founded: Sequelize.STRING,
    country: Sequelize.STRING,
    home_stadium: Sequelize.STRING,
    home_stadium_capacity: Sequelize.INTEGER
  });

  return Team;
}