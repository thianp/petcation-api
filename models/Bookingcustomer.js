module.exports = (sequelize, DataTypes) => {
  const Bookingcustomer = sequelize.define(
    'Bookingcustomer',
    {
      uId: {
        type: DataTypes.STRING,
      },
      email: {
        type: DataTypes.STRING,
        validate: {
          isEmail: true,
        },
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      firstName: {
        type: DataTypes.STRING,
      },
      lastName: {
        type: DataTypes.STRING,
      },
      address: {
        type: DataTypes.STRING,
      },
      district: {
        type: DataTypes.STRING,
      },
      sub_district: {
        type: DataTypes.STRING,
      },
      zip_code: {
        type: DataTypes.INTEGER,
      },
      phone_number: {
        type: DataTypes.INTEGER,
      },
      user_pic: {
        type: DataTypes.STRING,
      },
    },
    {
      underscored: true,
    }
  );

  Bookingcustomer.associate = (models) => {
    Bookingcustomer.belongsTo(models.Booking, {
      foreignKey: {
        name: 'bookingId',
        allowNull: false,
      },
      onUpdate: 'RESTRICT',
      onDelete: 'RESTRICT',
    });
  };

  return Bookingcustomer;
};
