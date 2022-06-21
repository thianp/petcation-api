module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'User',
    {
      uId: {
        type: DataTypes.STRING,
        unique: true,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      address: {
        type: DataTypes.STRING,
      },
      district: {
        type: DataTypes.STRING,
      },
      subDistrict: {
        type: DataTypes.STRING,
      },
      zipCode: {
        type: DataTypes.INTEGER,
      },
      phonNumber: {
        type: DataTypes.INTEGER,
      },
      userPic: {
        type: DataTypes.STRING,
      },
    },
    {
      underscored: true,
    }
  );

  return User;
};
