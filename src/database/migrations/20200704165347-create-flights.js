'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable('flights', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
      },
      status: {
        type: Sequelize.STRING, // pending, done, canceled, flight
        allowNull: true,
        defaultValue: 'pending',
      },
      estimative_time: {
        type: Sequelize.FLOAT,
        allowNull: false
      },
      price: {
        type: Sequelize.FLOAT,
        allowNull: false
      },
      datetime: {
        type: Sequelize.DATETIME,
        allowNull: false
      },
      rating: Sequelize.INTEGER,
      description: Sequelize.STRING,

      user_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'users',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT'
      },
      aircraft_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'aircrafts',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT'
      },
      city_id_from: {
        type: Sequelize.INTEGER,
        references: {
          model: 'cities',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT'
      },
      city_id_to: {
        type: Sequelize.INTEGER,
        references: {
          model: 'cities',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT'
      }

    });
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.dropTable('flights');
  }
};
