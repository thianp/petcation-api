const { SUCCESSFUL, PENDING, CANCLE } = require('../config/constants');

module.exports = (sequelize, DataTypes) => {
  const Booking = sequelize.define(
    'Booking',
    {
      checkInDate: {
        type: DataTypes.DATEONLY,
      },
      checkOutDate: {
        type: DataTypes.DATEONLY,
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      houseId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      total: {
        type: DataTypes.INTEGER,
      },
      is_include_food: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      status: {
        type: DataTypes.ENUM(SUCCESSFUL, PENDING, CANCLE),
      },
      payment_id: {
        type: DataTypes.STRING,
      },
      service_fee: {
        type: DataTypes.INTEGER,
      },
      food_price: {
        type: DataTypes.INTEGER,
      },
    },
    {
      underscored: true,
    }
  );

  Booking.associate = (models) => {
    Booking.hasMany(models.Bookingpet, {
      foreignKey: {
        name: 'bookingId',
        allowNull: false,
      },
      onUpdate: 'RESTRICT',
      onDelete: 'RESTRICT',
    });
    Booking.hasOne(models.Bookingcustomer, {
      foreignKey: {
        name: 'bookingId',
        allowNull: false,
      },
      onUpdate: 'RESTRICT',
      onDelete: 'RESTRICT',
    });
    Booking.hasOne(models.Bookinghouse, {
      foreignKey: {
        name: 'bookingId',
        allowNull: false,
      },
      onUpdate: 'RESTRICT',
      onDelete: 'RESTRICT',
    });
  };

  return Booking;
};
