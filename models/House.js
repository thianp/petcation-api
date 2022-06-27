const {
  DOG,
  CAT,
  SINGLE_ROOM,
  CAPSULE,
  CAGE,
  OPEN,
  CLOSE,
} = require('../config/constants');

module.exports = (sequelize, DataTypes) => {
  const House = sequelize.define(
    'House',
    {
      name: {
        type: DataTypes.STRING,
      },
      type: {
        type: DataTypes.ENUM(SINGLE_ROOM, CAPSULE, CAGE),
      },
      petType: {
        type: DataTypes.ENUM(DOG, CAT),
      },
      price: {
        type: DataTypes.INTEGER,
      },
      foodPrice: {
        type: DataTypes.INTEGER,
      },
      size: {
        type: DataTypes.INTEGER,
      },
      limit: {
        type: DataTypes.INTEGER,
      },
      checkInTime: {
        type: DataTypes.STRING,
      },
      checkOutTime: {
        type: DataTypes.STRING,
      },
      petFood: {
        type: DataTypes.STRING,
      },
      dailySchedule: {
        type: DataTypes.STRING,
      },
      image: {
        type: DataTypes.STRING,
      },
      isPetFood: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      isGrooming: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      isAirCondition: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      isPetStaff: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      isPetTraining: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      isPickupDropOff: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      isLitterChangedDaily: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      isAirFilter: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      status: {
        type: DataTypes.ENUM(OPEN, CLOSE),
        defaultValue: CLOSE,
      },
    },
    {
      underscored: true,
    }
  );

  House.associate = (models) => {
    House.belongsTo(models.User, {
      foreignKey: {
        name: 'userId',
        allowNull: false,
      },
      onUpdate: 'RESTRICT',
      onDelete: 'RESTRICT',
    });
  };

  return House;
};
