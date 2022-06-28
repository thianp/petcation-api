module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'User',
    {
      uId: {
        type: DataTypes.STRING,
        unique: true,
      },
      email: {
        type: DataTypes.STRING,
        unique: true,
        validate: {
          isEmail: true,
        },
      },
      firstName: {
        type: DataTypes.STRING,
      },
      lastName: {
        type: DataTypes.STRING,
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
      province: {
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
      phoneNumber: {
        type: DataTypes.STRING,
      },
      userPic: {
        type: DataTypes.STRING,
      },
    },
    {
      underscored: true,
    }
  );

  User.associate = (models) => {
    User.hasMany(models.Pet, {
      foreignKey: {
        name: 'userId',
        allowNull: false,
      },
      onUpdate: 'RESTRICT',
      onDelete: 'RESTRICT',
    });

    User.hasOne(models.House, {
      foreignKey: {
        name: 'userId',
        allowNull: false,
      },
      onUpdate: 'RESTRICT',
      onDelete: 'RESTRICT',
    });
  };

  return User;
};
