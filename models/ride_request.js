var Sequelize = require('sequelize');

var RideRequest = (sequelize, type) => {
    return sequelize.define('ride_requests', {
        id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
          },
        uuid: Sequelize.STRING,
        user_id: Sequelize.INTEGER,
        driver_id: Sequelize.INTEGER,
        user_status: Sequelize.STRING,
        driver_status: Sequelize.STRING,
        from: Sequelize.STRING,
        to: Sequelize.STRING,
        estimated_fee: Sequelize.DECIMAL(12,2),
        final_fee: Sequelize.DECIMAL(12,2),
        status: Sequelize.STRING,
    });
}

module.exports = RideRequest;