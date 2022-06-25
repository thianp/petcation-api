'use strict';

const { SINGLE_ROOM, CAPSULE, CAGE, DOG, CAT } = require('../config/constants');

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.createTable('bookinghouses', {
      id: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      house_id: {
        type: Sequelize.DataTypes.INTEGER,
      },
      name: {
        type: Sequelize.DataTypes.STRING,
      },
      type: {
        type: Sequelize.DataTypes.ENUM(SINGLE_ROOM, CAPSULE, CAGE),
      },
      pet_type: {
        type: Sequelize.DataTypes.ENUM(DOG, CAT),
      },
      price: {
        type: Sequelize.DataTypes.INTEGER,
      },
      food_price: {
        type: Sequelize.DataTypes.INTEGER,
      },
      limit: {
        type: Sequelize.DataTypes.INTEGER,
      },
      check_in_time: {
        type: Sequelize.DataTypes.DATE,
      },
      check_out_time: {
        type: Sequelize.DataTypes.DATE,
      },
      pet_food: {
        type: Sequelize.DataTypes.STRING,
      },
      daily_schedule: {
        type: Sequelize.DataTypes.STRING,
      },
      image: {
        type: Sequelize.DataTypes.STRING,
      },
      is_pet_food: {
        type: Sequelize.DataTypes.BOOLEAN,
        defaultValue: false,
      },
      is_grooming: {
        type: Sequelize.DataTypes.BOOLEAN,
        defaultValue: false,
      },
      is_air_condition: {
        type: Sequelize.DataTypes.BOOLEAN,
        defaultValue: false,
      },
      is_pet_staff: {
        type: Sequelize.DataTypes.BOOLEAN,
        defaultValue: false,
      },
      is_pet_training: {
        type: Sequelize.DataTypes.BOOLEAN,
        defaultValue: false,
      },
      is_pickup_drop_off: {
        type: Sequelize.DataTypes.BOOLEAN,
        defaultValue: false,
      },
      is_litter_changed_daily: {
        type: Sequelize.DataTypes.BOOLEAN,
        defaultValue: false,
      },
      is_air_filter: {
        type: Sequelize.DataTypes.BOOLEAN,
        defaultValue: false,
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

      host_id: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: {
            tableName: 'hosts',
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
    return queryInterface.dropTable('bookinghouses');
  },
};
