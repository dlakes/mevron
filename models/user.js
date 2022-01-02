var Sequelize = require('sequelize');

var User = (sequelize, type) => {
  return sequelize.define('users', {
    id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    uuid: Sequelize.STRING,
    firstname: Sequelize.STRING,
    lastname: Sequelize.STRING,
    password: Sequelize.STRING,
    email: Sequelize.STRING,
    phone_number: Sequelize.STRING,
    avatar: Sequelize.STRING,
    type: Sequelize.STRING,
    promo: Sequelize.STRING,
    is_verified: Sequelize.INTEGER,
    is_online: Sequelize.INTEGER,
    is_on_trip: Sequelize.INTEGER
  })
}

module.exports = User;