'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.createTable('filterdates', {
      id: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      date: {
        type: Sequelize.DataTypes.DATE,
      },
      houseId: {
        type: Sequelize.DataTypes.INTEGER,
      },
      amount: {
        type: Sequelize.DataTypes.INTEGER,
      },
      limit: {
        type: Sequelize.DataTypes.INTEGER,
      },
      bookingId: {
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
    return queryInterface.dropTable('filterdates');
  },
};
