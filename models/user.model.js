const bcryptjs = require('bcryptjs');

module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define('user', {
    firstname: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    lastname: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    username: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    email: {
      type: Sequelize.STRING,
      unique: true,
      allowNull: false
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false
    },
    role: {
      type: Sequelize.STRING
    }
  });

  User.comparePassword = (candidatePassword, hash, callback) => {
    bcryptjs.compare(candidatePassword, hash, (err, isMatch) => {
      if (err) throw err;
      callback(null, isMatch);
    });
  };

  return User;
};