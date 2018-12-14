module.exports = (sequelize, Sequelize) => {
  const Stadium = sequelize.define('stadium', {
    name: Sequelize.STRING,
    city: Sequelize.STRING,
    capacity: Sequelize.INTEGER
  });

  return Stadium;
}