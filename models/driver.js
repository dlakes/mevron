var Sequelize = require('sequelize');

var Driver = (sequelize, type) => {
  return sequelize.define('drivers', {
    id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    driver_id: Sequelize.STRING,
    is_online: Sequelize.INTEGER,
    is_on_trip: Sequelize.INTEGER,
  })
}

module.exports = Driver;