var Sequelize = require('sequelize');

var Car = (sequelize, type) => {
    return sequelize.define('cars', {
        id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
          },
        uuid: Sequelize.STRING,
        driver_id: Sequelize.INTEGER,
        name: Sequelize.STRING,
        plate_number: Sequelize.STRING,
        color: Sequelize.STRING,
        avatar: Sequelize.STRING
    });
}

module.exports = Car;