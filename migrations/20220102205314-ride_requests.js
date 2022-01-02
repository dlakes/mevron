'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */

    await queryInterface.createTable('ride_requests', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      uuid: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      user_id: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      driver_id: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      user_status: {
        allowNull: true,
        type: Sequelize.INTEGER,
      },
      driver_status: {
        allowNull: true,
        type: Sequelize.INTEGER,
      },
      estimated_fee: {
        allowNull: false,
        defaultValue: 0.00,
        type: Sequelize.DECIMAL(12,2)
      },
      final_fee: {
        allowNull: false,
        defaultValue: 0.00,
        type: Sequelize.DECIMAL(12,2)
      },
      status: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      from: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      to: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      createdAt: {
        type: 'TIMESTAMP',
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        allowNull: false
      },
      updatedAt: {
        allowNull: true,
        type: 'TIMESTAMP'
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
     await queryInterface.dropTable('ride_requests');
  }
};
