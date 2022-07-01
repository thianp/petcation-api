const { SINGLE_ROOM, CAPSULE, CAGE, DOG, CAT } = require('../config/constants');

module.exports = (sequelize, DataTypes) => {
  const Bookinghouse = sequelize.define(
    'Bookinghouse',
    {
      houseId: {
        type: DataTypes.INTEGER,
      },
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
        type: DataTypes.TEXT,
      },
      image: {
        type: DataTypes.TEXT,
      },
      other: {
        type: DataTypes.TEXT,
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
    },
    {
      underscored: true,
    }
  );

  Bookinghouse.associate = (models) => {
    Bookinghouse.belongsTo(models.Host, {
      foreignKey: {
        name: 'hostId',
        allowNull: false,
      },
      onUpdate: 'RESTRICT',
      onDelete: 'RESTRICT',
    });
    Bookinghouse.belongsTo(models.Booking, {
      foreignKey: {
        name: 'bookingId',
        allowNull: false,
      },
      onUpdate: 'RESTRICT',
      onDelete: 'RESTRICT',
    });
  };

  return Bookinghouse;
};
