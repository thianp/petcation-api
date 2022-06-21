'use strict';

const { PENDING, CANCLE, SUCCESSFUL } = require('../config/constants');

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.createTable('bookings', {
      id: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      checkInDate: {
        type: Sequelize.DataTypes.DATEONLY,
      },
      checkOutDate: {
        type: Sequelize.DataTypes.DATEONLY,
      },
      userId: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: false,
      },
      houseId: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: false,
      },
      total: {
        type: Sequelize.DataTypes.INTEGER,
      },
      is_include_food: {
        type: Sequelize.DataTypes.BOOLEAN,
        defaultValue: false,
      },
      status: {
        type: Sequelize.DataTypes.ENUM(SUCCESSFUL, PENDING, CANCLE),
      },
      payment_id: {
        type: Sequelize.DataTypes.STRING,
      },
      service_fee: {
        type: Sequelize.DataTypes.INTEGER,
      },
      food_price: {
        type: Sequelize.DataTypes.INTEGER,
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
    return queryInterface.dropTable('bookings');
  },
};
