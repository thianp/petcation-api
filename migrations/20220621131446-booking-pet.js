'use strict';

const { DOG, CAT } = require('../config/constants');

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.createTable('bookingpets', {
      id: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: Sequelize.DataTypes.STRING,
      },
      type: {
        type: Sequelize.DataTypes.ENUM(DOG, CAT),
      },
      pet_pic: {
        type: Sequelize.DataTypes.STRING,
      },
      weight: {
        type: Sequelize.DataTypes.INTEGER,
      },
      age: {
        type: Sequelize.DataTypes.INTEGER,
      },
      species: {
        type: Sequelize.DataTypes.STRING,
      },
      note: {
        type: Sequelize.DataTypes.TEXT,
      },

      booking_id: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: {
            tableName: 'bookings',
          },
          key: 'id',
        },
      },

      created_at: {
        type: Sequelize.DataTypes.DATE,
        allowNull: false,
      },

      updated_at: {
        type: Sequelize.DataTypes.DATE,
        allowNull: false,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.dropTable('bookingpets');
  },
};
