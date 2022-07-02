module.exports = (sequelize, DataTypes) => {
  const Filterdate = sequelize.define(
    'Filterdate',
    {
      date: {
        type: DataTypes.DATEONLY,
      },
      houseId: {
        type: DataTypes.INTEGER,
      },
      amount: {
        type: DataTypes.INTEGER,
      },
      limit: {
        type: DataTypes.INTEGER,
      },
      bookingId: {
        type: DataTypes.INTEGER,
      },
    },
    {
      underscored: true,
    }
  );

  return Filterdate;
};
