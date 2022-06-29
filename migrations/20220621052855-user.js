'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.createTable('users', {
      id: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      u_id: {
        type: Sequelize.DataTypes.STRING,
        unique: true,
      },
      email: {
        type: Sequelize.DataTypes.STRING,
        unique: true,
        validate: {
          isEmail: true,
        },
      },
      first_name: {
        type: Sequelize.DataTypes.STRING,
      },
      last_name: {
        type: Sequelize.DataTypes.STRING,
      },
      password: {
        type: Sequelize.DataTypes.STRING,
      },
      address: {
        type: Sequelize.DataTypes.STRING,
      },
      province: {
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
      phone_number: {
        type: Sequelize.DataTypes.STRING,
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
    return queryInterface.dropTable('users');
  },
};
