'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */

    await queryInterface.createTable('users', {
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
      firstname: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      lastname: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      password: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      email: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      phone_number: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      avatar: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      type: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      is_verified: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      promo: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      is_on_trip: {
        allowNull: false,
        defaultValue: 0,
        type: Sequelize.STRING,
      },
      is_online: {
        allowNull: false,
        defaultValue: 0,
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
     await queryInterface.dropTable('users');
  }
};
