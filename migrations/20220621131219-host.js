'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.createTable('hosts', {
      id: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },

      uId: {
        type: Sequelize.DataTypes.STRING,
        unique: true,
      },
      userId: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: false,
      },
      address: {
        type: Sequelize.DataTypes.STRING,
      },
      district: {
        type: Sequelize.DataTypes.STRING,
      },
      sub_district: {
        type: Sequelize.DataTypes.STRING,
      },
      zip_code: {
        type: Sequelize.DataTypes.INTEGER,
      },
      phon_number: {
        type: Sequelize.DataTypes.INTEGER,
      },
      user_pic: {
        type: Sequelize.DataTypes.STRING,
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
    return queryInterface.dropTable('hosts');
  },
};
