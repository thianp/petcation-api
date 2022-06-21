const { DOG, CAT } = require('../config/constants');

module.exports = (sequelize, DataTypes) => {
  const Bookingpet = sequelize.define(
    'Bookingpet',
    {
      name: {
        type: DataTypes.STRING,
      },
      type: {
        type: DataTypes.ENUM(DOG, CAT),
      },
      pet_pic: {
        type: DataTypes.STRING,
      },
      weight: {
        type: DataTypes.INTEGER,
      },
      age: {
        type: DataTypes.INTEGER,
      },
      species: {
        type: DataTypes.STRING,
      },
      note: {
        type: DataTypes.TEXT,
      },
    },
    {
      underscored: true,
    }
  );

  Bookingpet.associate = (models) => {
    Bookingpet.belongsTo(models.Booking, {
      foreignKey: {
        name: 'bookingId',
        allowNull: false,
      },
      onUpdate: 'RESTRICT',
      onDelete: 'RESTRICT',
    });
  };

  return Bookingpet;
};
