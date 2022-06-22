'use strict';

const {
  SINGLE_ROOM,
  CAPSULE,
  CAGE,
  DOG,
  CAT,
  CLOSE,
  OPEN,
} = require('../config/constants');

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.createTable('houses', {
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
        type: Sequelize.DataTypes.ENUM(SINGLE_ROOM, CAPSULE, CAGE),
      },
      petType: {
        type: Sequelize.DataTypes.ENUM(DOG, CAT),
      },
      price: {
        type: Sequelize.DataTypes.INTEGER,
      },
      foodPrice: {
        type: Sequelize.DataTypes.INTEGER,
      },
      limit: {
        type: Sequelize.DataTypes.INTEGER,
      },
      checkInTime: {
        type: Sequelize.DataTypes.DATE,
      },
      checkOutTime: {
        type: Sequelize.DataTypes.DATE,
      },
      petFood: {
        type: Sequelize.DataTypes.STRING,
      },
      dailySchedule: {
        type: Sequelize.DataTypes.STRING,
      },
      image: {
        type: Sequelize.DataTypes.STRING,
      },
      isPetFood: {
        type: Sequelize.DataTypes.BOOLEAN,
        defaultValue: false,
      },
      isGrooming: {
        type: Sequelize.DataTypes.BOOLEAN,
        defaultValue: false,
      },
      isAirCondition: {
        type: Sequelize.DataTypes.BOOLEAN,
        defaultValue: false,
      },
      isPetStaff: {
        type: Sequelize.DataTypes.BOOLEAN,
        defaultValue: false,
      },
      isPetTraining: {
        type: Sequelize.DataTypes.BOOLEAN,
        defaultValue: false,
      },
      isPickupDropOff: {
        type: Sequelize.DataTypes.BOOLEAN,
        defaultValue: false,
      },
      isLitterChangedDaily: {
        type: Sequelize.DataTypes.BOOLEAN,
        defaultValue: false,
      },
      isAirFilter: {
        type: Sequelize.DataTypes.BOOLEAN,
        defaultValue: false,
      },
      stauts: {
        type: Sequelize.DataTypes.ENUM(OPEN, CLOSE),
        defaultValue: CLOSE,
      },

      user_id: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: {
            tableName: 'users',
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
    return queryInterface.dropTable('houses');
  },
};
